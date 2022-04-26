const jwt = require('jsonwebtoken');
require('dotenv').config();

//when it comes to accesing data, user can only acces his so nicks need to match
//but during votin user can vote to anyone, bascialy nick mathcing shouldn't be checked

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token !== undefined) {
      //route is in req.route.path
      const route = req.route.path.substring(0, 6)
      const myUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.salt = myUser.user.salt;
      req.user = myUser.user
      if (route !== '/vote/'){
        //no nickname matching should be chcked
        next()
      }else{
        if (myUser.user.role === 'user' && myUser.user.nick === req.params.nick) {
          next();
        } else if (myUser.user.role === 'admin') {
          next();
        } else {
          return res.status(400).json({ message: 'incorrect token or nickname' });
        }
      }
    } else {
      return res.status(403).json({ message: "where's my fucking token?!" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

module.exports = verifyToken;
