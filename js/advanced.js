/* 进阶知识星 pages. Lesson bodies live in js/data-advanced.js. */
(function () {
  'use strict';
  var BULL = { o: 100, h: 110, l: 95, c: 106 };
  var BEAR = { o: 106, h: 110, l: 95, c: 100 };
  var PATHS = {
    high: [100, 110, 95, 106],
    low: [100, 95, 110, 106]
  };

  function pack() { return window.ADVANCED_STAR; }
  function L(field, lang) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.zh || '';
  }
  function lessonById(chapter, id) {
    var list = chapter && chapter.lessons || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function minutes(lesson) {
    var bits = [L(lesson.one, 'zh'), L(lesson.explain, 'zh'), L(lesson.example, 'zh'), L(lesson.practice, 'zh')];
    (lesson.pitfalls || []).forEach(function (item) { bits.push(L(item, 'zh')); });
    var n = bits.join('').length;
    return Math.max(2, Math.round(n / 280));
  }
  function simFlag(t) {
    return '<p class="a1-flag">' + t('star.sim') + ' · ' + t('star.figure') + ' · ' + t('star.a2.disclaimer') + '</p>';
  }
  function miniSpark(bars) {
    var cs = bars.map(function (bar) { return bar.c; });
    var lo = Math.min.apply(null, cs);
    var hi = Math.max.apply(null, cs);
    var pts = cs.map(function (c, i) {
      var x = (i / (cs.length - 1)) * 108 + 6;
      var y = 40 - ((c - lo) / (hi - lo || 1)) * 32;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    return '<svg viewBox="0 0 120 48" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>';
  }
  function candleFromPath(path) {
    return {
      o: path[0],
      c: path[path.length - 1],
      h: Math.max.apply(null, path),
      l: Math.min.apply(null, path)
    };
  }
  function ranges(candle) {
    var top = Math.max(candle.o, candle.c);
    var bot = Math.min(candle.o, candle.c);
    return { body: [bot, top], upper: [top, candle.h], lower: [candle.l, bot], up: candle.c >= candle.o };
  }

  function mountChart(root, lang, t) {
    var mode = 'candle';
    var side = 'bull';
    var pathKey = 'high';
    var custom = null;
    var selected = 'all';
    root.innerHTML =
      '<div class="a1">' +
      simFlag(t) +
      '<div class="a1-modes" role="group" aria-label="' + t('star.chart.modes') + '">' +
      '<button type="button" data-mode="candle" aria-pressed="true">' + t('star.chart.candle') + '</button>' +
      '<button type="button" data-mode="path" aria-pressed="false">' + t('star.chart.paths') + '</button>' +
      '</div>' +
      '<div class="a1-sub" data-panel="candle">' +
      '<button type="button" data-side="bull" aria-pressed="true">' + t('star.chart.bull') + '</button>' +
      '<button type="button" data-side="bear" aria-pressed="false">' + t('star.chart.bear') + '</button>' +
      '</div>' +
      '<div class="a1-sub" data-panel="path" hidden>' +
      '<button type="button" data-path="high" aria-pressed="true">' + t('star.chart.highFirst') + '</button>' +
      '<button type="button" data-path="low" aria-pressed="false">' + t('star.chart.lowFirst') + '</button>' +
      '</div>' +
      '<div class="a1-stage"><svg class="a1-svg" viewBox="0 0 360 280" role="img" aria-labelledby="a1-title"></svg></div>' +
      '<div id="a1-title" class="a1-live" aria-live="polite"></div>' +
      '<div class="a1-edit" data-panel="candle">' +
      '<p class="a1-edit-label">' + t('star.chart.edit') + '</p>' +
      '<div class="a1-fields">' +
      ['o', 'h', 'l', 'c'].map(function (key) {
        return '<label>' + t('star.chart.' + key) + '<input inputmode="decimal" data-field="' + key + '" value=""></label>';
      }).join('') +
      '</div>' +
      '<p class="a1-error" hidden></p>' +
      '</div>' +
      '<div class="a1-parts" role="group" aria-label="' + t('star.chart.edit') + '">' +
      ['o', 'h', 'l', 'c', 'body', 'upper', 'lower'].map(function (key) {
        return '<button type="button" data-part="' + key + '" aria-pressed="false">' + t('star.chart.' + key) + '</button>';
      }).join('') +
      '</div>' +
      '<div class="a1-note">' + noteHtml(t('star.chart.colorNote')) + '</div>' +
      '</div>';
    var svg = root.querySelector('.a1-svg');
    var live = root.querySelector('.a1-live');
    var error = root.querySelector('.a1-error');
    var fields = {};
    root.querySelectorAll('[data-field]').forEach(function (input) { fields[input.getAttribute('data-field')] = input; });

    function currentCandle() {
      if (mode === 'path') return candleFromPath(PATHS[pathKey]);
      if (custom) return custom;
      return side === 'bear' ? BEAR : BULL;
    }
    function fillInputs(candle) {
      fields.o.value = String(candle.o);
      fields.h.value = String(candle.h);
      fields.l.value = String(candle.l);
      fields.c.value = String(candle.c);
    }
    function partText(candle) {
      var r = ranges(candle);
      var upper = r.upper[0] === r.upper[1] ? t('star.chart.noUpper') : r.upper[0] + '–' + r.upper[1];
      var lower = r.lower[0] === r.lower[1] ? t('star.chart.noLower') : r.lower[0] + '–' + r.lower[1];
      var bits = {
        all: t('star.chart.readout', { o: candle.o, h: candle.h, l: candle.l, c: candle.c, body: r.body[0] + '–' + r.body[1], upper: upper, lower: lower }),
        o: t('star.chart.o') + ' ' + candle.o,
        h: t('star.chart.h') + ' ' + candle.h,
        l: t('star.chart.l') + ' ' + candle.l,
        c: t('star.chart.c') + ' ' + candle.c,
        body: t('star.chart.body') + ' ' + r.body[0] + '–' + r.body[1],
        upper: t('star.chart.upper') + ' ' + upper,
        lower: t('star.chart.lower') + ' ' + lower
      };
      return bits[selected] || bits.all;
    }
    function yOf(price, candle) {
      var pad = Math.max(2, (candle.h - candle.l) * 0.18);
      var min = candle.l - pad;
      var max = candle.h + pad;
      return 28 + (max - price) / (max - min) * 200;
    }
    function draw() {
      var candle = currentCandle();
      var r = ranges(candle);
      var yH = yOf(candle.h, candle);
      var yL = yOf(candle.l, candle);
      var yO = yOf(candle.o, candle);
      var yC = yOf(candle.c, candle);
      var bodyY = Math.min(yO, yC);
      var bodyH = Math.max(2, Math.abs(yC - yO));
      var color = r.up ? '#1f8a4d' : '#d4534e';
      var svgBits = '';
      if (mode === 'path') {
        var path = PATHS[pathKey];
        var pts = path.map(function (price, i) {
          return (36 + i * 52) + ',' + yOf(price, candle);
        }).join(' ');
        svgBits += '<polyline points="' + pts + '" fill="none" stroke="#e6c79e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>';
        path.forEach(function (price, i) {
          var x = 36 + i * 52;
          var y = yOf(price, candle);
          svgBits += '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="#f5efff"></circle>';
          svgBits += '<text x="' + x + '" y="' + (y - 12) + '" text-anchor="middle" fill="#d4bc9e" font-size="11">' + price + '</text>';
        });
      }
      var cx = mode === 'path' ? 268 : 168;
      svgBits += '<line x1="' + cx + '" y1="' + yH + '" x2="' + cx + '" y2="' + yL + '" stroke="' + color + '" stroke-width="2"></line>';
      svgBits += '<rect data-part="body" x="' + (cx - 18) + '" y="' + bodyY + '" width="36" height="' + bodyH + '" rx="2" fill="' + color + '"' + (selected === 'body' ? ' stroke="#e6c79e" stroke-width="3"' : '') + '></rect>';
      if (mode !== 'path') {
        svgBits += '<text x="' + (cx + 28) + '" y="' + (yH + 4) + '" fill="#f5efff" font-size="12">' + t('star.chart.h') + ' ' + candle.h + '</text>';
        svgBits += '<text x="' + (cx + 28) + '" y="' + (yL + 4) + '" fill="#f5efff" font-size="12">' + t('star.chart.l') + ' ' + candle.l + '</text>';
        svgBits += '<text x="16" y="' + (yO + 4) + '" fill="#e6c79e" font-size="12">' + t('star.chart.o') + ' ' + candle.o + '</text>';
        svgBits += '<text x="16" y="' + (yC + 4) + '" fill="#e6c79e" font-size="12">' + t('star.chart.c') + ' ' + candle.c + '</text>';
      }
      svg.innerHTML = svgBits;
      setNote(live, partText(candle) + (mode === 'path' && selected === 'all' ? ' ' + t('star.chart.order') : ''));
      if (mode === 'candle') fillInputs(candle);
      root.querySelectorAll('[data-part]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-part') === selected ? 'true' : 'false');
      });
      error.hidden = true;
    }
    function setPressed(selector, attr, value) {
      root.querySelectorAll(selector).forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute(attr) === value ? 'true' : 'false');
      });
    }
    root.addEventListener('click', function (event) {
      var btn = event.target.closest('button');
      if (!btn || !root.contains(btn)) {
        var part = event.target.getAttribute && event.target.getAttribute('data-part');
        if (part) { selected = part; draw(); }
        return;
      }
      if (btn.hasAttribute('data-part')) {
        selected = btn.getAttribute('data-part');
        draw();
        return;
      }
      if (btn.hasAttribute('data-mode')) {
        mode = btn.getAttribute('data-mode');
        custom = null;
        selected = 'all';
        setPressed('[data-mode]', 'data-mode', mode);
        root.querySelector('[data-panel="candle"]').hidden = mode !== 'candle';
        root.querySelector('[data-panel="path"]').hidden = mode !== 'path';
        root.querySelector('.a1-edit').hidden = mode !== 'candle';
        draw();
        return;
      }
      if (btn.hasAttribute('data-side')) {
        side = btn.getAttribute('data-side');
        custom = null;
        selected = 'all';
        setPressed('[data-side]', 'data-side', side);
        draw();
        return;
      }
      if (btn.hasAttribute('data-path')) {
        pathKey = btn.getAttribute('data-path');
        selected = 'all';
        setPressed('[data-path]', 'data-path', pathKey);
        draw();
      }
    });
    function readEdit() {
      var next = {
        o: Number(fields.o.value),
        h: Number(fields.h.value),
        l: Number(fields.l.value),
        c: Number(fields.c.value)
      };
      if (!Object.keys(next).every(function (key) { return Number.isFinite(next[key]); })) {
        error.hidden = false;
        error.textContent = t('star.chart.badNumber');
        return;
      }
      if (next.h < Math.max(next.o, next.c) || next.l > Math.min(next.o, next.c)) {
        error.hidden = false;
        error.textContent = t('star.chart.badRange');
        return;
      }
      custom = next;
      selected = 'all';
      error.hidden = true;
      draw();
    }
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener('change', readEdit);
    });
    svg.addEventListener('click', function (event) {
      if (event.target === svg) { selected = 'all'; draw(); }
    });
    draw();
  }

  function mountTimeframes(root, lang, t) {
    var pack = window.STAR_A2.day();
    var m5 = pack.m5;
    var h1 = pack.h1;
    var d1 = pack.d1;
    var view = 'twelve';
    var hour = 9;
    var merged = false;
    var dayMerged = false;
    var focus = null;
    var zoom = 1;
    function px(n) {
      var s = Number(n).toFixed(2);
      return s.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }
    function clock(mins) {
      if (mins >= 1440) return '24:00';
      var h = Math.floor(mins / 60);
      var m = mins % 60;
      return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    }
    function span(start, step) { return clock(start) + '–' + clock(start + step); }
    root.innerHTML =
      '<div class="a2">' + simFlag(t) +
      '<div class="a1-note">' + noteHtml(t('star.a2.scale')) + '</div>' +
      '<div class="a1-note">' + noteHtml(t('star.a2.agg')) + '</div>' +
      '<div class="a1-note">' + noteHtml(t('star.a2.when')) + '</div>' +
      '<div class="a1-modes" role="group">' +
      '<button type="button" data-view="twelve" aria-pressed="true">' + t('star.a2.twelve') + '</button>' +
      '<button type="button" data-view="drop" aria-pressed="false">' + t('star.a2.drop') + '</button>' +
      '<button type="button" data-view="hours" aria-pressed="false">' + t('star.a2.hours') + '</button>' +
      '<button type="button" data-view="all" aria-pressed="false">' + t('star.a2.all') + '</button>' +
      '</div>' +
      '<div class="a1-modes a2-tools">' +
      '<button type="button" data-hour="-1">' + t('star.a2.prev') + '</button>' +
      '<button type="button" data-hour="1">' + t('star.a2.next') + '</button>' +
      '<button type="button" data-merge="hour">' + t('star.a2.mergeHour') + '</button>' +
      '<button type="button" data-merge="day">' + t('star.a2.mergeDay') + '</button>' +
      '<button type="button" data-zoom="out">' + t('star.a2.zoomOut') + '</button>' +
      '<button type="button" data-zoom="in">' + t('star.a2.zoomIn') + '</button>' +
      '</div>' +
      '<p class="a2-window" id="a2-window"></p>' +
      '<div class="a2-scroll" id="a2-scroll" tabindex="0" role="group" aria-label="' + t('star.a2.keys') + '"></div>' +
      '<div class="a1-live a2-readout" id="a2-live" aria-live="polite"></div>' +
      '<h4 class="a2-subhead" id="a2-subhead" hidden></h4>' +
      '<div class="a2-scroll" id="a2-child" hidden></div>' +
      '<div class="a1-note a2-legend">' + noteHtml(t('star.a2.legend')) + '</div></div>';
    var scroll = root.querySelector('#a2-scroll');
    var child = root.querySelector('#a2-child');
    var subhead = root.querySelector('#a2-subhead');
    var live = root.querySelector('#a2-live');
    var windowLine = root.querySelector('#a2-window');
    function scene() {
      if (view === 'twelve') return { bars: m5.slice(hour * 12, hour * 12 + 12), step: 5, result: merged ? h1[hour] : null, src: merged ? window.STAR_A2.sources(m5.slice(hour * 12, hour * 12 + 12)) : null };
      if (view === 'drop') return { bars: m5.slice(156, 180), step: 5, result: null, src: null };
      if (view === 'hours') return { bars: h1, step: 60, result: dayMerged ? d1 : null, src: dayMerged ? window.STAR_A2.sources(h1) : null };
      return { bars: m5, step: 5, result: null, src: null };
    }
    function svgOf(bars, step, opts) {
      var hostW = (opts.host || scroll).clientWidth || root.clientWidth || 320;
      var padL = 8;
      var padR = 54;
      var extra = opts.result ? 28 : 0;
      var count = bars.length + (opts.result ? 1 : 0);
      var usable = Math.max(160, hostW - padL - padR - extra);
      var fit = usable / Math.max(count, 1);
      var slot = opts.child ? Math.max(8, Math.min(28, fit)) : (bars.length > 40 ? Math.max(8, fit) : Math.max(10, Math.min(48, fit)));
      slot = Math.round(slot * (opts.child ? 1 : zoom) * 10) / 10;
      var lows = bars.map(function (bar) { return bar.l; });
      var highs = bars.map(function (bar) { return bar.h; });
      if (opts.result) { lows.push(opts.result.l); highs.push(opts.result.h); }
      var minP = Math.min.apply(null, lows);
      var maxP = Math.max.apply(null, highs);
      var padP = Math.max(0.15, (maxP - minP) * 0.12);
      minP -= padP;
      maxP += padP;
      var padT = 22;
      var priceH = opts.child ? 120 : 188;
      var volH = opts.child ? 0 : 52;
      var gap = opts.child ? 0 : 8;
      var timeH = 20;
      var plot = bars.length * slot + (opts.result ? slot + 26 : 0);
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + gap + volH + timeH;
      function yPrice(price) { return padT + (maxP - price) / (maxP - minP) * priceH; }
      var maxV = 1;
      bars.forEach(function (bar) { if (bar.v > maxV) maxV = bar.v; });
      var volTop = padT + priceH + gap;
      function yVol(v) { return volTop + volH - (v / maxV) * (volH - 4); }
      var bits = [];
      for (var g = 0; g < 4; g++) {
        var price = minP + (maxP - minP) * (g / 3);
        var gy = yPrice(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (padL + plot) + '" y2="' + gy + '" stroke="rgba(230,199,158,.2)"></line>');
        bits.push('<text x="' + (padL + plot + 6) + '" y="' + (gy + 4) + '" fill="#d4bc9e" font-size="11">' + px(price) + '</text>');
      }
      function candle(bar, i, x, wide, badge) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = x + wide / 2;
        var yH = yPrice(bar.h);
        var yL = yPrice(bar.l);
        var yO = yPrice(bar.o);
        var yC = yPrice(bar.c);
        var top = Math.min(yO, yC);
        var bh = Math.max(1.5, Math.abs(yC - yO));
        var bw = Math.max(3, wide * 0.62);
        var on = opts.focus === i;
        var label = clock(bar.start) + ' ' + t('star.chart.o') + px(bar.o) + ' ' + t('star.chart.h') + px(bar.h) + ' ' + t('star.chart.l') + px(bar.l) + ' ' + t('star.chart.c') + px(bar.c);
        var tab = bars.length <= 24 ? '0' : '-1';
        bits.push('<g data-i="' + i + '" tabindex="' + tab + '" role="button" aria-label="' + label + '">');
        bits.push('<rect x="' + x + '" y="' + padT + '" width="' + wide + '" height="' + priceH + '" fill="transparent"></rect>');
        bits.push('<line x1="' + xc + '" y1="' + yH + '" x2="' + xc + '" y2="' + yL + '" stroke="' + color + '" stroke-width="' + (on ? 2.4 : 1.4) + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"' + (on ? ' stroke="#e6c79e" stroke-width="2"' : '') + '></rect>');
        if (badge) bits.push('<text x="' + xc + '" y="' + Math.max(12, yH - 4) + '" text-anchor="middle" fill="#e6c79e" font-size="11">' + badge + '</text>');
        if (!opts.child && volH && i !== 'r') {
          bits.push('<rect x="' + (xc - bw / 2) + '" y="' + yVol(bar.v) + '" width="' + bw + '" height="' + (volTop + volH - yVol(bar.v)) + '" fill="' + color + '" opacity="0.85"></rect>');
        }
        var labelEvery = bars.length > 40 ? 24 : (bars.length > 14 ? 2 : 1);
        if (i % labelEvery === 0) bits.push('<text x="' + xc + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + clock(bar.start) + '</text>');
        bits.push('</g>');
      }
      bars.forEach(function (bar, i) {
        var badge = [];
        if (opts.src) {
          if (opts.src.o === i) badge.push(t('star.chart.o'));
          if (opts.src.h === i) badge.push(t('star.chart.h'));
          if (opts.src.l === i) badge.push(t('star.chart.l'));
          if (opts.src.c === i) badge.push(t('star.chart.c'));
        }
        candle(bar, i, padL + i * slot, slot, badge && badge.length ? badge.join(' ') : '');
      });
      if (opts.result) {
        var rx = padL + bars.length * slot + 18;
        bits.push('<g class="a2-result">');
        candle(opts.result, 'r', rx, slot + 8, t(step === 60 ? 'star.a2.d1' : 'star.a2.h1'));
        bits.push('</g>');
      }
      if (!opts.child && volH) {
        bits.push('<text x="' + padL + '" y="' + (volTop + 12) + '" fill="#b7aac8" font-size="10">' + t('star.a2.vol') + '</text>');
      }
      var widthAttr = svgW < hostW - 1 ? '100%' : svgW + 'px';
      return '<svg class="a2-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:' + widthAttr + '" role="img">' + bits.join('') + '</svg>';
    }
    function draw() {
      var now = scene();
      root.querySelectorAll('[data-view]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-view') === view ? 'true' : 'false');
      });
      root.querySelector('[data-merge="hour"]').hidden = view !== 'twelve';
      root.querySelector('[data-merge="day"]').hidden = view !== 'hours';
      root.querySelector('[data-hour="-1"]').hidden = view !== 'twelve';
      root.querySelector('[data-hour="1"]').hidden = view !== 'twelve';
      var label;
      if (view === 'twelve') label = t('star.a2.window', { a: clock(hour * 60), b: clock((hour + 1) * 60) });
      else if (view === 'drop') label = t('star.a2.dropNote', { o: px(m5[156].o), c: px(m5[179].c) });
      else if (view === 'hours') label = t('star.a2.window', { a: '00:00', b: '24:00' });
      else label = t('star.a2.window', { a: '00:00', b: '24:00' });
      windowLine.textContent = label;
      scroll.innerHTML = svgOf(now.bars, now.step, { result: now.result, src: now.src, focus: focus });
      var picked = focus === 'r' ? now.result : (focus == null ? null : now.bars[focus]);
      if (now.src && focus == null) {
        var srcBars = view === 'twelve' ? m5.slice(hour * 12, hour * 12 + 12) : h1;
        setNote(live, t('star.a2.from', {
          o: now.src.o + 1, ot: clock(srcBars[now.src.o].start),
          h: now.src.h + 1, ht: clock(srcBars[now.src.h].start),
          l: now.src.l + 1, lt: clock(srcBars[now.src.l].start),
          c: now.src.c + 1, ct: clock(srcBars[now.src.c].start)
        }));
      } else if (picked) {
        setNote(live, t('star.a2.readout', {
          tf: view === 'hours' && focus === 'r' ? t('star.a2.d1') : (view === 'hours' ? t('star.a2.h1') : t('star.a2.m5')),
          clock: span(picked.start, now.step),
          o: px(picked.o), h: px(picked.h), l: px(picked.l), c: px(picked.c), v: picked.v
        }));
      } else setNote(live, t('star.a2.hint'));
      var kids = null;
      if (view === 'hours' && typeof focus === 'number') kids = m5.slice(focus * 12, focus * 12 + 12);
      if (kids) {
        subhead.hidden = false;
        child.hidden = false;
        subhead.textContent = t('star.a2.partsHour', { a: clock(kids[0].start), b: clock(kids[0].start + 60) });
        child.innerHTML = svgOf(kids, 5, { host: child, child: true, src: window.STAR_A2.sources(kids), focus: null });
      } else {
        subhead.hidden = true;
        child.hidden = true;
        child.innerHTML = '';
      }
    }
    function setFocus(next) {
      focus = next;
      draw();
      var node = scroll.querySelector('[data-i="' + next + '"]');
      if (node && node.scrollIntoView) node.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
    root.addEventListener('click', function (event) {
      var viewBtn = event.target.closest('[data-view]');
      if (viewBtn) {
        view = viewBtn.getAttribute('data-view');
        focus = null;
        draw();
        return;
      }
      var hourBtn = event.target.closest('[data-hour]');
      if (hourBtn) {
        hour = (hour + Number(hourBtn.getAttribute('data-hour')) + 24) % 24;
        merged = false;
        focus = null;
        draw();
        return;
      }
      var mergeBtn = event.target.closest('[data-merge]');
      if (mergeBtn) {
        if (mergeBtn.getAttribute('data-merge') === 'hour') merged = true;
        else dayMerged = true;
        focus = null;
        draw();
        return;
      }
      var zoomBtn = event.target.closest('[data-zoom]');
      if (zoomBtn) {
        zoom = zoomBtn.getAttribute('data-zoom') === 'in' ? Math.min(2.6, zoom * 1.25) : Math.max(0.7, zoom / 1.25);
        draw();
        return;
      }
      var candle = event.target.closest('[data-i]');
      if (candle && scroll.contains(candle)) setFocus(candle.getAttribute('data-i') === 'r' ? 'r' : Number(candle.getAttribute('data-i')));
    });
    root.addEventListener('mousemove', function (event) {
      var candle = event.target.closest('[data-i]');
      if (!candle || !scroll.contains(candle)) return;
      var next = candle.getAttribute('data-i') === 'r' ? 'r' : Number(candle.getAttribute('data-i'));
      if (next !== focus) setFocus(next);
    });
    scroll.addEventListener('keydown', function (event) {
      var bars = scene().bars;
      var max = bars.length - 1;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      var cur = typeof focus === 'number' ? focus : 0;
      if (event.key === 'ArrowRight') cur = Math.min(max, cur + 1);
      if (event.key === 'ArrowLeft') cur = Math.max(0, cur - 1);
      if (event.key === 'Home') cur = 0;
      if (event.key === 'End') cur = max;
      setFocus(cur);
    });
    window.addEventListener('resize', function onResize() {
      if (!root.isConnected) { window.removeEventListener('resize', onResize); return; }
      draw();
    });
    draw();
  }

  function mountSwings(root, lang, t) {
    var packs = { up: window.STAR_A3.pack('up'), down: window.STAR_A3.pack('down'), range: window.STAR_A3.pack('range') };
    var key = 'up';
    var shown = null;
    var focus = 0;
    var picked = null;
    function px(n) {
      var s = Number(n).toFixed(2);
      return s.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }
    function when(start) {
      var hours = start / 60;
      var day = Math.floor(hours / 24) + 1;
      var h = hours % 24;
      return t('star.a3.clock', { d: day, h: (h < 10 ? '0' : '') + h });
    }
    root.innerHTML =
      '<div class="a2">' +
      '<div class="a3-top"><div class="a3-copy">' + simFlag(t) +
      t('star.a3.left').split('\n\n').map(function (para) {
        return '<div class="a3-block">' + para.split('\n').filter(function (line) {
          return line.replace(/\s/g, '');
        }).map(function (line) {
          return '<p>' + noteEsc(line) + '</p>';
        }).join('') + '</div>';
      }).join('') +
      '<div class="a3-block"><p><strong>' + noteEsc(t('star.a3.ruleNote')) + '</strong></p></div></div>' +
      '<div class="a3-side"><table class="a3-terms"><tbody>' +
      '<tr><th>HH</th><td>Higher High</td><td>' + noteEsc(t('star.a3.hh')) + '</td></tr>' +
      '<tr><th>HL</th><td>Higher Low</td><td>' + noteEsc(t('star.a3.hl')) + '</td></tr>' +
      '<tr><th>LH</th><td>Lower High</td><td>' + noteEsc(t('star.a3.lh')) + '</td></tr>' +
      '<tr><th>LL</th><td>Lower Low</td><td>' + noteEsc(t('star.a3.ll')) + '</td></tr>' +
      '</tbody></table>' + plainLines(t('star.a3.terms')) + '</div></div>' +
      '<div class="a3-scenarios" role="group">' +
      ['up', 'down', 'range'].map(function (id) {
        return '<button type="button" data-set="' + id + '" aria-pressed="' + (id === 'up' ? 'true' : 'false') + '">' + miniSpark(packs[id].bars) + '<span>' + t('star.a3.' + id) + '</span></button>';
      }).join('') +
      '</div>' +
      '<div class="a3-mid"><div class="a1-modes">' +
      '<button type="button" data-step="play">' + t('star.a3.play') + '</button>' +
      '<button type="button" data-step="prev">' + t('star.a3.prev') + '</button>' +
      '<button type="button" data-step="next">' + t('star.a3.next') + '</button>' +
      '<button type="button" data-step="all">' + t('star.a3.allBars') + '</button>' +
      '</div></div>' +
      '<div class="a2-scroll" id="a3-scroll" tabindex="0" role="group" aria-label="' + t('star.a2.keys') + '"></div>' +
      '<div class="a1-modes" id="a3-ask" hidden></div>' +
      '<div class="a1-live a2-readout" id="a3-live" aria-live="polite"></div>' +
      '<div class="a1-note a2-legend">' + noteHtml(t('star.a2.legend')) + '</div></div>';
    var scroll = root.querySelector('#a3-scroll');
    var live = root.querySelector('#a3-live');
    var ask = root.querySelector('#a3-ask');
    function viewBars() {
      var bars = packs[key].bars;
      var n = shown == null ? bars.length : Math.max(5, Math.min(bars.length, shown));
      return bars.slice(0, n);
    }
    function draw() {
      var bars = viewBars();
      var full = packs[key].bars;
      var pivots = window.STAR_A3.confirmed(full, bars.length);
      var dashes = window.STAR_A3.provisional(full, bars.length);
      root.querySelectorAll('[data-set]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-set') === key ? 'true' : 'false');
      });
      var hostW = scroll.clientWidth || root.clientWidth || 320;
      var slot = Math.max(10, Math.min(28, (hostW - 62) / bars.length));
      var lows = bars.map(function (bar) { return bar.l; });
      var highs = bars.map(function (bar) { return bar.h; });
      var minP = Math.min.apply(null, lows);
      var maxP = Math.max.apply(null, highs);
      var padP = Math.max(0.4, (maxP - minP) * 0.12);
      minP -= padP;
      maxP += padP;
      var padL = 8;
      var padR = 48;
      var padT = 28;
      var priceH = 180;
      var volH = 44;
      var plot = bars.length * slot;
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + 8 + volH + 20;
      function yPrice(price) { return padT + (maxP - price) / (maxP - minP) * priceH; }
      var maxV = 1;
      bars.forEach(function (bar) { if (bar.v > maxV) maxV = bar.v; });
      var volTop = padT + priceH + 8;
      var bits = [];
      for (var g = 0; g < 4; g++) {
        var price = minP + (maxP - minP) * (g / 3);
        var gy = yPrice(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (padL + plot) + '" y2="' + gy + '" stroke="rgba(230,199,158,.2)"></line>');
        bits.push('<text x="' + (padL + plot + 4) + '" y="' + (gy + 4) + '" fill="#d4bc9e" font-size="11">' + px(price) + '</text>');
      }
      var byIndex = {};
      pivots.forEach(function (point) { byIndex[point.i] = point; });
      dashes.forEach(function (point) { if (!byIndex[point.i]) byIndex[point.i] = point; });
      bars.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(3, slot * 0.62);
        var yH = yPrice(bar.h);
        var yL = yPrice(bar.l);
        var top = Math.min(yPrice(bar.o), yPrice(bar.c));
        var bh = Math.max(1.5, Math.abs(yPrice(bar.c) - yPrice(bar.o)));
        var on = focus === i;
        bits.push('<g data-i="' + i + '" tabindex="-1" role="button" aria-label="' + when(bar.start) + '">');
        bits.push('<rect x="' + x + '" y="' + padT + '" width="' + slot + '" height="' + priceH + '" fill="transparent"></rect>');
        bits.push('<line x1="' + xc + '" y1="' + yH + '" x2="' + xc + '" y2="' + yL + '" stroke="' + color + '" stroke-width="' + (on ? 2.2 : 1.3) + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"' + (on ? ' stroke="#e6c79e" stroke-width="2"' : '') + '></rect>');
        var yv = volTop + volH - (bar.v / maxV) * (volH - 4);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + yv + '" width="' + bw + '" height="' + (volTop + volH - yv) + '" fill="' + color + '" opacity="0.85"></rect>');
        if (i % 4 === 0) bits.push('<text x="' + xc + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + when(bar.start) + '</text>');
        var mark = byIndex[i];
        if (mark) {
          var yy = mark.k === 'H' ? yH - 8 : yL + 12;
          var label = mark.dash ? t('star.a3.dash') : window.STAR_A3.tag(pivots, mark);
          bits.push('<text x="' + xc + '" y="' + yy + '" text-anchor="middle" fill="#e6c79e" font-size="11"' + (mark.dash ? ' stroke="#e6c79e" stroke-width="0.4" stroke-dasharray="2 2"' : '') + '>' + label + '</text>');
        }
        bits.push('</g>');
      });
      bits.push('<text x="' + padL + '" y="' + (volTop + 11) + '" fill="#b7aac8" font-size="10">' + t('star.a2.vol') + '</text>');
      var widthAttr = svgW < hostW - 1 ? '100%' : svgW + 'px';
      scroll.innerHTML = '<svg class="a2-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:' + widthAttr + '" role="img">' + bits.join('') + '</svg>';
      var bar = bars[focus] || bars[bars.length - 1];
      if (!picked) setNote(live, t('star.a3.hint', { clock: when(bar.start), o: px(bar.o), h: px(bar.h), l: px(bar.l), c: px(bar.c), v: bar.v }));
      if (picked && byIndex[picked] && !byIndex[picked].dash) {
        var rel = window.STAR_A3.relate(pivots, byIndex[picked]);
        ask.hidden = false;
        var askText = rel.prev
          ? t(byIndex[picked].k === 'H' ? 'star.a3.askHigh' : 'star.a3.askLow')
          : t(byIndex[picked].k === 'H' ? 'star.a3.askFirstHigh' : 'star.a3.askFirstLow');
        ask.innerHTML = '<p class="a2-window">' + askText + '</p>' +
          '<button type="button" data-judge="up">' + t('star.a3.higher') + '</button>' +
          '<button type="button" data-judge="down">' + t('star.a3.lower') + '</button>' +
          '<button type="button" data-judge="first">' + t('star.a3.unsure') + '</button>';
      } else ask.hidden = true;
    }
    function setKey(next) { key = next; shown = null; focus = 0; picked = null; draw(); }
    root.addEventListener('click', function (event) {
      var setBtn = event.target.closest('[data-set]');
      if (setBtn) { setKey(setBtn.getAttribute('data-set')); return; }
      var step = event.target.closest('[data-step]');
      if (step) {
        var bars = packs[key].bars;
        var cur = shown == null ? bars.length : shown;
        var kind = step.getAttribute('data-step');
        if (kind === 'play') shown = 5;
        if (kind === 'prev') shown = Math.max(5, cur - 1);
        if (kind === 'next') shown = Math.min(bars.length, cur + 1);
        if (kind === 'all') shown = null;
        if (shown != null && focus >= shown) focus = shown - 1;
        picked = null;
        draw();
        return;
      }
      var judge = event.target.closest('[data-judge]');
      if (judge && picked != null) {
        var full = packs[key].bars;
        var n = shown == null ? full.length : shown;
        var pivots = window.STAR_A3.confirmed(full, n);
        var point = null;
        pivots.forEach(function (item) { if (item.i === picked) point = item; });
        if (!point) return;
        var rel = window.STAR_A3.relate(pivots, point);
        var want = rel.prev ? rel.dir : 'first';
        var right = judge.getAttribute('data-judge') === want;
        var fact;
        if (!rel.prev) fact = t(point.k === 'H' ? 'star.a3.askFirstHigh' : 'star.a3.askFirstLow');
        else {
          var cmp = rel.dir === 'up' ? t('star.a3.cmpUp') : t('star.a3.cmpDown');
          var bits = { prev: px(rel.prev.p), cur: px(point.p), cmp: cmp };
          var keyName = (right ? 'star.a3.right' : 'star.a3.wrong') + (point.k === 'H' ? 'High' : 'Low');
          fact = t(keyName, bits);
        }
        paintAnswer(live, right, t(right ? 'star.quizOk' : 'star.quizNo'), fact);
        return;
      }
      var candle = event.target.closest('#a3-scroll [data-i]');
      if (!candle) return;
      focus = Number(candle.getAttribute('data-i'));
      var fullBars = packs[key].bars;
      var nShown = shown == null ? fullBars.length : shown;
      var marks = window.STAR_A3.confirmed(fullBars, nShown).concat(window.STAR_A3.provisional(fullBars, nShown));
      var mark = null;
      marks.forEach(function (item) { if (item.i === focus) mark = item; });
      if (mark && mark.dash) {
        picked = null;
        draw();
        setNote(live, t('star.a3.wait'));
        return;
      }
      picked = mark ? focus : null;
      draw();
    });
    scroll.addEventListener('keydown', function (event) {
      var bars = viewBars();
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        focus = event.key === 'ArrowRight' ? Math.min(bars.length - 1, focus + 1) : Math.max(0, focus - 1);
        picked = null;
        draw();
      } else if (event.key === 'Enter') {
        var node = scroll.querySelector('[data-i="' + focus + '"]');
        if (node) node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    draw();
  }

  function mountZones(root, lang, t) {
    var all = window.STAR_A4.bars();
    var support = window.STAR_A4.support;
    var resist = window.STAR_A4.resist;
    var mode = 'support';
    var showRef = false;
    var shown = null;
    var START_A = 102;
    var START_B = 110;
    var edgeA = START_A;
    var edgeB = START_B;
    var drag = null;
    var focus = 0;
    var activeEdge = 'a';
    var hinted = false;
    var swallowClick = false;
    var motionOk = !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var scale = { min: 94, max: 116, padT: 16, priceH: 200, padL: 8, padR: 46, plot: 200 };
    function px(n) {
      var s = Number(n).toFixed(1);
      return s.replace(/\.0$/, '');
    }
    function when(start) {
      var hours = start / 60;
      var day = Math.floor(hours / 24) + 1;
      var h = hours % 24;
      return t('star.a3.clock', { d: day, h: (h < 10 ? '0' : '') + h });
    }
    function yPrice(price) {
      return scale.padT + (scale.max - price) / (scale.max - scale.min) * scale.priceH;
    }
    function priceFromY(y) {
      return scale.max - (y - scale.padT) / scale.priceH * (scale.max - scale.min);
    }
    function steps(keys) {
      return keys.map(function (key) { return '<li>' + noteHtml(t(key)) + '</li>'; }).join('');
    }
    root.innerHTML =
      '<div class="a2">' + simFlag(t) +
      '<section class="a4-how"><h3>' + noteEsc(t('star.a4.howTitle')) + '</h3><ol>' +
      steps(['star.a4.how1', 'star.a4.how2', 'star.a4.how3', 'star.a4.how4', 'star.a4.how5']) +
      '</ol><div class="a1-note">' + noteHtml(t('star.a4.sample')) + '</div><div class="a4-sample" id="a4-sample"></div></section>' +
      '<div class="a1-note">' + noteHtml(t('star.a4.when')) + '</div>' +
      '<ol class="a4-steps">' + steps(['star.a4.do1', 'star.a4.do2', 'star.a4.do3']) + '</ol>' +
      '<div class="a4-chartwrap">' +
      '<p class="a4-coach" id="a4-coach">' + noteEsc(t('star.a4.coach')) + '</p>' +
      '<div class="a2-scroll" id="a4-scroll" tabindex="0" role="group" aria-label="' + noteEsc(t('star.a4.do1')) + '" style="touch-action:none"></div>' +
      '</div>' +
      '<div class="a1-modes a4-bar" role="group">' +
      '<button type="button" data-zone="support" aria-pressed="true">' + t('star.a4.support') + '</button>' +
      '<button type="button" data-zone="resist" aria-pressed="false">' + t('star.a4.resist') + '</button>' +
      '<button type="button" data-reset="1">' + t('star.a4.reset') + '</button>' +
      '<button type="button" data-ref="1" aria-pressed="false">' + t('star.a4.ref') + '</button>' +
      '<button type="button" data-step="play">' + t('star.a3.play') + '</button>' +
      '<button type="button" data-step="next">' + t('star.a3.next') + '</button>' +
      '<button type="button" data-step="all">' + t('star.a3.allBars') + '</button>' +
      '<button type="button" data-check="1">' + t('star.a4.check') + '</button>' +
      '</div>' +
      '<div class="a1-live a2-readout" id="a4-live" aria-live="polite"></div>' +
      '<div class="a1-note a2-legend">' + noteHtml(t('star.a4.legend')) + '</div></div>';
    var scroll = root.querySelector('#a4-scroll');
    var live = root.querySelector('#a4-live');
    function visible() {
      var n = shown == null ? all.length : Math.max(3, Math.min(all.length, shown));
      return all.slice(0, n);
    }
    function draw() {
      var bars = visible();
      var focused = scroll.querySelector(':focus');
      var focusEdge = focused && focused.getAttribute && focused.getAttribute('data-edge');
      var focusBand = focused && focused.hasAttribute && focused.hasAttribute('data-band');
      root.querySelectorAll('[data-zone]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-zone') === mode ? 'true' : 'false');
      });
      root.querySelector('[data-ref]').setAttribute('aria-pressed', showRef ? 'true' : 'false');
      var hostW = scroll.clientWidth || root.clientWidth || 320;
      var slot = Math.max(16, Math.min(48, (hostW - 62) / bars.length));
      var minP = 94;
      var maxP = 116;
      scale.min = minP;
      scale.max = maxP;
      var padL = scale.padL;
      var padR = scale.padR;
      var padT = scale.padT;
      var priceH = scale.priceH;
      var plot = bars.length * slot;
      scale.plot = plot;
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + 18;
      var bits = [];
      for (var g = 0; g < 4; g++) {
        var price = minP + (maxP - minP) * (g / 3);
        var gy = yPrice(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (padL + plot) + '" y2="' + gy + '" stroke="rgba(230,199,158,.2)"></line>');
        bits.push('<text x="' + (padL + plot + 4) + '" y="' + (gy + 4) + '" fill="#d4bc9e" font-size="11">' + px(price) + '</text>');
      }
      function band(ref, cls) {
        var y1 = yPrice(ref.hi);
        var y2 = yPrice(ref.lo);
        bits.push('<rect class="' + cls + '" x="' + padL + '" y="' + y1 + '" width="' + plot + '" height="' + Math.max(0, y2 - y1) + '"></rect>');
      }
      if (showRef) {
        band(support, 'a4-ref a4-sup');
        band(resist, 'a4-ref a4-res');
      }
      var mine = window.STAR_A4.zone(edgeA, edgeB);
      band(mine, 'a4-user');
      bars.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(4, slot * 0.58);
        var top = Math.min(yPrice(bar.o), yPrice(bar.c));
        var bh = Math.max(1.5, Math.abs(yPrice(bar.c) - yPrice(bar.o)));
        bits.push('<g data-i="' + i + '" role="button" tabindex="-1" aria-label="' + when(bar.start) + '">');
        bits.push('<rect x="' + x + '" y="' + padT + '" width="' + slot + '" height="' + priceH + '" fill="transparent"></rect>');
        bits.push('<line x1="' + xc + '" y1="' + yPrice(bar.h) + '" x2="' + xc + '" y2="' + yPrice(bar.l) + '" stroke="' + color + '" stroke-width="1.4"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"></rect>');
        bits.push('<text x="' + xc + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + (i + 1) + '</text>');
        bits.push('</g>');
      });
      var topY = yPrice(Math.max(edgeA, edgeB));
      var botY = yPrice(Math.min(edgeA, edgeB));
      if (botY - topY >= 52) {
        var bw = 44;
        var bx = padL + plot / 2 - bw / 2;
        var mid = (topY + botY) / 2;
        bits.push('<g data-band="1" tabindex="0" role="slider" aria-label="' + noteEsc(t('star.a4.band')) + '">');
        bits.push('<rect class="a4-grip" x="' + bx + '" y="' + (mid - bw / 2) + '" width="' + bw + '" height="' + bw + '" rx="12"></rect>');
        bits.push('<text class="a4-grip-ico" x="' + (bx + bw / 2) + '" y="' + (mid + 6) + '" text-anchor="middle">↕</text>');
        bits.push('<rect class="a4-hit" x="' + bx + '" y="' + (mid - bw / 2) + '" width="' + bw + '" height="' + bw + '" fill="transparent"></rect>');
        bits.push('</g>');
      }
      [[edgeA, 'a'], [edgeB, 'b']].forEach(function (pair) {
        var price = pair[0];
        var id = pair[1];
        var y = yPrice(price);
        var upper = edgeA === edgeB ? id === 'b' : price === Math.max(edgeA, edgeB);
        var name = upper ? t('star.a4.edgeHigh') : t('star.a4.edgeLow');
        var grip = 44;
        var gx = padL + 4;
        var label = px(price);
        var labelW = Math.max(44, 16 + label.length * 8);
        var lx = padL + plot - labelW - 8;
        bits.push('<g data-edge="' + id + '" tabindex="0" role="slider" aria-valuemin="94" aria-valuemax="116" aria-valuenow="' + label + '" aria-label="' + noteEsc(name + ' ' + label) + '">');
        bits.push('<line class="a4-edge' + (hinted ? '' : ' a4-hot') + '" x1="' + padL + '" y1="' + y + '" x2="' + (padL + plot) + '" y2="' + y + '"></line>');
        bits.push('<rect class="a4-grip" x="' + gx + '" y="' + (y - grip / 2) + '" width="' + grip + '" height="' + grip + '" rx="12"></rect>');
        [-1, 0, 1].forEach(function (d) {
          bits.push('<circle class="a4-dot" cx="' + (gx + 14) + '" cy="' + (y + d * 7) + '" r="1.7"></circle>');
        });
        bits.push('<text class="a4-grip-ico" x="' + (gx + 30) + '" y="' + (y + 6) + '" text-anchor="middle">↕</text>');
        bits.push('<rect class="a4-tag" x="' + lx + '" y="' + (y - 12) + '" width="' + labelW + '" height="24" rx="7"></rect>');
        bits.push('<text class="a4-tag-txt" x="' + (lx + labelW / 2) + '" y="' + (y + 5) + '" text-anchor="middle">' + label + '</text>');
        if (!hinted && motionOk && upper) {
          bits.push('<g pointer-events="none"><text class="a4-grip-ico" x="' + (gx + grip + 18) + '" y="' + (y + 6) + '">↕</text>');
          bits.push('<animateTransform attributeName="transform" type="translate" values="0 0; 0 16; 0 -12; 0 0" dur="1.4s" repeatCount="4"/></g>');
        }
        bits.push('<rect class="a4-hit" x="' + padL + '" y="' + (y - 10) + '" width="' + plot + '" height="20" fill="transparent"></rect>');
        bits.push('<rect class="a4-hit a4-grip-hit" x="' + gx + '" y="' + (y - grip / 2) + '" width="' + grip + '" height="' + grip + '" fill="transparent"></rect>');
        bits.push('<rect class="a4-hit" x="' + lx + '" y="' + (y - 22) + '" width="' + labelW + '" height="44" fill="transparent"></rect>');
        bits.push('</g>');
      });
      var widthAttr = svgW < hostW - 1 ? '100%' : svgW + 'px';
      scroll.innerHTML = '<svg class="a2-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:' + widthAttr + ';touch-action:none" role="img">' + bits.join('') + '</svg>';
      var placed = window.STAR_A4.zone(edgeA, edgeB);
      scroll.dataset.lo = String(placed.lo);
      scroll.dataset.hi = String(placed.hi);
      if (focusEdge) {
        var again = scroll.querySelector('[data-edge="' + focusEdge + '"]');
        if (again) again.focus();
      } else if (focusBand) {
        var bandEl = scroll.querySelector('[data-band]');
        if (bandEl) bandEl.focus();
      }
    }
    function describe(bar) {
      return t('star.a4.candle', { n: bar.i + 1, o: px(bar.o), h: px(bar.h), l: px(bar.l), c: px(bar.c) });
    }
    function touchInfo(band, kind) {
      var vals = [];
      visible().forEach(function (bar) {
        var p = kind === 'support' ? bar.l : bar.h;
        if (p + 1e-9 >= band.lo && p - 1e-9 <= band.hi) vals.push(px(p));
      });
      var uniq = [];
      vals.forEach(function (p) { if (uniq.indexOf(p) < 0) uniq.push(p); });
      return { n: vals.length, list: uniq.join(lang === 'en' ? ', ' : '、') };
    }
    function checkZone() {
      var ref = mode === 'support' ? support : resist;
      var band = window.STAR_A4.zone(edgeA, edgeB);
      var ok = window.STAR_A4.reasonable(edgeA, edgeB, ref);
      var mine = touchInfo(band, mode);
      var refTouch = touchInfo(ref, mode);
      var bits = {
        lo: px(band.lo), hi: px(band.hi), n: mine.n, mine: mine.list || '—',
        kind: t(mode === 'support' ? 'star.a4.kindDown' : 'star.a4.kindUp'),
        w: px(band.hi - band.lo), list: refTouch.list || '—', refN: refTouch.n,
        refLo: px(ref.lo), refHi: px(ref.hi)
      };
      var lines = [mine.n ? t('star.a4.span', bits) : t('star.a4.spanNone', bits)];
      if (!ok) {
        var width = band.hi - band.lo;
        if (width < 1.5) lines.push(t('star.a4.badThin', bits));
        else if (width > 8) lines.push(t('star.a4.badWide', bits));
        else lines.push(t('star.a4.badWhere', bits));
        lines.push(t(mode === 'support' ? 'star.a4.refSupport' : 'star.a4.refResist', bits));
        lines.push(t('star.a4.revealAsk'));
      } else lines.push(t('star.a4.okRest'));
      paintAnswer(live, ok, t(ok ? 'star.practiceOk' : 'star.quizNo'), lines.join(''));
      if (!ok) live.insertAdjacentHTML('beforeend', '<p><button type="button" class="a4-reveal" data-reveal="1">' + noteEsc(t('star.a4.reveal')) + '</button></p>');
    }
    function clamp(price) {
      return Math.max(94, Math.min(116, Math.round(price * 2) / 2));
    }
    function moveEdge(which, price) {
      price = clamp(price);
      if (which === 'a') {
        if (price === edgeA) return;
        edgeA = price;
      } else {
        if (price === edgeB) return;
        edgeB = price;
      }
      activeEdge = which;
      draw();
    }
    function moveBand(a, b) {
      var aIsLow = drag && drag.baseA != null ? drag.baseA <= drag.baseB : edgeA <= edgeB;
      var lo = Math.min(a, b);
      var hi = Math.max(a, b);
      var width = hi - lo;
      if (lo < 94) { lo = 94; hi = 94 + width; }
      if (hi > 116) { hi = 116; lo = 116 - width; }
      if (lo < 94) lo = 94;
      var nextLo = clamp(lo);
      var nextHi = clamp(hi);
      if (nextHi < nextLo) nextHi = nextLo;
      var nextA = aIsLow ? nextLo : nextHi;
      var nextB = aIsLow ? nextHi : nextLo;
      if (nextA === edgeA && nextB === edgeB) return;
      edgeA = nextA;
      edgeB = nextB;
      draw();
    }
    function pickDrag(pt) {
      var yA = yPrice(edgeA);
      var yB = yPrice(edgeB);
      var grip = 44;
      var gx = scale.padL + 4;
      function inRect(x, y, w, h) {
        return pt.x >= x && pt.x <= x + w && pt.y >= y && pt.y <= y + h;
      }
      function gripOf(y) { return inRect(gx, y - grip / 2, grip, grip); }
      if (gripOf(yA) || gripOf(yB)) {
        if (gripOf(yA) && gripOf(yB)) return Math.abs(pt.y - yA) <= Math.abs(pt.y - yB) ? 'a' : 'b';
        return gripOf(yA) ? 'a' : 'b';
      }
      function tagOf(y, price) {
        var labelW = Math.max(44, 16 + px(price).length * 8);
        var lx = scale.padL + scale.plot - labelW - 8;
        return inRect(lx, y - 22, labelW, 44);
      }
      if (tagOf(yA, edgeA) || tagOf(yB, edgeB)) {
        if (tagOf(yA, edgeA) && tagOf(yB, edgeB)) return Math.abs(pt.y - yA) <= Math.abs(pt.y - yB) ? 'a' : 'b';
        return tagOf(yA, edgeA) ? 'a' : 'b';
      }
      var top = Math.min(yA, yB);
      var bot = Math.max(yA, yB);
      if (bot - top >= 52) {
        var bw = 44;
        var bx = scale.padL + scale.plot / 2 - bw / 2;
        if (inRect(bx, (top + bot) / 2 - bw / 2, bw, bw)) return 'band';
      }
      var tol = 18;
      if (pt.x >= scale.padL && pt.x <= scale.padL + scale.plot) {
        var da = Math.abs(pt.y - yA);
        var db = Math.abs(pt.y - yB);
        if (da <= tol || db <= tol) return da <= db ? 'a' : 'b';
        if (pt.y > top + tol && pt.y < bot - tol) return 'band';
      }
      return null;
    }
    function clientToSvg(event) {
      var svg = scroll.querySelector('svg');
      if (!svg) return null;
      var rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      var vb = svg.viewBox.baseVal;
      return {
        x: ((event.clientX - rect.left) / rect.width) * vb.width,
        y: ((event.clientY - rect.top) / rect.height) * vb.height
      };
    }
    function onMove(event) {
      if (!drag) return;
      var pt = clientToSvg(event);
      if (!pt) return;
      var price = priceFromY(pt.y);
      if (Math.abs(price - drag.origin) > 0.05) swallowClick = true;
      if (drag.kind === 'band') moveBand(drag.baseA + (price - drag.origin), drag.baseB + (price - drag.origin));
      else moveEdge(drag.kind, price);
      event.preventDefault();
    }
    function onUp() {
      var was = drag;
      drag = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      if (was) draw();
      setTimeout(function () { swallowClick = false; }, 0);
    }
    function onDown(event) {
      if (event.button != null && event.button !== 0) return;
      var pt = clientToSvg(event);
      if (!pt) return;
      var which = pickDrag(pt);
      if (!which) return;
      swallowClick = false;
      hinted = true;
      var coach = root.querySelector('#a4-coach');
      if (coach) coach.classList.add('is-done');
      drag = { kind: which, origin: priceFromY(pt.y), baseA: edgeA, baseB: edgeB };
      scroll.dataset.pointer = event.pointerType || 'mouse';
      try { scroll.setPointerCapture(event.pointerId); } catch (err) { /* window listeners still track the drag */ }
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      event.preventDefault();
    }
    function drawSample() {
      var host = root.querySelector('#a4-sample');
      var minP = 94;
      var maxP = 116;
      var padL = 8;
      var padR = 36;
      var padT = 22;
      var priceH = 140;
      var slot = 28;
      var plot = all.length * slot;
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + 8;
      function y(price) { return padT + (maxP - price) / (maxP - minP) * priceH; }
      var bits = [];
      var yHi = y(support.hi);
      var yLo = y(support.lo);
      bits.push('<rect x="' + padL + '" y="' + yHi + '" width="' + plot + '" height="' + (yLo - yHi) + '" fill="rgba(125,206,160,.35)"></rect>');
      var marks = { 2: '①', 6: '②', 7: '③' };
      all.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(4, slot * 0.55);
        var top = Math.min(y(bar.o), y(bar.c));
        var bh = Math.max(1.5, Math.abs(y(bar.c) - y(bar.o)));
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.4"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"></rect>');
        if (marks[i]) bits.push('<text class="a4-mark" x="' + xc + '" y="' + (y(bar.h) - 6) + '" text-anchor="middle">' + marks[i] + '</text>');
      });
      bits.push('<text x="' + (padL + plot + 4) + '" y="' + (y(102) + 4) + '" fill="#d4bc9e" font-size="11">102</text>');
      bits.push('<text x="' + (padL + plot + 4) + '" y="' + (y(98) + 4) + '" fill="#d4bc9e" font-size="11">98</text>');
      host.innerHTML = '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" role="img" aria-hidden="true">' + bits.join('') + '</svg>';
    }
    root.addEventListener('click', function (event) {
      if (swallowClick && event.target.closest('#a4-scroll')) { swallowClick = false; return; }
      swallowClick = false;
      var zoneBtn = event.target.closest('[data-zone]');
      if (zoneBtn) {
        mode = zoneBtn.getAttribute('data-zone');
        draw();
        setNote(live, t(mode === 'support' ? 'star.a4.modeSupport' : 'star.a4.modeResist'));
        return;
      }
      if (event.target.closest('[data-reset]')) {
        edgeA = START_A;
        edgeB = START_B;
        showRef = false;
        hinted = false;
        var coach = root.querySelector('#a4-coach');
        if (coach) coach.classList.remove('is-done');
        draw();
        setNote(live, t('star.a4.hint'));
        return;
      }
      var refBtn = event.target.closest('[data-ref]');
      if (refBtn) { showRef = !showRef; draw(); return; }
      if (event.target.closest('[data-reveal]')) { showRef = true; draw(); return; }
      var step = event.target.closest('[data-step]');
      if (step) {
        var cur = shown == null ? all.length : shown;
        var kind = step.getAttribute('data-step');
        if (kind === 'play') shown = 4;
        if (kind === 'next') shown = Math.min(all.length, cur + 1);
        if (kind === 'all') shown = null;
        draw();
        return;
      }
      if (event.target.closest('[data-check]')) { checkZone(); return; }
      var candle = event.target.closest('#a4-scroll [data-i]');
      if (candle && !event.target.closest('[data-edge]') && !event.target.closest('[data-band]')) {
        focus = Number(candle.getAttribute('data-i'));
        setNote(live, describe(all[focus]));
      }
    });
    scroll.addEventListener('pointerdown', onDown, { passive: false });
    scroll.addEventListener('touchstart', function (event) {
      var touch = event.changedTouches && event.changedTouches[0];
      if (!touch) return;
      var pt = clientToSvg({ clientX: touch.clientX, clientY: touch.clientY });
      if (pt && pickDrag(pt)) event.preventDefault();
    }, { passive: false });
    scroll.addEventListener('keydown', function (event) {
      var bandKey = event.target.closest && event.target.closest('[data-band]');
      var edgeKey = event.target.closest && event.target.closest('[data-edge]');
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        activeEdge = activeEdge === 'a' ? 'b' : 'a';
        var node = scroll.querySelector('[data-edge="' + activeEdge + '"]');
        if (node) node.focus();
        return;
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        var delta = event.key === 'ArrowUp' ? 0.5 : -0.5;
        if (bandKey) {
          var prev = drag;
          drag = { baseA: edgeA, baseB: edgeB };
          moveBand(edgeA + delta, edgeB + delta);
          drag = prev;
        } else {
          if (edgeKey) activeEdge = edgeKey.getAttribute('data-edge');
          moveEdge(activeEdge, (activeEdge === 'a' ? edgeA : edgeB) + delta);
        }
      } else if (event.key === 'Enter') {
        checkZone();
      }
    });
    drawSample();
    setNote(live, t('star.a4.hint'));
    draw();
    requestAnimationFrame(function () { if (document.body.contains(scroll)) draw(); });
    if (root._a4Resize) window.removeEventListener('resize', root._a4Resize);
    root._a4Resize = function () { if (document.body.contains(scroll)) draw(); };
    window.addEventListener('resize', root._a4Resize);
  }

  function mountBreaks(root, lang, t) {
    var branch = null;
    var shown = 8;
    var focus = 7;
    function px(n) { return String(n); }
    function when(start) {
      var hours = start / 60;
      var day = Math.floor(hours / 24) + 1;
      var h = hours % 24;
      return t('star.a3.clock', { d: day, h: (h < 10 ? '0' : '') + h });
    }
    root.innerHTML =
      '<div class="a2">' + simFlag(t) +
      '<div class="a1-note">' + proseLines(t('star.a5.guide'), noteEsc, ['；']) + '</div>' +
      '<div class="a3-scenarios" role="group">' +
      ['A', 'B', 'C'].map(function (id) {
        return '<button type="button" data-branch="' + id + '" aria-pressed="false">' + miniSpark(window.STAR_A5.series(id)) + '<span>' + t('star.a5.branch' + id) + '</span></button>';
      }).join('') +
      '</div>' +
      '<div class="a3-mid"><div class="a1-modes">' +
      '<button type="button" data-step="prev">' + t('star.a3.prev') + '</button>' +
      '<button type="button" data-step="next">' + t('star.a3.next') + '</button>' +
      '</div></div>' +
      '<div class="a2-scroll" id="a5-scroll" tabindex="0" role="group" aria-label="' + t('star.a5.rule') + '"></div>' +
      '<div class="a1-live a2-readout" id="a5-live" aria-live="polite"></div>' +
      '<div class="a1-modes" id="a5-ask">' +
      '<button type="button" data-mark="inside">' + t('star.a5.inside') + '</button>' +
      '<button type="button" data-mark="wick">' + t('star.a5.wick') + '</button>' +
      '<button type="button" data-mark="close">' + t('star.a5.close') + '</button>' +
      '</div>' +
      '<div class="a1-note a2-legend">' + noteHtml(t('star.a2.legend')) + '</div></div>';
    var scroll = root.querySelector('#a5-scroll');
    var live = root.querySelector('#a5-live');
    function full() { return window.STAR_A5.series(branch); }
    function draw() {
      var bars = full();
      var maxN = bars.length;
      if (shown > maxN) shown = maxN;
      if (shown < 1) shown = 1;
      if (focus >= shown) focus = shown - 1;
      root.querySelectorAll('[data-branch]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-branch') === branch ? 'true' : 'false');
      });
      var view = bars.slice(0, shown);
      var hostW = scroll.clientWidth || root.clientWidth || 320;
      var slot = Math.max(18, Math.min(56, (hostW - 62) / Math.max(view.length, 8)));
      var minP = 96;
      var maxP = 120;
      var padL = 8;
      var padR = 46;
      var padT = 16;
      var priceH = 200;
      var volH = 42;
      var plot = Math.max(view.length, 8) * slot;
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + 8 + volH + 20;
      function yPrice(price) { return padT + (maxP - price) / (maxP - minP) * priceH; }
      var maxV = 1;
      view.forEach(function (bar) { if (bar.v > maxV) maxV = bar.v; });
      var volTop = padT + priceH + 8;
      var bits = [];
      [100, 105, 110, 111, 116].forEach(function (price) {
        var gy = yPrice(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (padL + plot) + '" y2="' + gy + '" stroke="' + (price === 111 ? 'rgba(230,199,158,.7)' : 'rgba(230,199,158,.2)') + '"></line>');
        bits.push('<text x="' + (padL + plot + 4) + '" y="' + (gy + 4) + '" fill="#d4bc9e" font-size="11">' + price + '</text>');
      });
      var yTop = yPrice(110);
      var yBot = yPrice(100);
      bits.push('<rect x="' + padL + '" y="' + yTop + '" width="' + plot + '" height="' + (yBot - yTop) + '" fill="rgba(230,199,158,.16)"></rect>');
      view.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(5, slot * 0.56);
        var top = Math.min(yPrice(bar.o), yPrice(bar.c));
        var bh = Math.max(1.5, Math.abs(yPrice(bar.c) - yPrice(bar.o)));
        bits.push('<g data-i="' + i + '" role="button" tabindex="-1" aria-label="' + (i + 1) + '">');
        bits.push('<rect x="' + x + '" y="' + padT + '" width="' + slot + '" height="' + priceH + '" fill="transparent"></rect>');
        bits.push('<line x1="' + xc + '" y1="' + yPrice(bar.h) + '" x2="' + xc + '" y2="' + yPrice(bar.l) + '" stroke="' + color + '" stroke-width="1.4"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"' + (focus === i ? ' stroke="#e6c79e" stroke-width="2"' : '') + '></rect>');
        var yv = volTop + volH - (bar.v / maxV) * (volH - 4);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + yv + '" width="' + bw + '" height="' + (volTop + volH - yv) + '" fill="' + color + '" opacity="0.85"></rect>');
        bits.push('<text x="' + xc + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + (i + 1) + '</text>');
        bits.push('</g>');
      });
      bits.push('<text x="' + padL + '" y="' + (volTop + 11) + '" fill="#b7aac8" font-size="10">' + t('star.a2.vol') + '</text>');
      var zoneName = t('star.a5.zone');
      var zoneW = Math.max(58, 18 + zoneName.length * (lang === 'en' ? 8 : 14));
      var zx = padL + 8;
      var zy = (yTop + yBot) / 2;
      bits.push('<g pointer-events="none">');
      bits.push('<rect x="' + zx + '" y="' + (zy - 12) + '" width="' + zoneW + '" height="24" rx="7" fill="#1b1428" stroke="#e6c79e"></rect>');
      bits.push('<text x="' + (zx + zoneW / 2) + '" y="' + (zy + 5) + '" text-anchor="middle" fill="#f0d59a" font-size="13" font-weight="700">' + noteEsc(zoneName) + '</text>');
      bits.push('</g>');
      var widthAttr = svgW < hostW - 1 ? '100%' : svgW + 'px';
      scroll.innerHTML = '<svg class="a2-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:' + widthAttr + '" role="img">' + bits.join('') + '</svg>';
      var bar = view[focus];
      setNote(live, t('star.a5.readout', { n: bar.i + 1, h: px(bar.h), c: px(bar.c) }));
    }
    root.addEventListener('click', function (event) {
      var branchBtn = event.target.closest('[data-branch]');
      if (branchBtn) {
        branch = branchBtn.getAttribute('data-branch');
        shown = Math.min(9, fullWait());
        focus = shown - 1;
        draw();
        return;
      }
      var step = event.target.closest('[data-step]');
      if (step) {
        var maxN = window.STAR_A5.series(branch).length;
        if (step.getAttribute('data-step') === 'next') shown = Math.min(maxN, shown + 1);
        else shown = Math.max(1, shown - 1);
        focus = shown - 1;
        draw();
        return;
      }
      var mark = event.target.closest('[data-mark]');
      if (mark) {
        var bar = window.STAR_A5.series(branch)[focus];
        var want = window.STAR_A5.kind(bar);
        var right = mark.getAttribute('data-mark') === want;
        paintAnswer(live, right, t(right ? 'star.quizOk' : 'star.quizNo'), t('star.a5.fact' + (want === 'close' ? 'Close' : want === 'wick' ? 'Wick' : 'Inside')));
        return;
      }
      var candle = event.target.closest('#a5-scroll [data-i]');
      if (candle) { focus = Number(candle.getAttribute('data-i')); draw(); }
    });
    function fullWait() { return window.STAR_A5.series(branch).length; }
    scroll.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      focus = event.key === 'ArrowRight' ? Math.min(shown - 1, focus + 1) : Math.max(0, focus - 1);
      draw();
    });
    draw();
  }

  function mountVolume(root, lang, t) {
    var bars = window.STAR_A6.bars();
    var focus = 5;
    var quad = null;
    function tagOf(i) {
      return window.STAR_A6.compare(bars[i], i ? bars[i - 1] : null).tag;
    }
    root.innerHTML =
      '<div class="a2">' + simFlag(t) +
      '<div class="a1-note">' + noteHtml(t('star.a6.rule')) + '</div>' +
      '<div class="a1-note">' + noteHtml(t('star.a6.when')) + '</div>' +
      '<div class="a1-modes" role="group">' +
      ['upMore', 'upLess', 'downMore', 'downLess'].map(function (id) {
        return '<button type="button" data-quad="' + id + '" aria-pressed="false">' + t('star.a6.' + id) + '</button>';
      }).join('') +
      '</div>' +
      '<div class="a2-scroll" id="a6-scroll" tabindex="0" role="group" aria-label="' + t('star.a6.rule') + '"></div>' +
      '<div class="a1-live a2-readout" id="a6-live" aria-live="polite"></div>' +
      '<div class="a1-note a2-legend">' + noteHtml(t('star.a2.legend')) + '</div></div>';
    var scroll = root.querySelector('#a6-scroll');
    var live = root.querySelector('#a6-live');
    function draw() {
      root.querySelectorAll('[data-quad]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-quad') === quad ? 'true' : 'false');
      });
      var hostW = scroll.clientWidth || root.clientWidth || 320;
      var hostW = scroll.clientWidth || root.clientWidth || 320;
      var slot = Math.max(28, Math.min(72, (hostW - 64) / bars.length));
      var minP = 96;
      var maxP = 116;
      var padL = 8;
      var padR = 52;
      var padT = 12;
      var priceH = 168;
      var volH = 72;
      var plot = bars.length * slot;
      var svgW = padL + plot + padR;
      var svgH = padT + priceH + 10 + volH + 22;
      function yPrice(price) { return padT + (maxP - price) / (maxP - minP) * priceH; }
      var maxV = 210;
      var volTop = padT + priceH + 10;
      var bits = [];
      [100, 105, 110, 115].forEach(function (price) {
        var gy = yPrice(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (padL + plot) + '" y2="' + gy + '" stroke="rgba(230,199,158,.2)"></line>');
        bits.push('<text x="' + (padL + plot + 4) + '" y="' + (gy + 4) + '" fill="#d4bc9e" font-size="11">' + price + '</text>');
      });
      [80, 140, 210].forEach(function (vol) {
        var gy = volTop + volH - (vol / maxV) * (volH - 8);
        bits.push('<text x="' + (padL + plot + 4) + '" y="' + (gy + 4) + '" fill="#b7aac8" font-size="11">' + vol + '</text>');
      });
      bars.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var dim = quad && tagOf(i) !== quad;
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(8, slot * 0.56);
        var top = Math.min(yPrice(bar.o), yPrice(bar.c));
        var bh = Math.max(2, Math.abs(yPrice(bar.c) - yPrice(bar.o)));
        var on = focus === i;
        bits.push('<g data-i="' + i + '" role="button" tabindex="-1" opacity="' + (dim ? '0.28' : '1') + '" aria-label="' + (i + 1) + '">');
        bits.push('<rect x="' + x + '" y="' + padT + '" width="' + slot + '" height="' + (priceH + 10 + volH) + '" fill="transparent"></rect>');
        bits.push('<line x1="' + xc + '" y1="' + yPrice(bar.h) + '" x2="' + xc + '" y2="' + yPrice(bar.l) + '" stroke="' + color + '" stroke-width="1.6"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + top + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"' + (on ? ' stroke="#e6c79e" stroke-width="2.5"' : '') + '></rect>');
        var yv = volTop + volH - (bar.v / maxV) * (volH - 8);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + yv + '" width="' + bw + '" height="' + Math.max(2, volTop + volH - yv) + '" fill="' + color + '"' + (on ? ' stroke="#e6c79e" stroke-width="2.5"' : '') + '></rect>');
        bits.push('<text x="' + xc + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="#b7aac8" font-size="10">' + (i + 1) + '</text>');
        bits.push('</g>');
      });
      bits.push('<text x="' + padL + '" y="' + (volTop + 12) + '" fill="#b7aac8" font-size="10">' + t('star.a6.unit') + '</text>');
      var widthAttr = svgW < hostW - 1 ? '100%' : svgW + 'px';
      scroll.innerHTML = '<svg class="a2-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:' + widthAttr + '" role="img">' + bits.join('') + '</svg>';
      var bar = bars[focus];
      var prev = focus ? bars[focus - 1] : null;
      setNote(live, prev ? t('star.a6.readout', { n: focus + 1, o: bar.o, c: bar.c, v: bar.v, prev: prev.v, tag: t('star.a6.' + tagOf(focus)) }) : t('star.a6.first', { n: 1, o: bar.o, c: bar.c, v: bar.v }));
    }
    root.addEventListener('click', function (event) {
      var qbtn = event.target.closest('[data-quad]');
      if (qbtn) {
        var id = qbtn.getAttribute('data-quad');
        quad = quad === id ? null : id;
        draw();
        return;
      }
      var candle = event.target.closest('#a6-scroll [data-i]');
      if (candle) { focus = Number(candle.getAttribute('data-i')); draw(); }
    });
    scroll.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      focus = event.key === 'ArrowRight' ? Math.min(bars.length - 1, focus + 1) : Math.max(0, focus - 1);
      draw();
    });
    draw();
  }

  function proseLines(text, esc, breaks) {
    var cut = { '。': true };
    (breaks || []).forEach(function (ch) { cut[ch] = true; });
    if (cut['；']) cut[';'] = true;
    var parts = [];
    var buf = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      buf += ch;
      var end = !!cut[ch];
      if (!end && ch === '.') {
        var prev = i > 0 ? text.charAt(i - 1) : '';
        var next = i + 1 < text.length ? text.charAt(i + 1) : '';
        if (!(/\d/.test(prev) && /\d/.test(next)) && (next === '' || next === ' ' || next === '\n')) end = true;
      }
      if (end) {
        var piece = (ch === '\n' ? buf.slice(0, -1) : buf).replace(/^\s+|\s+$/g, '');
        if (piece) parts.push(piece);
        buf = '';
      }
    }
    if (buf.replace(/\s/g, '')) parts.push(buf);
    if (!parts.length) parts = [text];
    return '<div class="star-lines">' + parts.map(function (line) { return '<p>' + esc(line) + '</p>'; }).join('') + '</div>';
  }
  function noteEsc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function noteHtml(text) { return proseLines(text, noteEsc); }
  function plainLines(text) {
    var parts = String(text).split('\n').filter(function (line) { return line.replace(/\s/g, ''); });
    return '<div class="star-lines">' + parts.map(function (line) { return '<p>' + noteEsc(line) + '</p>'; }).join('') + '</div>';
  }
  function setNote(el, text) {
    el.classList.remove('is-right', 'is-wrong');
    el.innerHTML = noteHtml(text);
  }
  function paintAnswer(el, right, lead, rest) {
    rest = String(rest || '').replace(/^(答对了。|答错了。|Correct\.\s*|Right\.\s*|Wrong\.\s*|Not right\.\s*)/, '');
    el.classList.toggle('is-right', !!right);
    el.classList.toggle('is-wrong', !right);
    el.innerHTML = noteHtml(rest ? String(lead).replace(/\s*$/, ' ') + rest : String(lead));
  }

  function renderOverview(main, api) {
    var data = pack();
    var lang = api.lang;
    document.title = api.t('star.docTitle', { title: api.t('atlas.advanced.name') });
    main.innerHTML = '<div class="course-reader star-hub" style="--accent:#a28bf0;--planet-halo:#a28bf0;--planet-soft:rgba(162,139,240,.28)"><div class="shell">' +
      '<section class="hero"><div><div class="eyebrow">' + api.esc(api.t('reader.explore', { n: '07' })) + '</div><h1>' + api.t('atlas.advanced.name') + '</h1><p>' + api.esc(L(data.tagline, lang)) + '</p></div>' +
      '<div class="hero-planet" aria-hidden="true"><img alt="" draggable="false" src="assets/planets/advanced.png?v=20261107290000"></div></section>' +
      '<ul class="star-modules">' +
      data.modules.map(function (mod) {
        var open = mod.status === 'open';
        var note = mod.liveNote ? api.esc(L(mod.liveNote, lang)) : api.t(open ? 'star.moduleOpen' : 'star.soon');
        var inner = '<span class="star-mod-id">' + mod.id + '</span><strong>' + api.esc(L(mod.title, lang)) + '</strong><span>' + api.esc(L(mod.blurb, lang)) + '</span><em>' + note + '</em>';
        return '<li>' + (open ? '<a class="star-mod" href="#/star/' + mod.id + '">' + inner + '</a>' : '<div class="star-mod is-soon">' + inner + '</div>') + '</li>';
      }).join('') +
      '</ul><p class="star-tools"><a href="#/lab">' + api.t('star.labLink') + '</a></p></div></div>';
  }

  function renderChapter(main, api, chapterId) {
    var data = pack();
    var chapter = data.chapters[chapterId];
    if (!chapter) { location.hash = '#/star'; return; }
    var lang = api.lang;
    document.title = api.t('star.docTitle', { title: L(chapter.title, lang) });
    main.innerHTML = '<div class="star-page"><p class="star-crumb"><a href="#/">' + api.t('crumb.home') + '</a> / <a href="#/star">' + api.t('atlas.advanced.name') + '</a> / ' + api.esc(L(chapter.title, lang)) + '</p><h1>' + api.esc(L(chapter.title, lang)) + '</h1><ol class="star-lessons">' +
      chapter.lessons.map(function (lesson) {
        var live = lesson.status === 'live';
        var done = live && api.isDone('star-' + chapterId + '-' + lesson.id);
        var label = '<span class="star-les-id">' + chapterId + '-' + lesson.id + '</span><strong>' + api.esc(L(lesson.title, lang)) + '</strong><em>' + api.t(live ? (done ? 'star.done' : 'star.open') : 'star.soon') + '</em>';
        return '<li>' + (live ? '<a href="#/star/' + chapterId + '/' + lesson.id + '">' + label + '</a>' : '<div class="is-soon">' + label + '</div>') + '</li>';
      }).join('') +
      '</ol></div>';
  }

  function renderLesson(main, api, chapterId, lessonId) {
    var data = pack();
    var chapter = data.chapters[chapterId];
    var lesson = lessonById(chapter, lessonId);
    if (!chapter || !lesson || lesson.status !== 'live') { location.hash = '#/star/' + chapterId; return; }
    var lang = api.lang;
    document.title = api.t('star.docTitle', { title: L(lesson.title, lang) });
    var done = api.isDone('star-' + chapterId + '-' + lessonId);
    var lab = lesson.lab || {};
    var labHref = '#/lab?symbol=' + encodeURIComponent(lab.symbol || 'BTCUSDT') + '&interval=' + encodeURIComponent(lab.interval || '4h') + '&studies=' + encodeURIComponent(lab.studies || 'none');
    var next = null;
    var prev = null;
    chapter.lessons.forEach(function (item, index) {
      if (item.id === lessonId) {
        if (chapter.lessons[index + 1]) next = chapter.lessons[index + 1];
        if (index > 0) prev = chapter.lessons[index - 1];
      }
    });
    var sceneQ = lesson.scene ? api.esc(L(lesson.scene, lang)) : api.t('star.sceneQ');
    var practiceAsk = lesson.check ? api.esc(L(lesson.check.ask, lang)) : api.t('star.practiceAsk');
    var practiceButtons = lesson.check
      ? lesson.check.options.map(function (opt) {
        return '<button type="button" data-practice="' + opt.id + '" aria-pressed="false">' + opt.id + '. ' + api.esc(L(opt, lang)) + '</button>';
      }).join('')
      : '<button type="button" data-practice="A" aria-pressed="false">' + api.t('star.practiceA') + '</button>' +
        '<button type="button" data-practice="B" aria-pressed="false">' + api.t('star.practiceB') + '</button>' +
        '<button type="button" data-practice="C" aria-pressed="false">' + api.t('star.practiceC') + '</button>';
    var practiceAnswer = lesson.check ? lesson.check.answer : 'A';
    var practiceMiss = lesson.check && lesson.check.miss ? L(lesson.check.miss, lang) : api.t('star.practiceMiss');
    main.innerHTML =
      '<div class="course-reader star-page"><p class="star-crumb"><a href="#/">' + api.t('crumb.home') + '</a> / <a href="#/star">' + api.t('atlas.advanced.name') + '</a> / <a href="#/star/' + chapterId + '">' + api.esc(L(chapter.title, lang)) + '</a> / ' + chapterId + '-' + lessonId + '</p>' +
      '<article class="reading star-lesson"><p class="star-kicker">' + chapterId + '-' + lessonId + ' · ' + api.t('star.minutes', { n: minutes(lesson) }) + (done ? ' · ' + api.t('star.done') : '') + '</p>' +
      (api.listenBar ? api.listenBar() : '') +
      '<h2>' + api.esc(L(lesson.title, lang)) + '</h2>' +
      '<section class="star-scene"><img class="star-mascot" src="assets/img/footer-character.webp" alt=""><div><h3>' + sceneQ + '</h3><p class="star-one">' + api.esc(L(lesson.one, lang)) + '</p></div></section>' +
      '<section class="star-stage"><h3>' + api.t('star.watch') + '</h3><div id="star-chart"></div></section>' +
      '<section class="star-prose"><h3>' + api.t('star.define') + '</h3>' + proseLines(L(lesson.explain, lang), api.esc, ['；', '\n']) + '</section>' +
      '<section class="star-contrast"><h3>' + api.t('star.contrast') + '</h3>' + proseLines(L(lesson.example, lang), api.esc, ['；']) + '</section>' +
      '<section class="star-pit"><h3>' + api.t('star.pitfalls') + '</h3><ul>' + (lesson.pitfalls || []).map(function (item) { return '<li>' + api.esc(L(item, lang)) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="star-do"><h3>' + api.t('star.tryHands') + '</h3><p>' + practiceAsk + '</p><div class="star-quiz" role="group">' +
      practiceButtons +
      '</div><p class="star-feedback" id="practice-feedback" role="status"></p></section>' +
      '<section class="star-check"><h3>' + api.t('star.quiz') + '</h3>' + (lesson.quizzes ? lesson.quizzes.map(function (q, qi) {
        return '<div class="star-q" data-qi="' + qi + '"><p>' + (qi + 1) + '. ' + api.esc(L(q.q, lang)) + '</p><div class="star-quiz" role="group">' +
          q.options.map(function (opt) {
            return '<button type="button" data-qi="' + qi + '" data-choice="' + opt.id + '" aria-pressed="false">' + opt.id + '. ' + api.esc(L(opt, lang)) + '</button>';
          }).join('') +
          '</div><button type="button" class="star-submit" data-quiz-retry="' + qi + '" hidden>' + api.t('star.quizRetry') + '</button><p class="star-feedback" data-quiz-feedback="' + qi + '" role="status"></p></div>';
      }).join('') : '<div class="star-quiz" role="group" aria-labelledby="quiz-q"><p id="quiz-q">' + api.esc(L(lesson.quiz.q, lang)) + '</p>' +
      lesson.quiz.options.map(function (opt) {
        return '<button type="button" data-choice="' + opt.id + '" aria-pressed="false">' + opt.id + '. ' + api.esc(L(opt, lang)) + '</button>';
      }).join('') +
      '</div><button type="button" class="star-submit" id="quiz-retry" hidden>' + api.t('star.quizRetry') + '</button><p class="star-feedback" id="quiz-feedback" role="status"></p>') + '</section>' +
      '<section class="star-lab"><h3>' + api.t('star.verify') + '</h3><p>' + api.esc(L(lesson.practice, lang)) + '</p><a class="star-go" href="' + labHref + '">' + api.t('star.practiceGo') + '</a></section>' +
      '<div class="reading-footer">' +
      (prev && prev.status === 'live' ? '<a class="navbtn" href="#/star/' + chapterId + '/' + prev.id + '">' + api.t('star.prev') + '</a>' : '') +
      '<a class="navbtn" href="#/star/' + chapterId + '">' + api.t('star.back') + '</a>' +
      (next && next.status === 'live' ? '<a class="navbtn primary" href="#/star/' + chapterId + '/' + next.id + '">' + api.t('star.next') + '</a>' : '') +
      (next && next.status !== 'live' ? '<button type="button" class="navbtn" disabled>' + api.esc(L(next.title, lang)) + ' · ' + api.t('star.soon') + '</button>' : '') +
      '</div></article></div>';
    var chartHost = document.getElementById('star-chart');
    if (chartHost && lesson.chart === 'a1') mountChart(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a2') mountTimeframes(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a3') mountSwings(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a4') mountZones(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a5') mountBreaks(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a6') mountVolume(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'study' && window.STAR_STUDY) STAR_STUDY.mount(chartHost, lesson, lang, api.t);
    if (api.bindListen) api.bindListen();
    var mascot = main.querySelector('.star-mascot');
    var practiceFeedback = document.getElementById('practice-feedback');
    main.querySelectorAll('[data-practice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pick = btn.getAttribute('data-practice');
        var right = pick === practiceAnswer;
        main.querySelectorAll('[data-practice]').forEach(function (other) {
          var id = other.getAttribute('data-practice');
          other.setAttribute('aria-pressed', id === pick ? 'true' : 'false');
          other.classList.toggle('is-wrong', id === pick && !right);
          other.classList.toggle('is-right', right && id === practiceAnswer);
        });
        var missText = practiceMiss;
        if (!right && lesson.check && lesson.check.misses && lesson.check.misses[pick]) missText = L(lesson.check.misses[pick], lang);
        paintAnswer(practiceFeedback, right, api.t(right ? 'star.practiceOk' : 'star.quizNo'), right ? '' : missText);
      });
    });
    if (lesson.quizzes) {
      var solved = {};
      function markLesson() {
        var keys = Object.keys(solved);
        if (keys.length < lesson.quizzes.length) return;
        api.setDone('star-' + chapterId + '-' + lessonId);
        if (mascot) mascot.classList.add('is-right');
        var kick = main.querySelector('.star-kicker');
        if (kick && kick.textContent.indexOf(api.t('star.done')) < 0) kick.textContent += ' · ' + api.t('star.done');
      }
      main.querySelectorAll('[data-qi][data-choice]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var qi = btn.getAttribute('data-qi');
          var q = lesson.quizzes[Number(qi)];
          var pick = btn.getAttribute('data-choice');
          var right = pick === q.answer;
          var box = btn.closest('.star-q');
          box.querySelectorAll('[data-choice]').forEach(function (other) {
            var id = other.getAttribute('data-choice');
            other.setAttribute('aria-pressed', id === pick ? 'true' : 'false');
            other.classList.toggle('is-wrong', id === pick && !right);
            other.classList.toggle('is-right', right && id === q.answer);
          });
          var whyField = (q.whyFor && q.whyFor[pick]) ? q.whyFor[pick] : q.why;
          paintAnswer(box.querySelector('[data-quiz-feedback]'), right, api.t(right ? 'star.quizOk' : 'star.quizNo'), L(whyField, lang));
          box.querySelector('[data-quiz-retry]').hidden = false;
          if (right) { solved[qi] = true; markLesson(); }
        });
      });
      main.querySelectorAll('[data-quiz-retry]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var box = btn.closest('[data-qi]');
          var quizNote = box.querySelector('[data-quiz-feedback]');
          quizNote.textContent = '';
          quizNote.classList.remove('is-right', 'is-wrong');
          box.querySelectorAll('[data-choice]').forEach(function (other) {
            other.setAttribute('aria-pressed', 'false');
            other.classList.remove('is-right', 'is-wrong');
          });
          btn.hidden = true;
        });
      });
    } else {
    var quizFeedback = document.getElementById('quiz-feedback');
    var quizRetry = document.getElementById('quiz-retry');
    main.querySelectorAll('[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pick = btn.getAttribute('data-choice');
        var right = pick === lesson.quiz.answer;
        main.querySelectorAll('[data-choice]').forEach(function (other) {
          var id = other.getAttribute('data-choice');
          other.setAttribute('aria-pressed', id === pick ? 'true' : 'false');
          other.classList.toggle('is-wrong', id === pick && !right);
          other.classList.toggle('is-right', right && id === lesson.quiz.answer);
        });
        paintAnswer(quizFeedback, right, api.t(right ? 'star.quizOk' : 'star.quizNo'), L(lesson.quiz.why, lang));
        quizRetry.hidden = false;
        if (right) {
          api.setDone('star-' + chapterId + '-' + lessonId);
          if (mascot) mascot.classList.add('is-right');
          var kick = main.querySelector('.star-kicker');
          if (kick && kick.textContent.indexOf(api.t('star.done')) < 0) kick.textContent += ' · ' + api.t('star.done');
        }
      });
    });
    quizRetry.addEventListener('click', function () {
      quizFeedback.textContent = '';
      quizFeedback.classList.remove('is-right', 'is-wrong');
      main.querySelectorAll('[data-choice]').forEach(function (other) {
        other.setAttribute('aria-pressed', 'false');
        other.classList.remove('is-right', 'is-wrong');
      });
      this.hidden = true;
    });
    }
  }

  window.AdvancedStar = {
    render: function (main, api, chapterId, lessonId) {
      if (!pack()) { main.innerHTML = ''; return; }
      if (!chapterId) renderOverview(main, api);
      else if (!lessonId) renderChapter(main, api, chapterId);
      else renderLesson(main, api, chapterId, lessonId);
    }
  };
})();
