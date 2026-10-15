#!/usr/bin/env python3
"""无头浏览器检查：打开打赏弹窗，逐个切换链，确认二维码图片真正加载（naturalWidth>0）且 URL 返回 200。
用法：python3 tools/check_qr_browser.py [站点URL，默认 http://localhost:8765/] [截图目录]"""
import sys, urllib.request, urllib.parse
from playwright.sync_api import sync_playwright
B = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
shots = sys.argv[2] if len(sys.argv) > 2 else None
ok = True; errs = []; n = 0
with sync_playwright() as p:
    br = p.chromium.launch(); pg = br.new_page(viewport={'width': 1366, 'height': 900})
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
    pg.goto(B + '#/'); pg.wait_for_timeout(800); pg.click('#donate-btn'); pg.wait_for_timeout(500)
    tabs = pg.locator('#donate .don-tabs button')
    for i in range(tabs.count()):
        tabs.nth(i).click(); pg.wait_for_timeout(800)
        img = pg.locator('#donate img.qr:visible').first
        src = img.get_attribute('src'); w = img.evaluate('e => e.complete ? e.naturalWidth : 0')
        try: code = urllib.request.urlopen(urllib.parse.urljoin(B, src), timeout=30).status
        except Exception as e: code = str(e)
        r = w > 0 and code == 200; ok &= r; n += 1
        print(f'{"OK " if r else "BAD"} {tabs.nth(i).inner_text().strip()}: naturalWidth={w} http={code} src={src}')
        if shots: pg.screenshot(path=f'{shots}/qrfix-{i+1}.png')
    br.close()
if n != 4: ok = False; print('expected 4 tabs, got', n)
if errs: ok = False; print('console errors', errs)
print('QR ALL OK' if ok else 'QR FAIL'); sys.exit(0 if ok else 1)
