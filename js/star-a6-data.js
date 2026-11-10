/* Lesson 6 spot teaching candles. Volume is BTC traded in that 4-hour bar, not turnover and not net buying. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STAR_A6 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var RAWS = [
    [100, 103, 99, 102, 80],
    [102, 106, 101, 105, 120],
    [105, 107, 103, 104, 95],
    [104, 110, 103, 109, 180],
    [109, 111, 107, 108, 130],
    [108, 112, 107, 111, 75],
    [111, 112, 106, 107, 210],
    [107, 109, 104, 105, 160]
  ];

  function bars() {
    return RAWS.map(function (row, i) {
      return { i: i, start: i * 240, o: row[0], h: row[1], l: row[2], c: row[3], v: row[4] };
    });
  }

  function compare(bar, prev) {
    if (!prev) return { price: 'none', vol: 'none', tag: 'first' };
    var price = bar.c > bar.o ? 'up' : (bar.c < bar.o ? 'down' : 'flat');
    var vol = bar.v > prev.v ? 'more' : (bar.v < prev.v ? 'less' : 'same');
    var tag = 'flat';
    if (price === 'up' && vol === 'more') tag = 'upMore';
    if (price === 'up' && vol === 'less') tag = 'upLess';
    if (price === 'down' && vol === 'more') tag = 'downMore';
    if (price === 'down' && vol === 'less') tag = 'downLess';
    return { price: price, vol: vol, tag: tag };
  }

  return { bars: bars, compare: compare };
});
