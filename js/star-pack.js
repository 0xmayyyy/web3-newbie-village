/* Helpers for chapters 2–8. Chapter 1 data is not touched. */
(function (global) {
  function bi(zh, en) { return { zh: zh, en: en }; }
  function opt(id, zh, en) { return { id: id, zh: zh, en: en }; }
  function quiz(qzh, qen, options, answer, whys) {
    var whyFor = {};
    Object.keys(whys).forEach(function (key) { whyFor[key] = bi(whys[key][0], whys[key][1]); });
    return {
      q: bi(qzh, qen),
      options: options,
      answer: answer,
      why: whyFor[answer],
      whyFor: whyFor
    };
  }
  function lesson(partial) {
    partial.status = 'live';
    partial.chart = 'study';
    partial.lab = partial.lab || { symbol: 'BTCUSDT', interval: '4h', studies: 'none' };
    return partial;
  }
  global.STAR_PACK = { bi: bi, opt: opt, quiz: quiz, lesson: lesson, chapters: {} };
})(window);
