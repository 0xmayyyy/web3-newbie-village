#!/usr/bin/env python3
"""上线前检查：构建、JS 语法、中英文章节对应、关键修订句、以及不依赖浏览器的基本功能。"""
import json, pathlib, re, subprocess, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
JS = ['js/app.js', 'js/i18n.js', 'js/punycode.js', 'js/config.js', 'js/data.js', 'js/data-en.js']

def fail(msg):
    print('FAIL', msg)
    sys.exit(1)

def run(cmd):
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        fail(' '.join(cmd) + '\n' + (r.stdout or '') + (r.stderr or ''))
    return r.stdout

print('build')
run([sys.executable, 'tools/build.py'])

print('syntax')
for name in JS:
    run(['node', '--check', name])

def load(path, assign):
    raw = (ROOT / path).read_text(encoding='utf-8')
    body = raw.split('=', 1)[1].strip().rstrip(';')
    return json.loads(body)['chapters']

zh, en = load('js/data.js', 'SITE_DATA'), load('js/data-en.js', 'SITE_DATA_EN')
if len(zh) != 16 or len(en) != 16:
    fail('expected 16 chapters, got %s %s' % (len(zh), len(en)))
if [c['id'] for c in zh] != [c['id'] for c in en]:
    fail('chapter ids differ')
for a, b in zip(zh, en):
    if len(a['sections']) != len(b['sections']):
        fail('section count %s %s vs %s' % (a['id'], len(a['sections']), len(b['sections'])))
    for sa, sb in zip(a['sections'], b['sections']):
        wa, wb = 'data-widget' in sa['html'], 'data-widget' in sb['html']
        if wa != wb or sa['html'].count('tool-card') != sb['html'].count('tool-card'):
            fail('widget mismatch %s %s / %s' % (a['id'], sa['title'], sb['title']))
print('structure 16 chapters ok')

zh_src = (ROOT / 'content/content.md').read_text(encoding='utf-8')
en_src = (ROOT / 'content/content.en.md').read_text(encoding='utf-8')
zh_data = (ROOT / 'js/data.js').read_text(encoding='utf-8')
en_data = (ROOT / 'js/data-en.js').read_text(encoding='utf-8')
i18n = (ROOT / 'js/i18n.js').read_text(encoding='utf-8')
app = (ROOT / 'js/app.js').read_text(encoding='utf-8')
html = (ROOT / 'index.html').read_text(encoding='utf-8')

need_zh = [
    '多数平台上，放在这里的币不能直接下现货或合约单',
    '2022 年破产前，FTX 曾按交易量排全球第三（据 The Verge 当年 11 月报道）',
    '资金费可能一直吃掉利润（有时也是你收钱）',
    '连接钱包本身一般不会丢币',
    '15,079 枚 fwDETH（当时约值 3500 万～3600 万美元）',
    '同月 10 日前后',
    '不能保证资产绝对安全',
    '出事时这种币可能被全部转走',
    '陌生人或来路不明的活动，先让你签名、付费或交助记词的，基本都是骗局',
    '存入资产可能获得收益',
    '可能获得交易费或奖励',
    '这类工具能帮你查授权、撤授权，但不能保证资产不被盗',
    '#/c/08/4',
]
need_en = [
    'On most platforms, coins kept here cannot be used directly for a spot or contract order',
    'Before its 2022 bankruptcy, FTX ranked third in the world by trading volume (according to a November report that year by The Verge)',
    'sometimes you are the one getting paid',
    'Connecting a wallet, by itself, usually does not lose the coins',
    '15,079 fwDETH (worth about 35 to 36 million dollars at the time)',
    'Around the 10th of that same month',
    'cannot guarantee that assets are absolutely safe',
    'that coin may be transferred away in full',
    'If a stranger, or an activity you cannot trace, first asks you to sign',
    'Depositing an asset may earn a return',
    'may earn trading fees or rewards',
    'These tools can help you check and revoke approvals, but they cannot guarantee the assets will not be stolen',
    '#/c/08/4',
]
for s in need_zh:
    if s not in zh_src or s not in zh_data:
        fail('missing Chinese phrase: ' + s)
for s in need_en:
    if s not in en_src or s not in en_data:
        fail('missing English phrase: ' + s)
banned = ['fwdETH', '#/c/08/5', '不收集任何个人信息', 'does not collect any personal information', 'FTX 当时是全球交易量第三', "world's third-largest"]
blob = zh_src + en_src + zh_data + en_data + i18n
for s in banned:
    if s in blob:
        fail('stale phrase still present: ' + s)
if 'w3nv-progress-v2' not in app:
    fail('progress key changed')
if "esc(x.label)" not in app or "function hl" not in app:
    fail('search highlighting no longer escapes')
# user search text is escaped before it is wrapped in <mark>
hl = app[app.index('function hl'):app.index('function bindSearch')]
if 'esc(s)' not in hl:
    fail('hl() does not escape the snippet')
assets = re.findall(r'(?:css|js)/[\w.-]+\.(?:css|js)\?v=(\d+)', html)
if not assets or any(v == '20261015171108' for v in assets if True):
    # config.js may stay on the old stamp; data/app/i18n/style must not
    stale = re.findall(r'(css/style\.css|js/(?:data|data-en|i18n|app|punycode)\.js)\?v=20261015171108', html)
    if stale:
        fail('stale cache query on ' + ', '.join(stale))
print('phrases, privacy, cache query ok')

print('punycode')
run(['node', 'tools/test_punycode.js'])
print('all release checks passed')
