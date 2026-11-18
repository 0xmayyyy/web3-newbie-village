/* Single-screen teaching simulations for the world and chance lessons.
   No wallet connection, no live prices, no orders. */
(function (global) {
  function num(el) {
    var n = parseFloat(el && el.value);
    return n === n ? n : 0;
  }
  function money(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }
  function say(box, text, tone) {
    var out = box.querySelector('[data-out]');
    if (!out) return;
    out.textContent = text;
    out.classList.remove('is-right', 'is-bad');
    if (tone) out.classList.add(tone);
  }
  function bind(box, sel, fn) {
    box.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('click', function () { fn(el); });
    });
  }

  var labs = {
    wallet: function (box) {
      var cards = {
        connect: '教学模拟。连接：只请求读取公开地址。这一步通常不转走资产，但仍可能暴露地址。',
        sign: '教学模拟。签名登录：用来证明你控制这个地址。它不默认扣币，但看不懂的签名仍可能被拿去授权，先取消再核对。',
        approve: '教学模拟。授权代币：允许合约在额度内花费代币，例如最多 100 USDT。这会动用你的代币权限。',
        send: '教学模拟。转账：发送 20 USDT，网络费 0.3 TRX。数字是虚构的。确认后通常不能撤销。'
      };
      bind(box, '[data-k]', function (el) {
        say(box, cards[el.getAttribute('data-k')], el.getAttribute('data-k') === 'connect' || el.getAttribute('data-k') === 'sign' ? '' : 'is-bad');
      });
    },
    defi: function (box) {
      var steps = ['连接钱包，先核对官网、链和资产。', '看报价：预计到账、价格影响和最低可收数量。', '授权不是兑换本身。授权成功不等于已经换成币。', '再签交换。确认后通常不能找客服撤销。', '链上确认后，余额才按结果变化。以上都是模拟。'];
      var branches = {
        low: '教学模拟。余额不足：资产数量不够，这笔交换不会完成。',
        gas: '教学模拟。没有网络费代币：需要网络费的交易可能提交不了。',
        min: '教学模拟。最低可收数量不满足：交易可能失败，仍可能产生部分网络成本。'
      };
      bind(box, '[data-step]', function (el) {
        say(box, '教学模拟。第 ' + el.getAttribute('data-step') + ' 步：' + steps[+el.getAttribute('data-step') - 1], '');
      });
      bind(box, '[data-branch]', function (el) { say(box, branches[el.getAttribute('data-branch')], 'is-bad'); });
    },
    lend: function (box) {
      var added = false;
      function draw() {
        var drop = num(box.querySelector('[data-drop]'));
        var collateral = 1000 * (1 - drop / 100) + (added ? 200 : 0);
        var ratio = 400 / collateral * 100;
        var line = '教学模拟。抵押品价值 ' + money(collateral) + '。债务/抵押品价值比 ' + money(ratio) + '%。';
        if (ratio >= 80) line += ' 在本虚构规则下达到 80% 清算阈值。这不是真实协议的保证价格。';
        else line += ' 距本虚构阈值 80% 还有 ' + money(80 - ratio) + ' 个百分点。绿色不代表绝对安全。';
        say(box, line, ratio >= 80 ? 'is-bad' : '');
      }
      box.querySelector('[data-drop]').addEventListener('input', draw);
      box.querySelector('[data-add]').addEventListener('click', function () { added = true; draw(); });
      box.querySelector('[data-reset]').addEventListener('click', function () {
        added = false;
        box.querySelector('[data-drop]').value = '0';
        draw();
      });
      draw();
    },
    lp: function (box) {
      function draw() {
        var p = num(box.querySelector('[data-p]'));
        var fee = num(box.querySelector('[data-fee]'));
        var hold = p + 100;
        var lp = 200 * Math.sqrt(p / 100);
        var gap = lp - hold;
        var net = lp + fee;
        say(box, '教学模拟。ETH 价格 ' + money(p) + '。直接持有 ' + money(hold) + '。不计费的 LP ' + money(lp) + '。相对差额 ' + money(gap) + '。加上虚构手续费后 LP 净值 ' + money(net) + '。手续费不代表未来收益。', '');
      }
      box.querySelector('[data-p]').addEventListener('input', draw);
      box.querySelector('[data-fee]').addEventListener('input', draw);
      draw();
    },
    stake: function (box) {
      var mode = 'apr';
      function draw() {
        var interest = mode === 'apr' ? 120 : 1000 * (Math.pow(1 + 0.12 / 12, 12) - 1);
        say(box, '教学模拟。本金 1000。' + (mode === 'apr' ? '简单利息 APR 12%，一年利息约 120。' : '名义 12% 按月复利，理论利息约 ' + money(interest) + '。') + ' 这不含币价、费用和违约。收益率不是承诺。', '');
      }
      bind(box, '[data-mode]', function (el) { mode = el.getAttribute('data-mode'); draw(); });
      bind(box, '[data-src]', function (el) {
        var map = {
          pos: '教学模拟。PoS 质押：收益来自网络验证奖励。要看罚没、解绑等待和验证者。',
          lend: '教学模拟。借贷收益：利息来自借款人。要看清算、坏账和能不能提款。',
          strat: '教学模拟。策略或平台产品：要看谁托管、钱拿去做什么、多久能赎回。'
        };
        say(box, map[el.getAttribute('data-src')], '');
      });
      draw();
    },
    nft: function (box) {
      var scenes = {
        avatar: '教学模拟。按本题虚构条款，个人展示可以。真实项目要再看许可。',
        shirt: '教学模拟。条款写明未经许可不得商业印刷。印 T 恤出售需要进一步授权，而且要核实发行方有没有这个权利。',
        send: '教学模拟。把 NFT 转给朋友，是代币转移，不是自动送出版权。'
      };
      bind(box, '[data-layer]', function (el) {
        var map = {
          token: '教学模拟。代币层：链上地址是否持有这枚虚构 NFT #1024。',
          file: '教学模拟。文件层：图片可能在链下。NFT 本身不等于图片文件。',
          license: '教学模拟。虚构条款：允许个人展示；未经许可不得商业印刷。',
          market: '教学模拟。市场层：标价不等于一定卖得出去。'
        };
        say(box, map[el.getAttribute('data-layer')], '');
      });
      bind(box, '[data-scene]', function (el) {
        say(box, scenes[el.getAttribute('data-scene')], el.getAttribute('data-scene') === 'shirt' ? 'is-bad' : '');
      });
    },
    dao: function (box) {
      bind(box, '[data-rule]', function (el) {
        var rule = el.getAttribute('data-rule');
        if (rule === 'half') say(box, '教学模拟。甲 35 票、乙 25 票赞成，其余 98 人共 40 票反对。简单多数：赞成 60%，提案通过。人数多不等于票多。', 'is-bad');
        else say(box, '教学模拟。同一票数，如果需要至少三分之二赞成，60% 不够，提案不通过。这不是所有 DAO 的规则。', '');
      });
    },
    pitch: function (box) {
      bind(box, '[data-k]', function (el) {
        var k = el.getAttribute('data-k');
        if (k === 'b') say(box, '教学模拟。这张说出了谁在用、用来做什么。还要再问有没有真实用户，以及收款是否合规。这不是投资评分。', 'is-right');
        else say(box, '教学模拟。这句话没有说出目标用户和使用场景。不能据此判断项目值不值得买。', 'is-bad');
      });
    },
    capture: function (box) {
      bind(box, '[data-k]', function (el) {
        var map = {
          none: '教学模拟。用户付的 100 USDT 和代币没有写明的连接。不能推出代币必涨。',
          buy: '教学模拟。按虚构规则用部分费用回购。仍要核对有没有执行、钱从哪来。不能计算上涨幅度。',
          pay: '教学模拟。代币被用来付服务费，可能存在需求。需求也不保证币价上涨。'
        };
        say(box, map[el.getAttribute('data-k')], '');
      });
    },
    unlock: function (box) {
      bind(box, '[data-when]', function (el) {
        var map = {
          now: '教学模拟。今天流通 2000 万。总发行 1 亿。解锁不等于已经卖出。',
          next: '教学模拟。下月若团队 1000 万都计入流通，流通变为 3000 万，比最初多 50%。这不预测价格。',
          later: '教学模拟。再下月若再计入投资人 500 万，流通变为 3500 万，比最初多 75%。地址标签未知时，不要直接叫它大户。'
        };
        say(box, map[el.getAttribute('data-when')], '');
      });
    },
    listing: function (box) {
      bind(box, '[data-k]', function (el) {
        var k = el.getAttribute('data-k');
        if (k === 'cex') say(box, '教学模拟。只有和主体、资产、交易对、时间一致的官方现货公告，才算本模拟里的现货上架已证实。海报和钱包搜索都不够。', 'is-right');
        else say(box, '教学模拟。这则材料还不能证明 CEX 现货已上架。钱包能换，不等于交易所现货上市。', 'is-bad');
      });
    },
    logo: function (box) {
      bind(box, '[data-k]', function (el) {
        var k = el.getAttribute('data-k');
        if (k === 'note') say(box, '教学模拟。机构自己的融资公告，才能支持「参投某轮」。还要看时间、金额，以及是股权还是代币。', 'is-right');
        else say(box, '教学模拟。官网 Logo、黑客松名单或项目方推文，都不足以证明已经投资。证据不足就要写未知。', 'is-bad');
      });
    },
    data: function (box) {
      function draw() {
        var px = num(box.querySelector('[data-px]'));
        var tvl = 1000 * px;
        say(box, '教学模拟。1000 ETH 数量不变。按 ' + money(px) + ' 美元计价，TVL 约 ' + money(tvl) + ' 美元。价格上涨不等于新存入了同样多的钱。100 个地址也不能当成 100 个人。', '');
      }
      box.querySelector('[data-px]').addEventListener('input', draw);
      draw();
    },
    exit: function (box) {
      bind(box, '[data-k]', function (el) {
        var map = {
          a: '教学模拟。现在能买卖，但池子很浅。大额卖出可能价格很差。不能保证退出安全。',
          b: '教学模拟。允许买入、限制部分地址卖出。买得进不等于卖得出。',
          c: '教学模拟。现在能卖，但管理员能改卖出税。以后的规则可能变。'
        };
        say(box, map[el.getAttribute('data-k')], 'is-bad');
      });
    },
    audit: function (box) {
      bind(box, '[data-k]', function (el) {
        if (el.getAttribute('data-k') === 'same') say(box, '教学模拟。版本一致、严重问题已处理、覆盖当前合约，才谈得上这份报告对得上。审计仍不是永久保证。', 'is-right');
        else say(box, '教学模拟。旧报告不能直接覆盖后来升级的新合约。版本不一致，就不能沿用旧的安全结论。', 'is-bad');
      });
    },
    source: function (box) {
      bind(box, '[data-k]', function (el) {
        var map = {
          official: '教学模拟。官方公告是原始材料。仍可能选择性披露，而且上所也不等于买入会赚钱。',
          kol: '教学模拟。付费合作帖是推广内容。披露了利益关系，还是要独立核对事实。',
          chain: '教学模拟。链上记录可以独立核对。它说明发生过一笔记录，不说明项目好坏。',
          chat: '教学模拟。匿名群聊截图是待核实线索。不能写成已经证实的事实。',
          road: '教学模拟。路线图是官方计划，不是已经实现的成果。'
        };
        say(box, map[el.getAttribute('data-k')], '');
      });
    },
    card: function (box) {
      bind(box, '[data-k]', function (el) {
        if (el.getAttribute('data-k') === 'unknown') say(box, '教学模拟。写上「待核实」是合格的。研究卡不怕不知道，怕把猜测写成事实。', 'is-right');
        else say(box, '教学模拟。没有公告和版本，就不能补成「机构已投资」或「当前合约已审计」。', 'is-bad');
      });
    },
    airdrop: function (box) {
      function draw() {
        var times = num(box.querySelector('[data-times]'));
        var fee = num(box.querySelector('[data-fee]'));
        var bridge = num(box.querySelector('[data-bridge]'));
        var cost = times * fee + bridge;
        var line = '教学模拟。已知直接成本 ' + money(cost) + '。默认 20 次乘 0.5 等于 10。';
        if (cost > 30) line += ' 已超过自己设定的 30 预算。这里不建议加钱。';
        line += ' 未发币、未达资格、奖励价值未知，这三种结局都不分配概率。';
        say(box, line, cost > 30 ? 'is-bad' : '');
      }
      box.querySelectorAll('input').forEach(function (el) { el.addEventListener('input', draw); });
      draw();
    },
    meme: function (box) {
      bind(box, '[data-k]', function (el) {
        var k = el.getAttribute('data-k');
        if (k === 'all') say(box, '教学模拟。100 万枚按三档卖出：10 万乘 0.010，加 20 万乘 0.008，加 70 万乘 0.005，共 6100。不是账面 10000。未计费用。', 'is-bad');
        else if (k === 'part') say(box, '教学模拟。只卖最上面 10 万枚，按 0.010 收到 1000。这是虚构订单簿，不是真实 AMM。', '');
        else say(box, '教学模拟。如果合约限制卖出，交易会失败。页面上的估值不是可提现现金。', 'is-bad');
      });
    },
    predict: function (box) {
      function draw() {
        var px = num(box.querySelector('[data-px]'));
        var win = box.querySelector('[data-win]').getAttribute('aria-pressed') === 'true';
        if (win) {
          var profit = 1 - px;
          var rate = px ? profit / px * 100 : 0;
          say(box, '教学模拟。买价 ' + money(px) + '，判定正确后结算 1.00。每份盈利 ' + money(profit) + '，约 ' + money(rate) + '%。价格不是客观概率。忽略费用。', '');
        } else {
          say(box, '教学模拟。判定错误则结算 0。这一份亏损买价 ' + money(px) + '。', 'is-bad');
        }
      }
      box.querySelector('[data-px]').addEventListener('input', draw);
      box.querySelector('[data-win]').addEventListener('click', function (ev) {
        var btn = ev.currentTarget;
        var on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.textContent = on ? '结果：判定正确' : '结果：判定错误';
        draw();
      });
      draw();
    },
    rwa: function (box) {
      box.querySelector('[data-show]').addEventListener('click', function () {
        say(box, '教学模拟。虚构条款：没有直接股东登记；只有按规则的现金结算请求权；没有投票权；分红和赎回按合同，不按「价格很像」来推断。真实产品各不相同。', '');
      });
    },
    agent: function (box) {
      var stopped = false;
      function limit() { return box.querySelector('[data-cap]').getAttribute('aria-pressed') === 'true'; }
      bind(box, '[data-act]', function (el) {
        var act = el.getAttribute('data-act');
        if (act === 'stop') { stopped = true; say(box, '教学模拟。紧急停止已打开。后面的模拟执行都不再继续，直到重置。没有连接真实钱包。', 'is-bad'); return; }
        if (act === 'reset') { stopped = false; say(box, '教学模拟。已重置。默认只有只读。', ''); return; }
        if (stopped) { say(box, '教学模拟。紧急停止仍然有效，这项不会执行。', 'is-bad'); return; }
        if (act === 'read') say(box, '教学模拟。查询公开余额：只读，不签名。', 'is-right');
        else if (act === 'hint') say(box, '教学模拟。只生成交换建议，不签名。APY 高不代表可以执行。', '');
        else if (act === 'trade') {
          if (!limit()) say(box, '教学模拟。还没有打开单笔上限。先设置限额，再谈执行。', 'is-bad');
          else say(box, '教学模拟。想执行 30，但单笔上限是 20，所以拒绝。白名单外的合约也不执行。', 'is-bad');
        }
      });
      box.querySelector('[data-cap]').addEventListener('click', function (ev) {
        var on = ev.currentTarget.getAttribute('aria-pressed') !== 'true';
        ev.currentTarget.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
  };

  function mount(root) {
    if (!root) return;
    root.querySelectorAll('[data-planet-lab]').forEach(function (box) {
      var fn = labs[box.getAttribute('data-planet-lab')];
      if (fn) fn(box);
    });
  }
  global.PLANET_LABS = { mount: mount };
})(window);
