class AuthenticationController {
    static async authenticate(userModel) {
        let AUTH = require('../../../service/authentication');
        return await AUTH.authenticate(userModel.account, userModel.password);
    }
}

module.exports = AuthenticationController;