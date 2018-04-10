const Base = require('./base');
module.exports = class extends Base {
  async __before(...args) {
    if (!this.isPost) {
      await Base.prototype.__before.call(this, ...args);
    }
  }
  /**
   * @api {GET} /user 获取用户列表
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  keyword 搜索关键词
   * @apiParam  {String}  page  页数
   * @apiParam  {String}  pagesize  分页大小
   */
  getAction() {
    this.rules = {
      page: {
        int: true
        // default: 1
      },
      pagesize: {
        int: true,
        default: 10
      }
    };
  }
  /**
   * @api {POST} /user 用户注册
   * @apiGroup User
   * @apiVersion 0.0.1
   *
   * @apiParam  {String}  name  用户 ID
   * @apiParam  {String}  display_name  用户昵称
   * @apiParam  {String}  email 用户邮箱
   * @apiParam  {String}  password  用户密码
   */
  postAction() {
    this.rules = {
      name: {
        required: true,
        string: true,
        regexp: /[a-z0-9-_.]{4,}/i
      },
      display_name: {
        required: true,
        string: true,
        length: {min: 4, max: 10}
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        string: true,
        length: {min: 8, max: 20}
      },
      status: {
        int: true,
        value: 0
      }
    };
  }

  /**
   * @api {DELETE} /user/:id 用户删除
   * @apiGroup User
   * @apiVersion 0.0.1
   */
  deleteAction() {
  }

  /**
   * @api {PUT} /user/:id 更新用户信息
   * @apiGroup  User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  display_name  用户昵称
   * @apiParam  {String}  password  用户密码
   * @apiParam  {String}  status  用户状态
   */
  putAction() {
    if (!this.id) {
      return this.fail('MISS_ID');
    }

    this.rules = {
      display_name: {
        string: true,
        length: {min: 4, max: 10}
      },
      password: {
        string: true,
        length: {min: 8, max: 20}
      },
      status: {
        int: true
      }
    };
  }
};
