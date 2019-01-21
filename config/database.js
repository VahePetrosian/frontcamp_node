const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/news';
mongoose.connect(mongoDB, { useNewUrlParser: true });
module.exports = mongoose;