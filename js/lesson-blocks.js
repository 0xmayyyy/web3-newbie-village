/* Chapter 01 lesson shell. Structure and CSS match demo-b (night) and demo-a (day).
   Module titles are the only added words. Lesson sentences stay the site's own. */
(function (global) {
  var LABELS = {
    intro: { zh: '介绍', en: 'Introduction', eye: 'INTRODUCTION' },
    diagram: { zh: '图解', en: 'Diagram', eye: 'DIAGRAM' },
    example: { zh: '例子', en: 'Example', eye: 'EXAMPLE' },
    risk: { zh: '风险提醒', en: 'Risk note', eye: 'RISK NOTE' },
    quiz: { zh: '小测', en: 'Short quiz', eye: 'QUIZ' }
  };
  var ICONS = ['book', 'code', 'chart', 'cube', 'grid', 'check'];
  var SPRITE = "<svg aria-hidden=\"true\" style=\"position:absolute;width:0;height:0;overflow:hidden\"><defs>\n<symbol id=\"lb-compass\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"17\" fill=\"none\" stroke=\"currentColor\" stroke-width=\".7\"/><path d=\"M20 1l4.4 14.6L39 20l-14.6 4.4L20 39l-4.4-14.6L1 20l14.6-4.4z\" fill=\"currentColor\" opacity=\".85\"/><path d=\"M20 7v26M7 20h26\" stroke=\"#151222\" stroke-width=\".8\"/><circle cx=\"20\" cy=\"20\" r=\"3\" fill=\"#151222\"/></symbol>\n<symbol id=\"lb-book\" viewBox=\"0 0 24 24\"><path d=\"M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1zm0 0v15\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-code\" viewBox=\"0 0 24 24\"><path d=\"M8 6l-6 6 6 6m8-12l6 6-6 6M14 3l-4 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-chart\" viewBox=\"0 0 24 24\"><path d=\"M3 3v18h18M6 15l5-5 4 3 6-8m-5 0h5v5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-cube\" viewBox=\"0 0 24 24\"><path d=\"M12 2L3 7v10l9 5 9-5V7zm0 0v10m-9-5l9 5 9-5m-9 5v10\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-bulb\" viewBox=\"0 0 24 24\"><path d=\"M8 16c0-3-3-3-3-7a7 7 0 0114 0c0 4-3 4-3 7M8 18h8m-7 3h6M12 5v5m-3-2l3 2 3-2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"lb-clock\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M12 6v6l4 2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"lb-sound\" viewBox=\"0 0 24 24\"><path d=\"M4 9h4l5-4v14l-5-4H4zM17 8c2 2 2 6 0 8m3-11c4 4 4 10 0 14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"lb-bookmark\" viewBox=\"0 0 24 24\"><path d=\"M6 3h12v18l-6-4-6 4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-check\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M7 12l3 3 7-7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"lb-lock\" viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"11\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M8 10V7a4 4 0 018 0v3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/></symbol>\n<symbol id=\"lb-menu\" viewBox=\"0 0 24 24\"><path d=\"M4 6h16M4 12h16M4 18h16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"lb-grid\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/></symbol>\n</defs></svg>";
  var current = null;

  function kindOf(tag, className, text) {
    tag = String(tag || '').toUpperCase();
    className = className || '';
    var flat = String(text || '').replace(/\s+/g, ' ').trim();
    if (/(^|\s)quiz(\s|$)/.test(className)) return 'quiz';
    if (tag === 'TABLE' || className.indexOf('table-wrap') >= 0) return 'diagram';
    if (tag === 'UL' || tag === 'OL') return 'example';
    if (tag !== 'P') return 'intro';
    if (/白皮书原文|bitcoin\.org|white paper\?/i.test(flat)) return 'example';
    if (/^「记录防篡改」也不等于|^A record that resists tampering does not mean/.test(flat)) return 'risk';
    if (/^但「Web3」标签不保证|^But a Web3 label does not mean/.test(flat)) return 'risk';
    if (/^代码会有漏洞|^Code can have bugs/.test(flat)) return 'risk';
    if (/^价格上涨不一定代表|^A rising price does not necessarily mean/.test(flat)) return 'risk';
    return 'intro';
  }

  function label(kind, lang) {
    var row = LABELS[kind] || LABELS.intro;
    return lang === 'en' ? row.en : row.zh;
  }

  function eye(kind) {
    return (LABELS[kind] || LABELS.intro).eye;
  }

  function plan(blocks) {
    var lead = -1;
    var kinds = blocks.map(function (block, index) {
      var kind = kindOf(block.tag, block.className, block.text);
      if (lead < 0 && kind !== 'quiz' && String(block.tag || '').toUpperCase() === 'P') lead = index;
      return kind;
    });
    return kinds.map(function (kind, index) {
      if (index === lead) return 'hero';
      if (kind === 'quiz') return 'quiz';
      if (kind === 'risk') return 'takeaway';
      return 'tab';
    });
  }

  function splitSentences(text, lang) {
    var flat = String(text || '').replace(/\s+/g, ' ').trim();
    var parts = [];
    var buf = '';
    var i;
    for (i = 0; i < flat.length; i++) {
      buf += flat[i];
      var ch = flat[i];
      var end = false;
      if ('。！？'.indexOf(ch) >= 0) end = true;
      else if (lang === 'en' && (ch === '.' || ch === '!' || ch === '?')) {
        var prev = flat[i - 1] || '';
        var next = flat[i + 1] || '';
        if (ch === '.' && /\d/.test(prev) && /\d/.test(next)) end = false;
        else if (next && /[A-Za-z0-9]/.test(next)) end = false;
        else end = true;
      }
      if (end) {
        if (buf.trim()) parts.push(buf.trim());
        buf = '';
      }
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts;
  }

  function blockIsRich(block) {
    var tag = String(block.tag || '').toUpperCase();
    var cls = String(block.className || '');
    if (tag === 'UL' || tag === 'OL' || tag === 'TABLE') return true;
    if (cls.indexOf('table-wrap') >= 0) return true;
    if (block.el && block.el.querySelector && block.el.querySelector('a, table, ul, ol, img')) return true;
    if (/<a\b|<table\b|<ul\b|<ol\b/i.test(block.raw || '')) return true;
    return false;
  }

  function isExampleSentence(sentence) {
    return /^(例如|比如|for example\b|e\.g\.)/i.test(String(sentence || '').trim());
  }

  function splitClaim(sentence, lang) {
    var s = String(sentence || '').trim();
    if (lang !== 'en') {
      var at = s.indexOf('，');
      if (at > 1 && at < s.length - 1) return { title: s.slice(0, at + 1), body: s.slice(at + 1).trim() };
      return { title: '', body: s };
    }
    var i;
    for (i = 0; i < s.length; i++) {
      if (s.charAt(i) !== ',') continue;
      var prev = s.charAt(i - 1);
      var after = s.slice(i + 1);
      if (/\d/.test(prev) && /^\s*\d/.test(after)) continue;
      if (i > 1 && i < s.length - 2) return { title: s.slice(0, i + 1).trim(), body: after.trim() };
    }
    return { title: '', body: s };
  }

  function shortLabel(sentence, fallback) {
    var s = String(sentence || '').replace(/[「」"'“”]/g, '').replace(/^[📄\s]+/, '').trim();
    var cut = s.split(/[，,、：:。！？!?]/)[0].trim();
    var max = /[A-Za-z]/.test(cut) ? 24 : 8;
    if (cut.length > max) cut = cut.slice(0, max).trim();
    if (cut.length < 2) return fallback;
    return cut;
  }

  /* One role card per sentence, in the demo's order: heading, explanation, example line.
     A risk paragraph is the takeaway. An 例如 sentence hangs on the previous card. */
  function cardsFromBlocks(blocks, lang) {
    var where = plan(blocks);
    var cards = [];
    var tip = null;
    blocks.forEach(function (block, index) {
      var slot = where[index];
      if (slot === 'hero' || slot === 'quiz') return;
      var kind = kindOf(block.tag, block.className, block.text);
      if (slot === 'takeaway') {
        tip = { index: index, kind: 'risk', text: block.text || '' };
        return;
      }
      if (blockIsRich(block)) {
        cards.push({ index: index, kind: kind, rich: true, heading: '', body: '', example: '', tabFrom: block.text || '' });
        return;
      }
      splitSentences(block.text, lang).forEach(function (sentence) {
        if (isExampleSentence(sentence) && cards.length && !cards[cards.length - 1].rich && !cards[cards.length - 1].example) {
          cards[cards.length - 1].example = sentence;
          cards[cards.length - 1].exampleIndex = index;
          return;
        }
        var claim = splitClaim(sentence, lang);
        cards.push({
          index: index,
          kind: kind,
          rich: false,
          heading: claim.title,
          body: claim.body,
          example: '',
          tabFrom: sentence
        });
      });
    });
    return { cards: cards, tip: tip };
  }

  function layoutPieces(blocks, lang) {
    var built = cardsFromBlocks(blocks, lang);
    var where = plan(blocks);
    var pieces = [];
    blocks.forEach(function (block, index) {
      if (where[index] === 'hero' || where[index] === 'quiz') {
        pieces.push({ index: index, slot: where[index], role: where[index], text: block.text || '' });
      }
    });
    if (built.tip) pieces.push({ index: built.tip.index, slot: 'takeaway', role: 'tip', text: built.tip.text });
    built.cards.forEach(function (card) {
      if (card.rich) {
        pieces.push({ index: card.index, slot: 'tab', role: 'body', text: blocks[card.index].text || '' });
        return;
      }
      if (card.heading) pieces.push({ index: card.index, slot: 'tab', role: 'title', text: card.heading });
      if (card.body) pieces.push({ index: card.index, slot: 'tab', role: 'text', text: card.body });
      if (card.example) pieces.push({ index: card.exampleIndex != null ? card.exampleIndex : card.index, slot: 'tab', role: 'example', text: card.example });
    });
    return pieces;
  }

  function uiPack(lang) {
    var en = lang === 'en';
    return {
      universe: en ? 'Explore the universe' : '探索宇宙',
      learn: en ? 'Learning center' : '学习中心',
      lab: en ? 'Market lab' : '行情实验室',
      back: en ? 'Explore every planet' : '探索全部星球',
      journey: 'YOUR LEARNING JOURNEY',
      menu: en ? 'Lesson list' : '课程目录',
      save: en ? 'Save a note' : '收藏笔记',
      saved: en ? 'Saved' : '已收藏',
      day: en ? 'Day mode' : '日间模式',
      night: en ? 'Night mode' : '夜间模式',
      toDay: en ? 'Switch to day mode' : '切换至日间模式',
      toNight: en ? 'Switch to night mode' : '切换至夜间模式',
      caption: en ? 'Open a card to read the original text of this lesson.' : '点开卡片，查看这一节的原文。',
      quizBadge: en ? 'Checked as soon as you answer' : '一点就对答案',
      progress: function (n, m) { return en ? 'Finished ' + n + ' / ' + m + ' lessons' : '已完成 ' + n + ' / ' + m + ' 节'; },
      minutes: function (n) { return en ? 'About ' + n + ' min' : '约 ' + n + ' 分钟'; },
      eyebrow: function (n) { return 'CHAPTER 01 · LESSON ' + n; },
      nav: en ? 'Main' : '主导航',
      lessons: en ? 'Lessons' : '课程目录'
    };
  }

  function minutesOf(text, lang) {
    var n = String(text || '').replace(/\s+/g, '').length;
    var rate = lang === 'en' ? 800 : 280;
    var m = Math.round(n / rate);
    if (m < 2) m = 2;
    if (m > 8) m = 8;
    return m;
  }

  function headline(title, esc) {
    var keys = ['加密货币', '智能合约', '稳定币', '区块链', '关系表', '比特币', 'crypto scene', 'cryptocurrency', 'smart contract', 'public chain', 'stablecoin', 'blockchain', '币圈', '代币', '公链', '钱包', '价格', 'Web3', 'Bitcoin', 'token', 'table', 'BTC', 'ETH'];
    var best = '';
    var at = -1;
    keys.forEach(function (key) {
      var i = title.indexOf(key);
      if (i < 0 || key.length <= best.length) return;
      var before = i > 0 ? title.charAt(i - 1) : '';
      var after = title.charAt(i + key.length) || '';
      if (/[A-Za-z0-9]/.test(before) || /[A-Za-z0-9]/.test(after)) return;
      best = key;
      at = i;
    });
    if (!best) {
      var plain = title.replace(/[？?！!。.]/g, '');
      best = plain.slice(0, Math.min(4, plain.length)) || title;
      at = title.indexOf(best);
    }
    var before = title.slice(0, at);
    var after = title.slice(at + best.length);
    var em = '<em>' + esc(best) + '</em>';
    if (!before.trim()) return em + (after ? '<br>' + esc(after) : '');
    return esc(before) + '<br>' + em + esc(after);
  }

  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#lb-' + name + '"/></svg>';
  }

  function art(type) {
    if (type === 'chain') {
      return '<div class="chain-art">' + [1, 2, 3].map(function (n) {
        return (n > 1 ? '<div class="chain-dash"></div>' : '') + '<div class="block">' + icon('cube') + '<span>BLOCK ' + n + '</span></div>';
      }).join('') + '</div>';
    }
    if (type === 'wallet') {
      return '<div class="orbit two"></div><div class="wallet-art"><div class="wallet-flap">' + icon('lock') + '</div></div>';
    }
    return '<div class="orbit two"></div><div class="planet"><span class="planet-label">Web3</span></div><div class="orbit"></div>' +
      '<span class="orbit-star" style="top:42px;left:49px"></span>' +
      '<span class="orbit-star" style="top:20px;left:51%"></span>' +
      '<span class="orbit-star" style="bottom:39px;right:70px"></span>' +
      '<div class="satellite s1">' + icon('book') + '</div>' +
      '<div class="satellite s2">' + icon('code') + '</div>' +
      '<div class="satellite s3">' + icon('chart') + '</div>' +
      '<div class="satellite s4">' + icon('cube') + '</div>';
  }

  function mode() {
    try { return localStorage.getItem('w3nv-lb-mode') === 'day' ? 'day' : 'night'; } catch (e) { return 'night'; }
  }

  function sun() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
  }
  function moon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 14.2A9 9 0 019.8 3.4a9 9 0 1010.8 10.8z"/></svg>';
  }

  function paintTheme(root) {
    var day = root.getAttribute('data-mode') === 'day';
    document.body.classList.toggle('is-lb-day', day);
    var button = root.querySelector('#lb-mode');
    var pack = root._lb && root._lb.pack;
    if (!button || !pack) return;
    button.innerHTML = (day ? sun() : moon()) + '<span class="theme-label">' + (day ? pack.day : pack.night) + '</span>';
    button.setAttribute('aria-pressed', day ? 'true' : 'false');
    button.setAttribute('aria-label', day ? pack.toNight : pack.toDay);
  }

  function bookKey(index) { return '01-' + index; }
  function readBooks() {
    try {
      var raw = JSON.parse(localStorage.getItem('w3nv-lb-bookmarks') || '[]');
      return Array.isArray(raw) ? raw : [];
    } catch (e) { return []; }
  }

  function paintSave(root) {
    var btn = root.querySelector('#lb-save');
    var pack = root._lb && root._lb.pack;
    var index = root._lb && root._lb.index;
    if (!btn || !pack) return;
    var on = readBooks().indexOf(bookKey(index)) >= 0;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    var span = btn.querySelector('span');
    if (span) span.textContent = on ? pack.saved : pack.save;
  }

  function sync() {
    var root = document.querySelector('.lb-root');
    if (!root || !root._lb) return;
    var ctx = root._lb;
    var passedN = 0;
    root.querySelectorAll('.lesson-link').forEach(function (btn) {
      var i = +btn.getAttribute('data-sec');
      var passed = ctx.passed(i);
      var open = ctx.canEnter(i);
      if (passed) passedN++;
      btn.classList.toggle('completed', passed);
      btn.classList.toggle('active', i === ctx.index);
      btn.classList.toggle('locked', !open);
      btn.disabled = !open;
      if (i === ctx.index) btn.setAttribute('aria-current', 'step');
      else btn.removeAttribute('aria-current');
      var node = btn.querySelector('.node');
      if (node) node.textContent = passed ? '✓' : '';
    });
    var pct = ctx.total ? Math.round(passedN / ctx.total * 100) : 0;
    var bar = root.querySelector('#lb-progress');
    var mobile = root.querySelector('#lb-mobile-progress');
    if (bar) bar.style.width = pct + '%';
    if (mobile) mobile.style.width = pct + '%';
    var text = root.querySelector('#lb-progress-text');
    var percent = root.querySelector('#lb-progress-percent');
    if (text) text.textContent = ctx.pack.progress(passedN, ctx.total);
    if (percent) percent.textContent = pct + '%';
    var status = root.querySelector('#lb-status');
    if (status) status.textContent = ctx.passed(ctx.index) ? ctx.nextLabel : ctx.lockedLabel;
  }

  function dressQuiz(quiz, pack, esc) {
    var header = document.createElement('div');
    header.className = 'quiz-header';
    var heading = document.createElement('div');
    heading.className = 'quiz-heading';
    heading.innerHTML = icon('check');
    var h3 = quiz.querySelector('h3');
    if (h3) heading.appendChild(h3);
    else heading.appendChild(document.createTextNode(label('quiz', quiz.lang || 'zh')));
    var badge = document.createElement('span');
    badge.className = 'quiz-badge';
    badge.textContent = pack.quizBadge;
    header.appendChild(heading);
    header.appendChild(badge);
    quiz.insertBefore(header, quiz.firstChild);
    var q = quiz.querySelector('p');
    if (q) q.classList.add('question');
    var answers = document.createElement('div');
    answers.className = 'answers';
    answers.setAttribute('role', 'group');
    var feedback = quiz.querySelector('.feedback');
    quiz.querySelectorAll('.option').forEach(function (btn) {
      btn.classList.add('answer');
      answers.appendChild(btn);
    });
    if (feedback) quiz.insertBefore(answers, feedback);
    else quiz.appendChild(answers);
  }

  function render(main, ctx) {
    var lang = ctx.lang === 'en' ? 'en' : 'zh';
    var esc = ctx.esc;
    var pack = uiPack(lang);
    var parsed = new DOMParser().parseFromString('<div id="lb-src">' + (ctx.html || '') + '</div>', 'text/html');
    var src = parsed.getElementById('lb-src');
    var nodes = Array.prototype.filter.call(src.children, function (el) { return el.nodeType === 1; });
    var described = nodes.map(function (el) {
      return { tag: el.tagName, className: typeof el.className === 'string' ? el.className : '', text: el.textContent || '', el: el };
    });
    var where = plan(described);
    var built = cardsFromBlocks(described, lang);
    var lead = null;
    var quiz = null;
    described.forEach(function (block, index) {
      if (where[index] === 'hero') lead = block.el;
      else if (where[index] === 'quiz') quiz = block.el;
    });
    var cards = built.cards;
    var tip = built.tip;
    var day = mode() === 'day';
    var artType = ['planet', 'chain', 'wallet'][ctx.index % 3];
    var lessonNo = ('0' + (ctx.pos + 1)).slice(-2);
    var sectionKind = 'intro';
    cards.forEach(function (card) { if (card.kind === 'diagram') sectionKind = 'diagram'; });
    var savedOn = readBooks().indexOf(bookKey(ctx.index)) >= 0;
    var listen = (ctx.listen || '听这节').replace(/^🔊\s*/, '');
    var rows = ctx.sections.map(function (item) {
      var passed = ctx.passed(item.i);
      var open = ctx.canEnter(item.i);
      var cls = 'lesson-link' + (item.i === ctx.index ? ' active' : '') + (passed ? ' completed' : '') + (open ? '' : ' locked');
      return '<li><button type="button" class="' + cls + '"' + (open ? '' : ' disabled') + (item.i === ctx.index ? ' aria-current="step"' : '') + ' data-sec="' + item.i + '"><span class="node">' + (passed ? '✓' : '') + '</span><span>' + esc(item.title) + '</span>' + (open ? '' : icon('lock', 'lock')) + '</button></li>';
    }).join('');
    var passedN = 0;
    ctx.sections.forEach(function (item) { if (ctx.passed(item.i)) passedN++; });
    var pct = ctx.total ? Math.round(passedN / ctx.total * 100) : 0;
    main.innerHTML =
      '<div class="lb-root lesson-blocks"' + (day ? ' data-mode="day"' : '') + '>' +
      SPRITE +
      '<header class="topbar"><a class="brand" href="#/">' + icon('compass', 'brand-icon') +
      '<div><strong>' + esc(ctx.brand || 'Web3 新手村') + '</strong><small>A LITTLE STEP INTO WEB3</small></div></a>' +
      '<nav class="topnav" aria-label="' + esc(pack.nav) + '">' +
      '<a href="#/">' + esc(pack.universe) + '</a>' +
      '<a class="active" href="#/c/01/0">' + esc(pack.learn) + '</a>' +
      '<a href="#/lab">' + esc(pack.lab) + '</a></nav>' +
      '<div class="top-right"><div class="lb-lang" role="group" aria-label="语言">' +
      '<button type="button" id="lb-lang-zh" aria-pressed="' + (lang === 'zh' ? 'true' : 'false') + '">中</button>' +
      '<button type="button" id="lb-lang-en" aria-pressed="' + (lang === 'en' ? 'true' : 'false') + '">EN</button></div>' +
      '<button type="button" class="theme-switch" id="lb-mode"></button>' +
      '<span class="avatar" aria-hidden="true">M</span>' +
      '<button type="button" class="mobilebar" id="lb-menu" aria-expanded="false" aria-controls="lb-sidebar">' + icon('menu') + esc(pack.menu) + '</button></div></header>' +
      '<div class="mobile-progress" aria-hidden="true"><span id="lb-mobile-progress" style="width:' + pct + '%"></span></div>' +
      '<div class="scrim" id="lb-scrim"></div>' +
      '<div class="shell"><aside class="sidebar" id="lb-sidebar" aria-label="' + esc(pack.lessons) + '">' +
      '<a class="back-home" href="#/">' + icon('grid') + esc(pack.back) + '</a>' +
      '<div class="sidebar-label">' + esc(pack.journey) + '</div>' +
      '<div class="course-heading">' + esc(ctx.planetName || '') + '</div>' +
      '<div class="course-sub">' + esc(ctx.planetSub || '') + '</div>' +
      '<div class="progress-line"><span id="lb-progress" style="width:' + pct + '%"></span></div>' +
      '<div class="progress-caption"><span id="lb-progress-text">' + esc(pack.progress(passedN, ctx.total)) + '</span><span id="lb-progress-percent">' + pct + '%</span></div>' +
      '<div class="chapter"><span>01</span>' + esc(ctx.chapterTitle || '') + '</div>' +
      '<ol class="lesson-list">' + rows + '</ol>' +
      '<div class="sidebar-bottom"><div class="sidebar-note"><p>' + esc(ctx.tip || '') + '</p></div></div></aside>' +
      '<main class="content-wrap"><div class="content reading" id="reader-prose">' +
      '<div class="breadcrumb"><a href="#/">' + esc(pack.universe) + '</a><i>/</i><span>' + esc(ctx.planetName || '') + '</span><i>/</i><span>' + esc(ctx.title || '') + '</span></div>' +
      '<div class="lesson-meta"><span class="eyebrow">' + esc(pack.eyebrow(lessonNo)) + '</span><span class="duration">' + icon('clock') + '<span>' + esc(pack.minutes(minutesOf(src.textContent, lang))) + '</span></span></div>' +
      '<section class="hero" aria-labelledby="lb-title"><div class="hero-copy"><h1 id="lb-title">' + headline(ctx.title || '', esc) + '</h1>' +
      '<p>' + esc(lead ? lead.textContent.replace(/\s+/g, ' ').trim() : '') + '</p>' +
      '<div class="hero-tools"><button type="button" class="pill" id="listen-toggle" aria-pressed="false">' + icon('sound') + '<span>' + esc(listen) + '</span></button>' +
      '<span class="listen-live" id="listen-live" hidden><button type="button" class="pill" id="listen-stop">' + esc(ctx.stopLabel || '停止') + '</button></span>' +
      '<button type="button" class="pill" id="lb-save" aria-pressed="' + (savedOn ? 'true' : 'false') + '">' + icon('bookmark') + '<span>' + esc(savedOn ? pack.saved : pack.save) + '</span></button></div></div>' +
      '<div class="hero-art" aria-hidden="true">' + art(artType) + '</div></section>' +
      (cards.length ? '<section class="section" aria-labelledby="lb-section"><div class="section-heading"><span class="marker"></span><h2 id="lb-section">' + esc(label(sectionKind, lang)) + '</h2></div><p class="section-caption">' + esc(pack.caption) + '</p><div class="role-tabs" id="lb-tabs" role="tablist"></div><div id="lb-panels"></div></section>' : '') +
      (tip ? '<aside class="takeaway" id="lb-takeaway">' + icon('bulb', 'takeaway-icon') + '<div><b>' + esc(label('risk', lang)) + '</b><div id="lb-takeaway-body"></div></div></aside>' : '') +
      '<div id="lb-quiz-slot"></div>' +
      '<div class="lesson-footer"><div class="footer-status"><button type="button" class="lb-prev" id="reader-prev"' + (ctx.atStart ? ' disabled' : '') + '>' + esc(ctx.prevLabel || '') + '</button><strong id="lb-status">' + esc(ctx.passed(ctx.index) ? ctx.nextLabel : ctx.lockedLabel) + '</strong></div>' +
      '<button type="button" class="next-button" id="reader-next"' + (ctx.ended ? ' disabled' : '') + '>' + esc(ctx.passed(ctx.index) ? ctx.nextLabel : ctx.lockedLabel) + '</button></div>' +
      '</div><footer class="site-note"><span>' + esc(ctx.disclaimer || '') + '</span><span>' + esc(ctx.privacy || '') + '</span></footer></main></div></div>';

    var root = main.querySelector('.lb-root');
    root._lb = {
      pack: pack,
      index: ctx.index,
      total: ctx.total,
      passed: ctx.passed,
      canEnter: ctx.canEnter,
      nextLabel: ctx.nextLabel,
      lockedLabel: ctx.lockedLabel
    };
    current = root._lb;
    paintTheme(root);

    var tabsHost = root.querySelector('#lb-tabs');
    var panelsHost = root.querySelector('#lb-panels');
    if (tabsHost && panelsHost) {
      var roleIcons = ['book', 'code', 'chart', 'cube'];
      cards.forEach(function (card, index) {
        var kind = card.kind || 'intro';
        var headingText = card.heading || label(kind, lang);
        var tabText = shortLabel(card.heading || card.tabFrom || card.body, label(kind, lang));
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'role-tab';
        btn.id = 'lb-tab-' + index;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        btn.setAttribute('aria-controls', 'lb-panel-' + index);
        btn.tabIndex = index === 0 ? 0 : -1;
        btn.innerHTML = icon(kind === 'diagram' ? 'chart' : kind === 'example' ? 'cube' : roleIcons[index % roleIcons.length]) + esc(tabText);
        tabsHost.appendChild(btn);
        var panel = document.createElement('div');
        panel.className = 'role-detail' + (index === 0 ? '' : ' hidden');
        panel.id = 'lb-panel-' + index;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', btn.id);
        var copy = document.createElement('div');
        copy.className = 'role-copy';
        if (card.rich) {
          copy.appendChild(described[card.index].el);
        } else {
          var para = document.createElement('p');
          if (card.body) para.appendChild(document.createTextNode(card.body));
          if (card.example) {
            var ex = document.createElement('span');
            ex.className = 'detail-example';
            ex.textContent = card.example;
            para.appendChild(ex);
          }
          if (para.childNodes.length) copy.appendChild(para);
        }
        panel.innerHTML = '<div><div class="detail-label">' + esc(eye(kind)) + '</div><h3>' + esc(headingText) + '</h3></div>';
        panel.appendChild(copy);
        panelsHost.appendChild(panel);
      });
      function show(index, focus) {
        var buttons = tabsHost.querySelectorAll('.role-tab');
        var panels = panelsHost.querySelectorAll('.role-detail');
        buttons.forEach(function (btn, i) {
          var on = i === index;
          btn.setAttribute('aria-selected', on ? 'true' : 'false');
          btn.tabIndex = on ? 0 : -1;
        });
        panels.forEach(function (panel, i) { panel.classList.toggle('hidden', i !== index); });
        if (focus && buttons[index]) buttons[index].focus();
      }
      tabsHost.addEventListener('click', function (e) {
        var btn = e.target.closest('.role-tab');
        if (!btn) return;
        show(+btn.id.replace('lb-tab-', ''), false);
      });
      tabsHost.addEventListener('keydown', function (e) {
        var buttons = Array.prototype.slice.call(tabsHost.querySelectorAll('.role-tab'));
        var currentIndex = buttons.findIndex(function (btn) { return btn.getAttribute('aria-selected') === 'true'; });
        var next = null;
        if (e.key === 'ArrowRight') next = (currentIndex + 1) % buttons.length;
        if (e.key === 'ArrowLeft') next = (currentIndex - 1 + buttons.length) % buttons.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = buttons.length - 1;
        if (next == null) return;
        e.preventDefault();
        show(next, true);
      });
    }

    var takeBody = root.querySelector('#lb-takeaway-body');
    if (takeBody && tip) {
      var tipPara = document.createElement('p');
      tipPara.textContent = String(tip.text || '').replace(/\s+/g, ' ').trim();
      takeBody.appendChild(tipPara);
    }
    if (quiz) {
      quiz.lang = lang;
      dressQuiz(quiz, pack, esc);
      root.querySelector('#lb-quiz-slot').appendChild(quiz);
    }

    function menu(open) {
      var side = root.querySelector('#lb-sidebar');
      var scrim = root.querySelector('#lb-scrim');
      var button = root.querySelector('#lb-menu');
      if (side) side.classList.toggle('open', open);
      if (scrim) scrim.classList.toggle('open', open);
      if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    var menuBtn = root.querySelector('#lb-menu');
    if (menuBtn) menuBtn.addEventListener('click', function () { menu(!root.querySelector('#lb-sidebar').classList.contains('open')); });
    var scrim = root.querySelector('#lb-scrim');
    if (scrim) scrim.addEventListener('click', function () { menu(false); });
    root.querySelectorAll('.lesson-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        menu(false);
        location.hash = '#/c/01/' + btn.getAttribute('data-sec');
      });
    });
    var themeBtn = root.querySelector('#lb-mode');
    if (themeBtn) themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-mode') === 'day' ? 'night' : 'day';
      if (next === 'day') root.setAttribute('data-mode', 'day');
      else root.removeAttribute('data-mode');
      try { localStorage.setItem('w3nv-lb-mode', next); } catch (e) {}
      paintTheme(root);
    });
    function clickLang(id) {
      var real = document.getElementById(id);
      if (real) real.click();
    }
    var zh = root.querySelector('#lb-lang-zh');
    var en = root.querySelector('#lb-lang-en');
    if (zh) zh.addEventListener('click', function () { clickLang('lang-zh'); });
    if (en) en.addEventListener('click', function () { clickLang('lang-en'); });
    var save = root.querySelector('#lb-save');
    if (save) save.addEventListener('click', function () {
      var list = readBooks();
      var key = bookKey(ctx.index);
      var at = list.indexOf(key);
      if (at >= 0) list.splice(at, 1);
      else list.push(key);
      try { localStorage.setItem('w3nv-lb-bookmarks', JSON.stringify(list)); } catch (e) {}
      paintSave(root);
    });
    sync();
  }

  global.LESSON_BLOCKS = {
    kindOf: kindOf,
    label: label,
    plan: plan,
    layoutPieces: layoutPieces,
    render: render,
    sync: sync,
    LABELS: LABELS
  };
})(typeof window !== 'undefined' ? window : globalThis);
