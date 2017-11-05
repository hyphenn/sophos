class UserService {
    constructor(db) {
        console.log("called --- UserService constructor")
        this.db = db;
    };

    async getUser() {

    }

    async createUser() {

    }

    async updateUser() {

    }

    async deleteUser() {

    }

}
let instance;

module.exports = function (db) {
    return (function (db) {
        if (!instance) {
            instance = new UserService(db);
        }
        return instance;
    })(db)
};