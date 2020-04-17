const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Counter } = require('../models');
const { opts } = require('../config/passport/passport.config');

const register = (req, res, next) => {
  passport.authenticate('register', async (err, user, info) => {
    try {
      if (err) {
        console.log(err);
      }
      if (info) {
        console.log(info);
        res.status(400).send(info.message);
      } else {
        await user.update({ name: req.body.name });
        await Counter.create({ current: 0, user_id: user.id });
        res.status(200).send({ message: 'User created.' });
      }
    } catch (err) {
      console.log(err);
    }
  })(req, res, next);
};

const login = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        console.log(err);
      }
      if (info) {
        console.log(info);
      }
      const superSecretKey = opts.secretOrKey;
      const payload = {
        id: user.id,
        name: user.name
      };
      const token = jwt.sign(payload, superSecretKey, { expiresIn: 60 });
      res.status(200).send({
        token,
        message: 'User found & logged in'
      });
    } catch (err) {
      console.log(err);
    }
  })(req, res, next);
};

module.exports = { register, login };
