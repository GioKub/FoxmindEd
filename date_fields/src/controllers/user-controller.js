const UserService = require('../services/user-services');

class UserController {
  constructor() {
    this.UserService = new UserService();
  }

  // Getting one
  getOneController = async (req, res) => {
    try {
    // checks if user exists with entered nickname
      const existingUser = await this.UserService.getOneService(req.params.nick);
      console.log(existingUser);
      if (existingUser !== null) {
        res.status(200).json(existingUser);
      } else {
        res.status(400).json({ message: "user with such nickname doesn't exist" });
      }
    } catch (err) {
    // 400 Bad Request
      res.status(400).json({ message: err.message });
    }
  };

  // Getting all
  getAllController = async (req, res) => {
    try {
      const Users = await this.UserService.getAllService();
      console.log(Users);

      res.json(Users);
    } catch (err) {
    // 500 Internal Server Error
      console.error(err.message);
      return res.json({ message: 'something went wrong' });
    }
  };

  // Creating one
  createOneController = async (req, res) => {
    try {
    // checks if user exists with entered nickanme
      const existingUser = await this.UserService.userExistsService(req.body.nick);
      if (existingUser.length !== 0) {
      // 400 Bad request
        res.status(400).json('user with such nickname already exists');
      } else {
        const newUser = await this.UserService.createOneService(req.body);
        res.status(200).json({ message: newUser });
      }
    } catch (err) {
    // 400 Bad Request
      res.status(400).json({ message: err.message });
    }
  };

  // Updating One
  updateOneController = async (req, res) => {
    try {
    // req.salt
      const newUser = await this.UserService.updateOneService(req.body, req.salt);
      res.status(200).json({ message: newUser });
    } catch (err) {
    // 400 Bad Request
      res.status(400).json({ message: err.message });
    }
  };

  // Deleting One
  deleteOneController = async (req, res) => {
    try {
      const deleteResult = await this.UserService.deleteOneService(req.params.nick);
      console.log(deleteResult)
      if (deleteResult.matchedCount === 0) {
        return res.json({ message: "User With provided nickname doesn't exist" });
      }

      res.json({ message: 'User Deleted' });
    } catch (err) {
    // 500 Internal Server Error
      console.error(err.message);
      return res.json({ message: 'something went wrong' });
    }
  };

  
}

module.exports = UserController;
