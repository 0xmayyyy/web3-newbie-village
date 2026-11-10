/* 星际行情实验室 · V23 integrated into Web3 新手村.
   Chart, studies, and copy follow the confirmed prototype. The site nav is the page nav. */
(function () {
  'use strict';
  let labLangCode = 'zh';
  let labAlive = false;
  let chromeBound = false;
  let newsTagged = false;
  const labListenOff = [];
  function labLang() { return labLangCode; }
  function labT(zh, en) { return labLangCode === 'en' && en ? en : zh; }
  function labListen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    labListenOff.push(function () { target.removeEventListener(type, fn, opts); });
  }
  function labClearListen() {
    labListenOff.splice(0).forEach(function (off) { try { off(); } catch (e) {} });
  }
  const UI_EN = {"brand.lab": "Market Lab", "hero.eye": "WEB3 NEWBIE VILLAGE · MARKET LAB", "hero.h1": "See the market clearly, then decide", "hero.p": "The candlestick chart is the main view, and every indicator can be switched on or off. Liquidations, macro events, and market catalysts sit below so they don't crowd the chart.", "hero.alt": "Advanced knowledge star", "live.connecting": "Connecting", "fs.aria": "View the candlestick chart and MACD full screen", "fs.title": "View the chart full screen", "fs.label": "Full screen", "tf.aria": "Interval", "tf.1m": "1m", "tf.5m": "5m", "tf.15m": "15m", "tf.1h": "1H", "tf.4h": "4H", "tf.1d": "1D", "tf.1w": "1W", "tf.1M": "1M", "coins.aria": "Switch coin", "px.aria": "Quote", "stats.aria": "24-hour stats", "px.high": "24h high", "px.low": "24h low", "px.vol": "24h volume", "px.turn": "24h turnover", "guide": "Chart marks · toggle freely · remembered in this browser", "learn": "? Indicator class", "learn.title": "What these indicators mean", "studies.aria": "Technical indicators", "anno.aria": "Chart-mark switches", "anno.reclaim": "Reclaim EMA200", "anno.reject": "Lose EMA200", "anno.support": "Near support", "anno.resist": "Near resistance", "anno.overbought": "Overbought", "anno.oversold": "Oversold", "anno.bearish_div": "Bearish div.", "anno.bullish_div": "Bullish div.", "anno.vol_break": "Volume break", "anno.vol_shrink_up": "Quiet rise", "anno.vol_dump": "Volume drop", "anno.vol_shrink_down": "Quiet drop", "anno.news": "News", "anno.macro": "Macro", "pane": "MACD (12,26,9) · shares the time axis and crosshair with the candles", "hover": "Hover a candle or MACD to read the same time", "ai.title": "Combined read", "ai.sub": "Technicals, liquidations, news, and macro, with support, resistance, and a view", "ai.pill": "Preparing the read", "ai.lead": "Preparing a read from the latest data…", "sum.support": "Support", "sum.resist": "Resistance", "sum.view": "View", "disclaimer": "This is a rules-based reading of public prices and events, not investment advice. Price and indicators refresh from Binance. News and macro are a hand-kept recent snapshot. Liquidation bands are a model estimate (Bitcoin includes a public retelling).", "ind.title": "Technical indicators", "ind.sub": "Calculated from daily closes. The text below follows only the indicators and marks that are switched on.", "led.title": "Signal check", "led.sub": "What price did after recent marks on this interval (for study, not a forecast)", "liq.title": "Liquidation heatmap", "liq.sub": "Intensity and location (a model estimate, not live exchange orders)", "news.title": "Market catalysts", "news.sub": "Policy, ETFs, exchange risk, and major events first · this copy is a static snapshot", "mac.title": "Macro events", "mac.sub": "Calendar area · the macro items are a static snapshot, not a live feed", "cyc.title": "Cycle comparison", "cyc.sub": "Two lines on one chart: gold is this cycle, blue is the prior cycle", "cyc.this": "This cycle", "cyc.prev": "Prior cycle", "cyc.aria": "This cycle compared with the prior cycle", "foot.coin": "Web3 新手村 · Market Lab", "notice": "Offline / demo: the market feed (public Binance data) did not load. There is no live candlestick chart. Do not read prices, the liquidation estimate, or the news snapshot on this page as live data.", "retry": "Retry", "anno.reclaim.t": "Show or hide reclaiming EMA200", "anno.reject.t": "Show or hide losing EMA200", "anno.support.t": "Show or hide nearby support", "anno.resist.t": "Show or hide nearby resistance", "anno.overbought.t": "Show or hide overbought", "anno.oversold.t": "Show or hide oversold", "anno.bearish_div.t": "Show or hide bearish divergence", "anno.bullish_div.t": "Show or hide bullish divergence", "anno.vol_break.t": "Show or hide volume breakout", "anno.vol_shrink_up.t": "Show or hide a quiet rise", "anno.vol_dump.t": "Show or hide a volume drop", "anno.vol_shrink_down.t": "Show or hide a quiet drop", "anno.news.t": "Show or hide market news", "anno.macro.t": "Show or hide macro events"};
  const NEWS_EN = {"10 月非农就业报告": {"title": "October nonfarm payrolls", "pin": "Oct NFP", "note": "About 165,000 jobs were added, and the market's odds of a December hike rose to about 76.8%.", "biasText": "Bearish", "time": "Released, Nov 6, 21:30"}, "10 月 CPI": {"title": "October CPI", "pin": "Oct CPI", "note": "The nearest risk event. After a warm jobs print, a hotter inflation number would price in even more hiking.", "biasText": "Leans bearish", "time": "Tue Nov 10, 21:30"}, "10 月 PPI": {"title": "October PPI", "pin": "Oct PPI", "note": "A check on producer prices. It can support or challenge the CPI story and the December path.", "biasText": "Leans bearish", "time": "Fri Nov 13, 21:30"}, "FOMC 利率决议与点阵图": {"title": "FOMC decision and dot plot", "pin": "FOMC decision", "note": "The Oct 28 meeting held the policy rate at 3.75%–4.00%. Futures have priced a large chance of a December hike.", "biasText": "Leans bearish", "time": "Dec 10, 03:00 Shanghai (Dec 9, 14:00 ET)"}, "10 月 PCE 物价指数": {"title": "October PCE price index", "pin": "Oct PCE", "note": "The inflation gauge the Fed watches more closely. It can confirm or soften hike expectations.", "biasText": "Neutral, pending", "time": "Nov 25, 21:30"}, "10 月非农新增就业约 16.5 万，市场对 12 月 9 日加息概率升至约 76.8%": {"title": "October payrolls rose about 165,000, and the market's odds of a Dec 9 hike rose to about 76.8%", "pin": "Oct NFP", "note": "A warm labor print supported a more hawkish path and weighed on risk assets.", "biasText": "Bearish", "time": "11/06"}, "美国劳工部把涵盖数字资产的退休金投资规则送交白宫审查": {"title": "The US Labor Department sent a retirement-plan rule covering digital assets to the White House for review", "pin": "Retirement-plan crypto rule", "note": "If it is finalized, it could help longer-term demand. It is not in effect yet.", "biasText": "Bullish", "time": "11/05"}, "民主党拿下参众两院后，CLARITY 法案未在本届过会，将于 2027 年 1 月 3 日到期": {"title": "After Democrats won both chambers, the CLARITY Act was not passed this session and expires on Jan 3, 2027", "pin": "CLARITY Act", "note": "Risk assets jumped on election night, then faded with tech stocks. The regulatory path is still unclear.", "biasText": "Bearish", "time": "11/03–11/04"}, "美国现货比特币 ETF 五日净流出约 12.8 亿美元，2026 年累计净流入转负": {"title": "US spot bitcoin ETFs saw about $1.28 billion of net outflows over five days, and 2026 cumulative net inflows turned negative", "pin": "BTC ETF outflows", "note": "Faster institutional redemptions are the most direct funding pressure this week.", "biasText": "Bearish", "time": "11/02–11/06"}, "币安在 10 月 29 日大额被窃后于 11 月 1 日重开提现，并称已补回约 98% 受影响资产": {"title": "After the large Oct 29 theft, Binance reopened withdrawals on Nov 1 and said about 98% of affected assets had been restored", "pin": "Binance withdrawals reopened", "note": "The payout risk eased. Some stolen funds were still swapped into bitcoin, so the overhang is not fully gone.", "biasText": "Bullish", "time": "11/01–11/03"}, "美国现货以太坊 ETF 11 月至今净流出约 3.65 亿美元，11 月 2 日单日流出约 1.40 亿美元": {"title": "US spot ether ETFs are down about $365 million so far in November, with about $140 million out on Nov 2", "pin": "ETH ETF outflows", "note": "Five sessions total about $365 million of net outflows, of which BlackRock's ETHA is about $346 million. Nov 4 saw about $53 million of net inflows, then the next two days turned negative again.", "biasText": "Bearish", "time": "11/02–11/06"}, "10 月现货以太坊 ETF 净流出约 16.1 亿美元，为产品上市以来最大单月赎回": {"title": "Spot ether ETFs lost about $1.61 billion in October, the largest monthly redemption since launch", "pin": "ETH ETF redemptions", "note": "The redemption wave started in late September and is the most direct funding backdrop for this ETH decline.", "biasText": "Bearish", "time": "October"}, "币安称 10 月 29 日约 63 亿美元被盗后，已补回约 98% 受影响资产，并于 11 月 1 日起分阶段重开提现": {"title": "Binance said that after about $6.3 billion was taken on Oct 29, about 98% of affected assets were restored and withdrawals reopened in stages from Nov 1", "pin": "Binance theft restored", "note": "BNB is sensitive to exchange operations and withdrawals. Easing payout risk helps the token, while the remaining assets are still being bought back in the market and OTC.", "biasText": "Bullish", "time": "10/29–11/05"}, "币安将储备证明覆盖代币扩至 44 种，并在 11 月 4 日 08:00（上海时间）再做快照": {"title": "Binance expanded proof-of-reserves coverage to 44 tokens and took another snapshot at 08:00 Shanghai time on Nov 4", "pin": "Binance proof of reserves", "note": "The transparency step helps repair trust. For the short-term price it is mostly a sentiment support.", "biasText": "Bullish", "time": "11/04"}, "BNB Chain 于 11 月 7 日上线 Red Alarm，用于标记高风险 dApp 与合约": {"title": "BNB Chain launched Red Alarm on Nov 7 to flag high-risk dApps and contracts", "pin": "Red Alarm launch", "note": "This is an ecosystem-safety step. It is medium-term, not an immediate price catalyst.", "biasText": "Bullish", "time": "11/07"}, "币安法国实体未获 MiCA 授权，账户将于 2026 年 12 月 31 日前关闭": {"title": "Binance's French entity did not receive MiCA authorization. Accounts close by Dec 31, 2026", "pin": "Binance France accounts", "note": "The effect is limited to the French entity. It is not a global shutdown, but it is a reminder about the European path.", "biasText": "Bearish", "time": "November"}, "波场上 USDT 流通约 942.5 亿美元（截至 11 月 3 日），继续高于以太坊，稳居最大 USDT 结算网络": {"title": "About $94.25 billion of USDT was circulating on Tron as of Nov 3, still ahead of Ethereum and still the largest USDT settlement network", "pin": "Tron USDT stock", "note": "At the end of Q3, Tron USDT was about $92.35 billion and Ethereum about $86.69 billion. Stablecoin turnover is the core fundamental support for TRX.", "biasText": "Bullish", "time": "11/03"}, "截至 11 月 3 日当周，波场稳定币市值增加约 2.565 亿美元，为当周主要公链中增幅最大": {"title": "In the week ending Nov 3, Tron's stablecoin market cap rose about $256.5 million, the largest gain among major chains that week", "pin": "Tron stablecoin growth", "note": "Almost all of the increase was USDT. Network demand is still there, but that does not automatically mean TRX rises in the short term.", "biasText": "Bullish", "time": "10/28–11/03"}, "波场提案 108 于 11 月 2 日生效，优化 TVM 合约存储键处理": {"title": "Tron proposal 108 took effect on Nov 2 and improves how TVM handles contract storage keys", "pin": "Tron proposal 108", "note": "A network-stability upgrade. It does not directly change TRX supply, staking yield, or fees.", "biasText": "Bullish", "time": "11/02"}, "Token Terminal 三季报：波场稳定币转账约 2.18 万亿美元，季度稳定币供应均值约 922.5 亿美元": {"title": "Token Terminal Q3: about $2.18 trillion of stablecoin transfers on Tron, with average quarterly stablecoin supply around $92.25 billion", "pin": "Tron Q3 report", "note": "The settlement-layer position got stronger. Staked-TRX ETF products also widened institutional access in the same period.", "biasText": "Bullish", "time": "Q3 / disclosed 11/02"}};
  const ANNO_EN = {"golden": {"label": "MACD bull cross", "outlook": "DIF crossed above DEA, so momentum may be improving. Crosses can repeat in a range. This is not a buy signal."}, "death": {"label": "MACD bear cross", "outlook": "DIF crossed below DEA, so momentum may be weakening. A strong trend can print a false bear cross. This is not a sell signal."}, "reclaim": {"label": "Reclaim EMA200", "outlook": "Price often steadies or follows the 200 line after a reclaim. A close back under the line is common. Wait to see if the close holds."}, "reject": {"label": "Lose EMA200", "outlook": "Price sometimes moves away from the 200 line after a break. A wick through the line that is quickly bought back can be a liquidity event, not a finished trend change."}, "support": {"label": "Nearby support", "outlook": "Buyers sometimes respond near this price. If it breaks on rising volume, that support can become resistance."}, "resist": {"label": "Nearby resistance", "outlook": "Rallies sometimes stall, fall back, or go sideways here. A strong close above it can turn that resistance into support."}, "overbought": {"label": "Overbought", "outlook": "A push can cool off or go sideways. In a strong trend, overbought conditions can last. A high RSI is not an instant top."}, "oversold": {"label": "Oversold", "outlook": "Oversold markets sometimes bounce. In a downtrend they can stay oversold. A low RSI is not an instant bottom."}, "bearish_div": {"label": "Bearish divergence", "outlook": "Rising price with weaker momentum sometimes rolls over. Divergence can show up several times, or fail and let price make another high."}, "bullish_div": {"label": "Bullish divergence", "outlook": "Falling price with weaker momentum sometimes steadies. Divergence is not a promise of a rally, and failed bullish divergences are common."}, "vol_break": {"label": "Volume break", "outlook": "A high-volume break sometimes continues in that direction. If price quickly falls back into the old range on shrinking volume, it may have been a false break."}, "vol_shrink_up": {"label": "Quiet rise", "outlook": "This only says volume was below the recent baseline during the rise. It does not predict the next candle. A quiet rise can continue or fade."}, "vol_dump": {"label": "Volume drop", "outlook": "Heavier selling sometimes continues. Extreme volume can also be a flush that later bounces. This is not a forecast."}, "vol_shrink_down": {"label": "Quiet drop", "outlook": "This only says volume was below the recent baseline during the drop. It does not predict the next candle. A quiet drop can bounce or grind lower."}, "news": {"label": "Market news", "outlook": "News often moves price around the release, then gets priced in. The bullish or bearish tag is a study label for that context, not an instruction."}, "macro": {"label": "Macro event", "outlook": "High-impact data often widens the range around the release. Direction depends on the surprise versus expectations. A pending item is a risk marker, not a prediction."}};
  const COIN_EN = {"BTC": {"macroLeadEn": "large ETF outflows and expectations of a December rate hike are weighing on price, ", "liqExtraEn": "A public retelling dated Nov 8 also said a break under 72,476 would put about $515 million of cumulative long liquidations in play, and a break above 79,262 about $515 million of short liquidations. The bands are a Nov 7–8 model snapshot and move as price moves."}, "ETH": {"macroLeadEn": "spot ether ETF redemptions and expectations of a December rate hike are weighing on price, "}, "BNB": {"macroLeadEn": "rate-hike expectations and weaker risk appetite are weighing on the exchange token, "}, "TRX": {"macroLeadEn": "rate-hike expectations and dollar liquidity are still weighing on high-turnover public-chain tokens, including TRX, "}};
  function applyLabI18n(root) {
    if (!root || labLang() !== 'en') return;
    root.querySelectorAll('[data-lab-i18n]').forEach(function (el) {
      const v = UI_EN[el.getAttribute('data-lab-i18n')];
      if (v != null) el.textContent = v;
    });
    root.querySelectorAll('[data-lab-i18n-title]').forEach(function (el) {
      const v = UI_EN[el.getAttribute('data-lab-i18n-title')];
      if (v != null) el.setAttribute('title', v);
    });
    root.querySelectorAll('[data-lab-i18n-aria]').forEach(function (el) {
      const v = UI_EN[el.getAttribute('data-lab-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });
    root.querySelectorAll('[data-lab-i18n-alt]').forEach(function (el) {
      const v = UI_EN[el.getAttribute('data-lab-i18n-alt')];
      if (v != null) el.setAttribute('alt', v);
    });
  }
  function Litem(item) {
    if (!item || labLang() !== 'en' || !item.en) return item;
    const en = item.en;
    return Object.assign({}, item, {
      title: en.title || item.title,
      note: en.note || item.note,
      pin: en.pin || item.pin,
      biasText: en.biasText || item.biasText,
      timeDisplay: en.time || item.time,
    });
  }
  function tagNews() {
    if (newsTagged) return;
    newsTagged = true;
    const visit = function (item) { if (item && NEWS_EN[item.title]) item.en = NEWS_EN[item.title]; };
    MACRO.forEach(visit);
    [NEWS_NFP, NEWS_DOL, NEWS_ELECTION].forEach(visit);
    Object.keys(COINS).forEach(function (id) {
      (COINS[id].news || []).forEach(visit);
      if (COIN_EN[id]) Object.assign(COINS[id], COIN_EN[id]);
    });
  }
  function annoMeta(kind) {
    const table = ANNO_META;
    const base = table[kind] || {};
    if (labLang() !== 'en') return base;
    const extra = ANNO_EN[kind];
    return extra ? Object.assign({}, base, extra) : base;
  }
  const LAB_HTML = "<div id=\"v6-data-notice\" class=\"lab-notice\" role=\"status\" style=\"display:none;position:fixed;bottom:18px;left:18px;right:18px;max-width:560px;z-index:100001;padding:14px 18px;border-radius:15px;background:rgba(31,21,55,.97);color:#f0d7ad;border:1px solid rgba(222,172,91,.55);box-shadow:0 12px 35px #0008;font:14px/1.6 Outfit,system-ui\">\n  <span data-lab-i18n=\"notice\">离线 / 演示状态：行情源没有连上（Binance 公共接口）。这里没有实时 K 线。页面上的价格、清算估算和新闻快照都不要当成实时行情。</span>\n  <button type=\"button\" id=\"lab-retry\" data-lab-i18n=\"retry\" style=\"margin-left:10px;background:#5d428b;color:white;border:0;border-radius:8px;padding:5px 12px;cursor:pointer\">重试</button>\n</div>\n<div class=\"page\">\n<div class=\"lab-brand\">\n  <img class=\"lab-mark\" src=\"assets/lab/mark.svg\" width=\"46\" height=\"46\" alt=\"\">\n  <div class=\"wordmark\">Web3 新手村 <span class=\"brand-sep\">/</span> <span data-lab-i18n=\"brand.lab\">星际行情实验室</span></div>\n</div>\n\n    <div class=\"hero-line\"><div><div class=\"hero-live-row\"><div class=\"header-meta\">\n        <div class=\"live\" id=\"live-status\"><span class=\"dot\"></span><span data-lab-i18n=\"live.connecting\">连接中</span></div>\n        <div class=\"clock\" id=\"clock\">—</div>\n      </div></div>\n<div class=\"eyebrow\" data-lab-i18n=\"hero.eye\">WEB3 NEWBIE VILLAGE · MARKET LAB</div><h1><span data-lab-i18n=\"hero.h1\">把行情看清楚，再做判断</span><span class=\"star-dot\">✦</span></h1><p data-lab-i18n=\"hero.p\">专业 K 线放大到主视觉，指标自由开关；清算、宏观与市场催化事件放在下方，不抢图表空间。</p></div><div class=\"hero-planet\"><img src=\"assets/lab/planet.png\" alt=\"进阶知识星\" data-lab-i18n-alt=\"hero.alt\"></div></div><div class=\"board\" id=\"lab-board\">\n      <section class=\"card chart-card\" id=\"market-chart-card\">\n        <div class=\"card-head chart-head\">\n          <button type=\"button\" id=\"chart-fullscreen-btn\" class=\"chart-fullscreen-btn\" data-lab-i18n-aria=\"fs.aria\" aria-label=\"全屏查看K线与MACD\" aria-pressed=\"false\" data-lab-i18n-title=\"fs.title\" title=\"全屏查看图表\">⛶ <span data-lab-i18n=\"fs.label\">全屏图表</span></button>\n          <div class=\"tf-switch\" role=\"tablist\" data-lab-i18n-aria=\"tf.aria\" aria-label=\"周期\">\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"1m\" data-lab-i18n=\"tf.1m\">1分</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"5m\" data-lab-i18n=\"tf.5m\">5分</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"15m\" data-lab-i18n=\"tf.15m\">15分</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"1h\" data-lab-i18n=\"tf.1h\">1H</button>\n            <button class=\"tf-btn active\" type=\"button\" data-tf=\"4h\" data-lab-i18n=\"tf.4h\">4H</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"1d\" data-lab-i18n=\"tf.1d\">1D</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"1w\" data-lab-i18n=\"tf.1w\">1W</button>\n            <button class=\"tf-btn\" type=\"button\" data-tf=\"1M\" data-lab-i18n=\"tf.1M\">1M</button>\n          </div>\n<nav class=\"coins\" data-lab-i18n-aria=\"coins.aria\" aria-label=\"代币切换\">\n        <button class=\"coin active\" type=\"button\" data-symbol=\"BTC\">BTC</button>\n        <button class=\"coin\" type=\"button\" data-symbol=\"ETH\">ETH</button>\n        <button class=\"coin\" type=\"button\" data-symbol=\"BNB\">BNB</button>\n        <button class=\"coin\" type=\"button\" data-symbol=\"TRX\">TRX</button>\n      </nav>\n        </div>\n        \n        <div class=\"px-strip\" data-lab-i18n-aria=\"px.aria\" aria-label=\"行情摘要\">\n          <div class=\"px-ticker\">\n            <div class=\"px-main\">\n              <div class=\"px-label\" id=\"px-label\">BTC / USDT</div>\n              <div class=\"px\" id=\"last-price\">—</div>\n              <div class=\"px-sub\">\n                <span class=\"px-cny\" id=\"last-cny\">¥—</span>\n                <span class=\"chg\" id=\"last-chg\">—</span>\n              </div>\n            </div>\n            <div class=\"px-stats\" data-lab-i18n-aria=\"stats.aria\" aria-label=\"24小时行情\">\n              <div class=\"px-stat\">\n                <span class=\"px-stat-label\" data-lab-i18n=\"px.high\">24H最高价</span>\n                <span class=\"px-stat-value\" id=\"stat-high\">—</span>\n              </div>\n              <div class=\"px-stat\">\n                <span class=\"px-stat-label\" data-lab-i18n=\"px.low\">24H最低价</span>\n                <span class=\"px-stat-value\" id=\"stat-low\">—</span>\n              </div>\n              <div class=\"px-stat\">\n                <span class=\"px-stat-label\" data-lab-i18n=\"px.vol\">24H成交量</span>\n                <span class=\"px-stat-value\" id=\"stat-vol\">—</span>\n              </div>\n              <div class=\"px-stat\">\n                <span class=\"px-stat-label\" data-lab-i18n=\"px.turn\">24小时成交额</span>\n                <span class=\"px-stat-value\" id=\"stat-turnover\">—</span>\n              </div>\n            </div>\n          </div>\n          <div class=\"anno-guide\"><span data-lab-i18n=\"guide\">图表标记 · 自由开关 · 自动记忆</span><button type=\"button\" id=\"learn-anno\" data-lab-i18n-title=\"learn.title\" title=\"学习指标含义\"><span data-lab-i18n=\"learn\">? 指标课堂</span></button></div><div class=\"anno-toggles\" role=\"group\" data-lab-i18n-aria=\"anno.aria\" aria-label=\"K线标注开关\" id=\"anno-toggles\"><div class=\"unified-studies\" role=\"group\" data-lab-i18n-aria=\"studies.aria\" aria-label=\"技术指标\"><button class=\"study-btn active\" data-study=\"ema20\" aria-pressed=\"true\">EMA 20</button><button class=\"study-btn active\" data-study=\"ema50\" aria-pressed=\"true\">EMA 50</button><button class=\"study-btn active\" data-study=\"macd\" aria-pressed=\"true\">MACD</button><button class=\"study-btn active\" data-study=\"smc\" aria-pressed=\"true\">SMC <small>BOS / CHoCH / FVG</small></button></div>\n            <div class=\"anno-toggle-row\">\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"reclaim\" data-lab-i18n-title=\"anno.reclaim.t\" title=\"显示/隐藏 站上 EMA200\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.reclaim\">站上EMA200</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"reject\" data-lab-i18n-title=\"anno.reject.t\" title=\"显示/隐藏 跌破 EMA200\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.reject\">跌破EMA200</span></button>\n              <button type=\"button\" class=\"anno-toggle on\" data-anno-kind=\"support\" data-lab-i18n-title=\"anno.support.t\" title=\"显示/隐藏 近端支撑\" aria-pressed=\"true\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.support\">近端支撑</span></button>\n              <button type=\"button\" class=\"anno-toggle on\" data-anno-kind=\"resist\" data-lab-i18n-title=\"anno.resist.t\" title=\"显示/隐藏 近端压力\" aria-pressed=\"true\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.resist\">近端压力</span></button>\n            </div>\n            <div class=\"anno-toggle-row\">\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"overbought\" data-lab-i18n-title=\"anno.overbought.t\" title=\"显示/隐藏 超买\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.overbought\">超买</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"oversold\" data-lab-i18n-title=\"anno.oversold.t\" title=\"显示/隐藏 超卖\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.oversold\">超卖</span></button>\n              <button type=\"button\" class=\"anno-toggle on\" data-anno-kind=\"bearish_div\" data-lab-i18n-title=\"anno.bearish_div.t\" title=\"显示/隐藏 顶背离\" aria-pressed=\"true\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.bearish_div\">顶背离</span></button>\n              <button type=\"button\" class=\"anno-toggle on\" data-anno-kind=\"bullish_div\" data-lab-i18n-title=\"anno.bullish_div.t\" title=\"显示/隐藏 底背离\" aria-pressed=\"true\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.bullish_div\">底背离</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"vol_break\" data-lab-i18n-title=\"anno.vol_break.t\" title=\"显示/隐藏 放量突破\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.vol_break\">放量突破</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"vol_shrink_up\" data-lab-i18n-title=\"anno.vol_shrink_up.t\" title=\"显示/隐藏 缩量上涨\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.vol_shrink_up\">缩量上涨</span></button>\n            </div>\n            <div class=\"anno-toggle-row\">\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"vol_dump\" data-lab-i18n-title=\"anno.vol_dump.t\" title=\"显示/隐藏 放量下跌\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.vol_dump\">放量下跌</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"vol_shrink_down\" data-lab-i18n-title=\"anno.vol_shrink_down.t\" title=\"显示/隐藏 缩量下跌\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.vol_shrink_down\">缩量下跌</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"news\" data-lab-i18n-title=\"anno.news.t\" title=\"显示/隐藏 市场新闻\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.news\">市场新闻</span></button>\n              <button type=\"button\" class=\"anno-toggle\" data-anno-kind=\"macro\" data-lab-i18n-title=\"anno.macro.t\" title=\"显示/隐藏 宏观事件\" aria-pressed=\"false\"><span class=\"eye\" aria-hidden=\"true\"></span><span class=\"anno-toggle-label\" data-lab-i18n=\"anno.macro\">宏观事件</span></button>\n            </div>\n          </div>\n        </div>\n        <div class=\"chart-wrap\">\n          <div id=\"price-chart\" role=\"img\" aria-label=\"BTCUSDT K线图\"></div>\n          <div id=\"anno-layer\" class=\"anno-layer\" aria-hidden=\"true\"></div>\n          <div id=\"anno-tip\" class=\"anno-tip\" hidden>\n            <div class=\"anno-tip-title\"></div>\n            <div class=\"anno-tip-detail\"></div>\n            <div class=\"anno-tip-outlook\">\n              <div class=\"anno-tip-outlook-label\">后续分析</div>\n              <div class=\"anno-tip-outlook-text\"></div>\n            </div>\n            <div class=\"anno-tip-price\"></div>\n          </div>\n        </div>\n        <div class=\"v18-pane-note\"><span data-lab-i18n=\"pane\">MACD (12,26,9) · 与 K 线共用时间轴及十字光标</span>　<span id=\"v18-hover\" data-lab-i18n=\"hover\">鼠标移到 K 线或 MACD，查看同一时间</span></div>\n        <p class=\"chart-note\" id=\"chart-note\" hidden></p>\n      </section>\n\n      <aside class=\"side\">\n        <section class=\"card panel summary-card\" data-panel=\"ai\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"ai.title\">AI 综合研判</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"ai.sub\">综合技术、清算、新闻与宏观，给出支撑 / 压力与看法</p>\n            </div>\n            <div class=\"panel-toggle-right\">\n              <div id=\"view-pill\" class=\"view-pill warn\" data-lab-i18n=\"ai.pill\">研判生成中</div>\n              <span class=\"chev\" aria-hidden=\"true\"></span>\n            </div>\n          </button>\n          <div class=\"panel-body\">\n            <p class=\"summary-lead\" id=\"summary-lead\" data-lab-i18n=\"ai.lead\">正在根据最新数据生成看法…</p>\n            <div class=\"summary-grid\">\n              <article class=\"sum-box\">\n                <h3 data-lab-i18n=\"sum.support\">支撑位</h3>\n                <p id=\"sum-support\">—</p>\n              </article>\n              <article class=\"sum-box\">\n                <h3 data-lab-i18n=\"sum.resist\">压力位</h3>\n                <p id=\"sum-resist\">—</p>\n              </article>\n              <article class=\"sum-box\">\n                <h3 data-lab-i18n=\"sum.view\">行情看法</h3>\n                <p id=\"sum-view\">—</p>\n              </article>\n            </div>\n            <p class=\"disclaimer\" data-lab-i18n=\"disclaimer\">以上为对公开行情与事件的规则化解读，不构成投资建议。价格与指标会随币安数据自动刷新；新闻与宏观为人工梳理的近期快照，清算带为模型估算（比特币含公开转述快照）。</p>\n          </div>\n        </section>\n        <section class=\"card panel\" data-panel=\"indicators\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"ind.title\">技术指标</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"ind.sub\">日线收盘价现场计算，各指标附中文判读</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div id=\"indicator-list\" class=\"ind-list\">\n              <div class=\"skeleton\"></div>\n              <div class=\"skeleton\"></div>\n              <div class=\"skeleton\"></div>\n              <div class=\"skeleton\"></div>\n            </div>\n            <p class=\"panel-note\" id=\"indicator-note\"></p>\n          </div>\n        </section>\n\n        <section class=\"card panel\" data-panel=\"ledger\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"led.title\">信号对账</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"led.sub\">当前周期最近若干次标注之后，价格实际怎么走（仅供学习对照）</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div id=\"ledger-list\" class=\"ledger-list\"></div>\n            <p class=\"panel-note\" id=\"ledger-note\"></p>\n          </div>\n        </section>\n\n        <section class=\"card panel\" data-panel=\"liq\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"liq.title\">强平热力图</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"liq.sub\">清算强度与位置（模型估算，非交易所实时挂单）</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div id=\"liq-map\" class=\"liq-map\"></div>\n            <p class=\"panel-note\" id=\"liq-note\"></p>\n          </div>\n        </section>\n\n        <section class=\"card panel\" data-panel=\"news\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"news.title\">市场催化事件</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"news.sub\">优先关注政策、ETF、交易所风险与重大市场事件 · 原版内容为静态快照</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div id=\"news-list\" class=\"feed\"></div>\n          </div>\n        </section>\n\n        <section class=\"card panel\" data-panel=\"macro\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"mac.title\">宏观事件</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"mac.sub\">经济日历展示区 · 原版宏观数据为静态快照，尚未接入实时免费日历</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div id=\"macro-list\" class=\"feed\"></div>\n          </div>\n        </section>\n\n        <section class=\"card panel\" data-panel=\"cycle\">\n          <button class=\"panel-toggle\" type=\"button\" aria-expanded=\"false\">\n            <div class=\"panel-toggle-text\">\n              <h2 class=\"card-title\" data-lab-i18n=\"cyc.title\">刻舟求剑</h2>\n              <p class=\"card-sub\" data-lab-i18n=\"cyc.sub\">同一张图叠线：金色为本周期，蓝色为上周期</p>\n            </div>\n            <span class=\"chev\" aria-hidden=\"true\"></span>\n          </button>\n          <div class=\"panel-body\">\n            <div class=\"legend\">\n              <span class=\"lg gold\" data-lab-i18n=\"cyc.this\">本周期</span>\n              <span class=\"lg blue\" data-lab-i18n=\"cyc.prev\">上周期</span>\n            </div>\n            <div id=\"cycle-chart\" role=\"img\" data-lab-i18n-aria=\"cyc.aria\" aria-label=\"本周期与上周期走势对照\"></div>\n            <p class=\"panel-note\" id=\"cycle-note\"></p>\n          </div>\n        </section>\n      </aside>\n\n    </div>\n\n    <footer class=\"foot\">\n      <span id=\"foot-coin\" data-lab-i18n=\"foot.coin\">Web3 新手村 · 星际行情实验室</span>\n      <span id=\"foot-source\">数据源：Binance 现货 BTCUSDT · 清算带转述自 CoinGlass / Base Camp / Chaincatcher</span>\n    </footer>\n  </div>\n";
  function ensureLabFonts() {
    if (document.getElementById('lab-fonts')) return;
    const link = document.createElement('link');
    link.id = 'lab-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.bunny.net/css?family=cormorant-garamond:500,600,700|outfit:300,400,500,600|noto-serif-sc:400,500,600,700';
    document.head.appendChild(link);
  }
  function ensureChartsLib() {
    if (window.LightweightCharts && window.LightweightCharts.createChart) return Promise.resolve();
    if (window.__labChartsPromise) return window.__labChartsPromise;
    window.__labChartsPromise = new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/lightweight-charts@5.0.9/dist/lightweight-charts.standalone.production.js';
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('charts')); };
      document.head.appendChild(s);
    });
    return window.__labChartsPromise;
  }
  function initLabLearn() {
    const b = document.getElementById('learn-anno');
    if (!b) return;
    labListen(b, 'click', function () {
      const ok = confirm(labT(
        '进阶知识星的技术指标课程正在规划中。\n\n当前可在图表上自由切换指标，原有设置会保存在本机浏览器。\n\n现在返回新手村首页吗？',
        'The indicators course on the advanced star is still being planned.\n\nYou can toggle indicators on the chart. Those choices stay in this browser.\n\nGo back to the village home?'
      ));
      if (ok) location.hash = '#/';
    });
  }
  function bindLabSmcListeners() {
    labListen(window, 'resize', function () { requestAnimationFrame(drawVillageSmcOverlay); });
    labListen(window, 'wheel', function () { requestAnimationFrame(drawVillageSmcOverlay); }, { passive: true });
    labListen(window, 'pointerup', function () { requestAnimationFrame(drawVillageSmcOverlay); });
  }
  function bindSmcRange() {
    if (!priceChart || priceChart.__smcBound) return;
    priceChart.__smcBound = true;
    priceChart.timeScale().subscribeVisibleLogicalRangeChange(function () { requestAnimationFrame(drawVillageSmcOverlay); });
  }
  function destroyLabCharts() {
    try { if (priceChart) priceChart.remove(); } catch (e) {}
    try { if (cycleChart) cycleChart.remove(); } catch (e) {}
    priceChart = candleSeries = volumeSeries = cycleChart = cycleThisSeries = cyclePrevSeries = null;
    villageEma20 = villageEma50 = villageSmcHi = villageSmcLo = null;
    villageMacdHist = villageMacdDif = villageMacdDea = villageMacdChart = null;
    pillsBound = false;
    tipBound = false;
    chromeBound = false;
  }

const READY_COINS = ["BTC", "ETH", "BNB", "TRX"];

const MACRO = [
  {
    title: "10 月非农就业报告",
    pin: "10月非农",
    time: "已公布，11 月 6 日 21:30",
    bias: "bear",
    biasText: "利空",
    stars: 4,
    note: "新增约 16.5 万，12 月加息概率升至约 76.8%。",
  },
  {
    title: "10 月 CPI",
    pin: "10月CPI",
    time: "11 月 10 日周二 21:30",
    bias: "warn",
    biasText: "偏利空",
    stars: 5,
    note: "近端最大风险事件。就业偏热之后，若通胀再超预期，将进一步强化加息定价。",
  },
  {
    title: "10 月 PPI",
    pin: "10月PPI",
    time: "11 月 13 日周五 21:30",
    bias: "warn",
    biasText: "偏利空",
    stars: 4,
    note: "生产端通胀验证，可能左右 CPI 叙事与 12 月路径。",
  },
  {
    title: "FOMC 利率决议与点阵图",
    pin: "FOMC利率决议",
    time: "12 月 10 日 03:00（12 月 9 日 14:00 ET）",
    bias: "warn",
    biasText: "偏利空",
    stars: 5,
    note: "上次 10 月 28 日维持 3.75%–4.00%；期货已大幅定价 12 月加息。",
  },
  {
    title: "10 月 PCE 物价指数",
    pin: "10月PCE",
    time: "11 月 25 日 21:30",
    bias: "warn",
    biasText: "中性待定",
    stars: 4,
    note: "美联储更看重的通胀指标，可能巩固或修正加息预期。",
  },
];

const NEWS_NFP = {
  title: "10 月非农新增就业约 16.5 万，市场对 12 月 9 日加息概率升至约 76.8%",
  pin: "10月非农",
  time: "11/06",
  bias: "bear",
  biasText: "利空",
  stars: 4,
  note: "就业偏热强化鹰派定价，压制风险资产。",
};

const NEWS_DOL = {
  title: "美国劳工部把涵盖数字资产的退休金投资规则送交白宫审查",
  pin: "退休金加密规则",
  time: "11/05",
  bias: "bull",
  biasText: "利好",
  stars: 3,
  note: "若最终落地，利于长期配置需求，但尚非立即生效。",
};

const NEWS_ELECTION = {
  title: "民主党拿下参众两院后，CLARITY 法案未在本届过会，将于 2027 年 1 月 3 日到期",
  pin: "CLARITY法案",
  time: "11/03–11/04",
  bias: "bear",
  biasText: "利空",
  stars: 3,
  note: "选举当晚风险资产一度冲高，随后随科技股回落；监管路径仍不明朗。",
};

const COINS = {
  BTC: {
    id: "BTC",
    pair: "BTCUSDT",
    digits: 0,
    lastDigits: 2,
    liqScale: 1,
    macroLead: "ETF 大额流出与 12 月加息预期构成压力，",
    liqs: [
      { lo: 77000, hi: 77600, side: "short", usd: 136e6, peak: 77300 },
      { lo: 76300, hi: 76900, side: "short", usd: 288e6, peak: 76645 },
      { lo: 74700, hi: 75300, side: "long", usd: 200e6, peak: 75135 },
      { lo: 74300, hi: 74600, side: "long", usd: 122e6, peak: 74450 },
    ],
    liqExtra: "另据 11 月 8 日公开转述：若跌破 72,476 累计多头清算约 5.15 亿美元；若升破 79,262 累计空头清算约 5.15 亿美元。清算带为 11 月 7–8 日模型快照，会随价格迁移。",
    news: [
      {
        title: "美国现货比特币 ETF 五日净流出约 12.8 亿美元，2026 年累计净流入转负",
        pin: "BTC ETF流出",
        time: "11/02–11/06",
        bias: "bear",
        biasText: "利空",
        stars: 5,
        note: "机构赎回加速，是本周最直接的资金面压力。",
      },
      NEWS_NFP,
      {
        title: "币安在 10 月 29 日大额被窃后于 11 月 1 日重开提现，并称已补回约 98% 受影响资产",
        pin: "币安重开提现",
        time: "11/01–11/03",
        bias: "bull",
        biasText: "利好",
        stars: 3,
        note: "兑付风险缓和；黑客仍将部分赃款换成比特币，抛压阴影未完全消散。",
      },
      NEWS_DOL,
      NEWS_ELECTION,
    ],
  },
  ETH: {
    id: "ETH",
    pair: "ETHUSDT",
    digits: 2,
    lastDigits: 2,
    liqScale: 0.45,
    macroLead: "现货以太坊 ETF 连续赎回与 12 月加息预期构成压力，",
    news: [
      {
        title: "美国现货以太坊 ETF 11 月至今净流出约 3.65 亿美元，11 月 2 日单日流出约 1.40 亿美元",
        pin: "ETH ETF流出",
        time: "11/02–11/06",
        bias: "bear",
        biasText: "利空",
        stars: 4,
        note: "五个交易日累计净流出约 3.65 亿美元，贝莱德 ETHA 约占 3.46 亿；11 月 4 日曾录得约 5300 万美元净流入，随后两日再次转负。",
      },
      {
        title: "10 月现货以太坊 ETF 净流出约 16.1 亿美元，为产品上市以来最大单月赎回",
        pin: "ETH ETF赎回",
        time: "10 月",
        bias: "bear",
        biasText: "利空",
        stars: 5,
        note: "赎回潮自 9 月末延续，是本轮 ETH 承压最直接的资金面背景。",
      },
      NEWS_NFP,
      NEWS_DOL,
      NEWS_ELECTION,
    ],
  },
  BNB: {
    id: "BNB",
    pair: "BNBUSDT",
    digits: 2,
    lastDigits: 2,
    liqScale: 0.18,
    macroLead: "加息预期与风险偏好回落对交易所平台币构成压力，",
    news: [
      {
        title: "币安称 10 月 29 日约 63 亿美元被盗后，已补回约 98% 受影响资产，并于 11 月 1 日起分阶段重开提现",
        pin: "币安被盗补回",
        time: "10/29–11/05",
        bias: "bull",
        biasText: "利好",
        stars: 4,
        note: "BNB 对交易所运营与提现恢复更敏感；兑付风险缓和有助于稳定平台币定价，剩余资产仍在市场与场外补购。",
      },
      {
        title: "币安将储备证明覆盖代币扩至 44 种，并在 11 月 4 日 08:00（上海时间）再做快照",
        pin: "币安储备证明",
        time: "11/04",
        bias: "bull",
        biasText: "利好",
        stars: 3,
        note: "透明度措施有助于修复信任，对短期价格更多是情绪支撑。",
      },
      {
        title: "BNB Chain 于 11 月 7 日上线 Red Alarm，用于标记高风险 dApp 与合约",
        pin: "Red Alarm上线",
        time: "11/07",
        bias: "bull",
        biasText: "利好",
        stars: 2,
        note: "属于生态安全建设，偏中长期，不是立即的价格催化。",
      },
      {
        title: "币安法国实体未获 MiCA 授权，账户将于 2026 年 12 月 31 日前关闭",
        pin: "币安法国关户",
        time: "11 月",
        bias: "bear",
        biasText: "利空",
        stars: 2,
        note: "影响限于法国实体账户，不是全球业务关停，但对欧洲监管路径仍有提醒。",
      },
      NEWS_NFP,
    ],
  },
  TRX: {
    id: "TRX",
    pair: "TRXUSDT",
    digits: 4,
    lastDigits: 5,
    liqScale: 0.08,
    macroLead: "加息预期与美元流动性对包括 TRX 在内的高周转公链代币仍有压制，",
    news: [
      {
        title: "波场上 USDT 流通约 942.5 亿美元（截至 11 月 3 日），继续高于以太坊，稳居最大 USDT 结算网络",
        pin: "波场USDT流通",
        time: "11/03",
        bias: "bull",
        biasText: "利好",
        stars: 4,
        note: "三季度末波场 USDT 约 923.5 亿、以太坊约 866.9 亿；稳定币周转是 TRX 的核心基本面支撑。",
      },
      {
        title: "截至 11 月 3 日当周，波场稳定币市值增加约 2.565 亿美元，为当周主要公链中增幅最大",
        pin: "波场稳定币增长",
        time: "10/28–11/03",
        bias: "bull",
        biasText: "利好",
        stars: 3,
        note: "增幅几乎全部来自 USDT；网络需求仍在，但并不自动等同于 TRX 短期上涨。",
      },
      {
        title: "波场提案 108 于 11 月 2 日生效，优化 TVM 合约存储键处理",
        pin: "波场提案108",
        time: "11/02",
        bias: "bull",
        biasText: "利好",
        stars: 2,
        note: "属网络稳定性升级，不直接改变 TRX 供给、质押收益或手续费。",
      },
      {
        title: "Token Terminal 三季报：波场稳定币转账约 2.18 万亿美元，季度稳定币供应均值约 922.5 亿美元",
        pin: "波场三季报",
        time: "Q3 / 11/02 披露",
        bias: "bull",
        biasText: "利好",
        stars: 3,
        note: "结算层地位进一步巩固；同期质押型 TRX ETF 等产品也扩大了机构接触面。",
      },
      NEWS_NFP,
    ],
  },
};

const ANNO_KINDS = [
  "golden", "death", "reclaim", "reject", "support", "resist",
  "overbought", "oversold", "bearish_div", "bullish_div",
  "vol_break", "vol_shrink_up", "vol_dump", "vol_shrink_down",
  "news", "macro",
];

const LEDGER_KINDS = ANNO_KINDS.filter((k) => k !== "news" && k !== "macro");

const BAR_SECONDS = {
  "1m": 60, "5m": 300, "15m": 900, "1h": 3600, "4h": 14400,
  "1d": 86400, "1w": 604800, "1M": 2592000,
};

const ANNO_META = {
  golden: {
    label: "MACD金叉",
    bull: true,
    outlook: "MACD 的 DIF 上穿 DEA，表示动量可能改善；震荡区可能反复交叉，不是买入保证。",
  },
  death: {
    label: "MACD死叉",
    bull: false,
    outlook: "MACD 的 DIF 下穿 DEA，表示动量可能转弱；强势行情也可能出现假死叉，不是卖出保证。",
  },
  reclaim: {
    label: "站上EMA200",
    bull: true,
    outlook: "后续常见可能：中期结构有所修复，价格有时会沿 200 线再走强。注意：假突破后重新跌回均线下方并不少见，需看收盘是否站稳。",
  },
  reject: {
    label: "跌破EMA200",
    bull: false,
    outlook: "后续常见可能：中期转弱，价格有时会远离 200 线下行。注意：插针跌破后迅速收回，可能只是流动性事件，不等于趋势已经翻转。",
  },
  support: {
    label: "近端支撑",
    bull: true,
    outlook: "后续常见可能：价格在此附近获得买盘回弹。注意：支撑被放量跌破后，原支撑可能变成压力。",
  },
  resist: {
    label: "近端压力",
    tone: "warn",
    outlook: "后续常见可能：上涨在此附近受阻、回落或盘整。注意：放量站上后，原压力也可能变成支撑。",
  },
  overbought: {
    label: "超买",
    bull: false,
    outlook: "后续常见可能：短线冲高后回落或转入震荡。注意：强趋势里超买可以维持较久，RSI 高位并不等于立即见顶。",
  },
  oversold: {
    label: "超卖",
    bull: true,
    outlook: "后续常见可能：超卖后出现反弹或止跌。注意：下跌趋势里超卖也可延续，RSI 低位并不等于立即见底。",
  },
  bearish_div: {
    label: "顶背离",
    bull: false,
    outlook: "后续常见可能：上涨动能减弱，价格有时会见顶回落。注意：背离可以连续出现多次才兑现，也可能失败后价格再创新高。",
  },
  bullish_div: {
    label: "底背离",
    bull: true,
    outlook: "后续常见可能：下跌动能减弱，价格有时会止跌回升。注意：背离并非必涨，下跌中途的底背离失败并不少见。",
  },
  vol_break: {
    label: "放量突破",
    bull: true,
    outlook: "后续常见可能：放量打开新区间后，短线常沿突破方向延续。注意：若随后迅速缩量跌回原区间，可能是假突破。",
  },
  vol_shrink_up: {
    label: "缩量上涨",
    tone: "warn",
    outlook: "仅说明这段上涨时成交量低于近期基准，不预测下一根 K 线涨跌。缩量上涨可能延续，也可能回落。",
  },
  vol_dump: {
    label: "放量下跌",
    bull: false,
    outlook: "后续常见可能：抛压加大，短线常继续走弱或加速下探。注意：极端放量有时是恐慌出清，之后也可能出现技术性反弹。",
  },
  vol_shrink_down: {
    label: "缩量下跌",
    tone: "warn",
    outlook: "仅说明这段下跌时成交量低于近期基准，不预测下一根 K 线涨跌。缩量下跌可能反弹，也可能继续阴跌。",
  },
  news: {
    label: "市场新闻",
    tone: "news",
    outlook: "新闻对价格的影响往往集中在公布前后，之后可能迅速定价完毕。注意：利好 / 利空是基于当时语境的学习标注，不是交易指令。",
  },
  macro: {
    label: "宏观事件",
    tone: "macro",
    outlook: "高影响宏观数据公布前后波动常会放大，方向取决于结果相对预期的偏差。注意：待公布项目只是风险提示，不是涨跌预判。",
  },
};

const EYE_OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 5C5 5 1.73 12 1.73 12S5 19 12 19s10.27-7 10.27-7S19 5 12 5zm0 11.5A4.5 4.5 0 1 1 16.5 12 4.5 4.5 0 0 1 12 16.5zm0-7A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5z"/></svg>';
const EYE_CLOSED = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2.1 3.51 3.51 2.1l18.39 18.39-1.41 1.41-3.26-3.26A11.7 11.7 0 0 1 12 19C5 19 1.73 12 1.73 12a19.4 19.4 0 0 1 4.7-5.52L2.1 3.51zM12 7c7 0 10.27 7 10.27 7a19.6 19.6 0 0 1-3.74 4.2l-2.3-2.3A4.5 4.5 0 0 0 9.1 9.07L7.05 7.02A11.4 11.4 0 0 1 12 7zm-1.66 3.51A2.5 2.5 0 0 0 13.5 14.16l-3.16-3.65z"/></svg>';

function defaultAnnoVisible() {
  const map = {};
  ANNO_KINDS.forEach((k) => { map[k] = ["support", "resist", "bearish_div", "bullish_div"].includes(k); });
  return map;
}

function loadAnnoVisible() {
  const map = defaultAnnoVisible();
  try {
    const raw = localStorage.getItem("newbie-village-anno-visible-v7");
    if (!raw) return map;
    const parsed = JSON.parse(raw);
    ANNO_KINDS.forEach((k) => {
      if (typeof parsed[k] === "boolean") map[k] = parsed[k];
    });
  } catch (_) {}
  return map;
}

function saveAnnoVisible() {
  try {
    localStorage.setItem("newbie-village-anno-visible-v7", JSON.stringify(state.annoVisible));
  } catch (_) {}
}

function isAnnoVisible(kind) {
  return state.annoVisible[kind] !== false;
}

function visibleAnnotations() {
  return state.annotations.filter((a) => a.kind !== "golden" && a.kind !== "death" && isAnnoVisible(a.kind));
}

const state = {
  tf: "4h",
  price: null,
  ticker: null,
  daily: [],
  h1: [],
  h4: [],
  chartRows: [],
  indicators: null,
  annotations: [],
  signalEvents: [],
  ledger: null,
  annoVisible: loadAnnoVisible(),
  coin: "BTC",
  marketMode: "connecting",
};

let loadSeq = 0;

function currentCoin() {
  return COINS[state.coin] || COINS.BTC;
}

function isStale(seq) {
  return seq !== loadSeq;
}

function readInitialCoin() {
  try {
    const raw = (new URLSearchParams(location.search).get("coin") || "").toUpperCase();
    if (READY_COINS.includes(raw)) return raw;
  } catch (_) {}
  return "BTC";
}

function writeCoinQuery(id) {
  try {
    const url = new URL(location.href);
    if (id === "BTC") url.searchParams.delete("coin");
    else url.searchParams.set("coin", id);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  } catch (_) {}
}

const TF_LIMITS = {
  "1m": 500,
  "5m": 500,
  "15m": 500,
  "1h": 400,
  "4h": 400,
  "1d": 400,
  "1w": 200,
  "1M": 120,
};

const TF_LABELS = {
  "1m": "1 分钟",
  "5m": "5 分钟",
  "15m": "15 分钟",
  "1h": "1 小时",
  "4h": "4 小时",
  "1d": "日线",
  "1w": "周线",
  "1M": "月线",
};

let priceChart, candleSeries, volumeSeries, cycleChart, cycleThisSeries, cyclePrevSeries;
let pollTimer = null, analyticsTimer = null, clockTimer = null;
let tipBound = false;
let pillsBound = false;

function $(id) {
  return document.getElementById(id);
}

function fmt(n, digits = 0) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function fmtPx(n) {
  return fmt(n, currentCoin().digits);
}

function fmtLast(n) {
  return fmt(n, currentCoin().lastDigits);
}

function fmtCompact(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + "M";
  if (abs >= 1e3) return sign + (abs / 1e3).toFixed(2) + "K";
  return sign + abs.toLocaleString("en-US", {
    maximumFractionDigits: abs >= 10 ? 2 : 4,
  });
}

function fmtCny(n) {
  if (n == null || Number.isNaN(n)) return "¥—";
  const digits = n >= 1 ? 2 : 4;
  return "¥" + n.toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

const FX_TTL_MS = 60 * 60 * 1000;
let usdCnyRate = null;
let usdCnyFetchedAt = 0;
let usdCnyPromise = null;

function parseUsdCny(data) {
  if (!data || typeof data !== "object") return null;
  if (Number(data.usdCny) > 0) return Number(data.usdCny);
  if (data.rates && Number(data.rates.CNY) > 0) return Number(data.rates.CNY);
  return null;
}

async function fetchUsdCny(force = false) {
  if (!force && usdCnyRate && Date.now() - usdCnyFetchedAt < FX_TTL_MS) return usdCnyRate;
  if (usdCnyPromise) return usdCnyPromise;
  usdCnyPromise = (async () => {
    try {
      const data = await fetchJSONFallback([
        "/api/fx",
        "https://api.frankfurter.dev/v1/latest?from=USD&to=CNY",
        "https://api.frankfurter.app/latest?from=USD&to=CNY",
        "https://open.er-api.com/v6/latest/USD",
      ]);
      const rate = parseUsdCny(data);
      if (rate) {
        usdCnyRate = rate;
        usdCnyFetchedAt = Date.now();
      }
      return usdCnyRate;
    } catch (_) {
      return usdCnyRate;
    } finally {
      usdCnyPromise = null;
    }
  })();
  return usdCnyPromise;
}

function roundPx(n) {
  const d = currentCoin().digits;
  const f = 10 ** Math.max(0, d);
  return Math.round(Number(n) * f) / f;
}

function priceAxisDigits(p) {
  if (currentCoin().id === "BTC") return p >= 1000 ? 1 : 2;
  return currentCoin().digits;
}

function liqsFor(price) {
  const coin = currentCoin();
  if (coin.liqs && coin.liqs.length) return coin.liqs;
  if (price == null || Number.isNaN(price)) return [];
  const scale = coin.liqScale || 0.2;
  const bands = [
    { lo: 1.028, hi: 1.038, side: "short", usd: 136e6 * scale, peak: 1.033 },
    { lo: 1.015, hi: 1.025, side: "short", usd: 288e6 * scale, peak: 1.020 },
    { lo: 0.975, hi: 0.985, side: "long", usd: 200e6 * scale, peak: 0.980 },
    { lo: 0.960, hi: 0.970, side: "long", usd: 122e6 * scale, peak: 0.965 },
  ];
  return bands.map((item) => ({
    lo: roundPx(price * item.lo),
    hi: roundPx(price * item.hi),
    side: item.side,
    usd: item.usd,
    peak: roundPx(price * item.peak),
  }));
}

function fmtYi(n) {
  return (n / 1e8).toFixed(2);
}

function clockText() {
  return (labLang() === "en" ? "Shanghai " : "上海时间 ") + shanghaiClock();
}
function shanghaiClock(date = new Date()) {
  return date.toLocaleString(labLang() === "en" ? "en-US" : "zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false,
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function last(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i] != null) return { value: arr[i], index: i };
  }
  return { value: null, index: -1 };
}

function parseKlines(rows) {
  return rows.map((row) => ({
    time: Math.floor(row[0] / 1000),
    open: +row[1],
    high: +row[2],
    low: +row[3],
    close: +row[4],
    volume: +row[5],
    openTime: row[0],
  }));
}

async function fetchJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("请求失败 " + res.status);
  return res.json();
}

async function fetchJSONFallback(urls) {
  let lastError = null;
  for (const url of urls) {
    try {
      return await fetchJSON(url);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("请求失败");
}

async function fetchKlines(interval, limit, extra = {}) {
  const params = new URLSearchParams({
    symbol: currentCoin().pair,
    interval,
    limit: String(limit),
  });
  if (extra.startTime) params.set("startTime", String(extra.startTime));
  if (extra.endTime) params.set("endTime", String(extra.endTime));
  const query = params.toString();
  const urls = [];
  if (location.protocol !== 'file:') urls.push('/api/klines?' + query);
  urls.push('https://data-api.binance.vision/api/v3/klines?' + query);
  urls.push('https://api.binance.com/api/v3/klines?' + query);
  const data = await fetchJSONFallback(urls);
  if (!Array.isArray(data)) throw new Error("K线数据无效");
  return parseKlines(data);
}

async function fetchTicker() {
  const pair = currentCoin().pair;
  const urls = [];
  if (location.protocol !== 'file:') urls.push('/api/ticker?symbol=' + pair);
  urls.push('https://data-api.binance.vision/api/v3/ticker/24hr?symbol=' + pair);
  urls.push('https://api.binance.com/api/v3/ticker/24hr?symbol=' + pair);
  return fetchJSONFallback(urls);
}

function sma(values, period) {
  const out = Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}

function ema(values, period) {
  const out = Array(values.length).fill(null);
  const k = 2 / (period + 1);
  let seed = 0;
  for (let i = 0; i < values.length; i += 1) {
    if (i < period) {
      seed += values[i];
      if (i === period - 1) out[i] = seed / period;
    } else {
      out[i] = values[i] * k + out[i - 1] * (1 - k);
    }
  }
  return out;
}

function stdevSample(values, period) {
  const out = Array(values.length).fill(null);
  for (let i = period - 1; i < values.length; i += 1) {
    const slice = values.slice(i - period + 1, i + 1);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / (period - 1);
    out[i] = Math.sqrt(variance);
  }
  return out;
}

function rsiWilder(closes, period = 14) {
  const out = Array(closes.length).fill(null);
  if (closes.length <= period) return out;
  let gain = 0;
  let loss = 0;
  for (let i = 1; i <= period; i += 1) {
    const delta = closes[i] - closes[i - 1];
    if (delta >= 0) gain += delta;
    else loss -= delta;
  }
  let avgGain = gain / period;
  let avgLoss = loss / period;
  out[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  for (let i = period + 1; i < closes.length; i += 1) {
    const delta = closes[i] - closes[i - 1];
    const g = delta > 0 ? delta : 0;
    const l = delta < 0 ? -delta : 0;
    avgGain = (avgGain * (period - 1) + g) / period;
    avgLoss = (avgLoss * (period - 1) + l) / period;
    out[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }
  return out;
}

function macdCalc(closes, fast = 12, slow = 26, signalPeriod = 9) {
  const fastEma = ema(closes, fast);
  const slowEma = ema(closes, slow);
  const line = closes.map((_, i) => (
    fastEma[i] == null || slowEma[i] == null ? null : fastEma[i] - slowEma[i]
  ));
  const valid = [];
  const idx = [];
  line.forEach((value, i) => {
    if (value != null) {
      valid.push(value);
      idx.push(i);
    }
  });
  const signalValid = ema(valid, signalPeriod);
  const signal = Array(closes.length).fill(null);
  const hist = Array(closes.length).fill(null);
  idx.forEach((orig, j) => {
    if (signalValid[j] != null) {
      signal[orig] = signalValid[j];
      hist[orig] = line[orig] - signalValid[j];
    }
  });
  return { line, signal, hist };
}

function bollinger(closes, period = 20, mult = 2) {
  const mid = sma(closes, period);
  const sd = stdevSample(closes, period);
  return {
    mid,
    upper: mid.map((m, i) => (m == null || sd[i] == null ? null : m + mult * sd[i])),
    lower: mid.map((m, i) => (m == null || sd[i] == null ? null : m - mult * sd[i])),
    sd,
  };
}

function computeIndicators(daily, livePrice) {
  const rows = daily.map((row) => ({ ...row }));
  if (rows.length && livePrice != null) {
    const lastRow = rows[rows.length - 1];
    lastRow.close = livePrice;
    lastRow.high = Math.max(lastRow.high, livePrice);
    lastRow.low = Math.min(lastRow.low, livePrice);
  }
  const closes = rows.map((row) => row.close);
  const rsi = rsiWilder(closes, 14);
  const macd = macdCalc(closes);
  const bb = bollinger(closes, 20, 2);
  const ema20 = ema(closes, 20);
  const ema50 = ema(closes, 50);
  const ema200 = ema(closes, 200);
  const i = closes.length - 1;
  const prev = Math.max(0, i - 1);
  const bandwidth = bb.mid[i] ? ((bb.upper[i] - bb.lower[i]) / bb.mid[i]) * 100 : null;
  const bbPos = (bb.upper[i] - bb.lower[i])
    ? ((closes[i] - bb.lower[i]) / (bb.upper[i] - bb.lower[i])) * 100
    : null;
  return {
    price: closes[i],
    rsi: rsi[i],
    rsiPrev: rsi[prev],
    macd: macd.line[i],
    signal: macd.signal[i],
    hist: macd.hist[i],
    histPrev: macd.hist[prev],
    bbMid: bb.mid[i],
    bbUpper: bb.upper[i],
    bbLower: bb.lower[i],
    bandwidth,
    bbPos,
    ema20: ema20[i],
    ema50: ema50[i],
    ema200: ema200[i],
    swingLow: Math.min(...rows.slice(-15).map((row) => row.low)),
    swingHigh10: Math.max(...rows.slice(-10).map((row) => row.high)),
    high90: Math.max(...rows.slice(-90).map((row) => row.high)),
    low90: Math.min(...rows.slice(-90).map((row) => row.low)),
  };
}

function rsiVerdict(rsi) {
  if (labLang() === "en") {
    if (rsi < 30) return "Oversold. A bounce is possible, but wait for selling to slow. A low RSI alone is not a reason to buy the dip.";
    if (rsi < 40) return "Weak, but not oversold (not under 30). This looks more like a pause in a decline than a panic extreme.";
    if (rsi < 50) return "Neutral to weak. The balance has not flipped. A bounce still has to get back above 50.";
    if (rsi < 60) return "Neutral to firm. Momentum has improved, but this is not a clear strong trend yet.";
    if (rsi < 70) return "Firm, but not overbought. The lean is up. Watch for the pace to cool as RSI nears 70.";
    return "Overbought. Chasing has less room. Watch for a giveback or a divergence.";
  }
  if (rsi < 30) return "进入超卖区，短线有技术性修复需求，但仍需等待止跌信号，不宜单凭超卖抄底。";
  if (rsi < 40) return "处于弱势区但未超卖（未落入 30 下）。更像下跌中继或弱势整理，而不是恐慌极值。";
  if (rsi < 50) return "位于中性偏弱区间，多空尚未扭转，反弹仍需观察能否重新站上 50。";
  if (rsi < 60) return "位于中性偏强区间，动能有所修复，但仍未进入明确强势。";
  if (rsi < 70) return "处于强势区但未超买，趋势偏多，需警惕接近 70 后的节奏放缓。";
  return "进入超买区，追高性价比下降，注意回吐与背离。";
}

function macdVerdict(ind) {
  if (labLang() === "en") {
    const zero = ind.macd < 0 ? "below zero" : "above zero";
    const cross = ind.macd < ind.signal ? "a bearish cross" : "a bullish cross";
    const energy = ind.hist > ind.histPrev
      ? (ind.hist < 0 ? "the histogram is narrowing, so downside momentum is fading" : "the positive histogram is expanding, so upside momentum is building")
      : (ind.hist < 0 ? "the negative histogram is widening, so downside momentum is still being released" : "the positive histogram is shrinking, so upside momentum is fading");
    const extra = (ind.macd < 0 && ind.macd < ind.signal) ? " Sellers still have the edge, and there is no bullish cross yet." : "";
    return `Still ${zero}, in ${cross}. ${energy}.${extra}`;
  }
  const zero = ind.macd < 0 ? "零轴下方" : "零轴上方";
  const cross = ind.macd < ind.signal ? "死叉" : "金叉";
  const energy = ind.hist > ind.histPrev
    ? (ind.hist < 0 ? "柱状图略收窄，下跌动能有所衰减" : "红色柱扩张，上涨动能增强")
    : (ind.hist < 0 ? "绿色柱扩大，空头动能仍在释放" : "红色柱缩短，上涨动能减弱");
  const extra = (ind.macd < 0 && ind.macd < ind.signal)
    ? "，空头仍占优，但尚未出现金叉。"
    : "。";
  return `仍在${zero}${cross}；${energy}${extra}`;
}

function bbVerdict(ind) {
  const pos = ind.bbPos;
  const place = pos < 25 ? "带内偏下" : pos > 75 ? "带内偏上" : "带内中轴附近";
  const width = ind.bandwidth > 10 ? "带宽仍偏宽，波动尚未完全收敛" : "带宽收窄，波动进入收缩阶段";
  return `价格位于${place}约 ${fmt(pos, 0)}% 处。${width}；下轨约 ${fmtPx(ind.bbLower)} 是带内支撑，中轨约 ${fmtPx(ind.bbMid)} 是近端回升阻力。`;
}

function emaVerdict(ind) {
  const dist = (key) => ((ind.price / ind[key] - 1) * 100);
  const parts = ["EMA20", "EMA50", "EMA200"].map((name, i) => {
    const key = ["ema20", "ema50", "ema200"][i];
    const d = dist(key);
    return `${name} ${fmtPx(ind[key])}（${d >= 0 ? "上方" : "下方"} ${Math.abs(d).toFixed(1)}%）`;
  });
  const broken = [];
  if (ind.price < ind.ema20) broken.push("EMA20");
  if (ind.price < ind.ema50) broken.push("EMA50");
  if (ind.price < ind.ema200) broken.push("EMA200");
  let arrange = "均线尚未形成完全空头或多头排列。";
  if (ind.ema20 < ind.ema50 && ind.ema50 < ind.ema200) arrange = "三条均线已呈空头排列。";
  else if (ind.ema20 > ind.ema50 && ind.ema50 > ind.ema200) arrange = "三条均线呈多头排列。";
  else if (ind.ema20 < ind.ema50 && ind.ema20 > ind.ema200) arrange = "EMA20 已落到 EMA50 下方，但两者仍高于 EMA200，完全空头排列尚未成立。";
  const rel = broken.length
    ? `现价已跌破 ${broken.join(" / ")}。`
    : "现价仍位于主要均线之上。";
  return `${parts.join("；")}。${rel}${arrange}`;
}

function starsHtml(n) {
  return `<span class="stars" aria-label="${labT(n + "星", n + " stars")}">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;
}

function renderFeed(id, items) {
  const host = $(id);
  if (!host) return;
  host.innerHTML = (items || []).map((raw) => {
    const item = (typeof Litem === "function") ? Litem(raw) : raw;
    const when = item.timeDisplay || item.time;
    return `
    <article class="feed-item">
      <div class="feed-top">
        <div class="badges">
          <span class="badge ${item.bias}">${item.biasText}</span>
          ${starsHtml(item.stars)}
        </div>
        <div class="feed-time">${when}</div>
      </div>
      <h3 class="feed-title">${item.title}</h3>
      <p class="feed-note">${item.note}</p>
    </article>
  `;
  }).join("");
}

function renderLiq(price) {
  if (!$("liq-map")) return;
  const rowsSrc = liqsFor(price);
  if (!rowsSrc.length) {
    $("liq-map").innerHTML = `<div class="liq-now">${labT("现价","Price")} ${price != null ? fmtLast(price) : "—"}</div>`;
    $("liq-note").textContent = labT("正在按现价估算清算带…","Estimating liquidation bands from the current price…");
    return;
  }
  const maxUsd = Math.max(...rowsSrc.map((item) => item.usd));
  const rows = [...rowsSrc].sort((a, b) => b.lo - a.lo);
  const above = rows.filter((item) => item.lo > (price || 0));
  const below = rows.filter((item) => item.hi < (price || 0));
  const mid = rows.filter((item) => !above.includes(item) && !below.includes(item));
  const htmlRow = (item) => `
    <div class="liq-row ${item.side}">
      <div class="liq-range">${fmtPx(item.lo)} – ${fmtPx(item.hi)}</div>
      <div class="liq-track"><span class="liq-bar" style="--w:${(item.usd / maxUsd) * 100}%"></span></div>
      <div class="liq-meta">${item.side === "short" ? labT("空头","Shorts") : labT("多头","Longs")} · ${labLang()==="en" ? ("$" + (item.usd/1e6).toFixed(0) + "m") : ("$" + fmtYi(item.usd) + "亿")}</div>
    </div>
  `;
  $("liq-map").innerHTML = [
    ...above.map(htmlRow),
    `<div class="liq-now">${labT("现价","Price")} ${price != null ? fmtLast(price) : "—"}</div>`,
    ...mid.map(htmlRow),
    ...below.map(htmlRow),
  ].join("");
  const shorts = rowsSrc.filter((item) => item.side === "short").sort((a, b) => a.lo - b.lo);
  const longs = rowsSrc.filter((item) => item.side === "long").sort((a, b) => b.hi - a.hi);
  const bandText = (item) => labLang() === "en"
    ? `${fmtPx(item.lo)}–${fmtPx(item.hi)}, about $${(item.usd / 1e6).toFixed(0)}m (densest near ${fmtPx(item.peak)})`
    : `${fmtPx(item.lo)}–${fmtPx(item.hi)} 约 ${fmtYi(item.usd)} 亿美元（最强单点约 ${fmtPx(item.peak)}）`;
  const parts = [];
  if (shorts[0]) parts.push(labLang() === "en"
    ? `The nearer, thicker short-liquidation band above price is ${bandText(shorts[0])}${shorts[1] ? `; next is ${bandText(shorts[1])}` : ""}. `
    : `价格上方空头清算带更厚且更近：${bandText(shorts[0])}${shorts[1] ? `，其次 ${bandText(shorts[1])}` : ""}。`);
  if (longs[0]) parts.push(labLang() === "en"
    ? `The main long-liquidation band below price is ${bandText(longs[0])}${longs[1] ? `; further down, ${bandText(longs[1])}` : ""}. `
    : `价格下方主要多头清算带在 ${bandText(longs[0])}${longs[1] ? `，再下 ${bandText(longs[1])}` : ""}。`);
  let extra = labLang() === "en"
    ? (currentCoin().liqExtraEn || "Bands are scaled around the current price. They are not live exchange orders, and they move as price moves.")
    : (currentCoin().liqExtra || "清算带按现价附近比例估算，非交易所实时挂单，会随价格迁移。");
  if (state.marketMode === "offline" || state.marketMode === "retry") {
    extra = labT("离线：以下不是实时清算挂单。", "Offline: this is not a live liquidation book. ") + extra;
  }
  $("liq-note").textContent = parts.join("") + extra;
}

function renderIndicators(ind, extra) {
  if (!labAlive || !$("indicator-list")) return;
  // 与图表当前可见的指标开关保持一致，而不是固定展示 RSI/MACD/布林带/EMA。
  window.villageLastIndicatorData = {ind, extra};
  const studyOn = (key) => typeof villageStudies !== 'undefined' && !!villageStudies[key];
  const annoOn = (key) => typeof isAnnoVisible === "function" && isAnnoVisible(key);
  const items = [];
  if (studyOn('ema20') || studyOn('ema50')) {
    const enabled = [studyOn('ema20') && 'EMA20',studyOn('ema50') && 'EMA50'].filter(Boolean);
    const values = [studyOn('ema20') && fmtPx(ind.ema20),studyOn('ema50') && fmtPx(ind.ema50)].filter(Boolean);
    const relations = enabled.map((name,i) => {
      const v = name === 'EMA20' ? ind.ema20 : ind.ema50;
      const below = ind.price >= v;
      return labLang() === "en"
        ? `${name} ${below ? "sits under price and can act as dynamic support" : "sits over price and can act as dynamic resistance"}`
        : `${name} ${below ? "位于现价下方，可能形成动态支撑" : "位于现价上方，可能形成动态压力"}`;
    });
    items.push({name:enabled.join(' / '),value:values.join(' / '),verdict:relations.join(labLang()==="en"?"; ":"；")+(labLang()==="en"?".":"。")});
  }
  if (studyOn('macd')) items.push({
    name:'MACD(12,26,9)',
    value:labT(`快线 ${fmtPx(ind.macd)}，信号线 ${fmtPx(ind.signal)}，柱 ${fmtPx(ind.hist)}`,`MACD ${fmtPx(ind.macd)}, signal ${fmtPx(ind.signal)}, histogram ${fmtPx(ind.hist)}`),
    verdict:macdVerdict(ind)
  });
  if (studyOn('smc')) items.push({
    name:'SMC · BOS / CHoCH / FVG',
    value:labT('结构与缺口标记','Structure and gap marks'),
    verdict:labT('图中 BOS 表示结构延续突破，CHoCH 提示结构可能转换；FVG 显示尚未完全回补的价格缺口。具体以当前周期图中标记为准。','BOS marks a break that continues the structure. CHoCH marks a break that may change it. FVG marks a price gap that has not been fully filled. Read the marks on the current interval.')
  });
  if (annoOn('reclaim') || annoOn('reject')) items.push({
    name:labT('EMA200 穿越信号','EMA200 cross'),
    value:[annoOn('reclaim')&&labT('站上 EMA200','Reclaim EMA200'),annoOn('reject')&&labT('跌破 EMA200','Lose EMA200')].filter(Boolean).join(' / '),
    verdict:labT(`当前 EMA200 约 ${fmtPx(ind.ema200)}；现价${ind.price >= ind.ema200 ? '在其上方' : '在其下方'}。图表仅标记已启用的穿越事件。`,`EMA200 is about ${fmtPx(ind.ema200)}. Price is ${ind.price >= ind.ema200 ? "above" : "below"} it. The chart marks only the crosses that are switched on.`)
  });
  if (annoOn('overbought') || annoOn('oversold')) items.push({
    name:labT('RSI(14) · 超买超卖','RSI(14) · overbought / oversold'),
    value:labT(`${ind.rsi.toFixed(2)}（前一日 ${ind.rsiPrev.toFixed(2)}）`,`${ind.rsi.toFixed(2)} (prior day ${ind.rsiPrev.toFixed(2)})`),
    verdict:rsiVerdict(ind.rsi)
  });
  if (annoOn('support') || annoOn('resist')) items.push({
    name:labT('近端支撑 / 压力','Nearby support / resistance'),
    value:[annoOn('support')&&labT('支撑','Support'),annoOn('resist')&&labT('压力','Resistance')].filter(Boolean).join(' / '),
    verdict:labT('根据当前周期的局部价格结构标记潜在支撑或压力，位置随币种和周期变化，不保证价格必然反转。','Marks possible support or resistance from the current interval\'s local swings. The levels change with the coin and the interval. Price does not have to reverse there.')
  });
  const signalGroups=[
    {keys:['bullish_div','bearish_div'],name:labT('顶底背离','Divergence'),note:labT('价格与动量指标走势不一致的历史信号，需结合后续价格验证。','A past mismatch between price and momentum. Check what price did afterward.')},
    {keys:['vol_break','vol_dump'],name:labT('放量突破 / 放量下跌','Volume break / volume drop'),note:labT('成交量相对近期水平显著增加的价格事件。','Price events where volume was well above the recent baseline.')},
    {keys:['vol_shrink_up','vol_shrink_down'],name:labT('缩量上涨 / 缩量下跌','Quiet rise / quiet drop'),note:labT('价格变化时成交量相对收缩的历史描述，不代表后续方向预测。','A description of price moving on relatively light volume. It does not predict the next direction.')},
    {keys:['news','macro'],name:labT('市场新闻 / 宏观事件','News / macro'),note:labT('仅展示图中启用的事件标记；事件不等于价格涨跌的确定原因。','Only the event marks that are switched on. An event is not proof of why price moved.')}
  ];
  for(const group of signalGroups){
    const enabled=group.keys.filter(annoOn);
    if(enabled.length) items.push({name:group.name,value:'图表标记已开启',verdict:group.note});
  }
  $("indicator-list").innerHTML = items.length ? items.map((item) => `
    <article class="ind-row">
      <div class="ind-top">
        <div class="ind-name">${item.name}</div>
        <div class="ind-val">${item.value}</div>
      </div>
      <p class="ind-verdict">${item.verdict}</p>
    </article>
  `).join("") : '<p class="panel-note">' + labT('当前未开启任何图表指标或信号标记。','No chart indicator or signal mark is switched on.') + '</p>';
  const noteEl = $("indicator-note");
  if (noteEl) noteEl.textContent = labT('仅解读当前图表已开启的指标与信号；切换币种、周期或开关后同步更新。','The read below follows only the indicators and marks that are switched on. It updates when you change coin, interval, or a switch.') + (extra ? ' ' + extra : '');
}
document.addEventListener('click', function(e){
  if(e.target.closest('[data-study], [data-anno-kind], #study-reset')){
    setTimeout(()=>{
      if(window.villageLastIndicatorData){
        const {ind,extra}=window.villageLastIndicatorData;
        renderIndicators(ind,extra);
      }
    },0);
  }
});

function renderSummary(ind, extraNote) {
  let score = 0;
  if (ind.price < ind.ema20) score -= 1;
  if (ind.price < ind.ema50) score -= 1;
  if (ind.price < ind.ema200) score -= 1;
  if (ind.rsi < 40) score -= 1;
  if (ind.rsi > 60) score += 1;
  if (ind.hist < 0 && ind.macd < ind.signal) score -= 1;
  if (ind.hist > 0 && ind.macd > ind.signal) score += 1;
  score -= 1;
  let view = "中性观望";
  let tone = "warn";
  if (score <= -4) {
    view = "观望偏空";
    tone = "bear";
  } else if (score <= -2) {
    view = "中性偏空";
    tone = "warn";
  } else if (score >= 3) {
    view = "偏多";
    tone = "bull";
  } else if (score >= 1) {
    view = "中性偏多";
    tone = "bull";
  }
  const broken = ["EMA20", "EMA50", "EMA200"].filter((name, i) => ind.price < [ind.ema20, ind.ema50, ind.ema200][i]);
  const tech = broken.length
    ? `价格已跌破日线 ${broken.join(" / ")}`
    : "价格仍在主要均线附近徘徊";
  const macdText = ind.hist < 0 ? "MACD 仍在零轴下方" : "MACD 已回到零轴上方";
  const bands = liqsFor(ind.price);
  const shorts = bands.filter((item) => item.side === "short").sort((a, b) => a.lo - b.lo);
  const longs = bands.filter((item) => item.side === "long").sort((a, b) => b.hi - a.hi);
  const s0 = shorts[0];
  const s1 = shorts[1];
  const l0 = longs[0];
  const l1 = longs[1];
  const coin = currentCoin();
  const belowZone = l0 ? `${fmtPx(ind.swingLow)}–${fmtPx(l0.hi)}` : fmtPx(ind.swingLow);
  const aboveZone = s0 ? `${fmtPx(s0.lo)}–${fmtPx(ind.ema200)}` : `${fmtPx(ind.swingHigh10)}–${fmtPx(ind.ema200)}`;
  const lead = `技术面上，${tech}，RSI ${ind.rsi.toFixed(2)} ${ind.rsi < 45 ? "偏弱" : "中性"}而${macdText}；宏观面上，${coin.macroLead}11 月 10 日 21:30（上海时间）公布的 CPI 是近端最大事件风险。下方 ${belowZone} 是近期低点与多头清算带的重叠防守；上方 ${aboveZone} 是空头清算带与 200 日线的重叠压力。${extraNote || ""}CPI 公布前更适合观望，而不是追多或盲目抄底。`;
  const deepNote = coin.id === "BTC" ? "；更深则看 72,476 一带累计多头清算区。" : "。";
  const support = l0
    ? `主支撑 ${fmtPx(ind.swingLow)}（近 15 日低点）与 ${fmtPx(l0.lo)}–${fmtPx(l0.hi)} 多头清算带（最强点约 ${fmtPx(l0.peak)}）；失守后看${l1 ? ` ${fmtPx(l1.lo)}–${fmtPx(l1.hi)} 及` : ""}布林下轨约 ${fmtPx(ind.bbLower)}${deepNote}`
    : `主支撑 ${fmtPx(ind.swingLow)}（近 15 日低点）；失守后看布林下轨约 ${fmtPx(ind.bbLower)}。`;
  const resist = s0
    ? `近端 ${fmtPx(s0.lo)}–${fmtPx(s0.hi)} 空头清算带（最强点约 ${fmtPx(s0.peak)}），叠合日线 EMA200 约 ${fmtPx(ind.ema200)}；${s1 ? `再上 ${fmtPx(s1.lo)}–${fmtPx(s1.hi)}，以及` : ""}布林中轨 / EMA20 一带约 ${fmtPx(ind.ema20)}–${fmtPx(ind.bbMid)}。近 10 日反弹高点约 ${fmtPx(ind.swingHigh10)} 也构成回抽压力。`
    : `近端看日线 EMA200 约 ${fmtPx(ind.ema200)}，以及布林中轨 / EMA20 一带约 ${fmtPx(ind.ema20)}–${fmtPx(ind.bbMid)}。近 10 日反弹高点约 ${fmtPx(ind.swingHigh10)} 也构成回抽压力。`;
  const structure = broken.length ? "空头结构尚未扭转，" : "多空尚未形成明确趋势，";
  if (labLang() === "en") {
    const viewEn = {"观望偏空":"Cautious, leaning down","中性偏空":"Neutral, leaning down","偏多":"Leaning up","中性偏多":"Neutral, leaning up","中性观望":"Neutral / wait"};
    const viewOut = viewEn[view] || view;
    const techEn = broken.length ? ("price is below the daily " + broken.join(" / ")) : "price is still hovering around the main moving averages";
    const macdEn = ind.hist < 0 ? "MACD is still below zero" : "MACD is back above zero";
    const rsiWord = ind.rsi < 45 ? "weak" : "neutral";
    const macroEn = currentCoin().macroLeadEn || "";
    const leadEn = "Technically, " + techEn + ". RSI " + ind.rsi.toFixed(2) + " is " + rsiWord + ", and " + macdEn + ". On the macro side, " + macroEn + "CPI at 21:30 (Shanghai) on Nov 10 is the nearest event risk. Below, " + belowZone + " is where the recent low overlaps long-liquidation bands. Above, " + aboveZone + " is where short-liquidation bands overlap the 200-day line. " + (extraNote || "") + "Before that CPI print, waiting is more reasonable than chasing strength or trying to catch a falling price.";
    const deepEn = currentCoin().id === "BTC" ? " Deeper than that, the stacked long-liquidation zone near 72,476 is the next area." : "";
    const supportEn = l0
      ? ("Main support is " + fmtPx(ind.swingLow) + " (15-day low) and the long-liquidation band " + fmtPx(l0.lo) + "–" + fmtPx(l0.hi) + " (densest near " + fmtPx(l0.peak) + "). If that gives way, watch " + (l1 ? (fmtPx(l1.lo) + "–" + fmtPx(l1.hi) + " and ") : "") + "the lower Bollinger band near " + fmtPx(ind.bbLower) + "." + deepEn)
      : ("Main support is " + fmtPx(ind.swingLow) + " (15-day low). If that gives way, watch the lower Bollinger band near " + fmtPx(ind.bbLower) + ".");
    const resistEn = s0
      ? ("Nearby, the short-liquidation band " + fmtPx(s0.lo) + "–" + fmtPx(s0.hi) + " (densest near " + fmtPx(s0.peak) + ") overlaps the daily EMA200 near " + fmtPx(ind.ema200) + ". " + (s1 ? ("Above that, " + fmtPx(s1.lo) + "–" + fmtPx(s1.hi) + ", and ") : "") + "the Bollinger midline / EMA20 area is about " + fmtPx(ind.ema20) + "–" + fmtPx(ind.bbMid) + ". The 10-day rebound high near " + fmtPx(ind.swingHigh10) + " is also overhead.")
      : ("Nearby resistance is the daily EMA200 around " + fmtPx(ind.ema200) + ", and the Bollinger midline / EMA20 area around " + fmtPx(ind.ema20) + "–" + fmtPx(ind.bbMid) + ". The 10-day rebound high near " + fmtPx(ind.swingHigh10) + " is also overhead.");
    const structureEn = broken.length ? "The downward structure has not reversed. " : "Neither side has a clear trend yet. ";
    $("view-pill").className = "view-pill " + tone;
    $("view-pill").textContent = viewOut;
    $("summary-lead").textContent = leadEn;
    $("sum-support").textContent = supportEn;
    $("sum-resist").textContent = resistEn;
    $("sum-view").textContent = viewOut + ". " + structureEn + "The event risk is CPI. On a short horizon, defend the lower liquidation band and the recent low first.";
    return;
  }
  $("view-pill").className = "view-pill " + tone;
  $("view-pill").textContent = view;
  $("summary-lead").textContent = lead;
  $("sum-support").textContent = support;
  $("sum-resist").textContent = resist;
  $("sum-view").textContent = `${view}。${structure}事件风险在 CPI，短线优先防守下方清算带与近期低点。`;
}

function updateHeader(ticker, price) {
  const lastPrice = price ?? +ticker.lastPrice;
  const open = +ticker.prevClosePrice || +ticker.openPrice;
  const chg = ticker.priceChange != null && ticker.priceChange !== ""
    ? +ticker.priceChange
    : lastPrice - open;
  const chgPct = ticker.priceChangePercent != null && ticker.priceChangePercent !== ""
    ? +ticker.priceChangePercent
    : (open ? (chg / open) * 100 : 0);
  const up = chg >= 0;
  const px = $("last-price");
  px.textContent = fmtLast(lastPrice);
  px.className = "px " + (up ? "up" : "down");
  const chgEl = $("last-chg");
  chgEl.textContent = `（${chgPct >= 0 ? "+" : ""}${chgPct.toFixed(2)}%）`;
  chgEl.className = "chg " + (up ? "up" : "down");
  setText("last-cny", usdCnyRate ? fmtCny(lastPrice * usdCnyRate) : "¥—");
  setText("stat-high", fmtLast(+ticker.highPrice));
  setText("stat-low", fmtLast(+ticker.lowPrice));
  setText("stat-vol", fmtCompact(+ticker.volume) + " " + currentCoin().id);
  setText("stat-turnover", fmtCompact(+ticker.quoteVolume) + " USDT");
  $("clock").textContent = clockText();
}

function resetTickerDisplay() {
  const px = $("last-price");
  if (px) {
    px.textContent = "—";
    px.className = "px";
  }
  setText("last-cny", "¥—");
  const chgEl = $("last-chg");
  if (chgEl) {
    chgEl.textContent = "—";
    chgEl.className = "chg";
  }
  setText("stat-high", "—");
  setText("stat-low", "—");
  setText("stat-vol", "—");
  setText("stat-turnover", "—");
}

function setLive(on, text) {
  const el = $("live-status");
  if (!el) return;
  el.className = "live " + (on ? "on" : "off");
  el.innerHTML = `<span class="dot"></span>${text}`;
}
function setMarketState(mode) {
  if (!labAlive) return;
  state.marketMode = mode;
  const showNotice = mode === "offline" || mode === "retry";
  const n = document.getElementById("v6-data-notice");
  if (n) n.style.display = showNotice ? "block" : "none";
  const root = document.getElementById("lab-root");
  if (root) root.classList.toggle("is-offline", showNotice);
  const label = mode === "live" ? labT("实时", "Live")
    : mode === "retry" ? labT("重试中 · 非实时", "Retrying · not live")
    : mode === "connecting" ? labT("连接中", "Connecting")
    : labT("离线 · 非实时", "Offline · not live");
  setLive(mode === "live", label);
}

function chartOptions() {
  return {
    autoSize: true,
    layout: {
      background: { color: "transparent" },
      textColor: "#6b645c",
      fontFamily: "Outfit, PingFang SC, sans-serif",
      panes: {
        separatorColor: "rgba(213, 183, 226, 0.55)",
        separatorHoverColor: "rgba(233, 201, 142, 0.95)",
      },
    },
    grid: {
      vertLines: { color: "rgba(28,25,22,0.05)" },
      horzLines: { color: "rgba(28,25,22,0.05)" },
    },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { borderColor: "rgba(28,25,22,0.08)", scaleMargins: { top: 0.06, bottom: 0.22 } },
    timeScale: {
      borderColor: "rgba(28,25,22,0.08)",
      timeVisible: true,
      secondsVisible: false,
    },
    localization: {
      timeFormatter: (time) => {
        const ts = typeof time === "object" ? Date.UTC(time.year, time.month - 1, time.day) / 1000 : time;
        return new Date(ts * 1000).toLocaleString(labLang() === "en" ? "en-US" : "zh-CN", {
          timeZone: "Asia/Shanghai",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      priceFormatter: (p) => fmt(p, priceAxisDigits(p)),
    },
  };
}

const v18MarkerPlugins = new WeakMap();
function v18SetMarkers(series, markers) {
  if (!series || !window.LightweightCharts?.createSeriesMarkers) return;
  let plugin=v18MarkerPlugins.get(series);
  if(!plugin){plugin=LightweightCharts.createSeriesMarkers(series,[]);v18MarkerPlugins.set(series,plugin)}
  plugin.setMarkers(markers);
}
function ensurePriceChart() {
  if (priceChart) return;
  priceChart = LightweightCharts.createChart($("price-chart"), chartOptions());
  candleSeries = priceChart.addSeries(LightweightCharts.CandlestickSeries, {
    upColor: "#1e6b45",
    downColor: "#b42318",
    borderUpColor: "#1e6b45",
    borderDownColor: "#b42318",
    wickUpColor: "#1e6b45",
    wickDownColor: "#b42318",
  });
  volumeSeries = priceChart.addSeries(LightweightCharts.HistogramSeries, {
    priceFormat: { type: "volume" },
    priceScaleId: "vol",
    lastValueVisible: false,
    priceLineVisible: false,
  });
  priceChart.priceScale("vol").applyOptions({
    scaleMargins: { top: 0.82, bottom: 0 },
  });
  // V18: MACD uses pane 1 of the SAME chart (not a second chart).
  villageMacdHist = priceChart.addSeries(LightweightCharts.HistogramSeries, {priceLineVisible:false,lastValueVisible:false,priceScaleId:'right'}, 1);
  villageMacdDif = priceChart.addSeries(LightweightCharts.LineSeries, {color:'#e9c078',lineWidth:2,priceLineVisible:false,lastValueVisible:false}, 1);
  villageMacdDea = priceChart.addSeries(LightweightCharts.LineSeries, {color:'#a18af2',lineWidth:2,priceLineVisible:false,lastValueVisible:false}, 1);
  try{priceChart.panes()[0].setHeight(550);priceChart.panes()[1].setHeight(185)}catch(e){}
  priceChart.subscribeCrosshairMove(p=>{
    const el=document.getElementById('v18-hover');if(!el)return;
    if(!p.time){el.textContent=labT('鼠标移到 K 线或 MACD，查看同一时间','Hover a candle or MACD to read the same time');return;}
    const b=p.seriesData.get(candleSeries),d=p.seriesData.get(villageMacdDif),a=p.seriesData.get(villageMacdDea);
    const loc=labLang()==='en'?'en-US':'zh-CN';
    el.textContent=new Date(Number(p.time)*1000).toLocaleString(loc)+(b?' · '+labT('收盘','Close')+' '+Number(b.close).toLocaleString():'')+(d&&a?' · DIF '+d.value.toFixed(3)+' · DEA '+a.value.toFixed(3):'');
  });
  new ResizeObserver(() => priceChart && priceChart.applyOptions({ autoSize: true })).observe($("price-chart"));
  bindAnnoTip();
}

function ensureCycleChart() {
  if (cycleChart) return;
  cycleChart = LightweightCharts.createChart($("cycle-chart"), {
    ...chartOptions(),
    rightPriceScale: { borderColor: "rgba(28,25,22,0.08)", scaleMargins: { top: 0.12, bottom: 0.08 } },
    timeScale: { borderColor: "rgba(28,25,22,0.08)", timeVisible: false },
    localization: {
      priceFormatter: (p) => p.toFixed(0),
    },
  });
  cycleThisSeries = cycleChart.addSeries(LightweightCharts.LineSeries, {
    color: "#c4a35a",
    lineWidth: 2,
    title: labT("本周期", "This cycle"),
  });
  cyclePrevSeries = cycleChart.addSeries(LightweightCharts.LineSeries, {
    color: "#3d6fbf",
    lineWidth: 2,
    title: labT("上周期", "Prior cycle"),
  });
  new ResizeObserver(() => cycleChart && cycleChart.applyOptions({ autoSize: true })).observe($("cycle-chart"));
}

function applyChartData(rows) {
  ensurePriceChart();
  candleSeries.setData(rows.map((row) => ({
    time: row.time,
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
  })));
  volumeSeries.setData(rows.map((row) => ({
    time: row.time,
    value: row.volume,
    color: row.close >= row.open ? "rgba(30,107,69,0.35)" : "rgba(180,35,24,0.3)",
  })));
  applyAnnotations(rows);
  if (typeof renderVillageStudies === "function") renderVillageStudies(rows);
  if (typeof bindSmcRange === "function") bindSmcRange();
  priceChart.timeScale().fitContent();
  requestAnimationFrame(syncAnnoPills);
  setTimeout(syncAnnoPills, 60);
}

function updateLastCandle(price) {
  if (!state.chartRows.length || price == null || !candleSeries) return;
  const row = state.chartRows[state.chartRows.length - 1];
  row.close = price;
  row.high = Math.max(row.high, price);
  row.low = Math.min(row.low, price);
  candleSeries.update({
    time: row.time,
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
  });
}

function tfLabel(tf) {
  const en = {"1m":"1 minute","5m":"5 minutes","15m":"15 minutes","1h":"1 hour","4h":"4 hours","1d":"daily","1w":"weekly","1M":"monthly"};
  if (labLang() === "en") return en[tf] || tf;
  return TF_LABELS[tf] || tf;
}

async function loadChart(tf, seq = loadSeq) {
  const pair = currentCoin().pair;
  const limit = TF_LIMITS[tf] || 300;
  const rows = await fetchKlines(tf, limit);
  if (isStale(seq) || currentCoin().pair !== pair) return;
  state.chartRows = rows;
  applyChartData(rows);
  setChartNote();
}

function htfNote(ind1, ind4) {
  const bits = [];
  const en = labLang() === "en";
  if (ind4 && ind4.rsi != null) bits.push(en ? `4h RSI ${ind4.rsi.toFixed(2)}` : `4 小时 RSI ${ind4.rsi.toFixed(2)}`);
  if (ind4 && ind4.hist != null) bits.push(en
    ? (ind4.hist > ind4.histPrev ? "the MACD histogram is shrinking and downside momentum is fading" : "the MACD histogram is still expanding")
    : (ind4.hist > ind4.histPrev ? "MACD 柱缩短、空头动能衰减" : "MACD 柱仍在扩大"));
  if (ind1 && ind1.rsi != null) bits.push(en ? `1h RSI ${ind1.rsi.toFixed(2)}` : `1 小时 RSI ${ind1.rsi.toFixed(2)}`);
  if (ind1 && ind1.bandwidth != null) bits.push(en ? `1h Bollinger width ${ind1.bandwidth.toFixed(2)}%` : `1 小时布林带宽 ${ind1.bandwidth.toFixed(2)}%`);
  if (!bits.length) return "";
  return en ? `Shorter timeframes: ${bits.join("; ")}. ` : `短线方面：${bits.join("，")}。`;
}

async function loadAnalytics(livePrice, seq = loadSeq) {
  const pair = currentCoin().pair;
  const [daily, h4, h1] = await Promise.all([
    fetchKlines("1d", 420),
    fetchKlines("4h", 150),
    fetchKlines("1h", 150),
  ]);
  if (isStale(seq) || currentCoin().pair !== pair) return;
  state.daily = daily;
  state.h4 = h4;
  state.h1 = h1;
  const ind = computeIndicators(daily, livePrice);
  const ind4 = computeIndicators(h4, livePrice);
  const ind1 = computeIndicators(h1, livePrice);
  state.indicators = ind;
  const extra = htfNote(ind1, ind4);
  renderIndicators(ind, extra + labT(`指标均用币安 ${pair} 现场计算：RSI 为 Wilder 平滑，布林带为 20 日均线 ± 2 倍样本标准差，EMA 以对应周期 SMA 做种子。日线最新一根用实时成交价替代未收盘收盘价。`,`Indicators are calculated here from Binance ${pair}. RSI uses Wilder smoothing, Bollinger Bands are the 20-period mean ± 2 sample standard deviations, and EMA is seeded with the SMA of the same length. The newest daily bar uses the live trade price instead of an unclosed close.`));
  renderSummary(ind, extra);
  renderLiq(livePrice || ind.price);
}

async function loadCycle(seq = loadSeq) {
  const pair = currentCoin().pair;
  const currentStart = Date.UTC(2026, 7, 11);
  const prevStart = Date.UTC(2022, 8, 1);
  const prevEnd = Date.UTC(2022, 10, 30);
  const [curr, prev] = await Promise.all([
    fetchKlines("1d", 140, { startTime: currentStart }),
    fetchKlines("1d", 140, { startTime: prevStart, endTime: prevEnd }),
  ]);
  if (isStale(seq) || currentCoin().pair !== pair) return;
  const n = Math.min(curr.length, prev.length);
  if (!n) throw new Error("周期数据不足");
  const c0 = curr[0].close;
  const p0 = prev[0].close;
  const thisLine = [];
  const prevLine = [];
  for (let i = 0; i < n; i += 1) {
    thisLine.push({ time: curr[i].time, value: (curr[i].close / c0) * 100 });
    prevLine.push({ time: curr[i].time, value: (prev[i].close / p0) * 100 });
  }
  ensureCycleChart();
  cycleThisSeries.setData(thisLine);
  cyclePrevSeries.setData(prevLine);
  const ftxIdx = prev.findIndex((row) => row.openTime >= Date.UTC(2022, 10, 8));
  if (ftxIdx > 0 && ftxIdx < n) {
    v18SetMarkers(cyclePrevSeries, [
      {
        time: curr[ftxIdx].time,
        position: "belowBar",
        color: "#3d6fbf",
        shape: "arrowUp",
        text: labT("上周期 FTX", "Prior cycle · FTX"),
      },
    ]);
  } else {
    v18SetMarkers(cyclePrevSeries, []);
  }
  cycleChart.timeScale().fitContent();
  const currRet = curr[n - 1].close / c0 - 1;
  const prevRet = prev[n - 1].close / p0 - 1;
  const windowNote = labLang() === "en"
    ? (currentCoin().id === "BTC"
      ? "Aligned by days after the halving. This cycle is counted from Apr 20, 2024, and the chart shows 2026-08-11 through the latest session. The prior cycle is the same stretch after the May 11, 2020 halving (about 2022-09-01 to 2022-11-29)."
      : `Aligned to the same calendar window after Bitcoin's halving. This is a market-cycle comparison, not ${currentCoin().id}'s own halving. This cycle is 2026-08-11 through the latest session; the prior cycle is about 2022-09-01 to 2022-11-29.`)
    : (currentCoin().id === "BTC"
      ? "按减半后天数对齐：本周期从 2024 年 4 月 20 日起算，对应 2026-08-11 至最新交易日；上周期为 2020 年 5 月 11 日减半后的同一段（2022-09-01 至 2022-11-29 一带）。"
      : `按比特币减半后的同一日历窗口对齐（市场周期对照，并非 ${currentCoin().id} 自身减半）：本周期 2026-08-11 至最新交易日；上周期 2022-09-01 至 2022-11-29 一带。`);
  const cycleEl = $("cycle-note");
  if (cycleEl) cycleEl.textContent = labLang() === "en"
    ? `${windowNote} Both lines are rebased so the first close in the window is 100. This cycle runs from ${fmtPx(c0)} to ${fmtPx(curr[n - 1].close)} (${(currRet * 100).toFixed(1)}%, index ${thisLine[n - 1].value.toFixed(2)}). The prior cycle runs from ${fmtPx(p0)} to ${fmtPx(prev[n - 1].close)} (${(prevRet * 100).toFixed(1)}%, index ${prevLine[n - 1].value.toFixed(2)}). About 911 days after that halving, the prior cycle hit the FTX collapse. That path is not a forecast.`
    : `${windowNote}两条线都以窗口起点收盘价 = 100。窗口内本周期从 ${fmtPx(c0)} 至 ${fmtPx(curr[n - 1].close)}（${(currRet * 100).toFixed(1)}%，指数 ${thisLine[n - 1].value.toFixed(2)}）；上周期同期从 ${fmtPx(p0)} 至 ${fmtPx(prev[n - 1].close)}（${(prevRet * 100).toFixed(1)}%，指数 ${prevLine[n - 1].value.toFixed(2)}）。上周期在减半后约第 911 天正值 FTX 破产暴跌，结构与本轮不同，不能把上轮路径当成预测。`;
}

async function refreshTickerAndLive(seq = loadSeq) {
  const pair = currentCoin().pair;
  const [ticker] = await Promise.all([fetchTicker(), fetchUsdCny()]);
  if (isStale(seq) || currentCoin().pair !== pair) return;
  state.ticker = ticker;
  state.price = +ticker.lastPrice;
  updateHeader(ticker, state.price);
  updateLastCandle(state.price);
  if (state.daily.length) {
    const ind = computeIndicators(state.daily, state.price);
    const ind4 = state.h4.length ? computeIndicators(state.h4, state.price) : null;
    const ind1 = state.h1.length ? computeIndicators(state.h1, state.price) : null;
    state.indicators = ind;
    const extra = htfNote(ind1, ind4);
    renderIndicators(ind, extra + labT(`指标均用币安 ${pair} 现场计算，日线最新一根用实时成交价替代未收盘收盘价。`,`Indicators are calculated here from Binance ${pair}. The newest daily bar uses the live trade price instead of an unclosed close.`));
    renderSummary(ind, extra);
    renderLiq(state.price);
  }
  setMarketState("live");
}

function inferEventYear(month) {
  return month >= 8 ? 2026 : 2027;
}

function shanghaiToUnix(year, month, day, hour, minute) {
  return Math.floor(Date.UTC(year, month - 1, day, (hour || 0) - 8, minute || 0) / 1000);
}

function parseEventTime(text) {
  if (!text) return null;
  const s = String(text);
  const cn = s.match(/(\d{1,2})\s*月\s*(\d{1,2})\s*日(?:[^0-9]{0,8})?(\d{1,2}:\d{2})?/);
  if (cn) {
    const month = +cn[1];
    const day = +cn[2];
    let hour = 0;
    let minute = 0;
    if (cn[3]) {
      const parts = cn[3].split(":").map(Number);
      hour = parts[0];
      minute = parts[1] || 0;
    }
    return shanghaiToUnix(inferEventYear(month), month, day, hour, minute);
  }
  const md = s.match(/(\d{1,2})\/(\d{1,2})(?:\s*[–—\-至]\s*\d{1,2}\/\d{1,2})?/);
  if (md) {
    const month = +md[1];
    const day = +md[2];
    return shanghaiToUnix(inferEventYear(month), month, day, 0, 0);
  }
  return null;
}

function snapToBar(rows, unix) {
  if (!rows.length || unix == null) return null;
  let idx = -1;
  let lo = 0;
  let hi = rows.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (rows[mid].time <= unix) {
      idx = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (idx < 0) return null;
  const end = idx + 1 < rows.length
    ? rows[idx + 1].time
    : rows[idx].time + (BAR_SECONDS[state.tf] || 3600);
  if (unix >= end) return null;
  return { row: rows[idx], index: idx };
}

function findSwingPivots(rows, values, left, right, useHigh) {
  const out = [];
  for (let i = left; i < rows.length - right; i += 1) {
    const px = useHigh ? rows[i].high : rows[i].low;
    let ok = true;
    for (let j = i - left; j <= i + right; j += 1) {
      if (j === i) continue;
      const other = useHigh ? rows[j].high : rows[j].low;
      if (useHigh ? other > px : other < px) {
        ok = false;
        break;
      }
    }
    if (ok && values[i] != null) {
      out.push({ index: i, price: px, osc: values[i], time: rows[i].time, close: rows[i].close });
    }
  }
  return out;
}

function pushAnno(events, row, index, kind, detail, extra) {
  const meta = annoMeta(kind) || {};
  events.push({
    time: row.time,
    price: row.close,
    index,
    kind,
    title: meta.label || kind,
    detail,
    ...(extra || {}),
  });
}

function detectRsiZoneEvents(rows, rsi, events) {
  for (let i = 1; i < rows.length; i += 1) {
    if (rsi[i] == null) continue;
    if (rsi[i] > 70 && (rsi[i - 1] == null || rsi[i - 1] <= 70)) {
      pushAnno(events, rows[i], i, "overbought", labT(`RSI(14) 上穿 70，当前约 ${rsi[i].toFixed(1)}，进入超买区`, `RSI(14) crossed above 70 and is about ${rsi[i].toFixed(1)}. That is the overbought zone.`));
    }
    if (rsi[i] < 30 && (rsi[i - 1] == null || rsi[i - 1] >= 30)) {
      pushAnno(events, rows[i], i, "oversold", labT(`RSI(14) 下穿 30，当前约 ${rsi[i].toFixed(1)}，进入超卖区`, `RSI(14) crossed under 30 and is about ${rsi[i].toFixed(1)}. That is the oversold zone.`));
    }
  }
}

function detectDivergences(rows, rsi, events) {
  const highs = findSwingPivots(rows, rsi, 5, 5, true);
  const lows = findSwingPivots(rows, rsi, 5, 5, false);
  const usedHigh = new Set();
  const usedLow = new Set();
  for (let i = 1; i < highs.length; i += 1) {
    const curr = highs[i];
    if (usedHigh.has(curr.index)) continue;
    let hit = null;
    for (let k = 1; k <= 3 && i - k >= 0; k += 1) {
      const prev = highs[i - k];
      if (curr.index - prev.index < 5 || curr.index - prev.index > 80) continue;
      if (curr.price > prev.price && curr.osc < prev.osc - 1) {
        hit = prev;
        break;
      }
    }
    if (!hit) continue;
    usedHigh.add(curr.index);
    pushAnno(
      events,
      rows[curr.index],
      curr.index,
      "bearish_div",
      `价格创新高（约 ${fmtPx(curr.price)}），RSI 却从 ${hit.osc.toFixed(1)} 降到 ${curr.osc.toFixed(1)}，形成顶背离`,
    );
  }
  for (let i = 1; i < lows.length; i += 1) {
    const curr = lows[i];
    if (usedLow.has(curr.index)) continue;
    let hit = null;
    for (let k = 1; k <= 3 && i - k >= 0; k += 1) {
      const prev = lows[i - k];
      if (curr.index - prev.index < 5 || curr.index - prev.index > 80) continue;
      if (curr.price < prev.price && curr.osc > prev.osc + 1) {
        hit = prev;
        break;
      }
    }
    if (!hit) continue;
    usedLow.add(curr.index);
    pushAnno(
      events,
      rows[curr.index],
      curr.index,
      "bullish_div",
      `价格创新低（约 ${fmtPx(curr.price)}），RSI 却从 ${hit.osc.toFixed(1)} 升到 ${curr.osc.toFixed(1)}，形成底背离`,
    );
  }
}

function medianOf(values) {
  if (!values.length) return 0;
  const s = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function detectVolumeEvents(rows, events) {
  const vols = rows.map((row) => row.volume);
  const volAvg = sma(vols, 20);
  const ranges = rows.map((row) => row.high - row.low);
  const lastDump = { i: -99 };
  const lastShrinkUp = { i: -99 };
  const lastShrinkDown = { i: -99 };
  for (let i = 20; i < rows.length; i += 1) {
    const avg = volAvg[i - 1]; // 与前20根已完成K线比较，不让当前K线稀释基准
    if (avg == null || avg <= 0) continue;
    const row = rows[i];
    const up = row.close >= row.open;
    const body = Math.abs(row.close - row.open);
    const lookRanges = ranges.slice(Math.max(0, i - 19), i);
    const medRange = medianOf(lookRanges.length ? lookRanges : [ranges[i]]);
    const notableBody = medRange > 0 ? (row.high - row.low) >= medRange * 0.7 : body > 0;
    const priorHigh = Math.max(...rows.slice(i - 20, i).map((r) => r.high));
    const rel = row.volume / avg;

    if (up && rel >= 1.8 && row.close > priorHigh) {
      pushAnno(
        events,
        row,
        i,
        "vol_break",
        `成交量约是近 20 根均量的 ${rel.toFixed(1)} 倍，收盘站上近端高点 ${fmtPx(priorHigh)}`,
      );
    }

    if (!up && rel >= 1.8 && notableBody && i - lastDump.i >= 3) {
      lastDump.i = i;
      pushAnno(
        events,
        row,
        i,
        "vol_dump",
        `收阴且成交量约是近 20 根均量的 ${rel.toFixed(1)} 倍，抛压较重`,
      );
    }

    const veryQuiet = rel <= 0.45;
    const quiet = rel <= 0.6;
    // 不再引用未来两根 K 线；使用已完成的当前及前两根量能。
    const priorVols = vols.slice(Math.max(0, i - 2), i + 1);
    const isLocalQuiet = quiet && (veryQuiet || vols[i] <= Math.min(...priorVols));

    if (i < rows.length - 1 && up && isLocalQuiet && notableBody && i - lastShrinkUp.i >= 5) {
      lastShrinkUp.i = i;
      pushAnno(
        events,
        row,
        i,
        "vol_shrink_up",
        `收阳且成交量为前 20 根均量的 ${(rel * 100).toFixed(0)}%；仅提示量价状态，不预测后续涨跌`,
      );
    }
    if (i < rows.length - 1 && !up && isLocalQuiet && notableBody && i - lastShrinkDown.i >= 5) {
      lastShrinkDown.i = i;
      pushAnno(
        events,
        row,
        i,
        "vol_shrink_down",
        `收阴且成交量为前 20 根均量的 ${(rel * 100).toFixed(0)}%；仅提示量价状态，不预测后续涨跌`,
      );
    }
  }
}


function shortEventLabel(item, kind) {
  if (item && item.pin) return item.pin;
  return abbreviateEventTitle((item && item.title) || "", kind);
}

function abbreviateEventTitle(title, kind) {
  const raw = String(title || "").trim();
  const compact = raw.replace(/\s+/g, "");
  if (!compact) return kind === "news" ? "新闻" : "宏观";
  const month = (compact.match(/(\d{1,2})月/) || [])[1];
  const m = month ? month + "月" : "";
  if (/非农/.test(compact)) return m + "非农";
  if (/CPI/.test(compact)) return m + "CPI";
  if (/PPI/.test(compact)) return m + "PPI";
  if (/PCE/.test(compact)) return m + "PCE";
  if (/FOMC|点阵图|利率决议/.test(compact)) return "FOMC利率决议";
  if (/GDP/.test(compact)) return m + "GDP";
  if (/零售销售/.test(compact)) return m + "零售销售";
  if (/ADP/.test(compact)) return m + "ADP";
  if (/初请失业/.test(compact)) return "初请失业金";
  if (/鲍威尔/.test(compact)) return "鲍威尔讲话";
  if (/美联储/.test(compact) && /讲话|发言|决议/.test(compact)) return "美联储讲话";
  if (kind === "news") {
    if (/比特币\s*ETF|现货比特币\s*ETF|BTC.*ETF/i.test(raw)) {
      return /流出|赎回/.test(compact) ? "BTC ETF流出" : /流入/.test(compact) ? "BTC ETF流入" : "BTC ETF";
    }
    if (/以太坊\s*ETF|现货以太坊\s*ETF|ETH.*ETF/i.test(raw)) {
      return /流出|赎回/.test(compact) ? "ETH ETF流出" : /流入/.test(compact) ? "ETH ETF流入" : "ETH ETF";
    }
    if (/被盗|被窃/.test(compact) && /币安/.test(compact)) {
      return /重开提现|补回/.test(compact) ? "币安重开提现" : "币安被盗";
    }
    if (/重开提现/.test(compact)) return "币安重开提现";
    if (/储备证明/.test(compact)) return "币安储备证明";
    if (/Red Alarm/i.test(raw)) return "Red Alarm上线";
    if (/MiCA|法国/.test(raw) && /币安/.test(compact)) return "币安法国关户";
    if (/CLARITY/i.test(raw)) return "CLARITY法案";
    if (/退休金|劳工部/.test(compact)) return "退休金加密规则";
    if (/波场/.test(compact) && /USDT/.test(compact)) return "波场USDT流通";
    if (/波场/.test(compact) && /三季报|Token Terminal/i.test(raw)) return "波场三季报";
    if (/波场/.test(compact) && /稳定币/.test(compact)) return "波场稳定币增长";
    if (/提案\s*108|提案108/.test(raw)) return "波场提案108";
    const clause = compact.split(/[，,。：:；;]/)[0];
    return clause.length <= 10 ? clause : clause.slice(0, 10);
  }
  const clause = compact.split(/[，,。：:；;与]/)[0];
  return clause.length <= 10 ? clause : clause.slice(0, 10);
}

function setChartNote(message, isError) {
  const el = $("chart-note");
  if (!el) return;
  if (!isError || !message) {
    el.hidden = true;
    el.classList.remove("is-error");
    el.textContent = "";
    return;
  }
  el.hidden = false;
  el.classList.add("is-error");
  el.textContent = message;
}

function detectEventPins(rows, events) {
  const seen = new Set();
  const pinItem = (item, kind) => {
    const unix = parseEventTime(item.time) || parseEventTime(item.title);
    if (unix == null) return;
    const hit = snapToBar(rows, unix);
    if (!hit) return;
    const key = kind + ":" + hit.row.time + ":" + item.title;
    if (seen.has(key)) return;
    seen.add(key);
    const shown = (typeof Litem === "function") ? Litem(item) : item;
    pushAnno(events, hit.row, hit.index, kind, (shown.note || shown.title), {
      title: shown.pin || shortEventLabel(item, kind),
      headline: shown.title,
      when: shown.timeDisplay || item.time,
      bias: item.bias,
      biasText: shown.biasText,
      stars: item.stars,
      note: shown.note,
    });
  };
  (currentCoin().news || []).forEach((item) => pinItem(item, "news"));
  MACRO.forEach((item) => pinItem(item, "macro"));
}

function detectTechAnnotations(rows) {
  const closes = rows.map((row) => row.close);
  const ema20 = ema(closes, 20);
  const ema50 = ema(closes, 50);
  const ema200 = ema(closes, 200);
  const rsi = rsiWilder(closes, 14);
  const events = [];
  const macdCross = macdCalc(closes, 12, 26, 9);
  for (let i = 1; i < rows.length; i += 1) {
    // 只使用已收盘 K 线，避免未收盘时反复交叉造成误报。
    if (i === rows.length - 1) continue;
    const prevLine = macdCross.line[i - 1];
    const prevSignal = macdCross.signal[i - 1];
    const line = macdCross.line[i];
    const signal = macdCross.signal[i];
    if ([prevLine, prevSignal, line, signal].every(Number.isFinite)) {
      if (prevLine <= prevSignal && line > signal) {
        pushAnno(events, rows[i], i, "golden", labT("MACD(12,26,9)：DIF 上穿 DEA（信号线），收盘确认金叉；不代表价格必涨", "MACD(12,26,9): DIF crossed above the signal line on the close. That does not mean price must rise."));
      }
      if (prevLine >= prevSignal && line < signal) {
        pushAnno(events, rows[i], i, "death", labT("MACD(12,26,9)：DIF 下穿 DEA（信号线），收盘确认死叉；不代表价格必跌", "MACD(12,26,9): DIF crossed below the signal line on the close. That does not mean price must fall."));
      }
    }
    if (ema200[i] != null && ema200[i - 1] != null) {
      if (closes[i - 1] < ema200[i - 1] && closes[i] >= ema200[i]) {
        pushAnno(events, rows[i], i, "reclaim", labT(`价格重新站上 EMA200（约 ${fmtPx(ema200[i])}），中期结构有所修复`, `Price reclaimed EMA200 (about ${fmtPx(ema200[i])}). The medium-term structure looks repaired.`));
      } else if (closes[i - 1] >= ema200[i - 1] && closes[i] < ema200[i]) {
        pushAnno(events, rows[i], i, "reject", labT(`价格跌破 EMA200（约 ${fmtPx(ema200[i])}），中期转弱信号`, `Price lost EMA200 (about ${fmtPx(ema200[i])}). That is a weaker medium-term signal.`));
      }
    }
  }

  const look = rows.slice(-40);
  if (look.length >= 7) {
    const offset = rows.length - look.length;
    for (let i = 3; i < look.length - 3; i += 1) {
      const hi = look[i].high;
      const lo = look[i].low;
      const isSwingHigh = look.slice(i - 3, i + 4).every((row, j) => j === 3 || row.high <= hi);
      const isSwingLow = look.slice(i - 3, i + 4).every((row, j) => j === 3 || row.low >= lo);
      if (isSwingHigh) {
        pushAnno(events, look[i], offset + i, "resist", labT(`近端摆动高点约 ${fmtPx(hi)}，可作回抽压力参考`, `A nearby swing high around ${fmtPx(hi)}, useful as a reference for overhead pressure.`));
      } else if (isSwingLow) {
        pushAnno(events, look[i], offset + i, "support", labT(`近端摆动低点约 ${fmtPx(lo)}，可作防守参考`, `A nearby swing low around ${fmtPx(lo)}, useful as a reference for defense.`));
      }
    }
  }

  detectRsiZoneEvents(rows, rsi, events);
  detectDivergences(rows, rsi, events);
  detectVolumeEvents(rows, events);
  return events;
}

function pickDisplayAnnotations(events) {
  const take = (kinds, n) => events.filter((e) => kinds.includes(e.kind)).slice(-n);
  const picked = [
    ...take(["golden", "death"], 6),
    ...take(["reclaim", "reject"], 3),
    ...take(["support", "resist"], 3),
    ...take(["overbought"], 3),
    ...take(["oversold"], 3),
    ...take(["bearish_div"], 3),
    ...take(["bullish_div"], 3),
    ...take(["vol_break"], 3),
    ...take(["vol_shrink_up"], 3),
    ...take(["vol_dump"], 3),
    ...take(["vol_shrink_down"], 3),
    ...events.filter((e) => e.kind === "news" || e.kind === "macro"),
  ];
  picked.sort((a, b) => a.time - b.time);
  const seen = new Set();
  return picked.filter((e) => {
    const key = e.time + ":" + e.kind + ":" + (e.headline || e.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function computeAnnotations(rows) {
  const tech = detectTechAnnotations(rows);
  const all = tech.slice();
  detectEventPins(rows, all);
  return { tech, all, display: pickDisplayAnnotations(all) };
}

function horizonLabel(tf, n) {
  if (labLang() === "en") {
    if (tf === "1d") return n + (n === 1 ? " day" : " days");
    if (tf === "1w") return n + (n === 1 ? " week" : " weeks");
    if (tf === "1M") return n + (n === 1 ? " month" : " months");
    return n + " bars";
  }
  if (tf === "1d") return n + "日";
  if (tf === "1w") return n + "周";
  if (tf === "1M") return n + "月";
  return n + "根";
}

function fmtChgPct(x) {
  if (x == null || Number.isNaN(x)) return "—";
  const pct = x * 100;
  const sign = pct > 0 ? "+" : "";
  return sign + pct.toFixed(2) + "%";
}

function computeLedger(rows, events) {
  const out = {};
  LEDGER_KINDS.forEach((kind) => {
    const evs = events
      .filter((e) => e.kind === kind)
      .map((e) => {
        const index = e.index != null ? e.index : rows.findIndex((r) => r.time === e.time);
        return { ...e, index };
      })
      .filter((e) => e.index >= 0)
      .sort((a, b) => a.time - b.time)
      .slice(-10);
    const horizons = [1, 5, 10].map((h) => {
      let up = 0;
      let count = 0;
      let sum = 0;
      evs.forEach((e) => {
        const j = e.index + h;
        if (j >= rows.length) return;
        const base = rows[e.index].close;
        if (!base) return;
        const chg = (rows[j].close - base) / base;
        sum += chg;
        count += 1;
        if (chg > 0) up += 1;
      });
      return { h, count, up, avg: count ? sum / count : null };
    });
    out[kind] = { samples: evs.length, horizons };
  });
  return out;
}

function ledgerLineFor(kind) {
  const rec = state.ledger && state.ledger[kind];
  if (!rec || !rec.samples) return "";
  const h5 = rec.horizons.find((x) => x.h === 5) || rec.horizons[1];
  if (!h5 || !h5.count) return labT(`本周期已记录 ${rec.samples} 次，但尚未走完对照所用的后续 K 线。`, `This interval has ${rec.samples} marks, but the later candles used for the check are not finished yet.`);
  const rate = Math.round((h5.up / h5.count) * 100);
  return labLang() === "en"
    ? `Across the latest ${rec.samples} marks, price was higher ${h5.up}/${h5.count} times (${rate}%) after ${horizonLabel(state.tf, h5.h)}, average ${fmtChgPct(h5.avg)}. For comparison only. Not investment advice.`
    : `本周期近 ${rec.samples} 次，${horizonLabel(state.tf, h5.h)}后上涨 ${h5.up}/${h5.count}（${rate}%），平均 ${fmtChgPct(h5.avg)}。仅供对照，不构成投资建议。`;
}

function renderLedger() {
  const root = $("ledger-list");
  const note = $("ledger-note");
  if (!root) return;
  const recs = LEDGER_KINDS.map((kind) => {
    const rec = state.ledger && state.ledger[kind];
    return { kind, rec, meta: annoMeta(kind) };
  }).filter((item) => item.rec && item.rec.samples);
  if (!recs.length) {
    root.innerHTML = '<p class="ledger-empty">' + labT("当前周期还没有足够的标注样本。", "This interval does not have enough marks to check yet.") + '</p>';
    if (note) note.textContent = labT("对账随币种和周期重算，取最近最多 10 次已走完后续 K 线的记录。", "The check is recalculated for the coin and interval, using up to the latest 10 marks that already have later candles.");
    return;
  }
  root.innerHTML = recs.map((item) => {
    const rows = item.rec.horizons.map((h) => {
      if (!h.count) {
        const after = labLang() === "en" ? horizonLabel(state.tf, h.h) : horizonLabel(state.tf, h.h) + "后";
        return `<tr><td>${after}</td><td colspan="2">${labT("样本不足", "Not enough samples")}</td></tr>`;
      }
      const rate = Math.round((h.up / h.count) * 100);
      const cls = h.avg > 0 ? "up" : (h.avg < 0 ? "down" : "");
      return `<tr>
        <td>${labLang() === "en" ? horizonLabel(state.tf, h.h) : horizonLabel(state.tf, h.h) + "后"}</td>
        <td>${labT("上涨", "Up")} ${h.up}/${h.count}（${rate}%）</td>
        <td class="${cls}">${labT("平均", "Avg")} ${fmtChgPct(h.avg)}</td>
      </tr>`;
    }).join("");
    return `<article class="ledger-item">
      <h3>${item.meta.label}<span>${labT("最近", "Latest")} ${item.rec.samples} ${labT("次", "marks")} · ${tfLabel(state.tf)}</span></h3>
      <table class="ledger-table">
        <thead><tr><th>${labT("对照窗口","Window")}</th><th>${labT("上涨占比","Share higher")}</th><th>${labT("平均涨跌","Average move")}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </article>`;
  }).join("");
  if (note) {
    note.textContent = labT("统计的是标注出现后第 1 / 5 / 10 根 K 线收盘价相对信号当根收盘价的涨跌；日线、周线、月线分别按日 / 周 / 月计数。这是当前图上样本的学习对照，不是胜率承诺，也不构成投资建议。", "This compares the close 1, 5, and 10 candles later with the close of the signal candle. Daily, weekly, and monthly charts count in days, weeks, and months. It is a study of the samples on this chart, not a promised win rate, and not investment advice.");
  }
}

function applyAnnotations(rows) {
  state.labelCandleBounds = new Map(rows.map(r => [Number(r.time), {high:Number(r.high), low:Number(r.low)}]));
  const computed = computeAnnotations(rows);
  state.signalEvents = computed.tech;
  state.annotations = computed.display;
  state.ledger = computeLedger(rows, state.signalEvents);
  renderLedger();
  refreshAnnoDisplay();
}

function isBullKind(kind) {
  return annoMeta(kind) && annoMeta(kind).bull === true;
}

function markerStyle(kind) {
  if (kind === "news") return { color: "#3d6fbf", shape: "circle", position: "aboveBar" };
  if (kind === "macro") return { color: "#7a5c14", shape: "circle", position: "belowBar" };
  const meta = annoMeta(kind) || {};
  if (meta.tone === "warn" || kind === "resist") {
    return { color: "#9a7b38", shape: isBullKind(kind) ? "arrowUp" : "arrowDown", position: isBullKind(kind) ? "belowBar" : "aboveBar" };
  }
  if (isBullKind(kind)) return { color: "#1e6b45", shape: "arrowUp", position: "belowBar" };
  return { color: "#b42318", shape: "arrowDown", position: "aboveBar" };
}

function refreshAnnoDisplay() {
  if (!candleSeries) return;
  const markers = visibleAnnotations().map((a) => {
    const style = markerStyle(a.kind);
    return {
      time: a.time,
      position: style.position,
      color: style.color,
      shape: style.shape,
      text: "",
    };
  });
  v18SetMarkers(candleSeries, markers);
  renderAnnoPills();
  requestAnimationFrame(syncAnnoPills);
  setTimeout(syncAnnoPills, 40);
}

function pillClassFor(kind) {
  return "anno-pill " + (kind || "resist");
}

function renderAnnoPills() {
  const layer = $("anno-layer");
  if (!layer) return;
  layer.innerHTML = "";
  visibleAnnotations().forEach((a, idx) => {
    const el = document.createElement("div");
    el.className = pillClassFor(a.kind);
    el.dataset.time = String(a.time);
    el.dataset.price = String(a.price);
    el.dataset.kind = a.kind;
    el.dataset.idx = String(idx);
    el.textContent = a.title;
    el.addEventListener("mouseenter", (ev) => {
      const rect = $("price-chart").getBoundingClientRect();
      const wrap = $("anno-tip") && $("anno-tip").parentElement;
      const wr = wrap ? wrap.getBoundingClientRect() : rect;
      showAnnoTip(a, { x: ev.clientX - wr.left, y: ev.clientY - wr.top });
    });
    el.addEventListener("mousemove", (ev) => {
      const wrap = $("anno-tip") && $("anno-tip").parentElement;
      if (!wrap) return;
      const wr = wrap.getBoundingClientRect();
      showAnnoTip(a, { x: ev.clientX - wr.left, y: ev.clientY - wr.top });
    });
    el.addEventListener("mouseleave", hideAnnoTip);
    layer.appendChild(el);
  });
  bindAnnoPillSync();
}

function syncAnnoPills() {
  const layer = $("anno-layer");
  if (!layer || !candleSeries || !priceChart) return;
  const pills = Array.from(layer.querySelectorAll(".anno-pill"));
  const width = layer.clientWidth;
  const height = layer.clientHeight;
  const bounds = state.labelCandleBounds || new Map();
  const placed = [];
  // Each label is anchored beyond the entire candle wick, not its signal price.
  // Collision handling also checks adjacent candles, not just the same timestamp.
  pills.forEach(el => {
    const time = Number(el.dataset.time);
    const price = Number(el.dataset.price);
    const kind = el.dataset.kind;
    const style = markerStyle(kind);
    const below = style.position === "belowBar";
    const candle = bounds.get(time);
    let x, anchorY;
    try {
      x = priceChart.timeScale().timeToCoordinate(time);
      const boundaryPrice = candle ? (below ? candle.low : candle.high) : price;
      anchorY = candleSeries.priceToCoordinate(boundaryPrice);
    } catch (_) { x = null; anchorY = null; }
    if (x == null || anchorY == null || !Number.isFinite(x) || !Number.isFinite(anchorY)) {
      el.style.visibility = "hidden";
      return;
    }
    const w = el.offsetWidth || 70;
    const h = el.offsetHeight || 22;
    const halfW = w / 2;
    // Keep the tag inside the plot and away from its own candle.
    const cx = Math.max(halfW + 3, Math.min(width - halfW - 3, x));
    const direction = below ? 1 : -1;
    let cy = anchorY + direction * (h / 2 + 19);
    let found = false;
    for (let attempt = 0; attempt < 9; attempt++) {
      const left = cx - halfW - 5, right = cx + halfW + 5;
      const top = cy - h/2 - 4, bottom = cy + h/2 + 4;
      const collides = placed.some(r => left < r.right && right > r.left && top < r.bottom && bottom > r.top);
      if (!collides && top >= 5 && bottom <= height - 5) { found = true; placed.push({left,right,top,bottom}); break; }
      cy += direction * (h + 9);
    }
    // If no clear space exists, hide the label rather than cover the price candles.
    el.style.visibility = found ? "visible" : "hidden";
    if (found) { el.style.left = cx + "px"; el.style.top = cy + "px"; }
  });
}

function bindAnnoPillSync() {
  if (pillsBound || !priceChart) return;
  pillsBound = true;
  priceChart.timeScale().subscribeVisibleLogicalRangeChange(() => syncAnnoPills());
  priceChart.subscribeCrosshairMove(() => syncAnnoPills());
  new ResizeObserver(() => syncAnnoPills()).observe($("chart-wrap") || $("price-chart"));
}

function hideAnnoTip() {
  const tip = $("anno-tip");
  if (tip) tip.hidden = true;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function isUpcomingEvent(anno) {
  const when = anno.when || "";
  if (/已公布|Released/i.test(when)) return false;
  return anno.kind === "macro" && !/已公布|Released/i.test(when);
}

function eventImplication(anno) {
  if (isUpcomingEvent(anno)) {
    if (anno.bias === "bear" || anno.biasText === "利空" || anno.biasText === "偏利空") {
      return labT("待公布前这是风险提示而非结果预判；若数据或决议偏鹰、高于预期，对风险资产的压力可能加大。", "Before the release this is a risk marker, not a forecast. A hawkish or hotter result can add pressure on risk assets.");
    }
    if (anno.bias === "bull" || anno.biasText === "利好") {
      return labT("待公布前这是风险提示而非结果预判；若结果兑现偏积极的预期，情绪面或有支撑。", "Before the release this is a risk marker, not a forecast. A result that meets a more positive expectation can support sentiment.");
    }
    return labT("待公布前只是风险提示，不是涨跌预判；方向取决于结果相对预期的偏差，公布前后波动可能放大。", "Before the release this is only a risk marker. Direction depends on the surprise versus expectations, and the range often widens around the print.");
  }
  if (anno.bias === "bear" || anno.biasText === "利空") {
    return labT("对风险资产偏压制；若市场仍在定价这一利空，短线更容易走弱或波动加大。", "This leans against risk assets. If the market is still pricing it in, the short-term path can be weaker or choppier.");
  }
  if (anno.bias === "bull" || anno.biasText === "利好") {
    return labT("对风险资产偏支撑；若利好尚未被充分定价，情绪面或资金面可能有提振。", "This leans in favor of risk assets. If it is not fully priced, sentiment or flows can improve.");
  }
  if (anno.biasText === "中性待定") {
    return labT("方向仍取决于结果相对预期的偏差，公布前后波动可能放大，不宜提前押注涨跌。", "Direction still depends on the surprise versus expectations. The range often widens around the release. This is not a reason to bet the direction in advance.");
  }
  return labT("当前语境偏空，但结果尚未完全兑现；若进展不及预期，下行波动风险更高。", "The context leans down, but the outcome is not fully settled. If progress disappoints, downside swings are the larger risk.");
}

function eventOutlook(anno) {
  const bits = [];
  if (anno.biasText) {
    bits.push(labLang() === "en"
      ? `Bias: ${anno.biasText}${anno.stars ? ` (${anno.stars}/5)` : ""}.`
      : `倾向：${anno.biasText}${anno.stars ? `（影响 ${anno.stars} 星）` : ""}。`);
  } else if (anno.stars) {
    bits.push(labLang() === "en" ? `Weight ${anno.stars}/5.` : `影响 ${anno.stars} 星。`);
  }
  const note = (anno.note || "").trim();
  if (note) bits.push(note.endsWith("。") ? note : note + "。");
  bits.push(eventImplication(anno));
  return bits.join("");
}

function showAnnoTip(anno, point) {
  const tip = $("anno-tip");
  const wrap = tip && tip.parentElement;
  if (!tip || !wrap || !point) return;
  const isEvent = anno.kind === "news" || anno.kind === "macro";
  tip.querySelector(".anno-tip-title").textContent = anno.headline || anno.title;
  const detailEl = tip.querySelector(".anno-tip-detail");
  if (detailEl) {
    if (isEvent) {
      detailEl.textContent = "";
      detailEl.hidden = true;
    } else {
      detailEl.hidden = false;
      detailEl.textContent = anno.detail || "";
    }
  }
  const labelEl = tip.querySelector(".anno-tip-outlook-label");
  const outlook = tip.querySelector(".anno-tip-outlook-text");
  if (labelEl) {
    if (isEvent) {
      const badge = anno.biasText
        ? ` <span class="badge ${escapeHtml(anno.bias || "")}">${escapeHtml(anno.biasText)}</span>`
        : "";
      const stars = anno.stars ? " " + starsHtml(anno.stars) : "";
      labelEl.innerHTML = labT("影响分析", "Impact") + badge + stars;
    } else {
      labelEl.textContent = labT("后续分析", "What often follows");
    }
  }
  if (outlook) {
    if (isEvent) {
      outlook.textContent = eventOutlook(anno);
    } else {
      const meta = annoMeta(anno.kind) || {};
      const stats = ledgerLineFor(anno.kind);
      outlook.textContent = [meta.outlook, stats].filter(Boolean).join(" ");
    }
  }
  const bits = [];
  if (anno.when) bits.push(anno.when);
  if (anno.price != null) bits.push(labT("收盘价 ", "Close ") + fmtLast(anno.price));
  bits.push(labT("仅供学习，不构成投资建议", "For study only. Not investment advice."));
  tip.querySelector(".anno-tip-price").textContent = bits.join(" · ");
  tip.hidden = false;
  const tipW = tip.offsetWidth || 200;
  const tipH = tip.offsetHeight || 140;
  let left = point.x + 14;
  let top = point.y - tipH - 12;
  if (left + tipW > wrap.clientWidth - 8) left = Math.max(8, point.x - tipW - 14);
  if (top < 8) top = Math.min(wrap.clientHeight - tipH - 8, point.y + 16);
  tip.style.left = left + "px";
  tip.style.top = top + "px";
}

function bindAnnoTip() {
  if (tipBound || !priceChart) return;
  tipBound = true;
  priceChart.subscribeCrosshairMove((param) => {
    if (!param || param.time == null || !param.point || param.point.x < 0 || param.point.y < 0) {
      hideAnnoTip();
      return;
    }
    const t = typeof param.time === "object"
      ? Math.floor(Date.UTC(param.time.year, param.time.month - 1, param.time.day) / 1000)
      : param.time;
    const shown = visibleAnnotations();
    let hit = shown.find((a) => a.time === t);
    if (!hit && shown.length) {
      // proximity: nearest marker within ~1.5 bars of visible logical range if possible
      let best = null;
      let bestDist = Infinity;
      for (const a of shown) {
        const d = Math.abs(a.time - t);
        if (d < bestDist) {
          bestDist = d;
          best = a;
        }
      }
      const barSec = BAR_SECONDS[state.tf] || 3600;
      if (best && bestDist <= barSec * 0.6) hit = best;
    }
    if (!hit) {
      hideAnnoTip();
      return;
    }
    showAnnoTip(hit, param.point);
  });
  $("price-chart").addEventListener("mouseleave", hideAnnoTip);
}

function resizeCycleChart() {
  if (!cycleChart) return;
  cycleChart.applyOptions({ autoSize: true });
  try { cycleChart.timeScale().fitContent(); } catch (_) {}
}


function syncAnnoToggleButtons() {
  document.querySelectorAll(".anno-toggle").forEach((btn) => {
    const kind = btn.dataset.annoKind;
    const on = isAnnoVisible(kind);
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    const eye = btn.querySelector(".eye");
    if (eye) eye.innerHTML = on ? EYE_OPEN : EYE_CLOSED;
  });
}

function bindAnnoToggles() {
  const root = $("anno-toggles");
  if (!root) return;
  syncAnnoToggleButtons();
  root.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".anno-toggle");
    if (!btn) return;
    const kind = btn.dataset.annoKind;
    if (!ANNO_KINDS.includes(kind)) return;
    state.annoVisible[kind] = !isAnnoVisible(kind);
    saveAnnoVisible();
    syncAnnoToggleButtons();
    refreshAnnoDisplay();
    hideAnnoTip();
  });
}

function bindPanels() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const btn = panel.querySelector(".panel-toggle");
    if (!btn) return;
    const toggle = () => {
      const open = !panel.classList.contains("open");
      panel.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && panel.dataset.panel === "cycle") {
        requestAnimationFrame(() => resizeCycleChart());
        setTimeout(resizeCycleChart, 50);
      }
    };
    btn.addEventListener("click", toggle);
  });
}

function bindTf() {
  document.querySelectorAll(".tf-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      document.querySelectorAll(".tf-btn").forEach((el) => el.classList.toggle("active", el === btn));
      state.tf = btn.dataset.tf;
      hideAnnoTip();
      try {
        await loadChart(state.tf, loadSeq);
      } catch (err) {
        setChartNote(labT("切换周期失败：", "Couldn't switch interval: ") + err.message, true);
      }
    });
  });
}

function updateCoinChrome() {
  const coin = currentCoin();
  document.title = labT("星际行情实验室", "Market Lab") + " · " + coin.id + " - Web3 新手村";
  document.querySelectorAll(".coin").forEach((btn) => {
    const id = (btn.dataset.symbol || btn.textContent.trim()).toUpperCase();
    btn.classList.toggle("active", id === coin.id);
  });
  const label = $("px-label");
  if (label) label.textContent = coin.id + " / USDT";
  const chart = $("price-chart");
  if (chart) chart.setAttribute("aria-label", coin.pair + labT(" K线图", " candlestick chart"));
  const footCoin = $("foot-coin");
  if (footCoin) footCoin.textContent = labT("星际行情实验室 · ", "Market Lab · ") + coin.id;
  const footSrc = $("foot-source");
  if (footSrc) {
    footSrc.textContent = coin.id === "BTC"
      ? labT("数据源：Binance 现货 BTCUSDT · 清算带转述自 CoinGlass / Base Camp / Chaincatcher", "Source: Binance spot BTCUSDT. Liquidation bands retell CoinGlass / Base Camp / Chaincatcher. They are not live orders.")
      : labT(`数据源：Binance 现货 ${coin.pair} · 清算带为模型估算，非交易所实时挂单`, `Source: Binance spot ${coin.pair}. Liquidation bands are a model estimate, not live exchange orders.`);
  }
}

function applyCoinChartFormat() {
  if (!priceChart) return;
  priceChart.applyOptions({
    localization: {
      timeFormatter: chartOptions().localization.timeFormatter,
      priceFormatter: (p) => fmt(p, priceAxisDigits(p)),
    },
  });
}

function bindCoins() {
  document.querySelectorAll(".coin").forEach((btn) => {
    if (btn.disabled) return;
    btn.addEventListener("click", () => {
      const id = (btn.dataset.symbol || "").toUpperCase();
      selectCoin(id);
    });
  });
}

async function selectCoin(id) {
  id = String(id || "").toUpperCase();
  if (!READY_COINS.includes(id) || id === state.coin) return;
  const seq = ++loadSeq;
  state.coin = id;
  state.price = null;
  state.ticker = null;
  state.daily = [];
  state.h1 = [];
  state.h4 = [];
  state.chartRows = [];
  state.indicators = null;
  state.annotations = [];
  state.signalEvents = [];
  state.ledger = null;
  if ($("ledger-list")) $("ledger-list").innerHTML = "";
  if ($("ledger-note")) $("ledger-note").textContent = "";
  hideAnnoTip();
  updateCoinChrome();
  writeCoinQuery(id);
  applyCoinChartFormat();
  if (candleSeries) {
    try {
      candleSeries.setData([]);
      v18SetMarkers(candleSeries, []);
    } catch (_) {}
  }
  if (volumeSeries) {
    try { volumeSeries.setData([]); } catch (_) {}
  }
  const layer = $("anno-layer");
  if (layer) layer.innerHTML = "";
  renderFeed("news-list", currentCoin().news);
  renderFeed("macro-list", MACRO);
  renderLiq(null);
  resetTickerDisplay();
  setChartNote();
  if ($("summary-lead")) $("summary-lead").textContent = labT("正在根据最新数据生成看法…", "Preparing a read from the latest data…");
  $("view-pill").className = "view-pill warn";
  if ($("view-pill")) $("view-pill").textContent = labT("研判生成中", "Preparing the read");
  $("sum-support").textContent = "—";
  $("sum-resist").textContent = "—";
  $("sum-view").textContent = "—";
  $("indicator-list").innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  $("indicator-note").textContent = "";
  $("cycle-note").textContent = "";
  setMarketState("connecting");
  try {
    await refreshTickerAndLive(seq);
    if (isStale(seq)) return;
    await Promise.all([
      loadChart(state.tf, seq),
      loadAnalytics(state.price, seq),
      loadCycle(seq),
    ]);
    if (isStale(seq)) return;
    setMarketState("live");
  } catch (err) {
    if (isStale(seq)) return;
    setMarketState("offline");
    setChartNote(labT("行情加载失败：", "Market data failed to load: ") + err.message, true);
    if ($("summary-lead")) $("summary-lead").textContent = labT("无法连接到行情源，请稍后刷新页面。", "Can't reach the market feed. Nothing on this chart is live. Try again shortly.");
    console.error(err);
  }
}


function clearDataTimers() {
  if (pollTimer) clearInterval(pollTimer);
  if (analyticsTimer) clearInterval(analyticsTimer);
  pollTimer = null;
  analyticsTimer = null;
}
async function reloadLabData() {
  if (!labAlive) return;
  clearDataTimers();
  const seq = ++loadSeq;
  updateCoinChrome();
  renderFeed("news-list", currentCoin().news);
  renderFeed("macro-list", MACRO);
  renderLiq(null);
  setMarketState("connecting");
  fetchUsdCny().then((rate) => {
    if (rate && state.ticker && labAlive && !isStale(seq)) updateHeader(state.ticker, state.price);
  });
  try {
    await refreshTickerAndLive(seq);
    if (!isStale(seq) && labAlive) {
      await Promise.all([
        loadChart(state.tf, seq),
        loadAnalytics(state.price, seq),
        loadCycle(seq),
      ]);
    }
    if (!isStale(seq) && labAlive) setMarketState("live");
  } catch (err) {
    if (!isStale(seq) && labAlive) {
      setMarketState("offline");
      setChartNote(labT("行情加载失败：", "Market data failed to load: ") + err.message, true);
      if ($("summary-lead")) $("summary-lead").textContent = labT("无法连接到行情源，请稍后刷新页面。", "Can't reach the market feed. Nothing on this chart is live. Try again shortly.");
    }
    console.error(err);
  }
  if (!labAlive || isStale(seq)) return;
  pollTimer = setInterval(async () => {
    const poll = loadSeq;
    try {
      await refreshTickerAndLive(poll);
    } catch (err) {
      if (!isStale(poll) && labAlive) setMarketState("retry");
      console.error(err);
    }
  }, 4000);
  analyticsTimer = setInterval(async () => {
    const poll = loadSeq;
    try {
      await loadChart(state.tf, poll);
      await loadAnalytics(state.price, poll);
    } catch (err) {
      console.error(err);
    }
  }, 60000);
}
function bindLabNavHide() {
  const nav = document.querySelector('header.topbar');
  if (!nav || nav.dataset.labHide === '1') return;
  nav.dataset.labHide = '1';
  let sensor = document.getElementById('lab-nav-edge');
  if (!sensor) {
    sensor = document.createElement('div');
    sensor.id = 'lab-nav-edge';
    sensor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sensor);
  }
  let prev = window.scrollY, hideTimer = 0, focus = false, lastScroll = 0;
  const show = () => { clearTimeout(hideTimer); nav.classList.remove('lab-nav-hidden'); };
  const hide = () => { if (focus || window.scrollY < 90) return; nav.classList.add('lab-nav-hidden'); };
  const schedule = (ms = 220) => { clearTimeout(hideTimer); hideTimer = setTimeout(hide, ms); };
  labListen(window, 'scroll', () => {
    if (!document.body.classList.contains('is-lab')) return;
    const y = window.scrollY, delta = y - prev; prev = y;
    if (y < 90) { show(); return; }
    if (Math.abs(delta) < 3) return;
    lastScroll = Date.now();
    if (delta > 0) schedule(180); else show();
  }, { passive: true });
  labListen(sensor, 'pointerenter', (e) => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') show(); });
  labListen(nav, 'pointerenter', () => { if (Date.now() - lastScroll > 500) show(); });
  labListen(nav, 'pointerleave', () => { if (window.scrollY > 90) schedule(650); });
  labListen(nav, 'focusin', () => { focus = true; show(); });
  labListen(nav, 'focusout', () => { focus = nav.contains(document.activeElement); if (!focus) schedule(650); });
  show();
}
async function boot() {
  if (!labAlive) return;
  if (typeof tagNews === "function") tagNews();
  state.coin = readInitialCoin();
  updateCoinChrome();
  if ($("clock")) $("clock").textContent = clockText();
  if (!clockTimer) {
    clockTimer = setInterval(() => {
      if (!labAlive) return;
      if (state.ticker) updateHeader(state.ticker, state.price);
      else if ($("clock")) $("clock").textContent = clockText();
    }, 1000);
  }
  if (!chromeBound) {
    bindPanels();
    bindAnnoToggles();
    bindTf();
    bindCoins();
    initVillageStudies();
    initLabLearn();
    initLabFullscreen();
    bindLabSmcListeners();
    bindLabNavHide();
    const retry = $("lab-retry");
    if (retry) retry.addEventListener("click", () => { if (labAlive) reloadLabData(); });
    chromeBound = true;
  }
  await reloadLabData();
}


/* V10: independent swing BOS / CHoCH and active FVG; not LuxAlgo source code. */
const VILLAGE_DEFAULT_STUDIES={ema20:true,ema50:true,macd:true,smc:true};
let villageStudies={...VILLAGE_DEFAULT_STUDIES};let villageEma20=null,villageEma50=null,villageSmcHi=null,villageSmcLo=null,villageMacdChart=null,villageMacdHist=null,villageMacdDif=null,villageMacdDea=null;let villageMacdDataByTime=null;
try{let s=JSON.parse(localStorage.getItem('village-studies-v7')||'null');if(s)for(let k of Object.keys(VILLAGE_DEFAULT_STUDIES))if(typeof s[k]==='boolean')villageStudies[k]=s[k]}catch(e){}
function initVillageStudies(){document.querySelectorAll('[data-study]').forEach(b=>b.addEventListener('click',()=>{let k=b.dataset.study;villageStudies[k]=!villageStudies[k];persistVillageStudies();syncVillageStudies();if(typeof state!=='undefined'&&state.chartRows.length)renderVillageStudies(state.chartRows);if(window.villageLastIndicatorData){const pack=window.villageLastIndicatorData;renderIndicators(pack.ind,pack.extra)}}));let reset=document.getElementById('study-reset');if(reset)reset.addEventListener('click',()=>{villageStudies={...VILLAGE_DEFAULT_STUDIES};persistVillageStudies();syncVillageStudies();if(typeof state!=='undefined'&&state.chartRows.length)renderVillageStudies(state.chartRows);if(window.villageLastIndicatorData){const pack=window.villageLastIndicatorData;renderIndicators(pack.ind,pack.extra)}});syncVillageStudies()}
function persistVillageStudies(){try{localStorage.setItem('village-studies-v7',JSON.stringify(villageStudies))}catch(e){}}
function syncVillageStudies(){document.querySelectorAll('[data-study]').forEach(b=>{let on=villageStudies[b.dataset.study];b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});document.querySelector('.v18-pane-note')?.classList.toggle('muted',!villageStudies.macd)}
function lineFrom(rows,arr){return rows.flatMap((r,i)=>Number.isFinite(arr[i])?[{time:r.time,value:arr[i]}]:[])}
function renderVillageStudies(rows){if(!rows?.length||!priceChart)return;const closes=rows.map(r=>r.close);const e20=ema(closes,20),e50=ema(closes,50);if(!villageEma20){villageEma20=priceChart.addSeries(LightweightCharts.LineSeries, {color:'#f4cb82',lineWidth:2,priceLineVisible:false,lastValueVisible:false,title:''});villageEma50=priceChart.addSeries(LightweightCharts.LineSeries, {color:'#9d8af3',lineWidth:2,priceLineVisible:false,lastValueVisible:false,title:''});villageSmcHi=priceChart.addSeries(LightweightCharts.LineSeries, {color:'rgba(247,164,135,.65)',lineWidth:1,lineStyle:2,priceLineVisible:false,lastValueVisible:false,title:''});villageSmcLo=priceChart.addSeries(LightweightCharts.LineSeries, {color:'rgba(100,220,190,.65)',lineWidth:1,lineStyle:2,priceLineVisible:false,lastValueVisible:false,title:''})}villageEma20.setData(villageStudies.ema20?lineFrom(rows,e20):[]);villageEma50.setData(villageStudies.ema50?lineFrom(rows,e50):[]);
// V10: independent, closed-candle SMC structure implementation.
// Inspired by public SMC terminology, not a port of LuxAlgo's licensed code.
// Only confirmed swing breaks and currently unmitigated three-candle FVG zones.
const n=rows.length;
const closedN=Math.max(0,n-1); // exclude potentially forming latest candle
const swingWindow=12;
const events=[];
let structureTrend=0,activeHigh=null,activeLow=null;
let usedHigh=-1,usedLow=-1;
// A swing is confirmed only after swingWindow subsequent completed candles.
for(let i=swingWindow*2;i<closedN;i++){
 const p=i-swingWindow;
 let isHigh=true,isLow=true;
 for(let j=p-swingWindow;j<=i;j++){
   if(j===p)continue;
   if(rows[j].high>=rows[p].high)isHigh=false;
   if(rows[j].low<=rows[p].low)isLow=false;
 }
 if(isHigh)activeHigh={i:p,price:rows[p].high};
 if(isLow)activeLow={i:p,price:rows[p].low};
 const r=rows[i],prev=rows[i-1];
 const breaksHigh=activeHigh&&activeHigh.i!==usedHigh&&prev.close<=activeHigh.price&&r.close>activeHigh.price;
 const breaksLow=activeLow&&activeLow.i!==usedLow&&prev.close>=activeLow.price&&r.close<activeLow.price;
 if(breaksHigh){
   events.push({kind:structureTrend===-1?'CHoCH':'BOS',price:activeHigh.price,from:activeHigh.i,to:i,bull:true});
   structureTrend=1;usedHigh=activeHigh.i;
 }
 if(breaksLow){
   events.push({kind:structureTrend===1?'CHoCH':'BOS',price:activeLow.price,from:activeLow.i,to:i,bull:false});
   structureTrend=-1;usedLow=activeLow.i;
 }
}
villageSmcHi.setData([]);villageSmcLo.setData([]);
// A bullish gap is between candle 1 high and candle 3 low; bearish is inverse.
// Keep only zones that have NOT been fully traded through by subsequent candles.
const zones=[];
const tr=rows.slice(0,closedN).map((r,i)=>i?Math.max(r.high-r.low,Math.abs(r.high-rows[i-1].close),Math.abs(r.low-rows[i-1].close)):r.high-r.low);
const atr=tr.map((_,i)=>{if(i<13)return null;let v=0;for(let k=i-13;k<=i;k++)v+=tr[k];return v/14;});
const lastClose=rows[Math.max(0,closedN-1)].close;
for(let i=Math.max(14,closedN-200);i<closedN;i++){
 const a=rows[i-2],c=rows[i];
 let z=null;
 if(c.low>a.high)z={top:c.low,bottom:a.high,bull:true,from:i};
 else if(c.high<a.low)z={top:a.low,bottom:c.high,bull:false,from:i};
 if(!z)continue;
 const gap=z.top-z.bottom,vol=atr[i];
 if(!vol||gap<vol*.12||gap>vol*1.6||gap/c.close>.018)continue;
 let top=z.top,bottom=z.bottom,filled=false;
 for(let j=i+1;j<closedN;j++){
   if(z.bull){if(rows[j].low<=bottom){filled=true;break;}top=Math.min(top,rows[j].low);}
   else{if(rows[j].high>=top){filled=true;break;}bottom=Math.max(bottom,rows[j].high);}
 }
 if(filled||top-bottom<vol*.025)continue;
 z.top=top;z.bottom=bottom;
 const distance=Math.abs((top+bottom)/2-lastClose);
 if(distance>Math.max((atr[closedN-1]||vol)*5,lastClose*.045))continue;
 z.distance=distance;zones.push(z);
}
const activeZones=[true,false].flatMap(bull=>zones.filter(z=>z.bull===bull).sort((a,b)=>a.distance-b.distance).slice(0,1));
window.villageSmcOverlayData={rows,events:events.slice(-16),zones:activeZones};
requestAnimationFrame(drawVillageSmcOverlay);
// MACD pane is created once inside ensurePriceChart; toggling affects its series visibility.
if(!villageMacdDif)return;
for(const series of [villageMacdHist,villageMacdDif,villageMacdDea])series.applyOptions({visible:!!villageStudies.macd});
const e12=ema(closes,12),e26=ema(closes,26),dif=e12.map((x,i)=>x!=null&&e26[i]!=null?x-e26[i]:null);let dea=ema(dif.filter(x=>x!=null),9);let offset=dif.findIndex(x=>x!=null);const alignedDea=dif.map((_,i)=>i-offset>=0?dea[i-offset]:null);villageMacdDif.setData(lineFrom(rows,dif));villageMacdDea.setData(lineFrom(rows,alignedDea));villageMacdHist.setData(rows.flatMap((r,i)=>Number.isFinite(dif[i])&&Number.isFinite(alignedDea[i])?[{time:r.time,value:(dif[i]-alignedDea[i])*2,color:dif[i]>=alignedDea[i]?'rgba(75,203,170,.65)':'rgba(230,113,133,.65)'}]:[]));villageMacdDataByTime=new Map(rows.map((r,i)=>[String(r.time),{dif:dif[i],dea:alignedDea[i]}]));window.villageMacdPriceByTime=new Map(rows.map(r=>[String(r.time),r]));
const crosses=[];
for(let i=1;i<rows.length-1;i++){
 if(![dif[i],alignedDea[i],dif[i-1],alignedDea[i-1]].every(Number.isFinite))continue;
 const before=dif[i-1]-alignedDea[i-1],now=dif[i]-alignedDea[i];
 if(before<=0&&now>0)crosses.push({time:rows[i].time,position:'belowBar',color:'#52d9a5',shape:'arrowUp',text:labT('金叉','Bull cross')});
 else if(before>=0&&now<0)crosses.push({time:rows[i].time,position:'aboveBar',color:'#fa8192',shape:'arrowDown',text:labT('死叉','Bear cross')});
}
// Limit visible labels to recent events; retain actual MACD crossing locations.
v18SetMarkers(villageMacdDif, villageStudies.macd?crosses.slice(-24):[]);}



function drawVillageSmcOverlay(){
 const host=document.getElementById('price-chart');if(!host||!window.priceChart&&!priceChart)return;
 let layer=document.getElementById('village-smc-overlay');if(!layer){layer=document.createElement('div');layer.id='village-smc-overlay';host.appendChild(layer)}
 if(!villageStudies?.smc||!window.villageSmcOverlayData){layer.replaceChildren();return}
 const {rows,events,zones}=window.villageSmcOverlayData;
 const w=host.clientWidth,h=host.clientHeight,ts=priceChart.timeScale();
 if(!w||!h)return;
 const x=i=>ts.timeToCoordinate(rows[i]?.time),y=p=>candleSeries.priceToCoordinate(p);
 const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 const make=(tag,attrs)=>{let el=document.createElementNS(ns,tag);for(let [k,v] of Object.entries(attrs))el.setAttribute(k,v);svg.appendChild(el);return el};
 // Draw surviving gaps only in the right-hand, not-yet-plotted region.
 const lastX=x(rows.length-1),prevX=x(rows.length-2);
 const step=(Number.isFinite(lastX)&&Number.isFinite(prevX)&&lastX>prevX)?lastX-prevX:8;
 for(let z of zones){const yt=y(z.top),yb=y(z.bottom);if([lastX,yt,yb].some(v=>v==null))continue;
 const left=Math.max(0,lastX+step*.5),right=Math.min(w,lastX+step*16);
 const top=Math.max(0,Math.min(yt,yb)),bottom=Math.min(h,Math.max(yt,yb));
 if(right-left<12||bottom-top<2)continue;
 const color=z.bull?'#3aab88':'#c16b78';
 make('rect',{x:left,y:top,width:right-left,height:bottom-top,rx:2,fill:color,'fill-opacity':'.22',stroke:color,'stroke-opacity':'.6','stroke-width':'1'});
 const t=make('text',{x:left+8,y:top+Math.min(14,Math.max(11,(bottom-top)/2+3)),fill:z.bull?'#8bd5ba':'#e6a1a9','font-size':'10','font-weight':'600'});t.textContent='FVG';
 }
 for(let e of events){const x1=x(e.from),x2=x(e.to),yy=y(e.price);if([x1,x2,yy].some(v=>v==null)||yy<0||yy>h)continue;const c=e.kind==='CHoCH'?'#b28b58':'#748ca8';
 make('line',{x1:Math.max(0,x1),y1:yy,x2:Math.min(w,x2),y2:yy,stroke:c,'stroke-width':'1.5','stroke-dasharray':e.kind==='CHoCH'?'5 3':'none'});
 const t=make('text',{x:Math.max(8,Math.min(w-54,(x1+x2)/2-17)),y:Math.max(12,yy-7),fill:c,'font-size':'11','font-weight':'700'});t.textContent=e.kind;
 }
 layer.replaceChildren(svg);
}

/* V21 fullscreen uses the existing native multipane chart instance. */
function initLabFullscreen(){
 const btn=document.getElementById('chart-fullscreen-btn');
 const host=document.getElementById('market-chart-card');
 const chartEl=document.getElementById('price-chart');
 if(!btn||!host||!chartEl)return;
 let active=false,resizeObserver=null;
 function refresh(){
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
     const chart=typeof priceChart!=='undefined'?priceChart:null;
     if(!chart)return;
     const w=Math.max(300,Math.floor(chartEl.getBoundingClientRect().width));
     const h=Math.max(240,Math.floor(chartEl.getBoundingClientRect().height));
     try{
       chart.resize(w,h);
       const panes=chart.panes();
       if(panes.length>1){
         const usable=Math.max(180,h-32);
         const macd=Math.max(105,Math.round(usable*.27));
         panes[0].setHeight(Math.max(110,usable-macd));
         panes[1].setHeight(macd);
       }
     }catch(e){console.warn('fullscreen resize',e)}
     if(typeof drawVillageSmcOverlay==='function')try{drawVillageSmcOverlay()}catch(e){}
     if(typeof renderAnnotations==='function')try{renderAnnotations()}catch(e){}
   }));
 }
 function setFullscreen(next){
   active=next;
   document.body.classList.toggle('market-fullscreen',active);
   btn.setAttribute('aria-pressed',String(active));
   btn.innerHTML=active?'⤢ <span>'+labT('退出全屏','Exit full screen')+'</span>':'⛶ <span>'+labT('全屏图表','Full screen')+'</span>';
   btn.title=active?labT('退出全屏 (Esc)','Exit full screen (Esc)'):labT('全屏查看图表','View the chart full screen');
   refresh();
   setTimeout(refresh,120);
 }
 labListen(btn,'click',()=>setFullscreen(!active));
 labListen(document,'keydown',e=>{if(e.key==='Escape'&&active)setFullscreen(false)});
 labListen(window,'resize',refresh);
 if(typeof ResizeObserver!=='undefined'){
   resizeObserver=new ResizeObserver(()=>{if(active)refresh()});
   resizeObserver.observe(chartEl);
 }
}

  window.Lab = {
    mounted: false,
    mount: function (root, opts) {
      labLangCode = opts && opts.lang === 'en' ? 'en' : 'zh';
      if (this.mounted) this.unmount();
      labAlive = true;
      this.mounted = true;
      root.innerHTML = '<div class="lab-root" id="lab-root">' + LAB_HTML + '</div>';
      applyLabI18n(document.getElementById('lab-root'));
      ensureLabFonts();
      ensureChartsLib().then(function () {
        if (!labAlive) return;
        boot();
      }).catch(function () {
        if (!labAlive) return;
        const n = document.getElementById('v6-data-notice');
        if (n) {
          const s = n.querySelector('[data-lab-i18n]');
          if (s) s.textContent = labT('图表组件没有加载成功。当前不是实时行情。', 'The chart library did not load. This is not live data.');
          n.style.display = 'block';
        }
        const el = document.getElementById('live-status');
        if (el) { el.className = 'live off'; el.textContent = labT('离线 · 非实时', 'Offline · not live'); }
      });
    },
    unmount: function () {
      labAlive = false;
      this.mounted = false;
      try { loadSeq += 1; } catch (e) {}
      try { clearDataTimers(); } catch (e) {}
      if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
      labClearListen();
      var bar = document.querySelector('header.topbar');
      if (bar) { bar.classList.remove('lab-nav-hidden'); delete bar.dataset.labHide; }
      var edge = document.getElementById('lab-nav-edge');
      if (edge) edge.remove();
      document.body.classList.remove('market-fullscreen');
      try { destroyLabCharts(); } catch (e) {}
    }
  };
})();
