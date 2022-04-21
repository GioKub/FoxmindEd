const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');

// const pagination = require('../middleware/pagination')

const UserController = require('../controllers/user-controller');

const userController = new UserController();
const router = express.Router();

router.post('/login', userController.loginController);

router.get('/', userController.getAllController);

router.get('/:nick', userController.getOneController);

router.post('/', userController.createOneController);

router.put('/:nick', jwtAuth, userController.updateOneController);

router.delete('/:nick', jwtAuth, userController.deleteOneController);

module.exports = router;
