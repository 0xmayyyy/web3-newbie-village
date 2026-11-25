/* Groups an existing lesson's DOM into cards. Titles are the only added words. */
(function (global) {
  var LABELS = {
    intro: { zh: '介绍', en: 'Introduction' },
    diagram: { zh: '图解', en: 'Diagram' },
    example: { zh: '例子', en: 'Example' },
    risk: { zh: '风险提醒', en: 'Risk note' },
    quiz: { zh: '小测', en: 'Short quiz' }
  };

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

  function organize(prose, lang) {
    if (!prose) return;
    var buckets = { intro: [], diagram: [], example: [], risk: [], quiz: [] };
    Array.prototype.slice.call(prose.childNodes).forEach(function (node) {
      if (node.nodeType === 3 && !String(node.textContent || '').trim()) return;
      var tag = node.tagName || '';
      var className = node.className || '';
      var kind = kindOf(tag, className, node.textContent || '');
      if (!buckets[kind]) kind = 'intro';
      buckets[kind].push(node);
    });
    prose.textContent = '';
    ['intro', 'diagram', 'example', 'risk', 'quiz'].forEach(function (kind) {
      if (!buckets[kind].length) return;
      var card = document.createElement('section');
      card.className = 'lb-card lb-' + kind;
      var heading = document.createElement('h3');
      heading.className = 'lb-label';
      heading.textContent = label(kind, lang);
      var body = document.createElement('div');
      body.className = 'lb-body';
      buckets[kind].forEach(function (node) { body.appendChild(node); });
      card.appendChild(heading);
      card.appendChild(body);
      prose.appendChild(card);
    });
  }

  global.LESSON_BLOCKS = { kindOf: kindOf, label: label, organize: organize, LABELS: LABELS };
})(typeof window !== 'undefined' ? window : globalThis);
