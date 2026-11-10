var test = require('node:test');
var assert = require('node:assert/strict');
var A = require('../js/star-a6-data.js');

test('the eight candles match the specified OHLC and BTC volume', function () {
  var want = [
    [100, 103, 99, 102, 80],
    [102, 106, 101, 105, 120],
    [105, 107, 103, 104, 95],
    [104, 110, 103, 109, 180],
    [109, 111, 107, 108, 130],
    [108, 112, 107, 111, 75],
    [111, 112, 106, 107, 210],
    [107, 109, 104, 105, 160]
  ];
  assert.deepEqual(A.bars().map(function (bar) { return [bar.o, bar.h, bar.l, bar.c, bar.v]; }), want);
});

test('volume change is versus the previous candle, and the named bars match', function () {
  var bars = A.bars();
  assert.equal(A.compare(bars[1], bars[0]).tag, 'upMore');
  assert.equal(A.compare(bars[5], bars[4]).tag, 'upLess');
  assert.equal(A.compare(bars[6], bars[5]).tag, 'downMore');
  assert.equal(bars[5].o, 108);
  assert.equal(bars[5].c, 111);
  assert.equal(bars[5].v, 75);
  assert.equal(bars[4].v, 130);
  assert.equal(bars[6].v, 210);
});
