#!/usr/bin/env python3
"""把 content/content.md（访客文案）转换为 js/data.js。改文案后运行：python3 tools/build.py"""
import re, json, html, pathlib, markdown
from urllib.parse import urlparse
ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT/'content/content.md').read_text(encoding='utf-8')
URL_RE = re.compile(r'https?://[^\s，。；、）)」]+')

def esc(s): return html.escape(s, quote=True)
def domain(u): return urlparse(u).netloc

def link_html(u):
    return (f'<a class="ext" href="{esc(u)}" target="_blank" rel="noopener noreferrer nofollow" data-url="{esc(u)}">{esc(u)}</a>'
            f'<span class="ext-meta"><span class="domain">🌐 {esc(domain(u))}</span><span class="verify" data-url="{esc(u)}">⏳ 待核验</span></span>')

def tool_html(name, u, desc):
    return (f'<div class="tool-card"><div class="tool-head"><strong>{esc(name)}</strong>'
            f'<span class="verify" data-url="{esc(u)}">⏳ 待核验</span></div>'
            f'<p>{esc(desc)}</p><p class="domain">官方域名：<b>{esc(domain(u))}</b></p>'
            f'<a class="btn btn-sm ext" href="{esc(u)}" target="_blank" rel="noopener noreferrer nofollow" data-url="{esc(u)}">打开官网 ↗ <span class="sr">（新窗口，{esc(domain(u))}）</span></a></div>')

WIDGETS = {
  ('05','邀请注册导航'): 'exchanges',
  ('12','社区玩梗翻译'): None,
  ('15','安全自测'): 'quiz',
  ('15','模拟现货盈亏计算器'): 'calculator',
  ('15','转账前检查清单'): 'checklist',
}

def convert(body, cid, stitle):
    tokens = {}
    def tok(h):
        k = f'@@T{len(tokens)}@@'; tokens[k] = h; return '\n\n' + k + '\n\n'
    w = WIDGETS.get((cid, stitle))
    if w:  # 交互组件替换原文（组件内部完整使用原文文案）
        if w == 'exchanges':
            intro = body.split('|')[0].strip()
            return markdown.markdown(intro) + '<div data-widget="exchanges"></div>'
        return f'<div data-widget="{w}"></div>'
    lines = body.split('\n'); out = []; i = 0
    while i < len(lines):
        ln = lines[i]
        m = re.match(r'^([A-Za-z][\w .]*?)：(https?://\S+)(?:\s+—\s+(.+))?$', ln.strip())
        if cid == '13' and m:
            desc = m.group(3) or ''
            if not desc and i+1 < len(lines) and lines[i+1].startswith('用途：'):
                desc = lines[i+1]; i += 1
            out.append(tok(tool_html(m.group(1), m.group(2), desc))); i += 1; continue
        if ln.startswith('按钮：阅读原文'):
            out.append(tok('<div data-widget="wpbuttons"></div>')); i += 1; continue
        if ln.startswith('按钮：查一个词'):
            i += 1; continue  # 由翻译器组件实现
        out.append(ln); i += 1
    text = '\n'.join(out)
    text = URL_RE.sub(lambda m: tok(link_html(m.group(0))).strip(), text)
    h = markdown.markdown(text, extensions=['tables', 'nl2br', 'sane_lists'])
    for k, v in tokens.items():
        h = h.replace(f'<p>{k}</p>', v).replace(k, v)
    h = h.replace('<table>', '<div class="table-wrap" tabindex="0"><table>').replace('</table>', '</table></div>')
    return h

def plain(h):
    t = re.sub(r'<[^>]+>', ' ', h); t = html.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()

parts = re.split(r'^# (?!#)', src, flags=re.M)
blocks = {p.split('\n',1)[0].strip(): p.split('\n',1)[1] for p in parts if p.strip()}

# 目录表
toc = []
for m in re.finditer(r'^\| (\d\d) \| (.+?) \| (.+?) \| (.+?) \|$', blocks['首页'], re.M):
    mm = re.match(r'^(.*?)\s*([\U0001F000-\U0001FFFF\u2600-\u27BF\uFE0F]+)$', m.group(2).strip())
    toc.append(dict(id=m.group(1), title=mm.group(1), emoji=mm.group(2), intro=m.group(3), tags=[t.strip() for t in m.group(4).split('/')]))

chapters = []
for t in toc:
    key = next(k for k in blocks if k.startswith(t['id']+'｜'))
    body = blocks[key]
    secs = re.split(r'^## ', body, flags=re.M)
    lead = secs[0].strip()
    sections = []
    for s in secs[1:]:
        st, sb = s.split('\n', 1)
        h = convert(sb.strip(), t['id'], st.strip())
        # 末尾的“小提醒”单独成为提示框
        sections.append(dict(title=st.strip(), html=h, text=plain(h) if 'data-widget' not in h else plain(sb)))
    # 每章最后一个小节里的“小提醒”
    last = sections[-1]
    m = re.search(r'<p>(小提醒：.+?)</p>', last['html'])
    if m:
        last['html'] = last['html'].replace(m.group(0), '')
        t['tip'] = m.group(1)
    t['sections'] = sections
    chapters.append(t)

data = dict(chapters=chapters)
(ROOT/'js/data.js').write_text('/* 自动生成：python3 tools/build.py，勿手改 */\nwindow.SITE_DATA = ' + json.dumps(data, ensure_ascii=False) + ';\n', encoding='utf-8')
print('chapters', len(chapters), 'sections', sum(len(c['sections']) for c in chapters))
