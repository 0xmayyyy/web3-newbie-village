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
      '<p id="a1-title" class="a1-live" aria-live="polite"></p>' +
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
      '<p class="a1-note">' + t('star.chart.colorNote') + '</p>' +
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
          svgBits += '<circle cx="' + (36 + i * 52) + '" cy="' + yOf(price, candle) + '" r="4.5" fill="#f5efff"></circle>';
          svgBits += '<text x="' + (36 + i * 52) + '" y="' + (yOf(price, candle) - 10) + '" text-anchor="middle" fill="#d4bc9e" font-size="11">' + price + '</text>';
        });
      }
      var cx = mode === 'path' ? 268 : 168;
      svgBits += '<line x1="' + cx + '" y1="' + yH + '" x2="' + cx + '" y2="' + yL + '" stroke="' + color + '" stroke-width="2"></line>';
      svgBits += '<rect data-part="body" x="' + (cx - 18) + '" y="' + bodyY + '" width="36" height="' + bodyH + '" rx="2" fill="' + color + '"' + (selected === 'body' ? ' stroke="#e6c79e" stroke-width="3"' : '') + '></rect>';
      svgBits += '<text x="' + (cx + 28) + '" y="' + (yH + 4) + '" fill="#f5efff" font-size="12">' + t('star.chart.h') + ' ' + candle.h + '</text>';
      svgBits += '<text x="' + (cx + 28) + '" y="' + (yL + 4) + '" fill="#f5efff" font-size="12">' + t('star.chart.l') + ' ' + candle.l + '</text>';
      svgBits += '<text x="16" y="' + (yO + 4) + '" fill="#e6c79e" font-size="12">' + t('star.chart.o') + ' ' + candle.o + '</text>';
      svgBits += '<text x="16" y="' + (yC + 4) + '" fill="#e6c79e" font-size="12">' + t('star.chart.c') + ' ' + candle.c + '</text>';
      svg.innerHTML = svgBits;
      live.textContent = partText(candle) + (mode === 'path' && selected === 'all' ? ' ' + t('star.chart.order') : '');
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

  function round3(n) { return Math.round(n * 1000) / 1000; }
  function a2Price(t) {
    var raw;
    if (t <= 240) raw = 100 + (8 * t) / 240;
    else if (t <= 360) raw = 108 - (5 * (t - 240)) / 120;
    else raw = 103 + (2 * (t - 360)) / 120;
    return round3(raw);
  }
  function a2Minutes() {
    var out = [];
    for (var i = 0; i < 480; i += 1) {
      var o = a2Price(i);
      var c = a2Price(i + 1);
      out.push({ start: i, o: o, h: Math.max(o, c), l: Math.min(o, c), c: c, v: 1 });
    }
    return out;
  }
  function a2Aggregate(bars, size) {
    var out = [];
    for (var i = 0; i < bars.length; i += size) {
      var slice = bars.slice(i, i + size);
      var h = slice[0].h;
      var l = slice[0].l;
      var v = 0;
      slice.forEach(function (bar) {
        if (bar.h > h) h = bar.h;
        if (bar.l < l) l = bar.l;
        v += bar.v;
      });
      out.push({
        start: slice[0].start,
        end: slice[slice.length - 1].start,
        o: slice[0].o,
        h: h,
        l: l,
        c: slice[slice.length - 1].c,
        v: v
      });
    }
    return out;
  }
  function a2Same(a, b) {
    return a.o === b.o && a.h === b.h && a.l === b.l && a.c === b.c && a.v === b.v;
  }
  function a2Check(minutes, m5, h1, day) {
    var direct = a2Aggregate(minutes, 480)[0];
    if (!a2Same(day, direct)) throw new Error('daily aggregation');
    if (day.o !== 100 || day.c !== 105 || day.h !== 108 || day.l !== 100 || day.v !== 480) throw new Error('daily textbook shape');
    var from5 = a2Aggregate(m5, 12);
    if (from5.length !== h1.length) throw new Error('hour count');
    from5.forEach(function (bar, i) { if (!a2Same(bar, h1[i])) throw new Error('hour from 5m'); });
    m5.forEach(function (bar) {
      if (bar.start >= 240 && bar.end <= 359 && !(bar.c < bar.o)) throw new Error('afternoon 5m');
    });
  }
  function a2Clock(start) {
    var total = 9 * 60 + start;
    var h = Math.floor(total / 60);
    var m = total % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  function mountTimeframes(root, lang, t) {
    var minutes = a2Minutes();
    var sets = { m5: a2Aggregate(minutes, 5), h1: a2Aggregate(minutes, 60), d1: a2Aggregate(minutes, 480) };
    a2Check(minutes, sets.m5, sets.h1, sets.d1[0]);
    var tf = 'd1';
    var picked = 0;
    root.innerHTML =
      '<div class="a2"><p class="a1-flag">' + t('star.sim') + '</p>' +
      '<div class="a1-modes" role="group" aria-label="' + t('star.chart.modes') + '">' +
      '<button type="button" data-tf="m5" aria-pressed="false">' + t('star.a2.m5') + '</button>' +
      '<button type="button" data-tf="h1" aria-pressed="false">' + t('star.a2.h1') + '</button>' +
      '<button type="button" data-tf="d1" aria-pressed="true">' + t('star.a2.d1') + '</button>' +
      '</div>' +
      '<div class="a2-bars" id="a2-main"></div>' +
      '<p class="a1-live" id="a2-live" aria-live="polite"></p>' +
      '<h4 class="a2-subhead" id="a2-subhead"></h4>' +
      '<div class="a2-bars a2-child" id="a2-child"></div>' +
      '<p class="a1-note">' + t('star.a2.rule') + '</p></div>';
    var mainBars = root.querySelector('#a2-main');
    var childBars = root.querySelector('#a2-child');
    var subhead = root.querySelector('#a2-subhead');
    var live = root.querySelector('#a2-live');
    function barButton(bar, pressed) {
      var up = bar.c >= bar.o;
      var height = Math.max(18, Math.round(((bar.h - bar.l) / 8) * 90 + (up ? 28 : 22)));
      return '<button type="button" class="a2-bar ' + (up ? 'up' : 'down') + '" style="height:' + height + 'px" data-start="' + bar.start + '" aria-pressed="' + (pressed ? 'true' : 'false') + '" aria-label="' + a2Clock(bar.start) + ' ' + bar.o + ' ' + bar.c + '"></button>';
    }
    function readout(bar, name) {
      return t('star.a2.readout', { tf: name, clock: a2Clock(bar.start), o: bar.o, h: bar.h, l: bar.l, c: bar.c, v: bar.v });
    }
    function draw() {
      var bars = sets[tf];
      if (picked >= bars.length) picked = 0;
      var names = { m5: t('star.a2.m5'), h1: t('star.a2.h1'), d1: t('star.a2.d1') };
      mainBars.innerHTML = bars.map(function (bar, i) { return barButton(bar, i === picked); }).join('');
      var bar = bars[picked];
      live.textContent = readout(bar, names[tf]);
      if (tf === 'm5') {
        subhead.hidden = true;
        childBars.hidden = true;
        childBars.innerHTML = '';
        return;
      }
      subhead.hidden = false;
      childBars.hidden = false;
      subhead.textContent = t('star.a2.parts');
      var kids = sets.m5.filter(function (item) { return item.start >= bar.start && item.start <= bar.end; });
      childBars.innerHTML = kids.map(function (item) { return barButton(item, false); }).join('');
    }
    root.addEventListener('click', function (event) {
      var tfBtn = event.target.closest('[data-tf]');
      if (tfBtn && root.contains(tfBtn)) {
        tf = tfBtn.getAttribute('data-tf');
        picked = 0;
        root.querySelectorAll('[data-tf]').forEach(function (btn) {
          btn.setAttribute('aria-pressed', btn === tfBtn ? 'true' : 'false');
        });
        draw();
        return;
      }
      var barBtn = event.target.closest('#a2-main [data-start]');
      if (barBtn) {
        var start = Number(barBtn.getAttribute('data-start'));
        picked = sets[tf].findIndex(function (bar) { return bar.start === start; });
        draw();
      }
    });
    draw();
  }

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
    var practiceWhy = lesson.check ? L(lesson.check.why, lang) : L(lesson.example, lang);
    main.innerHTML =
      '<div class="course-reader star-page"><p class="star-crumb"><a href="#/">' + api.t('crumb.home') + '</a> / <a href="#/star">' + api.t('atlas.advanced.name') + '</a> / <a href="#/star/' + chapterId + '">' + api.esc(L(chapter.title, lang)) + '</a> / ' + chapterId + '-' + lessonId + '</p>' +
      '<article class="reading star-lesson"><p class="star-kicker">' + chapterId + '-' + lessonId + ' · ' + api.t('star.minutes', { n: minutes(lesson) }) + (done ? ' · ' + api.t('star.done') : '') + '</p>' +
      (api.listenBar ? api.listenBar() : '') +
      '<h2>' + api.esc(L(lesson.title, lang)) + '</h2>' +
      '<section class="star-scene"><img class="star-mascot" src="assets/img/footer-character.webp" alt=""><div><h3>' + sceneQ + '</h3><p class="star-one">' + api.esc(L(lesson.one, lang)) + '</p></div></section>' +
      '<section class="star-stage"><h3>' + api.t('star.watch') + '</h3><div id="star-chart"></div></section>' +
      '<section class="star-prose"><h3>' + api.t('star.define') + '</h3><p>' + api.esc(L(lesson.explain, lang)) + '</p></section>' +
      '<section class="star-contrast"><h3>' + api.t('star.contrast') + '</h3><p>' + api.esc(L(lesson.example, lang)) + '</p></section>' +
      '<section class="star-pit"><h3>' + api.t('star.pitfalls') + '</h3><ul>' + (lesson.pitfalls || []).map(function (item) { return '<li>' + api.esc(L(item, lang)) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="star-do"><h3>' + api.t('star.tryHands') + '</h3><p>' + practiceAsk + '</p><div class="star-quiz" role="group">' +
      practiceButtons +
      '</div><button type="button" class="star-submit" id="practice-submit">' + api.t('star.practiceSubmit') + '</button><button type="button" class="star-submit" id="practice-retry" hidden>' + api.t('star.practiceRetry') + '</button><p class="star-feedback" id="practice-feedback" role="status"></p></section>' +
      '<section class="star-check"><h3>' + api.t('star.quiz') + '</h3><div class="star-quiz" role="group" aria-labelledby="quiz-q"><p id="quiz-q">' + api.esc(L(lesson.quiz.q, lang)) + '</p>' +
      lesson.quiz.options.map(function (opt) {
        return '<button type="button" data-choice="' + opt.id + '" aria-pressed="false">' + opt.id + '. ' + api.esc(L(opt, lang)) + '</button>';
      }).join('') +
      '</div><button type="button" class="star-submit" id="quiz-submit">' + api.t('star.quizSubmit') + '</button><button type="button" class="star-submit" id="quiz-retry" hidden>' + api.t('star.quizRetry') + '</button><p class="star-feedback" id="quiz-feedback" role="status"></p></section>' +
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
    var practicePick = '';
    main.querySelectorAll('[data-practice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        practicePick = btn.getAttribute('data-practice');
        main.querySelectorAll('[data-practice]').forEach(function (other) {
          other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
          other.classList.remove('is-right', 'is-wrong');
        });
      });
    });
    var practiceFeedback = document.getElementById('practice-feedback');
    document.getElementById('practice-submit').addEventListener('click', function () {
      if (!practicePick) { practiceFeedback.textContent = api.t('star.practiceNeed'); return; }
      var right = practicePick === practiceAnswer;
      main.querySelectorAll('[data-practice]').forEach(function (other) {
        other.classList.toggle('is-wrong', other.getAttribute('data-practice') === practicePick && !right);
        other.classList.toggle('is-right', right && other.getAttribute('data-practice') === practiceAnswer);
      });
      practiceFeedback.textContent = right ? practiceWhy : api.t('star.practiceNo');
      document.getElementById('practice-retry').hidden = false;
    });
    document.getElementById('practice-retry').addEventListener('click', function () {
      practicePick = '';
      practiceFeedback.textContent = '';
      main.querySelectorAll('[data-practice]').forEach(function (other) {
        other.setAttribute('aria-pressed', 'false');
        other.classList.remove('is-right', 'is-wrong');
      });
      this.hidden = true;
    });
    var quizPick = '';
    var quizFeedback = document.getElementById('quiz-feedback');
    main.querySelectorAll('[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        quizPick = btn.getAttribute('data-choice');
        main.querySelectorAll('[data-choice]').forEach(function (other) {
          other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
          other.classList.remove('is-right', 'is-wrong');
        });
      });
    });
    document.getElementById('quiz-submit').addEventListener('click', function () {
      if (!quizPick) { quizFeedback.textContent = api.t('star.quizNeed'); return; }
      var right = quizPick === lesson.quiz.answer;
      main.querySelectorAll('[data-choice]').forEach(function (other) {
        var id = other.getAttribute('data-choice');
        other.classList.toggle('is-wrong', id === quizPick && !right);
        other.classList.toggle('is-right', right && id === lesson.quiz.answer);
      });
      quizFeedback.textContent = right ? (api.t('star.quizOk') + ' ' + L(lesson.quiz.why, lang)) : api.t('star.quizNo');
      document.getElementById('quiz-retry').hidden = false;
      if (right) {
        api.setDone('star-' + chapterId + '-' + lessonId);
        if (mascot) mascot.classList.add('is-right');
        var kick = main.querySelector('.star-kicker');
        if (kick && kick.textContent.indexOf(api.t('star.done')) < 0) kick.textContent += ' · ' + api.t('star.done');
      }
    });
    document.getElementById('quiz-retry').addEventListener('click', function () {
      quizPick = '';
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
