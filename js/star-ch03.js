(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['03'] = {
    title: bi('交易系统与风险管理', 'Trading systems and risk'),
    lessons: [
      lesson({
        id: '01',
        title: bi('交易计划：先写好认错条件', 'A trading plan: write the invalidation first'),
        scene: bi('价格还没触发你的条件，现在要不要追？', 'Price has not triggered your condition. Do you chase now?'),
        one: bi('计划先写下进场、止损和目标。条件没出现就等待，止损在进场前就写好。', 'Write the entry, stop, and target first. If the condition has not appeared, wait. The stop is written before entry.'),
        explain: bi('一笔计划至少要有进场条件、认错价和目标价。\n条件没用收盘价满足之前，选择是等待，不是临时追。\n止损写在事前，用来定义这笔愿意亏的距离。\n盈亏比比较的是计划中的收益距离和风险距离，不含手续费时只是计划比值。', 'A plan needs an entry condition, an invalidation price, and a target.\nUntil the close satisfies the condition, the choice is to wait, not to chase.\nThe stop is written beforehand. It defines the distance you are willing to lose on this trade.\nReward-to-risk compares the planned reward distance with the risk distance. Without fees, it is only the planned ratio.'),
        example: bi('进场 106，止损 102，目标 114。\n每单位风险=106−102=4。\n每单位计划收益=114−106=8。\n盈亏比=8/4=2:1。\n这表示计划收益是风险的两倍，不是胜率。', 'Entry 106, stop 102, target 114.\nRisk per unit=106−102=4.\nPlanned reward per unit=114−106=8.\nReward-to-risk=8/4=2:1.\nThat means the planned reward is twice the risk. It is not a win rate.'),
        pitfalls: [
          bi('条件没出现仍改口追价', 'Chasing after the condition failed to appear'),
          bi('把 2:1 理解成胜率是 2 倍', 'Reading 2:1 as a win rate of 2')
        ],
        practice: bi('在图上指出 106、102、114 三条线，并说出风险距离是 4。', 'On the chart, point to the lines at 106, 102, and 114, and say the risk distance is 4.'),
        check: {
          ask: bi('突破条件还没被收盘确认时，计划允许什么？', 'The break condition is not confirmed by the close. What does the plan allow?'),
          options: [opt('A', '先追一半', 'Chase half now'), opt('B', '等待', 'Wait'), opt('C', '取消止损', 'Remove the stop')],
          answer: 'B',
          miss: bi('没触发就等待。止损不能为了追价临时拿掉。', 'If it has not triggered, wait. The stop is not removed so you can chase.')
        },
        quizzes: [
          quiz('条件没有触发时应该？', 'What should you do when the condition has not triggered?', [opt('A', '按感觉追', 'Chase by feel'), opt('B', '等待', 'Wait'), opt('C', '把目标改到更近', 'Move the target closer')], 'B', {
            A: ['追价等于放弃事先写好的进场条件。', 'Chasing abandons the entry condition you wrote in advance.'],
            B: ['条件没用收盘满足，计划的动作就是等待。', 'Until the close satisfies the condition, the plan’s action is to wait.'],
            C: ['改目标不代替进场条件。', 'Changing the target does not replace the entry condition.']
          }),
          quiz('止损应该什么时候写？', 'When should the stop be written?', [opt('A', '进场之前', 'Before entry'), opt('B', '亏损之后再补', 'After the loss, as a patch'), opt('C', '盈利了再写', 'After it is in profit')], 'A', {
            A: ['事前写下认错价，风险距离才是已知的。', 'Write the invalidation beforehand so the risk distance is known.'],
            B: ['亏了再补，距离已经不是原来的计划。', 'Adding it after a loss means the distance is no longer the original plan.'],
            C: ['盈利后再写，进场时并没有认错条件。', 'Writing it after a profit means there was no invalidation at entry.']
          }),
          quiz('2:1 表示什么？', 'What does 2:1 mean?', [opt('A', '胜率是两倍', 'The win rate is doubled'), opt('B', '计划收益是风险的两倍', 'Planned reward is twice the risk'), opt('C', '可以不加止损', 'You can skip the stop')], 'B', {
            A: ['2:1 是距离比，不是赢的次数。', '2:1 is a ratio of distances, not a count of wins.'],
            B: ['8 的计划收益对照 4 的风险，正好两倍。', 'A planned reward of 8 against a risk of 4 is exactly twice.'],
            C: ['没有止损就没有这个风险距离，比值也无从谈起。', 'Without a stop there is no risk distance, so the ratio cannot be stated.']
          })
        ],
        study: {
          kind: 'levels',
          closes: [100, 101, 103, 104, 103, 105, 104, 106, 108],
          levels: [
            { price: 106, label: '106' },
            { price: 102, label: '102' },
            { price: 114, label: '114' }
          ],
          caption: bi('106 进场，102 止损，114 目标。风险 4，计划收益 8。', 'Entry 106, stop 102, target 114. Risk 4, planned reward 8.'),
          start: 6
        }
      }),
      lesson({
        id: '02',
        title: bi('仓位：先算最多能亏多少', 'Position size: first calculate how much you can lose'),
        scene: bi('账户 1000，只愿意亏 1%，止损距离是 5，能买几枚？', 'The account is 1000, you will risk 1%, and the stop is 5 away. How many coins can you buy?'),
        one: bi('数量=愿意亏的金额÷每枚的止损距离。止损越远，同样的风险金额对应的数量越少。', 'Quantity=cash you are willing to lose÷stop distance per coin. A wider stop means fewer coins for the same risk cash.'),
        explain: bi('先定这笔最多亏多少钱，而不是先定想买多少。\n风险金额=权益×风险比例。\n数量=风险金额÷|进场−止损|。\n名义金额=数量×进场价。\n止损价不是成交保证。滑点会让实际亏损大于计划。', 'First decide the most money this trade may lose, not how many coins you want.\nRisk cash=equity×risk percent.\nQuantity=risk cash÷|entry−stop|.\nNotional=quantity×entry.\nA stop price is not a guaranteed fill. Slippage can make the loss larger than planned.'),
        example: bi('权益 1000，风险 1%，风险金额=10。\n进场 100，止损 95，每枚风险=5。\n数量=10/5=2 枚。\n名义金额=200。\n若实际成交在 94，2 枚亏损=12，已经超过 10。', 'Equity 1000, risk 1%, risk cash=10.\nEntry 100, stop 95, risk per coin=5.\nQuantity=10/5=2 coins.\nNotional=200.\nIf the fill is 94, the loss on 2 coins is 12, already more than 10.'),
        pitfalls: [
          bi('先拍脑袋定数量，再反推止损', 'Picking a quantity first and inventing the stop afterward'),
          bi('以为触发价一定等于成交价', 'Assuming the trigger price equals the fill')
        ],
        practice: bi('用 1000、1%、进场 100、止损 95 算出 2 枚。', 'Use 1000, 1%, entry 100, and stop 95 to get 2 coins.'),
        check: {
          ask: bi('上面的例子应该买多少？', 'How many should the example buy?'),
          options: [opt('A', '2 枚', '2 coins'), opt('B', '10 枚', '10 coins'), opt('C', '100 枚', '100 coins')],
          answer: 'A',
          miss: bi('10 是风险金额，不是数量。数量=10/5=2。', '10 is the risk cash, not the quantity. Quantity=10/5=2.')
        },
        quizzes: [
          quiz('权益 1000、风险 1%、每枚风险 5，数量是？', 'Equity 1000, risk 1%, risk per coin 5. What is the quantity?', [opt('A', '2 枚', '2 coins'), opt('B', '5 枚', '5 coins'), opt('C', '10 枚', '10 coins')], 'A', {
            A: ['风险金额 10，10÷5=2 枚。', 'Risk cash is 10, and 10÷5=2 coins.'],
            B: ['5 是每枚的止损距离，不是数量。', '5 is the stop distance per coin, not the quantity.'],
            C: ['10 是允许亏损的金额。若买 10 枚，价格跌 5 就亏 50。', '10 is the cash you allow yourself to lose. Ten coins would lose 50 if price falls 5.']
          }),
          quiz('风险金额不变，止损放得更远，数量应该？', 'If the risk cash stays the same and the stop is wider, quantity should?', [opt('A', '减少', 'Decrease'), opt('B', '增加', 'Increase'), opt('C', '不变', 'Stay the same')], 'A', {
            A: ['数量=风险金额÷距离。距离变大，数量变小。', 'Quantity=risk cash÷distance. A larger distance means a smaller quantity.'],
            B: ['更远的止损如果还加数量，亏损会超过事先定的金额。', 'Adding quantity on a wider stop makes the loss exceed the cash you set.'],
            C: ['距离变了，除数就变了，数量不会保持原样。', 'When the distance changes, the divisor changes, so the quantity does not stay the same.']
          }),
          quiz('止损价能保证按那个价成交吗？', 'Does the stop price guarantee a fill at that price?', [opt('A', '保证', 'Yes'), opt('B', '否', 'No'), opt('C', '只在整点保证', 'Only at round numbers')], 'B', {
            A: ['触发之后还要看当时的对手盘，价格可以滑过止损。', 'After the trigger, the other side of the book still matters. Price can slip through the stop.'],
            B: ['例子里止损 95，成交可以在 94，2 枚就亏 12。', 'In the example the stop is 95 and the fill can be 94, so 2 coins lose 12.'],
            C: ['整数价同样不是成交保证。', 'A round price is not a guaranteed fill either.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('权益 1000 × 1% = 风险金额 10。', 'Equity 1000 × 1% = risk cash 10.'),
          bi('进场 100，止损 95，每枚距离 5。', 'Entry 100, stop 95, distance per coin 5.'),
          bi('数量 = 10 / 5 = 2 枚，名义金额 200。', 'Quantity = 10 / 5 = 2 coins, notional 200.'),
          bi('若滑点到 94，2 枚实际亏损 12。', 'If slippage reaches 94, 2 coins actually lose 12.')
        ] }
      }),
      lesson({
        id: '03',
        title: bi('期望值：高胜率也能亏', 'Expectancy: a high win rate can still lose'),
        scene: bi('80% 的胜率，为什么仍可能是亏钱的策略？', 'Why can a strategy with an 80% win rate still lose money?'),
        one: bi('期望=胜率×平均盈利−(1−胜率)×平均亏损−费用。胜率高，亏的时候太大，期望仍可以是负的。', 'Expectancy=win rate×average win−(1−win rate)×average loss−fees. A high win rate can still have negative expectancy if the losses are large.'),
        explain: bi('单笔期望看的是很多次交易的平均结果，不是下一笔的承诺。\n费用会从期望里再扣掉。\n一小段样本可以偏离这个平均值。\n所以高胜率本身不是赚钱证明。', 'Expectancy is the average result over many trades, not a promise for the next one.\nFees are subtracted again from expectancy.\nA short sample can deviate from that average.\nSo a high win rate by itself is not proof of making money.'),
        example: bi('策略 A：胜率 0.4，赢 200，亏 100。\nE=0.4×200−0.6×100=20。\n策略 B：胜率 0.8，赢 20，亏 100。\nE=0.8×20−0.2×100=−4。\n都还没扣费用。费用会让净期望更低。', 'Strategy A: win rate 0.4, win 200, loss 100.\nE=0.4×200−0.6×100=20.\nStrategy B: win rate 0.8, win 20, loss 100.\nE=0.8×20−0.2×100=−4.\nFees are not included yet. Fees make net expectancy lower.'),
        pitfalls: [
          bi('只比胜率，不比亏的大小', 'Comparing win rates without comparing the size of losses'),
          bi('把一小段样本当成期望已经实现', 'Treating a short sample as if expectancy had already been realized')
        ],
        practice: bi('手算 B 的期望，确认是 −4 而不是正数。', 'Calculate B’s expectancy by hand and confirm it is −4, not positive.'),
        check: {
          ask: bi('策略 A 扣费前的期望是多少？', 'What is strategy A’s expectancy before fees?'),
          options: [opt('A', '+20', '+20'), opt('B', '−4', '−4'), opt('C', '+80', '+80')],
          answer: 'A',
          miss: bi('0.4×200−0.6×100=80−60=20。', '0.4×200−0.6×100=80−60=20.')
        },
        quizzes: [
          quiz('策略 A 的期望是？', 'What is strategy A’s expectancy?', [opt('A', '+20', '+20'), opt('B', '0', '0'), opt('C', '+200', '+200')], 'A', {
            A: ['0.4×200−0.6×100=20。', '0.4×200−0.6×100=20.'],
            B: ['赢的贡献和亏的贡献不相等，不是 0。', 'The win contribution and the loss contribution are not equal, so it is not 0.'],
            C: ['200 是赢的时候的金额，还要乘胜率并减掉亏损。', '200 is the amount when you win. It still has to be multiplied by the win rate, and the losses subtracted.']
          }),
          quiz('策略 B 的期望是？', 'What is strategy B’s expectancy?', [opt('A', '正的', 'Positive'), opt('B', '负的', 'Negative'), opt('C', '等于胜率', 'Equal to the win rate')], 'B', {
            A: ['0.8×20 只有 16，而 0.2×100=20，减完是 −4。', '0.8×20 is only 16, while 0.2×100=20, so the result is −4.'],
            B: ['高胜率盖不住偶尔一次的大亏。', 'A high win rate does not cover an occasional large loss.'],
            C: ['0.8 是胜率，不是期望金额。', '0.8 is the win rate, not the expectancy in money.']
          }),
          quiz('手续费对净期望通常怎样？', 'What do fees usually do to net expectancy?', [opt('A', '降低', 'Lower it'), opt('B', '提高', 'Raise it'), opt('C', '不影响', 'No effect')], 'A', {
            A: ['费用从公式里减去，净期望下降。', 'Fees are subtracted in the formula, so net expectancy falls.'],
            B: ['费用不是收入。', 'A fee is not income.'],
            C: ['只要费用不为 0，结果就和扣费前不同。', 'If the fee is not 0, the result differs from the pre-fee number.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('A：0.4×200 − 0.6×100 = +20。', 'A: 0.4×200 − 0.6×100 = +20.'),
          bi('B：0.8×20 − 0.2×100 = −4。', 'B: 0.8×20 − 0.2×100 = −4.'),
          bi('再扣手续费，两个净期望都会更低。', 'After fees, both net expectancies are lower.')
        ] }
      }),
      lesson({
        id: '04',
        title: bi('止损：触发价不等于成交价', 'Stops: the trigger price is not the fill'),
        scene: bi('止损挂在 95，结果 92 才成交，多出来的亏损算谁的？', 'The stop was at 95 but the fill was 92. Whose loss is the extra amount?'),
        one: bi('止损市价单不保证价格。止损限价单可能根本不成交。薄的盘口会让成交价离触发价更远。', 'A stop-market order does not guarantee the price. A stop-limit order may not fill at all. A thin book can put the fill far from the trigger.'),
        explain: bi('触发价只是启动订单的条件。\n市价止损触发后按当时能成交的价格走，所以不保护成交价。\n限价止损触发后还要求价格不低于或不超过你的限价，盘口不够时可以不成交。\n亏损按真实成交价计算，不是按触发价。', 'The trigger only starts the order.\nAfter a stop-market triggers, it trades at prices the book can fill, so it does not protect the fill price.\nAfter a stop-limit triggers, it still requires a price no worse than your limit. If the book is not there, it may not fill.\nThe loss uses the real fill, not the trigger.'),
        example: bi('买入价 100，触发价 95，成交价 92。\n每枚亏损=100−92=8。\n若 95 和 94 的买盘深度是 0，92 才有 2 个数量，3 个数量里就有 1 个在已知深度之外。', 'Buy price 100, trigger 95, fill 92.\nLoss per coin=100−92=8.\nIf the bid size at 95 and 94 is 0 and 92 has size 2, then 1 of 3 units is outside the known depth.'),
        pitfalls: [
          bi('用触发价代替成交价算亏损', 'Using the trigger instead of the fill to compute the loss'),
          bi('以为限价止损一定会成交', 'Assuming a stop-limit will always fill')
        ],
        practice: bi('用 100 和 92 算出每枚亏损 8。', 'Use 100 and 92 to get a loss of 8 per coin.'),
        check: {
          ask: bi('例子里每枚实际亏损是多少？', 'What is the actual loss per coin in the example?'),
          options: [opt('A', '5', '5'), opt('B', '8', '8'), opt('C', '3', '3')],
          answer: 'B',
          miss: bi('5 只是 100 到触发价 95。成交在 92，亏损是 8。', '5 is only the distance from 100 to the trigger at 95. The fill is 92, so the loss is 8.')
        },
        quizzes: [
          quiz('止损市价单保护成交价吗？', 'Does a stop-market order protect the fill price?', [opt('A', '保护', 'It protects it'), opt('B', '不保护', 'It does not'), opt('C', '只保护整数价', 'Only round prices')], 'B', {
            A: ['它保护的是“触发后去成交”，不是成交在触发价。', 'It protects “go trade after the trigger,” not “fill at the trigger.”'],
            B: ['盘口薄时，成交价可以是 92 而不是 95。', 'In a thin book the fill can be 92 rather than 95.'],
            C: ['整数价没有特殊保护。', 'A round price has no special protection.']
          }),
          quiz('止损限价单可能不成交吗？', 'Can a stop-limit fail to fill?', [opt('A', '可能', 'Yes'), opt('B', '不可能', 'No'), opt('C', '触发了就一定成交', 'A trigger always fills')], 'A', {
            A: ['限价挡在触发价附近时，价格跳过限价就可以留下未成交。', 'If the limit sits near the trigger, price can jump past the limit and leave the order unfilled.'],
            B: ['限价单的定义就包含“价格不合适则不成交”。', 'The definition of a limit includes “no fill if the price is not acceptable.”'],
            C: ['触发只是启动，限价仍要被市场碰到。', 'The trigger only starts it. The limit still has to be met by the market.']
          }),
          quiz('例子里每枚亏损是多少？', 'What is the loss per coin in the example?', [opt('A', '5', '5'), opt('B', '8', '8'), opt('C', '92', '92')], 'B', {
            A: ['5=100−95，那是触发距离，不是成交亏损。', '5=100−95. That is the distance to the trigger, not the fill loss.'],
            B: ['100−92=8。', '100−92=8.'],
            C: ['92 是成交价，不是亏损额。', '92 is the fill price, not the loss.']
          })
        ],
        study: { kind: 'book', headers: [bi('价', 'Price'), bi('买盘数量', 'Bid size')], cells: [['95', '0'], ['94', '0'], ['92', '2']], rows: [
          bi('买入 100，触发 95，成交 92，每枚亏损 8。', 'Bought at 100, trigger 95, fill 92, loss 8 per coin.')
        ] }
      }),
      lesson({
        id: '05',
        title: bi('回撤：亏一半要翻倍才回本', 'Drawdown: losing half requires a double to get back'),
        scene: bi('1000 变成 500，要涨多少才能回到 1000？', '1000 became 500. How much does it need to rise to get back to 1000?'),
        one: bi('回撤相对的是历史峰值。亏掉 50% 之后，要上涨 100% 才回到原峰值。', 'Drawdown is measured from the historical peak. After a 50% loss, price must rise 100% to regain that peak.'),
        explain: bi('回撤=(峰值−当前权益)/峰值。\n恢复所需涨幅=峰值/当前权益−1。\n连续按当前权益百分比亏损，不是简单相加。\n五次各亏当前权益的 1%，结果是 1000×0.99 的 5 次方。', 'Drawdown=(peak−current equity)/peak.\nThe rise needed to recover=peak/current equity−1.\nRepeated percent losses of current equity are not a simple sum.\nFive losses of 1% of current equity are 1000×0.99 to the 5th power.'),
        example: bi('1000 到 500，回撤=50%。\n要回到 1000，需要 +100%。\n1000×0.99^5=950.9900499，约 950.99。', 'From 1000 to 500, drawdown=50%.\nTo get back to 1000, you need +100%.\n1000×0.99^5=950.9900499, about 950.99.'),
        pitfalls: [
          bi('把亏 50% 理解成涨回 50% 就够', 'Thinking a 50% loss is repaired by a 50% rise'),
          bi('把五次 1% 加总成正好少 50', 'Adding five 1% losses into a flat loss of 50')
        ],
        practice: bi('算 500 回到 1000 需要的涨幅，再算 0.99 的五次方。', 'Compute the rise from 500 back to 1000, then compute 0.99 to the 5th power.'),
        check: {
          ask: bi('从峰值亏 50% 后，要涨多少才回本？', 'After a 50% drop from the peak, how much must it rise to recover?'),
          options: [opt('A', '50%', '50%'), opt('B', '100%', '100%'), opt('C', '25%', '25%')],
          answer: 'B',
          miss: bi('500×1.5=750，还没回到 1000。500×2=1000。', '500×1.5=750, which is not back to 1000. 500×2=1000.')
        },
        quizzes: [
          quiz('亏掉一半之后，回本需要上涨多少？', 'After losing half, what rise is needed to recover?', [opt('A', '50%', '50%'), opt('B', '100%', '100%'), opt('C', '200%', '200%')], 'B', {
            A: ['500 上涨 50% 只到 750。', 'A 50% rise from 500 only reaches 750.'],
            B: ['500×(1+100%)=1000，正好回到峰值。', '500×(1+100%)=1000, exactly back to the peak.'],
            C: ['200% 会到 1500，超过原来的峰值。', '200% would reach 1500, past the old peak.']
          }),
          quiz('1000 连续五次亏当前权益的 1%，大约剩多少？', 'Start at 1000 and lose 1% of current equity five times. About what remains?', [opt('A', '950.99', '950.99'), opt('B', '950', '950'), opt('C', '995', '995')], 'A', {
            A: ['1000×0.99^5≈950.99。', '1000×0.99^5≈950.99.'],
            B: ['950 是五次各扣固定的 10，不是每次按剩余权益的 1%。', '950 would be five flat deductions of 10, not 1% of the remaining equity each time.'],
            C: ['995 只扣了一次 5，不是五次。', '995 removes 5 once, not five times.']
          }),
          quiz('回撤是相对什么计算的？', 'Drawdown is calculated against what?', [opt('A', '历史峰值', 'The historical peak'), opt('B', '第一笔的进场价', 'The first entry price'), opt('C', '手续费', 'Fees')], 'A', {
            A: ['回撤=(峰值−当前权益)/峰值。', 'Drawdown=(peak−current equity)/peak.'],
            B: ['进场价不是权益曲线的峰值定义。', 'An entry price is not the definition of the peak on the equity curve.'],
            C: ['手续费会影响权益，但回撤的对照物仍是峰值。', 'Fees affect equity, but the reference for drawdown is still the peak.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('1000 → 500，回撤 50%，回本需要 +100%。', '1000 → 500, drawdown 50%, recovery needs +100%.'),
          bi('1000×0.99^5 ≈ 950.99。', '1000×0.99^5 ≈ 950.99.')
        ] }
      }),
      lesson({
        id: '06',
        title: bi('交易日志：别只收藏赚钱截图', 'A trade log: do not keep only the winning screenshots'),
        scene: bi('只记下赚钱的单，这份记录还能告诉你什么？', 'If you only write down the winners, what can the record still tell you?'),
        one: bi('日志要同时留下赚钱和亏钱的单，并把“按计划做”和“结果赚钱”分开。', 'A log keeps both winners and losers, and it separates “followed the plan” from “made money.”'),
        explain: bi('多单盈亏=(出场−进场)×数量−费用。\n空单相反。\n胜率只统计净盈亏大于 0 的笔数。\n按计划执行但亏钱，和没按计划却赚钱，是两类不同的问题。\n十笔样本不能保证以后的胜率。', 'Long PnL=(exit−entry)×quantity−fees.\nA short is the reverse.\nWin rate counts only trades whose net PnL is above 0.\nFollowing the plan and losing is a different problem from breaking the plan and winning.\nTen trades cannot guarantee the future win rate.'),
        example: bi('只收藏盈利截图，会把亏钱和违规都藏起来。\n同一张表至少要有进场、出场、数量、费用、是否按计划。\n否则无法分开策略问题和执行问题。', 'Keeping only winning screenshots hides both losses and rule breaks.\nThe same sheet needs entry, exit, quantity, fees, and whether you followed the plan.\nOtherwise you cannot separate a strategy problem from an execution problem.'),
        pitfalls: [
          bi('只记录赚钱的交易', 'Recording only the winning trades'),
          bi('把十笔结果外推成以后的胜率', 'Extrapolating ten results into a future win rate')
        ],
        practice: bi('拿一笔盈利但没按计划的单，把它标成执行问题而不是策略证明。', 'Take one winning trade that broke the plan and mark it as an execution problem, not proof of the strategy.'),
        check: {
          ask: bi('只记录赚钱的单，好不好？', 'Is it good to record only the winning trades?'),
          options: [opt('A', '好，看着安心', 'Yes, it feels better'), opt('B', '不好', 'No'), opt('C', '只在亏损月不好', 'Only bad in a losing month')],
          answer: 'B',
          miss: bi('缺了亏损和违规，日志不能复盘。', 'Without losses and rule breaks, the log cannot be reviewed.')
        },
        quizzes: [
          quiz('只把赚钱的单写进日志，好吗？', 'Is it good to write only winners into the log?', [opt('A', '好', 'Yes'), opt('B', '不好', 'No'), opt('C', '样本少的时候好', 'Yes when the sample is small')], 'B', {
            A: ['缺亏损样本，期望和错误都看不出来。', 'Without the losing sample, you cannot see expectancy or mistakes.'],
            B: ['赚钱和亏钱、按计划和违规，都要留下。', 'Winners and losers, plan-following and rule-breaking, all have to stay in the log.'],
            C: ['样本越少越不能再删掉一半。', 'The smaller the sample, the worse it is to delete half of it.']
          }),
          quiz('策略问题和执行问题要分开吗？', 'Should strategy problems and execution problems be separated?', [opt('A', '要', 'Yes'), opt('B', '不用', 'No'), opt('C', '只分开盈利单', 'Only separate the winners')], 'A', {
            A: ['按计划却亏钱，和违规却赚钱，处理方式不同。', 'Losing while following the plan is handled differently from winning while breaking it.'],
            B: ['混在一起就不知道该改规则还是改执行。', 'Mixed together, you cannot tell whether to change the rule or the execution.'],
            C: ['亏损单更需要知道有没有违规。', 'Losing trades need that distinction even more.']
          }),
          quiz('十笔记录能保证以后的结果吗？', 'Can ten records guarantee later results?', [opt('A', '能', 'Yes'), opt('B', '不能', 'No'), opt('C', '胜率过半就能', 'Yes if the win rate is above half')], 'B', {
            A: ['十笔只是一小段样本，可以偏离期望。', 'Ten trades are a short sample. They can deviate from expectancy.'],
            B: ['日志帮助复盘，不承诺下一段的胜率。', 'A log helps review. It does not promise the next stretch’s win rate.'],
            C: ['过半的胜率仍然可能期望为负，也不能外推。', 'A win rate above half can still have negative expectancy, and it still cannot be extrapolated.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('多单盈亏 = (出场 − 进场) × 数量 − 费用。', 'Long PnL = (exit − entry) × quantity − fees.'),
          bi('空单方向相反。胜率只数净盈亏大于 0 的笔。', 'A short reverses the direction. Win rate counts only net PnL above 0.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
