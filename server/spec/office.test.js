import supertest from 'supertest';
import chai from 'chai';
import app from '../app';

import * as test from '../models/officeEntries';

const { expect } = chai;
const request = supertest.agent(app);

describe('POST OFFICES /api/v1/offices', () => {
  let newOffice = '';
  it('EMPTY OFFICE DATA should return status 400', (done) => {
    const emptyOfficeData = {};
    request
      .post('/api/v1/offices')
      .send(emptyOfficeData)
      .expect(400)
      .end(done);
  });
  it('Valid input should return 201', (done) => {
    newOffice = test.officeData1;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(201)
      .end(done);
  });
  it('Empty office name should return 400', (done) => {
    newOffice = test.officeData2;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
  it('Office name with spaces should return 400', (done) => {
    newOffice = test.officeData3;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
  it('Empty office type should return 400', (done) => {
    newOffice = test.officeData4;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
  it('Office type with spaces should return 400', (done) => {
    newOffice = test.officeData5;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
  it('Office name and type with number should return 400', (done) => {
    newOffice = test.officeData6;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
  it('Inavlid office type should return 400', (done) => {
    newOffice = test.officeData7;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect(400)
      .end(done);
  });
    it('should return  order in JSON format', (done) => {
    newOffice = test.officeData1;
    request
      .post('/api/v1/offices')
      .send(newOffice)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
