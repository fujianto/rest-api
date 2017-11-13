'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

     return queryInterface.bulkInsert('Users', [{
        username: 'superadmin',
        password: '$2a$10$qs5zeWUz9dUuUmKZxoZsFebvLQVuYxIdaXosNt7BYUOHGM1Np49jC',
        isAdmin: true,
        fullname: 'Mimin Suradmin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
