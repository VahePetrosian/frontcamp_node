module.exports = {
    initPassport() {
        const Strategy = require('passport-local').Strategy
        const usersModel = require('../models/users');
        const passport = require('passport');

        passport.use(new Strategy({ usernameField: 'email' },
            function (username, password, cb) {
                usersModel.findOne({ email: username }).exec(function (err, result) {
                    if (err) { return cb(err); }
                    if (!result) { return cb(null, false); }
                    if (!result.validatePassword(password)) { return cb(null, false); }
                    return cb(null, result);
                });
            }));

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