var request = require('supertest');
var server = require('../server');
describe('General requests', function () {

  it('can find /news', function (done) {
    request(server)
      .get('/news')
      .expect(200, done);
  });

  it('returns 404 on bad url', function (done) {
    request(server)
      .get('/badurl')
      .expect(404, done);
  });

  it('requires not authorized when adding news without token', function (done) {
    request(server)
      .post('/news')
      .send({ user: 'testUser' })
      .expect(401, done);
  });
});

describe('User and News api requests ', function () {
  var email = "email@email.com";
  var password = "password";
  var cookie;
  var newNewsId;
  it('can add new user', function (done) {
    request(server)
      .post('/users/register')
      .send({
        email: 'email@email.com',
        name: 'name',
        surname: 'surname',
        password: 'password'
      })
      .expect(201)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('duplicate email is not allowed', function (done) {
    request(server)
      .post('/users/register')
      .send({
        email: email,
        name: 'name',
        surname: 'surname',
        password: password
      })
      .expect(409, done);
  });

  it('auth works', function (done) {
    request(server)
      .post('/users/testauth')
      .send({
        email: email,
        password: password
      })
      .expect(200, done);
  });

  it('returns cookies on auth', function (done) {
    request(server)
      .post('/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        cookie = res.header['set-cookie'];
        done();
      });
  });

  it('cookies are working as expected', function (done) {
    request(server)
      .post('/news')
      .set('Cookie', cookie)
      .send({
        author: 'author',
        urlToImage: 'urlToImage',
        title: 'title',
        description: 'description',
        country: 'country',
        category: 'category',
        source: 'source'
      })
      .expect(201)
      .end(function (err, res) {
        if (err) throw err;
        newNewsId = res.body._id;
        done();
      });

  });

  it('news deleting works', function (done) {
    request(server)
      .delete('/news')
      .set('Cookie', cookie)
      .send({ id: newNewsId })
      .expect(204, done);
  });

  it('user deleting works', function (done) {
    request(server)
      .delete(`/users/${email}`)
      .set('Cookie', cookie)
      .expect(204, done);
  });
});