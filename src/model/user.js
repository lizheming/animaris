
const {PasswordHash} = require('phpass');

module.exports = class extends think.Mongo {
  getEncryptPassword(password) {
    const passwordHash = new PasswordHash();
    const hash = passwordHash.hashPassword(password);
    return hash;
  }

  checkPassword(userInfo, password) {
    const passwordHash = new PasswordHash();
    return passwordHash.checkPassword(password, userInfo.password);
  }

  addUser(data, ip) {
    const date = think.datetime();
    const encryptPassword = this.getEncryptPassword(data.password);
    return this.where({
      '$or': [
        {name: data.name},
        {email: data.emal}
      ]
    }).thenAdd({
      name: data.name,
      email: data.email,
      display_name: data.display_name,
      password: encryptPassword,
      create_time: date,
      last_login_time: date,
      create_ip: ip,
      last_login_ip: ip,
      status: data.status
    });
  }

  updateUser(data) {
    if (data.password) {
      data.password = this.getEncryptPassword(data.password);
    }

    return this.where({[this.pk]: data.id}).update(data);
  }
};
