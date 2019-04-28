'use strict';

const express = require('express');
const router = express.Router();
const dealerService = require('./dealerService')

router.route('/')
    .get(async (req, res, next) => {
        try {
            const dealer = await dealerService.findDealers();
            res.json({ data: dealer });
        } catch (e) {
            next(e);
        }
    })
    .post(async (req, res, next) => {
        try{
            const {body} = req;
            const dealer = await dealerService.createDealers(body);
            res.json({
                data: dealer,
            });
        }catch (e){
            next(e);
        }
    });

router.route('/:dealerId')
    .get(async (req, res, next) => {
        const { params } = req;
        const { dealerId } = params;
        try {
            const dealer = await dealerService.findDealer(dealerId);
            if (!dealer) {
                next(new Error('not found'));
            } else {
                res.json({
                    data: dealer,
                });
            }
        } catch (e) {
            next(e);
        }
    })
    exports.router = router;
