const UserModel = require("../models/user");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
};
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};
exports.getUserByEmail = async (email) => {
  return await UserModel.find(
    {},
    {
      email: email,
    }
  ).select({ email: 1, password: 1, _id: 0 });
};
exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
