module.exports = class extends think.Controller {
  async __before() {
    const userInfo = await this.session('userInfo') || {};
    if (think.isEmpty(userInfo)) {
      if (this.isAjax()) {
        return this.fail('NOT_LOGIN');
      }
    }

    this.userInfo = userInfo;
    if (!this.isAjax()) {
      this.assign('userInfo', {
        id: userInfo.id,
        name: userInfo.name
      });
    }
  }

  async __call() {
    return this.display('index_index');
  }
};
