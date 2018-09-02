'use strict';

const { create } = require('axios');
const queryBuilder = require('./queryBuilder');

module.exports = class DbClient {
  constructor(couchHostUrl, dbName) {
    const db = create({ baseURL: couchHostUrl }); // couchDbHostURl = https://localhost:5984/ (gets prepended to the dbName)

    this.insert = (data) => {
      return db.post(dbName, data); // dbName = myDataBase becomes https://localhost:5984/myDataBase
    };
    this.view = (designDoc, viewName, params) => {
      return db.get(`${ dbName }/_design/${ designDoc }/_view/${ viewName }${ queryBuilder(params) }`);
    };
  }
};
