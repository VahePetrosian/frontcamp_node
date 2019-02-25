const errorHandler = require('../middlewares/errorHandler');
module.exports = {
    validateoOjectId: function (id) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return false;
        }
        return true;
    },
    validateEmail: function (email) {
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) { 
            return false;
        }
        return true;
    }
}