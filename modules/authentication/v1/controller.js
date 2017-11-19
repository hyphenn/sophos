class AuthenticationController {
    static async authenticate(userModel) {
        var auths = require('../../../service/authentication');
        return await auths.authenticate(userModel.account, userModel.password);
    }
}

module.exports = AuthenticationController;