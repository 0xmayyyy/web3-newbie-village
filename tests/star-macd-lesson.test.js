const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const M = win.STAR_CH02_MACD;

test('histogram is DIF minus DEA, and a short sample is not zero', function () {
  var closes = [];
  for (var i = 0; i < 40; i++) closes.push(100 + i);
  var pack = M.macd(closes);
  assert.equal(pack.dif[10], null);
  assert.equal(pack.dea[10], null);
  assert.equal(pack.hist[10], null);
  var last = closes.length - 1;
  assert.equal(pack.hist[last], pack.dif[last] - pack.dea[last]);
  assert.equal(M.macd(closes.slice(0, 30)).dif[29], M.macd(closes).dif[29]);
});

test('each MACD scene has 90 bars and the required signal', function () {
  var scenes = M.buildScenes();
  ['above', 'fail', 'shrink', 'div', 'fake', 'exam'].forEach(function (id) {
    var scene = scenes[id];
    assert.ok(scene.visible >= 90, id + ' ' + scene.visible);
    assert.notEqual(scene.macd.hist[scene.visibleFrom], null);
    scene.bars.forEach(function (bar) {
      assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
    });
  });
  var aboveGold = scenes.above.gold.filter(function (i) { return scenes.above.macd.dif[i] > 0; });
  assert.ok(aboveGold.length >= 1);
  assert.ok(scenes.above.death.length >= 1);
  var below = scenes.fail.gold.filter(function (i) { return scenes.fail.macd.dif[i] <= 0; });
  assert.ok(below.length >= 1);
  assert.ok(scenes.fail.bars.slice(below[0] + 1).some(function (bar) { return bar.l < scenes.fail.bars[below[0]].l; }));
  assert.ok(scenes.shrink.shrink.length >= 1);
  var divA = scenes.div.highs[0];
  var divB = scenes.div.highs[scenes.div.highs.length - 1];
  assert.ok(scenes.div.bars[divB].h > scenes.div.bars[divA].h);
  assert.ok(scenes.div.macd.dif[divB] < scenes.div.macd.dif[divA]);
  var fakeA = scenes.fake.highs[0];
  var fakeB = scenes.fake.highs[scenes.fake.highs.length - 1];
  assert.ok(!(scenes.fake.bars[fakeB].h > scenes.fake.bars[fakeA].h));
  assert.ok(scenes.exam.zero.length >= 1);
});
