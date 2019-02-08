import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import * as user from '../models/userEntries';
import * as test from '../models/partyEntries';

const { expect } = chai;
const request = supertest.agent(app);

describe('POST PARTY /api/v1/parties', () => {
  it('EMPTY PARTY DATA should return status 404', (done) => {
    const emptyPartyData = {}
    request
      .post('/api/v1/parties')
      .send(emptyPartyData)
      .expect(400)
      .end(done);
  });
  it('Valid input should return json', (done) => {
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

describe('GET SELECTED PARTIES /api/v1/parties/:id', () => {
  let partyId = '';
  it('PARTY WITH NO  VALID ID should return  status 404', (done) => {
    partyId = 3;
    request
      .get(`/api/v1/parties/${partyId}`)
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 404,
          error: 'The party with given id was not found',
        });
        if (err) done(err);
        done();
      });
  });
  it('PARTY WITH ID THAT ISNAN should return  status 404', (done) => {
    partyId = 's';
    request
      .get(`/api/v1/parties/${partyId}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 400,
          error: 'Enter the correct party parameter',
        });
        if (err) done(err);
        done();
      });
  });
  it('PARTY WITH VALID ID should return  status 200', (done) => {
    partyId = 1;
    request
      .get(`/api/v1/parties/${partyId}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('should return  selected order in JSON format', (done) => {
    request
      .get(`/api/v1/parties/${partyId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});

describe('PATCH/UPDATE PARTIES /api/v1/parties/:id/name', () => {
  let partyId = '';
  let newData = '';
  it('PARTY WITH ID THAT ISNAN should return  status 400', (done) => {
    partyId = 's';
    newData = test.partyData1;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 400,
          error: 'Enter the correct party parameter',
        });
        if (err) done(err);
        done();
      });
  });
  it('PARTY WITH VALID ID should return  status 200', (done) => {
    partyId = 1;
    newData = test.partyData1;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(200)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH NO VALID ID should return  status 400', (done) => {
    partyId = 5;
    newData = test.partyData1;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(404)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH VALID ID BUT EMPTY DETAIL should return  status 400', (done) => {
    partyId = 1;
    newData = {};
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH VALID ID BUT EMPTY PARTY NAME should return  status 400', (done) => {
    partyId = 1;
    newData = test.partyData2;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH VALID ID BUT PARTY NAME with spaces should return  status 400', (done) => {
    partyId = 1;
    newData = test.partyData3;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH VALID ID BUT EMPTY PARTY DETAIL should return  status 400', (done) => {
    partyId = 1;
    newData = test.partyData4;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end(done);
  });
  it('PARTY WITH VALID ID BUT PARTY DETAIL with spaces should return  status 400', (done) => {
    partyId = 1;
    newData = test.partyData5;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect(400)
      .send(newData)
      .end(done);
  });
  it('should return a JSON', (done) => {
    partyId = 1;
    newData = test.partyData1;
    request
      .patch(`/api/v1/parties/${partyId}/name`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send(newData)
      .end(done);
  });
});
describe('DELETE PARTIES /api/v1/parties/:id', () => {
  let partyId = '';
  it('PARTY WITH ID THAT ISNAN should return  status 400', (done) => {
    partyId = 's';
    request
      .delete(`/api/v1/parties/${partyId}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 400,
          error: 'Enter the correct party parameter',
        });
        if (err) done(err);
        done();
      });
  });
  it('PARTY WITH VALID ID should return  status 200', (done) => {
    partyId = 1;
    request
      .delete(`/api/v1/parties/${partyId}`)
      .expect(200)
      .end(done);
  });
  it('PARTY WITH NO VALID ID should return  status 404', (done) => {
    partyId = 2;
    request
      .delete(`/api/v1/parties/${partyId}`)
      .expect(404)
      .end(done);
  });
  it('should return a JSON', (done) => {
    partyId = 1;
    request
      .delete(`/api/v1/parties/${partyId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
