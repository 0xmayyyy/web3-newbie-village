(function () {
  'use strict';
  var D = window.SITE_DATA, C = window.SITE_CONFIG;
  var CH = D.chapters;
  var main = document.getElementById('main');
  var KEY = 'w3nv-progress-v1';

  /* ---------- 工具函数 ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function host(u) { try { return new URL(u).host; } catch (e) { return u; } }
  function chap(id) { for (var i = 0; i < CH.length; i++) if (CH[i].id === id) return CH[i]; }
  function tagClass(t) { return { '基础': 't-basic', '进阶': 't-adv', '必读': 't-must', '导航': 't-nav', '操作': 't-op', '词典': 't-dict', '故障处理': 't-help', '复习': 't-rev' }[t] || ''; }
  function tags(c) { return c.tags.map(function (t) { return '<span class="tag ' + tagClass(t) + '">' + esc(t) + '</span>'; }).join(''); }
  var ROUTES = [
    { icon: '🧸', name: '我完全不懂', ids: ['01', '02', '03', '07', '08', '05'], desc: '先了解这个世界怎么运转，再认识常用 CEX 和注册入口，不需要马上买币。', cls: 'pink' },
    { icon: '🛒', name: '我想第一次买币', ids: ['03', '08', '04', '05', '06'], desc: '先掌握安全与交易基础，再用自己能承受损失的小额资金练习。', cls: 'mint' },
    { icon: '🛡️', name: '我已经有币，想保护资产', ids: ['07', '08', '09', '14'], desc: '重点了解资产保管、助记词、授权和转账检查。', cls: 'lilac' }
  ];

  /* ---------- 学习进度（仅存于本浏览器） ---------- */
  function loadP() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { } }
  function isDone(id) { return !!loadP()[id]; }
  function toggleDone(id) { var p = loadP(); if (p[id]) delete p[id]; else p[id] = 1; saveP(p); }
  function doneCount(ids) { var p = loadP(); return (ids || CH.map(function (c) { return c.id; })).filter(function (i) { return p[i]; }).length; }

  /* ---------- 搜索 ---------- */
  var INDEX = [];
  CH.forEach(function (c) {
    INDEX.push({ c: c, s: -1, title: c.title, text: c.intro + ' ' + c.tags.join(' ') });
    c.sections.forEach(function (s, i) { INDEX.push({ c: c, s: i, title: s.title, text: s.text }); });
  });
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
      return { href: '#/c/' + r.it.c.id + (r.it.s >= 0 ? '/' + r.it.s : ''), label: r.it.c.id + ' ' + r.it.c.title + (r.it.s >= 0 ? ' › ' + r.it.title : ''), snip: snip };
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
        box.innerHTML = '<p class="empty" role="status">🧸 没找到这个词，换个说法试试？也可以看看<a href="#/c/12">话术翻译器</a>。</p>';
        return;
      }
      box.innerHTML = '<p class="sr" role="status">找到 ' + r.length + ' 条结果</p><ul>' + r.map(function (x) {
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
      (d ? '<span class="donemark" title="已学完">✓<span class="sr">已学完</span></span>' : '') + '</a></li>';
  }
  function renderHome() {
    document.title = 'Web3 新手村 🧸｜币圈入门导航';
    var n = doneCount();
    main.innerHTML =
      '<section class="hero">' +
      '<div class="hero-text"><h1>Web3 新手村 <span aria-hidden="true">🧸</span></h1>' +
      '<p class="lead">币圈名词太多，看不懂也没关系。</p>' +
      '<p>从「什么是币圈」开始，慢慢学会买币、看懂交易、使用钱包和保护资产。这里把绕口的名词翻译成人话，也把容易踩的坑提前摆出来。</p>' +
      '<p class="motto"><strong>先看懂，再动手。学会一件，解锁一件。</strong></p>' +
      '<div class="search big" role="search"><label class="sr" for="q-home">搜索章节、术语、工具</label><span class="sicon" aria-hidden="true">🔍</span>' +
      '<input id="q-home" type="search" placeholder="想了解什么？试试「钱包」「一级市场」「爆仓」……" autocomplete="off"><div class="search-results" hidden></div></div>' +
      '</div><img class="hero-img" src="assets/img/bear.jpg" alt="戴眼镜的小熊在看书" width="300" height="291"></section>' +

      '<section class="block" aria-labelledby="h-toc"><div class="block-head"><h2 id="h-toc">📚 学习目录</h2>' +
      '<div class="progress" aria-live="polite"><span>已学完 <b>' + n + '</b> / ' + CH.length + '</span><span class="bar" aria-hidden="true"><i style="width:' + (n / CH.length * 100) + '%"></i></span>' +
      (n ? '<button class="btn btn-ghost btn-sm" id="clear-p">清除进度</button>' : '') + '</div></div>' +
      '<ol class="toc">' + CH.map(chapterCard).join('') + '</ol>' +
      '<p class="note">学习进度只保存在你当前的浏览器里，本站不收集任何个人信息。</p></section>' +

      '<section class="block" aria-labelledby="h-routes"><h2 id="h-routes">🧭 选一条适合你的路线</h2><div class="routes">' +
      ROUTES.map(function (r) {
        var dn = doneCount(r.ids);
        return '<article class="route ' + r.cls + '"><h3><span aria-hidden="true">' + r.icon + '</span> ' + esc(r.name) + '</h3>' +
          '<p class="route-desc">' + esc(r.desc) + '</p><p class="route-p">进度 ' + dn + ' / ' + r.ids.length + '</p>' +
          '<a class="btn btn-sm" href="#/c/' + (r.ids.filter(function (i) { return !isDone(i); })[0] || r.ids[0]) + '">' + (dn ? '继续学习' : '从这里开始') + ' →</a></article>';
      }).join('') + '</div></section>' +

      '<section class="block safety" aria-labelledby="h-safe"><img src="assets/img/panda-teacher.png" alt="熊猫老师在黑板前讲课" width="200" height="169">' +
      '<div><h2 id="h-safe"><span aria-hidden="true">⚠️</span> 操作前先记住</h2><ul class="checks">' +
      ['不把助记词和私钥交给任何人。', '不因为「稳赚」「翻倍」「名额有限」就急着转钱。', '转账前检查资产、网络、地址和 Memo / Tag。', '收录的平台和工具不等于安全担保。', '不懂签名内容，就先停下来。']
        .map(function (t) { return '<li><span class="ico" aria-hidden="true">🛡️</span>' + esc(t) + '</li>'; }).join('') +
      '</ul><a class="btn btn-sm" href="#/c/08">看安全与防骗指南 →</a></div></section>' +

      '<section class="block" aria-labelledby="h-quick"><h2 id="h-quick">🚀 快捷入口</h2><div class="quick">' +
      '<a class="qcard yellow" href="#/c/13"><span class="qi" aria-hidden="true">🧰</span><strong>常用工具导航</strong><span>查行情、查交易、查链上数据</span></a>' +
      '<a class="qcard pink" href="#/c/05"><span class="qi" aria-hidden="true">🏦</span><strong>CEX 交易所导航</strong><span>邀请注册入口与选择要点（含推广披露）</span></a>' +
      '<a class="qcard lilac" href="#/c/12"><span class="qi" aria-hidden="true">💬</span><strong>币圈话术翻译器</strong><span>正经术语与社区玩梗分开看</span></a>' +
      '<a class="qcard mint" href="#/c/15"><span class="qi" aria-hidden="true">✅</span><strong>练习与自测</strong><span>安全自测、盈亏计算器、转账清单</span></a>' +
      '</div><img class="quick-img" src="assets/img/panda-phone.png" alt="拿着手机的小熊猫" width="140" height="137"></section>';
    bindSearch($('#q-home'), $('.hero .search-results'));
    var cp = $('#clear-p');
    if (cp) cp.addEventListener('click', function () {
      if (confirm('确定清除本浏览器里保存的学习进度吗？')) { try { localStorage.removeItem(KEY); } catch (e) { } renderHome(); $('#h-toc').focus && $('#h-toc').scrollIntoView(); }
    });
  }

  /* ---------- 章节页 ---------- */
  function renderChapter(id, sec) {
    var c = chap(id); if (!c) return renderHome();
    var idx = CH.indexOf(c), prev = CH[idx - 1], next = CH[idx + 1];
    document.title = c.id + '｜' + c.title + ' - Web3 新手村';
    var secNav = c.sections.map(function (s, i) { return '<li><a href="#/c/' + c.id + '/' + i + '">' + esc(s.title) + '</a></li>'; }).join('');
    var allNav = CH.map(function (x) { return '<li><a href="#/c/' + x.id + '"' + (x === c ? ' aria-current="page"' : '') + '><span class="n">' + x.id + '</span> ' + esc(x.title) + (isDone(x.id) ? ' <span class="ok" title="已学完">✓</span>' : '') + '</a>' + (x === c ? '<ol class="secnav">' + secNav + '</ol>' : '') + '</li>'; }).join('');
    main.innerHTML =
      '<div class="layout">' +
      '<aside class="side" aria-label="章节目录"><nav><p class="side-h"><a href="#/">← 回到目录</a></p><ol class="allnav">' + allNav + '</ol></nav></aside>' +
      '<article class="chapter">' +
      '<nav class="crumbs" aria-label="位置"><a href="#/">首页</a> › <span>第 ' + c.id + ' 章</span></nav>' +
      '<header class="ch-head"><span class="ch-num">' + c.id + '</span><div><h1>' + esc(c.title) + ' <span aria-hidden="true">' + c.emoji + '</span></h1><p>' + esc(c.intro) + '</p><span class="tags">' + tags(c) + '</span></div></header>' +
      '<details class="mtoc"><summary>📑 本章目录（' + c.sections.length + ' 节）</summary><ol>' + secNav + '</ol><p><a href="#/">← 回到全部目录</a></p></details>' +
      '<div class="ch-tools"><button class="btn btn-ghost btn-sm" data-act="expand">全部展开</button><button class="btn btn-ghost btn-sm" data-act="collapse">全部折叠</button></div>' +
      c.sections.map(function (s, i) {
        return '<details class="sec" id="s' + i + '" open><summary><h2>' + esc(s.title) + '</h2></summary><div class="sec-body">' + s.html + '</div></details>';
      }).join('') +
      (c.tip ? '<aside class="tip"><img src="assets/img/panda.jpg" alt="" width="64" height="62"><p>' + esc(c.tip) + '</p></aside>' : '') +
      '<div class="done-box"><button class="btn ' + (isDone(c.id) ? 'btn-ghost' : '') + '" id="done-btn" aria-pressed="' + isDone(c.id) + '">' + (isDone(c.id) ? '✓ 已学完（点击取消）' : '🎉 标记本章为已学完') + '</button></div>' +
      '<nav class="pager" aria-label="翻页">' +
      (prev ? '<a class="pg prev" href="#/c/' + prev.id + '"><small>← 上一章</small>' + prev.id + ' ' + esc(prev.title) + '</a>' : '<span></span>') +
      '<a class="pg mid" href="#/">回到目录</a>' +
      (next ? '<a class="pg next" href="#/c/' + next.id + '"><small>下一章 →</small>' + next.id + ' ' + esc(next.title) + '</a>' : '<span></span>') +
      '</nav></article></div>';

    $$('[data-act]').forEach(function (b) { b.addEventListener('click', function () { var o = b.dataset.act === 'expand'; $$('details.sec').forEach(function (d) { d.open = o; }); }); });
    $('#done-btn').addEventListener('click', function () { toggleDone(c.id); renderChapter(c.id); $('#done-btn').focus(); });
    mountWidgets(main);
    applyVerify(main);
    if (sec != null && $('#s' + sec)) {
      var el = $('#s' + sec); el.open = true;
      setTimeout(function () { el.scrollIntoView({ block: 'start' }); var s = $('summary', el); s.focus({ preventScroll: true }); }, 0);
    } else { window.scrollTo(0, 0); }
  }

  /* ---------- 核验状态 ---------- */
  function applyVerify(root) {
    $$('.verify[data-url]', root).forEach(function (v) {
      var d = C.verified[v.dataset.url];
      if (d) { v.textContent = '✅ 最近核验：' + d; v.classList.add('ok'); }
      else { v.textContent = '⏳ 待核验'; v.title = '尚未完成真实核验，使用前请自行确认域名与跳转目的地'; }
    });
  }

  /* ---------- 组件 ---------- */
  var W = {};
  W.wpbuttons = function (el) {
    el.className = 'btn-row';
    el.innerHTML = [['阅读原文', 'https://bitcoin.org/bitcoin.pdf'], ['查找中文版本', 'https://bitcoin.org/en/bitcoin-paper'], ['先看基础问答', 'https://bitcoin.org/en/faq']]
      .map(function (b) { return '<a class="btn btn-sm" href="' + b[1] + '" target="_blank" rel="noopener noreferrer nofollow">' + b[0] + ' ↗<span class="btn-domain">' + host(b[1]) + '</span></a>'; }).join('');
  };
  W.exchanges = function (el) {
    el.innerHTML = '<div class="disclosure" role="note"><span class="ico" aria-hidden="true">📣</span><p><strong>推广披露：</strong>通过这些链接注册，网站运营者可能获得返佣或其他奖励；实际权益、资格与费用以平台说明为准。</p></div>' +
      '<div class="ex-grid">' + C.exchanges.map(function (x) {
        return '<div class="ex-card"><div class="ex-head"><h3>' + esc(x.name) + '</h3><span class="promo">邀请 / 推广链接</span></div>' +
          '<p>' + esc(x.intro) + '</p>' +
          '<p class="domain">链接真实域名：<b>' + esc(host(x.url)) + '</b></p>' +
          '<p class="vline"><span class="verify" data-url="' + esc(x.url) + '">⏳ 待核验</span></p>' +
          (x.enabled ? '<a class="btn btn-sm" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer nofollow sponsored">通过邀请链接注册 ↗<span class="sr">（新窗口，' + esc(host(x.url)) + '）</span></a>' : '<span class="btn btn-sm disabled" aria-disabled="true">入口暂停使用</span>') +
          '<p class="ex-warn"><span aria-hidden="true">⚠️</span> 注册前核对真实域名、跳转目的地、地区要求、账户条款与安全设置。邀请入口不代表安全担保。</p></div>';
      }).join('') + '</div>';
  };
  var QUIZ = [
    { q: '「官方客服」要助记词帮你修复钱包，给吗？', o: ['给', '不给'], a: 1, ans: '不给。停止沟通并核验渠道。', ch: '08' },
    { q: 'Ethereum 和 Base 地址看起来一样，可以随意选网络吗？', o: ['可以', '不可以'], a: 1, ans: '不可以。收款方必须支持对应网络和资产。', ch: '09' },
    { q: '断开网站连接，之前的代币授权就撤销了吗？', o: ['撤销了', '通常没有'], a: 1, ans: '通常没有，需要单独检查。', ch: '08' },
    { q: '币价 0.001 美元，是否一定比价格 100 美元的币便宜？', o: ['一定更便宜', '不能这样判断'], a: 1, ans: '不能这样判断，还要看供应、估值和资产本身。', ch: '03' },
    { q: '止损设置好了，实际损失是否一定不超过预设金额？', o: ['一定不超过', '不能保证'], a: 1, ans: '不能保证。滑点、跳价、订单机制与执行问题都可能影响结果。', ch: '06' },
    { q: '稳定币显示年化 20%，是否说明一年后保证多 20%？', o: ['是，保证多 20%', '不是'], a: 1, ans: '不是。显示年化是按当前条件估算的，不是未来一年的保证收益。很多产品的年化会随着参与资金、借款需求、奖励数量或市场条件变化，产品风险也要定期检查。不同产品机制不同，不能只用参与资金解释所有收益变化。', ch: '11' }
  ];
  W.quiz = function (el) {
    var picked = {};
    el.className = 'widget quiz';
    el.innerHTML = '<p class="w-note">学习用途，答案不会上传。</p><ol>' + QUIZ.map(function (x, i) {
      return '<li><fieldset><legend>' + esc(x.q) + '</legend><div class="opts">' + x.o.map(function (o, j) {
        return '<button type="button" class="opt" data-q="' + i + '" data-o="' + j + '">' + esc(o) + '</button>';
      }).join('') + '</div><div class="qa" hidden></div></fieldset></li>';
    }).join('') + '</ol><div class="qresult" role="status" aria-live="polite"></div><button type="button" class="btn btn-ghost btn-sm" id="q-reset">重新作答</button>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.opt');
      if (b) {
        var i = +b.dataset.q, j = +b.dataset.o, x = QUIZ[i], ok = j === x.a;
        picked[i] = ok;
        var fs = b.closest('fieldset');
        $$('.opt', fs).forEach(function (o) { o.disabled = true; o.classList.toggle('sel', o === b); });
        var qa = $('.qa', fs); qa.hidden = false;
        qa.className = 'qa ' + (ok ? 'right' : 'wrong');
        qa.innerHTML = (ok ? '<b>✅ 答对了</b> ' : '<b>❌ 再想想</b> ') + '答案：' + esc(x.ans) + ' <a href="#/c/' + x.ch + '">回到第 ' + x.ch + ' 章复习 →</a>';
        if (Object.keys(picked).length === QUIZ.length) {
          var all = QUIZ.every(function (_, k) { return picked[k]; });
          $('.qresult', el).innerHTML = all ? '<p class="res good">基础盾牌已解锁 🛡️ 继续保持，操作前还是要检查。</p>' : '<p class="res">发现了几个值得补课的小地方 🧸 点击答案回到相关章节。</p>';
        }
      }
      if (e.target.id === 'q-reset') W.quiz(el);
    });
  };
  W.calculator = function (el) {
    el.className = 'widget calc';
    el.innerHTML = '<p>输入：买入价、卖出价、数量、总费用。仅支持同一报价币下的一次买入和一次卖出的简化现货示例。</p>' +
      '<form novalidate><div class="fgrid">' +
      [['buy', '买入价'], ['sell', '卖出价'], ['qty', '数量'], ['fee', '总费用']].map(function (f) {
        return '<label>' + f[1] + '<input name="' + f[0] + '" inputmode="decimal" autocomplete="off" placeholder="' + { buy: '例如 100', sell: '例如 110', qty: '例如 1', fee: '例如 0.2' }[f[0]] + '"></label>';
      }).join('') + '</div><button class="btn btn-sm" type="submit">计算</button></form>' +
      '<div class="calc-out" role="status" aria-live="polite"></div>' +
      '<details class="formula"><summary>计算公式</summary><p>买入金额 = 买入价 × 数量。<br>净盈亏 =（卖出价 − 买入价）× 数量 − 总费用。<br>简化收益率 = 净盈亏 ÷ 买入金额 × 100%。</p></details>';
    var f = $('form', el), out = $('.calc-out', el);
    function num(v) { v = String(v).trim().replace(/,/g, ''); return /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(v) ? Number(v) : NaN; }
    function fmt(n) { return (Math.round(n * 1e8) / 1e8).toLocaleString('zh-CN', { maximumFractionDigits: 8 }); }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = num(f.buy.value), s = num(f.sell.value), q = num(f.qty.value), fe = num(f.fee.value === '' ? '0' : f.fee.value);
      if (![b, s, q, fe].every(isFinite) || b <= 0 || q <= 0 || fe < 0 || s < 0) {
        out.innerHTML = '<p class="err"><span aria-hidden="true">⚠️</span> 请填写有效数字，买入价与数量需要大于 0，费用不能为负。</p>'; return;
      }
      var cost = b * q, pnl = (s - b) * q - fe, r = pnl / cost * 100;
      out.innerHTML = '<dl><div><dt>买入金额</dt><dd>' + fmt(cost) + '</dd></div><div><dt>净盈亏</dt><dd class="' + (pnl >= 0 ? 'pos' : 'neg') + '">' + (pnl >= 0 ? '▲ +' : '▼ ') + fmt(pnl) + '</dd></div><div><dt>简化收益率</dt><dd>' + (r >= 0 ? '+' : '') + fmt(r) + '%</dd></div></dl>' +
        '<p class="w-note">这是简化学习结果，不适用于合约、借贷、分批交易或多币种费用。完整账务可能不同。</p>';
    });
  };
  W.checklist = function (el) {
    var items = ['我知道转的是什么资产。', '收款方明确支持这个网络。', '我从可信来源核对了完整地址，也检查了粘贴 / 扫码结果和最终确认页。', '我检查了 Memo / Tag 要求。', '我检查了最低金额、费用与暂停状态。', '我确认有足够的网络资源或可用代付方式。', '第一次使用时，我会先做符合最低要求的小额测试。'];
    el.className = 'widget checklist';
    el.innerHTML = '<ul>' + items.map(function (t, i) { return '<li><label><input type="checkbox" data-i="' + i + '"> <span>' + esc(t) + '</span></label></li>'; }).join('') + '</ul>' +
      '<div class="ck-out" role="status" aria-live="polite"></div><button type="button" class="btn btn-ghost btn-sm">清空勾选</button>';
    function upd() {
      var all = $$('input', el).every(function (x) { return x.checked; });
      $('.ck-out', el).innerHTML = all ? '<p class="res good">✅ 检查完成。请在最终确认页再核对一次，勾选清单不能保证没有风险。</p>' : '';
    }
    el.addEventListener('change', upd);
    $('button', el).addEventListener('click', function () { $$('input', el).forEach(function (x) { x.checked = false; }); upd(); });
  };
  function slangRows(i) {
    var d = document.createElement('div'); d.innerHTML = chap('12').sections[i].html;
    return $$('tbody tr', d).map(function (tr) { var td = $$('td', tr); return [td[0].textContent, td[1].textContent]; });
  }
  W.slang = function (el) {
    var serious = slangRows(0), meme = slangRows(1), mode = 'serious';
    el.className = 'widget slang';
    el.innerHTML = '<div class="slang-top"><label class="sr" for="slang-q">查一个词</label><input id="slang-q" type="search" placeholder="查一个词，例如 FOMO、梭哈、接盘"><div class="seg" role="tablist" aria-label="切换">' +
      '<button role="tab" aria-selected="true" data-m="serious">📘 正经解释</button><button role="tab" aria-selected="false" data-m="meme">😜 社区玩梗</button></div></div><div class="slang-list" aria-live="polite"></div>';
    var list = $('.slang-list', el), q = $('#slang-q', el);
    function draw() {
      var k = q.value.trim().toLowerCase(), rows = mode === 'serious' ? serious : meme;
      var f = rows.filter(function (r) { return !k || (r[0] + r[1]).toLowerCase().indexOf(k) >= 0; });
      var other = mode === 'serious' ? meme : serious;
      var otherHit = k && other.some(function (r) { return (r[0] + r[1]).toLowerCase().indexOf(k) >= 0; });
      list.innerHTML = (mode === 'meme' ? '<p class="w-note">以下是调侃，不是对所有人的真实意图判断，也不是交易建议。</p>' : '') +
        (f.length ? '<dl>' + f.map(function (r) {
          return '<div class="term ' + mode + '"><dt>' + esc(r[0]) + (mode === 'meme' ? ' <span class="badge-meme">😜 社区调侃</span>' : ' <span class="badge-serious">📘 正经术语</span>') + '</dt><dd>' + esc(r[1]) + '</dd></div>';
        }).join('') + '</dl>' : '<p class="empty">没找到这个词，换个说法试试？' + (otherHit ? '「' + (mode === 'serious' ? '社区玩梗' : '正经解释') + '」里有结果。' : '') + '</p>');
    }
    q.addEventListener('input', draw);
    $$('[data-m]', el).forEach(function (b) {
      b.addEventListener('click', function () { mode = b.dataset.m; $$('[data-m]', el).forEach(function (x) { x.setAttribute('aria-selected', x === b); }); draw(); });
    });
    draw();
  };
  function mountWidgets(root) {
    $$('[data-widget]', root).forEach(function (el) { var f = W[el.dataset.widget]; if (f) f(el); });
    // 话术翻译器挂在第 12 章开头；表格里的玩梗行加「社区调侃」标记
    if (location.hash.indexOf('#/c/12') === 0) {
      var w = document.createElement('div'); w.dataset.widget = 'slang';
      var first = $('details.sec', root); first.parentNode.insertBefore(w, first);
      var h = document.createElement('h2'); h.className = 'wtitle'; h.textContent = '🔎 查一个词'; w.parentNode.insertBefore(h, w);
      W.slang(w);
      $$('#s1 tbody tr td:first-child', root).forEach(function (td) { td.insertAdjacentHTML('beforeend', ' <span class="badge-meme">社区调侃</span>'); });
      $$('#s0 tbody tr td:first-child', root).forEach(function (td) { td.insertAdjacentHTML('beforeend', ' <span class="badge-serious">正经术语</span>'); });
    }
  }

  /* ---------- 页脚 ---------- */
  function renderFooter() {
    var fb = C.feedback || {}, link = fb.url || (fb.email ? 'mailto:' + fb.email : '');
    $('#footer').innerHTML = '<div class="footer-in"><img src="assets/img/panda-phone.png" alt="" width="72" height="70">' +
      '<div><p class="f-title"><strong>慢慢学，不用急着上车。🧸</strong></p>' +
      '<p>本站提供入门教育与官方入口导航，不提供个性化投资建议，不承诺收益，也不替收录项目、平台或工具担保。加密资产、链上操作和衍生品都可能造成损失。</p>' +
      '<p>服务可用性、费用、政策与链接可能变化，使用前以官方最新说明为准。遵守所在地法律、税务与平台要求。</p>' +
      '<p>交易所入口为邀请 / 推广链接，详见第 05 章披露。标注「待核验」的链接尚未完成人工核验。</p>' +
      (link ? '<p>发现错误或失效链接？欢迎反馈，帮助新手村一起变得更好。</p><a class="btn btn-sm" href="' + esc(link) + '"' + (fb.url ? ' target="_blank" rel="noopener noreferrer"' : '') + '>📮 反馈问题</a>' : '') +
      '</div></div>';
  }

  /* ---------- 路由 ---------- */
  function route() {
    var h = location.hash, m = h.match(/^#\/c\/(\d\d)(?:\/(\d+))?/);
    $$('.topbar .search-results').forEach(function (b) { b.hidden = true; });
    if (m) renderChapter(m[1], m[2] != null ? +m[2] : null);
    else { renderHome(); window.scrollTo(0, 0); }
    $$('.topnav a').forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === (m ? '#/c/' + m[1] : '#/')); });
    if (h && h !== '#/' && !(m && m[2])) main.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  renderFooter();
  route();
})();
