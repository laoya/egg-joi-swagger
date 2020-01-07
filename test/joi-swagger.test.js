'use strict';

const mock = require('egg-mock');

describe('test/joi-swagger.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/joi-swagger-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /apidoc', () => {
    return app.httpRequest()
      .get('/apidoc')
      .expect('Content-Type', /html/)
      .expect(200);
  });

  it('should GET /user?phone=33sfe', () => {
    return app.httpRequest()
      .get('/user')
      .query({ phone: '33sfe' })
      .expect(422);
  });

  it('should GET /user?phone=1545', () => {
    return app.httpRequest()
      .get('/user')
      .query({ phone: '1545' })
      .expect(200);
  });

  it('should GET /user/fakeid', () => {
    return app.httpRequest()
      .get('/user/fakeid')
      .expect(422);
  });

  it('should GET /user/1d', () => {
    return app.httpRequest()
      .get('/user/1')
      .expect(200)
      .expect({});
  });

  it('should POST /user', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user')
      .send({
        name: 'john',
        age: 23,
        phone: '16744544434',
      })
      .expect(200);
  });

  it('should POST /user', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user')
      .send({})
      .expect(422);
  });

  it('should GET /user/group?name=xee', () => {
    return app.httpRequest()
      .get('/user/group?name=xee')
      .expect(200)
      .expect([]);
  });
});
