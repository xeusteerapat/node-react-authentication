const passport = require('passport');

const { Counter } = require('../models');

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

module.exports = { register };
