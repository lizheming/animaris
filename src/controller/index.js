const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display('index_index');
  }

  async docAction() {
    const {id} = this.get();
    const docModel = this.mongo('doc');
    const pk = docModel.pk;
    const doc = await docModel.where({[pk]: id}).find();
    this.assign(doc.data);
    this.assign({id});
    return this.display();
  }
};
