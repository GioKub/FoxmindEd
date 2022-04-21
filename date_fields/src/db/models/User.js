const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  created_at:{
    type: String,
  },
  updated_at:{
    type: String,
  }, 
  deleted_at:{
    type: String,
  }
});

module.exports = mongoose.model('User', UserSchema);
