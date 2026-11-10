var test = require('node:test');
var assert = require('node:assert/strict');
var A = require('../js/star-a5-data.js');

test('shared history and the three sequels match the specified OHLC', function () {
  var all = A.series(null);
  assert.equal(all.length, 8);
  assert.deepEqual(all.map(function (bar) { return [bar.o, bar.h, bar.l, bar.c]; }), A.base);
  assert.deepEqual(A.series('A').slice(8).map(function (bar) { return [bar.o, bar.h, bar.l, bar.c]; }), A.extra.A);
  assert.deepEqual(A.series('B').slice(8).map(function (bar) { return [bar.o, bar.h, bar.l, bar.c]; }), A.extra.B);
  assert.deepEqual(A.series('C').slice(8).map(function (bar) { return [bar.o, bar.h, bar.l, bar.c]; }), A.extra.C);
});

test('candle 9 is not labeled a close break when only the wick is past 111', function () {
  var a9 = A.series('A')[8];
  var b9 = A.series('B')[8];
  assert.equal(a9.h, 113);
  assert.equal(a9.c, 108);
  assert.equal(A.kind(a9), 'wick');
  assert.equal(A.kind(b9), 'close');
  assert.equal(A.kind(A.series('C')[9]), 'wick');
  assert.ok(A.series(null).every(function (bar) { return A.kind(bar) === 'inside'; }));
});
