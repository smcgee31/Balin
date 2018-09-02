'use strict';

const Axiouch = require('./lib/client');

module.exports = function(couchHostUrl, dbName) {
  return new Axiouch(couchHostUrl, dbName);
};
