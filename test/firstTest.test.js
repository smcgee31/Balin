'use strict';

const { expect } = require('chai');
const dbName = 'testing_npm_pkg';
const host = 'http://127.0.0.1:5984/';
const db = require('../axiouch')(host, dbName);
// const db = axiouch(host, dbName);

describe('#insert', () => {
  const jsonInfo = { test: 5 };

  it('adds a record to test db', async() => {
    const { data } = await db.insert(jsonInfo);

    expect(data.ok).to.equal(true);
  });
});

