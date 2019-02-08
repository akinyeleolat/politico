import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import * as user from '../models/userEntries';
import * as test from '../models/candidateEntries';
import * as party from '../models/partyEntries';

const { expect } = chai;
const request = supertest.agent(app);

const { email, password } = user.signUpAdmin;
let token;
const authUser = {
  email,
  password,
}
before((done) => {
  request
    .post('/api/v1/auth/login')
    .send(authUser)
    .expect(200)
    .end((err, res) => {
      token = res.body.data.token;
      expect(res.status).to.equal(200);
      if (err) done(err);
      done();
    });
});
before((done) => {
  request
    .post('/api/v1/parties')
    .send(party.partyData1a)
    .set('token', token)
    .set('Authorization', token)
    .expect(201)
    .end((err, res) => {
      const partyData = res.body.data;
      console.log(partyData);
      expect(res.status).to.equal(201);
      if (err) done(err);
      done();
    });
});

describe('ENROLLING CANDIDATE FOR AN OFFICE /office/:id/register', () => {
  let newCandidate = '';
  it('EMPTY CANDIDATE DATA should return status 400', (done) => {
    const emptyOfficeData = {};
    request
      .post('/api/v1/office/2/register')
      .send(emptyOfficeData)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Candidate  number that is NAN should return status 400', (done) => {
    const emptyOfficeData = {};
    request
      .post('/api/v1/office/s/register')
      .send(emptyOfficeData)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Candidate  id that is not valid should return status 400', (done) => {
    const emptyOfficeData = {};
    request
      .post('/api/v1/office/23/register')
      .send(emptyOfficeData)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Empty office in request body should return 400', (done) => {
    newCandidate = test.candidateData2;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Empty party in request body should return 400', (done) => {
    newCandidate = test.candidateData3;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Empty office should return 400', (done) => {
    newCandidate = test.candidateData4;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Office with spaces should return 400', (done) => {
    newCandidate = test.candidateData5;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('party and office id that NAN should return 400', (done) => {
    newCandidate = test.candidateData6;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Invalid office id should return 400', (done) => {
    newCandidate = test.candidateData7;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Invalid party Id should return 400', (done) => {
    newCandidate = test.candidateData8;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('Enrolling same office again should return 400', (done) => {
    newCandidate = test.candidateData9;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect(400)
      .end(done);
  });
  it('should return  order in JSON format', (done) => {
    newCandidate = test.candidateData8;
    request
      .post('/api/v1/office/2/register')
      .send(newCandidate)
      .set('token', token)
      .set('Authorization', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
