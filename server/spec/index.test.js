import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import * as test from '../models/userEntries';

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
describe('All Test Cases for Users Sign Up', () => {
  it('EMPTY SIGNUP DATA should return status 400', (done) => {
    const emptyData = {};
    request
      .post('/api/v1/auth/signup')
      .send(emptyData)
      .expect(400)
      .end(done);
  });
  it('Valid should return status 201', (done) => {
    const testData = test.signUpData1;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(201)
      .end(done);
  });
  it('Missing field nameshould return status 400', (done) => {
    const testData = test.signUpData2;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Empty field name should return status 400', (done) => {
    const testData = test.signUpData3;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Field name with space should return 400', (done) => {
    const testData = test.signUpData4;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Name with number should return status 400', (done) => {
    const testData = test.signUpData5;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Invalid Email should return status 400', (done) => {
    const testData = test.signUpData6;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Invalid Passport url should return status 400', (done) => {
    const testData = test.signUpData7;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Invalid phonenumber should return status 400', (done) => {
    const testData = test.signUpData8;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Inavalid password should return status 400', (done) => {
    const testData = test.signUpData9;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(400)
      .end(done);
  });
  it('Duplicate email should return status 409', (done) => {
    const testData = test.signUpData10;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(409)
      .end(done);
  });
  it('Duplicate phonenumber should return status 409', (done) => {
    const testData = test.signUpData11;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect(409)
      .end(done);
  });
  it('Valid request should return JSON Format', (done) => {
    const testData = test.signUpData6;
    request
      .post('/api/v1/auth/signup')
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
