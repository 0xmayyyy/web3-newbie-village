"""本地截图与冒烟测试：先在项目根目录运行 python3 -m http.server 8765"""
import sys
from playwright.sync_api import sync_playwright
B = 'http://localhost:8765/'
out = 'screenshots/'
errs = []
with sync_playwright() as p:
    br = p.chromium.launch()
    for name, vp, mobile in [('desktop', {'width': 1366, 'height': 900}, False), ('mobile', {'width': 390, 'height': 844}, True)]:
        pg = br.new_page(viewport=vp, device_scale_factor=2 if mobile else 1, is_mobile=mobile, has_touch=mobile)
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(B + '#/'); pg.wait_for_timeout(400)
        pg.screenshot(path=f'{out}home-{name}.png', full_page=True)
        pg.goto(B + '#/c/08'); pg.wait_for_timeout(400)
        pg.screenshot(path=f'{out}chapter08-{name}.png', full_page=True)
        pg.screenshot(path=f'{out}chapter08-{name}-viewport.png')
        if mobile:
            pg.goto(B + '#/'); pg.wait_for_timeout(300); pg.click('#donate-btn'); pg.wait_for_timeout(300)
            pg.screenshot(path=f'{out}donate-mobile.png'); pg.keyboard.press('Escape')
        pg.goto(B + '#/c/05'); pg.wait_for_timeout(300)
        pg.screenshot(path=f'{out}chapter05-{name}.png', full_page=True)
    # 功能测试（桌面）
    pg = br.new_page(viewport={'width': 1366, 'height': 900})
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(B + '#/'); pg.fill('#q-home', '强平'); pg.wait_for_timeout(300)
    print('search 强平:', pg.locator('.hero .search-results li').count())
    pg.screenshot(path=f'{out}search-desktop.png')
    pg.fill('#q-home', 'seed phrase'); pg.wait_for_timeout(300)
    print('search seed phrase:', pg.locator('.hero .search-results li').count())
    pg.fill('#q-home', 'zzqqxx'); pg.wait_for_timeout(300)
    print('no result:', pg.inner_text('.hero .search-results'))
    pg.goto(B + '#/c/15'); pg.wait_for_timeout(300)
    for v in [('', '', ''), ('abc', '1', '1'), ('0', '1', '1'), ('100', '110', '-1'), ('100', '-1', '10')]:
        for n, x in zip(['buy', 'sell', 'cost'], v): pg.fill(f'input[name={n}]', x)
        pg.click('.calc button[type=submit]'); print('calc', v, pg.inner_text('.calc-out')[:30])
    for n, x in zip(['buy', 'sell', 'cost'], ['100', '110', '1000']): pg.fill(f'input[name={n}]', x)
    pg.click('.calc button[type=submit]'); print('calc ok', pg.inner_text('.calc-out').replace('\n', ' '))
    for i in range(6): pg.click(f'.opt[data-q="{i}"][data-o="1"]')
    print('quiz', pg.inner_text('.qresult'))
    for c in pg.locator('.checklist input').all(): c.check()
    print('check', pg.inner_text('.ck-out'))
    pg.click('#done-btn'); pg.goto(B + '#/'); pg.wait_for_timeout(200)
    print('progress', pg.inner_text('.progress'))
    pg.goto(B + '#/c/12'); pg.wait_for_timeout(200); pg.click('[data-m=meme]'); pg.fill('#slang-q', '梭哈'); pg.wait_for_timeout(100)
    print('slang', pg.inner_text('.slang-list').replace('\n', ' '))
    pg.screenshot(path=f'{out}chapter12-desktop-viewport.png')
    pg.goto(B + '#/c/13/1'); pg.wait_for_timeout(500)
    pg.screenshot(path=f'{out}tools-desktop.png')
    pg.click('#donate-btn'); pg.wait_for_timeout(300)
    print('donate addr:', pg.inner_text('#donate .addr'))
    pg.screenshot(path=f'{out}donate-desktop.png')
    pg.keyboard.press('Escape')
    print('feedback btn visible:', pg.locator('text=反馈问题').count())
    print('verify badges ch13:', end=' '); pg.goto(B + '#/c/13'); pg.wait_for_timeout(200); print(pg.locator('.verify').count(), set(pg.locator('.verify').all_inner_texts()))
    for c in ['05','11','01','08']:
        pg.goto(B + '#/c/'+c); pg.wait_for_timeout(200); print(c, set(pg.locator('.verify').all_inner_texts()))
    print('pending anywhere:', pg.evaluate('document.body.innerText.includes("待核验")'))
    print('ext links missing rel:', pg.evaluate("[...document.querySelectorAll('a[target=_blank]')].filter(a=>!/noopener/.test(a.rel)).length"))
    br.close()
print('ERRORS', errs)
