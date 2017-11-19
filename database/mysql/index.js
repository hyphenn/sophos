const config = require('config');
const logger = require('../../logger');
var pool = 0;
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.get('database.mysql.host'),
    user: config.get('database.mysql.user'),
    password: config.get('database.mysql.password'),
    database: config.get('database.mysql.database'),
    charset: config.get('database.mysql.charset'),
    pool: {
      min: config.get('database.mysql.pool.min'),
      max: config.get('database.mysql.pool.max')
    }
  },
  acquireConnectionTimeout: config.get('database.mysql.timeout'),
  pool: {
    afterCreate: function (connection, done) {
      connection.query('SELECT 2+2 AS four;', function (error) {
        if (error) {
          logger.error(error);
          // first query failed, return error and don't try to make next query
          done(error, connection);
        } else {
          pool++;
          var poolName = "Pool "+pool+" : ";
          logger.info(poolName+"Connected to MySQL server.")
          connection.query('SELECT 1 + 1 AS two;', function (err) {
            logger.info(poolName+"Connection is healthy.")
            // if err is not falsy, connection is discarded from pool
            // if connection aquire was triggered by a query the error is passed to query promise
            done(error, connection);
          });
        }
      });
    }
  }
});

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;