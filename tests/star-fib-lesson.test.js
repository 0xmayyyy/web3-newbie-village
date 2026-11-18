const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const F = win.STAR_CH02_FIB;

test('100 to 140 up retracement matches the worked example', function () {
  var lines = F.levels(100, 140, 'up', 'retrace');
  var price = {};
  lines.forEach(function (line) { price[line.r] = line.price; });
  assert.equal(price[0], 140);
  assert.equal(price[0.236], 130.56);
  assert.equal(price[0.382], 124.72);
  assert.equal(price[0.5], 120);
  assert.equal(price[0.618], 115.28);
  assert.equal(price[0.786], 108.56);
  assert.equal(price[1], 100);
});

test('60000 to 70000 matches the BTC teaching levels', function () {
  var up = F.levels(60000, 70000, 'up', 'retrace');
  var down = F.levels(60000, 70000, 'down', 'retrace');
  function at(lines, ratio) { return lines.filter(function (line) { return line.r === ratio; })[0].price; }
  assert.equal(at(up, 0), 70000);
  assert.equal(at(up, 1), 60000);
  assert.equal(at(up, 0.236), 67640);
  assert.equal(at(up, 0.382), 66180);
  assert.equal(at(up, 0.5), 65000);
  assert.equal(at(up, 0.618), 63820);
  assert.equal(at(up, 0.786), 62140);
  assert.equal(at(down, 0.382), 63820);
  assert.equal(at(down, 0.618), 66180);
});

test('equal anchors draw nothing and an extension sits outside the swing', function () {
  assert.equal(F.levels(100, 100, 'up', 'retrace'), null);
  var ext = F.levels(60000, 70000, 'up', 'extend');
  assert.equal(ext.length, 2);
  assert.ok(ext[1].price > 70000);
});

test('the simulated tape keeps a 60000 low and a 70000 high', function () {
  var tape = F.tape();
  assert.equal(tape.bars[tape.lowAt].l, 60000);
  assert.equal(tape.bars[tape.highAt].h, 70000);
  assert.ok(tape.bars.length > tape.highAt + 10);
  tape.bars.forEach(function (bar) {
    assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
    assert.ok(bar.v > 0);
  });
});
