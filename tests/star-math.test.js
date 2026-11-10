const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const M = new Function('window', fs.readFileSync('js/star-math.js', 'utf8') + '\nreturn window.STAR_MATH;')({});

test('EMA3 and EMA5 match the teaching closes', function () {
  var c = [100, 102, 104, 100, 98];
  var e3 = M.ema(c, 3).map(function (n) { return M.round(n, 6); });
  var e5 = M.ema(c, 5).map(function (n) { return M.round(n, 6); });
  assert.deepEqual(e3, [100, 101, 102.5, 101.25, 99.625]);
  assert.deepEqual(e5, [100, 100.666667, 101.777778, 101.185185, 100.123457]);
});

test('Bollinger N=3 k=2 on 98,100,102', function () {
  var band = M.bollinger([98, 100, 102], 3, 2)[2];
  assert.equal(M.round(band.mid, 6), 100);
  assert.equal(M.round(band.upper, 3), 103.266);
  assert.equal(M.round(band.lower, 3), 96.734);
});

test('up retracement from 100 to 140 puts 0.618 at 115.28', function () {
  var level = M.fibUp(100, 140).filter(function (lv) { return lv.r === 0.618; })[0];
  assert.equal(M.round(level.price, 2), 115.28);
});

test('every built candle keeps a valid OHLC order', function () {
  var bars = M.barsFromCloses([100, 102, 104, 100, 98, 110, 90]);
  bars.forEach(function (bar) { assert.equal(M.validBar(bar), true); });
});

test('position size, expectancy, and five one-percent losses', function () {
  var pos = M.positionQty(1000, 0.01, 100, 95);
  assert.equal(pos.qty, 2);
  assert.equal(M.expectancy(0.4, 200, 100, 0), 20);
  assert.equal(M.round(M.expectancy(0.8, 20, 100, 0), 4), -4);
  assert.equal(M.round(M.pathEquity(1000, [0.01, 0.01, 0.01, 0.01, 0.01]), 2), 950.99);
});

test('histogram is DIF minus DEA, and Pearson of a reverse series is -1', function () {
  var series = [];
  for (var i = 0; i < 40; i++) series.push(100 + i * 0.4);
  var m = M.macd(series);
  var last = series.length - 1;
  assert.equal(M.round(m.hist[last], 6), M.round(m.dif[last] - m.dea[last], 6));
  assert.equal(M.pearson([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]), -1);
  assert.equal(M.pearson([1, 1, 1], [2, 3, 4]), null);
});
