'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define('Participant', {
    eventId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Participant;
};