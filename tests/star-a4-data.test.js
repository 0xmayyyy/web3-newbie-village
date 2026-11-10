var test = require('node:test');
var assert = require('node:assert/strict');
var A = require('../js/star-a4-data.js');

test('the twelve candles match the specified OHLC', function () {
  var want = [
    [103, 106, 101, 105], [105, 107, 102, 103], [103, 104, 99, 101], [101, 106, 100, 105],
    [105, 110, 104, 109], [109, 111, 106, 107], [107, 108, 102, 103], [103, 105, 98, 101],
    [101, 107, 100, 106], [106, 110, 105, 109], [109, 112, 107, 111], [111, 113, 104, 105]
  ];
  var got = A.bars().map(function (bar) { return [bar.o, bar.h, bar.l, bar.c]; });
  assert.deepEqual(got, want);
  A.bars().forEach(function (bar) {
    assert.ok(bar.h >= Math.max(bar.o, bar.c));
    assert.ok(bar.l <= Math.min(bar.o, bar.c));
  });
});

test('a nearby band is accepted and a one-pixel line is not', function () {
  assert.equal(A.reasonable(97.6, 102.4, A.support), true);
  assert.equal(A.reasonable(98, 98.2, A.support), false);
  assert.equal(A.reasonable(108.7, 112.4, A.resist), true);
  assert.equal(A.reasonable(90, 94, A.support), false);
});
