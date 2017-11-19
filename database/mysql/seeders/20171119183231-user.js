'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const uuidv1 = require('uuid/v1');    
    let now = new Date();
    return queryInterface.bulkInsert('Users', [{
      id: uuidv1(),
      firstName: "Bill",
      lastName: "Doe",
      email: "billy@thebill.void",
      account: "billy",
      password: "1234",
      createdAt: now,
      updatedAt: now
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};