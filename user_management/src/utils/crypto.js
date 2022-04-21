const crypto = require('crypto');
const util = require('util');

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const hashPassword = async (password, salt = crypto.randomBytes(16).toString('hex')) => pbkdf2Promise(password, salt, 1000, 64, 'sha512')
  .then((derivedKey) => derivedKey.toString('hex'))
  .then((hashedPass) => ({ hashedPass, salt }));

module.exports = { hashPassword };
