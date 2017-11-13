const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsers = (req, res) => {
	User.findAll()
		.then(users => {
			res.send(users);

		}).catch(err => res.send(err.message));
}

const getUserById = (req, res) => {
	User.findById(req.params.userId)
	 .then(user => {
	 	res.send(user);

	 }).catch(err => res.send(err.message));
}

const createUser = (req, res) => {
	User.create({
		username: req.body.username,
		password: req.body.password,
		isAdmin: req.body.isAdmin === 'true' ? true : false,
		fullname: req.body.fullname
	})
	.then(user => {
		res.send({user:user, message: 'User created'});

	}).catch(err => res.send(err.message));
}

const deleteUserById = (req, res) => {
	User.destroy({
		where: {
			id: req.params.userId
		}
	})
	 .then(user => {
	 		res.send({user: user, message: 'User deleted'});

	 }).catch(err => res.send(err.message));
}

const updateUserById = (req, res) => {
	const saltRounds = 10;
	let plainPassword = req.body.password;

	return bcrypt.hash(plainPassword, saltRounds).then(function(hash) {
		User.update(
		{
			username: req.body.username,
			password: hash,
			isAdmin: req.verifiedUser.isAdmin === true ? req.body.isAdmin : false,
			fullname: req.body.fullname
	  },
		{
			where: {
				id: req.params.userId
			}
		}
	)
	 .then(user => {
	 		res.send({user: user, message: 'User Updated'});

	 }).catch(err => res.send(err.message));
	});

}

const signUp = (req, res) => {
	User.create({
		username: req.body.username,
		password: req.body.password,
		isAdmin:  false,
		fullname: req.body.fullname
	})
	.then(user => {
		res.send({user: user, message: 'User signup success'});

	}).catch(err => res.send(err.message));
}

const signIn = (req, res) => {
	res.send({message: 'Login Success', token: req.header.token});
}

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	deleteUserById,
	updateUserById,
	signUp,
	signIn
}