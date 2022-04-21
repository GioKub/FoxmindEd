const User = require('../db/models/User');
const crypto = require('../utils/crypto');
const UserRepository = require('../db/user-repostory');

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  createOneService = async (reqBody) => {
    const { hashedPass, salt } = await crypto.hashPassword(reqBody.password);
    const newUserSchema = {
      nick: reqBody.nick,
      firstname: reqBody.firstname,
      lastname: reqBody.lastname,
      password: hashedPass,
      created_at: (new Date()).toUTCString(),
      updated_at: (new Date()).toUTCString(),
      salt,
    };
    return this.UserRepository.createOneInDB(newUserSchema);
  };

  deleteOneService = async (nickname) => await this.UserRepository.deleteOneFromDB(nickname);

  getAllService = async () => await this.UserRepository.getAllFromDB();

  getOneService = async (nickname) => await this.UserRepository.getOneFromDB(nickname);

  updateOneService = async (reqBody, salt) => {
    const { hashedPass } = await crypto.hashPassword(reqBody.password, salt);
    const newUserSchema = {
      nick: reqBody.nick,
      firstname: reqBody.firstname,
      lastname: reqBody.lastname,
      password: hashedPass,
      updated_at: (new Date()).toUTCString(),
      salt,
    };
    return await this.UserRepository.updateOneInDB(reqBody.nick, newUserSchema);
  };

  userExistsService = async (nickname) => await this.UserRepository.checkIfUserExists(nickname);

}

module.exports = UserService;
