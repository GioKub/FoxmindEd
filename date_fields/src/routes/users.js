const express = require('express');
const basicAuth = require('../middleware/basicAuth');
const header = require('../middleware/header')

// const pagination = require('../middleware/pagination')

const UserController = require('../controllers/user-controller');

const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAllController);

router.get('/:nick', userController.getOneController);

router.post('/', userController.createOneController);

router.put('/:nick', basicAuth, header, userController.updateOneController);

router.delete('/:nick', userController.deleteOneController);


module.exports = router;
