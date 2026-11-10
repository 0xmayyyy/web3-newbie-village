var test = require('node:test');
var assert = require('node:assert/strict');
var A = require('../js/star-a2-data.js');

function ohlcv(bar) {
  return [bar.o, bar.h, bar.l, bar.c, bar.v];
}

test('every hour matches its twelve 5-minute candles', function () {
  var pack = A.day();
  assert.equal(pack.m5.length, 288);
  assert.equal(pack.h1.length, 24);
  pack.h1.forEach(function (hour, i) {
    var got = A.aggregate(pack.m5.slice(i * 12, i * 12 + 12));
    assert.deepEqual(ohlcv(hour), ohlcv(got), 'hour ' + i);
  });
});

test('the daily candle matches its 24 hours and its 288 5-minute candles', function () {
  var pack = A.day();
  assert.deepEqual(ohlcv(pack.d1), ohlcv(A.aggregate(pack.h1)));
  assert.deepEqual(ohlcv(pack.d1), ohlcv(A.aggregate(pack.m5)));
});

test('the teaching day rises overall and the afternoon two hours fall', function () {
  var pack = A.day();
  assert.equal(pack.d1.o, 100);
  assert.equal(pack.d1.c, 105);
  assert.ok(pack.d1.c > pack.d1.o);
  assert.ok(pack.d1.h > pack.d1.c);
  assert.ok(pack.d1.l < pack.d1.o);
  var aft = pack.m5.slice(156, 180);
  assert.equal(aft.length, 24);
  assert.equal(aft[0].o, 108);
  assert.equal(aft[aft.length - 1].c, 103);
  assert.ok(aft[aft.length - 1].c < aft[0].o);
  var bulls = pack.m5.filter(function (bar) { return bar.c > bar.o; }).length;
  var bears = pack.m5.filter(function (bar) { return bar.c < bar.o; }).length;
  assert.ok(bulls > 20 && bears > 20);
  var pullbacks = aft.filter(function (bar) { return bar.c > bar.o; }).length;
  assert.ok(pullbacks > 0);
  assert.ok(pack.m5.some(function (bar) { return bar.h > Math.max(bar.o, bar.c) + 0.05; }));
  assert.ok(pack.m5.some(function (bar) { return bar.l < Math.min(bar.o, bar.c) - 0.05; }));
  var vols = {};
  pack.m5.forEach(function (bar) { vols[bar.v] = true; });
  assert.ok(Object.keys(vols).length > 20);
  var straight = pack.m5.every(function (bar, i) {
    return i === 0 || bar.c >= pack.m5[i - 1].c;
  });
  assert.equal(straight, false);
});
