const express = require('express');
const logger = require('morgan');
const news = require('./routes/news');
const users = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const fs = require('fs');
const session = require('express-session')
const app = express();
const passport = require('./middlewares/passportHelper').initPassport();

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/news', news);
app.use('/users', users);
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.status(200).json();
  });

app.get('/login/google',
  passport.authenticate('google', {
    scope: [,
      'openid']
  }));

app.get('/login/google/callback',
  passport.authenticate('google'),
  function (req, res) {
    res.render('hello.jade', { title: 'Hello', name: req.user.name, authData: req.user });
  });


app.use(errorHandler.internalError);
app.use(errorHandler.notFound);

app.listen(3000, function () {
  console.log('Server on port 3000 started');
});