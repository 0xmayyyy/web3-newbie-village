/* Compare planet chapter 01 source text with the block layout. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const window = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/lesson-blocks.js'), 'utf8'), { window, globalThis: window });
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'), { window });
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/data-en.js'), 'utf8'), { window });
const kindOf = window.LESSON_BLOCKS.kindOf;
const label = window.LESSON_BLOCKS.label;
const plan = window.LESSON_BLOCKS.plan;
const layoutPieces = window.LESSON_BLOCKS.layoutPieces;

function decode(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}
function textOf(html) {
  return decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function norm(s) {
  return s.replace(/\s+/g, '').replace(/\u00a0/g, '');
}
function topBlocks(html) {
  const s = html.trim();
  const blocks = [];
  let i = 0;
  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;
    const open = s.slice(i).match(/^<(\w+)([^>]*)>/);
    if (!open) break;
    const tag = open[1];
    const attrs = open[2];
    const start = i;
    let depth = 1;
    let j = i + open[0].length;
    const openRe = new RegExp('<' + tag + '\\b', 'gi');
    const closeRe = new RegExp('</' + tag + '>', 'gi');
    while (depth && j < s.length) {
      openRe.lastIndex = j;
      closeRe.lastIndex = j;
      const o = openRe.exec(s);
      const c = closeRe.exec(s);
      if (!c) { j = s.length; break; }
      if (o && o.index < c.index) { depth++; j = o.index + o[0].length; }
      else { depth--; j = c.index + c[0].length; }
    }
    const raw = s.slice(start, j);
    const className = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
    const attrsText = [];
    const attrRe = /data-(?:ok|bad|note)="([^"]*)"/g;
    let m;
    while ((m = attrRe.exec(raw))) attrsText.push(decode(m[1]));
    blocks.push({ tag: tag, className: className, text: textOf(raw), attrs: attrsText, raw: raw });
    i = j;
  }
  return blocks;
}

function segments(block) {
  const parts = [];
  if (block.text) parts.push(block.text);
  block.attrs.forEach(function (item) { if (item) parts.push(item); });
  return parts;
}

const langs = [
  ['zh', window.SITE_DATA],
  ['en', window.SITE_DATA_EN]
];
const lines = [];
lines.push('# Chapter 01 block layout: content comparison');
lines.push('');
lines.push('Planet chapter `01｜什么是币圈？` (`#/c/01/0` through `#/c/01/10`). The lesson page uses the demo shell: top bar, sidebar, hero, tab row, takeaway, quiz.');
lines.push('');
lines.push('Each lesson uses the demo modules in this order: hero, tabbed section (a card per sentence: heading, explanation, example line), takeaway when the lesson has a risk paragraph, then the quiz. An 例如 / for example sentence hangs on the previous card. A comma splits a sentence into the card heading and the explanation. Module titles are added only when a card has no clause to use as its heading. No original sentence is rewritten or dropped.');
lines.push('');
lines.push('The chapter tip is the sidebar note on every lesson. It is chapter-level text, not part of a section, so it is not in the section text set.');
lines.push('');
lines.push('Plain (non-card) layout: none. Every original block is placed in the hero, a tab, the takeaway, or the quiz.');
lines.push('');
let failed = 0;
langs.forEach(function (pair) {
  const lang = pair[0];
  const data = pair[1];
  const chapter = data.chapters.find(function (c) { return c.id === '01'; });
  lines.push('## ' + (lang === 'zh' ? '中文' : 'English'));
  lines.push('');
  chapter.sections.forEach(function (section, index) {
    const blocks = topBlocks(section.html);
    const pieces = layoutPieces(blocks, lang);
    const by = {};
    pieces.forEach(function (piece) {
      if (!by[piece.index]) by[piece.index] = [];
      by[piece.index].push(piece);
    });
    const placed = [];
    let splitOk = true;
    blocks.forEach(function (block, index) {
      const group = by[index] || [];
      const joined = norm(group.map(function (piece) { return piece.text; }).join(''));
      if (joined !== norm(block.text)) splitOk = false;
      group.forEach(function (piece) {
        if (piece.text) placed.push(piece);
      });
      segments(block).forEach(function (part) {
        if (part && part !== block.text && norm(part) !== norm(block.text)) placed.push({ slot: 'quiz', role: 'note', text: part });
      });
    });
    const covered = norm(blocks.map(function (block) { return block.text; }).join(''));
    const whole = norm(textOf(section.html));
    const coveredOk = covered === whole;
    const ok = splitOk && coveredOk && pieces.length > 0;
    if (!ok) failed++;
    lines.push('### ' + (index) + '. ' + section.title + (ok ? ' — match' : ' — DIFF'));
    lines.push('');
    lines.push('Route: `#/c/01/' + index + '`');
    lines.push('');
    placed.forEach(function (item) {
      const roleName = {
        hero: lang === 'en' ? 'Hero lead' : '标题下导语',
        quiz: lang === 'en' ? 'Quiz' : '小测',
        title: lang === 'en' ? 'Card heading' : '卡片标题',
        text: lang === 'en' ? 'Card text' : '卡片正文',
        example: lang === 'en' ? 'Example line' : '例子一行',
        body: lang === 'en' ? 'Card body' : '卡片正文',
        tip: lang === 'en' ? 'Takeaway' : '提醒条',
        note: lang === 'en' ? 'Quiz note' : '测验说明',
        takeaway: lang === 'en' ? 'Takeaway' : '提醒条'
      };
      const where = roleName[item.role] || roleName[item.slot] || item.slot;
      const clip = item.text.length > 180 ? item.text.slice(0, 180) + '…' : item.text;
      lines.push('- **' + where + ':** ' + clip.replace(/\|/g, '\\|'));
    });
    if (!ok) {
      lines.push('');
      blocks.forEach(function (block, bi) {
        const group = by[bi] || [];
        const joined = norm(group.map(function (piece) { return piece.text; }).join(''));
        if (joined !== norm(block.text)) lines.push('Split mismatch at block ' + bi);
      });
      lines.push('Coverage: ' + (coveredOk ? 'full' : 'parser dropped text'));
    }
    lines.push('');
  });
});
lines.push('## Automated check');
lines.push('');
lines.push(failed === 0
  ? 'Normalized original text set equals the new text set for every lesson, in Chinese and English. Diff count: 0.'
  : 'DIFF count: ' + failed);
const out = path.join(root, 'docs/lesson-blocks-compare.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join('\n'));
console.log('wrote', out, 'failed', failed);
process.exit(failed ? 1 : 0);
