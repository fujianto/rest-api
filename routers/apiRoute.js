const express = require('express');
const router = express.Router();
const User = require('../models').User;
const userController = require('../controllers/userController');
const verifiedUser = require('../middlewares/verifiedUser');

router.get('/users', verifiedUser.isLogIn, verifiedUser.isAdmin, userController.getAllUsers);
router.get('/users/:userId', verifiedUser.isLogIn, verifiedUser.isAuthUser, userController.getUserById);
router.post('/users', verifiedUser.isLogIn, verifiedUser.isAdmin, userController.createUser);
router.delete('/users/:userId', verifiedUser.isLogIn, verifiedUser.isAdmin, userController.deleteUserById);
router.put('/users/:userId', verifiedUser.isLogIn, verifiedUser.isAuthUser, userController.updateUserById);

router.post('/signup', userController.signUp);
router.post('/signin', verifiedUser.signIn, userController.signIn);


module.exports = router;