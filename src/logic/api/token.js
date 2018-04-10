module.exports = class extends think.Logic {
  /**
   * @api {POST} /token 用户登录
   * @apiGroup User
   * @apiVersion 0.0.1
   *
   * @apiParam  {String}  credential  用户名或者密码
   * @apiParam  {String}  password  用户密码
   */
  async postAction() {
    this.rules = {
      credential: {
        required: true,
        string: true
      },
      password: {
        required: true,
        string: true,
        length: {min: 8, max: 20}
      }
    };
  }

  /**
   * @api {DELETE} /token 用户登出
   * @apiGroup User
   * @apiVersion 0.0.1
   */
  deleteAction() {

  }
};
