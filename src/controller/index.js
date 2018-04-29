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

  async mockjsAction() {
    const {id} = this.get();
    const docModel = this.mongo('doc');
    const pk = docModel.pk;
    const doc = await docModel.where({[pk]: id}).find();

    doc.data.interfaces.forEach(api => {
      if (!think.isArray(api.resp)) {
        return true;
      }

      let resp = api.resp.find(r => r.active);
      if (!resp) {
        resp = api.resp[0];
      }
      if (!resp || !resp.content) {
        return true;
      }
      api.resp = resp.content;
    });

    this.ctx.type = 'application/javascript';
    this.assign({doc: doc.data.interfaces});
    return this.display();
  }
};
