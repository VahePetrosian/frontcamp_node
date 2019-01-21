const newsModel = require('../models/news');
module.exports = {
  get: function (req, res, next) {
    let id = req.params.id || req.body.id;
    if (id) {
      newsModel.findById(id).exec(function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: { ok: 1 }, data: result });
      });
    }
    else {
      newsModel.find().exec(function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: { ok: 1 }, data: result });
      });
    }
  },
  add: function (req, res, next) {
    newsModel.create({
      author: req.body.author,
      urlToImage: req.body.urlToImage,
      title: req.body.title,
      description: req.body.description,
      publishedAt: req.body.publishedAt,
      country: req.body.country,
      category: req.body.category,
      source: req.body.source
    },
      function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: { ok: 1 }, data: result });
      });
  },
  update: function (req, res, next) {
    let id = req.params.id || req.body.id;
    newsModel.updateOne({ _id: id }, {
      author: req.body.author,
      urlToImage: req.body.urlToImage,
      title: req.body.title,
      description: req.body.description,
      publishedAt: req.body.publishedAt,
      country: req.body.country,
      category: req.body.category,
      source: req.body.source
    },
      function (err, result) {
        if (err)
          res.json({ status: { ok: 0 } });
        else
          res.json({ status: result });
      });
  },
  delete: function (req, res, next) {
    let id = req.params.id || req.body.id;
    newsModel.deleteOne({ _id: id }, function (err, result) {
      if (err)
        res.json({ status: { ok: 0 } });
      else
        res.json({ status: result });
    });
  },
}