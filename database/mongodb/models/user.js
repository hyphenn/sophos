const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username : String,
  passsword : String,
  email : String
})

UserSchema.statics.addUser = async function(username, password, email) {
  return UserSchema.create({ username, password, email });
};

UserSchema.statics.removeUser = async function(id) {
  return UserSchema.remove({id});
};

UserSchema.statics.findByName = async function(username) {
  return UserSchema.find({ name: new RegExp(name, 'i')});
};

UserSchema.statics.findAll = async function(username) {
  return UserSchema.find();
};

module.exports = mongoose.model("User", UserSchema);