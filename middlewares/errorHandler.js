module.exports = {
    internalError: function (err, req, res, next) {
        res.status(500);
        res.render('internal_error.jade', { title: '500', error: err });
    },
    notFound: function (req, res, next) {
        res.status(404);
        res.render('not_found.jade', { title: '404' });
    },
    unauthorized: function (req, res, next) {
        res.status(401);
        res.render('unauthorized.jade', { title: '401' });
    },
    badRequest: function (req, res, next) {
        res.status(400);
        res.render('bad_request.jade', { title: '400' });
    }
}