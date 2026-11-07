/* node tools/test_punycode.js */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var PUNY = require('../js/punycode.js');

var failed = 0;
function check(name, fn) {
  try { fn(); console.log('ok  ' + name); }
  catch (e) { failed++; console.log('FAIL ' + name + '\n    ' + (e && e.stack ? e.stack.split('\n').slice(0, 3).join('\n    ') : e)); }
}
function eq(a, b) { assert.strictEqual(a, b); }

check('例子.中国 → punycode', function () {
  var r = PUNY.convert('例子.中国');
  eq(r.ascii, 'xn--fsqu00a.xn--fiqs8s');
  eq(r.unicode, '例子.中国');
  eq(r.warn, true);
  eq(r.kind, 'to-ascii');
});
check('punycode → 例子.中国', function () {
  var r = PUNY.convert('xn--fsqu00a.xn--fiqs8s');
  eq(r.unicode, '例子.中国');
  eq(r.ascii, 'xn--fsqu00a.xn--fiqs8s');
  eq(r.outHost, '例子.中国');
  eq(r.warn, true);
});
check('大写 punycode 往返', function () {
  var r = PUNY.convert('XN--FSQU00A.XN--FIQS8S');
  eq(r.unicode, '例子.中国');
  eq(r.ascii, 'xn--fsqu00a.xn--fiqs8s');
});
check('普通 binance.com 不报警', function () {
  var r = PUNY.convert('binance.com');
  eq(r.ascii, 'binance.com');
  eq(r.unicode, 'binance.com');
  eq(r.warn, false);
  eq(r.kind, 'same');
});
check('英文仿写 binonce.com 也不当成形似字报警', function () {
  var r = PUNY.convert('binonce.com');
  eq(r.ascii, 'binonce.com');
  eq(r.warn, false);
});
check('西里尔 с 和 е → xn--abd-tdd2d', function () {
  var r = PUNY.convert(PUNY.EX_CYR);
  eq(r.ascii, 'xn--abd-tdd2d');
  eq(r.warn, true);
  eq(r.unicode.indexOf('\u0441') >= 0, true);
  eq(r.unicode.indexOf('\u0435') >= 0, true);
  eq(PUNY.markNote(r.unicode).indexOf('U+0441') >= 0, true);
  eq(PUNY.markNote(r.unicode).indexOf('U+0435') >= 0, true);
});
check('https 只替换主机，路径查询哈希保留', function () {
  var r = PUNY.convert('https://例子.中国/路径?q=1#哈');
  eq(r.ascii, 'xn--fsqu00a.xn--fiqs8s');
  eq(r.rebuilt, 'https://xn--fsqu00a.xn--fiqs8s/路径?q=1#哈');
});
check('账号、密码、端口原样留着', function () {
  var raw = 'https://user:pass@例子.中国:8443/路径?q=1#哈';
  var r = PUNY.convert(raw);
  eq(r.ascii, 'xn--fsqu00a.xn--fiqs8s');
  eq(r.userinfo, true);
  eq(r.rebuilt, 'https://user:pass@xn--fsqu00a.xn--fiqs8s:8443/路径?q=1#哈');
});
check('@ 后面才是域名', function () {
  var r = PUNY.convert('https://good.com@evil.com/phish');
  eq(r.ascii, 'evil.com');
  eq(r.unicode, 'evil.com');
  eq(r.userinfo, true);
  eq(r.rebuilt, 'https://good.com@evil.com/phish');
  eq(r.warn, false);
});
check('多个 @ 以最后一个为准', function () {
  var r = PUNY.convert('https://a@b@evil.com/x');
  eq(r.ascii, 'evil.com');
  eq(r.rebuilt.indexOf('@evil.com/x') > 0, true);
});
check('默认端口和查询哈希保留', function () {
  var r = PUNY.convert('https://example.com:443/a?b=1#c');
  eq(r.ascii, 'example.com');
  eq(r.rebuilt, 'https://example.com:443/a?b=1#c');
});
check('IPv6 不编成 punycode', function () {
  var r = PUNY.convert('https://[::1]:8080/a');
  eq(r.ip, true);
  eq(r.ascii, '[::1]');
  eq(r.warn, false);
  eq(r.rebuilt, 'https://[::1]:8080/a');
});
check('主机带端口', function () {
  var r = PUNY.convert('binance.com:8080');
  eq(r.ascii, 'binance.com');
  eq(r.rebuilt, 'binance.com:8080');
  eq(r.warn, false);
});
check('拒绝 javascript:', function () {
  var r = PUNY.convert('javascript:alert(1)');
  eq(typeof r.error, 'string');
  eq(r.rebuilt, undefined);
});
check('拒绝 data:', function () {
  eq(typeof PUNY.convert('data:text/html,<script>alert(1)</script>').error, 'string');
});
check('拒绝 file:', function () {
  eq(typeof PUNY.convert('file:///etc/passwd').error, 'string');
  eq(typeof PUNY.convert('file://evil.com/x').error, 'string');
});
check('尖括号当域名会失败，而不是变成可打开的结果', function () {
  var r = PUNY.convert('<script>alert(1)</script>');
  eq(typeof r.error, 'string');
  eq(r.ascii, undefined);
  eq(r.rebuilt, undefined);
});
check('路径里的 script 只当文字保留', function () {
  var raw = 'https://example.com/<script>alert(1)</script>?q="><img>';
  var r = PUNY.convert(raw);
  eq(r.ascii, 'example.com');
  eq(r.rebuilt, raw);
  eq(r.warn, false);
});
check('空输入和纯空白', function () {
  eq(PUNY.convert('').empty, true);
  eq(PUNY.convert('   \n\t').empty, true);
});
check('中间空格', function () {
  eq(typeof PUNY.convert('exa mple.com').error, 'string');
});
check('超长', function () {
  eq(typeof PUNY.convert(new Array(2050).join('a')).error, 'string');
});
check('反斜杠拒绝', function () {
  var r = PUNY.convert('https://example.com\\@evil.com');
  eq(typeof r.error, 'string');
  eq(r.ascii, undefined);
});
check('零宽字符和双向控制符拒绝', function () {
  eq(typeof PUNY.convert('bin\u200bance.com').error, 'string');
  eq(typeof PUNY.convert('\u202ebinance.com').error, 'string');
  eq(typeof PUNY.convert('binance.com\uFEFF').error, 'string');
  eq(typeof PUNY.convert('bina\uFEFFnce.com').error, 'string');
});
check('空标签和坏 punycode', function () {
  eq(typeof PUNY.convert('a..b').error, 'string');
  eq(typeof PUNY.convert('xn--zz').error, 'string');
  eq(typeof PUNY.convert('xn--').error, 'string');
});
check('两种算法不一致就报错', function () {
  var Real = global.URL;
  function Fake(s) {
    var str = String(s);
    if (str.indexOf('disagree.test') >= 0) {
      this.href = 'http://not-the-same.com/';
      this.hostname = 'not-the-same.com';
      return;
    }
    return new Real(str);
  }
  Fake.prototype = Real.prototype;
  global.URL = Fake;
  try {
    var r = PUNY.convert('disagree.test');
    eq(typeof r.error, 'string');
    eq(r.ascii, undefined);
  } finally { global.URL = Real; }
});
check('EXAMPLE.COM 只改大小写，不报警', function () {
  var r = PUNY.convert('EXAMPLE.COM');
  eq(r.ascii, 'example.com');
  eq(r.warn, false);
});
check('bücher 与中文混合标签', function () {
  eq(PUNY.convert('bücher.example').ascii, 'xn--bcher-kva.example');
  eq(PUNY.convert('www.例子.com').ascii, 'www.xn--fsqu00a.com');
});
check('源码不把输入送走，也不 innerHTML 用户内容', function () {
  var dir = path.join(__dirname, '..', 'js');
  var lib = fs.readFileSync(path.join(dir, 'punycode.js'), 'utf8');
  var app = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
  eq(/fetch\s*\(|XMLHttpRequest|sendBeacon|new\s+Image|new\s+WebSocket|document\.write|eval\s*\(/.test(lib), false);
  var body = app.slice(app.indexOf('function renderPuny'), app.indexOf('function route('));
  eq(/\.outerHTML|document\.write|eval\s*\(/.test(body), false);
  eq(/fetch\s*\(|XMLHttpRequest|sendBeacon/.test(body), false);
  eq(body.indexOf('textContent') > 0, true);
  eq((body.match(/innerHTML/g) || []).length, 1);
});

console.log(failed ? '\n' + failed + ' failed' : '\nall passed');
process.exit(failed ? 1 : 0);
