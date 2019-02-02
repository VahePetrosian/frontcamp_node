const express = require('express');
const logger = require('morgan');
const news = require('./routes/news');
const users = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session')
const app = express();
const Strategy = require('passport-local').Strategy
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const usersModel = require('./models/users');

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

app.get('/get',
  function (req, res) {

    res.status(201).json();
  });

app.use(errorHandler.internalError);
app.use(errorHandler.notFound);
app.listen(3000, function () {
  console.log('Server on port 3000 started');
});