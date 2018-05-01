
const BaseRest = require('../rest.js');
module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo(this.resource);
  }

  async getAction() {
    const {page, pagesize, keyword} = this.get();

    let data;
    if (this.id) {
      const pk = await this.modelInstance.pk;
      data = await this.modelInstance.where({[pk]: this.id}).find();
      return this.success(data);
    } else if (keyword) {
      const reg = new RegExp(keyword, 'i');
      this.modelInstance = this.modelInstance.where({
        '$or': [
          {name: reg},
          {email: reg},
          {display_name: reg}
        ]
      });
    }
    data = await this.modelInstance.page([page, pagesize]).countSelect();
    return this.success(data);
  }

  async postAction() {
    const data = this.post();
    const insertId = await this.modelInstance.addUser(data, this.ctx.ip);

    if (insertId.type === 'exist') {
      return this.fail('USER_EXIST');
    }

    return this.success(insertId);
  }

  async putAction() {
    if (!this.id) {
      return this.fail('MISS USER ID');
    }

    let data = this.post();
    for (const i in data) {
      if (!data[i]) {
        delete data[i];
      }
    }

    data.id = this.id;
    data = await this.modelInstance.updateUser(data);
    return this.success(data);
  }
};
