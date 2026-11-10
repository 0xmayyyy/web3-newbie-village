/* Additive drawing overlay for the lab price chart.
   It records the chart the lab creates and does not change candles, studies, or requests. */
(function () {
  var math = window.LabDrawMath;
  if (!math) return;
  var STORE = 'w3nv-lab-drawings-v1';
  var COPY = {
    pan: ['平移', 'Pan'],
    select: ['选择', 'Select'],
    trend: ['趋势线', 'Trend line'],
    hline: ['水平线', 'Horizontal line'],
    box: ['支撑/压力框', 'Support/resistance box'],
    fib: ['斐波那契回撤', 'Fibonacci retracement'],
    undo: ['撤销', 'Undo'],
    redo: ['重做', 'Redo'],
    del: ['删除', 'Delete'],
    clear: ['清空', 'Clear'],
    note: ['画线只保存在这台浏览器，不会上传。', 'Drawings stay only in this browser and are not uploaded.'],
    clearAsk: ['清空当前币种和周期上的全部画线？可以撤销。', 'Clear every drawing on this coin and timeframe? You can undo this.'],
    hintPan: ['平移不挡图表。要改画线，先点选择。', 'Pan leaves the chart alone. To change a drawing, tap Select.'],
    hintSelect: ['点中画线后拖锚点。Delete 删除。', 'Tap a drawing, then drag its anchors. Delete removes it.'],
    hintTrend: ['点两个位置，或按住拖出趋势线。', 'Tap two points, or press and drag a trend line.'],
    hintHline: ['点一下价格，画出水平线。', 'Tap a price to place a horizontal line.'],
    hintBox: ['点两个角，或按住拖出支撑/压力框。', 'Tap two corners, or press and drag a support/resistance box.'],
    hintFib: ['从起点拉到终点。反向拉也会按 0 到 1 计算。', 'Drag from the start to the end. A reverse pull still calculates 0 through 1.']
  };
  var TOOLS = ['pan', 'select', 'trend', 'hline', 'box', 'fib'];
  var chart = null;
  var series = null;
  var tool = 'pan';
  var selected = null;
  var draft = null;
  var drag = null;
  var key = '';
  var books = {};
  var listened = typeof WeakSet === 'function' ? new WeakSet() : null;
  var scheduled = false;
  var lastPointer = 'mouse';

  function lang() {
    var en = document.getElementById('lang-en');
    if (en && en.getAttribute('aria-pressed') === 'true') return 'en';
    try { if (localStorage.getItem('w3nv-lang') === 'en') return 'en'; } catch (e) {}
    return 'zh';
  }
  function t(name) {
    var pair = COPY[name];
    return lang() === 'en' ? pair[1] : pair[0];
  }
  function uid() { return 'd' + Math.random().toString(36).slice(2, 10); }
  function esc(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  function svgEl() { return document.getElementById('lab-draw-svg'); }
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function currentKey() {
    var coin = document.querySelector('#lab-root .coin.active');
    var tf = document.querySelector('#lab-root .tf-btn.active');
    return math.storageKey(coin ? coin.getAttribute('data-symbol') : '', tf ? tf.getAttribute('data-tf') : '');
  }
  function book() {
    if (!books[key]) {
      books[key] = math.createBook();
      books[key].load(math.sanitize(readStore()[key]));
    }
    return books[key];
  }
  function persist() {
    if (!key || key === '|') return;
    var all = readStore();
    all[key] = book().items();
    try { localStorage.setItem(STORE, JSON.stringify(all)); } catch (e) {}
  }
  function syncKey() {
    var next = currentKey();
    if (!next || next === '|' || next === key) return;
    if (key) persist();
    key = next;
    selected = null;
    draft = null;
    drag = null;
    book();
    paintBar();
    schedule();
  }
  function find(id) {
    var items = book().items();
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }
  function paneHeight() {
    var svg = svgEl();
    try {
      var h = chart.panes()[0].getHeight();
      if (h > 20) return h;
    } catch (e) {}
    return svg ? svg.clientHeight * 0.72 : 0;
  }
  function priceAt(pt) {
    if (!series || !pt) return null;
    var price = series.coordinateToPrice(pt.y);
    if (typeof price !== 'number' || !isFinite(price)) return null;
    return price;
  }
  function toData(pt) {
    if (!chart || !pt) return null;
    var time = chart.timeScale().coordinateToTime(pt.x);
    var price = priceAt(pt);
    if (typeof time !== 'number' || !isFinite(time) || price == null) return null;
    return { time: time, price: price };
  }
  function toXY(time, price) {
    if (!chart || !series) return null;
    var x = chart.timeScale().timeToCoordinate(time);
    var y = series.priceToCoordinate(price);
    if (x == null || y == null || !isFinite(x) || !isFinite(y)) return null;
    return { x: x, y: y };
  }
  function local(e) {
    var svg = svgEl();
    if (!svg) return null;
    var rect = svg.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function hitTol() { return lastPointer === 'touch' ? 22 : 12; }
  function drawingTool() { return tool === 'trend' || tool === 'hline' || tool === 'box' || tool === 'fib'; }

  function pick(pt) {
    if (!pt) return null;
    var best = null;
    var bestD = hitTol();
    book().items().forEach(function (item) {
      var found = hitItem(item, pt);
      if (found && found.dist < bestD) { best = found; bestD = found.dist; }
    });
    return best;
  }
  function hitItem(item, pt) {
    if (item.type === 'hline') {
      var y = series.priceToCoordinate(item.price);
      if (y == null) return null;
      var d = Math.abs(pt.y - y);
      if (d > hitTol()) return null;
      return { id: item.id, handle: 'line', dist: d };
    }
    var a = toXY(item.a.time, item.a.price);
    var b = toXY(item.b.time, item.b.price);
    if (!a || !b) return null;
    var da = Math.hypot(pt.x - a.x, pt.y - a.y);
    var db = Math.hypot(pt.x - b.x, pt.y - b.y);
    if (da <= hitTol() || db <= hitTol()) return { id: item.id, handle: da <= db ? 'a' : 'b', dist: Math.min(da, db) };
    if (item.type === 'trend') {
      var line = math.distToSeg(pt.x, pt.y, a.x, a.y, b.x, b.y);
      if (line <= hitTol()) return { id: item.id, handle: 'line', dist: line };
    }
    if (item.type === 'box') {
      var left = Math.min(a.x, b.x);
      var right = Math.max(a.x, b.x);
      var top = Math.min(a.y, b.y);
      var bot = Math.max(a.y, b.y);
      var inside = pt.x >= left && pt.x <= right && pt.y >= top && pt.y <= bot;
      var edge = Math.min(Math.abs(pt.x - left), Math.abs(pt.x - right), Math.abs(pt.y - top), Math.abs(pt.y - bot));
      if (inside || edge <= hitTol()) return { id: item.id, handle: 'line', dist: inside ? 0 : edge };
    }
    if (item.type === 'fib') {
      var span = Math.min(math.distToSeg(pt.x, pt.y, a.x, a.y, b.x, b.y), fibDist(item, pt));
      if (span <= hitTol()) return { id: item.id, handle: 'line', dist: span };
    }
    return null;
  }
  function fibDist(item, pt) {
    var best = Infinity;
    math.LEVELS.forEach(function (level) {
      var price = math.fibPrice(item.a.price, item.b.price, level);
      var left = toXY(Math.min(item.a.time, item.b.time), price);
      var right = toXY(Math.max(item.a.time, item.b.time), price);
      if (!left || !right) return;
      best = Math.min(best, math.distToSeg(pt.x, pt.y, left.x, left.y, right.x, right.y));
    });
    return best;
  }

  function beginDrag(kind, id, pt) {
    var item = find(id);
    if (!item || !pt) return;
    var price = priceAt(pt);
    var data = toData(pt);
    if (item.type === 'hline') {
      if (price == null) return;
    } else if (!data) return;
    selected = id;
    drag = {
      kind: item.type === 'hline' ? 'line' : kind,
      id: id,
      orig: JSON.parse(JSON.stringify(item)),
      pointer: data,
      pointerPrice: price,
      marked: false
    };
    try { if (svgEl()) svgEl().setPointerCapture(pt.pointerId); } catch (err) {}
  }
  function applyDrag(pt) {
    if (!drag || !pt) return;
    var price = priceAt(pt);
    var now = toData(pt);
    if (!drag.marked) {
      book().commit(book().items());
      drag.marked = true;
    }
    var item = find(drag.id);
    if (!item) return;
    if (item.type === 'hline') {
      if (price == null) return;
      item.price = drag.orig.price + (price - drag.pointerPrice);
    } else if (drag.kind === 'a' || drag.kind === 'b') {
      if (!now) return;
      item[drag.kind] = { time: now.time, price: now.price };
    } else {
      if (!now || !drag.pointer) return;
      var dt = now.time - drag.pointer.time;
      var dp = now.price - drag.pointer.price;
      item.a = { time: drag.orig.a.time + dt, price: drag.orig.a.price + dp };
      item.b = { time: drag.orig.b.time + dt, price: drag.orig.b.price + dp };
    }
    persist();
    schedule();
  }
  function add(item) {
    var next = book().items().concat([item]);
    book().commit(next);
    selected = item.id;
    persist();
    paintBar();
    schedule();
  }
  function removeSelected() {
    if (!selected) return;
    book().commit(book().items().filter(function (item) { return item.id !== selected; }));
    selected = null;
    persist();
    paintBar();
    schedule();
  }
  function clearAll() {
    if (!window.confirm(t('clearAsk'))) return;
    book().commit([]);
    selected = null;
    draft = null;
    persist();
    paintBar();
    schedule();
  }
  function undo() {
    if (!book().undo()) return;
    selected = null;
    draft = null;
    persist();
    paintBar();
    schedule();
  }
  function redo() {
    if (!book().redo()) return;
    selected = null;
    draft = null;
    persist();
    paintBar();
    schedule();
  }
  function finishDraft() {
    var d = draft;
    draft = null;
    if (!d || !d.a || !d.b) return;
    if (d.a.time === d.b.time && d.a.price === d.b.price) return;
    add({ id: uid(), type: d.type, a: { time: d.a.time, price: d.a.price }, b: { time: d.b.time, price: d.b.price } });
  }
  function setTool(next) {
    tool = next;
    draft = null;
    drag = null;
    paintBar();
    schedule();
  }

  function onDown(e) {
    lastPointer = e.pointerType || 'mouse';
    var node = e.target && e.target.closest ? e.target.closest('.is-body, .is-handle') : null;
    if (node) {
      e.preventDefault();
      e.stopPropagation();
      var pt = local(e);
      if (pt) pt.pointerId = e.pointerId;
      beginDrag(node.getAttribute('data-handle') || 'line', node.getAttribute('data-id'), pt);
      paintBar();
      return;
    }
    node = e.target;
    if (!node || !node.classList || !node.classList.contains('is-hit')) return;
    var pt = local(e);
    if (!pt || pt.y > paneHeight()) return;
    e.preventDefault();
    e.stopPropagation();
    if (tool === 'hline') {
      var price = toData(pt);
      if (!price) return;
      add({ id: uid(), type: 'hline', price: price.price });
      return;
    }
    var data = toData(pt);
    if (!data) return;
    if (!draft) {
      draft = { type: tool, a: data, b: data, x0: e.clientX, y0: e.clientY, moved: false };
      schedule();
      return;
    }
    draft.b = data;
    finishDraft();
  }
  function onMove(e) {
    if (!drag && !draft) return;
    var pt = local(e);
    if (!pt) return;
    if (drag) { applyDrag(pt); return; }
    var data = toData(pt);
    if (!data) return;
    draft.b = data;
    if (Math.hypot(e.clientX - draft.x0, e.clientY - draft.y0) > 8) draft.moved = true;
    schedule();
  }
  function onUp() {
    if (drag) { drag = null; persist(); paintBar(); return; }
    if (draft && draft.moved) finishDraft();
  }

  function mountChrome() {
    var chartEl = document.getElementById('price-chart');
    if (!chartEl) return;
    var wrap = chartEl.closest('.chart-wrap');
    if (!wrap || !wrap.parentNode) return;
    if (!document.getElementById('lab-draw')) {
      var host = document.createElement('div');
      host.id = 'lab-draw';
      host.className = 'lab-draw';
      host.innerHTML = '<div class="lab-draw-bar" role="toolbar"></div>';
      var head = document.querySelector('#market-chart-card .chart-head');
      var coins = head && head.querySelector('.coins');
      if (head && coins) head.insertBefore(host, coins);
      else wrap.parentNode.insertBefore(host, wrap);
      host.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('button') : null;
        if (!btn || !host.contains(btn)) return;
        var next = btn.getAttribute('data-tool');
        if (next) { setTool(next); return; }
        var act = btn.getAttribute('data-act');
        if (act === 'undo') undo();
        if (act === 'redo') redo();
        if (act === 'del') removeSelected();
        if (act === 'clear') clearAll();
      });
    }
    if (!document.getElementById('lab-draw-svg')) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'lab-draw-svg';
      svg.setAttribute('class', 'lab-draw-svg');
      svg.addEventListener('pointerdown', onDown);
      wrap.appendChild(svg);
    }
    if (!wrap.__drawSize && typeof ResizeObserver === 'function') {
      wrap.__drawSize = new ResizeObserver(schedule);
      wrap.__drawSize.observe(chartEl);
    }
    paintBar();
  }
  function icon(name) {
    var paths = {
      pan: '<path d="M4 8h8M8 4v8" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      select: '<path d="M5 3l8 6-3.2.4 2.2 4.2-1.6.8-2.2-4.2L5 13z" fill="currentColor"/>',
      trend: '<path d="M4 12l8-8" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      hline: '<path d="M3 8h10" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      box: '<rect x="3.5" y="4" width="9" height="8" fill="none" stroke="currentColor" stroke-width="1.4"/>',
      fib: '<path d="M3 5h10M3 8h10M3 11h10" fill="none" stroke="currentColor" stroke-width="1.2"/>',
      undo: '<path d="M7 4L3 8l4 4M3 8h7a3 3 0 0 1 0 6H8" fill="none" stroke="currentColor" stroke-width="1.4"/>',
      redo: '<path d="M9 4l4 4-4 4M13 8H6a3 3 0 0 0 0 6h2" fill="none" stroke="currentColor" stroke-width="1.4"/>',
      del: '<path d="M4 5h8M6 5l.5 8h3L10 5M6.5 5V3.5h3V5" fill="none" stroke="currentColor" stroke-width="1.3"/>',
      clear: '<path d="M3 8h10M5 8l1 5h4l1-5" fill="none" stroke="currentColor" stroke-width="1.3"/>'
    };
    return '<svg viewBox="0 0 16 16" aria-hidden="true">' + (paths[name] || '') + '</svg>';
  }
  function toolButton(name, attr, enabled) {
    var label = t(name);
    return '<button type="button" ' + attr + ' title="' + esc(label) + '" aria-label="' + esc(label) + '"' + (enabled ? '' : ' disabled') + '>' + icon(name) + '</button>';
  }
  function paintBar() {
    var host = document.getElementById('lab-draw');
    if (!host || !key) return;
    var bar = host.querySelector('.lab-draw-bar');
    var html = TOOLS.map(function (name) {
      return '<button type="button" data-tool="' + name + '" aria-pressed="' + (tool === name ? 'true' : 'false') + '" title="' + esc(t(name)) + '" aria-label="' + esc(t(name)) + '">' + icon(name) + '</button>';
    }).join('');
    html += toolButton('undo', 'data-act="undo"', book().canUndo());
    html += toolButton('redo', 'data-act="redo"', book().canRedo());
    html += toolButton('del', 'data-act="del"', !!selected);
    html += toolButton('clear', 'data-act="clear"', true);
    bar.innerHTML = html;
    bar.title = t('note');
    bar.setAttribute('aria-description', t('note'));
  }

  function handle(id, which, x, y) {
    return '<circle class="is-handle" data-id="' + esc(id) + '" data-handle="' + which + '" cx="' + x + '" cy="' + y + '" r="18" fill="transparent"></circle>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#fff" stroke="#1b1428" pointer-events="none"></circle>';
  }
  function grabLine(id, x1, y1, x2, y2) {
    return '<line class="is-body" data-id="' + esc(id) + '" data-handle="line" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="transparent" stroke-width="22" pointer-events="stroke"></line>';
  }
  function render() {
    var svg = svgEl();
    if (!svg || !chart || !series || !key) return;
    var w = svg.clientWidth || 1;
    var h = paneHeight();
    var bits = ['<defs><clipPath id="lab-draw-clip"><rect x="0" y="0" width="' + w + '" height="' + h + '"></rect></clipPath></defs><g clip-path="url(#lab-draw-clip)">'];
    if (drawingTool()) bits.push('<rect class="is-hit" x="0" y="0" width="' + w + '" height="' + h + '" fill="transparent"></rect>');
    book().items().forEach(function (item) { bits.push(drawItem(item, w, item.id === selected)); });
    if (draft && draft.a && draft.b) bits.push(drawItem({ id: 'draft', type: draft.type, a: draft.a, b: draft.b }, w, false));
    bits.push('</g>');
    svg.innerHTML = bits.join('');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + (svg.clientHeight || h));
  }
  function drawItem(item, width, on) {
    var stroke = on ? '#fff' : '#e6c79e';
    var widthPx = on ? 2.4 : 1.6;
    var grab = on || tool === 'select';
    if (item.type === 'hline') {
      var y = series.priceToCoordinate(item.price);
      if (y == null) return '';
      return '<line x1="0" y1="' + y + '" x2="' + width + '" y2="' + y + '" stroke="' + stroke + '" stroke-width="' + widthPx + '"></line>' +
        '<text x="8" y="' + (y - 6) + '" fill="#f5efff" font-size="11">' + item.price.toFixed(item.price >= 100 ? 1 : 2) + '</text>' +
        (grab ? grabLine(item.id, 0, y, width, y) : '');
    }
    var a = toXY(item.a.time, item.a.price);
    var b = toXY(item.b.time, item.b.price);
    if (!a || !b) return '';
    if (item.type === 'trend') {
      return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + stroke + '" stroke-width="' + widthPx + '"></line>' +
        (grab ? grabLine(item.id, a.x, a.y, b.x, b.y) : '') +
        (on ? handle(item.id, 'a', a.x, a.y) + handle(item.id, 'b', b.x, b.y) : '');
    }
    if (item.type === 'box') {
      var x = Math.min(a.x, b.x);
      var y = Math.min(a.y, b.y);
      var bw = Math.abs(b.x - a.x);
      var bh = Math.abs(b.y - a.y);
      return '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" fill="rgba(125,206,160,.18)" stroke="' + stroke + '" stroke-width="' + widthPx + '"></rect>' +
        (grab ? '<rect class="is-body" data-id="' + esc(item.id) + '" data-handle="line" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" fill="transparent" pointer-events="all"></rect>' : '') +
        (on ? handle(item.id, 'a', a.x, a.y) + handle(item.id, 'b', b.x, b.y) : '');
    }
    var lines = math.LEVELS.map(function (level) {
      var price = math.fibPrice(item.a.price, item.b.price, level);
      var left = toXY(Math.min(item.a.time, item.b.time), price);
      var right = toXY(Math.max(item.a.time, item.b.time), price);
      if (!left || !right) return '';
      var label = level.toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + ' ' + price.toFixed(price >= 100 ? 1 : 2);
      return '<line x1="' + left.x + '" y1="' + left.y + '" x2="' + right.x + '" y2="' + right.y + '" stroke="#c4b5fd" stroke-width="1.4"></line>' +
        (grab ? grabLine(item.id, left.x, left.y, right.x, right.y) : '') +
        '<text x="' + (right.x + 4) + '" y="' + (right.y - 4) + '" fill="#f5efff" font-size="11">' + label + '</text>';
    }).join('');
    return lines + '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + stroke + '" stroke-dasharray="4 3"></line>' +
      (grab ? grabLine(item.id, a.x, a.y, b.x, b.y) : '') +
      (on ? handle(item.id, 'a', a.x, a.y) + handle(item.id, 'b', b.x, b.y) : '');
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      if (!document.getElementById('price-chart')) return;
      render();
    });
  }
  function attach(nextChart, nextSeries) {
    chart = nextChart;
    series = nextSeries;
    if (listened && !listened.has(nextChart)) {
      listened.add(nextChart);
      nextChart.timeScale().subscribeVisibleLogicalRangeChange(schedule);
    }
    mountChrome();
    syncKey();
    schedule();
  }
  function watchLibrary() {
    var lib = window.LightweightCharts;
    if (!lib || !lib.createChart || lib.__drawWrapped) return;
    var orig = lib.createChart.bind(lib);
    var wrapped = function (el) {
      var created = orig.apply(null, arguments);
      if (el && el.id === 'price-chart') {
        var add = created.addSeries.bind(created);
        created.addSeries = function (type) {
          var made = add.apply(null, arguments);
          if (type === window.LightweightCharts.CandlestickSeries) attach(created, made);
          return made;
        };
      }
      return created;
    };
    var facade = Object.create(lib);
    Object.defineProperty(facade, 'createChart', { value: wrapped, writable: true, configurable: true });
    Object.defineProperty(facade, '__drawWrapped', { value: true, writable: true, configurable: true });
    Object.defineProperty(window, 'LightweightCharts', {
      configurable: true,
      get: function () { return facade; },
      set: function (value) {
        if (value && value.createChart && !value.__drawWrapped) watchLibrary();
      }
    });
  }

  document.addEventListener('pointerdown', function (e) {
    if (tool !== 'select' || drag) return;
    if (!e.target.closest || !e.target.closest('#price-chart')) return;
    if (e.target.closest('.is-handle')) return;
    var pt = local(e);
    if (!pt || pt.y > paneHeight()) return;
    var hit = pick(pt);
    if (!hit) {
      if (selected) { selected = null; paintBar(); schedule(); }
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    beginDrag(hit.handle || 'line', hit.id, pt);
    paintBar();
    schedule();
  }, true);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  document.addEventListener('click', function (e) {
    if (e.target.closest && (e.target.closest('.coin') || e.target.closest('.tf-btn') || e.target.id === 'lang-en' || e.target.id === 'lang-zh')) {
      setTimeout(function () { syncKey(); paintBar(); schedule(); }, 0);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lab-draw')) return;
    var tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    var meta = e.metaKey || e.ctrlKey;
    if (meta && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
    else if (meta && (e.key === 'y' || e.key === 'Y')) { e.preventDefault(); redo(); }
    else if (e.key === 'Escape') setTool('pan');
    else if ((e.key === 'Delete' || e.key === 'Backspace') && selected) { e.preventDefault(); removeSelected(); }
  });
  function hookScripts(method) {
    var orig = Node.prototype[method];
    if (!orig || orig.__drawHook) return;
    var hooked = function (node) {
      if (node && node.tagName === 'SCRIPT' && node.src && node.src.indexOf('lightweight-charts') >= 0) {
        var prev = node.onload;
        node.onload = function () {
          watchLibrary();
          if (typeof prev === 'function') return prev.apply(this, arguments);
        };
      }
      return orig.apply(this, arguments);
    };
    hooked.__drawHook = true;
    Node.prototype[method] = hooked;
  }
  hookScripts('appendChild');
  hookScripts('insertBefore');
  if (window.LightweightCharts) watchLibrary();
})();
