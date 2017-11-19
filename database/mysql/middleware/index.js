async function databaseHealthcheck(req, res, next) {
    const logger = require('../../../logger');
    const db = require('../index.js');
    try {
        await db.knex.raw("SELECT 1 AS HEALTHCHECK;");
        next();
    } catch (err) {
        logger.error(err);
        return res.status(500).send("We are sorry server isn't available right now.");
    }
}

module.exports = {
    databaseHealthcheck
}