/* Indicator and teaching math for 进阶知识星 chapters 2–8.
   Closes drive every series. Candles are built so low ≤ min(open, close) ≤ max(open, close) ≤ high. */
(function (global) {
  function round(n, d) {
    var p = Math.pow(10, d == null ? 6 : d);
    return Math.round(n * p) / p;
  }
  function ema(closes, n) {
    if (!closes.length || n < 1) return [];
    var alpha = 2 / (n + 1);
    var out = [closes[0]];
    for (var i = 1; i < closes.length; i++) out.push(alpha * closes[i] + (1 - alpha) * out[i - 1]);
    return out;
  }
  function macd(closes) {
    var fast = ema(closes, 12);
    var slow = ema(closes, 26);
    var dif = closes.map(function (_, i) { return fast[i] - slow[i]; });
    var dea = ema(dif, 9);
    var hist = dif.map(function (v, i) { return v - dea[i]; });
    return { dif: dif, dea: dea, hist: hist };
  }
  function rsiWilder(closes, n) {
    n = n || 14;
    var out = [];
    if (closes.length < 2) return out;
    var gain = 0;
    var loss = 0;
    var i;
    for (i = 1; i <= n && i < closes.length; i++) {
      var ch = closes[i] - closes[i - 1];
      if (ch >= 0) gain += ch;
      else loss -= ch;
    }
    if (i <= n) return closes.map(function () { return null; });
    gain /= n;
    loss /= n;
    function value(g, l) {
      if (g === 0 && l === 0) return 50;
      if (l === 0) return 100;
      return 100 - 100 / (1 + g / l);
    }
    for (i = 0; i < closes.length; i++) out.push(null);
    out[n] = value(gain, loss);
    for (i = n + 1; i < closes.length; i++) {
      var d = closes[i] - closes[i - 1];
      var g = d > 0 ? d : 0;
      var l = d < 0 ? -d : 0;
      gain = (gain * (n - 1) + g) / n;
      loss = (loss * (n - 1) + l) / n;
      out[i] = value(gain, loss);
    }
    return out;
  }
  function bollinger(closes, n, k) {
    n = n || 20;
    k = k == null ? 2 : k;
    return closes.map(function (_, i) {
      if (i + 1 < n) return null;
      var slice = closes.slice(i + 1 - n, i + 1);
      var mean = slice.reduce(function (a, b) { return a + b; }, 0) / n;
      var variance = slice.reduce(function (a, b) { return a + (b - mean) * (b - mean); }, 0) / n;
      var sd = Math.sqrt(variance);
      return { mid: mean, upper: mean + k * sd, lower: mean - k * sd, sd: sd };
    });
  }
  function fibUp(low, high) {
    var span = high - low;
    return [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1].map(function (r) {
      return { r: r, price: high - span * r };
    });
  }
  function fibDown(low, high) {
    var span = high - low;
    return [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1].map(function (r) {
      return { r: r, price: low + span * r };
    });
  }
  function barsFromCloses(closes) {
    var prev = closes[0];
    return closes.map(function (c, i) {
      var o = i === 0 ? round(c - 0.6, 4) : prev;
      var top = Math.max(o, c);
      var bot = Math.min(o, c);
      var h = round(top + 0.8 + (i % 3) * 0.35, 4);
      var l = round(bot - (0.55 + (i % 2) * 0.3), 4);
      prev = c;
      return { o: o, h: h, l: l, c: c };
    });
  }
  function validBar(bar) {
    return bar.l <= Math.min(bar.o, bar.c) && Math.max(bar.o, bar.c) <= bar.h;
  }
  function pearson(xs, ys) {
    var n = xs.length;
    if (n < 2 || n !== ys.length) return null;
    var mx = xs.reduce(function (a, b) { return a + b; }, 0) / n;
    var my = ys.reduce(function (a, b) { return a + b; }, 0) / n;
    var num = 0;
    var dx = 0;
    var dy = 0;
    for (var i = 0; i < n; i++) {
      var a = xs[i] - mx;
      var b = ys[i] - my;
      num += a * b;
      dx += a * a;
      dy += b * b;
    }
    if (dx === 0 || dy === 0) return null;
    return num / Math.sqrt(dx * dy);
  }
  function positionQty(equity, riskPct, entry, stop) {
    var riskCash = equity * riskPct;
    var per = Math.abs(entry - stop);
    if (!per) return { qty: 0, notional: 0, riskCash: riskCash };
    var qty = riskCash / per;
    return { qty: qty, notional: qty * entry, riskCash: riskCash, per: per };
  }
  function expectancy(p, win, loss, fee) {
    fee = fee || 0;
    return p * win - (1 - p) * loss - fee;
  }
  function pathEquity(start, rates) {
    return rates.reduce(function (eq, r) { return eq * (1 - r); }, start);
  }

  global.STAR_MATH = {
    round: round,
    ema: ema,
    macd: macd,
    rsiWilder: rsiWilder,
    bollinger: bollinger,
    fibUp: fibUp,
    fibDown: fibDown,
    barsFromCloses: barsFromCloses,
    validBar: validBar,
    pearson: pearson,
    positionQty: positionQty,
    expectancy: expectancy,
    pathEquity: pathEquity
  };
})(window);
