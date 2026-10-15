#!/usr/bin/env python3
"""核对打赏地址：config.js 里的地址、二维码解码结果必须与站长原文逐字一致。用法：python3 tools/check_addresses.py [站点根目录或URL]"""
import re, sys, pathlib, urllib.request
EXPECTED = {
  'bnb': '0x496d22b39777f25fd6ef4999dc0def5d21ade8a0',
  'eth': '0x496d22b39777f25fd6ef4999dc0def5d21ade8a0',
  'tron': 'TEYeM3B58MTtpR4kAgrM6zEYZAnoPJdXUU',
  'sol': '38CPbiomk2C9A4DqKyHkv4kndekwp7mftnydD7DmRJAJ',
}
root = sys.argv[1] if len(sys.argv) > 1 else str(pathlib.Path(__file__).resolve().parent.parent)
def get(rel):
    if root.startswith('http'): return urllib.request.urlopen(root.rstrip('/') + '/' + rel + '?nocache=' + __import__('time').strftime('%s'), timeout=30).read()
    return (pathlib.Path(root) / rel).read_bytes()
cfg = get('js/config.js').decode()
found = dict(re.findall(r"key: '(\w+)', chain: '[^']*', address: '([^']*)'", cfg))
ok = True
for k, v in EXPECTED.items():
    r = found.get(k) == v; ok &= r
    print(f'config {k:5} {"OK " if r else "BAD"} {found.get(k)!r}')
if set(found) != set(EXPECTED): ok = False; print('unexpected keys', set(found) ^ set(EXPECTED))
try:
    import cv2, numpy as np, cairosvg
    for k, v in EXPECTED.items():
        png = cairosvg.svg2png(bytestring=get(f'assets/img/donate-qr-{k}.svg'), output_width=400, background_color='white')
        img = cv2.imdecode(np.frombuffer(png, np.uint8), cv2.IMREAD_COLOR)
        img = cv2.copyMakeBorder(img, 40, 40, 40, 40, cv2.BORDER_CONSTANT, value=(255, 255, 255))
        t = cv2.QRCodeDetector().detectAndDecode(img)[0]; r = t == v; ok &= r
        print(f'qr     {k:5} {"OK " if r else "BAD"} {t!r}')
except ImportError as e:
    print('QR decode skipped:', e)
print('ALL OK' if ok else 'MISMATCH'); sys.exit(0 if ok else 1)
