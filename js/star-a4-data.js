/* Lesson 4 teaching candles. OHLC values are the ones given in the lesson spec. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STAR_A4 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var RAWS = [
    [103, 106, 101, 105],
    [105, 107, 102, 103],
    [103, 104, 99, 101],
    [101, 106, 100, 105],
    [105, 110, 104, 109],
    [109, 111, 106, 107],
    [107, 108, 102, 103],
    [103, 105, 98, 101],
    [101, 107, 100, 106],
    [106, 110, 105, 109],
    [109, 112, 107, 111],
    [111, 113, 104, 105]
  ];
  var SUPPORT = { lo: 98, hi: 102 };
  var RESIST = { lo: 109, hi: 112 };

  function bars() {
    return RAWS.map(function (row, i) {
      return {
        i: i,
        start: i * 240,
        o: row[0],
        h: row[1],
        l: row[2],
        c: row[3],
        v: 70 + ((i * 29) % 80)
      };
    });
  }

  function zone(a, b) {
    return { lo: Math.min(a, b), hi: Math.max(a, b) };
  }

  function reasonable(a, b, ref) {
    var band = zone(a, b);
    var width = band.hi - band.lo;
    if (width < 1.5 || width > 8) return false;
    var overlap = Math.min(band.hi, ref.hi) - Math.max(band.lo, ref.lo);
    return overlap >= 1.5;
  }

  return { bars: bars, support: SUPPORT, resist: RESIST, zone: zone, reasonable: reasonable };
});
