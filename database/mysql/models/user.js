'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    account: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });

  User.beforeCreate(function (user, options) {
    const EncryptionService = require('../../../service/crypto/index');
    const logger = require('../../../logger');
    EncryptionService.encrypt(user.password, 10)
      .then(encrypted => {
        user.password = encrypted.hash
      })
      .catch(err => {
        if (err) {
          logger.error(err);
          user.activated = false
        }
      })
  })
  console.log("DEBUG:",User);
  return User;
};