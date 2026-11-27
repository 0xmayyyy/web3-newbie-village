#!/usr/bin/env node
/**
 * 从课程数据生成可抓取的入口页、sitemap.xml 和 robots.txt。
 *
 * 用法：
 *   node tools/generate-sitemap.js          写入文件
 *   node tools/generate-sitemap.js --check  只检查，有差异则退出码 1
 *
 * 哈希路由（#/c/01/0）不能写进 sitemap。这里为每个真实页面生成
 * 目录下的 index.html（例如 c/01/0/index.html → /c/01/0/），
 * 页面用 <base href="/"> 加载站点根目录的样式和脚本，并交给现有应用渲染。
 * app.js 的 pathToHash 必须能把这些路径还原成原来的哈希。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://' + fs.readFileSync(path.join(ROOT, 'CNAME'), 'utf8').trim();
const CHECK = process.argv.indexOf('--check') !== -1;
const MARKER = 'w3nv-course-entry';
const GENERATED_ROOTS = ['c', 'p', 'star', 'lab', 'cex', 'punycode', 'r'];
const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

if (ORIGIN !== 'https://0xmay.space') {
  console.error('CNAME 不是 0xmay.space，已停止，避免把 sitemap 写到别的域名。');
  process.exit(1);
}

function loadScript(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}

function loadSite() {
  const context = { window: {} };
  vm.createContext(context);
  loadScript(context, 'js/data.js');
  loadScript(context, 'js/data-en.js');
  loadScript(context, 'js/i18n.js');
  loadScript(context, 'js/data-advanced.js');
  loadScript(context, 'js/star-pack.js');
  ['02', '03', '04', '05', '06', '07', '08'].forEach(function (id) {
    loadScript(context, 'js/star-ch' + id + '.js');
  });
  loadScript(context, 'js/star-chapters-bind.js');
  const zh = context.window.SITE_DATA;
  const en = context.window.SITE_DATA_EN;
  const i18n = context.window.I18N;
  const star = context.window.ADVANCED_STAR;
  if (!zh || !en || !i18n || !star) throw new Error('课程数据没有加载完整');
  if (zh.chapters.length !== en.chapters.length) throw new Error('中英文章节数量不一致');
  zh.chapters.forEach(function (chapter, index) {
    const other = en.chapters[index];
    if (!other || other.id !== chapter.id) throw new Error('中英文章节 id 不一致：' + chapter.id);
    if (chapter.sections.length !== other.sections.length) {
      throw new Error('中英文小节数量不一致：' + chapter.id);
    }
  });
  return { zh: zh, en: en, i18n: i18n, star: star };
}

function fill(tpl, vars) {
  return String(tpl).replace(/\{(\w+)\}/g, function (_, key) {
    return vars[key] == null ? '' : String(vars[key]);
  });
}

function clip(text, max) {
  const chars = Array.from(String(text || ''));
  if (chars.length <= max) return chars.join('');
  let cut = chars.slice(0, max - 1).join('').replace(/\s+\S*$/, '').trim();
  if (!cut) cut = chars.slice(0, max - 1).join('');
  return cut + '…';
}

function summarize(text) {
  let value = String(text || '').replace(/\s+/g, ' ').trim();
  value = value.split(/\s(?:想一想|Think it through)\s/)[0].trim();
  const optionAt = value.search(/\sA\.\s/);
  if (optionAt > 40) value = value.slice(0, optionAt).trim();
  return clip(value, 160);
}

function escAttr(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/'/g, '&#39;');
}

function escText(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function xmlEscape(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const dateCache = {};
function fileDate(rel) {
  if (dateCache[rel]) return dateCache[rel];
  let date = '';
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], {
      cwd: ROOT,
      encoding: 'utf8'
    }).trim();
  } catch (error) {
    date = '';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    date = fs.statSync(path.join(ROOT, rel)).mtime.toISOString().slice(0, 10);
  }
  dateCache[rel] = date;
  return date;
}

function latest(files) {
  return files.map(fileDate).sort().pop();
}

function labCopy() {
  const source = fs.readFileSync(path.join(ROOT, 'js/lab.js'), 'utf8');
  const zh = source.match(/data-lab-i18n=\\"hero\.p\\">([^<]+)/);
  const en = source.match(/"hero\.p": "((?:\\.|[^"\\])*)"/);
  if (!zh || !en) throw new Error('没有从 js/lab.js 读到实验室简介');
  return { zh: zh[1], en: JSON.parse('"' + en[1] + '"') };
}

const PLANETS = [
  { id: 'entry', chapters: [{ id: '01' }, { id: '02' }, { id: '13' }] },
  { id: 'safety', chapters: [{ id: '09' }, { id: '17' }, { id: '15' }] },
  { id: 'trade', chapters: [{ id: '03' }, { id: '04' }, { id: '05' }, { id: '06' }, { id: '07' }] },
  { id: 'wallet', chapters: [{ id: '08' }, { id: '10' }] },
  { id: 'world', chapters: [{ id: '12' }], sections12: [0, 1, 2, 3, 4, 6, 7] },
  { id: 'chance', chapters: [{ id: '11' }, { id: '12' }], sections12: [5, 8, 9, 10, 11] }
];

const STAR_FILE = {
  '01': 'js/data-advanced.js',
  '02': 'js/star-ch02.js',
  '03': 'js/star-ch03.js',
  '04': 'js/star-ch04.js',
  '05': 'js/star-ch05.js',
  '06': 'js/star-ch06.js',
  '07': 'js/star-ch07.js',
  '08': 'js/star-ch08.js'
};

function collect(site) {
  const zh = site.i18n.zh;
  const en = site.i18n.en;
  const byId = {};
  const byIdEn = {};
  site.zh.chapters.forEach(function (chapter) { byId[chapter.id] = chapter; });
  site.en.chapters.forEach(function (chapter) { byIdEn[chapter.id] = chapter; });
  const pages = [];

  function add(page) {
    page.loc = ORIGIN + (page.path === '/' ? '/' : page.path);
    if (page.loc.indexOf('#') !== -1) throw new Error('页面地址含有哈希：' + page.loc);
    pages.push(page);
  }

  add({
    group: 'home',
    path: '/',
    hash: '',
    titleZh: zh['title.home'],
    descZh: zh['meta.desc'],
    descEn: en['meta.desc'],
    lastmod: fileDate('index.html'),
    changefreq: 'weekly',
    priority: '1.0'
  });

  PLANETS.forEach(function (planet, index) {
    const num = ('0' + (index + 1)).slice(-2);
    add({
      group: 'planetHub',
      path: '/p/' + planet.id + '/',
      hash: '#/p/' + planet.id,
      titleZh: fill(zh['title.ch'], { id: num, title: zh['atlas.' + planet.id + '.name'] }),
      descZh: zh['reader.' + planet.id + '.desc'],
      descEn: en['reader.' + planet.id + '.desc'],
      lastmod: latest(['js/data.js', 'js/app.js']),
      changefreq: 'weekly',
      priority: '0.8'
    });
    planet.chapters.forEach(function (item) {
      const chapter = byId[item.id];
      const chapterEn = byIdEn[item.id];
      if (!chapter || !chapterEn) throw new Error('星球章节不存在：' + planet.id + '/' + item.id);
      const indexes = item.id === '12' && planet.sections12 ? planet.sections12 : chapter.sections.map(function (_, i) { return i; });
      const titles = indexes.map(function (i) { return chapter.sections[i].title; });
      const titlesEn = indexes.map(function (i) { return chapterEn.sections[i].title; });
      add({
        group: 'planetChapter',
        path: '/p/' + planet.id + '/' + item.id + '/',
        hash: '#/p/' + planet.id + '/' + item.id,
        titleZh: fill(zh['title.ch'], { id: chapter.id, title: chapter.title }),
        descZh: clip(chapter.intro + '：' + titles.join('、'), 160),
        descEn: clip(chapterEn.intro + ': ' + titlesEn.join(', '), 160),
        lastmod: latest(['js/data.js', 'js/data-en.js']),
        changefreq: 'monthly',
        priority: '0.7'
      });
    });
  });

  site.zh.chapters.forEach(function (chapter, index) {
    const chapterEn = site.en.chapters[index];
    add({
      group: 'basicChapter',
      path: '/c/' + chapter.id + '/',
      hash: '#/c/' + chapter.id,
      titleZh: fill(zh['title.ch'], { id: chapter.id, title: chapter.title }),
      descZh: clip(chapter.intro, 160),
      descEn: clip(chapterEn.intro, 160),
      lastmod: latest(['js/data.js', 'js/data-en.js']),
      changefreq: 'monthly',
      priority: '0.7'
    });
    chapter.sections.forEach(function (section, sectionIndex) {
      const sectionEn = chapterEn.sections[sectionIndex];
      add({
        group: 'basicLesson',
        path: '/c/' + chapter.id + '/' + sectionIndex + '/',
        hash: '#/c/' + chapter.id + '/' + sectionIndex,
        titleZh: fill(zh['title.ch'], { id: chapter.id, title: section.title }),
        descZh: summarize(section.text || section.title),
        descEn: summarize(sectionEn.text || sectionEn.title),
        lastmod: latest(['js/data.js', 'js/data-en.js']),
        changefreq: 'monthly',
        priority: '0.6'
      });
    });
  });

  add({
    group: 'starHub',
    path: '/star/',
    hash: '#/star',
    titleZh: fill(zh['star.docTitle'], { title: zh['atlas.advanced.name'] }),
    descZh: clip(site.star.tagline.zh, 160),
    descEn: clip(site.star.tagline.en, 160),
    lastmod: latest(['js/data-advanced.js', 'js/star-chapters-bind.js']),
    changefreq: 'weekly',
    priority: '0.8'
  });

  Object.keys(site.star.chapters).sort().forEach(function (id) {
    const chapter = site.star.chapters[id];
    const module = (site.star.modules || []).filter(function (item) { return item.id === id; })[0];
    const source = STAR_FILE[id];
    if (!source) throw new Error('进阶章节没有对应数据文件：' + id);
    const blurb = module && module.blurb ? module.blurb : chapter.title;
    add({
      group: 'starChapter',
      path: '/star/' + id + '/',
      hash: '#/star/' + id,
      titleZh: fill(zh['star.docTitle'], { title: chapter.title.zh }),
      descZh: clip(blurb.zh || chapter.title.zh, 160),
      descEn: clip(blurb.en || chapter.title.en, 160),
      lastmod: fileDate(source),
      changefreq: 'monthly',
      priority: '0.7'
    });
    (chapter.lessons || []).forEach(function (lesson) {
      if (lesson.status !== 'live') return;
      const one = lesson.one || lesson.title;
      add({
        group: 'starLesson',
        path: '/star/' + id + '/' + lesson.id + '/',
        hash: '#/star/' + id + '/' + lesson.id,
        titleZh: fill(zh['star.docTitle'], { title: lesson.title.zh }),
        descZh: clip(one.zh || lesson.title.zh, 160),
        descEn: clip(one.en || lesson.title.en, 160),
        lastmod: fileDate(source),
        changefreq: 'monthly',
        priority: '0.6'
      });
    });
  });

  const lab = labCopy();
  add({
    group: 'tool',
    path: '/lab/',
    hash: '#/lab',
    titleZh: '星际行情实验室 · BTC - Web3 新手村',
    descZh: clip(lab.zh, 160),
    descEn: clip(lab.en, 160),
    lastmod: fileDate('js/lab.js'),
    changefreq: 'weekly',
    priority: '0.5'
  });
  add({
    group: 'tool',
    path: '/cex/',
    hash: '#/cex',
    titleZh: zh['cex.title'],
    descZh: clip(zh['cex.lead'], 160),
    descEn: clip(en['cex.lead'], 160),
    lastmod: fileDate('js/app.js'),
    changefreq: 'weekly',
    priority: '0.5'
  });
  add({
    group: 'tool',
    path: '/punycode/',
    hash: '#/punycode',
    titleZh: zh['puny.title'],
    descZh: clip(zh['puny.lead'], 160),
    descEn: clip(en['puny.lead'], 160),
    lastmod: latest(['js/app.js', 'js/punycode.js']),
    changefreq: 'monthly',
    priority: '0.4'
  });

  ['new', 'buy', 'protect'].forEach(function (key) {
    add({
      group: 'path',
      path: '/r/' + key + '/',
      hash: '#/r/' + key,
      titleZh: fill(zh['route.title'], { name: zh['route.' + key], n: 1 }),
      descZh: clip(zh['route.' + key + '.d'], 160),
      descEn: clip(en['route.' + key + '.d'], 160),
      lastmod: fileDate('js/app.js'),
      changefreq: 'monthly',
      priority: '0.4'
    });
  });

  const seen = {};
  pages.forEach(function (page) {
    if (seen[page.loc]) throw new Error('重复 URL：' + page.loc);
    seen[page.loc] = true;
    if (!page.titleZh || !page.descZh || !page.descEn) throw new Error('缺少标题或描述：' + page.loc);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(page.lastmod)) throw new Error('lastmod 不合法：' + page.loc);
  });
  return pages;
}

function sitemapXml(pages) {
  const urls = pages.map(function (page) {
    return [
      '  <url>',
      '    <loc>' + xmlEscape(page.loc) + '</loc>',
      '    <lastmod>' + page.lastmod + '</lastmod>',
      '    <changefreq>' + page.changefreq + '</changefreq>',
      '    <priority>' + page.priority + '</priority>',
      '  </url>'
    ].join('\n');
  }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="' + SITEMAP_NS + '">\n' +
    urls + '\n' +
    '</urlset>\n';
}

function robotsTxt() {
  return 'User-agent: *\nAllow: /\n\nSitemap: ' + ORIGIN + '/sitemap.xml\n';
}

function ensureHome(html) {
  const canonical = '<link rel="canonical" href="' + ORIGIN + '/">';
  if (html.indexOf('rel="canonical"') === -1) {
    html = html.replace(
      '<meta name="description" content="用大白话解释币圈与 Web3 基础知识，提供官方导航、操作指引、安全提醒和币圈话术翻译。">',
      '<meta name="description" content="用大白话解释币圈与 Web3 基础知识，提供官方导航、操作指引、安全提醒和币圈话术翻译。">\n' + canonical
    );
  }
  if (html.indexOf('rel="canonical"') === -1) throw new Error('没能给首页加上 canonical');
  return html;
}

function pageHtml(shell, page) {
  let html = shell.replace(/\n?<link rel="canonical" href="[^"]*">/g, '');
  html = html.replace('<html lang="zh-CN">', '<html lang="zh-CN" data-path-route="1">');
  html = html.replace(
    '<meta charset="utf-8">',
    '<meta charset="utf-8">\n<base href="/">\n<link rel="canonical" href="' + escAttr(page.loc) + '">\n<!-- ' + MARKER + ' -->'
  );
  html = html.replace(/<title>[^<]*<\/title>/, '<title>' + escText(page.titleZh) + '</title>');
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="' + escAttr(page.descZh) + '" data-desc-zh="' + escAttr(page.descZh) + '" data-desc-en="' + escAttr(page.descEn) + '">'
  );
  html = html.replace(/\n<link rel="preload" as="image" href="assets\/hero\/hero-poster\.jpg[^"]*">/, '');
  if (html.indexOf('<base href="/">') === -1) throw new Error('入口页缺少 base：' + page.loc);
  if (html.indexOf(MARKER) === -1) throw new Error('入口页缺少标记：' + page.loc);
  return html;
}

function relPath(page) {
  return page.path.replace(/^\//, '').replace(/\/$/, '') + '/index.html';
}

const pendingWrites = [];
const pendingDeletes = [];

function writeFile(rel, content) {
  const file = path.join(ROOT, rel);
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (current === content) return;
  if (CHECK) pendingWrites.push(rel);
  else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
}

function markerFiles(dir, out) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(function (name) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) markerFiles(full, out);
    else if (name === 'index.html') {
      const text = fs.readFileSync(full, 'utf8');
      if (text.indexOf(MARKER) !== -1) out.push(full);
    }
  });
}

function pruneEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(function (name) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) pruneEmpty(full);
  });
  if (!fs.readdirSync(dir).length) fs.rmdirSync(dir);
}

function appPathToHash() {
  const source = fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8');
  const match = source.match(/function pathToHash\(pathname\) \{[\s\S]*?\n  \}/);
  if (!match) throw new Error('js/app.js 里没有 pathToHash');
  return new Function('pathname', match[0] + '\nreturn pathToHash(pathname);');
}

function assertSitemap(xml, pages) {
  if (xml.indexOf('#') !== -1) throw new Error('sitemap 含有 #');
  if (xml.indexOf('xmlns="' + SITEMAP_NS + '"') === -1) throw new Error('sitemap 命名空间不对');
  const locs = xml.match(/<loc>[^<]*<\/loc>/g) || [];
  if (locs.length !== pages.length) throw new Error('sitemap URL 数量和页面数量不一致');
  pages.forEach(function (page, index) {
    const loc = locs[index].replace(/<\/?loc>/g, '');
    if (loc !== xmlEscape(page.loc)) throw new Error('sitemap 顺序或转义不一致：' + page.loc);
  });
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  blocks.forEach(function (block) {
    ['loc', 'lastmod', 'changefreq', 'priority'].forEach(function (tag) {
      if (block.indexOf('<' + tag + '>') === -1) throw new Error('缺少 ' + tag);
    });
    const lastmod = block.match(/<lastmod>([^<]*)<\/lastmod>/)[1];
    const freq = block.match(/<changefreq>([^<]*)<\/changefreq>/)[1];
    const priority = block.match(/<priority>([^<]*)<\/priority>/)[1];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) throw new Error('lastmod 不合法');
    if (['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].indexOf(freq) === -1) {
      throw new Error('changefreq 不合法');
    }
    if (!/^0\.[0-9]$|^1\.0$/.test(priority)) throw new Error('priority 不合法：' + priority);
  });
}

function counts(pages) {
  const tally = {};
  pages.forEach(function (page) { tally[page.group] = (tally[page.group] || 0) + 1; });
  return tally;
}

function main() {
  const site = loadSite();
  const pages = collect(site);
  const toHash = appPathToHash();
  pages.forEach(function (page) {
    if (!page.hash) return;
    const got = toHash(page.path);
    if (got !== page.hash) throw new Error('pathToHash(' + page.path + ') 得到 ' + got + '，期望 ' + page.hash);
  });

  let home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  home = ensureHome(home);
  writeFile('index.html', home);
  writeFile('sitemap.xml', sitemapXml(pages));
  writeFile('robots.txt', robotsTxt());
  assertSitemap(sitemapXml(pages), pages);

  const keep = {};
  pages.forEach(function (page) {
    if (page.path === '/') return;
    const rel = relPath(page);
    keep[path.join(ROOT, rel)] = true;
    writeFile(rel, pageHtml(home, page));
  });

  const existing = [];
  GENERATED_ROOTS.forEach(function (name) { markerFiles(path.join(ROOT, name), existing); });
  existing.forEach(function (file) {
    if (keep[file]) return;
    pendingDeletes.push(path.relative(ROOT, file));
    if (!CHECK) fs.unlinkSync(file);
  });
  if (!CHECK) GENERATED_ROOTS.forEach(function (name) { pruneEmpty(path.join(ROOT, name)); });

  const tally = counts(pages);
  const report = {
    urls: pages.length,
    home: tally.home || 0,
    planetHubs: tally.planetHub || 0,
    planetChapters: tally.planetChapter || 0,
    basicChapters: tally.basicChapter || 0,
    basicLessons: tally.basicLesson || 0,
    advancedHub: tally.starHub || 0,
    advancedChapters: tally.starChapter || 0,
    advancedLessons: tally.starLesson || 0,
    tools: tally.tool || 0,
    learningPaths: tally.path || 0,
    hashFragments: 0
  };
  const sum = report.home + report.planetHubs + report.planetChapters + report.basicChapters +
    report.basicLessons + report.advancedHub + report.advancedChapters + report.advancedLessons +
    report.tools + report.learningPaths;
  if (sum !== report.urls) throw new Error('分组数量加总不等于 sitemap');
  console.log(JSON.stringify(report, null, 2));

  if (CHECK && (pendingWrites.length || pendingDeletes.length)) {
    console.error('以下生成文件和课程数据不一致：');
    pendingWrites.concat(pendingDeletes).forEach(function (rel) { console.error('  ' + rel); });
    process.exit(1);
  }
}

main();
