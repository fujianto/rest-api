const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*const signIn = (req, res, next) => {
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
	  					console.log('`````````````````````````');
	  					console.log(token);
	  					req.verifiedUser.token = token;
	  					req.verifiedUser.message = 'Login Success';
	  					next();
	  					// return {token: token, message: 'Login Success'};
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
}*/

const isSignIn = (req, res, next) => {
	jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {

		if (typeof decoded !== 'undefined') {
			if (+req.params.userId === +decoded.id || decoded.isAdmin === true) {
				next();
			} else {
				res.status(401).send({message: 'Unauthorized Access'});
			}

		} else {
			res.status(401).send({message: 'Unauthorized Access'});
		}

	});
}

const isAdmin = (req, res, next) => {
	jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
		if (typeof decoded !== 'undefined') {
			if (decoded.isAdmin === true) {
				next();
			} else {
				res.status(401).send({message: 'Unauthorized Access'});
			}

		}  else {
			res.status(401).send({message: 'Unauthorized Access'});
		}
	});
}

module.exports = {
	isSignIn,
	isAdmin
}