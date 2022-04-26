const Vote = require('../models/Vote');

class VoteRepository {

  async giveVote(voteType, toBeVoted, newVote){
    await Vote.updateOne({ nick: toBeVoted }, { $set: {[voteType]: newVote }});
    return Vote.findOne({nick: toBeVoted})
    
  }

  
  async getAllVotes(from){
    return await Vote.findOne({ nick : from})
  }

  async createVote(voteSchema){
    console.log(voteSchema)
    const vote = new Vote(voteSchema);
    await vote.save();
    return vote
  }
}

module.exports = VoteRepository;
