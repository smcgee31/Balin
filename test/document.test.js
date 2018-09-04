/* eslint-disable no-underscore-dangle */

'use strict';

const { expect } = require('chai');
const testDb = 'test-db-1';
const host = 'http://localhost:5984/';
const axiouch = require('../axiouch')(host);

describe('Document tests', () => {
  const testInfo = {
    movie: 'Short Circuit',
    character: 'Johnny5',
    favoriteLine: 'Johnny5 is alive!',
  };
  let testDocId;

  before(async() => {
    await axiouch.create(testDb);
  });

  after(async() => {
    await axiouch.destroy(testDb);
  });

  it('.insert(data) adds a record to the test database', async() => {
    const db = axiouch.use(testDb);
    const response = await db.insert(testInfo);

    testDocId = response.data.id;

    expect(response.status).to.equal(201);
    expect(response.statusText).to.equal('Created');
    expect(response.data.ok).to.equal(true);
    expect(response.data).to.have.own.property('id');
    expect(response.data).to.have.own.property('rev');
  });

  it('.get(id) fetches the specified document', async() => {
    const db = axiouch.use(testDb);
    const response = await db.get(testDocId);

    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.data._id).to.equal(testDocId);
    expect(response.data.movie).to.equal(testInfo.movie);
    expect(response.data.character).to.equal(testInfo.character);
    expect(response.data.favoriteLine).to.equal(testInfo.favoriteLine);
  });

  it('.get(id, params) fetches the specified document', async() => {
    const db = axiouch.use(testDb);
    const params = { conflict: true };
    const response = await db.get(testDocId, params);

    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.data._id).to.equal(testDocId);
    expect(response.data.movie).to.equal(testInfo.movie);
    expect(response.data.character).to.equal(testInfo.character);
    expect(response.data.favoriteLine).to.equal(testInfo.favoriteLine);
  });
});

