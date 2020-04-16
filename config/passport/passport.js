const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { opts } = require('./passport.config');

// Import user model
const { User } = require('../../models');

const BCRYPT_SALT_ROUND = 12;

// Register user
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
          console.log('Username already taken.');
          return done(null, false, { message: 'Username already taken.' });
        } else {
          const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUND);
          const hashedPassword = bcrypt.hashSync(password, salt);

          try {
            const user = await User.create({
              username,
              password: hashedPassword
            });
            return done(null, user);
          } catch (err) {
            console.log(error);
            done(err);
          }
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

passport.use(
  'jwt',
  new JWTStrategy(opts, async (payload, done) => {
    const user = await User.findOne({ where: { id: payload.id } });

    if (user) {
      done(null, user);
    } else {
      done(null, error);
    }
  })
);
