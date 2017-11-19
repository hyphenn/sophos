const mongoose = require('../index');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: String,
  passsword: String,
  email: String
})

UserSchema.statics.addUser = async function (username, password, email) {
  return this.create({
    account,
    password,
    email
  });
};

UserSchema.statics.removeUser = async function (id) {
  return this.remove({
    _id : id
  });
};

UserSchema.statics.findById = async function (id) {
  return this.find({
    _id : id
  });
};

UserSchema.statics.findByAccountName = async function (accountname) {
  return this.find({
    account: new RegExp(accountname, 'i')
  });
};

UserSchema.statics.findAll = async function (username) {
  return this.find();
};

module.exports = mongoose.model("User", UserSchema);