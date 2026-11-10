/* Deterministic teaching day for lesson 2. Not market data. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STAR_A2 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function round2(n) { return Math.round(n * 100) / 100; }

  function boundary(t) {
    var base;
    if (t <= 96) base = 100 + 3.4 * (t / 96);
    else if (t <= 156) base = 103.4 + 4.6 * ((t - 96) / 60);
    else if (t <= 180) base = 108 - 5 * ((t - 156) / 24);
    else base = 103 + 2 * ((t - 180) / 108);
    var wave = Math.sin(t * 0.73) * 0.55 + Math.sin(t * 0.19) * 0.25;
    var pins = [0, 96, 156, 180, 288];
    var gate = 1;
    for (var p = 0; p < pins.length; p++) {
      var width = (pins[p] === 156 || pins[p] === 180) ? 2 : 3;
      var dist = Math.abs(t - pins[p]);
      if (dist < width) gate = Math.min(gate, dist / width);
    }
    return round2(base + wave * gate);
  }

  function unit(i, salt) {
    var x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  function buildM5() {
    var out = [];
    for (var i = 0; i < 288; i++) {
      var o = boundary(i);
      var c = boundary(i + 1);
      var top = Math.max(o, c);
      var bot = Math.min(o, c);
      var up = round2(unit(i, 1) < 0.22 ? 0.02 : 0.06 + unit(i, 2) * 0.48);
      var down = round2(unit(i, 3) < 0.22 ? 0.02 : 0.06 + unit(i, 4) * 0.48);
      var range = round2(top - bot + up + down);
      out.push({
        i: i,
        start: i * 5,
        o: o,
        h: round2(top + up),
        l: round2(bot - down),
        c: c,
        v: Math.round(48 + unit(i, 5) * 160 + range * 70)
      });
    }
    return out;
  }

  function aggregate(bars) {
    var h = bars[0].h;
    var l = bars[0].l;
    var v = 0;
    var hi = 0;
    var lo = 0;
    bars.forEach(function (bar, i) {
      if (bar.h > h) { h = bar.h; hi = i; }
      if (bar.l < l) { l = bar.l; lo = i; }
      v += bar.v;
    });
    return {
      start: bars[0].start,
      end: bars[bars.length - 1].start,
      o: bars[0].o,
      h: h,
      l: l,
      c: bars[bars.length - 1].c,
      v: v,
      from: hi,
      to: lo
    };
  }

  function sources(children) {
    var high = 0;
    var low = 0;
    children.forEach(function (bar, i) {
      if (bar.h > children[high].h) high = i;
      if (bar.l < children[low].l) low = i;
    });
    return { o: 0, h: high, l: low, c: children.length - 1 };
  }

  function hoursOf(m5) {
    var out = [];
    for (var i = 0; i < 24; i++) out.push(aggregate(m5.slice(i * 12, i * 12 + 12)));
    return out;
  }

  function day() {
    var m5 = buildM5();
    var h1 = hoursOf(m5);
    var d1 = aggregate(h1);
    return {
      tz: 'UTC+8',
      m5: m5,
      h1: h1,
      d1: d1,
      afternoon: { from: 156, to: 179 }
    };
  }

  return {
    boundary: boundary,
    aggregate: aggregate,
    sources: sources,
    day: day
  };
});
