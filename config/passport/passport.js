const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
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
        }
        const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUND);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
          username,
          password: hashedPassword
        });
        return done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          console.log('Username not found');
          return done(null, false, {
            message: 'username or password is not correct.'
          });
        }

        bcrypt.compare(password, user.password, (err, isSuccess) => {
          if (err) {
            console.log(err);
            done(err);
          }
          if (!isSuccess) {
            console.log('Password is not matched');
            return done(null, false, {
              message: 'username or password is not correct.'
            });
          }

          console.log('Login seuccessful');
          return done(null, user);
        });
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
