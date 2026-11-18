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

test('EMA3 of 10 through 14 matches the hand calculation', function () {
  var values = E.ema([10, 11, 12, 13, 14], 3);
  assert.equal(values[0], null);
  assert.equal(values[1], null);
  assert.equal(values[2], 11);
  assert.equal(values[3], 12);
  assert.equal(values[4], 13);
});

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

function diffVariance(closes, from) {
  var diffs = [];
  var i;
  for (i = from + 1; i < closes.length; i++) diffs.push(closes[i] - closes[i - 1]);
  var mean = diffs.reduce(function (sum, value) { return sum + value; }, 0) / diffs.length;
  return diffs.reduce(function (sum, value) { return sum + (value - mean) * (value - mean); }, 0) / diffs.length;
}

test('each EMA scene is an irregular 160-bar tape with both lines ready', function () {
  var scenes = E.buildScenes();
  ['up', 'down', 'range', 'turn', 'exam'].forEach(function (id) {
    var scene = scenes[id];
    assert.equal(scene.version, 1);
    assert.equal(scene.timeframe, '1h');
    assert.ok(scene.bars.length >= 160, id);
    assert.ok(scene.visible >= 100, id);
    assert.equal(scene.visibleFrom, 60);
    var up = 0;
    var down = 0;
    scene.bars.forEach(function (bar, index) {
      assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
      assert.ok(bar.v > 0);
      if (index > 0) assert.equal(bar.t, scene.bars[index - 1].t + 1);
      if (bar.c >= bar.o) up += 1;
      else down += 1;
    });
    assert.ok(up > 0 && down > 0, id);
    var closes = scene.bars.map(function (bar) { return bar.c; });
    assert.ok(diffVariance(closes, 60) > 1, id);
    var fast = E.ema(closes, 20);
    var slow = E.ema(closes, 50);
    assert.notEqual(fast[60], null);
    assert.notEqual(slow[60], null);
    assert.equal(E.ema(closes, 20)[80], E.ema(closes.slice(0, 81), 20)[80]);
    var period = false;
    var p;
    for (p = 5; p <= 12; p++) {
      var same = true;
      var i;
      for (i = 60; i < scene.bars.length - p; i++) if (scene.bars[i].v !== scene.bars[i + p].v) same = false;
      if (same) period = true;
    }
    assert.equal(period, false);
  });
  assert.ok(scenes.range.crosses.length >= 2);
  assert.ok(scenes.up.near.length >= 1);
  var upCloses = scenes.up.bars.map(function (bar) { return bar.c; });
  var upFast = E.ema(upCloses, 20);
  var bounce = false;
  var sink = false;
  var i;
  for (i = 60; i < scenes.up.bars.length - 2; i++) {
    if (E.nearLine(scenes.up.bars[i].c, upFast[i]) && scenes.up.bars[i + 2].c > scenes.up.bars[i].c) bounce = true;
    if (upFast[i] && scenes.up.bars[i].c < upFast[i] && scenes.up.bars[i + 2].c < scenes.up.bars[i].c) sink = true;
  }
  assert.equal(bounce, true);
  assert.equal(sink, true);
});

test('changing the period recalculates a different line', function () {
  var closes = E.buildScenes().up.bars.map(function (bar) { return bar.c; });
  var last = closes.length - 1;
  assert.notEqual(E.ema(closes, 20)[last], E.ema(closes, 50)[last]);
  assert.deepEqual(E.ema(closes.slice(0, 40), 50).filter(function (value) { return value != null; }), []);
});
