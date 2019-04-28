'use strict';

const express = require('express');
const router = express.Router();
const tokenService = require('./tokenService');
const userService = require('./userService');

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await userService.findUsers();
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  });

router.route('/login')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await userService.findUser( email);
      if(!user){
        next(new Error('not found'));
      }else{
        const match = await user.comparePassword(password);

        if (match) {
          const token = tokenService.issueToken(user);
          res.json({
            data: [token],
          });
        } else {
          next(new Error('unauthorized'));
        }
      }
    } catch (e) {
      next(e);
    }
  })

router.route('/signup')
  .post(async (req, res, next) => {
    try {
      const { body } = req;
      body.password = await userService.hash(body.password);
      const user = await userService.createUsers(body);
      res.status(201).json({
        data: [user],
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
