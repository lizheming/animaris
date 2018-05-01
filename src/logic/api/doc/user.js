const Base = require('../base');
module.exports = class extends Base {
  async __before(...args) {
    await Base.prototype.__before.call(this, ...args);

    const {id: doc_id} = this.get();
    const {_id: user_id} = this.userInfo;

    const result = this.mongo('doc_user').where({doc_id, user_id}).find();
    if (think.isEmpty(result)) {
      return this.fail('NO ACCESS');
    }
  }

  putAction() {
    this.rules = {
      user_ids: {
        required: true,
        array: true
      }
    };
  }
};
