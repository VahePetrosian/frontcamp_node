const errorHandler = require('../middlewares/errorHandler');
module.exports = {
    validateoOjectId: function (id, req, res, next) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            errorHandler.badRequest(req, res, next);
            return false;
        }
        return true;
    },
    validateEmail: function (email, req, res, next) {
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            errorHandler.badRequest(req, res, next);
            return false;
        }
        return true;
    }
}