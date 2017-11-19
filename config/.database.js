const config = require('config');
module.exports = {
  "development": {
    "username": "sophos",
    "password": "1234",
    "database": "pixie",
    "host": "localhost",
    "dialect": "mysql",
    "pool": {
      "min": config.get('database.mysql.pool.min'),
      "max": config.get('database.mysql.pool.max'),
      "acquire": 10000,
      "idle": 5000
    },
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "dialect": "mysql"
  }
}

