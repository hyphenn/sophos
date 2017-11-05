const config = require('config');
const express = require('express');
const expressGraphQL = require('express-graphql');

/* ------------------ INSTANCES ------------------ */
const app = new express();

const server = (function () {
    const http = require('http');
    const https = require('https');
    const fs = require('fs');

    if (config.get('server.ssl.activated')) {
        const key = fs.readFileSync(config.get('server.ssl.key'));
        const cert = fs.readFileSync(config.get('server.ssl.cert'));
        return https.createServer({
            key,
            cert
        }, app);

    } else {
        return http.createServer(app);
    }
})();

const logger = require('./logger');
const bootstrap = require('./bootstrap');
const schemaQL = require('./graphql/schema');
const cache = {};
const socket = {};
const db = require('./database/mongodb/mongoose');

app.use(function (req, res, next) {
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

app.use(config.get('GraphQL'), expressGraphQL({
    schema: schemaQL,
    graphiql: true
}))

bootstrap(app, db ,cache, socket);

/* ------------------ CONFIGURATION ------------------ */
const port = config.get("server.port");
const ssl = config.get("server.ssl.activated");
const logs = config.get("server.logs.activated");
const databaseStat = config.get("database.activated");
const cacheStat = config.get("cache.activated");

/* ------------------ BOOTSTRAP ------------------ */
server.listen(port, function () {
    logger.info('Server is running on port :', port);
    logger.info('SSL activated :', ssl);
    logger.info('Database activated :', databaseStat);
    logger.info('Cache activated :', cacheStat);
})