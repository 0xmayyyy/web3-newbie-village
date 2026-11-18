const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const S = win.STAR_CH02_SMC;

test('the three-candle example is a bullish gap from 103 to 106', function () {
  var zone = S.fvgExample(S.example);
  assert.equal(zone.low, 103);
  assert.equal(zone.high, 106);
  assert.equal(S.example[2].l > S.example[0].h, true);
});

test('BOS, CHoCH, sweep, FVG, and the order block do not share one bar', function () {
  var info = S.read(S.bars);
  assert.ok(info.bos.some(function (item) { return item.i === 9 && item.dir === 'up'; }));
  assert.ok(info.choch.some(function (item) { return item.i === 16; }));
  assert.equal(info.bos.some(function (item) { return item.i === 16; }), false);
  assert.ok(info.sweeps.some(function (item) { return item.i === 19; }));
  assert.equal(info.bos.some(function (item) { return item.i === 19; }), false);
  var gap = info.fvgs.filter(function (item) { return item.i === 22; })[0];
  assert.equal(gap.low, 112);
  assert.equal(gap.high, 116);
  assert.ok(info.obs.some(function (item) { return item.bos === 9; }));
  S.bars.forEach(function (bar) {
    assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
  });
});

test('events that need later bars stay hidden', function () {
  var early = S.read(S.bars.slice(0, 10));
  assert.equal(early.choch.length, 0);
  assert.equal(early.fvgs.some(function (item) { return item.i === 22; }), false);
  assert.ok(early.bos.some(function (item) { return item.i === 9; }));
});
