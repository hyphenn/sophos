'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uuidv1 = require('uuid/v1');    
    const EncryptionService = require('../../../service/crypto');
    const logger = require('../../../logger');
    const now = new Date();
    let users = [
      {id: uuidv1(), firstName: 'Jack', lastName: "Ripper",email : "jack@ripper.eu", account: "ripper",password : "1234", createdAt: now, updatedAt : now},
      {id: uuidv1(),  firstName: 'Billy', lastName: "Anker",email : "billy@anker.eu", account: "anker",password : "1234", createdAt: now, updatedAt : now},
      {id: uuidv1(),  firstName: 'Steven', lastName: "Timber",email : "steven@timber.eu", account: "timber",password : "1234", createdAt: now, updatedAt : now },      
    ]
    for(let user of users){
     user.password = (await EncryptionService.encrypt("1234",10)).data.hash;
    }
    console.log(users);
    let result = await queryInterface.bulkInsert('Users',users);
    console.log("FINISHED :",result);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};