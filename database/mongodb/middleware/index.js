function databaseHealthcheck(req, res, next) {
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
}

module.exports = {
    databaseHealthcheck
}
