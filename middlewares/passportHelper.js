const GOOGLE_CLIENT_ID = '537458633734-qtnbigt576nqvcejt57tn8i50ahkq93n.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'Hmm2X40fvIoF9omy1I3cQrDi';
const GOOGLE_CALLBACK_URL = 'http://localhost:3000/login/google/callback';
const Strategy = require('passport-local').Strategy
const usersModel = require('../models/users');
const googleUser = require('./googleUserHelper');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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

        passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL
        },
            function (accessToken, refreshToken, profile, done) {
                googleUser.findOrCreateUser(profile, accessToken, done);
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