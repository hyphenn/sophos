'use strict';
module.exports = (sequelize, DataTypes) => {
  var SkillCategory = sequelize.define('SkillCategory', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SkillCategory;
};