const usersModel = require('../models/users');
const errorHandler = require('../middlewares/errorHandler');
const validation = require('../middlewares/validation');

module.exports = {
  get: function (req, res, next) {
    let emailToFind = req.params.email || req.body.email;

    if (!validation.validateEmail(emailToFind, req, res, next)) {
      return;
    }

    if (emailToFind) {
      usersModel.findOne({ email: emailToFind }).exec(function (err, result) {
        if (err)
          errorHandler.internalError(err, req, res, next);
        else {
          if (result) {
            res.status(200).json(result);
          }
          else {
            errorHandler.notFound(req, res, next);
          }
        }
      });
    }
    else {
      usersModel.find().exec(function (err, result) {
        if (err)
          errorHandler.internalError(err, req, res, next);
        else {
          if (result) {
            res.status(200).json(result);
          }
          else {
            res.status(204).json();
          }
        }
      });
    }
  },
  add: function (req, res, next) {
    var usersmodel = new usersModel({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    });

    if (!validation.validateEmail(usersmodel.email, req, res, next)) {
      return;
    }

    usersmodel.setPassword(req.body.password);
    usersmodel.save(function (err) {
      if (err) {
        if (err.code == '11000') {
          res.status(409).json();
        }
        else {
          errorHandler.internalError(err, req, res, next);
        }
      }
      else {
        res.status(201).json(usersmodel);
      }
    });
  },
  testauth: function (req, res, next) {
    let emailToAuth = req.body.email;

    if (!validation.validateEmail(emailToAuth, req, res, next)) {
      return;
    }

    usersModel.findOne({ email: emailToAuth }, function (err, user) {
      if (err)
        errorHandler.internalError(err, req, res, next);
      else {
        if (user) {
          var result = user.validatePassword(req.body.password);
          res.json(result);
        }
        else
          res.json(false);
      }
    });
  },
  delete: function (req, res, next) {
    let emailToDelete = req.params.email || req.body.email;

    if (!validation.validateEmail(emailToDelete, req, res, next)) {
      return;
    }

    usersModel.deleteOne({ email: emailToDelete }, function (err, result) {
      if (err)
        errorHandler.internalError(err, req, res, next);
      else {
        if (result && result.n) {
          res.status(204).json();
        }
        else {
          errorHandler.notFound(req, res, next);
        }
      }
    });
  },
}