const express = require('express');
const logger = require('morgan');
const news = require('./routes/news');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const fs = require('fs');
const app = express();

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/news', news);
app.use(errorHandler.internalError);
app.use(errorHandler.notFound);

app.listen(3000, function () {
    console.log('Server on port 3000 started');
});