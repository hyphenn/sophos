const USER = require('../../database/mongodb/models/user');
const SOCKET = require('../../socketio');
const makeResult = require("../helper").makeResult;
const logger = require('../../logger');

let instance;

function AuthenticationService() {
    return this.getInstance();
}

AuthenticationService.prototype.getInstance = function getInstance() {
    if (instance) {
        console.log("existing");
        return instance;
    } else {
        console.log("creating new one");
        instance = this;
        return instance;
    }
};

AuthenticationService.prototype.authenticate = async function authenticate(accountName, password) {
    let user;
    let msg;
    let success;
    let error;
    try {
        user = await this.USER.findByAccountName(accountName);
        msg = "User has been authenticated.";
        success = true;
    } catch (err) {
        logger.error(err);
        msg = "An error occured during authentication process."
        error = err.message;
        success = false;
    }

    return makeResult(user, msg, error, success);
}

instance = new AuthenticationService();

Object.defineProperty(instance, 'USER', {
    value: USER,
    enumerable: true,
    configurable: false,
    writable: false,
})

Object.defineProperty(instance, 'SOCKET', {
    value: SOCKET,
    enumerable: true,
    configurable: false,
    writable: false,
})
Object.freeze(instance)

module.exports = new AuthenticationService();