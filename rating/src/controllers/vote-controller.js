const VoteService = require('../services/vote-service');
const UserService = require('../services/user-services')

class VoteController {
  constructor(){
    this.voteService = new VoteService()
    this.userService = new UserService()
  }

  //add can't vote for yourself
  giveVoteController = async (req, res) => {
    try {
      const toBeVoted = req.params.nick
      const voter = req.user.nick
      if (voter===toBeVoted){
        return res.status(400).send({ message: 'You can\'t vote yourself' });
      }
      if(req.query!==null){
        if('upvote' in req.query && 'downvote' in req.query){
          res.status(400).send({ message: 'You can\'t upvote and downote at the same time!' });
        }else if('upvote' in req.query){
          const existingUser = await this.userService.userExistsService(toBeVoted);
          if (existingUser === null) {
          res.status(400).json('user with such doesn\'t exists');
        } else {
          const result = await this.voteService.giveVoteService('upvote', voter, toBeVoted)
          res.status(200).json(result);
        }
        }else if('downvote' in req.query){
          const existingUser = await this.userService.userExistsService(toBeVoted);
          if (existingUser === null) {
            res.status(400).json('user with such doesn\'t exists')
          }
          else{
            const result = await this.voteService.giveVoteService('downvote', voter, toBeVoted)
            res.status(200).json(result);
          }
        }else{
          res.status(400).send({ message: 'You have to either upvote or downvote!' });
        }
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Opss... Something went wrong!' });
    }
  };

  getVoteController = async (req, res) => {
    try {
      const nickname = req.params.nick
      const userVotes = await this.voteService.getVoteService(nickname)
      if (userVotes !== null) {
        res.status(200).json(userVotes);
      } else {
        res.status(400).json({ message: "user with such nickname doesn't exist" });
      }
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
}

module.exports = VoteController;
