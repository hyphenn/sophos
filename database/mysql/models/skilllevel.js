'use strict';
module.exports = (sequelize, DataTypes) => {
  var SkillLevel = sequelize.define('SkillLevel', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SkillLevel;
};