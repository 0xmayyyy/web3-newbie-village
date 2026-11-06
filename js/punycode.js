/* 纯函数：Punycode / IDNA 转换。不访问网络，不读 DOM。浏览器与 Node 都能加载。 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.PUNY = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var BASE = 36, TMIN = 1, TMAX = 26, SKEW = 38, DAMP = 700, BIAS0 = 72, N0 = 128;
  var EX_LATIN = 'binance.com';
  var EX_CYR = 'bin\u0430nce.com';

  function adapt(delta, numPoints, firstTime) {
    delta = firstTime ? Math.floor(delta / DAMP) : Math.floor(delta / 2);
    delta += Math.floor(delta / numPoints);
    var k = 0;
    while (delta > Math.floor(((BASE - TMIN) * TMAX) / 2)) {
      delta = Math.floor(delta / (BASE - TMIN));
      k += BASE;
    }
    return k + Math.floor(((BASE - TMIN + 1) * delta) / (delta + SKEW));
  }
  function codePoints(str) {
    var out = [], i = 0;
    while (i < str.length) {
      var c = str.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < str.length) {
        var c2 = str.charCodeAt(i + 1);
        if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
          out.push(((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000);
          i += 2; continue;
        }
      }
      out.push(c); i++;
    }
    return out;
  }
  function fromCodePoint(cp) {
    if (cp <= 0xFFFF) return String.fromCharCode(cp);
    cp -= 0x10000;
    return String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 0x3FF));
  }
  function encodeDigit(d) { return d + (d < 26 ? 97 : 22); }
  function decodeDigit(cp) {
    if (cp >= 48 && cp <= 57) return cp - 22;
    if (cp >= 65 && cp <= 90) return cp - 65;
    if (cp >= 97 && cp <= 122) return cp - 97;
    return BASE;
  }
  function encodeLabel(input) {
    var cps = codePoints(input), n = N0, delta = 0, bias = BIAS0, out = [], b = 0, i;
    for (i = 0; i < cps.length; i++) if (cps[i] < 128) { out.push(fromCodePoint(cps[i])); b++; }
    var h = b;
    if (b) out.push('-');
    while (h < cps.length) {
      var m = 0x110000;
      for (i = 0; i < cps.length; i++) if (cps[i] >= n && cps[i] < m) m = cps[i];
      if (m === 0x110000 || m - n > Math.floor((0x7FFFFFFF - delta) / (h + 1))) return null;
      delta += (m - n) * (h + 1); n = m;
      for (i = 0; i < cps.length; i++) {
        var cp = cps[i];
        if (cp < n) { delta++; if (delta > 0x7FFFFFFF) return null; }
        if (cp === n) {
          var q = delta, k = BASE;
          for (;;) {
            var t = k <= bias ? TMIN : (k >= bias + TMAX ? TMAX : k - bias);
            if (q < t) break;
            out.push(fromCodePoint(encodeDigit(t + ((q - t) % (BASE - t)))));
            q = Math.floor((q - t) / (BASE - t));
            k += BASE;
          }
          out.push(fromCodePoint(encodeDigit(q)));
          bias = adapt(delta, h + 1, h === b);
          delta = 0; h++;
        }
      }
      delta++; n++;
    }
    return out.join('');
  }
  function decodeLabel(input) {
    if (!input) return null;
    var n = N0, i = 0, bias = BIAS0, output = [], b = input.lastIndexOf('-'), j;
    if (b < 0) b = 0;
    for (j = 0; j < b; j++) {
      var c = input.charCodeAt(j);
      if (c >= 128) return null;
      output.push(c);
    }
    var idx = b > 0 ? b + 1 : 0;
    while (idx < input.length) {
      var oldi = i, w = 1, k = BASE;
      for (;;) {
        if (idx >= input.length) return null;
        var digit = decodeDigit(input.charCodeAt(idx++));
        if (digit >= BASE || digit > Math.floor((0x7FFFFFFF - i) / w)) return null;
        i += digit * w;
        var t = k <= bias ? TMIN : (k >= bias + TMAX ? TMAX : k - bias);
        if (digit < t) break;
        if (w > Math.floor(0x7FFFFFFF / (BASE - t))) return null;
        w *= (BASE - t);
        k += BASE;
      }
      var len = output.length + 1;
      bias = adapt(i - oldi, len, oldi === 0);
      if (Math.floor(i / len) > 0x10FFFF - n) return null;
      n += Math.floor(i / len);
      i %= len;
      output.splice(i, 0, n);
      i++;
    }
    if (!output.length) return null;
    var s = '';
    for (j = 0; j < output.length; j++) {
      if (output[j] > 0x10FFFF || (output[j] >= 0xD800 && output[j] <= 0xDFFF)) return null;
      s += fromCodePoint(output[j]);
    }
    return s;
  }
  function splitTrail(host) {
    if (host.charAt(host.length - 1) === '.') return { body: host.slice(0, -1), trail: '.' };
    return { body: host, trail: '' };
  }
  function emptyLabel(host) {
    var s = host.charAt(host.length - 1) === '.' ? host.slice(0, -1) : host;
    if (!s) return true;
    var parts = s.split('.'), i;
    for (i = 0; i < parts.length; i++) if (!parts[i]) return true;
    return false;
  }
  function encodeDomain(raw) {
    var sp = splitTrail(raw);
    if (!sp.body) return null;
    var norm = sp.body.normalize ? sp.body.normalize('NFC') : sp.body;
    var parts = norm.split('.'), out = [], i;
    for (i = 0; i < parts.length; i++) {
      var lab = parts[i];
      if (!lab || lab.length > 63 && !/[^\u0000-\u007F]/.test(lab)) return null;
      if (/[^\u0000-\u007F]/.test(lab)) {
        var enc = encodeLabel(lab);
        if (enc == null) return null;
        var ace = 'xn--' + enc;
        if (ace.length > 63) return null;
        out.push(ace);
      } else {
        if (/^xn--/i.test(lab)) {
          if (!decodeLabel(lab.slice(4).toLowerCase())) return null;
        }
        out.push(lab.toLowerCase());
      }
    }
    var ascii = out.join('.') + sp.trail;
    var bare = sp.trail ? ascii.slice(0, -1) : ascii;
    if (bare.length > 253) return null;
    return ascii;
  }
  function decodeDomain(ascii) {
    var sp = splitTrail(ascii), parts = sp.body.split('.'), out = [], i;
    if (!sp.body) return null;
    for (i = 0; i < parts.length; i++) {
      var lab = parts[i];
      if (!lab) return null;
      if (/^xn--/i.test(lab)) {
        var dec = decodeLabel(lab.slice(4).toLowerCase());
        if (!dec) return null;
        out.push(dec);
      } else out.push(lab.toLowerCase());
    }
    return out.join('.') + sp.trail;
  }
  function nativeForms(host) {
    if (typeof URL === 'undefined') return { missing: true };
    if (typeof URL.domainToASCII === 'function') {
      var a = '', uni = '';
      try { a = URL.domainToASCII(host) || ''; } catch (e) { return { invalid: true }; }
      if (!a || emptyLabel(a)) return { invalid: true };
      if (typeof URL.domainToUnicode === 'function') {
        try { uni = URL.domainToUnicode(host) || ''; } catch (e2) { uni = ''; }
      }
      return { ascii: a, unicode: uni };
    }
    try {
      var u = new URL('http://' + host);
      var href = u.href, at = href.indexOf('://');
      var hostPart = at >= 0 ? href.slice(at + 3) : href;
      var slash = hostPart.indexOf('/');
      if (slash >= 0) hostPart = hostPart.slice(0, slash);
      if (!hostPart || emptyLabel(hostPart)) return { invalid: true };
      if (/[^\u0000-\u007F]/.test(hostPart)) return { legacy: true, unicode: u.hostname || '' };
      return { ascii: hostPart, unicode: (u.hostname && /[^\u0000-\u007F]/.test(u.hostname)) ? u.hostname : '' };
    } catch (e3) { return { invalid: true }; }
  }
  function idna(host) {
    var nat = nativeForms(host);
    var fbAscii = encodeDomain(host);
    var fbUni = fbAscii ? decodeDomain(fbAscii) : null;
    if (nat.missing) {
      if (!fbAscii || !fbUni || emptyLabel(fbAscii)) return null;
      return { ascii: fbAscii, unicode: fbUni };
    }
    if (nat.invalid) return null;
    if (nat.legacy) {
      if (!fbAscii || !fbUni) return null;
      var shown = nat.unicode || host;
      if (fbUni !== shown && fbUni !== host) return { disagree: true };
      return { ascii: fbAscii, unicode: fbUni };
    }
    if (!fbAscii || !fbUni || nat.ascii !== fbAscii) return { disagree: true };
    if (nat.unicode && nat.unicode !== fbUni) {
      if (/[^\u0000-\u007F]/.test(nat.unicode) || nat.unicode !== nat.ascii) return { disagree: true };
    }
    return { ascii: nat.ascii, unicode: fbUni };
  }
  function forbidden(s) {
    var cps = codePoints(s), i, cp;
    for (i = 0; i < cps.length; i++) {
      cp = cps[i];
      if (cp === 0x5C) return 'backslash';
      if (cp < 0x20 || cp === 0x7F || (cp >= 0x80 && cp <= 0x9F)) return 'control';
      if (cp === 0xAD || cp === 0x180E || cp === 0x200B || cp === 0x200C || cp === 0x200D || cp === 0x200E || cp === 0x200F || cp === 0x202A || cp === 0x202B || cp === 0x202C || cp === 0x202D || cp === 0x202E || cp === 0x2060 || cp === 0x2066 || cp === 0x2067 || cp === 0x2068 || cp === 0x2069 || cp === 0xFEFF) return 'invisible';
    }
    return '';
  }
  function looksDangerous(host, ascii, unicode) {
    var bits = [host, ascii, unicode], i, s;
    for (i = 0; i < bits.length; i++) {
      s = bits[i] || '';
      if (/[^\u0000-\u007F]/.test(s) || /(^|\.)xn--/i.test(s)) return true;
    }
    return false;
  }
  function parse(raw) {
    /* 只去掉两端的普通空白。零宽字符和 BOM 不在这里吞掉，后面会拒绝。 */
    var s = String(raw).replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, '');
    if (!s) return { empty: true };
    if (s.length > 2048) return { error: 'too-long' };
    var bad = forbidden(s);
    if (bad === 'backslash') return { error: 'backslash' };
    if (bad) return { error: 'invisible' };
    if (/\s/.test(s)) return { error: 'space' };
    /* 只把「没有点的那一段 + 冒号」当成协议，避免把 binance.com:8080 误判成协议。 */
    var scheme = s.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):(.*)$/);
    if (scheme && scheme[1].indexOf('.') < 0) {
      if (scheme[2].slice(0, 2) !== '//' || !/^https?$/i.test(scheme[1])) {
        return { error: 'scheme' };
      }
    }
    var prefix = '', rest = s, isUrl = false, abs = s.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/([\s\S]*)$/);
    if (abs && abs[1].indexOf('.') < 0) { prefix = abs[1] + '://'; rest = abs[2]; isUrl = true; }
    else if (s.slice(0, 2) === '//') { prefix = '//'; rest = s.slice(2); isUrl = true; }
    var cut = rest.search(/[/?#]/), auth, suffix;
    if (cut >= 0) { auth = rest.slice(0, cut); suffix = rest.slice(cut); isUrl = true; }
    else { auth = rest; suffix = ''; }
    if (!auth) return { error: 'no-host' };
    var userinfo = '', hp = auth, at = auth.lastIndexOf('@');
    if (at >= 0) { userinfo = auth.slice(0, at + 1); hp = auth.slice(at + 1); }
    var host = hp, port = '', ip = false;
    if (hp.charAt(0) === '[') {
      var br = hp.indexOf(']');
      if (br < 1 || hp.charAt(br) !== ']') return { error: 'brackets' };
      host = hp.slice(0, br + 1);
      port = hp.slice(br + 1);
      ip = true;
    } else {
      var colon = hp.lastIndexOf(':');
      if (colon >= 0) { host = hp.slice(0, colon); port = hp.slice(colon); }
    }
    if (port) {
      if (!/^:\d+$/.test(port)) return { error: 'port' };
      var pn = parseInt(port.slice(1), 10);
      if (pn > 65535) return { error: 'port-range' };
    }
    if (!host) return { error: 'no-host' };
    if (!ip && /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
      var octets = host.split('.'), v4 = true, oi;
      for (oi = 0; oi < octets.length; oi++) if (!/^\d{1,3}$/.test(octets[oi]) || +octets[oi] > 255) v4 = false;
      if (v4) ip = true;
    }
    return { input: s, isUrl: isUrl, prefix: prefix, userinfo: userinfo, host: host, port: port, suffix: suffix, ip: ip };
  }
  function browserAgrees(parsed, forms) {
    if (!parsed.isUrl || parsed.prefix.slice(0, 2) === '//' || typeof URL === 'undefined') return true;
    try {
      var u = new URL(parsed.input);
      var h = u.hostname;
      if (!h) return false;
      return h === forms.ascii || h === forms.unicode || h === parsed.host;
    } catch (e) { return false; }
  }
  function convert(raw) {
    var parsed = parse(raw);
    if (parsed.empty) return { empty: true };
    if (parsed.error) return { error: parsed.error };
    if (parsed.ip) {
      if (typeof URL !== 'undefined') {
        try { new URL('http://' + parsed.host + (parsed.port || '')); }
        catch (e) { return { error: 'bad-ip' }; }
      }
      if (parsed.isUrl && parsed.prefix && !browserAgrees(parsed, { ascii: parsed.host, unicode: parsed.host })) {
        return { error: 'disagree' };
      }
      var rebuiltIp = (parsed.isUrl || parsed.port || parsed.userinfo) ? parsed.prefix + parsed.userinfo + parsed.host + parsed.port + parsed.suffix : '';
      return {
        input: parsed.input, unicode: parsed.host, ascii: parsed.host, outHost: parsed.host,
        rebuilt: rebuiltIp, isUrl: parsed.isUrl, warn: false, userinfo: !!parsed.userinfo, ip: true, kind: 'ip'
      };
    }
    var forms = idna(parsed.host);
    if (!forms) return { error: 'bad-domain' };
    if (forms.disagree) return { error: 'disagree-algo' };
    if (!browserAgrees(parsed, forms)) return { error: 'disagree' };
    var nonAscii = /[^\u0000-\u007F]/.test(parsed.host);
    var hasPuny = /(^|\.)xn--/i.test(parsed.host);
    var outHost, kind;
    if (nonAscii) { outHost = forms.ascii; kind = 'to-ascii'; }
    else if (hasPuny || (forms.unicode !== parsed.host && /[^\u0000-\u007F]/.test(forms.unicode))) { outHost = forms.unicode; kind = 'to-unicode'; }
    else { outHost = forms.ascii; kind = outHost === parsed.host ? 'same' : 'mapped'; }
    var rebuilt = '';
    if (parsed.isUrl || parsed.port || parsed.userinfo) rebuilt = parsed.prefix + parsed.userinfo + outHost + parsed.port + parsed.suffix;
    return {
      input: parsed.input,
      unicode: forms.unicode,
      ascii: forms.ascii,
      outHost: outHost,
      rebuilt: rebuilt,
      isUrl: parsed.isUrl,
      warn: looksDangerous(parsed.host, forms.ascii, forms.unicode),
      userinfo: !!parsed.userinfo,
      ip: false,
      kind: kind
    };
  }
  function scriptKind(cp) {
    if (cp >= 0x0400 && cp <= 0x052F) return 'cyrillic';
    if (cp >= 0x0370 && cp <= 0x03FF) return 'greek';
    if (cp >= 0xFF01 && cp <= 0xFF5E) return 'fullwidth';
    if (cp >= 0x4E00 && cp <= 0x9FFF) return 'han';
    return 'other';
  }
  function kindName(cp, lang) {
    var en = lang === 'en';
    var key = scriptKind(cp);
    if (key === 'cyrillic') return en ? 'Cyrillic' : '西里尔字母';
    if (key === 'greek') return en ? 'Greek' : '希腊字母';
    if (key === 'fullwidth') return en ? 'fullwidth' : '全角字符';
    if (key === 'han') return en ? 'Han' : '汉字';
    return en ? 'non-English' : '非英文字符';
  }
  function markNote(text, lang) {
    var en = lang === 'en';
    var cps = codePoints(text), seen = {}, parts = [], han = 0, other = 0, i, cp, hex;
    for (i = 0; i < cps.length; i++) {
      cp = cps[i];
      if (cp <= 127 || seen[cp]) continue;
      seen[cp] = 1;
      if (scriptKind(cp) === 'han') han++;
      else {
        other++;
        hex = ('0000' + cp.toString(16).toUpperCase()).slice(-4);
        parts.push(en
          ? '"' + fromCodePoint(cp) + '" is ' + kindName(cp, 'en') + ' U+' + hex
          : '「' + fromCodePoint(cp) + '」是' + kindName(cp) + ' U+' + hex);
      }
    }
    if (!han && !other) return '';
    if (!other) return en ? 'The highlighted characters are Han, not English letters.' : '标出的字符是汉字，不是英文字母。';
    if (han) parts.push(en ? 'there are also Han characters' : '另外还有汉字');
    return en
      ? 'Highlighted: ' + parts.join('; ') + '. Not ordinary English letters.'
      : '标出的字符：' + parts.join('，') + '。不是普通英文字母。';
  }
  return {
    convert: convert,
    markNote: markNote,
    codePoints: codePoints,
    fromCodePoint: fromCodePoint,
    kindName: kindName,
    EX_LATIN: EX_LATIN,
    EX_CYR: EX_CYR
  };
});
