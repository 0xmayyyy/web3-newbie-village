(function () {
  'use strict';
  var ASSET_V = '20261015171108'; /* stamp.py 写入版本号 */
  var D = window.SITE_DATA, C = window.SITE_CONFIG;
  var CH = D.chapters;
  var main = document.getElementById('main');
  var KEY = 'w3nv-progress-v2';
  var LANG_KEY = 'w3nv-lang';
  var LANG = 'zh';
  try {
    var savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang === 'en' || savedLang === 'zh') LANG = savedLang;
  } catch (eLang) { }
  function t(k, vars) {
    var pack = window.I18N && (I18N[LANG] || I18N.zh);
    var s = pack && pack[k] != null ? pack[k] : (window.I18N && I18N.zh && I18N.zh[k] != null ? I18N.zh[k] : k);
    if (vars) Object.keys(vars).forEach(function (name) { s = String(s).split('{' + name + '}').join(String(vars[name])); });
    return s;
  }
  function quizBank() { return (window.I18N_QUIZ && I18N_QUIZ[LANG]) || I18N_QUIZ.zh; }
  function checkItems() { return (window.I18N_CHECK && I18N_CHECK[LANG]) || I18N_CHECK.zh; }
  (function migrate() {  // v1 用旧章节编号（15 章）；v2 把旧 06 拆成 06 + 07，之后的章节编号 +1
    try {
      var old = localStorage.getItem('w3nv-progress-v1');
      if (old && !localStorage.getItem(KEY)) {
        var o = JSON.parse(old) || {}, n = {};
        Object.keys(o).forEach(function (k) {
          var i = parseInt(k, 10); if (!o[k] || !i) return;
          if (i <= 5) n[k] = 1; else if (i === 6) { n['06'] = 1; n['07'] = 1; } else n[('0' + (i + 1)).slice(-2)] = 1;
        });
        localStorage.setItem(KEY, JSON.stringify(n));
      }
      localStorage.removeItem('w3nv-progress-v1');
    } catch (e) { }
  })();

  /* ---------- 工具函数 ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function host(u) { try { return new URL(u).host; } catch (e) { return u; } }
  function chap(id) { for (var i = 0; i < CH.length; i++) if (CH[i].id === id) return CH[i]; }
  function tagClass(name) { return { '基础': 't-basic', '进阶': 't-adv', '必读': 't-must', '导航': 't-nav', '操作': 't-op', '词典': 't-dict', '故障处理': 't-help', '复习': 't-rev', 'Basics': 't-basic', 'Advanced': 't-adv', 'Must-read': 't-must', 'Guide': 't-nav', 'How-to': 't-op', 'Glossary': 't-dict', 'Troubleshooting': 't-help', 'Review': 't-rev' }[name] || ''; }
  function tags(c) { return c.tags.map(function (name) { return '<span class="tag ' + tagClass(name) + '">' + esc(name) + '</span>'; }).join(''); }
  function routes() {
    return [
      { key: 'new', icon: '🧸', name: t('route.new'), ids: ['01', '02', '03', '08', '09', '05'], desc: t('route.new.d'), cls: 'pink' },
      { key: 'buy', icon: '🛒', name: t('route.buy'), ids: ['05', '03', '09', '04', '06'], desc: t('route.buy.d'), cls: 'mint' },
      { key: 'protect', icon: '🛡️', name: t('route.protect'), ids: ['08', '09', '10', '15'], desc: t('route.protect.d'), cls: 'lilac' }
    ];
  }

  /* ---------- 学习进度（仅存于本浏览器） ---------- */
  function loadP() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { } }
  function isDone(id) { return !!loadP()[id]; }
  function setDone(id) { var p = loadP(); p[id] = 1; saveP(p); }
  function toggleDone(id) { var p = loadP(); if (p[id]) delete p[id]; else p[id] = 1; saveP(p); }
  function doneCount(ids) { var p = loadP(); return (ids || CH.map(function (c) { return c.id; })).filter(function (i) { return p[i]; }).length; }

  /* ---------- 搜索 ---------- */
  var INDEX = [];
  function applyCourse() {
    var pack = (LANG === 'en' && window.SITE_DATA_EN && SITE_DATA_EN.chapters && SITE_DATA_EN.chapters.length) ? SITE_DATA_EN : D;
    CH = pack.chapters;
    INDEX = [];
    CH.forEach(function (c) {
      INDEX.push({ c: c, s: -1, title: c.title, text: c.intro + ' ' + c.tags.join(' ') });
      c.sections.forEach(function (s, i) { INDEX.push({ c: c, s: i, title: s.title, text: s.text }); });
    });
  }
  function expand(q) {
    var lq = q.toLowerCase().trim(), terms = [lq];
    C.aliases.forEach(function (g) {
      if (g.some(function (a) { return a.toLowerCase() === lq; })) g.forEach(function (a) { if (terms.indexOf(a.toLowerCase()) < 0) terms.push(a.toLowerCase()); });
    });
    return terms;
  }
  function search(q) {
    var terms = expand(q), res = [];
    if (!terms[0]) return [];
    INDEX.forEach(function (it) {
      var t = it.title.toLowerCase(), x = it.text.toLowerCase(), score = 0, hit = null;
      terms.forEach(function (term, k) {
        var w = k === 0 ? 3 : 1;
        if (t.indexOf(term) >= 0) score += 10 * w;
        var p = x.indexOf(term);
        if (p >= 0) { score += 2 * w; if (hit === null || k === 0) hit = { p: p, term: term }; }
      });
      if (score) res.push({ it: it, score: score, hit: hit });
    });
    res.sort(function (a, b) { return b.score - a.score; });
    return res.slice(0, 12).map(function (r) {
      var snip = '';
      if (r.hit) {
        var st = Math.max(0, r.hit.p - 24), raw = r.it.text.substr(st, 80);
        snip = (st ? '…' : '') + hl(raw, terms) + '…';
      } else snip = esc(r.it.text.substr(0, 60)) + '…';
      return { href: r.it.c.id === '13' ? '#/c/13?q=' + encodeURIComponent(q.trim()) : '#/c/' + r.it.c.id + (r.it.s >= 0 ? '/' + r.it.s : ''), label: r.it.c.id + ' ' + r.it.c.title + (r.it.s >= 0 ? ' › ' + r.it.title : ''), snip: snip };
    });
  }
  function hl(s, terms) {
    var out = esc(s);
    terms.filter(function (t) { return t.length > 0; }).forEach(function (t) {
      var re = new RegExp('(' + esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function bindSearch(input, box) {
    var timer;
    function run() {
      var q = input.value.trim();
      if (!q) { box.hidden = true; box.innerHTML = ''; return; }
      var r = search(q);
      box.hidden = false;
      if (!r.length) {
        box.innerHTML = '<p class="empty" role="status">' + t('search.empty') + '</p>';
        return;
      }
      box.innerHTML = '<p class="sr" role="status">' + t('search.count', { n: r.length }) + '</p><ul>' + r.map(function (x) {
        return '<li><a href="' + x.href + '"><strong>' + esc(x.label) + '</strong><span>' + x.snip + '</span></a></li>';
      }).join('') + '</ul>';
    }
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 120); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; run(); }
      if (e.key === 'Enter') { var a = $('a', box); if (a) { location.hash = a.getAttribute('href'); } }
      if (e.key === 'ArrowDown') { var f = $('a', box); if (f) { e.preventDefault(); f.focus(); } }
    });
    box.addEventListener('keydown', function (e) {
      var links = $$('a', box), i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i - 1] : input).focus(); }
      if (e.key === 'Escape') { input.focus(); }
    });
    box.addEventListener('click', function (e) { if (e.target.closest('a')) { input.value = ''; box.hidden = true; } });
  }
  bindSearch($('#q-top'), $('.topbar .search-results'));
  document.addEventListener('click', function (e) {
    $$('.search').forEach(function (s) { if (!s.contains(e.target)) { var b = $('.search-results', s); if (b) b.hidden = true; } });
  });

  /* ---------- 首页 ---------- */
  function chapterCard(c) {
    var d = isDone(c.id);
    return '<li><a class="ccard' + (d ? ' done' : '') + '" href="#/c/' + c.id + '">' +
      '<span class="num">' + c.id + '</span><span class="cemoji" aria-hidden="true">' + c.emoji + '</span>' +
      '<span class="cbody"><strong>' + esc(c.title) + '</strong><span class="cintro">' + esc(c.intro) + '</span><span class="tags">' + tags(c) + '</span></span>' +
      (d ? '<span class="donemark" title="' + esc(t('done')) + '">✓<span class="sr">' + esc(t('done')) + '</span></span>' : '') + '</a></li>';
  }
  function routeHref(r) {
    return '#/r/' + r.key;
  }
  function chapterBody(c) {
    return '<header class="ch-head"><span class="ch-num">' + c.id + '</span><div><h2 class="h1like">' + esc(c.title) + ' <span aria-hidden="true">' + c.emoji + '</span></h2><p>' + esc(c.intro) + '</p><span class="tags">' + tags(c) + '</span></div></header>' +
      c.sections.map(function (s, i) {
        return '<details class="sec" id="s' + i + '" open><summary><h2>' + esc(s.title) + '</h2></summary><div class="sec-body">' + s.html + '</div></details>';
      }).join('') +
      (c.tip ? '<aside class="tip"><img src="assets/img/panda.jpg?v=20261015171108" alt="" width="64" height="62"><p>' + esc(c.tip) + '</p></aside>' : '');
  }
  function renderRoute(key, step, keep) {
    var r = routes().filter(function (x) { return x.key === key; })[0]; if (!r) return renderHome(keep);
    var buy = r.key === 'buy', n = r.ids.length;
    var k = Math.min(Math.max((step || 1) - 1, 0), n - 1);
    function label(j) { return buy && j === 0 ? t('route.signup') : r.ids[j] + ' ' + chap(r.ids[j]).title; }
    function href(j) { return '#/r/' + r.key + '/' + (j + 1); }
    document.title = t('route.title', { name: r.name, n: k + 1 });
    var isCh = !(buy && k === 0), cid = r.ids[k], mk = isCh ? ' data-mark="' + cid + '"' : '';
    var body = isCh ? chapterBody(chap(cid)) + '<div class="done-box"><button type="button" class="btn btn-sm ' + (isDone(cid) ? '' : 'btn-ghost') + '" id="route-done" aria-pressed="' + isDone(cid) + '">' + (isDone(cid) ? t('done.mark') : t('done.mark2')) + '</button></div>' : '<section class="sec-plain"><h2>' + esc(t('route.signup.h')) + '</h2><p>' + esc(t('route.signup.p')) + '</p><div data-widget="exchanges"></div></section>';
    main.innerHTML = '<div class="route-page"><nav class="crumbs" aria-label="' + esc(t('crumb.where')) + '"><a href="#/">' + esc(t('crumb.home')) + '</a> › <span>' + esc(t('route.crumb')) + '</span></nav>' +
      '<header class="ch-head"><span class="ch-num" aria-hidden="true">' + r.icon + '</span><div><h1>' + esc(r.name) + '</h1><p>' + esc(r.desc) + '</p></div></header>' +
      '<ol class="steps">' + r.ids.map(function (i, j) { return '<li class="' + (j === k ? 'cur' : '') + (isDone(i) ? ' ok' : '') + '"><a href="' + href(j) + '"' + (j === k ? ' aria-current="step"' : '') + '><b>' + esc(t('route.step', { n: j + 1 })) + '</b> ' + esc(label(j)) + (isDone(i) ? ' ✓' : '') + '</a></li>'; }).join('') + '</ol>' +
      '<div class="route-body" id="route-body" tabindex="-1">' + body + '</div>' +
      '<nav class="route-next" aria-label="' + esc(t('route.nav')) + '">' +
      (k > 0 ? '<a class="btn btn-ghost" href="' + href(k - 1) + '">' + esc(t('route.prev')) + '</a>' : '') +
      (k < n - 1 ? '<a class="btn"' + mk + ' href="' + href(k + 1) + '">' + t('route.next', { label: esc(label(k + 1)) }) + '</a>' : '<a class="btn"' + mk + ' href="#/">' + esc(t('route.done')) + '</a>') +
      (buy && k === 0 ? '<a class="btn btn-ghost" href="#/c/05">' + esc(t('route.read05', { title: chap('05').title })) + '</a>' : '') +
      '</nav></div>';
    $$('[data-mark]', main).forEach(function (a) { a.addEventListener('click', function () { setDone(a.getAttribute('data-mark')); }); });
    var db = $('#route-done'); if (db) db.addEventListener('click', function () { toggleDone(cid); var y = window.scrollY; renderRoute(key, step); window.scrollTo(0, y); setTimeout(function () { window.scrollTo(0, y); var b = $('#route-done'); if (b) b.focus({ preventScroll: true }); }, 10); });
    mountWidgets(main); applyVerify(main);
    if (keep) return;
    if (step) { var rb = $('#route-body'); setTimeout(function () { rb.scrollIntoView({ block: 'start' }); rb.focus({ preventScroll: true }); }, 0); }
    else window.scrollTo(0, 0);
  }
  var HERO_POSTER = 'assets/hero/hero-poster.jpg?v=20261106231500';
  var HERO_VIDEO = 'assets/hero/hero-desktop.mp4?v=20261106231500';
  var HERO_PORTRAIT = 'assets/hero/hero-portrait.webp?v=20261107133000';
  function renderHome() {
    document.title = t('title.home');
    var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var narrow = matchMedia('(max-width: 700px)').matches;
    var video = narrow ? '' : (reduceMotion
      ? '<video class="hero-video is-still" poster="' + HERO_POSTER + '" preload="none" muted playsinline aria-hidden="true"></video>'
      : '<video class="hero-video" src="' + HERO_VIDEO + '" poster="' + HERO_POSTER + '" muted autoplay loop playsinline preload="metadata" aria-hidden="true"></video>');
    main.innerHTML =
      '<section class="hero-screen" aria-labelledby="h-hero">' +
      '<div class="hero-media"><div class="hero-frame">' + video +
      '<img class="hero-portrait" src="' + HERO_PORTRAIT + '" alt="" width="860" height="1528"></div><div class="hero-shade" aria-hidden="true"></div></div>' +
      '<div class="hero-copy"><h1 id="h-hero">' + esc(t('hero.h1')) + '</h1>' +
      '<p class="hero-sub">' + esc(t('hero.lead')) + '</p>' +
      '<div class="hero-cta"><a class="hero-btn hero-btn-primary" href="#/c/01">' + esc(t('hero.cta')) + '</a>' +
      '<a class="hero-btn hero-btn-secondary" href="#/" data-scroll="h-toc">' + esc(t('hero.cta2')) + '</a></div></div></section>' +
      planetAtlas() + '';
    mountHero();
    mountAtlas();
  }
  var PLANETS = [
    { id: 'entry', file: 'entry', color: '#bba1e9', dot: '#c9a8f3', soft: 'rgba(187,161,233,.28)', chapters: [{ id: '01' }, { id: '02' }, { id: '13' }] },
    { id: 'safety', file: 'safety', color: '#83b9e8', dot: '#8cc8f1', soft: 'rgba(131,185,232,.28)', chapters: [{ id: '09' }, { id: '15' }] },
    { id: 'trade', file: 'trade', color: '#e7b46f', dot: '#e5b373', soft: 'rgba(231,180,111,.28)', chapters: [{ id: '03' }, { id: '04' }, { id: '05' }, { id: '06' }, { id: '07' }] },
    { id: 'wallet', file: 'wallet', color: '#d69ac4', dot: '#e3a6cf', soft: 'rgba(214,154,196,.28)', chapters: [{ id: '08' }, { id: '10' }] },
    { id: 'world', file: 'world', color: '#79c8c6', dot: '#83e0d4', soft: 'rgba(121,200,198,.28)', sections12: [0, 1, 2, 3, 4, 6, 7], chapters: [{ id: '12', label: 'atlas.world.ch12' }] },
    { id: 'chance', file: 'chance', color: '#eea36d', dot: '#ffb17b', soft: 'rgba(238,163,109,.28)', sections12: [5, 8, 9, 10, 11], chapters: [{ id: '11' }, { id: '12', label: 'atlas.chance.ch12' }] },
    { id: 'advanced', file: 'advanced', color: '#a28bf0', dot: '#b4a0f5', soft: 'rgba(162,139,240,.28)', locked: true, chapters: [] }
  ];
  var readerJumpTop = false;
  try { localStorage.removeItem('web3-reader-theme'); } catch (eTheme) {}
  function planetLabel(item) {
    if (item.label) return t(item.label);
    var c = chap(item.id);
    return c ? c.id + ' · ' + c.title : item.id;
  }
  function planetInfo(i) {
    var p = PLANETS[i];
    return ('0' + (i + 1)).slice(-2) + ' · ' + t('atlas.' + p.id + '.name');
  }
  function noLoneChar(s) {
    s = String(s);
    if (s.length < 2) return esc(s);
    return esc(s.slice(0, -1)) + '&#8288;' + esc(s.slice(-1));
  }
  function planetAtlas() {
    return '<div class="planet-scene"><section class="scene" id="h-toc" aria-labelledby="atlas-heading">' +
      '<div class="heading"><div class="eyebrow">' + esc(t('atlas.eyebrow')) + '</div>' +
      '<h1 id="atlas-heading">' + esc(t('atlas.h')) + '</h1><p>' + esc(t('atlas.lead')) + '</p></div>' +
      '<div class="galaxy">' + PLANETS.map(function (p, i) {
        return '<button type="button" class="planet-card p' + i + '" data-i="' + i + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '"' +
          (p.locked ? ' disabled' : '') + ' aria-label="' + esc(t('atlas.' + p.id + '.name')) + '">' +
          '<div class="planet-wrap"><img src="assets/planets/' + p.file + '.png?v=20261107290000" alt=""></div>' +
          '<span class="num">' + ('0' + (i + 1)).slice(-2) + '</span>' +
          '<strong>' + esc(t('atlas.' + p.id + '.name')) + '</strong>' +
          '<small>' + noLoneChar(t('atlas.' + p.id + '.sub')) + '</small>' +
          (p.locked ? '<em>' + esc(t('atlas.locked')) + '</em>' : '') + '</button>';
      }).join('') + '</div>' +
      '<p class="footnote">' + esc(t('atlas.note')) + '</p></section></div>';
  }
  function planetEntryHash(i) {
    var p = PLANETS[i];
    if (!p || p.locked) return '';
    if (p.id === 'world') return '#/c/12/0';
    var first = p.chapters[0];
    if (first.label === 'atlas.chance.ch12') return '#/c/12/5';
    return '#/c/' + first.id;
  }
  function enterPlanet(i) {
    var hash = planetEntryHash(i);
    if (hash) location.hash = hash;
  }
  function mountAtlas() {
    $$('.planet-scene .planet-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var i = Number(card.getAttribute('data-i'));
        if (!PLANETS[i] || PLANETS[i].locked) return;
        enterPlanet(i);
      });
    });
  }

  /* ---------- 章节页 ---------- */
  function planetIndexFor(id, secIndex) {
    if (id === '12') {
      if (secIndex != null && [5, 8, 9, 10, 11].indexOf(secIndex) >= 0) return 5;
      return 4;
    }
    for (var i = 0; i < PLANETS.length; i++) {
      if (PLANETS[i].locked) continue;
      if (PLANETS[i].chapters.some(function (item) { return item.id === id; })) return i;
    }
    return -1;
  }
  function visibleSections(planetIndex, id) {
    var c = chap(id);
    if (!c) return [];
    var p = planetIndex >= 0 ? PLANETS[planetIndex] : null;
    var idx = null;
    if (id === '12' && p && p.sections12) idx = p.sections12;
    if (!idx) return c.sections.map(function (s, i) { return { s: s, i: i }; });
    return idx.filter(function (i) { return c.sections[i]; }).map(function (i) { return { s: c.sections[i], i: i }; });
  }
  function readerChapterIds(planetIndex, fallbackId) {
    if (planetIndex < 0) return [fallbackId];
    var seen = [];
    PLANETS[planetIndex].chapters.forEach(function (item) {
      if (seen.indexOf(item.id) < 0) seen.push(item.id);
    });
    return seen;
  }
  function readerChapterLabel(planetIndex, id) {
    var p = planetIndex >= 0 ? PLANETS[planetIndex] : null;
    if (id === '12' && p) {
      if (p.id === 'world') return t('atlas.world.ch12');
      if (p.id === 'chance') return t('atlas.chance.ch12');
    }
    var c = chap(id);
    return c ? c.id + ' · ' + c.title : id;
  }
  function firstExcerpt(text) {
    text = String(text || '').replace(/^\s+/, '');
    text = text.replace(/^\d{1,2}[.)]\s+/, '');
    var i, ch, j;
    for (i = 0; i < text.length; i++) {
      ch = text.charAt(i);
      if (ch === '。' || ch === '！' || ch === '？') return text.slice(0, i + 1).trim();
      if (ch !== '.' && ch !== '!' && ch !== '?') continue;
      if (ch === '.' && i + 1 < text.length && text.charAt(i + 1) === '.') continue;
      if (ch === '.' && i > 0 && i + 1 < text.length && /\d/.test(text.charAt(i - 1)) && /\d/.test(text.charAt(i + 1))) continue;
      if (ch === '.' && i + 1 < text.length && /\s/.test(text.charAt(i + 1))) {
        j = i - 1;
        while (j >= 0 && /\d/.test(text.charAt(j))) j--;
        if (j < i - 1 && (j < 0 || /\s/.test(text.charAt(j)))) continue;
      }
      if (LANG === 'zh') continue;
      return text.slice(0, i + 1).trim();
    }
    return '';
  }
  function renderChapter(id, sec, keep) {
    try { localStorage.removeItem('web3-reader-theme'); } catch (eTheme) {}
    var c = chap(id); if (!c) return renderHome();
    var planetIndex = planetIndexFor(id, sec);
    var planet = planetIndex >= 0 ? PLANETS[planetIndex] : null;
    var visible = visibleSections(planetIndex, id);
    var pos = 0;
    if (sec != null) {
      for (var vi = 0; vi < visible.length; vi++) if (visible[vi].i === sec) pos = vi;
    }
    if (!visible.length) return renderHome();
    var cur = visible[pos];
    var ids = readerChapterIds(planetIndex, id);
    var glossary = id === '13';
    var cardIds = ids.filter(function (cid) { return cid !== '13'; });
    var highlight = glossary ? '' : firstExcerpt(cur.s.text || '');
    document.title = t('title.ch', { id: c.id, title: c.title });
    var code = planet ? t(planetIndex === 0 ? 'reader.begin' : 'reader.explore', { n: ('0' + (planetIndex + 1)).slice(-2) }) : 'CHAPTER ' + c.id;
    var planetOptions = PLANETS.map(function (p, i) {
      if (p.locked) return '';
      return '<option value="' + i + '"' + (i === planetIndex ? ' selected' : '') + '>' + esc(planetInfo(i)) + '</option>';
    }).join('');
    main.innerHTML =
      '<div class="course-reader' + (glossary ? ' is-glossary' : '') + '" data-theme="dark" style="--accent:' + (planet ? planet.color : '#bfa6ee') + ';--planet-halo:' + (planet ? planet.color : '#bfa6ee') + ';--planet-soft:' + (planet ? planet.soft : 'rgba(191,166,238,.28)') + '"><div class="shell">' +
      '<div class="crumb-bar"><div class="crumb"><a href="#/">' + esc(t('crumb.home')) + '</a> / ' + esc(planet ? t('reader.crumb', { planet: t('atlas.' + planet.id + '.name'), title: c.title }) : c.id + ' ' + c.title) + '</div>' +
      '<div class="planet-return"><label for="planet-jump">' + esc(t('reader.jump')) + '</label><select id="planet-jump" aria-label="' + esc(t('reader.jump')) + '">' + planetOptions + '</select></div></div>' +
      '<section class="hero"><div><div class="eyebrow">' + esc(code) + '</div><h1>' + esc(planet ? t('atlas.' + planet.id + '.name') : c.title) + '</h1><p>' + esc(planet ? t('reader.' + planet.id + '.desc') : c.intro) + '</p></div>' +
      (planet ? '<div class="hero-planet" aria-hidden="true"><img alt="" src="assets/planets/' + planet.file + '.png?v=20261107290000"></div>' : '') +
      '</section><div class="layout">' +
      '<aside class="side"><h2>' + esc(t('reader.planets')) + '</h2><div class="planet-menu">' + PLANETS.filter(function (p) { return !p.locked; }).map(function (p) {
        var real = PLANETS.indexOf(p);
        return '<button type="button" class="planet-btn' + (real === planetIndex ? ' active' : '') + '" data-planet="' + real + '"><span class="dot" style="--dot:' + p.dot + '"></span>' + ('0' + (real + 1)).slice(-2) + ' · ' + esc(t('atlas.' + p.id + '.name')) + '</button>';
      }).join('') + '</div><div class="side-note">' + esc(t('reader.note')) + '</div></aside>' +
      '<section class="center"><div class="course-head"><h2>' + esc(t('reader.list')) + '</h2><span>' + esc(t('reader.count', { n: cardIds.length })) + '</span></div>' +
      '<div class="chapter-list">' + (cardIds.indexOf(id) < 0 && !glossary ? '<div class="side-note">' + esc(t('reader.sharedTag')) + '</div>' : '') + cardIds.map(function (cid) {
        return '<button type="button" class="chapter' + (cid === id ? ' active' : '') + '" data-chapter="' + cid + '"><small>CHAPTER ' + cid + '</small><strong>' + esc(readerChapterLabel(planetIndex, cid)) + '</strong></button>';
      }).join('') + '</div>' +
      (glossary ? '' : '<div class="mobile-toc"><select id="section-select" aria-label="' + esc(t('reader.map')) + '">' + visible.map(function (item, i) {
        return '<option value="' + item.i + '"' + (i === pos ? ' selected' : '') + '>' + (i + 1) + '. ' + esc(item.s.title) + '</option>';
      }).join('') + '</select></div>' +
      '<article class="reading"><div class="meta"><span>CHAPTER ' + c.id + ' / LESSON ' + ('0' + (pos + 1)).slice(-2) + '</span><span>' + (pos + 1) + ' / ' + visible.length + '</span></div>' +
      '<h2>' + esc(cur.s.title) + '</h2>' + (highlight ? '<div class="summary">' + esc(highlight) + '</div>' : '') +
      '<div class="prose" id="reader-prose">' + cur.s.html + '</div>' +
      '<div class="reading-footer"><button type="button" class="navbtn" id="reader-prev"' + (pos === 0 && ids.indexOf(id) <= 0 ? ' disabled' : '') + '>' + esc(t('reader.prev')) + '</button>' +
      '<button type="button" class="done-link" id="done-btn" aria-pressed="' + isDone(c.id) + '">' + esc(isDone(c.id) ? t('ch.done') : t('ch.done.set')) + '</button>' +
      '<button type="button" class="navbtn primary" id="reader-next"' + (pos === visible.length - 1 && ids.indexOf(id) === ids.length - 1 ? ' disabled' : '') + '>' + esc(t('reader.next')) + '</button></div></article>') +
      '</section>' +
      (glossary ? '' : '<aside class="toc"><h2>' + esc(t('reader.map')) + '</h2><div>' + visible.map(function (item, i) {
        return '<button type="button" class="toc-btn' + (i === pos ? ' active' : '') + '" data-sec="' + item.i + '"><span class="idx">' + ('0' + (i + 1)).slice(-2) + '</span><span>' + esc(item.s.title) + '</span></button>';
      }).join('') + '</div><div class="progress"><div id="reader-bar" style="width:' + ((pos + 1) / visible.length * 100) + '%"></div></div><div class="progress-label">' + esc(t('reader.reading', { n: pos + 1, m: visible.length })) + '</div>' +
      '<div class="tools"><h2>' + esc(t('reader.shared')) + '</h2><button type="button" data-tool="14">' + esc(t('reader.tool14')) + '</button><button type="button" data-tool="16">' + esc(t('reader.tool16')) + '</button></div></aside>') + '</div></div>' +
      '<p class="reader-home"><a href="#/">' + esc(t('reader.home')) + '</a></p></div>';
    var prose = $('#reader-prose');
    if (highlight && prose) {
      var opening = prose.querySelector('p');
      if (opening) {
        var norm = function (s) { return s.replace(/\s+/g, '').replace(/[。.!！?？]+$/, ''); };
        if (norm(opening.textContent) === norm(highlight)) opening.remove();
      }
    }
    function goHash(nextId, nextSec) { location.hash = '#/c/' + nextId + (nextSec != null ? '/' + nextSec : ''); }
    $$('.course-reader [data-planet]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = PLANETS[+b.getAttribute('data-planet')];
        if (!p || p.locked) return;
        var first = p.chapters[0];
        goHash(first.id, first.label === 'atlas.world.ch12' ? 0 : first.label === 'atlas.chance.ch12' ? 5 : null);
      });
    });
    $$('.course-reader [data-chapter]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cid = b.getAttribute('data-chapter');
        goHash(cid, cid === '12' && planet && planet.sections12 ? planet.sections12[0] : null);
      });
    });
    $$('.course-reader [data-sec]').forEach(function (b) {
      b.addEventListener('click', function () { goHash(id, +b.getAttribute('data-sec')); });
    });
    var select = $('#section-select');
    if (select) select.addEventListener('change', function () { goHash(id, +select.value); });
    function step(dir) {
      var nextPos = pos + dir;
      if (nextPos >= 0 && nextPos < visible.length) { goHash(id, visible[nextPos].i); return; }
      var at = ids.indexOf(id) + dir;
      if (at < 0 || at >= ids.length) return;
      var nid = ids[at];
      var nvis = visibleSections(planetIndex, nid);
      var target = dir > 0 ? nvis[0] : nvis[nvis.length - 1];
      goHash(nid, target.i);
    }
    var prevBtn = $('#reader-prev'), nextBtn = $('#reader-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
    $$('.course-reader [data-tool]').forEach(function (b) {
      b.addEventListener('click', function () { goHash(b.getAttribute('data-tool'), null); });
    });
    var jump = $('#planet-jump');
    if (jump) {
      if (planetIndex < 0) jump.selectedIndex = -1;
      jump.addEventListener('change', function () {
        var nextPlanet = +jump.value;
        var hash = planetEntryHash(nextPlanet);
        if (!hash) return;
        readerJumpTop = true;
        if (location.hash === hash) {
          readerJumpTop = false;
          window.scrollTo({ top: 0, behavior: prefersReduce() ? 'auto' : 'smooth' });
          return;
        }
        location.hash = hash;
      });
    }
    var done = $('#done-btn');
    if (done) done.addEventListener('click', function () { toggleDone(c.id); renderChapter(c.id, cur.i, true); var again = $('#done-btn'); if (again) again.focus(); });
    mountWidgets(main);
    applyVerify(main);
    if (keep) return;
    if (readerJumpTop) {
      readerJumpTop = false;
      window.scrollTo({ top: 0, behavior: prefersReduce() ? 'auto' : 'smooth' });
    } else if (sec != null) {
      var article = $('.course-reader .reading');
      if (article) setTimeout(function () { article.scrollIntoView({ block: 'start' }); }, 0);
    } else window.scrollTo(0, 0);
  }

  /* ---------- 专属邀请链接标签 ---------- */
  function refTag(u) {
    var r = (C.referrals || {})[u];
    if (!r) return '';
    return '<span class="ref-tag">' + esc(t('ref')) + (r.feeDiscount ? esc(t('ref.fee')) : '') + '</span>';
  }
  function applyRef(root) {
    $$('.tool-card', root).forEach(function (card) {
      var v = $('.verify[data-url]', card); if (!v || $('.ref-tag', card)) return;
      var t = refTag(v.dataset.url); if (t) $('.tool-head strong', card).insertAdjacentHTML('afterend', t);
    });
  }

  /* ---------- 核验状态 ---------- */
  function applyVerify(root) {
    applyRef(root);
    $$('.verify[data-url]', root).forEach(function (v) {
      var d = C.verified[v.dataset.url];
      if (d) { v.textContent = t('verify.ok', { d: d }); v.classList.add('ok'); v.title = t('verify.ok.title', { d: d }); }
      else { v.textContent = t('verify.no'); v.title = t('verify.no.title'); }
    });
  }

  /* ---------- 组件 ---------- */
  var W = {};
  W.wpbuttons = function (el) {
    el.className = 'btn-row';
    el.innerHTML = [[t('wp.read'), 'https://bitcoin.org/bitcoin.pdf'], [t('wp.zh'), 'https://bitcoin.org/en/bitcoin-paper']]
      .map(function (b) { return '<a class="btn btn-sm" href="' + b[1] + '" target="_blank" rel="noopener noreferrer nofollow">' + b[0] + ' ↗<span class="btn-domain">' + host(b[1]) + '</span></a>'; }).join('');
  };
  W.exchanges = function (el) {
    el.innerHTML = '<div class="ex-grid">' + C.exchanges.map(function (x) {
      return '<div class="ex-card"><div class="ex-head"><h3>' + esc(x.name) + '</h3><span class="verify" data-url="' + esc(x.url) + '"></span></div>' +
        refTag(x.url) +
        '<p class="domain">' + esc(t('ex.domain')) + '<b>' + esc(host(x.url)) + '</b></p>' +
        (x.mainDomain && !(host(x.url) === x.mainDomain || host(x.url).slice(-x.mainDomain.length - 1) === '.' + x.mainDomain) ? '<p class="promo-domain">' + esc(t('ex.promo')) + '</p>' : '') +
        (x.enabled ? '<a class="btn btn-sm" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(t('ex.register')) + ' ↗<span class="sr">' + esc(t('ex.new', { host: host(x.url) })) + '</span></a>' : '<span class="btn btn-sm disabled" aria-disabled="true">' + esc(t('ex.paused')) + '</span>') +
        '<p class="ex-warn"><span aria-hidden="true">⚠️</span> ' + esc(t('ex.warn')) + '</p></div>';
    }).join('') + '</div>';
  };
  W.onchain = function (el) {
    el.innerHTML = '<div class="ex-grid">' + (C.onchain || []).map(function (x) {
      var desc = x.desc;
      if (LANG === 'en') {
        if (x.url.indexOf('debot.ai') >= 0) desc = t('oc.debot');
        else if (x.url.indexOf('web3.binance.com') >= 0) desc = t('oc.binance');
      }
      return '<div class="ex-card"><div class="ex-head"><h3>' + esc(x.name) + '</h3><span class="verify" data-url="' + esc(x.url) + '"></span></div>' +
        '<p>' + esc(desc) + '</p>' + refTag(x.url) +
        '<p class="domain">' + esc(t('ex.domain')) + '<b>' + esc(host(x.url)) + '</b></p>' +
        '<a class="btn btn-sm" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(t('oc.open')) + ' ↗<span class="sr">' + esc(t('ex.new', { host: host(x.url) })) + '</span></a>' +
        '<p class="ex-warn"><span aria-hidden="true">⚠️</span> ' + esc(t('oc.warn')) + '</p></div>';
    }).join('') + '</div>';
  };
  /* CEX 储备排行：DefiLlama 公开接口 https://api.llama.fi/cexs（无需 key，CORS 开放）。每次打开页面重新拉取，本地缓存最多 10 分钟，失败时回退缓存 */
  function renderCex() {
    var CLEAN_LABEL = t('cex.clean'), TOP_N = 20;
    var KEY = 'cexrank-v3', TTL = 10 * 60 * 1000, mine = ['Binance', 'Bybit', 'Gate', 'HTX'];
    var COLS = [
      ['name', t('col.name'), 's'], ['currentTvl', t('col.tvl'), 'u'], ['cleanAssetsTvl', CLEAN_LABEL, 'u'],
      ['inflows_24h', t('col.in24'), 'f'], ['inflows_1w', t('col.in7'), 'f'], ['inflows_1m', t('col.in30'), 'f'],
      ['spotVolume', t('col.spot'), 'u'], ['derivVolume', t('col.deriv'), 'u'], ['oi', t('col.oi'), 'u'],
      ['leverage', t('col.lev'), 'x'], ['auditor', t('col.auditor'), 's'], ['lastAuditDate', t('col.audit'), 'd']
    ];
    var st = { k: 'currentTvl', dir: -1, q: '' }, rows = [];
    document.title = t('cex.title');
    main.innerHTML = '<div class="cex-page"><nav class="crumbs" aria-label="' + esc(t('crumb.where')) + '"><a href="#/">' + esc(t('crumb.home')) + '</a> › <span>' + esc(t('cex.crumb')) + '</span></nav>' +
      '<h1>' + esc(t('cex.h')) + '</h1><p class="lead">' + esc(t('cex.lead')) + '</p>' +
      '<p class="cex-audit-note">' + esc(t('cex.auditNote')) + '</p>' +
      '<div class="cex-tools"><label class="sr" for="cex-q">' + esc(t('cex.search')) + '</label><input id="cex-q" type="search" placeholder="' + esc(t('cex.search.ph')) + '" autocomplete="off"><span id="cex-count" class="w-note"></span></div>' +
      '<div class="widget cexboard"><div id="cex-body"><p class="w-note">' + esc(t('cex.loading')) + '</p></div></div>' +
      '<p class="w-note" id="cex-src">' + t('cex.src') + '<span id="cex-time"></span></p>' +
      '<div class="callout cex-notes"><h2>' + esc(t('cex.notes')) + '</h2><ul>' +
      '<li>' + t('cex.n1', { clean: esc(CLEAN_LABEL) }) + '</li>' +
      '<li>' + t('cex.n2') + '</li>' +
      '<li>' + t('cex.n3') + '</li>' +
      '<li>' + t('cex.n4', { clean: esc(CLEAN_LABEL) }) + '</li>' +
      '<li>' + t('cex.n5') + '</li>' +
      '<li>' + t('cex.n6') + '</li>' +
      '<li>' + t('cex.n7') + '</li>' +
      '</ul></div></div>';
    function money(n) {
      if (n == null || isNaN(n)) return '';
      var a = Math.abs(n), v = a >= 1e9 ? (a / 1e9).toFixed(3).replace(/\.?0+$/, '') + 'b' : a >= 1e6 ? (a / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'm' : Math.round(a).toLocaleString('en-US');
      return (n < 0 ? '-' : '') + '$' + v;
    }
    function cell(x, c) {
      var v = x[c[0]];
      if (c[0] === 'name') return '<td class="nm">' + esc(v) + '</td>';
      if (v == null || v === '') return '<td class="na">–</td>';
      if (c[2] === 'u') return '<td>' + money(v) + '</td>';
      if (c[2] === 'f') return '<td class="' + (v >= 0 ? 'pos' : 'neg') + '">' + (v > 0 ? '+' : '') + money(v) + '</td>';
      if (c[2] === 'x') return '<td>' + (+v).toFixed(2).replace(/\.?0+$/, '') + 'x</td>';
      if (c[2] === 'd') return '<td>' + esc(new Date(v * 1000).toISOString().slice(0, 10)) + '</td>';
      if (c[0] === 'auditor' && x.auditLink) return '<td><a href="' + esc(x.auditLink) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(v) + '</a></td>';
      return '<td>' + esc(v) + '</td>';
    }
    function draw() {
      var q = st.q.toLowerCase().trim();
      var list = rows.filter(function (x) { return !q || String(x.name).toLowerCase().indexOf(q) >= 0; }).sort(function (a, b) {
        var va = a[st.k], vb = b[st.k];
        if (va == null || va === '') return 1; if (vb == null || vb === '') return -1;
        return (typeof va === 'string' ? va.localeCompare(vb) : va - vb) * st.dir;
      });
      $('#cex-count').textContent = t('cex.count', { n: list.length });
      $('#cex-body').innerHTML = '<div class="table-wrap" tabindex="0"><table><thead><tr><th>#</th>' + COLS.map(function (c) {
        var on = st.k === c[0];
        return '<th' + (on ? ' aria-sort="' + (st.dir > 0 ? 'ascending' : 'descending') + '"' : '') + '><button type="button" class="th-sort" data-k="' + c[0] + '">' + c[1] + (on ? (st.dir > 0 ? ' ▲' : ' ▼') : '') + '</button></th>';
      }).join('') + '</tr></thead><tbody>' + list.map(function (x, i) {
        return '<tr' + (mine.indexOf(x.name) >= 0 ? ' class="hl"' : '') + '><td>' + (i + 1) + '</td>' + COLS.map(function (c) { return cell(x, c); }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
      $$('.th-sort', main).forEach(function (b) { b.addEventListener('click', function () {
        var k = b.getAttribute('data-k'); if (st.k === k) st.dir = -st.dir; else { st.k = k; st.dir = k === 'name' || k === 'auditor' ? 1 : -1; } draw();
        var nb = $('.th-sort[data-k="' + k + '"]', main); if (nb) nb.focus();
      }); });
    }
    function show(d, when, stale) {
      rows = d; $('#cex-time').textContent = t('cex.time', { t: new Date(when).toLocaleString(LANG === 'en' ? 'en-US' : 'zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' }) }) + (stale ? t('cex.stale') : ''); draw();
    }
    $('#cex-q').addEventListener('input', function (e) { st.q = e.target.value; if (rows.length) draw(); });
    var c = null; try { c = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (c && Date.now() - c.t < TTL) { show(c.rows, c.t); return; }
    if (c && c.rows) show(c.rows, c.t);
    fetch('https://api.llama.fi/cexs').then(function (r) { if (!r.ok) throw r.status; return r.json(); }).then(function (d) {
      var keep = COLS.map(function (x) { return x[0]; }).concat(['auditLink']);
      var list = (d.cexs || []).filter(function (x) { return x.name; }).map(function (x) { var o = {}; keep.forEach(function (k) { if (x[k] != null) o[k] = x[k]; }); return o; }).sort(function (a, b) { return (b.currentTvl || 0) - (a.currentTvl || 0); }).slice(0, TOP_N);
      if (!list.length) throw 'empty';
      var t = Date.now(); try { localStorage.setItem(KEY, JSON.stringify({ t: t, rows: list })); } catch (e) {}
      if ($('#cex-body')) show(list, t);
    }).catch(function () {
      if (!$('#cex-body')) return;
      if (c && c.rows) show(c.rows, c.t, true);
      else $('#cex-body').innerHTML = '<p class="w-note">' + t('cex.fail') + '</p>';
    });
  }
  W.quiz = function (el) {
    var QUIZ = quizBank();
    var picked = {};
    el.className = 'widget quiz';
    el.innerHTML = '<p class="w-note">' + esc(t('quiz.note')) + '</p><ol>' + QUIZ.map(function (x, i) {
      return '<li><fieldset><legend>' + esc(x.q) + '</legend><div class="opts">' + x.o.map(function (o, j) {
        return '<button type="button" class="opt" data-q="' + i + '" data-o="' + j + '">' + esc(o) + '</button>';
      }).join('') + '</div><div class="qa" hidden></div></fieldset></li>';
    }).join('') + '</ol><div class="qresult" role="status" aria-live="polite"></div><button type="button" class="btn btn-ghost btn-sm" id="q-reset">' + esc(t('quiz.reset')) + '</button>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.opt');
      if (b) {
        var i = +b.dataset.q, j = +b.dataset.o, x = QUIZ[i], ok = j === x.a;
        picked[i] = ok;
        var fs = b.closest('fieldset');
        $$('.opt', fs).forEach(function (o) { o.disabled = true; o.classList.toggle('sel', o === b); });
        var qa = $('.qa', fs); qa.hidden = false;
        qa.className = 'qa ' + (ok ? 'right' : 'wrong');
        qa.innerHTML = (ok ? '<b>' + esc(t('quiz.ok')) + '</b> ' : '<b>' + esc(t('quiz.bad')) + '</b> ') + esc(t('quiz.ans')) + ' ' + esc(x.ans) + ' <a href="#/c/' + x.ch + '">' + esc(t('quiz.back', { ch: x.ch })) + '</a>';
        if (Object.keys(picked).length === QUIZ.length) {
          var all = QUIZ.every(function (_, k) { return picked[k]; });
          $('.qresult', el).innerHTML = all ? '<p class="res good">' + esc(t('quiz.all')) + '</p>' : '<p class="res">' + esc(t('quiz.some')) + '</p>';
        }
      }
      if (e.target.id === 'q-reset') W.quiz(el);
    });
  };
  W.calculator = function (el) {
    el.className = 'widget calc';
    el.innerHTML = '<p>' + esc(t('calc.intro')) + '</p>' +
      '<form novalidate><div class="fgrid">' +
      [['buy', t('calc.buy'), t('calc.buy.ph')], ['sell', t('calc.sell'), t('calc.sell.ph')], ['cost', t('calc.cost'), t('calc.cost.ph')]].map(function (f) {
        return '<label>' + esc(f[1]) + '<input name="' + f[0] + '" inputmode="decimal" autocomplete="off" placeholder="' + esc(f[2]) + '"></label>';
      }).join('') + '</div><button class="btn btn-sm" type="submit">' + esc(t('calc.go')) + '</button></form>' +
      '<div class="calc-out" role="status" aria-live="polite"></div>' +
      '<details class="formula"><summary>' + esc(t('calc.formula')) + '</summary><p>' + t('calc.formula.p') + '</p></details>';
    var f = $('form', el), out = $('.calc-out', el);
    function num(v) { v = String(v).trim().replace(/,/g, ''); return /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(v) ? Number(v) : NaN; }
    function fmt(n) { return (Math.round(n * 1e8) / 1e8).toLocaleString(LANG === 'en' ? 'en-US' : 'zh-CN', { maximumFractionDigits: 8 }); }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = num(f.buy.value), s = num(f.sell.value), c = num(f.cost.value);
      if (![b, s, c].every(isFinite) || b <= 0 || c <= 0 || s < 0) {
        out.innerHTML = '<p class="err"><span aria-hidden="true">⚠️</span> ' + esc(t('calc.err')) + '</p>'; return;
      }
      var q = c / b, got = q * s, pnl = got - c, r = pnl / c * 100;
      out.innerHTML = '<dl><div><dt>' + esc(t('calc.qty')) + '</dt><dd>' + fmt(q) + '</dd></div><div><dt>' + esc(t('calc.got')) + '</dt><dd>' + fmt(got) + '</dd></div><div><dt>' + esc(t('calc.pnl')) + '</dt><dd class="' + (pnl >= 0 ? 'pos' : 'neg') + '">' + (pnl >= 0 ? '▲ +' : '▼ ') + fmt(pnl) + '</dd></div><div><dt>' + esc(t('calc.ret')) + '</dt><dd>' + (r >= 0 ? '+' : '') + fmt(r) + '%</dd></div></dl>' +
        '<p class="w-note">' + esc(t('calc.out')) + '</p>';
    });
  };
  W.checklist = function (el) {
    var items = checkItems();
    el.className = 'widget checklist';
    el.innerHTML = '<ul>' + items.map(function (item, i) { return '<li><label><input type="checkbox" data-i="' + i + '"> <span>' + esc(item) + '</span></label></li>'; }).join('') + '</ul>' +
      '<div class="ck-out" role="status" aria-live="polite"></div><button type="button" class="btn btn-ghost btn-sm">' + esc(t('ck.clear')) + '</button>';
    function upd() {
      var all = $$('input', el).every(function (x) { return x.checked; });
      $('.ck-out', el).innerHTML = all ? '<p class="res good">' + esc(t('ck.done')) + '</p>' : '';
    }
    el.addEventListener('change', upd);
    $('button', el).addEventListener('click', function () { $$('input', el).forEach(function (x) { x.checked = false; }); upd(); });
  };
  function slangRows(i) {
    var d = document.createElement('div'); d.innerHTML = chap('13').sections[i].html;
    return $$('tbody tr', d).map(function (tr) { var td = $$('td', tr); return [td[0].textContent, td[1].textContent]; });
  }
  W.slang = function (el) {
    var rows = slangRows(0).map(function (r) { return r.concat('serious'); }).concat(slangRows(1).map(function (r) { return r.concat('meme'); }));
    var mode = 'all';
    el.className = 'widget slang';
    el.innerHTML = '<div class="slang-top"><label class="sr" for="slang-q">' + esc(t('slang.label')) + '</label><input id="slang-q" type="search" placeholder="' + esc(t('slang.ph')) + '"><div class="seg" role="tablist" aria-label="' + esc(t('slang.tabs')) + '">' +
      '<button role="tab" aria-selected="true" data-m="all">' + esc(t('slang.all')) + '</button><button role="tab" aria-selected="false" data-m="serious">' + esc(t('slang.serious')) + '</button><button role="tab" aria-selected="false" data-m="meme">' + esc(t('slang.meme')) + '</button></div></div>' +
      '<p class="w-note slang-meme-note">' + esc(t('slang.note')) + '</p><div class="slang-list" aria-live="polite"></div>';
    var list = $('.slang-list', el), q = $('#slang-q', el);
    function draw() {
      var k = q.value.trim(), terms = k ? expand(k) : [];
      var f = rows.filter(function (r) {
        if (mode !== 'all' && r[2] !== mode) return false;
        if (!terms.length) return true;
        var t = (r[0] + ' ' + r[1]).toLowerCase();
        return terms.some(function (x) { return x && t.indexOf(x) >= 0; });
      });
      list.innerHTML = f.length ? '<p class="w-note">' + esc(t('slang.count', { n: f.length })) + '</p><dl>' + f.map(function (r) {
        return '<div class="term ' + r[2] + '"><dt>' + hl(r[0], terms) + (r[2] === 'meme' ? ' <span class="badge-meme">' + esc(t('slang.badge.m')) + '</span>' : ' <span class="badge-serious">' + esc(t('slang.badge.s')) + '</span>') + '</dt><dd>' + hl(r[1], terms) + '</dd></div>';
      }).join('') + '</dl>' : '<p class="empty">' + esc(t('slang.empty')) + '</p>';
    }
    q.addEventListener('input', draw);
    $$('[data-m]', el).forEach(function (b) {
      b.addEventListener('click', function () { mode = b.dataset.m; $$('[data-m]', el).forEach(function (x) { x.setAttribute('aria-selected', x === b); }); draw(); });
    });
    var qs = (location.hash.split('?')[1] || '').match(/q=([^&]+)/); if (qs) q.value = decodeURIComponent(qs[1]);
    draw();
  };
  W.binancewallet = function (el) {
    var reg = C.exchanges.filter(function (x) { return x.name === 'Binance'; })[0].url;
    var wal = 'https://web3.binance.com/referral?ref=BFSADLNM';
    var items = [
      { title: t('bw.reg'), url: reg, action: t('ex.register') },
      { title: t('bw.wal'), url: wal, action: t('oc.open') }
    ];
    el.className = 'invite-pair';
    el.innerHTML = items.map(function (b) {
      return '<article class="ex-card"><div class="ex-head"><h3>' + esc(b.title) + '</h3></div>' +
        refTag(b.url) +
        '<p class="domain">' + esc(t('ex.domain')) + '<b>' + esc(host(b.url)) + '</b></p>' +
        '<a class="btn btn-sm" href="' + esc(b.url) + '" target="_blank" rel="noopener noreferrer nofollow">' + esc(b.action) + ' ↗<span class="sr">' + esc(t('ex.new', { host: host(b.url) })) + '</span></a></article>';
    }).join('');
  };
  function mountWidgets(root) {
    $$('[data-widget]', root).forEach(function (el) { var f = W[el.dataset.widget]; if (f) f(el); });
    // 话术翻译器挂在第 13 章开头；表格里的玩梗行加「社区调侃」标记
    if (location.hash.indexOf('#/c/13') === 0 && !$('.slang', root)) {
      var w = document.createElement('div'); w.dataset.widget = 'slang';
      var first = $('details.sec', root);
      if (first) {
        first.parentNode.insertBefore(w, first);
        $$('details.sec, .ch-tools, .mtoc', root).forEach(function (d) { d.remove(); });
      } else {
        var reading = $('.course-reader .reading', root);
        var center = $('.course-reader .center', root);
        if (reading) reading.parentNode.insertBefore(w, reading);
        else if (center) center.appendChild(w);
      }
      if (w.parentNode) W.slang(w);
    }
  }

  /* ---------- 页脚 ---------- */
  function footerIcon(name) {
    if (name === 'X') return '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4 3.5h3.4l4 5.5L16.4 3.5H20l-6.6 7.6L20.6 20.5h-3.4l-4.4-6.1-5.2 6.1H3.4l7-8.1L4 3.5Z"/></svg>';
    return '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M21.5 4.4 2.7 11.6c-1.2.5-1.2 1.1-.2 1.4l4.8 1.5 1.9 5.6c.2.7.1 1 .7.9.4 0 .6-.2.9-.4l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4ZM8.7 14.2l8.9-5.6c.4-.2.8 0 .4.3l-7.4 6.7-.3 3.1-1.6-4.5Z"/></svg>';
  }
  function disclaimerParts() {
    var s = t('foot.disclaimer');
    var cut = LANG === 'en' ? s.indexOf('. ') : s.indexOf('。');
    if (cut < 0) return { a: s, b: '' };
    return { a: s.slice(0, cut + 1).trim(), b: s.slice(cut + 1).trim() };
  }
  function renderFooter() {
    var lines = disclaimerParts();
    var pills = (C.contacts || []).map(function (c) {
      return '<a class="footer-pill" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">' + footerIcon(c.name) + '<span>' + esc(c.name + ' ' + c.label) + '</span></a>';
    }).join('');
    $('#footer').innerHTML = '<div class="footer-orb" aria-hidden="true"></div><div class="footer-orb-sm" aria-hidden="true"></div><div class="footer-streak" aria-hidden="true"></div>' +
      '<div class="footer-in"><img class="footer-avatar" src="assets/img/footer-character.webp?v=20261107370000" alt="" width="706" height="668">' +
      '<div class="footer-copy"><p class="footer-d1">' + (LANG === 'en' ? esc(lines.a) : esc(lines.a).replace('，', '，<br>')) + '</p><p class="footer-d2">' + esc(lines.b) + '</p></div>' +
      '<div class="footer-contact"><p>' + esc(t('foot.contact')) + '</p>' + pills + '</div></div>' +
      '<div class="footer-base"><p class="footer-brand"><svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><circle cx="14" cy="16" r="7" fill="#AE8CCF"/><ellipse cx="14" cy="16" rx="13" ry="4.2" fill="none" stroke="#FFDFA8" stroke-width="1.4" transform="rotate(-24 14 16)"/></svg><span>Web3 新手村</span></p>' +
      '<p class="footer-sign">May<span class="footer-heart" aria-hidden="true">♥</span><span class="footer-spark" aria-hidden="true">✦</span></p></div>';
  }

  /* ---------- 顶栏「交易所」快捷入口 ---------- */
  var exsScrollY = 0, exsOpener = null;
  var EXS_BLURB = { Binance: 'exs.binance', Bybit: 'exs.bybit', Gate: 'exs.gate', HTX: 'exs.htx', DeBot: 'exs.debot' };
  var EXS_MARK = { Binance: 'BN', Bybit: 'BY', Gate: 'GT', HTX: 'HX', DeBot: 'DB' };
  function exchangeShortcutsOpen() {
    var root = $('#ex-shortcuts');
    return !!(root && !root.hidden);
  }
  function inviteCodeFromUrl(url) {
    var u, i, v, parts;
    try { u = new URL(url); } catch (e) { return ''; }
    var keys = ['invite_code', 'inviteCode', 'ref', 'referral', 'code'];
    for (i = 0; i < keys.length; i++) {
      v = u.searchParams.get(keys[i]);
      if (v) return v;
    }
    parts = u.pathname.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : '';
  }
  function exchangeShortcutItems() {
    var names = (C && C.exchangeNav) || [];
    return names.map(function (name) {
      var x = null;
      (C.exchanges || []).some(function (e) { if (e.name === name) { x = e; return true; } return false; });
      if (!x) (C.onchain || []).some(function (e) { if (e.name === name) { x = e; return true; } return false; });
      var url = x && x.url ? x.url : '';
      var code = x && x.code ? String(x.code) : (url ? inviteCodeFromUrl(url) : '');
      var enabled = !!(x && url && x.enabled !== false);
      return { name: name, url: enabled ? url : '', code: code, enabled: enabled };
    });
  }
  function setPageInert(on) {
    ['header.topbar', '#main', '#footer'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }
  function ensureExchangeShortcuts() {
    var root = $('#ex-shortcuts');
    if (root) return root;
    root = document.createElement('div');
    root.id = 'ex-shortcuts';
    root.className = 'exs';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'exs-title');
    root.setAttribute('aria-describedby', 'exs-sub');
    root.innerHTML = '<div class="exs-panel"><div class="exs-head"></div><div class="exs-body"></div><p class="sr exs-live" role="status" aria-live="polite"></p></div>';
    document.body.appendChild(root);
    root.addEventListener('click', onExchangeShortcutClick);
    return root;
  }
  function paintExchangeShortcuts() {
    var root = ensureExchangeShortcuts();
    var head = $('.exs-head', root);
    var body = $('.exs-body', root);
    var cards = exchangeShortcutItems().map(function (item) {
      var blurbKey = EXS_BLURB[item.name];
      var blurb = blurbKey ? t(blurbKey) : '';
      var mark = EXS_MARK[item.name] || item.name.slice(0, 2).toUpperCase();
      var codeRow = item.code
        ? '<div class="exs-code"><span class="exs-code-k">' + esc(t('exs.code')) + '</span><code>' + esc(item.code) + '</code><button type="button" class="exs-copy" data-code="' + esc(item.code) + '">' + esc(t('exs.copy')) + '</button></div>'
        : '';
      var go = item.enabled
        ? '<a class="exs-go" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' + esc(t('exs.register')) + '</a>'
        : '<button type="button" class="exs-go" disabled>' + esc(t('exs.register')) + '</button>';
      return '<article class="exs-card"><div class="exs-top"><span class="exs-mark" aria-hidden="true">' + esc(mark) + '</span><div><h3>' + esc(item.name) + '</h3>' +
        (blurb ? '<p>' + esc(blurb) + '</p>' : '') + '</div></div>' + codeRow + go + '</article>';
    }).join('');
    head.innerHTML = '<button type="button" class="exs-x" data-exs-close aria-label="' + esc(t('exs.close')) + '">×</button>' +
      '<h2 id="exs-title">' + esc(t('exs.title')) + '</h2><p id="exs-sub" class="exs-sub">' + esc(t('exs.sub')) + '</p>';
    body.innerHTML = '<div class="exs-grid">' + cards + '</div>';
  }
  function openExchangeShortcuts() {
    var root = ensureExchangeShortcuts();
    if (!root.hidden) { paintExchangeShortcuts(); return; }
    exsOpener = document.activeElement;
    exsScrollY = window.scrollY || window.pageYOffset || 0;
    paintExchangeShortcuts();
    root.hidden = false;
    document.body.style.top = '-' + exsScrollY + 'px';
    document.documentElement.classList.add('exs-open');
    var navBtn = $('#nav-ex');
    if (navBtn) navBtn.setAttribute('aria-expanded', 'true');
    setPageInert(true);
    var x = $('.exs-x', root);
    if (x) x.focus({ preventScroll: true });
  }
  function closeExchangeShortcuts() {
    var root = $('#ex-shortcuts');
    if (!root || root.hidden) return;
    root.hidden = true;
    var navBtn = $('#nav-ex');
    if (navBtn) navBtn.setAttribute('aria-expanded', 'false');
    var y = exsScrollY;
    document.documentElement.classList.remove('exs-open');
    document.body.style.top = '';
    setPageInert(false);
    function pinScroll() {
      var root = document.documentElement;
      var prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, y);
      root.style.scrollBehavior = prev;
    }
    pinScroll();
    if (exsOpener && exsOpener.focus && document.contains(exsOpener)) {
      try { exsOpener.focus({ preventScroll: true }); } catch (err) { exsOpener.focus(); }
    }
    pinScroll();
    requestAnimationFrame(pinScroll);
  }
  function onExchangeShortcutClick(e) {
    if (e.target === e.currentTarget || e.target.closest('[data-exs-close]')) {
      closeExchangeShortcuts();
      return;
    }
    var copyBtn = e.target.closest('.exs-copy');
    if (!copyBtn || copyBtn.disabled) return;
    var code = copyBtn.getAttribute('data-code') || '';
    if (!code) return;
    var live = $('.exs-live', $('#ex-shortcuts'));
    function ok() {
      copyBtn.textContent = t('exs.copied');
      copyBtn.classList.add('is-copied');
      if (live) live.textContent = t('exs.copied');
      if (copyBtn._t) clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(function () {
        if (!copyBtn.isConnected) return;
        copyBtn.textContent = t('exs.copy');
        copyBtn.classList.remove('is-copied');
      }, 1600);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = code;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (err) { copied = false; }
      ta.remove();
      if (copied) ok();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(code).then(ok, fallback);
    else fallback();
  }
  function trapExchangeShortcuts(e) {
    if (e.key !== 'Tab') return;
    var root = $('#ex-shortcuts');
    if (!root) return;
    var nodes = root.querySelectorAll('button, a[href]');
    var list = [];
    Array.prototype.forEach.call(nodes, function (n) {
      if (n.disabled || n.getAttribute('aria-hidden') === 'true') return;
      list.push(n);
    });
    if (!list.length) { e.preventDefault(); return; }
    var first = list[0], last = list[list.length - 1], active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !root.contains(active)) { e.preventDefault(); last.focus(); }
    } else if (active === last || !root.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------- 打赏 ---------- */
  function chainName(d) { return LANG === 'en' ? t('chain.' + d.key) : d.chain; }
  function openDonate() {
    var dlg = $('#donate');
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.id = 'donate'; dlg.setAttribute('aria-labelledby', 'donate-h');
      dlg.innerHTML = '<button class="dlg-x" aria-label="' + esc(t('don.close')) + '">×</button><img class="dlg-avatar" src="assets/img/tip-avatar.webp?v=20261107420000" alt="" width="1254" height="1254">' +
        '<h2 id="donate-h">' + esc(t('don.h')) + '</h2><p class="w-note">' + esc(t('don.p')) + '</p>' +
        '<div class="seg don-tabs" role="tablist" aria-label="' + esc(t('don.tabs')) + '">' + C.donate.map(function (d, i) { return '<button role="tab" aria-selected="' + (i === 0) + '" data-d="' + i + '">' + esc(chainName(d)) + '</button>'; }).join('') + '</div>' +
        C.donate.map(function (d, i) {
          var chain = chainName(d);
          return '<div class="don-pane" data-p="' + i + '"' + (i ? ' hidden' : '') + '><p class="chain">' + esc(t('don.net')) + '<b>' + esc(chain) + '</b></p>' +
            '<img class="qr" src="assets/img/donate-qr-' + d.key + '.svg?v=' + ASSET_V + '" alt="' + esc(t('don.alt', { chain: chain })) + '" width="180" height="180">' +
            '<code class="addr" data-addr="' + esc(d.key) + '">' + (function (a) { var m = Math.ceil(a.length / 2); return '<span class="addr-line">' + esc(a.slice(0, m)) + '</span><br><span class="addr-line">' + esc(a.slice(m)) + '</span>'; })(d.address) + '</code>' +
            '<button class="btn btn-sm copy-addr" data-i="' + i + '">' + esc(t('don.copy')) + '</button>' +
            '<p class="dlg-warn"><span aria-hidden="true">⚠️</span> ' + esc(t('don.warn', { chain: chain })) + '</p></div>';
        }).join('') + '<p class="copied" role="status" aria-live="polite"></p>';
      document.body.appendChild(dlg);
      $('.dlg-x', dlg).addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) {
        if (e.target === dlg) { dlg.close(); return; }
        var tb = e.target.closest('[data-d]');
        if (tb) { $$('[data-d]', dlg).forEach(function (x) { x.setAttribute('aria-selected', x === tb); }); $$('.don-pane', dlg).forEach(function (p) { p.hidden = p.dataset.p !== tb.dataset.d; }); $('.copied', dlg).textContent = ''; }
        var cb = e.target.closest('.copy-addr'); if (!cb) return;
        var addr = C.donate[+cb.dataset.i].address, msg = $('.copied', dlg);
        function ok() { msg.textContent = t('don.ok'); }
        function fallback() { var ta = document.createElement('textarea'); ta.value = addr; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { msg.textContent = t('don.fail'); } ta.remove(); }
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(addr).then(ok, fallback); else fallback();
      });
    }
    $('.copied', dlg).textContent = '';
    dlg.showModal();
  }
  $('#donate-btn').addEventListener('click', openDonate);
  $('#nav-ex').addEventListener('click', function () { openExchangeShortcuts(); });

  /* ---------- Punycode 页面。计算在 js/punycode.js，这里只渲染，用户输入只用 textContent。 ---------- */
  function punyFillMarked(el, text) {
    el.textContent = '';
    var cps = PUNY.codePoints(text), any = false, i, cp, ch, m;
    for (i = 0; i < cps.length; i++) {
      cp = cps[i]; ch = PUNY.fromCodePoint(cp);
      if (cp > 127) {
        any = true;
        m = document.createElement('mark');
        m.className = 'puny-odd';
        m.textContent = ch;
        m.title = PUNY.kindName(cp, LANG) + ' U+' + ('0000' + cp.toString(16).toUpperCase()).slice(-4);
        el.appendChild(m);
      } else el.appendChild(document.createTextNode(ch));
    }
    return any;
  }
  function punyCopy(text, statusEl, okText) {
    function ok() { statusEl.textContent = okText; }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { statusEl.textContent = t('puny.copyfail'); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  }
  function renderPuny() {
    document.title = t('puny.title');
    main.innerHTML = '<div class="puny-page"><nav class="crumbs" aria-label="' + esc(t('crumb.where')) + '"><a href="#/">' + esc(t('crumb.home')) + '</a> › <span>' + esc(t('puny.crumb')) + '</span></nav>' +
      '<h1>' + esc(t('puny.h')) + '</h1>' +
      '<p class="lead">' + esc(t('puny.lead')) + '</p>' +
      '<div class="widget puny">' +
      '<div class="puny-examples"><p class="puny-ex-h">' + esc(t('puny.ex.h')) + '</p><div class="puny-ex-row">' +
      '<button type="button" class="puny-ex" id="puny-ex-latin" aria-pressed="false"><b>' + esc(t('puny.ex.latin')) + '</b><span class="puny-ex-host">binance.com</span><small>' + esc(t('puny.ex.latin.s')) + '</small></button>' +
      '<button type="button" class="puny-ex" id="puny-ex-cyr" aria-pressed="false"><b>' + esc(t('puny.ex.cyr')) + '</b><span class="puny-ex-host">bin<mark class="puny-odd" title="' + esc(t('puny.ex.cyr.mark')) + '">\u0430</mark>nce.com</span><small>' + esc(t('puny.ex.cyr.s')) + '</small></button>' +
      '</div></div>' +
      '<label class="puny-field" for="puny-in">' + esc(t('puny.label')) +
      '<input id="puny-in" type="text" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" placeholder="' + esc(t('puny.ph')) + '"></label>' +
      '<p class="puny-tip">' + esc(t('puny.tip')) + '</p>' +
      '<p class="puny-dir" id="puny-dir" role="status" aria-live="polite"></p>' +
      '<p class="puny-warn" id="puny-warn" hidden></p>' +
      '<p class="puny-user" id="puny-user" hidden></p>' +
      '<div class="puny-out" id="puny-out" hidden>' +
      '<div class="puny-row"><span class="puny-k">' + esc(t('puny.raw')) + '</span><code id="puny-raw"></code></div>' +
      '<div class="puny-row"><span class="puny-k">' + esc(t('puny.uni')) + '</span><p class="puny-odd-host" id="puny-uni"></p><p class="puny-odd-note" id="puny-odd-note" hidden></p><button type="button" class="btn btn-ghost btn-sm" id="puny-copy-uni">' + esc(t('puny.copy.uni')) + '</button></div>' +
      '<div class="puny-row"><span class="puny-k">' + esc(t('puny.ascii')) + '</span><code id="puny-host"></code><button type="button" class="btn btn-ghost btn-sm" id="puny-copy-host">' + esc(t('puny.copy.ascii')) + '</button></div>' +
      '<div class="puny-row" id="puny-url-row" hidden><span class="puny-k" id="puny-url-k">' + esc(t('puny.url')) + '</span><code id="puny-url"></code><button type="button" class="btn btn-ghost btn-sm" id="puny-copy-url">' + esc(t('puny.copy.url')) + '</button></div>' +
      '</div><p class="copied" id="puny-copied" role="status" aria-live="polite"></p></div></div>';
    var input = $('#puny-in'), dir = $('#puny-dir'), warn = $('#puny-warn'), userNote = $('#puny-user'), out = $('#puny-out');
    var rawEl = $('#puny-raw'), uniEl = $('#puny-uni'), noteEl = $('#puny-odd-note'), hostEl = $('#puny-host'), urlEl = $('#puny-url'), urlRow = $('#puny-url-row'), copied = $('#puny-copied');
    var exLatin = $('#puny-ex-latin'), exCyr = $('#puny-ex-cyr');
    var state = { ascii: '', unicode: '', url: '' }, composing = false;
    function setPressed() {
      var v = input.value.replace(/^\s+|\s+$/g, '');
      exLatin.setAttribute('aria-pressed', v === PUNY.EX_LATIN ? 'true' : 'false');
      exCyr.setAttribute('aria-pressed', v === PUNY.EX_CYR ? 'true' : 'false');
    }
    function clearOut() {
      warn.hidden = true; warn.textContent = '';
      userNote.hidden = true; userNote.textContent = '';
      rawEl.textContent = ''; uniEl.textContent = ''; hostEl.textContent = ''; urlEl.textContent = '';
      noteEl.hidden = true; noteEl.textContent = '';
      urlRow.hidden = true; out.hidden = true;
      state.ascii = ''; state.unicode = ''; state.url = '';
    }
    function showEmpty() {
      dir.className = 'puny-dir';
      dir.textContent = t('puny.empty');
      clearOut(); setPressed();
    }
    function showError(msg) {
      dir.className = 'puny-dir err';
      dir.textContent = msg;
      clearOut(); setPressed();
    }
    function run() {
      setPressed();
      var res = PUNY.convert(input.value);
      if (res.empty) return showEmpty();
      if (res.error) return showError(t('perr.' + res.error));
      var msg = t('puny.k.ascii');
      if (res.kind === 'to-ascii' && !/(^|\.)xn--/i.test(res.ascii)) msg = t('puny.k.asciiPlain');
      else if (res.kind === 'to-unicode') msg = t('puny.k.uni');
      else if (res.kind === 'same') msg = t('puny.k.same');
      else if (res.kind === 'mapped') msg = t('puny.k.mapped');
      else if (res.kind === 'ip') msg = t('puny.k.ip');
      dir.className = 'puny-dir';
      dir.textContent = msg;
      if (res.warn) {
        warn.hidden = false;
        warn.textContent = t('puny.warn');
      } else { warn.hidden = true; warn.textContent = ''; }
      if (res.userinfo) {
        userNote.hidden = false;
        userNote.textContent = t('puny.user');
      } else { userNote.hidden = true; userNote.textContent = ''; }
      rawEl.textContent = res.input;
      punyFillMarked(uniEl, res.unicode);
      var note = PUNY.markNote(res.unicode, LANG);
      if (note) { noteEl.hidden = false; noteEl.textContent = note; }
      else { noteEl.hidden = true; noteEl.textContent = ''; }
      hostEl.textContent = res.ascii;
      state.ascii = res.ascii; state.unicode = res.unicode;
      if (res.rebuilt) { urlEl.textContent = res.rebuilt; urlRow.hidden = false; state.url = res.rebuilt; }
      else { urlEl.textContent = ''; urlRow.hidden = true; state.url = ''; }
      out.hidden = false;
    }
    input.addEventListener('compositionstart', function () { composing = true; });
    input.addEventListener('compositionend', function () { composing = false; run(); });
    input.addEventListener('input', function () { copied.textContent = ''; if (!composing) run(); });
    function loadEx(value) { input.value = value; copied.textContent = ''; run(); input.focus(); }
    exLatin.addEventListener('click', function () { loadEx(PUNY.EX_LATIN); });
    exCyr.addEventListener('click', function () { loadEx(PUNY.EX_CYR); });
    $('#puny-copy-host').addEventListener('click', function () { if (state.ascii) punyCopy(state.ascii, copied, t('puny.copied.ascii')); });
    $('#puny-copy-uni').addEventListener('click', function () { if (state.unicode) punyCopy(state.unicode, copied, t('puny.copied.uni')); });
    $('#puny-copy-url').addEventListener('click', function () { if (state.url) punyCopy(state.url, copied, t('puny.copied.url')); });
    showEmpty();
  }

  /* ---------- 首页开场视频 ---------- */
  function mountHero() {
    var vid = $('.hero-video');
    if (!vid || vid.classList.contains('is-still')) return;
    vid.addEventListener('error', function () { vid.classList.add('is-broken'); });
    var p = vid.play();
    if (p && p.catch) p.catch(function () {});
  }
  function prefersReduce() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function onHomeHash() {
    var h = location.hash;
    return document.body.classList.contains('is-home') && (!h || h === '#' || h === '#/');
  }
  var pendingAnchor = '';
  function goToAnchor(id) {
    function scroll() {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: prefersReduce() ? 'auto' : 'smooth', block: 'start' });
    }
    if (onHomeHash()) scroll();
    else {
      pendingAnchor = id;
      if (!location.hash || location.hash === '#' || location.hash === '#/') route();
      else location.hash = '#/';
    }
  }

  /* ---------- 路由 ---------- */
  function route(keep) {
    var h = location.hash, m = h.match(/^#\/c\/(\d\d)(?:\/(\d+))?/);
    $$('.topbar .search-results').forEach(function (b) { b.hidden = true; });
    var rm = h.match(/^#\/r\/(\w+)(?:\/(\d+))?/), cx = /^#\/cex/.test(h), py = /^#\/punycode/.test(h);
    document.body.classList.toggle('is-home', !m && !rm && !cx && !py);
    document.body.classList.toggle('is-reader', !!m);
    if (cx) { renderCex(); if (!keep) window.scrollTo(0, 0); }
    else if (py) { renderPuny(); if (!keep) window.scrollTo(0, 0); }
    else if (rm) renderRoute(rm[1], rm[2] ? +rm[2] : 0, keep);
    else if (m) renderChapter(m[1], m[2] != null ? +m[2] : null, keep);
    else { renderHome(); if (!keep && !pendingAnchor) window.scrollTo(0, 0); }
    setHdr();
    if (!keep && h && h !== '#/' && !(m && m[2])) main.focus({ preventScroll: true });
    setNavOpen(false);
    setMoreOpen(false);
    if (pendingAnchor) {
      var id = pendingAnchor;
      pendingAnchor = '';
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: prefersReduce() ? 'auto' : 'smooth', block: 'start' });
    }
    syncNavTone();
  }
  function applyChrome() {
    document.documentElement.lang = LANG === 'en' ? 'en' : 'zh-CN';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.desc'));
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    var zhB = $('#lang-zh'), enB = $('#lang-en'), group = $('.lang-switch');
    if (zhB) zhB.setAttribute('aria-pressed', LANG === 'zh' ? 'true' : 'false');
    if (enB) enB.setAttribute('aria-pressed', LANG === 'en' ? 'true' : 'false');
    if (group) group.setAttribute('aria-label', t('lang.group'));
    var menuBtn = $('#nav-menu');
    if (menuBtn) {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      var label = $('#nav-menu-label');
      if (label) label.textContent = t(open ? 'nav.menu.close' : 'nav.menu');
      menuBtn.setAttribute('aria-label', t(open ? 'nav.menu.close' : 'nav.menu'));
    }
  }
  function setNavOpen(open) {
    var nav = $('#site-nav'), btn = $('#nav-menu');
    if (!nav || !btn) return;
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var ico = $('.nav-menu-ico', btn);
    if (ico) ico.textContent = open ? '×' : '☰';
    applyChrome();
  }
  function setMoreOpen(open) {
    var panel = $('#more-menu'), btn = $('#nav-more');
    if (!panel || !btn) return;
    panel.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function markNav() {
    var h = location.hash;
    var m = h.match(/^#\/c\/(\d\d)/);
    var id = m ? m[1] : '';
    var key = 'explore';
    if (/^#\/cex/.test(h)) key = 'cex';
    else if (/^#\/punycode/.test(h)) key = 'puny';
    else if (/^#\/r\//.test(h)) key = 'courses';
    else if (id === '14') key = 'tools';
    else if (id === '13') key = 'slang';
    else if (m) key = 'courses';
    else if (document.body.classList.contains('is-home')) {
      var toc = document.getElementById('h-toc');
      key = (toc && toc.getBoundingClientRect().top < Math.min(220, window.innerHeight * 0.35)) ? 'courses' : 'explore';
    }
    $$('#site-nav a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === key) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var more = $('#nav-more');
    if (more) more.classList.toggle('is-current', key === 'cex' || key === 'slang' || key === 'puny');
  }
  function syncNavTone() {
    document.body.classList.add('nav-on-dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0D1022');
    markNav();
  }
  function snapshotInputs() {
    function val(id) { var el = document.getElementById(id); return el ? el.value : null; }
    var modeBtn = document.querySelector('.slang [data-m][aria-selected="true"]');
    return { qTop: val('q-top'), qHome: val('q-home'), slang: val('slang-q'), slangMode: modeBtn ? modeBtn.getAttribute('data-m') : null, cex: val('cex-q'), puny: val('puny-in'), y: window.scrollY };
  }
  function restoreInputs(s) {
    function setv(id, v) {
      if (v == null) return;
      var el = document.getElementById(id);
      if (!el) return;
      el.value = v;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    setv('q-top', s.qTop);
    setv('q-home', s.qHome);
    setv('cex-q', s.cex);
    setv('puny-in', s.puny);
    if (s.slang != null && $('#slang-q')) {
      $('#slang-q').value = s.slang;
      if (s.slangMode && s.slangMode !== 'all') {
        var b = document.querySelector('.slang [data-m="' + s.slangMode + '"]');
        if (b) b.click(); else $('#slang-q').dispatchEvent(new Event('input', { bubbles: true }));
      } else $('#slang-q').dispatchEvent(new Event('input', { bubbles: true }));
    }
    window.scrollTo(0, s.y);
  }
  function setLang(next) {
    if ((next !== 'zh' && next !== 'en') || next === LANG) return;
    var snap = snapshotInputs();
    var dlg = $('#donate'), donateOpen = !!(dlg && dlg.open);
    var exsWas = exchangeShortcutsOpen();
    LANG = next;
    try { localStorage.setItem(LANG_KEY, LANG); } catch (e) { }
    applyCourse();
    applyChrome();
    if (dlg) dlg.remove();
    renderFooter();
    route(true);
    restoreInputs(snap);
    if (donateOpen) openDonate();
    if (exsWas) paintExchangeShortcuts();
    setHdr();
    syncNavTone();
  }
  function setHdr() { document.documentElement.style.setProperty('--hdr', $('.topbar').offsetHeight + 'px'); }
  window.addEventListener('resize', function () {
    setHdr();
    if (window.innerWidth >= 980) setNavOpen(false);
    syncNavTone();
  });
  var navTick = false;
  window.addEventListener('scroll', function () {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(function () { navTick = false; syncNavTone(); });
  }, { passive: true });
  window.addEventListener('hashchange', function () { route(); });
  $('#lang-zh').addEventListener('click', function () { setLang('zh'); });
  $('#lang-en').addEventListener('click', function () { setLang('en'); });
  $('#nav-menu').addEventListener('click', function (e) {
    e.stopPropagation();
    setMoreOpen(false);
    setNavOpen($('#nav-menu').getAttribute('aria-expanded') !== 'true');
  });
  $('#nav-more').addEventListener('click', function (e) {
    e.stopPropagation();
    setNavOpen(false);
    setMoreOpen($('#nav-more').getAttribute('aria-expanded') !== 'true');
  });
  $('#q-top').addEventListener('focus', function () { setMoreOpen(false); });
  document.addEventListener('click', function (e) {
    var scrollA = e.target.closest('[data-scroll]');
    if (scrollA) {
      e.preventDefault();
      goToAnchor(scrollA.getAttribute('data-scroll'));
      setNavOpen(false);
      setMoreOpen(false);
      return;
    }
    var ex = e.target.closest('a[data-nav="explore"]');
    if (ex && onHomeHash()) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReduce() ? 'auto' : 'smooth' });
      setNavOpen(false);
      setMoreOpen(false);
      return;
    }
    if ($('#site-nav') && $('#site-nav').classList.contains('is-open') && !e.target.closest('#site-nav') && !e.target.closest('#nav-menu')) setNavOpen(false);
    if ($('#more-menu') && $('#more-menu').classList.contains('is-open') && !e.target.closest('#more-menu') && !e.target.closest('#nav-more')) setMoreOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (exchangeShortcutsOpen()) {
      if (e.key === 'Escape') { e.preventDefault(); closeExchangeShortcuts(); return; }
      trapExchangeShortcuts(e);
      return;
    }
    if (e.key === 'Escape') { setNavOpen(false); setMoreOpen(false); }
  });
  $('#site-nav').addEventListener('click', function (e) {
    if (e.target.closest('a, button')) { setNavOpen(false); setMoreOpen(false); }
  });
  applyCourse();
  applyChrome();
  renderFooter();
  route();
})();
