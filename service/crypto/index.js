var cryptoService = (function CryptoService() {
    var instance;

    function init() {
        var service = {};
        var _bcrypt = require("bcrypt");
        var _logger = require('../../logger');
        var _makeResult = require("../helper").makeResult;
        service.encrypt = async function encrypt(plainValue, saltRounds) {
            var msg;
            var success;
            var error;
            var data;

            try {
                var hash = await _bcrypt.hash(plainValue, saltRounds);
                msg = "Encryption was finished successfully.";
                data = {
                    hash
                }
                success = true;
                _logger.debug(msg);                
            } catch (err) {
                msg = "An error occured during encryption."
                data = {}
                success = false;
                error = err.message;
                _logger.error(error);
            }
            return _makeResult(msg, data, error, success);
        }

        service.decrypt = async function decrypt(plainValue, hash) {
            var msg;
            var success;
            var error;
            var data;

            try {
                var isMatching = await _bcrypt.compare(plainValue, hash)
                msg = "Descryption was finished successfully."
                data = {
                    isMatching
                }
                success = true;      
                _logger.debug(msg);
            } catch (err) {
                msg = "An error occured during decryption."
                data = {}
                success = false;
                error = err.message;
                _logger.error(error);
            }
            return _makeResult(msg, data, error, success);
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

module.exports = cryptoService;