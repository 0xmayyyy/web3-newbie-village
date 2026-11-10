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
      '<p class="a1-flag">' + t('star.sim') + '</p>' +
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
      '<div class="a2"><p class="a1-flag">' + t('star.sim') + ' · ' + t('star.a2.disclaimer') + '</p>' +
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
      '<div class="a1-live" id="a2-live" aria-live="polite"></div>' +
      '<h4 class="a2-subhead" id="a2-subhead" hidden></h4>' +
      '<div class="a2-scroll" id="a2-child" hidden></div>' +
      '<div class="a1-note">' + noteHtml(t('star.a2.legend')) + '</div></div>';
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

  function proseLines(text, esc, breaks) {
    var cut = { '。': true };
    (breaks || []).forEach(function (ch) { cut[ch] = true; });
    var parts = [];
    var buf = '';
    for (var i = 0; i < text.length; i++) {
      buf += text.charAt(i);
      if (cut[text.charAt(i)]) {
        parts.push(buf);
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
  function setNote(el, text) { el.innerHTML = noteHtml(text); }

  function renderOverview(main, api) {
    var data = pack();
    var lang = api.lang;
    main.innerHTML = '<div class="star-page"><header class="star-hero"><p class="star-kicker">' + api.t('star.kicker') + '</p><h1>' + api.t('atlas.advanced.name') + '</h1><p>' + api.esc(L(data.tagline, lang)) + '</p></header><ul class="star-modules">' +
      data.modules.map(function (mod) {
        var open = mod.status === 'open';
        var inner = '<span class="star-mod-id">' + mod.id + '</span><strong>' + api.esc(L(mod.title, lang)) + '</strong><span>' + api.esc(L(mod.blurb, lang)) + '</span><em>' + api.t(open ? 'star.moduleOpen' : 'star.soon') + '</em>';
        return '<li>' + (open ? '<a class="star-mod" href="#/star/' + mod.id + '">' + inner + '</a>' : '<div class="star-mod is-soon">' + inner + '</div>') + '</li>';
      }).join('') +
      '</ul><p class="star-tools"><a href="#/lab">' + api.t('star.labLink') + '</a></p></div>';
  }

  function renderChapter(main, api, chapterId) {
    var data = pack();
    var chapter = data.chapters[chapterId];
    if (!chapter) { location.hash = '#/star'; return; }
    var lang = api.lang;
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
      '<section class="star-prose"><h3>' + api.t('star.define') + '</h3>' + proseLines(L(lesson.explain, lang), api.esc) + '</section>' +
      '<section class="star-contrast"><h3>' + api.t('star.contrast') + '</h3>' + proseLines(L(lesson.example, lang), api.esc, ['；']) + '</section>' +
      '<section class="star-pit"><h3>' + api.t('star.pitfalls') + '</h3><ul>' + (lesson.pitfalls || []).map(function (item) { return '<li>' + api.esc(L(item, lang)) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="star-do"><h3>' + api.t('star.tryHands') + '</h3><p>' + practiceAsk + '</p><div class="star-quiz" role="group">' +
      practiceButtons +
      '</div><p class="star-feedback" id="practice-feedback" role="status"></p></section>' +
      '<section class="star-check"><h3>' + api.t('star.quiz') + '</h3><div class="star-quiz" role="group" aria-labelledby="quiz-q"><p id="quiz-q">' + api.esc(L(lesson.quiz.q, lang)) + '</p>' +
      lesson.quiz.options.map(function (opt) {
        return '<button type="button" data-choice="' + opt.id + '" aria-pressed="false">' + opt.id + '. ' + api.esc(L(opt, lang)) + '</button>';
      }).join('') +
      '</div><button type="button" class="star-submit" id="quiz-retry" hidden>' + api.t('star.quizRetry') + '</button><p class="star-feedback" id="quiz-feedback" role="status"></p></section>' +
      '<section class="star-lab"><h3>' + api.t('star.verify') + '</h3><p>' + api.esc(L(lesson.practice, lang)) + '</p><a class="star-go" href="' + labHref + '">' + api.t('star.practiceGo') + '</a></section>' +
      '<div class="reading-footer">' +
      (prev && prev.status === 'live' ? '<a class="navbtn" href="#/star/' + chapterId + '/' + prev.id + '">' + api.t('star.prev') + '</a>' : '') +
      '<a class="navbtn" href="#/star/' + chapterId + '">' + api.t('star.back') + '</a>' +
      (next && next.status === 'live' ? '<a class="navbtn primary" href="#/star/' + chapterId + '/' + next.id + '">' + api.t('star.next') + '</a>' : '<button type="button" class="navbtn" disabled>' + api.esc(next ? L(next.title, lang) : '') + ' · ' + api.t('star.soon') + '</button>') +
      '</div></article></div>';
    var chartHost = document.getElementById('star-chart');
    if (chartHost && lesson.chart === 'a1') mountChart(chartHost, lang, api.t);
    else if (chartHost && lesson.chart === 'a2') mountTimeframes(chartHost, lang, api.t);
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
        practiceFeedback.textContent = right ? api.t('star.practiceOk') : practiceMiss;
      });
    });
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
        quizFeedback.textContent = (right ? api.t('star.quizOk') : api.t('star.quizNo')) + ' ' + L(lesson.quiz.why, lang);
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
      main.querySelectorAll('[data-choice]').forEach(function (other) {
        other.setAttribute('aria-pressed', 'false');
        other.classList.remove('is-right', 'is-wrong');
      });
      this.hidden = true;
    });
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
