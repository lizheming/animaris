const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const {_id: user_id} = this.userInfo;
    let data;
    if (this.id) {
      data = await this.modelInstance.getDoc(user_id, this.id);
    } else {
      data = await this.modelInstance.getDocs(user_id);
    }

    return this.success(data);
  }

  async postAction() {
    const {_id: user_id} = this.userInfo;

    const pk = this.modelInstance.pk;
    const data = this.post();
    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }

    const insertId = await this.modelInstance.addDoc(user_id, data);
    return this.success({ id: insertId });
  }

  async putAction() {
    if (!this.id) {
      return this.fail('params error');
    }
    const {_id: user_id} = this.userInfo;

    const pk = this.modelInstance.pk;
    const data = this.post();
    data[pk] = this.id; // rewrite data[pk] forbidden data[pk] !== this.id
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }

    const rows = await this.modelInstance.updateDoc(user_id, this.id, data);
    return this.success({ affectedRows: rows });
  }

  async deleteAction() {
    if (!this.id) {
      return this.fail('params error');
    }

    const {_id: user_id} = this.userInfo;

    await this.modelInstance.deleteDoc(user_id, this.id);
    return this.success();
  }
};
