const {ObjectId} = require('mongodb');
const BaseRest = require('../../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const {id: doc_id} = this.get();
    const user_ids = await this.mongo('doc_user').where({doc_id}).select();
    const users = await this.mongo('user').where({_id: {
      '$in': user_ids.map(user => ObjectId(user.user_id))
    }}).field('name,email,display_name,_id').select();
    return this.success(users);
  }

  async postAction() {
    const {id: doc_id} = this.get();
    const user_id = this.id;

    const result = await this.mongo('doc_user').where({doc_id, user_id}).thenAdd({doc_id, user_id});
    return this.success(result);
  }

  async putAction() {
    const {id: doc_id, user_ids} = this.get();

    const data = user_ids.map(user_id => ({doc_id, user_id}));
    await this.mongo('doc_user').where({doc_id}).delete();
    await this.mongo('doc_user').addMany(data);
    return this.success();
  }

  async deleteAction() {
    const {id: doc_id} = this.get();
    const user_id = this.id;

    const result = await this.mongo('doc_user').where({doc_id, user_id}).delete();
    return this.success(result);
  }
};
