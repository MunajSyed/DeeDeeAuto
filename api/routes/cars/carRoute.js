'use strict';

const express = require('express');
const router = express.Router();
const carService = require('./carService')

router.route('/')
    .get(async (req, res, next) => {
        try {
            const car = await carService.findCars();
            res.json({ data: car });
        } catch (e) {
            next(e);
        }
    })
    .post(async (req, res, next) => {
        try{
            const {body} = req;
            const car = await carService.createCars(body);
            res.json({
                data: car,
            });
        }catch (e){
            next(e);
        }
    });

router.route('/:carId')
    .get(async (req, res, next) => {
        const { params } = req;
        const { carId } = params;
        try {
            const car = await carService.findCar(carId);
            if (!car) {
                next(new Error('not found'));
            } else {
                res.json({
                    data: car,
                });
            }
        } catch (e) {
            next(e);
        }
    })
    exports.router = router;
