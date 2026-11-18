/* Illustrated teaching: outer starfield, quiz gate, checklist.
   Progress is per chapter and lesson. It does not unlock other chapters. */
(function (global) {
  var KEY = 'web3-teach-progress';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  function passedList(chapterId) {
    var row = load()[chapterId];
    if (!row || !Array.isArray(row.passed)) return [];
    return row.passed.filter(function (n) { return typeof n === 'number' && n >= 0; });
  }
  function isPassed(chapterId, index) {
    return passedList(chapterId).indexOf(index) >= 0;
  }
  function markPassed(chapterId, index) {
    if (isPassed(chapterId, index)) return;
    var data = load();
    var row = data[chapterId] && Array.isArray(data[chapterId].passed) ? data[chapterId].passed.slice() : [];
    row.push(index);
    data[chapterId] = { passed: row };
    save(data);
  }

  function syncStarfield(on) {
    var sky = document.getElementById('outer-starfield');
    if (!on) {
      if (sky) sky.remove();
      return;
    }
    if (sky) return;
    sky = document.createElement('div');
    sky.id = 'outer-starfield';
    sky.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 58; i++) {
      var star = document.createElement('span');
      star.className = 'falling-star' + (i % 8 === 0 ? ' streak' : '');
      var x = (i * 67.17 + 11) % 100;
      var size = i % 9 === 0 ? 2.7 : i % 3 === 0 ? 1.8 : 1.1;
      var props = {
        '--x': x + '%',
        '--sz': size + 'px',
        '--dur': (14 + (i * 7) % 21) + 's',
        '--delay': (-((i * 13) % 33)) + 's',
        '--shift': ((i % 7) - 3) * 18 + 'px',
        '--opacity': i % 5 === 0 ? 0.82 : 0.46,
        '--tint': ['#fff4db', '#a7d8ff', '#d5baff', '#ffffff'][i % 4],
        '--tail': (11 + (i % 4) * 8) + 'px',
        '--still-top': ((i * 31) % 100) + '%'
      };
      Object.keys(props).forEach(function (k) { star.style.setProperty(k, props[k]); });
      sky.appendChild(star);
    }
    document.body.insertBefore(sky, document.body.firstChild);
  }

  function checksDone(root) {
    var inputs = root.querySelectorAll('.checklist input');
    if (!inputs.length) return true;
    for (var i = 0; i < inputs.length; i++) if (!inputs[i].checked) return false;
    return true;
  }
  function quizDone(root) {
    var quiz = root.querySelector('.quiz');
    return !!(quiz && quiz.getAttribute('data-verified') === 'true');
  }
  function requirementsMet(root) {
    return checksDone(root) && quizDone(root);
  }
  function paintStatus(root) {
    var status = root.querySelector('.teach-status');
    if (!status) return;
    var inputs = root.querySelectorAll('.checklist input');
    var n = 0;
    for (var i = 0; i < inputs.length; i++) if (inputs[i].checked) n++;
    var tpl = status.getAttribute('data-tpl') || '';
    var quiz = root.querySelector('.quiz');
    var quizWord = quiz && quiz.getAttribute('data-verified') === 'true' ? (status.getAttribute('data-yes') || '') : (status.getAttribute('data-no') || '');
    status.textContent = tpl.replace('{n}', n).replace('{m}', inputs.length).replace('{quiz}', quizWord);
  }

  function mount(root, chapterId, index, onPass) {
    if (!root) return;
    paintStatus(root);
    root.querySelectorAll('.checklist input').forEach(function (input) {
      input.addEventListener('change', function () {
        paintStatus(root);
        if (requirementsMet(root)) {
          markPassed(chapterId, index);
          if (onPass) onPass();
        }
      });
    });
    root.querySelectorAll('.quiz').forEach(function (quiz) {
      quiz.querySelectorAll('.option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          quiz.querySelectorAll('.option').forEach(function (b) { b.classList.toggle('selected', b === btn); });
          var good = btn.getAttribute('data-answer') === quiz.getAttribute('data-correct');
          quiz.setAttribute('data-verified', good ? 'true' : 'false');
          var feedback = quiz.querySelector('.feedback');
          if (feedback) {
            feedback.style.display = 'block';
            feedback.classList.toggle('wrong', !good);
            feedback.textContent = good ? (quiz.getAttribute('data-ok') || '') : (btn.getAttribute('data-note') || quiz.getAttribute('data-bad') || '');
          }
          paintStatus(root);
          if (good && requirementsMet(root)) {
            markPassed(chapterId, index);
            if (onPass) onPass();
          }
        });
      });
    });
    if (isPassed(chapterId, index) && onPass) onPass();
  }

  global.TEACH = {
    syncStarfield: syncStarfield,
    isPassed: isPassed,
    markPassed: markPassed,
    mount: mount
  };
})(window);
