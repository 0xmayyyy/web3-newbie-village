const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const E = win.STAR_CH02_EMA;

test('EMA seed is the first N-bar average, then the recursive formula', function () {
  var values = E.ema([100, 102, 104, 100, 98], 3);
  assert.equal(values[0], null);
  assert.equal(values[1], null);
  assert.equal(values[2], 102);
  assert.equal(values[3], 101);
  assert.equal(values[4], 99.5);
});

test('a short sample does not invent a zero', function () {
  var values = E.ema([100, 102], 20);
  assert.deepEqual(values, [null, null]);
});

test('each EMA scene has 90 visible bars, warmup, and a real answer', function () {
  var scenes = E.buildScenes();
  ['trend', 'range', 'crash', 'exam'].forEach(function (id) {
    var scene = scenes[id];
    assert.ok(scene.visible >= 90, id);
    assert.equal(scene.visibleFrom, 60);
    scene.bars.forEach(function (bar) {
      assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
      assert.ok(bar.v > 0);
    });
    var closes = scene.bars.map(function (bar) { return bar.c; });
    var fast = E.ema(closes, 20);
    var slow = E.ema(closes, 50);
    assert.notEqual(fast[scene.visibleFrom], null);
    assert.notEqual(slow[scene.visibleFrom], null);
    var full = E.ema(closes, 20)[80];
    var prefix = E.ema(closes.slice(0, 81), 20)[80];
    assert.equal(full, prefix);
  });
  assert.ok(scenes.trend.near.length >= 1);
  assert.ok(scenes.trend.rising.length >= 8);
  assert.ok(scenes.range.crosses.length >= 2);
  assert.ok(scenes.crash.crash.length >= 1);
  assert.ok(scenes.exam.crash.length >= 1);
  var pull = scenes.trend.near[0];
  var fast = E.ema(scenes.trend.bars.map(function (bar) { return bar.c; }), 20);
  assert.equal(E.nearLine(scenes.trend.bars[pull].c, fast[pull]), true);
});

test('changing the period recalculates a different line', function () {
  var closes = E.buildScenes().trend.bars.map(function (bar) { return bar.c; });
  var last = closes.length - 1;
  assert.notEqual(E.ema(closes, 20)[last], E.ema(closes, 50)[last]);
});
