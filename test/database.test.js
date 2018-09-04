'use strict';

const { expect } = require('chai');
const host = 'http://127.0.0.1:5984/';
const axiouch = require('../axiouch')(host);

describe('Database tests', () => {
  const dbName = 'test-db-1';

  it('.create(dbName) adds a new database', async() => {
    const response = await axiouch.create(dbName);

    expect(response.data.ok).to.equal(true);
  });

  it('.create(dbName) fails to add the same database', async() => {
    try {
      await axiouch.create(dbName);
      throw new Error('Did not throw!');
    } catch (error) {
      expect(error.response.status).to.equal(412);
    }
  });

  it('.destroy(dbName) removes the previously created database', async() => {
    const response = await axiouch.destroy(dbName);

    expect(response.data.ok).to.equal(true);
  });
});

