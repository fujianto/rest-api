var bcrypt = require('bcrypt');
const saltRounds = 10;
const pass1 = '123456';

bcrypt.hash(pass1, saltRounds).then(function(hash) {
  console.log(hash);
});
