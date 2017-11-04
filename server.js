const config = require('config');
const express = require('express');
const expressGraphQL = require('express-graphql');
const schemaQL = require('./graphql/schema');

/* ------------------ INSTANCES ------------------ */
const logger = require('./logger');
const server = new express();
const routing = require('./routing');

const db = require('./database/mongodb/mongoose');
server.use(function (req, res, next) {    
    let status = {
        "disconnected": 0,
        "connected": 1,
        "connecting": 2,
        "disconnecting": 3
    }

    if (db.connection.readyState === status.disconnected) {
        return res.status(503).send("Connection to database has been lost.");
    }

    if (db.connection.readyState === status.connecting) {
        return res.status(503).send("Please retry later, server is connecting to database.");
    }

    if (db.connection.readyState === status.disconnecting) {
        return res.status(503).send("Somthing bad happened, server is disconnecting database.");
    }
    return next();
})

server.use('/graphql', expressGraphQL({
    schema: schemaQL,
    graphiql: true
}))

routing(server);

/* ------------------ CONFIGURATION ------------------ */
const port = config.get("server.port");
const ssl = config.get("server.ssl");
const logs = config.get("server.logs.activated");
const database = config.get("database.activated");
const cache = config.get("cache.activated");

/* ------------------ BOOTSTRAP ------------------ */
server.listen(port, function () {
    logger.info('Server is running on port :', port);
    logger.info('SSL activated :', ssl);
    logger.info('Database activated :', ssl);
    logger.info('Cache activated :', ssl);
})

module.exports = server;