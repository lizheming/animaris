
const BaseRest = require('../rest.js');
module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo('doc');
  }

  async getAction() {
    if (!this.id) {
      this.ctx.body = '';
      return true;
    }

    const {type} = this.get();
    const pk = this.modelInstance.pk;
    const product = await this.modelInstance.where({[pk]: this.id}).find();
    if (think.isEmpty(product)) {
      return this.success('');
    }

    let markdown = '';
    switch (type) {
      case 'sidebar':
        const {interfaces} = product.data;
        const cates = new Map();
        if (!think.isArray(interfaces)) {
          break;
        }

        for (const api of interfaces) {
          if (!cates.has(api.cate)) {
            cates.set(api.cate, []);
          }
          const data = cates.get(api.cate);
          data.push(api.name);
          cates.set(api.cate, data);
        }

        const result = [];
        for (const cate of cates.keys()) {
          result.push(`* ${cate}`);
          for (const name of cates.get(cate)) {
            result.push(` * [${name}](?id=${name})`);
          }
        }
        markdown = result.join('\r\n');
        break;

      case 'coverage':
        markdown = `![logo](${product.data.avatar})
# ${product.data.title}

${product.data.description}

[Get Started](#start)`;
        break;

      default:
        if (!think.isArray(product.data.interfaces)) {
          break;
        }
        markdown = `
<span id="start"></span>
${product.data.description}

${this.service('markdown').build(product.data)}`;
        break;
    }
    this.ctx.type = 'text/plain';
    this.ctx.body = markdown;
  }
};
