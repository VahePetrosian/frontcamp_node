var errorHandler = require('../middlewares/errorHandler');
var http_mocks = require('node-mocks-http');
var should = require('should');

function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Error handler ', function () {
    it('bad request status code is 400', function (done) {
        var response = buildResponse();
        var request = http_mocks.createRequest();
        response.on('end', function () {
            response._getStatusCode().should.equal(400);
            done()
        })
        errorHandler.badRequest(request, response)
    });

    it('internal error status code is 500', function (done) {
        var response = buildResponse();
        var request = http_mocks.createRequest();
        response.on('end', function () {
            response._getStatusCode().should.equal(500);
            done()
        })
        errorHandler.internalError('', request, response)
    });

    it('unauthorized status code is 401', function (done) {
        var response = buildResponse();
        var request = http_mocks.createRequest();
        response.on('end', function () {
            response._getStatusCode().should.equal(401);
            done()
        })
        errorHandler.unauthorized(request, response)
    });

    it('not found status code is 404', function (done) {
        var response = buildResponse();
        var request = http_mocks.createRequest();
        response.on('end', function () {
            response._getStatusCode().should.equal(404);
            done()
        })
        errorHandler.notFound(request, response)
    });
})