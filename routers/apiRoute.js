const express = require('express');
const router = express.Router();
const User = require('../models').User;
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.delete('/users/:userId', userController.deleteUserById);
router.put('/users/:userId', userController.updateUserById);

module.exports = router;