const errorHandler = require('../middlewares/errorHandler');

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    errorHandler.unauthorized(req, res, next);
  }
}

module.exports = isAuthenticated;