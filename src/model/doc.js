const {ObjectId} = require('mongodb');
module.exports = class extends think.Mongo {
  async getDocIds(user_id) {
    const data = await think.mongo('doc_user').where({user_id}).select();
    if (think.isEmpty(data)) {
      return [];
    }
    return data.map(item => item.doc_id);
  }

  async getDocs(user_id) {
    const docIds = await this.getDocIds(user_id);
    return this.where({
      [this.pk]: {
        '$in': docIds.map(id => ObjectId(id))
      }
    }).select();
  }

  async getDoc(user_id, doc_id) {
    const docIds = await this.getDocIds(user_id);
    if (!docIds.includes(doc_id)) {
      return null;
    }

    return this.where({[this.pk]: ObjectId(doc_id)}).find();
  }

  async addDoc(user_id, data) {
    const doc_id = await this.add(data);
    await think.mongo('doc_user').add({user_id, doc_id});
    return doc_id;
  }

  async updateDoc(user_id, doc_id, data) {
    const docIds = await this.getDocIds(user_id);
    if (!docIds.includes(doc_id)) {
      return null;
    }

    return this.where({[this.pk]: ObjectId(doc_id)}).update(data);
  }

  async deleteDoc(user_id, doc_id) {
    const docIds = await this.getDocIds(user_id);
    if (!docIds.includes(doc_id)) {
      return false;
    }

    await this.where({[this.pk]: ObjectId(doc_id)}).delete();
    await think.mongo('doc_user').where({user_id, doc_id}).delete();
    return true;
  }
};
