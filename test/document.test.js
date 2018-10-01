/*
 * These are live tests and CouchDB should be running on
 * your machine when these tests are run or they will fail.
 *
*/

/* eslint-disable no-underscore-dangle */

'use strict';

const { expect } = require('chai');
const testDb = 'test-db-1';
const host = 'http://localhost:5984/';
const axiouch = require('../axiouch')(host);

describe('Document tests', () => {
  let db, doc, testDocId, testDocRev2;
  const testInfo = {
    movie: 'Short Circuit',
    character: 'Johnny5',
  };

  before(async() => {
    // setup a temporary db
    await axiouch.create(testDb);
    db = axiouch.use(testDb);
  });

  after(async() => {
    // remove the temporary db
    await axiouch.destroy(testDb);
  });

  it('.insert(data) - adds a record to the test database', async() => {
    const response = await db.insert(testInfo);

    testDocId = response.data.id; // setup for later tests

    expect(response.status).to.equal(201);
    expect(response.statusText).to.equal('Created');
    expect(response.data.ok).to.equal(true);
    expect(response.data).to.have.own.property('id');
    expect(response.data).to.have.own.property('rev');
  });

  it('.get(id) - fetches the specified document', async() => {
    const response = await db.get(testDocId);

    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.data._id).to.equal(testDocId);
    expect(response.data.movie).to.equal(testInfo.movie);
    expect(response.data.character).to.equal(testInfo.character);
  });

  it('.insert(data) - updates a record in the test database', async() => {
    const { data } = await db.get(testDocId);

    doc = { ...data };
    doc.favoriteLine = 'Johnny5 is alive!';

    const response = await db.insert(doc);

    testDocRev2 = response.data.rev; // setup for later tests

    expect(response.status).to.equal(201);
    expect(response.statusText).to.equal('Created');
    expect(response.data.ok).to.equal(true);
    expect(response.data).to.have.own.property('id');
    expect(response.data).to.have.own.property('rev');
  });

  it('.get(id, params) - fetches the specified document with params', async() => {
    const params = { conflict: true };
    const response = await db.get(testDocId, params);

    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.data._id).to.equal(testDocId);
    expect(response.data.movie).to.equal(testInfo.movie);
    expect(response.data.character).to.equal(testInfo.character);
    expect(response.data.favoriteLine).to.equal(doc.favoriteLine); // new line from previous .insert(data) test
  });

  it('.delete(id, params) - deletes the specified document', async() => {
    const params = { rev: testDocRev2 }; // `delete` requires the latest revision
    const response = await db.delete(testDocId, params);

    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.data.ok).to.equal(true);
    expect(response.data).to.have.own.property('id');
    expect(response.data).to.have.own.property('rev');
  });
});

