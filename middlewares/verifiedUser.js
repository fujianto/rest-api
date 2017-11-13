const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signIn = (req, res, next) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (user) {
			bcrypt.compare(req.body.password, user.password).then(function(result) {
	  		if (result) {
	  			jwt.sign(
	  				{
	  					id: user.id,
	  					username: user.username,
	  					isAdmin: user.isAdmin,
	  					fullname: user.fullname
	  				},
	  				process.env.SECRET,
	  				(err, token) => {
	  					req.header.token = token;
	  					next();
	  				}
	  			);
	  		} else {
	  			res.status(401).send({message: 'Sign In Failed'})
	  		}
			});
		} else {
			res.status(401).send({message: 'Invalid Sign In'})
		}

	}).catch(err => res.send(err.message));
}

const isLogIn = (req, res, next) => {
	jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
		if (typeof decoded !== 'undefined') {
			req.verifiedUser = decoded
			next();

		} else {
			res.status(401).send({message: 'Unauthorized Login Access'});
		}

	});
}

const isAdmin = (req, res, next) => {
	if (req.verifiedUser.isAdmin === true) {
		next();
	} else {
		res.status(401).send({message: 'Unauthorized Admin Access'});
	}
}


const isAuthUser = (req, res, next) => {
	if (+req.verifiedUser.id === +req.params.userId || req.verifiedUser.isAdmin === true) {
		next();

	} else {
		res.status(401).send({message: 'Unauthorized Auth Access'});
	}
}


module.exports = {
	signIn,
	isLogIn,
	isAdmin,
	isAuthUser
}