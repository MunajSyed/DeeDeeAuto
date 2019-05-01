'use strict';

const express = require('express');
const router = express.Router();
const tokenService = require('../../utils/tokenService');
const userService = require('./userService');
const requiresAuth = require('../../middleware/auth');
const { HTTP400Error, HTTP401Error } = require('../../utils/httpErrors');
const { logRequest } = require('../../utils');

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
  try {
    const user = await userService.isUser(req.body);
    if (user) {
      const token = await tokenService.issueToken(user);
      res.status(200).json({
        data: [{
          token,
        }],
      });
      logRequest(req, res);
    } else {
      next(new HTTP400Error());
    }
  } catch (e) {
    next(e);
  }
});

  /*.post(async (req, res, next) => {
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
  })*/

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

  router.route('/me')
  .get(
    requiresAuth,
    async (req, res, next) => {
      try {
        console.log(req.token)
        const { user: { id: userId } } = req.token;
        const user = await userService.findUser(userId);

        if (!user) {
          next(new HTTP401Error());
        } else {
          res.status(200).json({ data: [user] });
          logRequest(req, res);
        }
      } catch (e) {
        next(e);
      }
    }
  );

exports.router = router;
