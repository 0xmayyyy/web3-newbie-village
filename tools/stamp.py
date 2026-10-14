#!/usr/bin/env python3
"""给 index.html 和 js/app.js 里的静态资源加版本号（防浏览器缓存）。发布前运行：python3 tools/stamp.py"""
import re, time, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
V = time.strftime('%Y%m%d%H%M%S')
pat = re.compile(r'((?:assets/img/[\w.-]+)|css/style\.css|js/\w+\.js)(\?v=\w+)?')
for f in ['index.html', 'js/app.js']:
    p = ROOT / f; s = p.read_text(encoding='utf-8')
    p.write_text(pat.sub(lambda m: m.group(1) + '?v=' + V, s), encoding='utf-8')
print('version', V)
