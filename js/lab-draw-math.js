/* Pure helpers for the lab drawing overlay. No chart, network, or storage. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LabDrawMath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];

  function fibPrice(priceA, priceB, level) {
    return Number(priceA) + (Number(priceB) - Number(priceA)) * Number(level);
  }

  function storageKey(symbol, tf) {
    return String(symbol || '') + '|' + String(tf || '');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createBook() {
    var undo = [];
    var redo = [];
    var items = [];
    return {
      items: function () { return items; },
      load: function (next) {
        items = clone(next || []);
        undo = [];
        redo = [];
      },
      commit: function (next) {
        undo.push(JSON.stringify(items));
        if (undo.length > 80) undo.shift();
        redo = [];
        items = clone(next);
      },
      canUndo: function () { return undo.length > 0; },
      canRedo: function () { return redo.length > 0; },
      undo: function () {
        if (!undo.length) return false;
        redo.push(JSON.stringify(items));
        items = JSON.parse(undo.pop());
        return true;
      },
      redo: function () {
        if (!redo.length) return false;
        undo.push(JSON.stringify(items));
        items = JSON.parse(redo.pop());
        return true;
      }
    };
  }

  function distToSeg(px, py, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var len = dx * dx + dy * dy;
    if (len <= 0) return Math.hypot(px - x1, py - y1);
    var t = ((px - x1) * dx + (py - y1) * dy) / len;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
  }

  function finitePoint(point) {
    return point && typeof point.time === 'number' && isFinite(point.time) && typeof point.price === 'number' && isFinite(point.price);
  }

  function sanitize(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(function (item) {
      if (!item || typeof item.id !== 'string') return false;
      if (item.type === 'hline') return typeof item.price === 'number' && isFinite(item.price);
      if (item.type === 'trend' || item.type === 'box' || item.type === 'fib') return finitePoint(item.a) && finitePoint(item.b);
      return false;
    });
  }

  return {
    LEVELS: LEVELS,
    fibPrice: fibPrice,
    storageKey: storageKey,
    createBook: createBook,
    distToSeg: distToSeg,
    sanitize: sanitize
  };
});
