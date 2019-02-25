var assert = require('assert');
var validator = require('../middlewares/validation');

describe('Email validation ', function () {
    it(' should not be empty', function () {
        assert.equal(validator.validateEmail(''), false);
    });
    it('@ is required', function () {
        assert.equal(validator.validateEmail('email.com'), false);
    });
    it('at least one . after @ is required', function () {
        assert.equal(validator.validateEmail('email@com'), false);
    });
    it('at least one letter between @ and . is required', function () {
        assert.equal(validator.validateEmail('email@.com'), false);
    });
    it('at least one letter before @ is required', function () {
        assert.equal(validator.validateEmail('@email.com'), false);
    });
    it('multiple . are alowed', function () {
        assert.equal(validator.validateEmail('email@email.email.com'), true);
    });
    it('at least 2 symbols after last .', function () {
        assert.equal(validator.validateEmail('email@email.email.c'), false);
    });
    it('no more than 6 symbols after last .', function () {
        assert.equal(validator.validateEmail('email@email.email.comcomc'), false);
    });
    it('one symbol before and after @ is allowed', function () {
        assert.equal(validator.validateEmail('e@e.de'), true);
    });
});
describe('ObjectId validation ', function () {
    it(' should not be empty', function () {
        assert.equal(validator.validateoOjectId(''), false);
    });
    it(' length must be 24', function () {
        assert.equal(validator.validateoOjectId('01234567890123456789ABC'), false);
    });
    it(' length must be 24', function () {
        assert.equal(validator.validateoOjectId('01234567890123456789ABCDE'), false);
    });
    it(' special symbols are not allowed', function () {
        assert.equal(validator.validateoOjectId('01234567890123456789ABC%'), false);
    });
    it(' only a-f letters are allowed', function () {
        assert.equal(validator.validateoOjectId('01234567890123456789ABCG'), false);
    });
    it(' should not be case sensative', function () {
        assert.equal(validator.validateoOjectId('1a2b3c4d5e6f7A8B9C0D1E2F'), true);
    });
});