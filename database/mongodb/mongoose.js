/*
db.createUser({ user: 'sophos', pwd: '1234', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
*/
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/sophos";
const logger = require('../../logger');

const options = {
    useMongoClient: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10,
    bufferMaxEntries: 0
};

mongoose.connect(uri,options)
const db = mongoose.connection;
db.on('error', logger.error)

module.exports = mongoose;