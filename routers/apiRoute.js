const express = require('express');
const router = express.Router();
const User = require('../models').User;
const userController = require('../controllers/userController');
const verifiedUser = require('../middlewares/verifiedUser');

router.get('/users', verifiedUser.isAdmin, userController.getAllUsers);
router.get('/users/:userId', verifiedUser.isSignIn, userController.getUserById);
router.post('/users', verifiedUser.isAdmin, userController.createUser);
router.delete('/users/:userId', verifiedUser.isAdmin, userController.deleteUserById);
router.put('/users/:userId', verifiedUser.isSignIn, userController.updateUserById);

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);


module.exports = router;