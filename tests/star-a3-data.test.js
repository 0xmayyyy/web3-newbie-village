var test = require('node:test');
var assert = require('node:assert/strict');
var A = require('../js/star-a3-data.js');

function expectSwings(key) {
  var built = A.pack(key);
  var got = built.pivots.map(function (point) { return point.k + point.p; });
  var want = A.sets[key].map(function (point) { return point.k + point.p; });
  assert.deepEqual(got, want, key);
  built.bars.forEach(function (bar) {
    assert.ok(bar.h >= Math.max(bar.o, bar.c));
    assert.ok(bar.l <= Math.min(bar.o, bar.c));
  });
  assert.ok(built.bars.some(function (bar) { return bar.c >= bar.o; }));
  assert.ok(built.bars.some(function (bar) { return bar.c < bar.o; }));
  assert.ok(built.bars.some(function (bar) { return bar.h > Math.max(bar.o, bar.c) + 0.2; }));
  assert.ok(built.bars.some(function (bar) { return bar.l < Math.min(bar.o, bar.c) - 0.2; }));
}

test('up, down, and range pivots match the specified swings', function () {
  expectSwings('up');
  expectSwings('down');
  expectSwings('range');
});

test('a swing is not confirmed until two bars have printed to its right', function () {
  var bars = A.pack('up').bars;
  var early = A.confirmed(bars, 7);
  assert.ok(early.every(function (point) { return point.i + 2 < 7; }));
  var dashed = A.provisional(bars, 7);
  assert.ok(dashed.length > 0);
  assert.ok(dashed.every(function (point) { return point.i + 2 >= 7; }));
});

test('tags follow the previous pivot of the same kind', function () {
  var list = A.pack('up').pivots;
  assert.equal(A.tag(list, list[1]), 'H');
  assert.equal(A.tag(list, list[3]), 'HH');
  assert.equal(A.tag(list, list[2]), 'HL');
  var down = A.pack('down').pivots;
  assert.equal(A.tag(down, down[2]), 'LH');
  assert.equal(A.tag(down, down[3]), 'LL');
});
