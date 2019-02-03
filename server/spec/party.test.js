import supertest from 'supertest';
import chai from 'chai';
import app from '../app';

import * as test from '../models/partyEntries';

const { expect } = chai;
const request = supertest.agent(app);
describe('POST PARTY /api/v1/parties', () => {
  it('EMPTY PARTY DATA should return status 404', (done) => {
    const emptyPartyData = {};
    request
      .post('/api/v1/parties')
      .send(emptyPartyData)
      .expect(400)
      .end(done);
  });
  it('Valid input should return 200', (done) => {
    const newParty = test.partyData1;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('Valid input should return 200', (done) => {
    const newParty = test.partyData1;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('Empty party name should return 400', (done) => {
    const newParty = test.partyData2;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Party name with spaces should return 400', (done) => {
    const newParty = test.partyData3;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Empty party detail should return 400', (done) => {
    const newParty = test.partyData4;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Party detail with spaces should return 400', (done) => {
    const newParty = test.partyData5;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Party name and detail with number should return 400', (done) => {
    const newParty = test.partyData6;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Empty logo Url should return 400', (done) => {
    const newParty = test.partyData7;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Logo Url with spaces should return 400', (done) => {
    const newParty = test.partyData8;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Hq Address that is empty should return 400', (done) => {
    const newParty = test.partyData11;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Hq Address that is space should return 400', (done) => {
    const newParty = test.partyData12;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Invalid Logo Url should return 400', (done) => {
    const newParty = test.partyData9;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('Party details that is number should return 400', (done) => {
    const newParty = test.partyData10;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect(400)
      .end(done);
  });
  it('should return  order in JSON format', (done) => {
    const newParty = test.partyData1;
    request
      .post('/api/v1/parties')
      .send(newParty)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET ALL PARTY /api/v1/parties', () => {
  it('should return status 200', (done) => {
    request
      .get('/api/v1/parties')
      .expect(200)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/api/v1/parties')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
