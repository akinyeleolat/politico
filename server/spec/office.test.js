import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import * as user from '../models/userEntries';
import * as test from '../models/officeEntries';


const { expect } = chai;
const request = supertest.agent(app);
let token;
before((done) => {
  request
    .post('/api/v1/auth/signup')
    .send(user.signUpData)
    .expect(201)
    .end((err, res) => {
      token = res.body.data.token;
      expect(res.status).to.equal(201);
      if (err) done(err);
      done();
    });
});


describe('POST OFFICES /api/v1/offices', () => {
  let newOffice = '';
  it('EMPTY OFFICE DATA should return status 400', (done) => {
    const emptyOfficeData = {};
    request
      .post('/api/v1/offices')
      .send(emptyOfficeData)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Valid input should return 201', (done) => {
    newOffice = test.officeData1;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(201)
      .end(done);
  });
  it('Empty office name should return 400', (done) => {
    newOffice = test.officeData2;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Office name with spaces should return 400', (done) => {
    newOffice = test.officeData3;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Empty office type should return 400', (done) => {
    newOffice = test.officeData4;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Office type with spaces should return 400', (done) => {
    newOffice = test.officeData5;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Office name and type with number should return 400', (done) => {
    newOffice = test.officeData6;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Inavlid office type should return 400', (done) => {
    newOffice = test.officeData7;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
    it('should return  order in JSON format', (done) => {
    newOffice = test.officeData1;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .set('token', token)
      .set('Authorization', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET ALL OFFICE /api/v1/offices', () => {
  it('should return status 200', (done) => {
    request
      .get('/api/v1/offices')
      .expect(200)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/api/v1/offices')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});

describe('GET SELECTED OFFICES /api/v1/offices/:id', () => {
  let officeId = '';
  it('OFFICES WITH NO  VALID ID should return  status 400', (done) => {
    officeId = 5;
    request
      .get(`/api/v1/offices/${officeId}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 400,
          error: 'The office with given id was not found',
        });
        if (err) done(err);
        done();
      });
  });
  it('OFFICE WITH ID THAT ISNAN should return  status 400', (done) => {
    officeId = 's';
    request
      .get(`/api/v1/offices/${officeId}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 400,
          error: 'Enter the correct office parameter',
        });
        if (err) done(err);
        done();
      });
  });
  it('OFFICE WITH VALID ID should return  status 200', (done) => {
    officeId = 1;
    request
      .get(`/api/v1/offices/${officeId}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('should return  selected order in JSON format', (done) => {
    request
      .get(`/api/v1/offices/${officeId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
