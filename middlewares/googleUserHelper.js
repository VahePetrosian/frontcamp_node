const usersModel = require('../models/users');
module.exports = {
    findOrCreateUser: function (profile, accessToken, done) {
        usersModel.findOne({ googleId: profile.id }).exec(function (err, result) {
            if (err) {
                return done(err);
            }
            else {
                if (!result) {
                    var newUsersmodel = new usersModel({
                        googleId: profile.id,
                        googleAccessToken: accessToken,
                        email: profile.id + '@google.com',
                        surname: profile.name.familyName,
                        name: profile.name.givenName
                    });
                    newUsersmodel.save(function (err) {
                        if (err) {
                            return done(err);
                        }
                        else {
                            return done(null, newUsersmodel);
                        }
                    });
                }
                else {
                    return done(null, result);
                }
            }
        });
    }
}