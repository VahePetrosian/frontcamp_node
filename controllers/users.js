const usersModel = require('../models/users');
module.exports = {
  add: function (req, res, next) {
    var usersmodel = new usersModel({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    });
    usersmodel.setPassword(req.body.password);
    usersmodel.save(function (err) {
      if (err) {
        res.json(err);
      }
      else
        res.json(usersmodel);
    });
  },
  get: function (req, res, next) {
    let emailToFind = req.params.email || req.body.email;
    if (emailToFind) {
      usersModel.findOne({ email: emailToFind }).exec(function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: { ok: 1 }, data: result });
      });
    }
    else {
      usersModel.find().exec(function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: { ok: 1 }, data: result });
      });
    }
  },
  testauth: function (req, res, next) {
    let emailToAuth = req.body.email;
    usersModel.findOne({ email: emailToAuth }, function (err, user) {
      if (err)
        res.json(err);
      else {
        var result = user.validatePassword(req.body.password);
        res.json({ status: { correct: result } });
      }
    });
  },
  delete: function (req, res, next) {
    let emailToDelete = req.params.email || req.body.email;
    usersModel.deleteOne({ email: emailToDelete }, function (err, result) {
      if (err)
        res.json({ status: { ok: 0, error: err } });
      else {
        res.status(200).json();
      }
    });
  },
}