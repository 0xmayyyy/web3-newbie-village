const test = require('node:test');
const assert = require('node:assert/strict');
const math = require('../js/lab-draw-math.js');

test('fibonacci levels follow the two anchors, including a reverse pull', function () {
  assert.equal(math.fibPrice(100, 200, 0), 100);
  assert.equal(math.fibPrice(100, 200, 1), 200);
  assert.equal(math.fibPrice(100, 200, 0.5), 150);
  assert.ok(Math.abs(math.fibPrice(100, 200, 0.618) - 161.8) < 1e-9);
  assert.equal(math.fibPrice(200, 100, 0), 200);
  assert.equal(math.fibPrice(200, 100, 1), 100);
  assert.ok(Math.abs(math.fibPrice(200, 100, 0.618) - 138.2) < 1e-9);
  assert.deepEqual(math.LEVELS, [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]);
});

test('drawings for different coins and timeframes do not share a key', function () {
  assert.equal(math.storageKey('BTC', '4h'), 'BTC|4h');
  assert.notEqual(math.storageKey('BTC', '4h'), math.storageKey('ETH', '4h'));
  assert.notEqual(math.storageKey('BTC', '4h'), math.storageKey('BTC', '1d'));
});

test('undo and redo stay on the book they were committed to', function () {
  var btc = math.createBook();
  var eth = math.createBook();
  btc.commit([{ id: 'a', type: 'hline', price: 1 }]);
  eth.commit([{ id: 'b', type: 'hline', price: 2 }]);
  assert.equal(btc.undo(), true);
  assert.deepEqual(btc.items(), []);
  assert.equal(btc.items()[0], undefined);
  assert.equal(eth.items()[0].price, 2);
  assert.equal(btc.redo(), true);
  assert.equal(btc.items()[0].price, 1);
  assert.equal(eth.canUndo(), true);
});

test('saved drawings keep only anchored shapes', function () {
  var clean = math.sanitize([
    { id: 'h', type: 'hline', price: 10 },
    { id: 't', type: 'trend', a: { time: 1, price: 2 }, b: { time: 3, price: 4 } },
    { id: 'bad', type: 'trend', a: { time: 'yesterday', price: 2 }, b: { time: 3, price: 4 } },
    { id: 'pix', type: 'hline', x: 12, y: 40 },
    null
  ]);
  assert.deepEqual(clean.map(function (item) { return item.id; }), ['h', 't']);
});

test('a point on a segment is closer than a point beside it', function () {
  assert.ok(math.distToSeg(5, 0, 0, 0, 10, 0) < 0.01);
  assert.ok(math.distToSeg(5, 8, 0, 0, 10, 0) > 7);
});
