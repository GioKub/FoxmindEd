// const User = require('../db/models')
const mongoose = require('mongoose');
const User = require('./models/User');

class UserRepository {
  checkIfUserExists = async (nickname) => {
    const existingUser = await User.findOne({ nick: nickname });
    return existingUser;
  };

  async getOneFromDB(nickname) {
    return await User.findOne({ nick: nickname });
  }

  async getAllFromDB() {
    return await User.find();
  }

  async createOneInDB(newUserSchema) {
    const newUser = new User(newUserSchema);
    await newUser.save();
    return newUser;
  }

  async updateOneInDB(nickname, newUserSchema) {
    await User.updateOne({ nickname }, { $set: newUserSchema });
    return newUserSchema;
  }

  async deleteOneFromDB(nickname) {
    return await User.deleteOne({ nick: nickname });
  }
}

module.exports = UserRepository;
