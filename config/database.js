const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongoDB = 'mongodb://localhost/news';

if (process.env.NODE_ENV === 'test') {
    mockgoose.prepareStorage().then(function () {
        mongoose.connect(mongoDB, { useNewUrlParser: true });
    });
}
else {
    mongoose.connect(mongoDB, { useNewUrlParser: true });
}

module.exports = mongoose;