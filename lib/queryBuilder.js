
module.exports = function queryBuilder(params) {
  const len = Object.entries(params).length;
  const query = Object.entries(params).reduce((q, [ k, v ], i) => {
    if (typeof v === 'boolean' || k === 'rev') {
      q += `${ k }=${ v }&`;
    } else {
      q += `${ k }="${ v }"&`;
    }

    if (i === len - 1) {
      return q.slice(0, -1);
    }

    return q;
  }, '?');

  return query;
};
// TODO: needs tests
