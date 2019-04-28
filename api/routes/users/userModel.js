'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = exports.schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedBy: {
    type: String,
  },
  modifiedAt: {
    type: Date,
  }
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
exports.model = mongoose.model('User', userSchema);