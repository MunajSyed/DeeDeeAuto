'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const dealerSchema = exports.schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    unique: true,
  },
  streetNumber: {
    type: Number,
    required: true,
  },
  streetName: {
    type: String,
    require: true,
  },
  province: {
    type: String,
    require: true,
  },
  postalCode: {
    type: String,
    require: true,
  },
  unitNumber: {
    type: String,
  },
  description: {
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

exports.model = mongoose.model('Dealer', dealerSchema);