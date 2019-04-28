'use strict';
const bcrypt = require('bcryptjs');
const {model: userModel} = require('./userModel');

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

exports.findUser = async (email) => {
  console.log(email)
  return await userModel.findOne({email});
};

exports.hash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

//exports.findUser = async(email) => {
  //return user = await UserModel.findOne({ email });
//}
