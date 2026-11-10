(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['04'] = {
    title: bi('合约与市场微观结构', 'Contracts and market microstructure'),
    lessons: [
      lesson({
        id: '01',
        title: bi('现货与永续：持币和持仓不是一回事', 'Spot and perpetual: holding coins is not holding a position'),
        scene: bi('开了 10 倍永续，是不是就等于拿着那些币？', 'You opened a 10x perpetual. Does that mean you hold those coins?'),
        one: bi('永续合约是保证金上的多空仓位，不是钱包里的币。杠杆放大的是盈亏相对保证金的比例。', 'A perpetual is a long or short position on margin. It is not coins in a wallet. Leverage scales profit and loss relative to margin.'),
        explain: bi('现货买入后，币在你的账户里。\n永续做多或做空，结算的是价格差，不自动变成持币。\n线性 USDT 本位、不计费用时，未实现盈亏=数量×(标记价−进场价)，空单符号相反。\n保证金约等于名义金额/杠杆，这是教学近似，不是某一家交易所的强平公式。', 'After a spot buy, the coins are in your account.\nA perpetual long or short settles the price difference. It does not automatically become coins you hold.\nFor a linear USDT-margined contract with no fees, unrealized PnL=quantity×(mark−entry). A short flips the sign.\nMargin is about notional/leverage. This is a teaching approximation, not one exchange’s liquidation formula.'),
        example: bi('数量 10，进场 100，名义金额=1000。\n10 倍保证金约等于 100。\n标记价 101，多单未实现盈亏=+10。\n标记价 99，则为 −10。', 'Quantity 10, entry 100, notional=1000.\nMargin at 10x is about 100.\nMark 101, long unrealized PnL=+10.\nMark 99, it is −10.'),
        pitfalls: [bi('把永续仓位当成已经持有币', 'Treating a perpetual position as coins you already hold'), bi('把杠杆当成稳赚开关', 'Treating leverage as a switch that guarantees profit')],
        practice: bi('用数量 10 和价格差 1，算出盈亏绝对值是 10。', 'Use quantity 10 and a price difference of 1 to get an absolute PnL of 10.'),
        check: { ask: bi('10 倍时保证金大约是多少？', 'About how much is the margin at 10x?'), options: [opt('A', '100', '100'), opt('B', '1000', '1000'), opt('C', '10', '10')], answer: 'A', miss: bi('1000 是名义金额。1000/10=100。', '1000 is the notional. 1000/10=100.') },
        quizzes: [
          quiz('数量 10、进场 100、10 倍，保证金约为？', 'Quantity 10, entry 100, 10x. About what is the margin?', [opt('A', '100', '100'), opt('B', '1000', '1000'), opt('C', '10', '10')], 'A', { A: ['名义金额 1000，1000/10≈100。', 'Notional is 1000, and 1000/10≈100.'], B: ['1000 是名义金额，不是保证金。', '1000 is the notional, not the margin.'], C: ['10 是数量，不是保证金。', '10 is the quantity, not the margin.'] }),
          quiz('永续持仓等于持有这些币吗？', 'Does a perpetual position equal holding those coins?', [opt('A', '等于', 'Yes'), opt('B', '不是', 'No'), opt('C', '做空时等于', 'Yes when short')], 'B', { A: ['永续结算价格差，币并不因此进钱包。', 'A perpetual settles a price difference. The coins do not enter the wallet because of that.'], B: ['持仓和持币是两本账。', 'A position and coins held are two different balances.'], C: ['做空更不是持有币，方向还是空的。', 'A short is even less “holding the coins.” The direction is short.'] }),
          quiz('杠杆保证盈利吗？', 'Does leverage guarantee a profit?', [opt('A', '保证', 'Yes'), opt('B', '否', 'No'), opt('C', '10 倍以上才保证', 'Only above 10x')], 'B', { A: ['杠杆同时放大亏损。标记价向反方向走，盈亏就是负的。', 'Leverage also magnifies losses. If the mark moves against you, PnL is negative.'], B: ['例子里标记价 99，多单就是 −10。', 'In the example, mark 99 makes the long −10.'], C: ['更高杠杆不会把方向变成保证。', 'Higher leverage does not turn direction into a guarantee.'] })
        ],
        study: { kind: 'panel', rows: [bi('名义金额 10×100=1000。10 倍保证金约 100。', 'Notional 10×100=1000. Margin at 10x is about 100.'), bi('标记价 101，多单 +10。标记价 99，多单 −10。', 'Mark 101, long +10. Mark 99, long −10.')] }
      }),
      lesson({
        id: '02',
        title: bi('强平：不只是 100 除以杠杆', 'Liquidation: it is not just 100 divided by leverage'),
        scene: bi('10 倍是不是跌 10% 就一定强平？', 'At 10x, does a 10% drop always liquidate you?'),
        one: bi('强平还要看维持保证金、标记价和模式。不能只拿 100 去除以杠杆。', 'Liquidation also depends on maintenance margin, the mark price, and the mode. You cannot just divide 100 by the leverage.'),
        explain: bi('教学模型：权益=初始保证金+数量×(标记价−进场价)。\n权益降到维持保证金时，当作教学阈值，不是某家交易所的真实强平价。\n标记价和最新成交价可以不同，所以触发可以不一样。\n逐仓和全仓可用的余额不同，这里不把它们算成同一个价格。', 'Teaching model: equity=initial margin+quantity×(mark−entry).\nWhen equity falls to the maintenance margin, that is a teaching threshold, not a real exchange liquidation price.\nThe mark and the last trade can differ, so the trigger can differ.\nIsolated and cross margin do not share the same available balance, so this lesson does not treat them as one price.'),
        example: bi('数量 10，进场 100，初始保证金 100，维持保证金 5。\n权益=100+10×(标记价−100)。\n令权益=5，标记价=90.5。\n这是演示阈值，不是交易所公告价。', 'Quantity 10, entry 100, initial margin 100, maintenance margin 5.\nEquity=100+10×(mark−100).\nSet equity=5, and the mark is 90.5.\nThis is a demo threshold, not an exchange’s published price.'),
        pitfalls: [bi('用 100/杠杆当作唯一强平跌幅', 'Using 100/leverage as the only liquidation drop'), bi('用最新价代替标记价', 'Using the last price in place of the mark')],
        practice: bi('把权益方程设成 5，解出标记价 90.5。', 'Set the equity equation to 5 and solve the mark price 90.5.'),
        check: { ask: bi('只靠杠杆倍数能不能算出真实强平价？', 'Can leverage alone produce the real liquidation price?'), options: [opt('A', '能', 'Yes'), opt('B', '否', 'No'), opt('C', '全仓能', 'Yes for cross margin')], answer: 'B', miss: bi('还要维持保证金和标记价。全仓余额也不同。', 'You still need maintenance margin and the mark. Cross margin balance is different too.') },
        quizzes: [
          quiz('只用杠杆倍数就能得到强平价吗？', 'Can leverage alone give the liquidation price?', [opt('A', '能', 'Yes'), opt('B', '否', 'No'), opt('C', '整数杠杆能', 'Yes for whole-number leverage')], 'B', { A: ['100/10=10 只是一个粗比例，方程里还有维持保证金。', '100/10=10 is only a rough ratio. The equation still has maintenance margin.'], B: ['教学阈值用的是权益降到维持保证金，不是单独的杠杆。', 'The teaching threshold is equity falling to maintenance margin, not leverage alone.'], C: ['整数杠杆同样缺维持保证金。', 'A whole-number leverage is still missing maintenance margin.'] }),
          quiz('标记价和最新成交价不同，会影响触发吗？', 'If the mark and the last price differ, can that change the trigger?', [opt('A', '会', 'Yes'), opt('B', '不会', 'No'), opt('C', '只影响现货', 'Only spot')], 'A', { A: ['强平看的是合约规则里的标记价，不是必然等于最后一笔成交。', 'Liquidation uses the mark in the contract rules. It is not necessarily the last trade.'], B: ['两个价格不同，比较的对象就不同。', 'If the two prices differ, the thing being compared differs.'], C: ['这是合约仓位的问题，不是现货持币。', 'This is a contract position, not spot coins.'] }),
          quiz('本课演示阈值的标记价是多少？', 'What mark is the demo threshold in this lesson?', [opt('A', '90.5', '90.5'), opt('B', '90', '90'), opt('C', '95', '95')], 'A', { A: ['100+10×(标记价−100)=5，标记价=90.5。', '100+10×(mark−100)=5, so the mark is 90.5.'], B: ['90 会把权益算成 0，不是维持保证金 5。', '90 would make equity 0, not the maintenance margin of 5.'], C: ['95 时权益仍是 50，高于 5。', 'At 95, equity is still 50, above 5.'] })
        ],
        study: { kind: 'panel', rows: [bi('权益 = 100 + 10×(标记价 − 100)。', 'Equity = 100 + 10×(mark − 100).'), bi('令权益 = 5，标记价 = 90.5。这是教学阈值。', 'Set equity = 5, and the mark is 90.5. This is a teaching threshold.')] }
      }),
      lesson({
        id: '03',
        title: bi('资金费率：谁付给谁', 'Funding: who pays whom'),
        scene: bi('费率为正的时候，是多头付钱还是空头付钱？', 'When the funding rate is positive, do longs pay or shorts pay?'),
        one: bi('资金费大约是名义金额乘以费率。正费率时多头付给空头。费率会变，不是永久固定。', 'Funding is about notional times the rate. When the rate is positive, longs pay shorts. The rate changes. It is not fixed forever.'),
        explain: bi('本课费用≈名义金额×当期费率。\n费率为正：多头支付，空头收取。\n费率为负：方向反过来。\n费率为 0：这一期教学模型里不支付。\n下一期的费率可以不同。', 'In this lesson, the fee≈notional×that period’s rate.\nA positive rate: longs pay and shorts receive.\nA negative rate: the direction reverses.\nA zero rate: this teaching model pays nothing that period.\nThe next period’s rate can be different.'),
        example: bi('名义金额 2000，费率 +0.01%。\n费用=2000×0.0001=0.2 USDT。\n三期费率 +0.01%、−0.02%、0，每期都要单独乘。', 'Notional 2000, rate +0.01%.\nFee=2000×0.0001=0.2 USDT.\nThree periods at +0.01%, −0.02%, and 0. Each period is multiplied on its own.'),
        pitfalls: [bi('把正费率理解成空头付给多头', 'Reading a positive rate as shorts paying longs'), bi('把某一期费率当成永远不变', 'Treating one period’s rate as permanent')],
        practice: bi('算 2000×0.01% ，确认是 0.2。', 'Compute 2000×0.01% and confirm it is 0.2.'),
        check: { ask: bi('正费率时谁付钱？', 'Who pays when the rate is positive?'), options: [opt('A', '多头付给空头', 'Longs pay shorts'), opt('B', '空头付给多头', 'Shorts pay longs'), opt('C', '双方都不付', 'Neither pays')], answer: 'A', miss: bi('本课约定正费率是多付空。0 才是不付。', 'This lesson treats a positive rate as longs paying shorts. Zero is the case where nobody pays.') },
        quizzes: [
          quiz('费率为正时，谁付给谁？', 'When the rate is positive, who pays whom?', [opt('A', '多头付给空头', 'Longs pay shorts'), opt('B', '空头付给多头', 'Shorts pay longs'), opt('C', '交易所必赔', 'The exchange must pay')], 'A', { A: ['本课正费率：多头支付，空头收取。', 'In this lesson a positive rate means longs pay and shorts receive.'], B: ['那是费率为负时的方向。', 'That direction is for a negative rate.'], C: ['资金费是多空之间的支付，不是交易所保证赔偿。', 'Funding is a payment between longs and shorts, not a guaranteed exchange payout.'] }),
          quiz('名义 2000、费率 +0.01%，费用是？', 'Notional 2000 and rate +0.01%. What is the fee?', [opt('A', '0.2', '0.2'), opt('B', '2', '2'), opt('C', '20', '20')], 'A', { A: ['0.01%=0.0001，2000×0.0001=0.2。', '0.01%=0.0001, and 2000×0.0001=0.2.'], B: ['2 会是 0.1%，大了 10 倍。', '2 would be 0.1%, ten times larger.'], C: ['20 会是 1%。', '20 would be 1%.'] }),
          quiz('资金费率会永远固定吗？', 'Is the funding rate fixed forever?', [opt('A', '会', 'Yes'), opt('B', '否', 'No'), opt('C', '只有为 0 时会变', 'It changes only when it is 0')], 'B', { A: ['例子里三期就是 +0.01%、−0.02% 和 0。', 'The example’s three periods are +0.01%, −0.02%, and 0.'], B: ['每一期单独计算，下一期可以变号。', 'Each period is calculated alone. The next period can change sign.'], C: ['不为 0 的费率下一期也可以变。', 'A non-zero rate can also change next period.'] })
        ],
        study: { kind: 'panel', headers: ['期', '费率', '2000 的费用'], cells: [['1', '+0.01%', '0.2'], ['2', '−0.02%', '−0.4'], ['3', '0', '0']], rows: [bi('正数表示多头支付。', 'A positive number means longs pay.')] }
      }),
      lesson({
        id: '04',
        title: bi('订单簿：看到 100 不等于全买在 100', 'The book: seeing 100 does not mean the whole buy fills at 100'),
        scene: bi('卖一只有 1 个，市价买 3 个，成交价还全是 100 吗？', 'The best ask has size 1. You market-buy 3. Do they all fill at 100?'),
        one: bi('市价单会吃掉多层报价，所以均价可以差于你看见的第一档。限价单则可能留下未成交。', 'A market order lifts several price levels, so the average can be worse than the first price you see. A limit order can leave a remainder unfilled.'),
        explain: bi('从最优卖价开始逐档成交。\n花费=各档价格×吃到的数量。\n均价=花费/成交数量。\n已知深度不够时，剩余数量不能假装仍按最后一档成交。\n限价单只在限价可以被满足时成交。', 'Fill from the best ask upward, level by level.\nCost=each level’s price×the size taken there.\nAverage=cost/filled size.\nIf the known depth runs out, do not pretend the remainder still fills at the last level.\nA limit fills only when its limit can be met.'),
        example: bi('卖盘：100 有 1 个，101 有 2 个。\n市价买 3 个，花费=100×1+101×2=302。\n均价=302/3=100.666667，约 100.667。\n再买第 4 个时，已知深度已经不够。', 'Asks: size 1 at 100 and size 2 at 101.\nA market buy of 3 costs 100×1+101×2=302.\nAverage=302/3=100.666667, about 100.667.\nThe 4th unit is beyond the known depth.'),
        pitfalls: [bi('用第一档价格乘以全部数量', 'Multiplying the first price by the whole quantity'), bi('以为限价单挂上就一定成交', 'Assuming a limit fills just because it was placed')],
        practice: bi('算买 3 个的花费 302 和均价。', 'Compute the cost 302 and the average for buying 3.'),
        check: { ask: bi('买 3 个的均价更接近哪个？', 'The average for buying 3 is closer to which?'), options: [opt('A', '100', '100'), opt('B', '100.667', '100.667'), opt('C', '101', '101')], answer: 'B', miss: bi('只有 1 个在 100，另外 2 个在 101，均价不是 100。', 'Only 1 unit is at 100. The other 2 are at 101, so the average is not 100.') },
        quizzes: [
          quiz('买 3 个的均价约为多少？', 'About what is the average for buying 3?', [opt('A', '100', '100'), opt('B', '100.667', '100.667'), opt('C', '103', '103')], 'B', { A: ['100 上只有 1 个数量。', 'There is only size 1 at 100.'], B: ['302/3=100.666667，约 100.667。', '302/3=100.666667, about 100.667.'], C: ['没有任何一档是 103。', 'No level is at 103.'] }),
          quiz('市价单会不会滑价？', 'Can a market order slip?', [opt('A', '会', 'Yes'), opt('B', '不会', 'No'), opt('C', '只有卖出会', 'Only sells slip')], 'A', { A: ['吃到下一档 101，均价就高于 100。', 'Lifting the next level at 101 makes the average higher than 100.'], B: ['第一档数量不够时，不可能全部停在 100。', 'When the first level is not large enough, the whole order cannot stay at 100.'], C: ['买入一样会往更高的卖价吃。', 'A buy also lifts higher asks.'] }),
          quiz('限价单是否总会成交？', 'Does a limit order always fill?', [opt('A', '总会', 'Always'), opt('B', '否', 'No'), opt('C', '市价才不会', 'Only market orders may fail')], 'B', { A: ['价格没有碰到限价，订单就还挂着。', 'If price never reaches the limit, the order stays open.'], B: ['限价的含义就是可以不成交。', 'The meaning of a limit is that it may not fill.'], C: ['市价会去吃现有深度。限价才是可能不成交的那一种。', 'A market order lifts the current depth. The limit is the one that may not fill.'] })
        ],
        study: { kind: 'book', headers: ['卖价', '数量'], cells: [['100', '1'], ['101', '2']], rows: [bi('买 3：花费 302，均价约 100.667。第 4 个超出已知深度。', 'Buy 3: cost 302, average about 100.667. The 4th unit is past the known depth.')] }
      }),
      lesson({
        id: '05',
        title: bi('OI：一张合约同时有多和空', 'Open interest: one contract has both a long and a short'),
        scene: bi('持仓量上升，是不是价格一定上涨？', 'Open interest rose. Must price rise?'),
        one: bi('一张未平仓合约同时对应一个多头和一个空头。持仓量上升只说明未平仓增加，不说明价格方向。', 'One open contract has both a long and a short. Rising open interest only says more contracts are open. It does not say the price direction.'),
        explain: bi('双方新开仓，持仓量 +1。\n双方平仓，持仓量 −1。\n一边开仓、一边平仓，持仓量可以不变。\n持仓量和成交量不是同一件事。\n清算数据也不保证覆盖全部市场。', 'When both sides open, open interest is +1.\nWhen both sides close, open interest is −1.\nIf one side opens and the other closes, open interest can stay the same.\nOpen interest and volume are not the same thing.\nLiquidation data also does not guarantee coverage of the whole market.'),
        example: bi('新多和新空同时开出一张，OI +1。\n这张合约本身就有人看多、有人看空。\n所以 OI 上升不能单独推出价格上涨。', 'A new long and a new short open one contract, OI +1.\nThat contract already has someone long and someone short.\nSo a rise in OI alone cannot imply that price rose.'),
        pitfalls: [bi('把 OI 上升当成价格上涨', 'Reading rising OI as rising price'), bi('把局部清算数据当成全市场', 'Treating partial liquidation data as the whole market')],
        practice: bi('说出双方开仓、双方平仓、一开一平这三种情况的 OI 变化。', 'State the OI change for both opening, both closing, and one opening while one closes.'),
        check: { ask: bi('双方都新开一张，OI 怎么变？', 'Both sides open one new contract. What happens to OI?'), options: [opt('A', '+1', '+1'), opt('B', '不变', 'Unchanged'), opt('C', '−1', '−1')], answer: 'A', miss: bi('一开一平才可能不变。双方新开是 +1。', 'One open and one close can leave it unchanged. Both opening is +1.') },
        quizzes: [
          quiz('持仓量上升是否表示价格上涨？', 'Does rising open interest mean price rose?', [opt('A', '表示', 'Yes'), opt('B', '否', 'No'), opt('C', '只在正费率时表示', 'Only when funding is positive')], 'B', { A: ['新开的一张里同时有多头和空头，方向没有被 OI 决定。', 'A newly opened contract has both a long and a short. OI does not decide the direction.'], B: ['OI 数的是未平仓张数，不是涨跌。', 'OI counts open contracts, not up or down moves.'], C: ['资金费率是另一项数据。', 'Funding is a different data item.'] }),
          quiz('一张未平仓合约是否两边都有人？', 'Does one open contract have someone on both sides?', [opt('A', '是', 'Yes'), opt('B', '否', 'No'), opt('C', '只有多头', 'Only a long')], 'A', { A: ['多头和空头成对存在，张数才算一张未平仓。', 'The long and the short exist as a pair. That is one unit of open interest.'], B: ['没有对手方就没有这张合约。', 'Without the other side there is no contract.'], C: ['只有多头无法单独形成未平仓合约。', 'A long alone cannot form an open contract.'] }),
          quiz('清算数据是否一定覆盖全部市场？', 'Does liquidation data necessarily cover the whole market?', [opt('A', '一定', 'Yes'), opt('B', '不一定', 'Not necessarily'), opt('C', 'OI 上升就一定', 'Yes whenever OI rises')], 'B', { A: ['不同来源的覆盖范围可以缺一块。', 'Different sources can leave part of the market out.'], B: ['看见一部分清算，不能当成全部合约都算进来了。', 'Seeing some liquidations does not mean every contract was included.'], C: ['OI 变化不证明数据源是完整的。', 'A change in OI does not prove the data source is complete.'] })
        ],
        study: { kind: 'panel', headers: ['事件', 'OI'], cells: [['双方开仓', '+1'], ['双方平仓', '−1'], ['一开一平', '0']], rows: [bi('OI 上升不等于价格上涨。', 'Rising OI does not mean price rose.')] }
      })
    ]
  };
})(window.STAR_PACK);
