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
lines.push('Planet chapter `01｜什么是币圈？` (`#/c/01/0` through `#/c/01/10`). Module titles (介绍 / 图解 / 例子 / 风险提醒 / 小测, and the English equivalents) are the only added words and are excluded from the text set.');
lines.push('');
lines.push('Plain (non-card) layout: none. Every original block is placed in one of those cards. A card is omitted only when that lesson has no block of that kind.');
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
    const placed = [];
    const original = [];
    blocks.forEach(function (block) {
      const kind = kindOf(block.tag, block.className, block.text);
      segments(block).forEach(function (part) {
        original.push(norm(part));
        placed.push({ kind: kind, text: part });
      });
    });
    const rebuilt = placed.map(function (item) { return norm(item.text); });
    const missing = original.filter(function (item) { return rebuilt.indexOf(item) < 0; });
    const extra = rebuilt.filter(function (item) { return original.indexOf(item) < 0; });
    const covered = norm(blocks.map(function (block) { return block.text; }).join(''));
    const whole = norm(textOf(section.html));
    const coveredOk = covered === whole;
    const ok = missing.length === 0 && extra.length === 0 && original.length === rebuilt.length && coveredOk;
    if (!ok) failed++;
    lines.push('### ' + (index) + '. ' + section.title + (ok ? ' — match' : ' — DIFF'));
    lines.push('');
    lines.push('Route: `#/c/01/' + index + '`');
    lines.push('');
    placed.forEach(function (item) {
      const where = label(item.kind, lang);
      const clip = item.text.length > 180 ? item.text.slice(0, 180) + '…' : item.text;
      lines.push('- **' + where + ':** ' + clip.replace(/\|/g, '\\|'));
    });
    if (!ok) {
      lines.push('');
      lines.push('Missing: ' + missing.join(' || '));
      lines.push('Extra: ' + extra.join(' || '));
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
