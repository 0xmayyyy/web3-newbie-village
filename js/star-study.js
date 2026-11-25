/* Data-driven charts for 进阶知识星 chapters 2–8. No hand-drawn candles. */
(function (global) {
  var M = function () { return global.STAR_MATH; };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n, d) {
    if (n == null || n !== n) return '—';
    return M().round(n, d == null ? 3 : d).toString();
  }
  function text(field, lang) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.zh || '';
  }

  function candleSvg(bars, extra) {
    extra = extra || {};
    var w = 640;
    var h = extra.pane ? 280 : 220;
    var padL = 12;
    var padR = 54;
    var padT = 16;
    var padB = 22;
    var plotH = (extra.pane ? 150 : h - padT - padB);
    var vals = [];
    bars.forEach(function (b) { vals.push(b.l, b.h); });
    (extra.lines || []).forEach(function (line) {
      line.values.forEach(function (v, i) { if (i < bars.length && v != null) vals.push(v); });
    });
    (extra.levels || []).forEach(function (lv) { vals.push(lv.price); });
    var min = Math.min.apply(null, vals);
    var max = Math.max.apply(null, vals);
    if (min === max) { min -= 1; max += 1; }
    var span = max - min;
    min -= span * 0.06;
    max += span * 0.06;
    function y(p) { return padT + (max - p) / (max - min) * plotH; }
    var slot = (w - padL - padR) / bars.length;
    var bits = ['<svg class="a1-svg star-study" viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
    bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
    for (var g = 0; g < 4; g++) {
      var price = min + (max - min) * g / 3;
      var gy = y(price);
      bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="rgba(230,199,158,.18)"></line>');
      bits.push('<text x="' + (w - 6) + '" y="' + (gy + 4) + '" text-anchor="end" fill="#d4bc9e" font-size="11">' + fmt(price, 2) + '</text>');
    }
    (extra.levels || []).forEach(function (lv) {
      var yy = y(lv.price);
      bits.push('<line x1="' + padL + '" y1="' + yy + '" x2="' + (w - padR) + '" y2="' + yy + '" stroke="#e6c79e" stroke-dasharray="4 3"></line>');
      bits.push('<text x="' + padL + '" y="' + (yy - 3) + '" fill="#f0d59a" font-size="11">' + esc(lv.label) + '</text>');
    });
    if (extra.zone) {
      var y1 = y(extra.zone.high);
      var y2 = y(extra.zone.low);
      bits.push('<rect x="' + padL + '" y="' + Math.min(y1, y2) + '" width="' + (w - padL - padR) + '" height="' + Math.abs(y2 - y1) + '" fill="rgba(230,199,158,.18)"></rect>');
    }
    bars.forEach(function (bar, i) {
      var up = bar.c >= bar.o;
      var color = up ? '#1f8a4d' : '#d4534e';
      var x = padL + i * slot;
      var xc = x + slot / 2;
      var bw = Math.max(3, slot * 0.62);
      var top = Math.min(y(bar.o), y(bar.c));
      var bh = Math.max(1.5, Math.abs(y(bar.c) - y(bar.o)));
      bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.4"></line>');
      bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"></rect>');
      if (bars.length <= 12) {
        bits.push('<text x="' + xc + '" y="' + (h - 6) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + (i + 1) + '</text>');
      }
    });
    (extra.lines || []).forEach(function (line) {
      var pts = [];
      line.values.forEach(function (v, i) {
        if (i < bars.length && v != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + y(v).toFixed(1));
      });
      if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + line.color + '" stroke-width="2"></polyline>');
    });
    if (extra.pane) {
      var py = plotH + padT + 8;
      bits.push('<text x="' + padL + '" y="' + (py + 14) + '" fill="#f0d59a" font-size="12">' + esc(extra.pane.label) + '</text>');
      var pvals = extra.pane.values.filter(function (v) { return v != null; });
      if (!pvals.length) pvals = [0];
      var pmin = Math.min.apply(null, pvals.concat([0]));
      var pmax = Math.max.apply(null, pvals.concat([0]));
      if (pmin === pmax) { pmin -= 1; pmax += 1; }
      function yp(v) { return py + 22 + (pmax - v) / (pmax - pmin) * 70; }
      var zero = yp(0);
      bits.push('<line x1="' + padL + '" y1="' + zero + '" x2="' + (w - padR) + '" y2="' + zero + '" stroke="rgba(230,199,158,.35)"></line>');
      extra.pane.series.forEach(function (series) {
        if (series.bars) {
          series.values.forEach(function (v, i) {
            if (v == null || i >= bars.length) return;
            var xc = padL + i * slot + slot / 2;
            var yv = yp(v);
            var color = v >= 0 ? '#1f8a4d' : '#d4534e';
            bits.push('<line x1="' + xc + '" y1="' + zero + '" x2="' + xc + '" y2="' + yv + '" stroke="' + color + '" stroke-width="' + Math.max(2, slot * 0.45) + '"></line>');
          });
        } else {
          var pts = [];
          series.values.forEach(function (v, i) {
            if (v != null && i < bars.length) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + yp(v).toFixed(1));
          });
          if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + series.color + '" stroke-width="1.8"></polyline>');
          else if (pts.length === 1) bits.push('<circle cx="' + pts[0].split(',')[0] + '" cy="' + pts[0].split(',')[1] + '" r="3" fill="' + series.color + '"></circle>');
        }
      });
    }
    bits.push('</svg>');
    return bits.join('');
  }

  function table(headers, rows, lang) {
    function cell(value) { return esc(text(value, lang)); }
    return '<div class="table-wrap"><table><thead><tr>' + headers.map(function (h) { return '<th>' + cell(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (row) { return '<tr>' + row.map(function (value) { return '<td>' + cell(value) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }

  function legend(lang) {
    var up = lang === 'en' ? 'Green (up)' : '绿色（涨）';
    var down = lang === 'en' ? 'Red (down)' : '红色（跌）';
    return '<p class="a2-window"><span style="color:#1f8a4d">' + up + '</span> · <span style="color:#d4534e">' + down + '</span></p>';
  }

  function emaSeed(closes, n) {
    var out = closes.map(function () { return null; });
    if (closes.length < n || n < 1) return out;
    var sum = 0;
    var i;
    for (i = 0; i < n; i++) sum += closes[i];
    var prev = sum / n;
    out[n - 1] = prev;
    var alpha = 2 / (n + 1);
    for (i = n; i < closes.length; i++) {
      prev = alpha * closes[i] + (1 - alpha) * prev;
      out[i] = prev;
    }
    return out;
  }
  function macdSeed(closes) {
    var e12 = emaSeed(closes, 12);
    var e26 = emaSeed(closes, 26);
    var dif = closes.map(function (_, i) {
      return e12[i] == null || e26[i] == null ? null : e12[i] - e26[i];
    });
    var valid = [];
    dif.forEach(function (v, i) { if (v != null) valid.push([i, v]); });
    var dea = closes.map(function () { return null; });
    if (valid.length >= 9) {
      var seed = 0;
      var k;
      for (k = 0; k < 9; k++) seed += valid[k][1];
      var prev = seed / 9;
      dea[valid[8][0]] = prev;
      var alpha = 2 / 10;
      for (k = 9; k < valid.length; k++) {
        prev = alpha * valid[k][1] + (1 - alpha) * prev;
        dea[valid[k][0]] = prev;
      }
    }
    var hist = dif.map(function (v, i) {
      return v == null || dea[i] == null ? null : v - dea[i];
    });
    return { e12: e12, e26: e26, dif: dif, dea: dea, hist: hist };
  }
  function seqCloses(start, parts) {
    var price = start;
    var out = [];
    parts.forEach(function (part) {
      var i;
      for (i = 0; i < part[0]; i++) {
        price += part[1];
        out.push(Math.round(price * 100) / 100);
      }
    });
    return out;
  }
  function bollSeed(closes, n, k) {
    var out = closes.map(function () { return null; });
    var i;
    for (i = n - 1; i < closes.length; i++) {
      var slice = closes.slice(i + 1 - n, i + 1);
      var mean = 0;
      var j;
      for (j = 0; j < slice.length; j++) mean += slice[j];
      mean /= n;
      var variance = 0;
      for (j = 0; j < slice.length; j++) variance += (slice[j] - mean) * (slice[j] - mean);
      var sd = Math.sqrt(variance / n);
      out[i] = { mid: mean, upper: mean + k * sd, lower: mean - k * sd, width: mean ? (2 * k * sd) / mean : null };
    }
    return out;
  }
  function packOf(kind, closes) {
    var bars = M().barsFromCloses(closes);
    bars.forEach(function (bar, i) { bar.v = Math.round(800 + Math.abs(closes[i] - (closes[i - 1] || closes[i])) * 12); });
    if (kind === 'ema') {
      return { bars: bars, closes: closes, e20: emaSeed(closes, 20), e50: emaSeed(closes, 50) };
    }
    if (kind === 'macd') return { bars: bars, closes: closes, macd: macdSeed(closes) };
    if (kind === 'boll') return { bars: bars, closes: closes, band: bollSeed(closes, 20, 2) };
    return { bars: bars, closes: closes, rsi: M().rsiWilder(closes, 14) };
  }
  function crossIndexes(fast, slow) {
    var out = [];
    var i;
    for (i = 1; i < fast.length; i++) {
      if (fast[i] == null || slow[i] == null || fast[i - 1] == null || slow[i - 1] == null) continue;
      var before = fast[i - 1] - slow[i - 1];
      var after = fast[i] - slow[i];
      if (before <= 0 && after > 0) out.push(i);
      if (before >= 0 && after < 0) out.push(i);
    }
    return out;
  }
  function renderPractical(root, study, lang) {
    var zh = lang !== 'en';
    var kind = study.practical;
    var scenes = kind === 'ema' ? [
      { id: 'trend', zh: '上行与回踩', en: 'Uptrend and a touch', closes: seqCloses(60000, [[55, 80], [10, -35], [25, 45]]) },
      { id: 'range', zh: '横盘假交叉', en: 'Range and fake crosses', closes: (function () {
        var price = 62000;
        var out = [];
        var i;
        for (i = 0; i < 96; i++) {
          price += Math.floor(i / 12) % 2 ? -70 : 75;
          out.push(price);
        }
        return out;
      })() },
      { id: 'crash', zh: '大阴线滞后', en: 'A sharp drop lags', closes: seqCloses(64000, [[40, 30], [1, -900], [49, -15]]) }
    ] : kind === 'macd' ? [
      { id: 'above', zh: '零轴上金叉', en: 'Golden cross above zero', closes: seqCloses(50000, [[45, 90], [12, -40], [30, 80]]) },
      { id: 'fail', zh: '零轴下金叉失败', en: 'Golden cross below zero fails', closes: seqCloses(70000, [[40, -80], [12, 90], [40, -70]]) },
      { id: 'shrink', zh: '负柱缩短仍在跌', en: 'Negative bars shrink while price falls', closes: seqCloses(80000, [[20, 80], [18, -180], [40, -20]]) }
    ] : kind === 'boll' ? [
      { id: 'squeeze', zh: '收口', en: 'Squeeze', closes: (function () {
        var price = 100;
        var out = [];
        var i;
        for (i = 0; i < 36; i++) { price += i % 2 ? -0.12 : 0.12; out.push(Math.round(price * 100) / 100); }
        for (i = 0; i < 24; i++) { price += i % 2 ? -2.4 : 2.6; out.push(Math.round(price * 100) / 100); }
        return out;
      })() },
      { id: 'wide', zh: '扩张', en: 'Expansion', closes: seqCloses(100, [[24, 0.05], [20, 1.8]]) },
      { id: 'ride', zh: '沿上轨', en: 'Riding the upper band', closes: seqCloses(100, [[50, 0.8]]) },
      { id: 'fake', zh: '带外再回来', en: 'Outside, then back', closes: seqCloses(100, [[30, 0.15], [1, 6], [12, -0.35]]) }
    ] : [
      { id: 'hot', zh: '超买仍上涨', en: 'Overbought and still rising', closes: seqCloses(100, [[40, 3]]) },
      { id: 'cold', zh: '超卖仍下跌', en: 'Oversold and still falling', closes: seqCloses(200, [[40, -3]]) },
      { id: 'fake', zh: '看起来像背离', en: 'Looks like divergence', closes: seqCloses(100, [[18, 2], [8, -0.4], [8, 1.2]]) }
    ];
    var state = { scene: scenes[0].id, shown: Math.min(48, scenes[0].closes.length), cursor: null, fast: true, slow: true, note: '', tone: '' };
    function current() {
      var scene = scenes.filter(function (item) { return item.id === state.scene; })[0];
      var closes = scene.closes.slice(0, state.shown);
      return { scene: scene, pack: packOf(kind, closes), full: scene.closes.length };
    }
    function judge(index, pack) {
      var bar = pack.bars[index];
      if (!bar) return { tone: '', text: '' };
      var head = zh ? '教学模拟。第 ' + (index + 1) + ' 根，收盘 ' + fmt(bar.c, 2) + '。' : 'Teaching simulation. Bar ' + (index + 1) + ', close ' + fmt(bar.c, 2) + '. ';
      if (kind === 'ema') {
        var e20 = pack.e20[index];
        var e50 = pack.e50[index];
        var extra = (e20 == null ? (zh ? 'EMA20 数据不足。' : 'EMA20 is not ready. ') : (zh ? 'EMA20 ' + fmt(e20, 2) + '。' : 'EMA20 ' + fmt(e20, 2) + '. '));
        extra += e50 == null ? (zh ? 'EMA50 数据不足。' : 'EMA50 is not ready.') : (zh ? 'EMA50 ' + fmt(e50, 2) + '。' : 'EMA50 ' + fmt(e50, 2) + '.');
        if (state.scene === 'trend' && e20 != null && Math.abs(bar.c - e20) / e20 <= 0.003) {
          return { tone: 'is-right', text: head + extra + (zh ? '这根靠近 EMA20。靠近均线还不是确认反弹。' : 'This bar is near EMA20. Being near the line is not a confirmed bounce.') };
        }
        if (state.scene === 'range' && crossIndexes(pack.e20, pack.e50).indexOf(index) >= 0) {
          return { tone: 'is-bad', text: head + extra + (zh ? '这是一次交叉。横盘里交叉会反复出现，不能当成后面一定涨。' : 'This is a cross. Crosses repeat in a range, so it is not a promise of a rise.') };
        }
        if (state.scene === 'crash' && index === 40) {
          return { tone: 'is-right', text: head + extra + (zh ? '价格先穿过去了，均线还在慢慢变。EMA 不能预测这根突发下跌。' : 'Price moved first. The average is still catching up. EMA does not predict this drop.') };
        }
        return { tone: '', text: head + extra + (zh ? '再点一根更符合本剧情的 K 线。' : 'Pick a bar that matches this scene.') };
      }
      if (kind === 'macd') {
        var m = pack.macd;
        var dif = m.dif[index];
        var dea = m.dea[index];
        var hist = m.hist[index];
        var extra = dif == null ? (zh ? 'DIF 还不能计算。' : 'DIF is not ready.') : (zh ? 'DIF ' + fmt(dif, 2) + '，DEA ' + fmt(dea, 2) + '，柱 ' + fmt(hist, 2) + '。' : 'DIF ' + fmt(dif, 2) + ', DEA ' + fmt(dea, 2) + ', bar ' + fmt(hist, 2) + '.');
        var gold = dif != null && m.dif[index - 1] != null && m.dea[index - 1] != null && (m.dif[index - 1] - m.dea[index - 1]) < 0 && (dif - dea) > 0;
        if (state.scene === 'above' && gold && dif > 0) return { tone: 'is-right', text: head + extra + (zh ? '这是零轴上方的金叉，只是延续候选，不是买入保证。' : 'This golden cross is above zero. It is a continuation candidate, not a buy order.') };
        if (state.scene === 'fail' && gold && dif <= 0) return { tone: 'is-bad', text: head + extra + (zh ? '这次金叉在零轴下方。交叉可以和大趋势矛盾，后面仍可能创新低。' : 'This golden cross is below zero. A cross can disagree with the larger trend.') };
        if (state.scene === 'shrink' && hist != null && m.hist[index - 1] != null && hist < 0 && hist > m.hist[index - 1] && bar.c < pack.bars[index - 1].c) {
          return { tone: 'is-bad', text: head + extra + (zh ? '负柱在收窄，但收盘仍在跌。这不能单独证明价格已经反转。' : 'The negative bar is narrowing, but the close is still falling. That alone does not prove a reversal.') };
        }
        if (gold) return { tone: '', text: head + extra + (zh ? '这根是金叉，但请对照当前剧情看它在零轴的哪一侧。' : 'This bar is a golden cross. Check which side of zero it is on.') };
        return { tone: '', text: head + extra };
      }
      if (kind === 'boll') {
        var band = pack.band[index];
        if (!band) return { tone: '', text: head + (zh ? '前 19 根还没有完整的 20 期布林带，不显示伪造轨道。' : 'The first 19 bars do not have a full 20-bar band. No fake band is drawn.') };
        var where = bar.c > band.upper ? (zh ? '收盘在上轨外。' : 'The close is outside the upper band. ') : (bar.c < band.lower ? (zh ? '收盘在下轨外。' : 'The close is outside the lower band. ') : (zh ? '收盘在带内。' : 'The close is inside the band. '));
        var nums = (zh ? '中轨 ' : 'Middle ') + fmt(band.mid, 2) + (zh ? '，上轨 ' : ', upper ') + fmt(band.upper, 2) + (zh ? '，下轨 ' : ', lower ') + fmt(band.lower, 2) + '。';
        if (state.scene === 'squeeze') {
          var narrow = 0;
          var bi;
          for (bi = 1; bi < pack.band.length; bi++) if (pack.band[bi] && pack.band[narrow] && pack.band[bi].width < pack.band[narrow].width) narrow = bi;
          if (Math.abs(index - narrow) <= 2) return { tone: 'is-right', text: head + nums + (zh ? '这里最窄，只说明波动收缩，不预测向上或向下。' : 'This is the narrow stretch. It only says variation shrank. It does not predict up or down.') };
        }
        if (state.scene === 'wide') {
          var wide = 0;
          var wj;
          for (wj = 1; wj < pack.band.length; wj++) if (pack.band[wj] && pack.band[wide] && pack.band[wj].width > pack.band[wide].width) wide = wj;
          if (Math.abs(index - wide) <= 2) return { tone: 'is-right', text: head + nums + (zh ? '带宽变大，是这组收盘更分散，不是方向已经确定。' : 'A wider band means these closes are more spread out, not that direction is decided.') };
        }
        if (state.scene === 'ride' && bar.c >= band.mid + (band.upper - band.mid) * 0.65) {
          return { tone: 'is-bad', text: head + nums + where + (zh ? '沿上轨运行仍可能继续。触上轨不是做空命令。' : 'Price can keep riding the upper band. A touch is not an order to short.') };
        }
        if (state.scene === 'fake' && bar.c > band.upper) {
          return { tone: 'is-bad', text: head + nums + (zh ? '这是带外收盘。回到带内才叫回轨。带外收盘不是方向保证。' : 'This close is outside the band. A return inside is a different event. An outside close is not a direction.') };
        }
        return { tone: '', text: head + nums + where };
      }
      var rsi = pack.rsi[index];
      var extraR = rsi == null ? (zh ? 'RSI 数据不足，不显示 0。' : 'RSI is not ready. Do not show 0.') : (zh ? 'RSI(14) ' + fmt(rsi, 2) + '。' : 'RSI(14) ' + fmt(rsi, 2) + '.');
      if (state.scene === 'hot' && rsi > 70) return { tone: 'is-right', text: head + extraR + (zh ? '高于 70 只说明最近涨得强，不是立刻做空的命令。' : 'Above 70 only says the recent rise is strong. It is not an order to short.') };
      if (state.scene === 'cold' && rsi != null && rsi < 30) return { tone: 'is-bad', text: head + extraR + (zh ? '低于 30 也不等于马上要涨。强下跌里它可以一直停在低位。' : 'Below 30 does not mean price must rise. A strong decline can stay oversold.') };
      if (state.scene === 'fake') return { tone: 'is-bad', text: head + extraR + (zh ? 'RSI 自己回落还不是背离。背离必须有两个对应的价格高低点。' : 'An RSI dip by itself is not divergence. Divergence needs two matching price swings.') };
      return { tone: '', text: head + extraR };
    }
    function paint() {
      var view = current();
      var pack = view.pack;
      var bars = pack.bars;
      var w = 360;
      var h = kind === 'ema' || kind === 'boll' ? 320 : 500;
      var bits = [openSvg(w, h, zh ? '教学模拟 K 线' : 'Teaching simulation candles')];
      var highs = [];
      bars.forEach(function (bar) { highs.push(bar.l, bar.h); });
      if (kind === 'ema') {
        pack.e20.forEach(function (v) { if (v != null) highs.push(v); });
        pack.e50.forEach(function (v) { if (v != null) highs.push(v); });
      }
      if (kind === 'boll') {
        pack.band.forEach(function (b) { if (b) { highs.push(b.upper); highs.push(b.lower); } });
      }
      var min = Math.min.apply(null, highs);
      var max = Math.max.apply(null, highs);
      var span = max - min || 1;
      var priceH = kind === 'ema' || kind === 'boll' ? 270 : 180;
      var geom = { bits: bits, w: w, h: h, padL: 8, padR: kind === 'ema' ? 58 : 16, top: 16, plotH: priceH, n: bars.length, min: min - span * 0.08, max: max + span * 0.12, centers: true, series: [] };
      var plot = lineSvg(geom);
      drawCandles(bits, bars, plot.x, plot.y, plot.slot);
      var maxVol = 1;
      bars.forEach(function (bar) { if (bar.v > maxVol) maxVol = bar.v; });
      bars.forEach(function (bar, i) {
        var vh = bar.v / maxVol * 18;
        bits.push('<rect x="' + (plot.x(i) - Math.max(1, plot.slot * 0.3)).toFixed(1) + '" y="' + (16 + priceH - vh).toFixed(1) + '" width="' + Math.max(1.4, plot.slot * 0.45).toFixed(1) + '" height="' + vh.toFixed(1) + '" fill="rgba(230,199,158,.35)"></rect>');
        bits.push('<rect data-bar="' + i + '" x="' + (plot.x(i) - plot.slot / 2).toFixed(1) + '" y="16" width="' + plot.slot.toFixed(1) + '" height="' + priceH + '" fill="' + (state.cursor === i ? 'rgba(240,213,154,.18)' : 'transparent') + '"></rect>');
      });
      if (state.cursor != null) {
        var cx = plot.x(state.cursor);
        bits.push('<line x1="' + cx.toFixed(1) + '" y1="16" x2="' + cx.toFixed(1) + '" y2="' + (h - 12) + '" stroke="rgba(240,213,154,.8)" stroke-dasharray="3 3"></line>');
      }
      if (kind === 'ema') {
        var lines = [];
        if (state.fast) lines.push({ values: pack.e20, color: '#f4cb82', width: 2.6, label: 'EMA20' });
        if (state.slow) lines.push({ values: pack.e50, color: '#8eb4ff', width: 2.4, label: 'EMA50', dash: true });
        lineSvg({ bits: bits, w: w, h: h, padL: 8, padR: 58, top: 16, plotH: priceH, n: bars.length, min: geom.min, max: geom.max, centers: true, series: lines });
      } else if (kind === 'boll') {
        var upper = pack.band.map(function (b) { return b && b.upper; });
        var mid = pack.band.map(function (b) { return b && b.mid; });
        var lower = pack.band.map(function (b) { return b && b.lower; });
        lineSvg({ bits: bits, w: w, h: h, padL: 8, padR: 52, top: 16, plotH: priceH, n: bars.length, min: geom.min, max: geom.max, centers: true, series: [
          { values: upper, color: '#8eb4ff', width: 2.2, label: zh ? '上轨' : 'Upper' },
          { values: mid, color: '#f4cb82', width: 2.4, label: zh ? '中轨' : 'Mid' },
          { values: lower, color: '#d7b4ff', width: 2.2, label: zh ? '下轨' : 'Lower' }
        ] });
      } else if (kind === 'macd') {
        var pool = pack.macd.dif.concat(pack.macd.dea, pack.macd.hist, [0]).filter(function (v) { return v != null; });
        var pmin = Math.min.apply(null, pool);
        var pmax = Math.max.apply(null, pool);
        var pspan = pmax - pmin || 1;
        lineSvg({
          bits: bits, w: w, h: h, padL: 8, padR: 52, top: 214, plotH: 250, n: bars.length,
          min: pmin - pspan * 0.16, max: pmax + pspan * 0.2, centers: true,
          guides: [{ value: 0, label: zh ? '0 零轴' : '0 zero' }],
          series: [
            { values: pack.macd.hist, bars: true },
            { values: state.fast ? pack.macd.dif : [], color: '#f4cb82', width: 2.4, label: 'DIF' },
            { values: state.slow ? pack.macd.dea : [], color: '#8eb4ff', width: 2.2, label: 'DEA' }
          ]
        });
      } else {
        lineSvg({
          bits: bits, w: w, h: h, padL: 8, padR: 64, top: 214, plotH: 250, n: bars.length,
          min: 0, max: 100, centers: true, labelSide: 'right',
          guides: [
            { value: 70, label: zh ? '70 超买' : '70 overbought' },
            { value: 50, label: '50' },
            { value: 30, label: zh ? '30 超卖' : '30 oversold' }
          ],
          series: [{ values: pack.rsi, color: '#f4cb82', width: 2.6, label: 'RSI(14)' }]
        });
      }
      bits.push('</svg>');
      var keys = kind === 'boll'
        ? [{ color: '#8eb4ff', label: zh ? '上轨 SMA20+2σ' : 'Upper SMA20+2σ' }, { color: '#f4cb82', label: zh ? '中轨 SMA20' : 'Middle SMA20' }, { color: '#d7b4ff', label: zh ? '下轨 SMA20−2σ' : 'Lower SMA20−2σ' }]
        : kind === 'ema'
        ? [{ color: '#1f8a4d', label: zh ? '绿色 K 线（涨）' : 'Green candle, up' }, { color: '#d4534e', label: zh ? '红色 K 线（跌）' : 'Red candle, down' }, { color: '#f4cb82', label: zh ? 'EMA20（快线，实线）' : 'EMA20 (fast, solid)' }, { color: '#8eb4ff', label: zh ? 'EMA50（慢线，虚线）' : 'EMA50 (slow, dashed)' }]
        : kind === 'macd'
          ? [{ color: '#f4cb82', label: zh ? 'DIF（12/26）' : 'DIF (12/26)' }, { color: '#8eb4ff', label: zh ? 'DEA（9）' : 'DEA (9)' }, { color: '#1f8a4d', label: zh ? '柱子 DIF−DEA' : 'Histogram DIF−DEA' }]
          : [{ color: '#f4cb82', label: 'RSI(14)' }, { color: '#f0d59a', label: zh ? '30 / 50 / 70 参考线' : '30 / 50 / 70 guides' }];
      var buttons = scenes.map(function (item) {
        return '<button type="button" data-scene="' + item.id + '" aria-pressed="' + (item.id === state.scene) + '">' + (zh ? item.zh : item.en) + '</button>';
      }).join('');
      root.innerHTML = '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        (kind === 'boll'
          ? '<p>' + (zh ? '中轨是 20 根收盘的简单平均。上下轨是中轨加减 2 倍总体标准差。缩口不指明方向。' : 'The middle line is the simple average of 20 closes. The outer bands are the middle plus or minus 2 population standard deviations. A squeeze does not name a direction.') + '</p>'
          : '') +
        (kind === 'boll' ? '' : '<div class="a1-modes">' + buttons + '</div>') +
        '<div class="a1-modes"><button type="button" data-move="1">' + (zh ? '播放一根' : 'One bar') + '</button><button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        (kind === 'boll' ? '<button type="button" data-more="boll">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' : '') +
        '<span>' + state.shown + ' / ' + view.full + '</span></div>' +
        bits.join('') + keyRow(keys) +
        (kind === 'boll' ? '<p>' + (zh ? '小练习：点一根 K 线，看收盘在带内、贴着上轨，还是跑到带外。' : 'Short practice: tap a candle and see whether the close is inside the band, riding the upper band, or outside it.') + '</p>' : '') +
        '<p class="a2-readout' + (state.tone ? ' ' + state.tone : '') + '">' + esc(state.note || (zh ? '点一根 K 线，读收盘和轨道。' : 'Tap a candle to read the close and the bands.')) + '</p></div>';
      root.querySelectorAll('[data-more]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var order = scenes.map(function (item) { return item.id; });
          var at = order.indexOf(state.scene);
          state.scene = order[(at + 1) % order.length];
          state.shown = Math.min(48, current().full);
          state.cursor = null;
          state.note = '';
          state.tone = '';
          paint();
        });
      });
      root.querySelectorAll('[data-move]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var move = btn.getAttribute('data-move');
          var full = current().full;
          if (move === 'reset') state.shown = Math.min(48, full);
          else if (move === 'all') state.shown = full;
          else state.shown = Math.max(8, Math.min(full, state.shown + Number(move)));
          if (state.cursor != null && state.cursor >= state.shown) state.cursor = state.shown - 1;
          paint();
        });
      });
      root.querySelectorAll('[data-layer]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var layer = btn.getAttribute('data-layer');
          state[layer] = !state[layer];
          paint();
        });
      });
      root.querySelectorAll('[data-bar]').forEach(function (bar) {
        bar.addEventListener('click', function () {
          state.cursor = Number(bar.getAttribute('data-bar'));
          var result = judge(state.cursor, current().pack);
          state.note = result.text;
          state.tone = result.tone;
          paint();
        });
      });
    }
    paint();
  }
  function mount(root, lesson, lang, t) {
    if (lesson.study && lesson.study.practical) {
      renderPractical(root, lesson.study, lang, t);
      return;
    }
    var study = lesson.study || { kind: 'note' };
    var shown = 1;
    var state = {};
    function source() {
      if (study.bars) return study.bars;
      return M().barsFromCloses(study.closes || []);
    }
    function bars() { return source().slice(0, shown); }
    function paint() {
      var plainStudy = study.kind === 'ema' || study.kind === 'macd' || (study.kind === 'rsi' && study.main === 'rsi') || study.kind === 'spotbook' || study.kind === 'liq' || study.kind === 'perpcalc';
      var html = '<div class="a1">' + (t ? '<p class="a1-flag">' + t('star.sim') + ' · ' + t('star.figure') + ' · ' + t('star.a2.disclaimer') + '</p>' : '') + (plainStudy ? '' : legend(lang));
      html += renderKind(study, bars(), shown, lang, state);
      var max = source().length || 1;
      if (max > 1 && study.kind !== 'book' && study.kind !== 'panel' && study.kind !== 'spotbook') {
        html += '<div class="a1-modes"><button type="button" data-step="prev">' + (lang === 'en' ? 'Previous bar' : '上一根') + '</button><button type="button" data-step="next">' + (lang === 'en' ? 'Next bar' : '下一根') + '</button><span>' + shown + ' / ' + max + '</span></div>';
      }
      html += '</div>';
      root.innerHTML = html;
      root.querySelectorAll('[data-qty]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.qty = btn.getAttribute('data-qty');
          paint();
        });
      });
      if (study.kind === 'liq' || study.kind === 'perpcalc') bindPerp(root, state, lang);
      root.querySelectorAll('[data-step]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var maxN = source().length;
          if (btn.getAttribute('data-step') === 'next') shown = Math.min(maxN, shown + 1);
          else shown = Math.max(1, shown - 1);
          paint();
        });
      });
      root.querySelectorAll('[data-state]').forEach(function (input) {
        input.addEventListener('input', function () {
          state[input.getAttribute('data-state')] = input.value;
          paint();
        });
      });
    }
    var total = (study.bars || study.closes || []).length;
    if (total) shown = study.start == null ? total : study.start;
    paint();
  }

  function spreadDown(items, gap, limit) {
    items.sort(function (a, b) { return a.y - b.y; });
    var i;
    for (i = 1; i < items.length; i++) {
      if (items[i].y < items[i - 1].y + gap) items[i].y = items[i - 1].y + gap;
    }
    if (limit && items.length && items[items.length - 1].y > limit) {
      var shift = items[items.length - 1].y - limit;
      items.forEach(function (item) { item.y -= shift; });
    }
    return items;
  }
  function keyRow(items) {
    return '<p class="star-key">' + items.map(function (item) {
      return '<span><i style="background:' + item.color + '"></i>' + esc(item.label) + '</span>';
    }).join('') + '</p>';
  }
  function lineSvg(opts) {
    var w = opts.w;
    var h = opts.h;
    var padL = opts.padL;
    var padR = opts.padR;
    var top = opts.top;
    var plotH = opts.plotH;
    var n = opts.n;
    var min = opts.min;
    var max = opts.max;
    if (min === max) { min -= 1; max += 1; }
    function y(v) { return top + (max - v) / (max - min) * plotH; }
    var slot = (w - padL - padR) / Math.max(n, 1);
    function x(i) {
      if (opts.centers) return padL + (i + 0.5) * slot;
      return padL + (n < 2 ? 0 : i / (n - 1) * (w - padL - padR));
    }
    var bits = opts.bits;
    (opts.guides || []).forEach(function (g) {
      var yy = y(g.value);
      bits.push('<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + yy.toFixed(1) + '" stroke="' + (g.color || 'rgba(230,199,158,.45)') + '" stroke-dasharray="4 3"></line>');
      if (g.label) {
        var rightLabel = opts.labelSide === 'right';
        bits.push('<text x="' + (rightLabel ? (w - 6) : (padL + 2)) + '" y="' + (yy - 4) + '" text-anchor="' + (rightLabel ? 'end' : 'start') + '" fill="#f0d59a" font-size="13" font-family="sans-serif">' + esc(g.label) + '</text>');
      }
    });
    (opts.series || []).forEach(function (series) {
      if (series.bars) {
        series.values.forEach(function (v, i) {
          if (v == null) return;
          var xc = x(i);
          var yv = y(v);
          var zero = y(0);
          var bw = Math.max(2, (w - padL - padR) / Math.max(n, 1) * 0.55);
          bits.push('<line x1="' + xc.toFixed(1) + '" y1="' + zero.toFixed(1) + '" x2="' + xc.toFixed(1) + '" y2="' + yv.toFixed(1) + '" stroke="' + (v >= 0 ? '#1f8a4d' : '#d4534e') + '" stroke-width="' + bw.toFixed(1) + '"></line>');
        });
        return;
      }
      var pts = [];
      series.values.forEach(function (v, i) {
        if (v != null) pts.push(x(i).toFixed(1) + ',' + y(v).toFixed(1));
      });
      if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + series.color + '" stroke-width="' + (series.width || 2.4) + '"' + (series.dash ? ' stroke-dasharray="7 4"' : '') + '></polyline>');
    });
    var tags = [];
    (opts.series || []).forEach(function (series) {
      if (!series.label || series.bars) return;
      var last = -1;
      var i;
      for (i = series.values.length - 1; i >= 0; i--) if (series.values[i] != null) { last = i; break; }
      if (last < 0) return;
      tags.push({ y: y(series.values[last]), label: series.label, color: series.color, x: x(last) });
    });
    spreadDown(tags, 16, top + plotH - 2);
    tags.forEach(function (tag) {
      bits.push('<text x="' + (w - 6) + '" y="' + tag.y.toFixed(1) + '" text-anchor="end" fill="' + tag.color + '" font-size="13" font-family="sans-serif">' + esc(tag.label) + '</text>');
    });
    return { x: x, y: y, slot: slot };
  }
  function drawCandles(bits, bars, x, y, slot) {
    bars.forEach(function (bar, i) {
      var up = bar.c >= bar.o;
      var color = up ? '#1f8a4d' : '#d4534e';
      var xc = x(i);
      var bw = Math.max(2.2, slot * 0.62);
      var top = Math.min(y(bar.o), y(bar.c));
      var bh = Math.max(1.4, Math.abs(y(bar.c) - y(bar.o)));
      bits.push('<line x1="' + xc.toFixed(1) + '" y1="' + y(bar.h).toFixed(1) + '" x2="' + xc.toFixed(1) + '" y2="' + y(bar.l).toFixed(1) + '" stroke="' + color + '" stroke-width="1.2"></line>');
      bits.push('<rect x="' + (xc - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="' + color + '"></rect>');
    });
  }
  function openSvg(w, h, label) {
    return '<svg class="a1-svg star-study" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(label) + '"><rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>';
  }
  function emaSvg(bars, fast, slow, fastN, slowN, lang) {
    var w = 360;
    var h = 280;
    var vals = [];
    bars.forEach(function (bar) { vals.push(bar.l, bar.h); });
    fast.forEach(function (v) { if (v != null) vals.push(v); });
    slow.forEach(function (v) { if (v != null) vals.push(v); });
    var min = Math.min.apply(null, vals);
    var max = Math.max.apply(null, vals);
    var span = max - min || 1;
    min -= span * 0.08;
    max += span * 0.16;
    var fastTag = 'EMA' + fastN;
    var slowTag = 'EMA' + slowN;
    var fastName = lang === 'en' ? fastTag + ' (fast)' : fastTag + '（快线）';
    var slowName = lang === 'en' ? slowTag + ' (slow)' : slowTag + '（慢线）';
    var bits = [openSvg(w, h, lang === 'en' ? 'Teaching candles with ' + fastName + ' and ' + slowName : '教学图：蜡烛 K 线，叠 ' + fastName + ' 和 ' + slowName)];
    var geom = { bits: bits, w: w, h: h, padL: 8, padR: 58, top: 14, plotH: 246, n: bars.length, min: min, max: max, centers: true };
    var plot = lineSvg(Object.assign({}, geom, { series: [] }));
    drawCandles(bits, bars, plot.x, plot.y, plot.slot);
    lineSvg(Object.assign({}, geom, { series: [
      { values: fast, color: '#f4cb82', width: 2.6, label: fastTag },
      { values: slow, color: '#8eb4ff', width: 2.6, label: slowTag }
    ] }));
    bits.push('</svg>');
    return bits.join('') + keyRow([
      { color: '#1f8a4d', label: lang === 'en' ? 'Green candle, up' : '绿色 K 线（涨）' },
      { color: '#d4534e', label: lang === 'en' ? 'Red candle, down' : '红色 K 线（跌）' },
      { color: '#f4cb82', label: fastName },
      { color: '#8eb4ff', label: slowName }
    ]);
  }
  function macdSvg(bars, pack, lang) {
    var w = 360;
    var h = 520;
    var padL = 8;
    var padR = 64;
    var macdTop = 200;
    var macdH = 286;
    var vals = [];
    bars.forEach(function (bar) { vals.push(bar.l, bar.h); });
    var min = Math.min.apply(null, vals);
    var max = Math.max.apply(null, vals);
    var span = max - min || 1;
    min -= span * 0.08;
    max += span * 0.12;
    var bits = [openSvg(w, h, lang === 'en' ? 'Teaching candles with MACD 12/26/9' : '教学图：蜡烛 K 线，以及 MACD（12、26、9）')];
    bits.push('<text x="8" y="16" fill="#d4bc9e" font-size="13" font-family="sans-serif">' + (lang === 'en' ? 'Candles' : '蜡烛 K 线') + '</text>');
    var priceGeom = { bits: bits, w: w, h: h, padL: padL, padR: padR, top: 22, plotH: 156, n: bars.length, min: min, max: max, centers: true };
    var pricePlot = lineSvg(Object.assign({}, priceGeom, { series: [] }));
    drawCandles(bits, bars, pricePlot.x, pricePlot.y, pricePlot.slot);
    var pool = pack.dif.concat(pack.dea, pack.hist, [0]).filter(function (v) { return v != null; });
    var pmin = Math.min.apply(null, pool);
    var pmax = Math.max.apply(null, pool);
    var pspan = pmax - pmin || 1;
    pmin -= pspan * 0.18;
    pmax += pspan * 0.22;
    var plot = lineSvg({
      bits: bits, w: w, h: h, padL: padL, padR: padR, top: macdTop, plotH: macdH, n: bars.length,
      min: pmin, max: pmax, centers: true,
      guides: [{ value: 0, label: lang === 'en' ? '0 zero' : '0 零轴', color: 'rgba(240,213,154,.7)' }],
      series: [
        { values: pack.hist, bars: true },
        { values: pack.dif, color: '#f4cb82', width: 2.4, label: 'DIF' },
        { values: pack.dea, color: '#8eb4ff', width: 2.4, label: 'DEA' }
      ]
    });
    var i;
    for (i = 26; i < bars.length; i++) {
      var prev = pack.dif[i - 1] - pack.dea[i - 1];
      var now = pack.dif[i] - pack.dea[i];
      var kind = '';
      if (prev <= 0 && now > 0) kind = lang === 'en' ? 'Golden' : '金叉';
      else if (prev >= 0 && now < 0) kind = lang === 'en' ? 'Death' : '死叉';
      if (!kind) continue;
      var cx = plot.x(i);
      var cy = plot.y((pack.dif[i] + pack.dea[i]) / 2);
      var color = kind === '金叉' || kind === 'Golden' ? '#f4cb82' : '#ff8f88';
      var ty = cy - 22;
      if (ty < macdTop + 16) ty = cy + 22;
      var tw = Math.max(36, kind.length * 15);
      bits.push('<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="5" fill="' + color + '"></circle>');
      bits.push('<rect x="' + (cx - tw / 2).toFixed(1) + '" y="' + (ty - 14).toFixed(1) + '" width="' + tw + '" height="18" rx="8" fill="#1b1428" stroke="' + color + '"></rect>');
      bits.push('<text x="' + cx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="middle" fill="' + color + '" font-size="13" font-weight="700" font-family="sans-serif">' + kind + '</text>');
    }
    bits.push('</svg>');
    return bits.join('') + keyRow([
      { color: '#1f8a4d', label: lang === 'en' ? 'Green candle, up' : '绿色 K 线（涨）' },
      { color: '#d4534e', label: lang === 'en' ? 'Red candle, down' : '红色 K 线（跌）' },
      { color: '#f4cb82', label: lang === 'en' ? 'DIF (EMA12−EMA26)' : 'DIF（12/26）' },
      { color: '#8eb4ff', label: lang === 'en' ? 'DEA (EMA9 of DIF)' : 'DEA（9）' },
      { color: '#1f8a4d', label: lang === 'en' ? 'Histogram, DIF−DEA' : '柱子（DIF−DEA）' }
    ]);
  }
  function rsiSvg(bars, values, lang) {
    var w = 360;
    var h = 500;
    var bits = [openSvg(w, h, lang === 'en' ? 'Teaching candles and RSI(14)' : '教学图：蜡烛 K 线，以及 RSI(14)')];
    var extremes = [];
    bars.forEach(function (bar) { extremes.push(bar.l, bar.h); });
    var min = Math.min.apply(null, extremes);
    var max = Math.max.apply(null, extremes);
    var span = max - min || 1;
    bits.push('<text x="8" y="16" fill="#d4bc9e" font-size="13" font-family="sans-serif">' + (lang === 'en' ? 'Candles, for reference' : '蜡烛 K 线，只作对照') + '</text>');
    var priceGeom = { bits: bits, w: w, h: h, padL: 8, padR: 12, top: 22, plotH: 96, n: bars.length, min: min - span * 0.08, max: max + span * 0.12, centers: true };
    var pricePlot = lineSvg(Object.assign({}, priceGeom, { series: [] }));
    drawCandles(bits, bars, pricePlot.x, pricePlot.y, pricePlot.slot);
    bits.push('<text x="8" y="150" fill="#f0d59a" font-size="15" font-weight="700" font-family="sans-serif">RSI(14)</text>');
    var first = 0;
    var vi;
    for (vi = 0; vi < values.length; vi++) if (values[vi] != null) { first = vi; break; }
    var rsiVals = values.slice(first);
    lineSvg({
      bits: bits, w: w, h: h, padL: 8, padR: 16, top: 162, plotH: 310, n: Math.max(rsiVals.length, 2),
      min: 0, max: 100,
      labelSide: 'right',
      guides: [
        { value: 70, label: lang === 'en' ? '70 overbought' : '70 超买' },
        { value: 30, label: lang === 'en' ? '30 oversold' : '30 超卖' }
      ],
      series: [{ values: rsiVals, color: '#f4cb82', width: 2.8, label: 'RSI(14)' }]
    });
    bits.push('</svg>');
    return bits.join('') + keyRow([
      { color: '#1f8a4d', label: lang === 'en' ? 'Green candle, up' : '绿色 K 线（涨）' },
      { color: '#d4534e', label: lang === 'en' ? 'Red candle, down' : '红色 K 线（跌）' },
      { color: '#f4cb82', label: 'RSI(14)' },
      { color: '#f0d59a', label: lang === 'en' ? '70 overbought and 30 oversold' : '70 超买，30 超卖' }
    ]);
  }

  function renderSpotBook(lang, state) {
    var zh = lang !== 'en';
    var asks = [
      ['61,247.3', 44137], ['61,247.2', 40886], ['61,246.9', 9],
      ['61,246.8', 1990], ['61,246.3', 20], ['61,245.8', 321208]
    ];
    var bids = [
      ['61,245.7', 155691], ['61,245.0', 18], ['61,243.8', 1383],
      ['61,243.4', 18], ['61,243.3', 775], ['61,242.6', 987]
    ];
    var bidSum = 0;
    bids.forEach(function (row) { bidSum += row[1]; });
    var maxSize = 321208;
    var qty = state.qty || '2';
    var want = Math.round(Number(qty) * 100000);
    var left = want;
    var eaten = bids.map(function (row) {
      var take = left > 0 ? Math.min(row[1], left) : 0;
      left -= take;
      return take;
    });
    var remain = left > 0 ? left : 0;
    function sizeText(units) {
      var s = (units / 100000).toFixed(5);
      return units % 1000 === 0 ? (units / 100000).toFixed(2) : s;
    }
    function rowHtml(price, units, take, side) {
      var pct = Math.max(2, units / maxSize * 100);
      var cls = 'ob-row ' + side + (take > 0 ? (take < units ? ' is-part' : ' is-eat') : '');
      return '<div class="' + cls + '"><i style="width:' + pct.toFixed(1) + '%"></i><span>' + price + '</span><b>' + sizeText(units) + '</b></div>';
    }
    var note;
    if (remain > 0) {
      note = zh
        ? '卖出 ' + sizeText(want) + ' BTC。看得见的买盘一共 1.58872 BTC，先被吃掉 ' + sizeText(want - remain) + '。还剩 ' + sizeText(remain) + '，会在 61,242.6 下面成交，平均价比触发价更差。改成限价单，可能卖不完。'
        : 'Sell ' + sizeText(want) + ' BTC. The bids you can see add up to 1.58872 BTC, and ' + sizeText(want - remain) + ' of them are taken first. ' + sizeText(remain) + ' remains and fills below 61,242.6, so the average price is worse than the trigger. A limit order may not sell it all.';
    } else {
      note = zh
        ? '卖出 ' + sizeText(want) + ' BTC。看得见的买盘够用，标出来的绿色买盘会被吃掉。成交价仍按当时的买盘走，不是锁在触发价。'
        : 'Sell ' + sizeText(want) + ' BTC. The bids you can see are enough, and the marked green bids are taken. The fill still follows those bids. It is not locked at the trigger.';
    }
    var picks = [['1', zh ? '卖 1' : 'Sell 1'], ['1.58872', zh ? '吃完买盘' : 'Eat the book'], ['2', zh ? '卖 2' : 'Sell 2']];
    return '<div class="ob">' +
      '<div class="ob-top"><strong>BTC/USDT</strong><span>' + (zh ? '现货' : 'Spot') + '</span></div>' +
      '<div class="ob-tabs"><span>' + (zh ? '买入' : 'Buy') + '</span><span class="on">' + (zh ? '卖出' : 'Sell') + '</span></div>' +
      '<div class="ob-types"><span>' + (zh ? '限价单' : 'Limit') + '</span><span class="on">' + (zh ? '市价' : 'Market') + '</span></div>' +
      '<p class="ob-hint">' + (zh ? '止损市价单触发后，按市价去吃下面的绿色买盘。' : 'After a stop-market order triggers, it takes the green bids below at the market.') + '</p>' +
      '<div class="ob-picks">' + picks.map(function (pick) {
        return '<button type="button" data-qty="' + pick[0] + '"' + (qty === pick[0] ? ' class="on"' : '') + '>' + pick[1] + '</button>';
      }).join('') + '</div>' +
      '<div class="ob-cols"><span>' + (zh ? '价格' : 'Price') + '</span><span>' + (zh ? '数量' : 'Amount') + '</span></div>' +
      asks.map(function (row) { return rowHtml(row[0], row[1], 0, 'ask'); }).join('') +
      '<div class="ob-last">61,245.74</div>' +
      bids.map(function (row, i) { return rowHtml(row[0], row[1], eaten[i], 'bid'); }).join('') +
      '<p class="ob-note">' + esc(note) + '</p></div>';
  }

  function roughLiqPrice(entry, lev, dir) {
    var liq = dir === 'short' ? entry * (1 + 0.95 / lev) : entry * (1 - 0.95 / lev);
    return liq < 0 ? 0 : liq;
  }
  function liqNum(v) {
    var n = Number(v);
    if (!isFinite(n)) return null;
    return n;
  }
  function liqFmt(n) {
    var s = (Math.round(n * 100) / 100).toFixed(2);
    return s.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
  }
  function perpDefaults(state) {
    state.dir = state.dir === 'short' ? 'short' : 'long';
    state.tab = state.tab === 'liq' ? 'liq' : 'pnl';
    state.mode = state.mode === 'cross' ? 'cross' : 'iso';
    if (state.lev == null) state.lev = '10';
    if (state.open == null) state.open = '100';
    if (state.close == null) state.close = '101';
    if (state.notional == null) state.notional = '1000';
    if (state.wallet == null) state.wallet = '500';
  }
  function perpClampLev(v) {
    var n = Math.round(Number(v));
    if (!isFinite(n)) n = 10;
    if (n < 1) n = 1;
    if (n > 125) n = 125;
    return n;
  }
  function perpFigures(state) {
    var open = liqNum(state.open);
    var close = liqNum(state.close);
    var notional = liqNum(state.notional);
    var lev = perpClampLev(state.lev);
    var wallet = liqNum(state.wallet);
    var dir = state.dir === 'short' ? 'short' : 'long';
    if (!(open > 0) || !(notional > 0) || !(lev >= 1)) return null;
    var margin = notional / lev;
    var pnl = null;
    var roe = null;
    if (close > 0) {
      pnl = dir === 'short' ? notional * (open - close) / open : notional * (close - open) / open;
      roe = margin ? pnl / margin * 100 : 0;
    }
    var maint = margin * 0.05;
    var liq = null;
    var cross = state.only === 'liq' && state.mode === 'cross';
    if (cross) {
      if (wallet > maint) {
        var frac = (wallet - maint) / notional;
        liq = dir === 'short' ? open * (1 + frac) : open * (1 - frac);
        if (liq < 0) liq = 0;
      }
    } else {
      liq = roughLiqPrice(open, lev, dir);
    }
    var dist = liq == null ? null : Math.abs(liq - open);
    var pct = dist == null || !open ? null : dist / open * 100;
    return { open: open, margin: margin, pnl: pnl, roe: roe, liq: liq, pct: pct, dir: dir, lev: lev };
  }
  function perpResult(state, lang) {
    var zh = lang !== 'en';
    var fig = perpFigures(state);
    if (!fig) {
      return zh
        ? '<p class="pc-empty">开仓价格和成交数量要大于 0，杠杆在 1 到 125 之间。</p>'
        : '<p class="pc-empty">Open price and size must be above 0, and leverage between 1 and 125.</p>';
    }
    if (state.tab === 'liq') {
      if (fig.liq == null) {
        return zh
          ? '<p class="pc-empty">全仓时，钱包余额要大于这一笔很小的维持保证金，才估得出强平价。</p>'
          : '<p class="pc-empty">In cross mode, the wallet balance has to be above the small maintenance margin before a liquidation price can be estimated.</p>';
      }
      var way = fig.dir === 'short' ? (zh ? '上涨' : 'rise') : (zh ? '下跌' : 'fall');
      var line = zh
        ? '价格大约要' + way + ' ' + liqFmt(fig.pct) + '%，才会到这条粗估强平价。'
        : 'Price has to ' + way + ' about ' + liqFmt(fig.pct) + '% to reach this rough liquidation price.';
      var diff = zh
        ? '逐仓最多亏这笔保证金；全仓会动用整个账户的钱，爆了会一起亏掉。'
        : 'Isolated margin can lose at most this position’s margin. Cross margin uses the money in the whole account, so a liquidation can take all of it.';
      return '<div class="pc-line"><span>' + (zh ? '强平价格' : 'Liq. price') + '</span><b>' + liqFmt(fig.liq) + '</b></div><p class="pc-note">' + esc(line) + '</p><p class="pc-note">' + esc(diff) + '</p>';
    }
    if (fig.pnl == null) {
      return zh
        ? '<p class="pc-empty">平仓价格也要大于 0。</p>'
        : '<p class="pc-empty">Close price also needs to be above 0.</p>';
    }
    var sign = fig.pnl > 0 ? ' pc-pos' : (fig.pnl < 0 ? ' pc-neg' : '');
    var pnlText = (fig.pnl > 0 ? '+' : '') + liqFmt(fig.pnl);
    var roeText = (fig.roe > 0 ? '+' : '') + liqFmt(fig.roe) + '%';
    return '<div class="pc-line"><span>' + (zh ? '起始保证金' : 'Initial margin') + '</span><b>' + liqFmt(fig.margin) + ' USDT</b></div>' +
      '<div class="pc-line"><span>' + (zh ? '盈亏' : 'PnL') + '</span><b class="' + sign.trim() + '">' + pnlText + ' USDT</b></div>' +
      '<div class="pc-line"><span>' + (zh ? '回报率' : 'Return') + '</span><b class="' + sign.trim() + '">' + roeText + '</b></div>';
  }
  function renderPerp(lang, state) {
    var zh = lang !== 'en';
    perpDefaults(state);
    var lev = perpClampLev(state.lev);
    state.lev = String(lev);
    function field(key, label, hide) {
      return '<label class="pc-field' + (hide ? ' is-hide' : '') + '" data-pc-field="' + key + '">' + label +
        '<input inputmode="decimal" data-pc="' + key + '" value="' + esc(String(state[key])) + '"' + (hide ? ' disabled' : '') + '></label>';
    }
    var liqOnly = state.only === 'liq';
    state.tab = liqOnly ? 'liq' : 'pnl';
    var modes = liqOnly
      ? '<div class="pc-modes"><label class="pc-field" data-pc-field="mode">' + (zh ? '保证金模式' : 'Margin mode') +
        '<select data-pc="mode"><option value="iso"' + (state.mode === 'iso' ? ' selected' : '') + '>' + (zh ? '逐仓' : 'Isolated') + '</option><option value="cross"' + (state.mode === 'cross' ? ' selected' : '') + '>' + (zh ? '全仓' : 'Cross') + '</option></select></label>' +
        '<label class="pc-field" data-pc-field="pos">' + (zh ? '持仓模式' : 'Position mode') +
        '<select disabled><option>' + (zh ? '单向持仓' : 'One-way') + '</option></select></label></div>'
      : '';
    var foot = liqOnly
      ? (zh ? '这是教学粗估，维持保证金只按一个很小的比例。真的交易所算法会略有不同。' : 'This is a teaching estimate, with only a small maintenance margin. A real exchange’s math differs a little.')
      : '';
    return '<div class="pc">' +
      '<div class="pc-head"><strong>BTCUSDT</strong><span>' + (zh ? '永续' : 'Perp') + '</span></div>' +
      modes +
      '<div class="pc-side">' +
      '<button type="button" data-pc-dir="long" aria-pressed="' + (state.dir === 'long' ? 'true' : 'false') + '">' + (zh ? '做多' : 'Long') + '</button>' +
      '<button type="button" data-pc-dir="short" aria-pressed="' + (state.dir === 'short' ? 'true' : 'false') + '">' + (zh ? '做空' : 'Short') + '</button>' +
      '</div>' +
      '<div class="pc-lev"><button type="button" data-pc-step="-1" aria-label="-">−</button><b class="pc-lev-n">' + lev + 'x</b><button type="button" data-pc-step="1" aria-label="+">+</button></div>' +
      '<input class="pc-slider" type="range" min="1" max="125" step="1" data-pc="lev" value="' + lev + '">' +
      field('open', zh ? '开仓价格' : 'Open price', false) +
      field('close', zh ? '平仓价格' : 'Close price', liqOnly) +
      field('notional', zh ? '成交数量 (USDT)' : 'Size (USDT)', false) +
      field('wallet', zh ? '钱包余额' : 'Wallet balance', !(liqOnly && state.mode === 'cross')) +
      '<div class="pc-result">' + perpResult(state, lang) + '</div>' +
      '<button type="button" class="pc-calc" data-pc-calc="1">' + (zh ? '计算' : 'Calculate') + '</button>' +
      (foot ? '<p class="pc-foot">' + foot + '</p>' : '') + '</div>';
  }
  function bindPerp(root, state, lang) {
    function showFields() {
      root.querySelectorAll('[data-pc-field]').forEach(function (el) {
        var key = el.getAttribute('data-pc-field');
        var hide = false;
        var liqOnly = state.only === 'liq';
        if (key === 'close') hide = liqOnly;
        if (key === 'mode' || key === 'pos') hide = !liqOnly;
        if (key === 'wallet') hide = !(liqOnly && state.mode === 'cross');
        el.classList.toggle('is-hide', hide);
        var box = el.querySelector('input');
        if (box) box.disabled = hide;
      });
      root.querySelectorAll('[data-pc-dir]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-pc-dir') === state.dir ? 'true' : 'false');
      });
      root.querySelectorAll('[data-pc-tab]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-pc-tab') === state.tab ? 'true' : 'false');
      });
      var levEl = root.querySelector('.pc-lev-n');
      if (levEl) levEl.textContent = perpClampLev(state.lev) + 'x';
      var slider = root.querySelector('.pc-slider');
      if (slider && document.activeElement !== slider) slider.value = String(perpClampLev(state.lev));
    }
    function write() {
      var box = root.querySelector('.pc-result');
      if (box) box.innerHTML = perpResult(state, lang);
      showFields();
    }
    root.querySelectorAll('[data-pc-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () { state.dir = btn.getAttribute('data-pc-dir'); write(); });
    });
    root.querySelectorAll('[data-pc-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () { state.tab = btn.getAttribute('data-pc-tab'); write(); });
    });
    root.querySelectorAll('[data-pc-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.lev = String(perpClampLev(Number(state.lev) + Number(btn.getAttribute('data-pc-step'))));
        write();
      });
    });
    root.querySelectorAll('[data-pc]').forEach(function (input) {
      input.addEventListener('input', function () {
        state[input.getAttribute('data-pc')] = input.value;
        if (input.getAttribute('data-pc') === 'lev') state.lev = String(perpClampLev(input.value));
        write();
      });
      input.addEventListener('change', function () {
        state[input.getAttribute('data-pc')] = input.value;
        write();
      });
    });
    var calc = root.querySelector('[data-pc-calc]');
    if (calc) calc.addEventListener('click', write);
  }
  function renderKind(study, bars, shown, lang, state) {
    if (study.kind === 'spotbook') return renderSpotBook(lang, state || {});
    if (study.kind === 'liq') {
      state.only = 'liq';
      state.tab = 'liq';
      return renderPerp(lang, state || {});
    }
    if (study.kind === 'perpcalc') {
      state.only = 'pnl';
      state.tab = 'pnl';
      var kept = '<div class="a2-readout">' + (study.rows || []).map(function (row) {
        return '<p>' + esc(text(row, lang)) + '</p>';
      }).join('') + '</div>';
      return kept + renderPerp(lang, state || {});
    }
    var closes = bars.map(function (bar) { return bar.c; });
    var math = M();
    if (study.kind === 'ema') {
      var fastN = study.periods[0];
      var slowN = study.periods[1];
      var eFast = math.ema(closes, fastN);
      var eSlow = math.ema(closes, slowN);
      var lastC = closes[closes.length - 1];
      var lastI = closes.length - 1;
      var above = eFast[lastI] > lastC && eSlow[lastI] > lastC;
      var note = (lang === 'en'
        ? 'Teaching fiction. EMA' + fastN + ' follows the last ' + fastN + ' bars. EMA' + slowN + ' follows the last ' + slowN + ' bars.'
        : '教学虚构。EMA' + fastN + ' 看最近 ' + fastN + ' 根。EMA' + slowN + ' 看最近 ' + slowN + ' 根。');
      if (above) {
        note += lang === 'en'
          ? ' The latest close is ' + fmt(lastC, 0) + '. Both lines are still above it.'
          : '最新收盘是 ' + fmt(lastC, 0) + '。两条都还在它上面。';
      }
      return emaSvg(bars, eFast, eSlow, fastN, slowN, lang) + '<p class="a2-readout">' + esc(note) + '</p>';
    }
    if (study.kind === 'macd') {
      var m = math.macd(closes);
      var noteM = lang === 'en'
        ? 'Teaching fiction. MACD is 12/26/9. Golden is DIF crossing above DEA. Death is a cross below. The histogram is DIF minus DEA.'
        : '教学虚构。MACD 是 12/26/9。金叉是 DIF 上穿 DEA。死叉是下穿。柱子是 DIF 减去 DEA。';
      return macdSvg(bars, m, lang) + '<p class="a2-readout">' + esc(noteM) + '</p>';
    }
    if (study.kind === 'rsi') {
      var r = math.rsiWilder(closes, 14);
      var missing = lang === 'en' ? 'Insufficient data' : '样本不足';
      function rsiText(v) { return v == null ? missing : fmt(v, 2); }
      if (study.main === 'rsi') {
        var lastR = null;
        var ri;
        for (ri = r.length - 1; ri >= 0; ri--) if (r[ri] != null) { lastR = r[ri]; break; }
        var noteR = lang === 'en'
          ? 'Teaching fiction. This is RSI(14). The latest value is ' + rsiText(lastR) + '. The guides are 70 overbought and 30 oversold.'
          : '教学虚构。这是 RSI(14)。最新值是 ' + rsiText(lastR) + '。参考线是 70 超买和 30 超卖。';
        return rsiSvg(bars, r, lang) + '<p class="a2-readout">' + esc(noteR) + '</p>';
      }
      var readout;
      if (study.peaks) {
        readout = study.peaks.map(function (pk) {
          var v = pk.index < r.length ? r[pk.index] : null;
          return lang === 'en'
            ? 'High ' + pk.high + ', RSI ' + rsiText(v)
            : '高点 ' + pk.high + '，RSI ' + rsiText(v);
        }).join(lang === 'en' ? '; ' : '；');
      } else {
        readout = 'RSI ' + rsiText(r[r.length - 1]);
      }
      return candleSvg(bars, {
        pane: { label: 'RSI(14)', values: r, series: [{ values: r, color: '#e6c79e' }] }
      }) + '<p class="a2-readout">' + esc(readout) + '</p>';
    }
    if (study.kind === 'boll') {
      var band = math.bollinger(closes, study.n || 3, study.k || 2);
      var mids = band.map(function (b) { return b && b.mid; });
      var up = band.map(function (b) { return b && b.upper; });
      var lo = band.map(function (b) { return b && b.lower; });
      var last = band[band.length - 1];
      return candleSvg(bars, { lines: [
        { values: up, color: '#8eb4ff' },
        { values: mids, color: '#e6c79e' },
        { values: lo, color: '#d7b4ff' }
      ] }) + '<p class="a2-readout">' + (last ? ('mid ' + fmt(last.mid, 3) + ' · upper ' + fmt(last.upper, 3) + ' · lower ' + fmt(last.lower, 3)) : '') + '</p>';
    }
    if (study.kind === 'fib') {
      var low = study.low;
      var high = study.high;
      var levels = (state.dir === 'down' ? math.fibDown(low, high) : math.fibUp(low, high));
      var drawn = levels.map(function (lv) { return { price: lv.price, label: String(lv.r) }; });
      return candleSvg(bars, { levels: drawn }) +
        '<div class="a1-modes"><button type="button" data-state="dir" data-pick="up">' + (lang === 'en' ? 'Up retrace' : '上涨回撤') + '</button><button type="button" data-state="dir" data-pick="down">' + (lang === 'en' ? 'Down retrace' : '下跌回撤') + '</button></div>' +
        table(['r', lang === 'en' ? 'Price' : '价格'], levels.map(function (lv) { return [String(lv.r), fmt(lv.price, 2)]; }), lang);
    }
    if (study.kind === 'zone') {
      return candleSvg(bars, { zone: study.zone }) + '<p class="a2-readout">' + esc(text(study.caption, lang)) + '</p>';
    }
    if (study.kind === 'levels') {
      return candleSvg(bars, { levels: study.levels || [] }) + '<p class="a2-readout">' + esc(text(study.caption, lang)) + '</p>';
    }
    if (study.kind === 'panel' || study.kind === 'book') {
      return '<div class="a2-readout">' + (study.rows || []).map(function (row) {
        return '<p>' + esc(text(row, lang)) + '</p>';
      }).join('') + '</div>' + (study.headers ? table(study.headers, study.cells || [], lang) : '');
    }
    return candleSvg(bars, {});
  }

  var baseMount = mount;
  mount = function (root, lesson, lang, t) {
    if (lesson.study && lesson.study.kind === 'fib') {
      var state = { dir: 'up' };
      var shown = (lesson.study.bars || lesson.study.closes || []).length;
      function paint() {
        var study = lesson.study;
        var raw = study.bars || M().barsFromCloses(study.closes || []);
        var bars = raw.slice(0, shown);
        root.innerHTML = '<div class="a1">' + (t ? '<p class="a1-flag">' + t('star.sim') + ' · ' + t('star.figure') + ' · ' + t('star.a2.disclaimer') + '</p>' : '') + legend(lang) + renderKind(Object.assign({}, study, {}), bars, shown, lang, state) + '</div>';
        root.querySelectorAll('[data-pick]').forEach(function (btn) {
          btn.addEventListener('click', function () { state.dir = btn.getAttribute('data-pick'); paint(); });
        });
      }
      paint();
      return;
    }
    baseMount(root, lesson, lang, t);
  };

  global.STAR_STUDY = { mount: mount };
})(window);
