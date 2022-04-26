const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');

// const pagination = require('../middleware/pagination')

const UserController = require('../controllers/user-controller');
const VoteController = require('../controllers/vote-controller')

const voteController = new VoteController()
const userController = new UserController();
const router = express.Router();

router.post('/login', userController.loginController);

router.get('/', userController.getAllController);

router.get('/:nick', userController.getOneController);

router.post('/', userController.createOneController);

router.put('/:nick', jwtAuth, userController.updateOneController);

router.delete('/:nick', jwtAuth, userController.deleteOneController);

router.post('/vote/:nick', jwtAuth, voteController.giveVoteController)

//maybe add jwt here
router.get('/vote/:nick', voteController.getVoteController)

module.exports = router;
