const Base = require('./base');
module.exports = class extends Base {
  /**
   * @api {GET} /doc 获取文档列表
   * @apiGroup Doc
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  page  页数
   * @apiParam  {String}  pagesize  分页大小
   */
  /**
   * @api {GET} /doc/:id 获取文档内容
   * @apiGroup  Doc
   * @apiVersion  0.0.1
   */
  getAction() {
    this.rules = {
      page: {
        int: true
      },
      pagesize: {
        int: true,
        default: 10
      }
    };
  }

  /**
   * @api {POST} /doc 添加文档
   * @apiGroup Doc
   * @apiVersion 0.0.1
   *
   * @apiParam  {Object}  data  文档数据
   */
  postAction() {
  }

  /**
   * @api {PUT} /doc/:id 修改文档
   * @apiGroup Doc
   * @apiVersion 0.0.1
   *
   * @apiParam  {Object}  data  文档数据
   */
  putAction() {
  }
  /**
   * @api {DELETE} /doc/:id  删除文档
   * @apiGroup Doc
   * @apiVersion  0.0.1
   */
  deleteAction() {}
};
