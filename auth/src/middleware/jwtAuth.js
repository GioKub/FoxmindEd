const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token !== undefined) {
      const myUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // req.salt
      req.salt = myUser.user.salt;
      // there should be better way to do this,
      // only check if nicknames match if role is user
      if (myUser.user.role === 'user' && myUser.user.nick === req.params.nick) {
        next();
      } else if (myUser.user.role === 'admin') {
        next();
      } else {
        return res.status(400).json({ message: 'incorrect token or nickname' });
      }
    } else {
      return res.status(403).json({ message: "where's my fucking token?!" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

module.exports = verifyToken;
