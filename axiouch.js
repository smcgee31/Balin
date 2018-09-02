'use strict';

const Axiouch = require('./lib/client');

module.exports = function(couchHost, dbName) {
  return new Axiouch(couchHost, dbName);
};
