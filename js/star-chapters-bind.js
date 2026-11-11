/* Attach chapters 2–8 without rewriting chapter 1. */
(function () {
  var star = window.ADVANCED_STAR;
  var pack = window.STAR_PACK && window.STAR_PACK.chapters;
  if (!star || !pack) return;
  Object.keys(pack).forEach(function (id) {
    star.chapters[id] = pack[id];
    (star.modules || []).forEach(function (mod) {
      if (mod.id !== id) return;
      mod.status = 'open';
      var n = pack[id].lessons.length;
      mod.liveNote = { zh: n + ' 节', en: n + ' lessons' };
    });
  });
})();
