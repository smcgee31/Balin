'use strict';

const { create } = require('axios');
const queryBuilder = require('./queryBuilder');

module.exports = class DbClient {
  constructor(couchHostUrl) {
    const taminion = create({ baseURL: couchHostUrl });

    this.use = (dbName) => {
      return new DocClient(couchHostUrl, dbName);
    };
    this.create = (dbName) => {
      return taminion.put(`${ dbName }`);
    };
    this.destroy = (dbName) => {
      return taminion.delete(`${ dbName }`);
    };
  }
};

class DocClient {
  constructor(couchHostUrl, dbName) {
    const db = create({ baseURL: couchHostUrl });

    this.insert = (data) => {
      return db.post(dbName, data);
    };

    this.get = (id, params) => {
      return params === undefined
        ? db.get(`${ dbName }/${ id }`)
        : db.get(`${ dbName }/${ id }${ queryBuilder(params) }`);
    };

    // TODO: documentation
    this.view = (designDoc, viewName, params) => {
      // TODO: can params be undefined?
      return db.get(`${ dbName }/_design/${ designDoc }/_view/${ viewName }${ queryBuilder(params) }`);
    };
  }
}
