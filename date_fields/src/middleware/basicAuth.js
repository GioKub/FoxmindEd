const crypto = require('../utils/crypto');
const UserController = require('../controllers/user-controller');

const userController = new UserController();

async function authentication(req, res, next) {
  let existingUser = await userController.UserService.userExistsService(req.params.nick);

  if (existingUser === null) res.status(400).json("user with such nickname doesn't exist");

  //i do this because i it returns object that contains document since i am using .find
  // instead .findOne because i am filtering documents that don't have deleted_at set
  existingUser = existingUser[0]

  const authheader = req.headers.authorization;

  if (!authheader) {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  const auth = new Buffer.from(
    authheader.split(' ')[1],
    'base64',
  ).toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  // password gets hashed first and then compared
  const { hashedPass } = await crypto.hashPassword(pass, existingUser.salt);
  if (user === existingUser.nick && hashedPass === existingUser.password) {
    req.salt = existingUser.salt;
    next();
  } else {
    console.log(user)
    console.log(existingUser)
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

module.exports = authentication;
