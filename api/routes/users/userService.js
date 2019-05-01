'use strict';
const bcrypt = require('bcryptjs');
const {model: userModel} = require('./userModel');
const { HTTP401Error } = require('../../utils/httpErrors');

exports.findUsers = async () => await userModel.find();

exports.createUsers = async (userData) => {
  const user = new userModel(userData);
  console.log(user)
  try {
    const doc = await user.save();
    return doc;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.findUser = async (_id) => {
  return await userModel.findOne({_id});
};

exports.hash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await userModel.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
    throw new HTTP401Error();
  } catch (e) {
    throw e;
  }
};

//exports.findUser = async(email) => {
  //return user = await UserModel.findOne({ email });
//}
