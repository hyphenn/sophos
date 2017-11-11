const auths = require('../../../service/authentication');
class AuthenticationController{
    static async authenticate(userModel){
            return await auths.authenticate(userModel.account, userModel.password);            
    }
}

module.exports = AuthenticationController;