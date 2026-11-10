/* Lesson 5 teaching candles. The first 8 bars are shared. A, B, and C are mutually exclusive sequels. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STAR_A5 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var BASE = [
    [103, 106, 101, 105], [105, 109, 104, 108], [108, 110, 105, 106], [106, 107, 100, 102],
    [102, 105, 99, 104], [104, 109, 103, 108], [108, 110, 106, 107], [107, 109, 102, 105]
  ];
  var EXTRA = {
    A: [[105, 113, 104, 108], [108, 109, 103, 104]],
    B: [[105, 114, 104, 112], [112, 113, 109, 110], [110, 116, 109, 115]],
    C: [[105, 114, 104, 112], [112, 113, 105, 107], [107, 109, 101, 103]]
  };
  var CLOSE_LINE = 111;

  function toBars(rows, offset) {
    return rows.map(function (row, i) {
      var n = offset + i;
      return { i: n, start: n * 240, o: row[0], h: row[1], l: row[2], c: row[3], v: 64 + ((n * 23) % 70) };
    });
  }

  function series(branch) {
    var rows = BASE.slice();
    if (branch && EXTRA[branch]) rows = rows.concat(EXTRA[branch]);
    return toBars(rows, 0);
  }

  function kind(bar) {
    if (bar.c > CLOSE_LINE) return 'close';
    if (bar.h > CLOSE_LINE) return 'wick';
    return 'inside';
  }

  return { base: BASE, extra: EXTRA, closeLine: CLOSE_LINE, series: series, kind: kind };
});
