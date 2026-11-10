/* Teaching swings for lesson 3. Swing prices are pivots inside OHLC candles, not the candles themselves. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STAR_A3 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function round2(n) { return Math.round(n * 100) / 100; }

  var SETS = {
    up: [
      { k: 'L', p: 90 }, { k: 'H', p: 105 }, { k: 'L', p: 96 }, { k: 'H', p: 112 },
      { k: 'L', p: 101 }, { k: 'H', p: 120 }, { k: 'L', p: 108 }
    ],
    down: [
      { k: 'H', p: 120 }, { k: 'L', p: 104 }, { k: 'H', p: 114 }, { k: 'L', p: 98 },
      { k: 'H', p: 108 }, { k: 'L', p: 92 }, { k: 'H', p: 102 }
    ],
    range: [
      { k: 'L', p: 96 }, { k: 'H', p: 108 }, { k: 'L', p: 98 }, { k: 'H', p: 107 },
      { k: 'L', p: 97 }, { k: 'H', p: 109 }, { k: 'L', p: 99 }
    ]
  };

  function build(swings) {
    var gap = 5;
    var at = {};
    swings.forEach(function (swing, n) { at[2 + n * gap] = swing; });
    var last = 2 + (swings.length - 1) * gap;
    var len = last + 3;
    var bars = [];
    function near(i) {
      var prev = null;
      var next = null;
      var keys = Object.keys(at).map(Number).sort(function (a, b) { return a - b; });
      keys.forEach(function (idx) {
        if (idx <= i) prev = idx;
        if (next == null && idx >= i) next = idx;
      });
      return { prev: prev, next: next };
    }
    for (var i = 0; i < len; i++) {
      var swing = at[i];
      var o;
      var h;
      var l;
      var c;
      if (swing && swing.k === 'H') {
        h = swing.p;
        o = round2(swing.p - 2.4);
        c = round2(swing.p - 1.1);
        l = round2(swing.p - 3.2);
      } else if (swing && swing.k === 'L') {
        l = swing.p;
        o = round2(swing.p + 2.2);
        c = round2(swing.p + 0.9);
        h = round2(swing.p + 3.0);
      } else {
        var nb = near(i);
        var a = at[nb.prev] || swings[0];
        var b = at[nb.next] || swings[swings.length - 1];
        var span = Math.max(1, (nb.next == null ? i : nb.next) - (nb.prev == null ? 0 : nb.prev));
        var t = nb.prev == null ? 0 : (i - nb.prev) / span;
        var mid = a.p + (b.p - a.p) * t;
        var wave = Math.sin(i * 1.7) * 0.35;
        mid += wave;
        h = round2(mid + 1.15);
        l = round2(mid - 1.15);
        if (b.k === 'H') h = Math.min(h, round2(b.p - 1.8));
        if (b.k === 'L') l = Math.max(l, round2(b.p + 1.8));
        if (a.k === 'H') h = Math.min(h, round2(a.p - 1.8));
        if (a.k === 'L') l = Math.max(l, round2(a.p + 1.8));
        if (h <= l) h = round2(l + 1.2);
        o = round2(l + (h - l) * 0.35);
        c = round2(l + (h - l) * (i % 2 ? 0.72 : 0.28));
      }
      if (h < Math.max(o, c)) h = Math.max(o, c);
      if (l > Math.min(o, c)) l = Math.min(o, c);
      bars.push({
        i: i,
        start: i * 240,
        o: round2(o),
        h: round2(h),
        l: round2(l),
        c: round2(c),
        v: 60 + ((i * 37 + swings.length * 11) % 140)
      });
    }
    Object.keys(at).forEach(function (key) {
      var idx = Number(key);
      var swing = at[idx];
      for (var d = 1; d <= 2; d++) {
        [idx - d, idx + d].forEach(function (j) {
          if (j < 0 || j >= bars.length || at[j]) return;
          var bar = bars[j];
          if (swing.k === 'H') {
            bar.h = round2(Math.min(bar.h, swing.p - 0.8 - d * 0.25));
            if (bar.l > bar.h - 0.7) bar.l = round2(bar.h - 0.9);
          }
          if (swing.k === 'L') {
            bar.l = round2(Math.max(bar.l, swing.p + 0.8 + d * 0.25));
            if (bar.h < bar.l + 0.7) bar.h = round2(bar.l + 0.9);
          }
          var top = Math.max(bar.l + 0.4, Math.min(bar.h - 0.15, Math.max(bar.o, bar.c)));
          var bot = Math.min(bar.h - 0.4, Math.max(bar.l + 0.15, Math.min(bar.o, bar.c)));
          bar.o = round2(bot);
          bar.c = round2(top);
          if (bar.h < Math.max(bar.o, bar.c)) bar.h = round2(Math.max(bar.o, bar.c) + 0.2);
          if (bar.l > Math.min(bar.o, bar.c)) bar.l = round2(Math.min(bar.o, bar.c) - 0.2);
        });
      }
    });
    return bars;
  }

  function confirmed(bars, shown) {
    var out = [];
    var end = shown == null ? bars.length : shown;
    for (var i = 2; i + 2 < end && i + 2 < bars.length; i++) {
      var bar = bars[i];
      var high = true;
      var low = true;
      for (var d = 1; d <= 2; d++) {
        if (!(bar.h > bars[i - d].h && bar.h > bars[i + d].h)) high = false;
        if (!(bar.l < bars[i - d].l && bar.l < bars[i + d].l)) low = false;
      }
      if (high) out.push({ i: i, k: 'H', p: bar.h });
      else if (low) out.push({ i: i, k: 'L', p: bar.l });
    }
    return out;
  }

  function provisional(bars, shown) {
    var out = [];
    for (var i = 2; i < shown && i < bars.length; i++) {
      if (i + 2 < shown) continue;
      var bar = bars[i];
      var high = true;
      var low = true;
      for (var d = 1; d <= 2; d++) {
        if (i - d < 0 || !(bar.h > bars[i - d].h)) high = false;
        if (i - d < 0 || !(bar.l < bars[i - d].l)) low = false;
        if (i + d < shown) {
          if (!(bar.h > bars[i + d].h)) high = false;
          if (!(bar.l < bars[i + d].l)) low = false;
        }
      }
      if (high) out.push({ i: i, k: 'H', p: bar.h, dash: true });
      else if (low) out.push({ i: i, k: 'L', p: bar.l, dash: true });
    }
    return out;
  }

  function relate(list, item) {
    var prev = null;
    list.forEach(function (point) {
      if (point.i < item.i && point.k === item.k) prev = point;
    });
    if (!prev) return { prev: null, dir: 'first' };
    if (item.p > prev.p) return { prev: prev, dir: 'up' };
    if (item.p < prev.p) return { prev: prev, dir: 'down' };
    return { prev: prev, dir: 'flat' };
  }

  function tag(list, item) {
    var rel = relate(list, item);
    if (!rel.prev) return item.k;
    if (item.k === 'H') return rel.dir === 'up' ? 'HH' : 'LH';
    return rel.dir === 'up' ? 'HL' : 'LL';
  }

  function pack(key) {
    var swings = SETS[key];
    var bars = build(swings);
    return { key: key, swings: swings, bars: bars, pivots: confirmed(bars) };
  }

  return {
    sets: SETS,
    build: build,
    confirmed: confirmed,
    provisional: provisional,
    relate: relate,
    tag: tag,
    pack: pack
  };
});
