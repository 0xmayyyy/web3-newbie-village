#!/usr/bin/env python3
"""给 index.html 和 js/app.js 里的静态资源加版本号（防浏览器缓存）。发布前运行：python3 tools/stamp.py
只处理以文件扩展名结尾、紧跟引号的完整资源路径，绝不改拼接中的字符串片段；拼接路径用 app.js 里的 ASSET_V。"""
import re, time, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
V = time.strftime('%Y%m%d%H%M%S')
pat = re.compile(r"""((?:assets/img|css|js)/[\w.-]+\.(?:jpe?g|png|svg|webp|gif|css|js))(\?v=\w*)?(?=["'])""")
for f in ['index.html', 'js/app.js']:
    p = ROOT / f; s = p.read_text(encoding='utf-8')
    s = pat.sub(lambda m: m.group(1) + '?v=' + V, s)
    s = re.sub(r"var ASSET_V = '\w*'", "var ASSET_V = '" + V + "'", s)
    bad = re.findall(r"[\w-]-\?v=|\?v=\w+'\s*\+", s)
    if bad: raise SystemExit(f'{f}: 版本号插在了字符串片段里 {bad}')
    p.write_text(s, encoding='utf-8')
print('version', V)
