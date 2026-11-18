const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const win = {};
new Function('window', [
  fs.readFileSync('js/star-pack.js', 'utf8'),
  fs.readFileSync('js/star-math.js', 'utf8'),
  fs.readFileSync('js/star-ch02.js', 'utf8')
].join('\n'))(win);

const D = win.STAR_CH02_DIV;
const M = win.STAR_MATH;

test('the classic highs and RSI come from the same closes', function () {
  var bars = D.classic;
  assert.equal(bars[14].h, 105);
  assert.equal(bars[21].h, 112);
  var lesson = win.STAR_PACK.chapters['02'].lessons.filter(function (item) { return item.id === '05'; })[0];
  assert.equal(lesson.study.bars[14].h, 105);
  assert.equal(lesson.study.bars[21].h, 112);
  var fromMath = M.rsiWilder(bars.map(function (bar) { return bar.c; }), 14);
  var fromLesson = D.rsi(bars.map(function (bar) { return bar.c; }), 14);
  assert.equal(M.round(fromMath[14], 2), 78);
  assert.equal(M.round(fromMath[21], 2), 69);
  assert.equal(M.round(fromLesson[14], 2), 78);
  assert.equal(M.round(fromLesson[21], 2), 69);
});

test('each divergence scene is long enough and keeps a real pair', function () {
  var scenes = D.buildScenes();
  ['bear', 'bear2', 'bull', 'bull2', 'fake', 'agree', 'rally'].forEach(function (id) {
    assert.ok(scenes[id].visible >= 60, id + ' ' + scenes[id].visible);
    scenes[id].bars.forEach(function (bar) {
      assert.equal(bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h, true);
    });
  });
  assert.equal(scenes.bear.bars[14].h, 105);
  assert.equal(scenes.bear.bars[21].h, 112);
  assert.ok(scenes.rally.bars.some(function (bar, i) { return i > 23 && bar.h > 112; }));
  function bear(scene) {
    return scene.highs.some(function (a) {
      return scene.highs.some(function (b) { return a < b && scene.bars[b].h > scene.bars[a].h && scene.rsi[b] < scene.rsi[a]; });
    });
  }
  function bull(scene) {
    return scene.lows.some(function (a) {
      return scene.lows.some(function (b) { return a < b && scene.bars[b].l < scene.bars[a].l && scene.rsi[b] > scene.rsi[a]; });
    });
  }
  assert.equal(bear(scenes.bear), true);
  assert.equal(bear(scenes.bear2), true);
  assert.equal(bull(scenes.bull), true);
  assert.equal(bull(scenes.bull2), true);
  assert.equal(bear(scenes.fake), false);
  assert.equal(bear(scenes.agree), false);
});
