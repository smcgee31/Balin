'use strict';

const { expect } = require('chai');
const dbName = 'testing_npm_pkg';
const host = 'http://localhost:5984';
const db = require('../axiouch')(host, dbName);
// const db = axiouch(host, dbName);

describe('first test', () => {
  const data = { test: 1 };

  it('runs fine', async() => {
    const result = await db.insert(data);

    expect(result).to.equal(true);
  });
});

