'use strict';

const Axiouch = require('./lib/client');

module.exports = function(couchHost) {
  return new Axiouch(couchHost);
};
