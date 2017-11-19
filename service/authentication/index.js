var authenticationService = (function AuthenticationService() {
    var instance;

    function init() {
        var service = {};
        var USER = require('../../database/mysql/models').User;
        var SOCKET = require('../../socketio');
        var makeResult = require("../helper").makeResult;
        var logger = require('../../logger');
        service.authenticate = async function authenticate(accountName, password) {
            var user;
            var msg;
            var success;
            var error;
            try {
                user = await USER.findOne({
                    where: {
                        account: accountName
                    }
                });
                msg = "User has been authenticated.";
                success = true;
            } catch (err) {
                logger.error(err);
                msg = "An error occured during authentication process."
                error = err.message;
                success = false;
            }
            Object.defineProperty(service, 'USER', {
                value: USER,
                enumerable: true,
                configurable: false,
                writable: false,
            });
            Object.defineProperty(service, 'SOCKET', {
                value: SOCKET,
                enumerable: true,
                configurable: false,
                writable: false,
            });
            Object.freeze(service)
            return makeResult(user, msg, error, success);
        }
        return service;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})().getInstance();

module.exports = authenticationService;