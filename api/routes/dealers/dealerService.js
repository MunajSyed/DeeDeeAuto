'use strict';
const {model: dealerModel} = require('./dealerModel');

exports.findDealers = async () => await dealerModel.find();

exports.createDealers = async (dealerData) => {
    const dealer = new dealerModel(dealerData);
    console.log(dealer);
    try{
        const doc = await dealer.save();
        return doc;
    }catch(e){
        console.error(e);
        throw e;
    }
};

exports.findDealer = async (dealerId) => {
    console.log(dealerId);
    return await dealerModel.findById(dealerId);
};