'use strict';

const Taminion = require('./lib/client');

module.exports = function(couchHost) {
  return new Taminion(couchHost);
};
