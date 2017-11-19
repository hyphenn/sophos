const config = require('config');
const logger = require('../../logger');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.get('database.mysql.database'),
  config.get('database.mysql.user'),
  config.get('database.mysql.password'),
  {
    host: config.get('database.mysql.host'),
    dialect: 'mysql',
    pool: {
      min: config.get('database.mysql.pool.min'),
      max: config.get('database.mysql.pool.max'),
      acquire: 10000,
      idle: 5000
    },
    define : {
      timestamps: false 
    }
  }
);

module.exports = sequelize;