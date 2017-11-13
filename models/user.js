'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    fullname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.beforeCreate(function(user, options) {
    const saltRounds = 10;
    let plainPassword = user.password;

    return bcrypt.hash(plainPassword, saltRounds).then(function(hash) {
      user.password = hash;
    });
  })

  return User;
};