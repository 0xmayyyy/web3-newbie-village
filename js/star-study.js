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
        }
      });
    }
    bits.push('</svg>');
    return bits.join('');
  }

  function table(headers, rows) {
    return '<div class="table-wrap"><table><thead><tr>' + headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + esc(cell) + '</td>'; }).join('') + '</tr>'; }).join('') +
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
      var html = '<div class="a1">' + (t ? '<p class="a1-flag">' + t('star.sim') + ' · ' + t('star.figure') + ' · ' + t('star.a2.disclaimer') + '</p>' : '') + legend(lang);
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

  function renderKind(study, bars, shown, lang, state) {
    var closes = bars.map(function (bar) { return bar.c; });
    var math = M();
    if (study.kind === 'ema') {
      var p1 = Number(state.n || study.periods[0]);
      var p2 = study.periods[1];
      var e1 = math.ema(closes, p1);
      var e2 = math.ema(closes, p2);
      var svg = candleSvg(bars, { lines: [
        { values: e1, color: '#e6c79e' },
        { values: e2, color: '#8eb4ff' }
      ] });
      var last = closes.length - 1;
      var alpha = 2 / (p1 + 1);
      var note = 'N=' + p1 + ' α=' + fmt(alpha, 4) + '  C=' + fmt(closes[last], 3) + '  EMA=' + fmt(e1[last], 6);
      return svg + '<label class="a2-window">N <input data-state="n" type="range" min="1" max="50" value="' + p1 + '"></label><p class="a2-readout">' + esc(note) + '</p>' +
        table(['#', 'C', 'EMA' + p1, 'EMA' + p2], closes.map(function (c, i) {
          return [String(i + 1), fmt(c, 3), fmt(e1[i], 6), fmt(e2[i], 6)];
        }));
    }
    if (study.kind === 'macd') {
      var m = math.macd(closes);
      return candleSvg(bars, {
        pane: {
          label: 'MACD  DIF−DEA',
          values: m.hist,
          series: [
            { values: m.hist, bars: true },
            { values: m.dif, color: '#e6c79e' },
            { values: m.dea, color: '#8eb4ff' }
          ]
        }
      }) + '<p class="a2-readout">DIF ' + fmt(m.dif[m.dif.length - 1], 4) + ' · DEA ' + fmt(m.dea[m.dea.length - 1], 4) + ' · hist ' + fmt(m.hist[m.hist.length - 1], 4) + '</p>';
    }
    if (study.kind === 'rsi') {
      var r = math.rsiWilder(closes, 14);
      return candleSvg(bars, {
        pane: { label: 'RSI(14)', values: r.map(function (v) { return v == null ? 50 : v; }), series: [{ values: r, color: '#e6c79e' }] }
      }) + '<p class="a2-readout">RSI ' + fmt(r[r.length - 1], 2) + '</p>';
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
        table(['r', lang === 'en' ? 'Price' : '价格'], levels.map(function (lv) { return [String(lv.r), fmt(lv.price, 2)]; }));
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
      }).join('') + '</div>' + (study.headers ? table(study.headers, study.cells || []) : '');
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
