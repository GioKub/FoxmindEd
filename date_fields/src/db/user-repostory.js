const User = require('./models/User');

class UserRepository {

  checkIfUserExists = async (nickname) => {
    const existingUser = await User.find({ 'deleted_at' : { '$exists' : false }, 'nick':nickname});
    return existingUser;
  };
  
  async getOneFromDB(nickname) {
    return await User.find({ 'deleted_at' : { '$exists' : false }, 'nick':nickname});
  }

  async getAllFromDB() {
    return await User.find({ 'deleted_at' : { '$exists' : false }});;
  }

  async createOneInDB(newUserSchema) {
    const newUser = new User(newUserSchema);
    await newUser.save();
    return newUser;
  }

  async updateOneInDB(nickname, newUserSchema) {
    await User.updateOne({'deleted_at' : { '$exists' : false }, nick: nickname }, { $set: newUserSchema });
    return newUserSchema;
  }

  async deleteOneFromDB(nickname) {
    return await User.updateOne({nick:nickname}, {$set:{deleted_at: (new Date()).toUTCString()}})
  }
}

module.exports = UserRepository;
