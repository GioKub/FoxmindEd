const mongoose = require('mongoose');

//key for Vote model and User model is 'nick'
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin',
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
