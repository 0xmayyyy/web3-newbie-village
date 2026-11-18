const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const R = win.STAR_CH02_RSI;

function runLength(flags) {
  var best = 0;
  var cur = 0;
  flags.forEach(function (flag) {
    cur = flag ? cur + 1 : 0;
    if (cur > best) best = cur;
  });
  return best;
}

test('Wilder edges are 100, 0, 50, and not a fake zero', function () {
  var up = [];
  var down = [];
  var flat = [];
  var i;
  for (i = 0; i < 20; i++) {
    up.push(100 + i);
    down.push(100 - i);
    flat.push(100);
  }
  assert.equal(R.rsi(up, 14)[13], null);
  assert.equal(R.rsi(up, 14)[14], 100);
  assert.equal(R.rsi(down, 14)[14], 0);
  assert.equal(R.rsi(flat, 14)[14], 50);
  assert.deepEqual(R.rsi([1, 2, 3], 14), [null, null, null]);
  var prefix = R.rsi(up.slice(0, 16), 14)[15];
  assert.equal(prefix, R.rsi(up, 14)[15]);
});

test('each RSI scene has 90 bars and the required signal', function () {
  var scenes = R.buildScenes();
  ['hot', 'cold', 'bear', 'bull', 'fake', 'exam'].forEach(function (id) {
    var scene = scenes[id];
    assert.ok(scene.visible >= 90, id + ' ' + scene.visible);
    assert.notEqual(scene.rsi[scene.visibleFrom], null);
    scene.bars.forEach(function (bar) {
      assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
    });
  });
  assert.ok(runLength(scenes.hot.rsi.map(function (value, i) { return i >= 60 && value > 70; })) >= 8);
  assert.ok(runLength(scenes.cold.rsi.map(function (value, i) { return i >= 60 && value < 30; })) >= 8);
  function bearPair(scene) {
    var found = false;
    scene.highs.forEach(function (a) {
      scene.highs.forEach(function (b) {
        if (a < b && scene.bars[b].h > scene.bars[a].h && scene.rsi[b] < scene.rsi[a]) found = true;
      });
    });
    return found;
  }
  function bullPair(scene) {
    var found = false;
    scene.lows.forEach(function (a) {
      scene.lows.forEach(function (b) {
        if (a < b && scene.bars[b].l < scene.bars[a].l && scene.rsi[b] > scene.rsi[a]) found = true;
      });
    });
    return found;
  }
  assert.equal(bearPair(scenes.bear), true);
  assert.equal(bullPair(scenes.bull), true);
  assert.equal(bearPair(scenes.fake), false);
  assert.equal(bearPair(scenes.exam), true);
  var examEnd = scenes.exam.visibleFrom + 40;
  assert.ok(scenes.exam.bars[examEnd - 1].c > scenes.exam.bars[scenes.exam.visibleFrom].c * 1.01);
});
