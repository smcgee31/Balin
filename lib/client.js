'use strict';

const { create } = require('axios');
const queryBuilder = require('./queryBuilder');

module.exports = class DbClient {
  constructor(couchHostUrl) {
    const axiouch = create({ baseURL: couchHostUrl });

    this.use = (dbName) => {
      return new DocClient(couchHostUrl, dbName);
    };
    this.create = (dbName) => {
      return axiouch.put(`${ dbName }`);
    };
    this.destroy = (dbName) => {
      return axiouch.delete(`${ dbName }`);
    };
  }
};

class DocClient {
  constructor(couchHostUrl, dbName) {
    const db = create({ baseURL: couchHostUrl });

    this.insert = (data) => { // if _id and _rev are included in data then it is an update, otherwise it is a new doc
      return db.post(dbName, data);
    };

    this.get = (id, params) => {
      return params === undefined
        ? db.get(`${ dbName }/${ id }`)
        : db.get(`${ dbName }/${ id }${ queryBuilder(params) }`);
    };

    this.delete = (id, params) => {
      return db.delete(`${ dbName }/${ id }/${ queryBuilder(params) }`);
    };

    // TODO: documentation & test? how do you write a view on the fly?
    //        then call the view in a test?
    this.view = (designDoc, viewName, params) => {
      if (params.keys) {
        return db.post(`${ dbName }/_design/${ designDoc }/_view/${ viewName }`, params);
      }

      return db.get(`${ dbName }/_design/${ designDoc }/_view/${ viewName }${ queryBuilder(params) }`);
    };
  }
}
