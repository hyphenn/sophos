const config = require('config');
const express = require('express');
const logger = require('./logger');
const bootstrap = require('./bootstrap');

/* ------------------ EXPRESS ------------------ */
const app = new express();

const server = (function () {
    const http = require('http');
    if (config.get('server.ssl.activated')) {
        const https = require('https');
        const fs = require('fs');
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


//DATABASE CONNECTION
if(config.get('database.activated')) require('./database/mysql');
app.use(require('./database/mysql/middleware').databaseHealthcheck);
//GraphQL
if (config.get('GraphQL.activated')) {
    const expressGraphQL = require('express-graphql');
    const schemaQL = require('./graphql/schema');
    app.use(config.get('GraphQL'), expressGraphQL({
        schema: schemaQL,
        graphiql: true
    }))
}

/* ------------------ CONFIGURATION ------------------ */
const port = config.get("server.port");
const ssl = config.get("server.ssl.activated");
const logs = config.get("server.logs.activated");
const databaseStat = config.get("database.activated");
const cacheStat = config.get("cache.activated");

/* ------------------ BOOTSTRAP ------------------ */
bootstrap(app);
server.listen(port, function () {
    logger.info('Server is running on port :', port);
    logger.info('SSL activated :', ssl);
    logger.info('Database activated :', databaseStat);
    logger.info('Cache activated :', cacheStat);
})