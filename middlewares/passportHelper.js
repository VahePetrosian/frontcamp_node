const FACEBOOK_APP_ID = '123';
const FACEBOOK_APP_SECRET = '123';
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/login/facebook/callback'
const Strategy = require('passport-local').Strategy
const usersModel = require('../models/users');
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

module.exports = {
    initPassport() {
        passport.use(new Strategy({ usernameField: 'email' },
            function (username, password, cb) {
                usersModel.findOne({ email: username }).exec(function (err, result) {
                    if (err) { return cb(err); }
                    if (!result) { return cb(null, false); }
                    if (!result.validatePassword(password)) { return cb(null, false); }
                    return cb(null, result);
                });
            }));

        passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK_CALLBACK_URL
        },
            function (accessToken, refreshToken, profile, done) {
                usersModel.findOne({ email: profile.email }).exec(function (err, user) {
                    if (err) { return done(err); }
                    done(null, user);
                })
            }
        ));

        passport.serializeUser(function (user, cb) {
            cb(null, user.id);
        });

        passport.deserializeUser(function (id, cb) {
            usersModel.findById(id, function (err, user) {
                if (err) { return cb(err); }
                cb(null, user);
            });
        });
        return passport;
    }
}