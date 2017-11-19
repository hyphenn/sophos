'use strict';
module.exports = (sequelize, DataTypes) => {
  var Language = sequelize.define('Language', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Language;
};