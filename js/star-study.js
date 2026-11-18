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

  function mount(root, lesson, lang, t) {
    var study = lesson.study || { kind: 'note' };
    var shown = 1;
    var state = {};
    function source() {
      if (study.bars) return study.bars;
      return M().barsFromCloses(study.closes || []);
    }
    function bars() { return source().slice(0, shown); }
    function paint() {
      var plainStudy = study.kind === 'ema' || study.kind === 'macd' || (study.kind === 'rsi' && study.main === 'rsi');
      var html = '<div class="a1">' + (t ? '<p class="a1-flag">' + t('star.sim') + ' · ' + t('star.figure') + ' · ' + t('star.a2.disclaimer') + '</p>' : '') + (plainStudy ? '' : legend(lang));
      html += renderKind(study, bars(), shown, lang, state);
      var max = source().length || 1;
      if (max > 1 && study.kind !== 'book' && study.kind !== 'panel') {
        html += '<div class="a1-modes"><button type="button" data-step="prev">' + (lang === 'en' ? 'Previous bar' : '上一根') + '</button><button type="button" data-step="next">' + (lang === 'en' ? 'Next bar' : '下一根') + '</button><span>' + shown + ' / ' + max + '</span></div>';
      }
      html += '</div>';
      root.innerHTML = html;
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
      if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + series.color + '" stroke-width="' + (series.width || 2.4) + '"></polyline>');
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

  function renderKind(study, bars, shown, lang, state) {
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
