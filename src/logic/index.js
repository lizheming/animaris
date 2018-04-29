module.exports = class extends think.Logic {
  indexAction() {

  }

  docAction() {
    this.rules = {
      id: {
        required: true,
        string: true
      }
    };
  }
};
