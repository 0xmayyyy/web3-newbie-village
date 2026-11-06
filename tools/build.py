#!/usr/bin/env python3
"""把 content/content.md 转为 js/data.js，并把 content/content.en.md 转为 js/data-en.js。

中文是源文。改中文后运行：python3 tools/build.py
英文文件与中文章节、小节一一对应。中文 data.js 的生成结果应与只构建中文时一致。
"""
import re, json, html, pathlib, markdown
from urllib.parse import urlparse
ROOT = pathlib.Path(__file__).resolve().parent.parent
URL_RE = re.compile(r'https?://[^\s，。；、）)」]+')

# 英文稿里的「用途：」和全角冒号是构建标记，不会原样显示在页面上。
LANGS = {
    'zh': {
        'home': '首页',
        'sep': '｜',
        'purpose': '用途：',
        'tip_re': r'<p>(小提醒：.+?)</p>',
        'pending': '⏳ 待核验',
        'pick': '⭐ 新手首选',
        'domain': '域名：',
        'btn14': '打开官网',
        'btn_other': '前往',
        'sr': '（新窗口，{d}）',
        'more_summary': '更多工具（展开）',
        'more_close': '<p>使用提示',
        'btn_wp': '按钮：阅读原文',
        'btn_binance': '按钮：注册币安',
        'btn_slang': '按钮：查一个词',
        'widgets': {
            ('05', '邀请注册导航'): 'exchanges',
            ('05', '链上交易工具'): 'onchain',
            ('16', '安全自测'): 'quiz',
            ('16', '模拟现货盈亏计算器'): 'calculator',
            ('16', '转账前检查清单'): 'checklist',
        },
    },
    'en': {
        'home': 'Home',
        'sep': '｜',
        'purpose': '用途：',
        'tip_re': r'<p>(Note: .+?)</p>',
        'pending': '⏳ Not checked yet',
        'pick': '⭐ Good for beginners',
        'domain': 'Domain: ',
        'btn14': 'Open site',
        'btn_other': 'Open',
        'sr': '(new window, {d})',
        'more_summary': 'More tools',
        'more_close': '<p>Before you use them',
        'btn_wp': 'Buttons: whitepaper',
        'btn_binance': 'Buttons: binance-wallet',
        'btn_slang': 'Buttons: slang',
        'widgets': {
            ('05', 'Referral sign-up links'): 'exchanges',
            ('05', 'On-chain trading tools'): 'onchain',
            ('16', 'Safety quiz'): 'quiz',
            ('16', 'Practice spot P&L calculator'): 'calculator',
            ('16', 'Checklist before a transfer'): 'checklist',
        },
    },
}

def esc(s): return html.escape(s, quote=True)
def domain(u): return urlparse(u).netloc

def build(src, lang):
    L = LANGS[lang]
    widgets = L['widgets']

    def link_html(u):
        return (f'<a class="ext" href="{esc(u)}" target="_blank" rel="noopener noreferrer nofollow" data-url="{esc(u)}">{esc(u)}</a>'
                f'<span class="ext-meta"><span class="domain">🌐 {esc(domain(u))}</span><span class="verify" data-url="{esc(u)}">{L["pending"]}</span></span>')

    def tool_html(name, u, desc, btn):
        pick = name.startswith('★ ')
        if pick: name = name[2:]
        return (f'<div class="tool-card"><div class="tool-head"><strong>{esc(name)}</strong>' + (f'<span class="pick-tag">{L["pick"]}</span>' if pick else '') +
                f'<span class="verify" data-url="{esc(u)}">{L["pending"]}</span></div>'
                f'<p>{esc(desc)}</p><p class="domain">{L["domain"]}<b>{esc(domain(u))}</b></p>'
                f'<a class="btn btn-sm ext" href="{esc(u)}" target="_blank" rel="noopener noreferrer nofollow" data-url="{esc(u)}">{btn} ↗ <span class="sr">{L["sr"].format(d=esc(domain(u)))}</span></a></div>')

    def convert(body, cid, stitle):
        tokens = {}
        def tok(h):
            k = f'@@T{len(tokens)}@@'; tokens[k] = h; return '\n\n' + k + '\n\n'
        w = widgets.get((cid, stitle))
        if w:
            if w in ('exchanges', 'onchain', 'cexboard'):
                intro = body.split('|')[0].strip()
                return markdown.markdown(intro) + f'<div data-widget="{w}"></div>'
            return f'<div data-widget="{w}"></div>'
        lines = body.split('\n'); out = []; i = 0; more = False
        while i < len(lines):
            ln = lines[i]
            m = re.match(r'^([^：\s-][^：]{0,30})：(https?://\S+)(?:\s+—\s+(.+))?$', ln.strip())
            if cid in ('12', '14') and m:
                desc = m.group(3) or ''
                if not desc and i + 1 < len(lines) and lines[i + 1].startswith(L['purpose']):
                    desc = lines[i + 1]
                    if lang != 'zh':
                        desc = desc[len(L['purpose']):].lstrip()
                    i += 1
                out.append(tok(tool_html(m.group(1), m.group(2), desc, L['btn14'] if cid == '14' else L['btn_other']))); i += 1; continue
            if ln.strip() == '@@MORE@@':
                out.append(tok('@@MOREOPEN@@')); more = True; i += 1; continue
            if ln.startswith(L['btn_wp']):
                out.append(tok('<div data-widget="wpbuttons"></div>')); i += 1; continue
            if ln.startswith(L['btn_binance']):
                out.append(tok('<div data-widget="binancewallet"></div>')); i += 1; continue
            if ln.startswith(L['btn_slang']):
                i += 1; continue
            out.append(ln); i += 1
        text = '\n'.join(out)
        def mdlink(m):
            u = m.group(2)
            if u.startswith('#'):
                return tok(f'<a href="{esc(u)}">{esc(m.group(1))}</a>').strip()
            return tok(f'<a class="src" href="{esc(u)}" target="_blank" rel="noopener noreferrer nofollow" data-url="{esc(u)}">{esc(m.group(1))} ↗</a>').strip()
        text = re.sub(r'\[([^\]]+)\]\(((?:https?://|#)[^)\s]+)\)', mdlink, text)
        text = URL_RE.sub(lambda m: tok(link_html(m.group(0))).strip(), text)
        h = markdown.markdown(text, extensions=['tables', 'nl2br', 'sane_lists'])
        for k, v in tokens.items():
            h = h.replace(f'<p>{k}</p>', v).replace(k, v)
        h = re.sub(r'((?:<div class="tool-card">.*?</a></div>\s*)+)', lambda m: '<div class="tool-grid">' + m.group(1) + '</div>', h, flags=re.S)
        if more:
            h = h.replace('@@MOREOPEN@@', '<details class="more-tools"><summary>' + L['more_summary'] + '</summary>', 1)
            k = h.find(L['more_close'], h.find('more-tools'))
            h = h[:k] + '</details>' + h[k:] if k >= 0 else h + '</details>'
        h = h.replace('<table>', '<div class="table-wrap" tabindex="0"><table>').replace('</table>', '</table></div>')
        return h

    def plain(h):
        t = re.sub(r'<[^>]+>', ' ', h); t = html.unescape(t)
        return re.sub(r'\s+', ' ', t).strip()

    parts = re.split(r'^# (?!#)', src, flags=re.M)
    blocks = {p.split('\n', 1)[0].strip(): p.split('\n', 1)[1] for p in parts if p.strip()}
    toc = []
    for m in re.finditer(r'^\| (\d\d) \| (.+?) \| (.+?) \| (.+?) \|$', blocks[L['home']], re.M):
        mm = re.match(r'^(.*?)\s*([\U0001F000-\U0001FFFF\u2600-\u27BF\uFE0F]+)$', m.group(2).strip())
        toc.append(dict(id=m.group(1), title=mm.group(1), emoji=mm.group(2), intro=m.group(3), tags=[t.strip() for t in m.group(4).split('/')]))
    chapters = []
    for t in toc:
        key = next(k for k in blocks if k.startswith(t['id'] + L['sep']))
        body = blocks[key]
        secs = re.split(r'^## ', body, flags=re.M)
        sections = []
        for s in secs[1:]:
            st, sb = s.split('\n', 1)
            h = convert(sb.strip(), t['id'], st.strip())
            sections.append(dict(title=st.strip(), html=h, text=plain(h) if 'data-widget' not in h else plain(sb).replace('**', '')))
        last = sections[-1]
        m = re.search(L['tip_re'], last['html'])
        if m:
            last['html'] = last['html'].replace(m.group(0), '')
            t['tip'] = m.group(1)
        t['sections'] = sections
        chapters.append(t)
    return chapters

def main():
    zh_src = (ROOT / 'content/content.md').read_text(encoding='utf-8')
    en_src = (ROOT / 'content/content.en.md').read_text(encoding='utf-8')
    zh = build(zh_src, 'zh')
    en = build(en_src, 'en')
    if [c['id'] for c in zh] != [c['id'] for c in en]:
        raise SystemExit('English chapter ids do not match Chinese')
    for a, b in zip(zh, en):
        if len(a['sections']) != len(b['sections']):
            raise SystemExit('Section count mismatch in chapter %s\n zh: %s\n en: %s' % (
                a['id'], [s['title'] for s in a['sections']], [s['title'] for s in b['sections']]))
    zh_path = ROOT / 'js/data.js'
    en_path = ROOT / 'js/data-en.js'
    zh_path.write_text('/* 自动生成：python3 tools/build.py，勿手改 */\nwindow.SITE_DATA = ' + json.dumps(dict(chapters=zh), ensure_ascii=False) + ';\n', encoding='utf-8')
    en_path.write_text('/* 自动生成：python3 tools/build.py，勿手改。英文课程，中文仍以 content.md / data.js 为准。 */\nwindow.SITE_DATA_EN = ' + json.dumps(dict(chapters=en), ensure_ascii=False) + ';\n', encoding='utf-8')
    print('chapters', len(zh), 'sections', sum(len(c['sections']) for c in zh))

if __name__ == '__main__':
    main()
