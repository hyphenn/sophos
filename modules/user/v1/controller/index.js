const userService= require('../service').call();
class UserController{
    static async getUser(){
        console.log("getting user");
        await userService.getUser();
    }
}

module.exports = UserController;