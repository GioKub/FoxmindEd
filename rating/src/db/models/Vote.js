const mongoose = require('mongoose');

//key for Vote model and User model is 'nick'
const VoteSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
  },
  upvotedBy: {
    type: String,
    required: true,
    //if i set this to just empty string like '', or null or undefined, 
    //it still throws error that field is required when i don't provide anything
    default: ' '
  },
  downvotedBy: {
    type: String,
    required: true,
    default: ' '
  },
  date: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Vote', VoteSchema);
