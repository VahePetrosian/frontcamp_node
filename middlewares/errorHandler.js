module.exports = {
    internalError: function (err, req, res, next) {
        res.status(500);
        res.render('internal_error.jade', { title: '500', error: err });
    },
    notFound: function (req, res, next) {
        res.status(404);
        res.render('not_found.jade', { title: '404' });
    }
}