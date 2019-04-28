'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = exports.schema = new Schema({
    image: {
        type: String,
    },
    make: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    model: {
        type: String,
        required: true,
    },
    km: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
    },
    transmission: {
        type: String,
    },
    gearBox: {
        type: String,
    },
    condition: {
        type: String,
    },
    bodyType: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        default: false,
    },
    isSold: {
        type: Boolean,
    },
    expireDate: {
        type: Date,
    },
    otherInfo: {
        type: String,
    },
    createdBy: {
        type: String,
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

exports.model = mongoose.model('Car', carSchema);