const VoteRepository = require('../db/repostory/vote-repository');

class VoteService {
  constructor() {
    this.voteRepository = new VoteRepository()
  }

  getVoteService = async(voter) => await this.voteRepository.getAllVotes(voter)

  giveVoteService = async(voteType, voter, toBeVoted) => {
    const alreadyVotedBy = await this.voteRepository.getAllVotes(toBeVoted)
    let alreadyUpvotedBy = alreadyVotedBy.upvotedBy.split(',')
    let alreadyDownvotedBy = alreadyVotedBy.downvotedBy.split(',')
    //this is done to not have something like [, ]
    if(alreadyUpvotedBy.join().length===1|| alreadyUpvotedBy.join().length===0){
      alreadyUpvotedBy = []
    }else if(alreadyDownvotedBy.join().length===1||alreadyDownvotedBy.join().length===1){
      alreadyDownvotedBy = []
    }
    if (voteType==='upvote'){
      if (alreadyUpvotedBy.includes(voter)){ 
        //remove upvote from this voter
        const index = alreadyUpvotedBy.indexOf(voter)
        alreadyUpvotedBy.splice(index, 1)
        const newUpvotedBy = alreadyUpvotedBy.join()
        return await this.voteRepository.giveVote('upvotedBy', toBeVoted, newUpvotedBy)
      }else if(alreadyDownvotedBy.includes(voter)){
        //remove downvote from this voter
        const index = alreadyDownvotedBy.indexOf(voter)
        alreadyDownvotedBy.splice(index, 1)
        const newDownvotedBy = alreadyDownvotedBy.join()
        await this.voteRepository.giveVote('downvotedBy', toBeVoted, newDownvotedBy)
        //add upvote from this voter
        alreadyUpvotedBy.push(voter)
        const newUpvotedBy = alreadyUpvotedBy.join()
        return await this.voteRepository.giveVote('upvotedBy', toBeVoted, newUpvotedBy)
      }else{ //when user with this voter is voting first time
        //add upvote from this voter
        console.log(alreadyUpvotedBy)
        alreadyUpvotedBy.push(voter)
        console.log(alreadyUpvotedBy)
        const newUpvotedBy = alreadyUpvotedBy.join()
        return await this.voteRepository.giveVote('upvotedBy', toBeVoted, newUpvotedBy)
      }
    }else if(voteType==='downvote'){
      if (alreadyDownvotedBy.includes(voter)){
        //remove downvote from this user
        const index = alreadyDownvotedBy.indexOf(voter)
        alreadyDownvotedBy.splice(index, 1)
        const newDownvotedBy = alreadyDownvotedBy.join()
        return await this.voteRepository.giveVote('downvotedBy', toBeVoted, newDownvotedBy)
      }else if(alreadyUpvotedBy.includes(voter)){
        //remove upvote from this voter
        const index = alreadyUpvotedBy.indexOf(voter)
        alreadyUpvotedBy.splice(index, 1)
        const newUpvotedBy = alreadyUpvotedBy.join()
        await this.voteRepository.giveVote('upvotedBy', toBeVoted, newUpvotedBy)
        //add downvote
        alreadyDownvotedBy.push(voter)
        const newDownvotedBy = alreadyDownvotedBy.join()
        return await this.voteRepository.giveVote('downvotedBy', toBeVoted, newDownvotedBy)
      }else{ //when user with this voter is voting first time
        const alreadyDownvotedBy = [] //this is done to remove empty space from array
        alreadyDownvotedBy.push(voter)
        const newDownvotedBy = alreadyDownvotedBy.join()
        return await this.voteRepository.giveVote('downvotedBy', toBeVoted, newDownvotedBy)
      }
    }
  }

  createVoteService = async(toBeVoted) => {
    const voteSchema = {nick: toBeVoted}
    return await this.voteRepository.createVote(voteSchema)
  }
}

module.exports = VoteService;
