import supertest from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
const request = supertest.agent(app);

describe('Invalid routes', () => {
  it('should return status 404', (done) => {
    request
      .get('/v1/')
      .expect(404)
      .end(done);
  });
});
describe('Valid routes', () => {
  it('should return status 200', (done) => {
    request
      .get('/')
      .expect(200)
      .end(done);
  });
  it('invalid route should return status 404', (done) => {
    request
      .get('/api/v1/')
      .expect(404)
      .end(done);
  });
  it('invalid route should return status 404', (done) => {
    request
      .get('/*')
      .expect(404)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
