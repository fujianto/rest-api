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
			isAdmin: req.body.isAdmin === 'true' ? true : false,
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
	// Cek jika user ada di db, Jika Ya buat token

	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (user) {
			bcrypt.compare(req.body.password, user.password).then(function(result) {
	  		if (result) {
	  			let token =
	  				jwt.sign(
	  					{
	  						id: user.id,
	  						username: user.username,
	  						isAdmin: user.isAdmin,
	  						fullname: user.fullname
	  					}, process.env.SECRET,
	  					(err, token) => {
	  						req.header.token = token;
	  						res.send({message: 'Login Success', token: token});
	  					}
  					);

	  		} else {
	  			res.send({message: 'Login Failed'})
	  		}
			});
		} else {
			res.send({message: 'Invalid Sign In'})
		}

	}).catch(err => res.send(err.message));
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