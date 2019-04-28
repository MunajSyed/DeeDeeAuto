'use strict';
const {model: carModel} = require('./carModel');

exports.findCars = async () => await carModel.find();

exports.createCars = async (carData) => {
    const car = new carModel(carData);
    console.log(car);
    try{
        const doc = await car.save();
        return doc;
    }catch(e){
        console.error(e);
        throw e;
    }
};

exports.findCar = async (carId) => {
    console.log(carId);
    return await carModel.findById(carId);
};