const newsModel = require('../models/news');
const errorHandler = require('../middlewares/errorHandler');
const validation = require('../middlewares/validation');

module.exports = {
  get: function (req, res, next) {
    let id = req.params.id || req.body.id; 
    if (id) {
      if (!validation.validateoOjectId(id, req, res, next)) {
        return;
      }
      newsModel.findById(id).exec(function (err, result) {
        if (err) {
          errorHandler.internalError(err, req, res, next);
        }
        else {
          if (result)
            res.status(200).json(result);
          else
            errorHandler.notFound(req, res, next);
        }
      });
    }
    else {
      newsModel.find().exec(function (err, result) {
        if (err) {
          errorHandler.internalError(err, req, res, next);
        }
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
          errorHandler.internalError(err, req, res, next);
        else {
          res.status(201).json(result);
        }
      });
  },
  update: function (req, res, next) {
    let id = req.params.id || req.body.id;
    if (!validation.validateoOjectId(id, req, res, next)) {
      return;
    }
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
  delete: function (req, res, next) {
    let id = req.params.id || req.body.id;
    if (!validation.validateoOjectId(id, req, res, next)) {
      return;
    }
    newsModel.deleteOne({ _id: id }, function (err, result) {
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