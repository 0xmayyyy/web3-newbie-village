(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['05'] = {
    title: bi('宏观经济与市场周期', 'Macroeconomics and market cycles'),
    lessons: [
      lesson({
        id: '01', title: bi('CPI/PPI：市场看的是预期差', 'CPI/PPI: the market looks at the surprise'),
        scene: bi('CPI 公布得比预期高，比特币就一定跌吗？', 'CPI prints above expectations. Must bitcoin fall?'),
        one: bi('同比和环比不是同一个口径。市场往往交易的是实际值相对预期的差，而不是数字本身的高低。', 'Year-over-year and month-over-month are not the same measure. Markets often trade the gap between the actual print and the forecast, not whether the number looks high by itself.'),
        explain: bi('同比是相对去年同期。\n环比是相对上一期。\n预期 2.8%，实际 3.1%，意外是 +0.3 个百分点，不是 0.3 倍。\n指数从 100 到 103.1，同比是 3.1%。\n同一条意外可以对应不止一种价格反应，所以高 CPI 不保证 BTC 下跌。', 'Year-over-year is versus the same period last year.\nMonth-over-month is versus the previous period.\nForecast 2.8% and actual 3.1% is a surprise of +0.3 percentage points, not 0.3 times.\nAn index from 100 to 103.1 is a 3.1% year-over-year change.\nThe same surprise can be followed by more than one price reaction, so a high CPI does not guarantee BTC falls.'),
        example: bi('3.1−2.8=0.3 个百分点。\n100 到 103.1 的同比就是 3.1%。\n图上准备了两种模拟反应，用来说明结果不是唯一的。', '3.1−2.8=0.3 percentage points.\nFrom 100 to 103.1, the year-over-year change is 3.1%.\nThe chart prepares two simulated reactions, to show the outcome is not unique.'),
        pitfalls: [bi('把同比和环比当成同一个数', 'Treating year-over-year and month-over-month as the same number'), bi('把一次高于预期当成 BTC 必跌', 'Treating one above-forecast print as BTC must fall')],
        practice: bi('用 3.1 和 2.8 算出意外是 0.3 个百分点。', 'Use 3.1 and 2.8 to get a surprise of 0.3 percentage points.'),
        check: { ask: bi('3.1% 减 2.8% 是多少？', 'What is 3.1% minus 2.8%?'), options: [opt('A', '0.3 个百分点', '0.3 percentage points'), opt('B', '0.3 倍', '0.3 times'), opt('C', '6%', '6%')], answer: 'A', miss: bi('两个百分数相减，单位是百分点。', 'Subtracting two percentages gives percentage points.') },
        quizzes: [
          quiz('预期 2.8%、实际 3.1%，意外是？', 'Forecast 2.8%, actual 3.1%. What is the surprise?', [opt('A', '0.3 个百分点', '0.3 percentage points'), opt('B', '0.3%', '0.3% of the index'), opt('C', '3.1 倍', '3.1 times')], 'A', { A: ['3.1−2.8=0.3，单位是百分点。', '3.1−2.8=0.3, and the unit is percentage points.'], B: ['0.3% 会让人以为是指数再乘 0.3%，口径不同。', '0.3% can be read as multiplying the index by 0.3% again. That is a different measure.'], C: ['3.1 是实际同比，不是倍数。', '3.1 is the actual year-over-year print, not a multiple.'] }),
          quiz('同比等于环比吗？', 'Does year-over-year equal month-over-month?', [opt('A', '等于', 'Yes'), opt('B', '否', 'No'), opt('C', '只有 CPI 等于', 'Only for CPI')], 'B', { A: ['一个对照去年，一个对照上一期。', 'One compares with last year, the other with the previous period.'], B: ['对照期不同，数值就可以不同。', 'Different reference periods can produce different numbers.'], C: ['PPI 也同样要分口径。', 'PPI has to separate the two measures as well.'] }),
          quiz('CPI 偏高是否比特币一定下跌？', 'If CPI is high, must bitcoin fall?', [opt('A', '一定', 'It must'), opt('B', '不一定', 'Not necessarily'), opt('C', '只在美国交易时段一定', 'Only during US hours')], 'B', { A: ['价格反应至少可以有两种模拟路径。', 'The price reaction can take at least two simulated paths.'], B: ['意外差不是一条“必须下跌”的规则。', 'A surprise is not a rule that price must fall.'], C: ['时段不能把一种可能变成必然。', 'The session cannot turn one possibility into a necessity.'] })
        ],
        study: { kind: 'panel', rows: [bi('预期 2.8%，实际 3.1%，意外 +0.3 个百分点。', 'Forecast 2.8%, actual 3.1%, surprise +0.3 percentage points.'), bi('指数 100 → 103.1，同比 3.1%。', 'Index 100 → 103.1, year-over-year 3.1%.')] }
      }),
      lesson({
        id: '02', title: bi('利率：降息不是上涨按钮', 'Rates: a cut is not an up button'),
        scene: bi('降了 25 个基点，币价是不是应该涨？', 'Rates were cut 25 basis points. Should the coin rise?'),
        one: bi('25 个基点等于 0.25 个百分点。降息可以被提前计价，所以公布本身不保证上涨。', '25 basis points equal 0.25 percentage points. A cut can be priced in beforehand, so the announcement itself does not guarantee a rise.'),
        explain: bi('1 个基点=0.01 个百分点。\n25 个基点=0.25 个百分点。\n从 5.00% 到 4.75%，变化就是 25 个基点。\n若市场早已按这次降息定价，公布时价格可以不涨，甚至反向。', '1 basis point=0.01 percentage point.\n25 basis points=0.25 percentage points.\nFrom 5.00% to 4.75%, the change is 25 basis points.\nIf the market already priced this cut, price need not rise on the announcement. It can even move the other way.'),
        example: bi('5.00%→4.75%=0.25 个百分点=25bp。\n一条路径是“符合预期所以没什么反应”。\n另一条路径才是意外降息后的重定价。', '5.00%→4.75%=0.25 percentage points=25bp.\nOne path is “as expected, so little reaction.”\nThe other path is a repricing after a surprise cut.'),
        pitfalls: [bi('把基点和百分点算成同一个单位', 'Counting basis points and percentage points as the same unit'), bi('把降息公布当成必须上涨', 'Treating a cut announcement as a required rally')],
        practice: bi('把 25bp 换成 0.25 个百分点。', 'Convert 25bp into 0.25 percentage points.'),
        check: { ask: bi('25 个基点等于多少个百分点？', 'How many percentage points are 25 basis points?'), options: [opt('A', '0.25', '0.25'), opt('B', '2.5', '2.5'), opt('C', '25', '25')], answer: 'A', miss: bi('1bp=0.01 个百分点，25bp=0.25 个百分点。', '1bp=0.01 percentage point, so 25bp=0.25 percentage points.') },
        quizzes: [
          quiz('25 个基点是多少个百分点？', 'How many percentage points are 25 basis points?', [opt('A', '0.25 个百分点', '0.25 percentage points'), opt('B', '2.5 个百分点', '2.5 percentage points'), opt('C', '25 个百分点', '25 percentage points')], 'A', { A: ['1 个基点是 0.01 个百分点，25 个就是 0.25。', '1 basis point is 0.01 percentage point, so 25 of them are 0.25.'], B: ['2.5 个百分点会是 250 个基点。', '2.5 percentage points would be 250 basis points.'], C: ['25 个百分点是利率本身的量级，不是这次的变化。', '25 percentage points is the scale of a rate level, not this change.'] }),
          quiz('降息是否保证比特币上涨？', 'Does a rate cut guarantee bitcoin rises?', [opt('A', '保证', 'It guarantees it'), opt('B', '不保证', 'It does not'), opt('C', '只在首次降息保证', 'Only the first cut')], 'B', { A: ['降息可以被提前计价，公布时不必再涨。', 'A cut can be priced in early, so the announcement need not rally.'], B: ['符合预期和意外是两条不同的路径。', '“As expected” and “a surprise” are two different paths.'], C: ['第一次降息同样可以被提前交易。', 'The first cut can also be traded ahead of time.'] }),
          quiz('预期可能提前反映在价格里吗？', 'Can expectations already be in the price?', [opt('A', '可能', 'Yes'), opt('B', '不可能', 'No'), opt('C', '只反映在美股', 'Only in US stocks')], 'A', { A: ['市场可以在公布前按预期降息重定价。', 'The market can reprice an expected cut before the announcement.'], B: ['若完全不提前反映，符合预期和意外就没有区别。', 'If nothing were priced early, an expected print and a surprise would be the same.'], C: ['加密价格也可以提前反映宏观预期。', 'Crypto prices can also reflect macro expectations early.'] })
        ],
        study: { kind: 'panel', rows: [bi('5.00% → 4.75% = 25bp = 0.25 个百分点。', '5.00% → 4.75% = 25bp = 0.25 percentage points.'), bi('已计价的降息，公布时不必上涨。', 'A cut that was already priced need not rally when it is announced.')] }
      }),
      lesson({
        id: '03', title: bi('DXY 与美债：相关不是因果', 'DXY and Treasuries: correlation is not causation'),
        scene: bi('美债收益率上升的时候，比特币必须下跌吗？', 'When Treasury yields rise, must bitcoin fall?'),
        one: bi('相关系数描述两列数一起变动的程度。它不是因果关系，方差为 0 时还无法计算。', 'Correlation describes how two series move together. It is not causation. If variance is 0, it cannot be calculated.'),
        explain: bi('皮尔逊相关系数 r 用两列数对各自平均数的偏离来算。\n完全反向的 1 到 5 和 5 到 1，r=−1。\n某一列完全不变时，分母为 0，本课标成不可计算。\n窗口一换，r 可以变号。所以收益率上升不保证 BTC 下跌。', 'Pearson r uses each series’ deviations from its own average.\nThe perfect reverse of 1 through 5 against 5 through 1 has r=−1.\nIf one series never changes, the denominator is 0. This lesson marks that as not computable.\nChange the window and r can change sign. So rising yields do not guarantee BTC falls.'),
        example: bi('X=1,2,3,4,5，Y=5,4,3,2,1，r=−1。\nX=1,1,1 时，r 不可计算。\n相关很强，仍然可以没有因果关系。', 'X=1,2,3,4,5 and Y=5,4,3,2,1, r=−1.\nWhen X=1,1,1, r cannot be calculated.\nA strong correlation can still have no causal link.'),
        pitfalls: [bi('把相关系数说成原因', 'Calling a correlation a cause'), bi('在一条横线的数据上硬算 r', 'Forcing r on a flat series')],
        practice: bi('说明为什么全是同一个数时 r 不能算。', 'Explain why r cannot be computed when every value is the same number.'),
        check: { ask: bi('相关等于因果吗？', 'Does correlation equal causation?'), options: [opt('A', '等于', 'Yes'), opt('B', '不等于', 'No'), opt('C', 'r 为负时等于', 'Yes when r is negative')], answer: 'B', miss: bi('r 只描述一起变动，不说明谁导致谁。', 'r only describes moving together. It does not say which caused which.') },
        quizzes: [
          quiz('相关是不是因果？', 'Is correlation causation?', [opt('A', '是', 'Yes'), opt('B', '不是', 'No'), opt('C', '|r| 大于 0.8 就是', 'Yes when |r| is above 0.8')], 'B', { A: ['一起涨跌不等于一个造成另一个。', 'Rising and falling together does not mean one caused the other.'], B: ['r 没有包含因果方向。', 'r does not contain a causal direction.'], C: ['更接近 ±1 只是更同步，仍然不是因果证明。', 'Closer to ±1 only means more synchronized. It is still not proof of cause.'] }),
          quiz('收益率上升，比特币必须下跌吗？', 'If yields rise, must bitcoin fall?', [opt('A', '必须', 'It must'), opt('B', '不必须', 'It need not'), opt('C', '只在 r 为负的那天必须', 'Only on days when r is negative')], 'B', { A: ['换一个窗口，相关就可以变号。', 'Change the window and the correlation can change sign.'], B: ['一个历史窗口的 r 管不到下一根 K 线。', 'r from one historical window does not govern the next candle.'], C: ['当天的 r 本身也不是交易指令。', 'That day’s r is not a trade instruction either.'] }),
          quiz('某一列完全不变时，r 应该？', 'When one series is completely flat, r should be?', [opt('A', '0', '0'), opt('B', '1', '1'), opt('C', '不可计算', 'Not computable')], 'C', { A: ['0 表示没有线性相关，但分母已经是 0，公式不能算。', '0 would mean no linear correlation, but the denominator is already 0, so the formula cannot be computed.'], B: ['1 表示完全同向，横线并不是同向变动。', '1 means a perfect match in direction. A flat line is not that.'], C: ['方差为 0，本课标成不可计算。', 'Variance is 0, so this lesson marks it not computable.'] })
        ],
        study: { kind: 'panel', headers: ['X', 'Y'], cells: [['1', '5'], ['2', '4'], ['3', '3'], ['4', '2'], ['5', '1']], rows: [bi('这一组 r=−1。常数序列不可计算。', 'This pair has r=−1. A constant series cannot be computed.')] }
      }),
      lesson({
        id: '04', title: bi('BTC 减半：减的是新币补贴', 'The BTC halving: what is cut is the new-coin subsidy'),
        scene: bi('减半之后，你钱包里的币会不会也少一半？', 'After the halving, do the coins in your wallet also get cut in half?'),
        one: bi('减半减少的是新挖出的区块补贴。已经在钱包里的余额不会被砍半。历史也不保证下一次的价格路径。', 'The halving cuts the new block subsidy. Balances already in wallets are not cut in half. History also does not guarantee the next price path.'),
        explain: bi('补贴按区块高度从 50、25、12.5、6.25 到 3.125 这样减。\n时间不是一张固定日历，要看区块高度。\n已有余额不受这次补贴规则改写。\n过去减半后的价格路径不能外推成下一次必须重复。', 'The subsidy steps down by block height: 50, 25, 12.5, 6.25, then 3.125.\nIt is not a fixed calendar date. It follows block height.\nExisting balances are not rewritten by this subsidy rule.\nThe price path after a past halving cannot be extrapolated into “the next one must repeat.”'),
        example: bi('补贴 50 减到 25，减的是新发行。\n你原来的 1 枚 BTC 还是 1 枚。\n累积供应曲线变缓，不是余额减半。', 'A subsidy cut from 50 to 25 cuts new issuance.\nThe 1 BTC you already had is still 1 BTC.\nThe cumulative supply curve slows. Balances are not halved.'),
        pitfalls: [bi('以为钱包余额会被协议砍半', 'Thinking the protocol cuts wallet balances in half'), bi('用过去的涨幅预订下一次', 'Booking the next rally from a past gain')],
        practice: bi('指出减半改变的是区块补贴，不是余额。', 'Point out that the halving changes the block subsidy, not balances.'),
        check: { ask: bi('减半减的是什么？', 'What does the halving cut?'), options: [opt('A', '区块补贴', 'The block subsidy'), opt('B', '钱包余额', 'Wallet balances'), opt('C', '手续费的一半', 'Half of fees')], answer: 'A', miss: bi('余额不改。手续费也不是被这条规则砍半。', 'Balances do not change. Fees are not cut in half by this rule either.') },
        quizzes: [
          quiz('减半影响的是什么？', 'What does the halving affect?', [opt('A', '区块补贴', 'The block subsidy'), opt('B', '所有人的余额', 'Everyone’s balance'), opt('C', '已确认交易', 'Confirmed transactions')], 'A', { A: ['新区块的补贴按高度减半。', 'The subsidy of a new block is halved by height.'], B: ['已有余额不被改写。', 'Existing balances are not rewritten.'], C: ['已经确认的交易不会因为减半被撤销。', 'A confirmed transaction is not undone by the halving.'] }),
          quiz('已有余额会被减半吗？', 'Are existing balances halved?', [opt('A', '会', 'Yes'), opt('B', '否', 'No'), opt('C', '只减零头', 'Only the dust')], 'B', { A: ['减的是新发行补贴，不是账本上的余额。', 'What is cut is the new issuance subsidy, not balances on the ledger.'], B: ['1 枚还是 1 枚。', '1 coin is still 1 coin.'], C: ['没有“只减零头”这条规则。', 'There is no rule that only dust is cut.'] }),
          quiz('历史路径保证下一次吗？', 'Does the historical path guarantee the next time?', [opt('A', '保证', 'It does'), opt('B', '不保证', 'It does not'), opt('C', '只保证减半当月', 'Only the halving month')], 'B', { A: ['过去的价格不是协议规则。', 'Past prices are not a protocol rule.'], B: ['补贴规则可以重复，价格路径不必重复。', 'The subsidy rule can repeat. The price path need not.'], C: ['当月同样没有价格保证。', 'The month of the halving has no price guarantee either.'] })
        ],
        study: { kind: 'panel', headers: [bi('阶段', 'Stage'), bi('补贴', 'Subsidy')], cells: [['1', '50'], ['2', '25'], ['3', '12.5'], ['4', '6.25'], ['5', '3.125']], rows: [bi('按区块高度递减。已有余额不减。', 'It steps down by block height. Existing balances are not reduced.')] }
      }),
      lesson({
        id: '05', title: bi('宏观事件日历：先计划再看结果', 'A macro calendar: plan before the result'),
        scene: bi('数据公布前，计划里可以写“不交易”吗？', 'Before the release, can the plan say “no trade”?'),
        one: bi('先写时间、时区和你允许的动作，再看结果。一个变量不够解释价格，不交易也可以是计划。', 'Write the time, the timezone, and the actions you allow before you see the result. One variable is not enough to explain price. No-trade can be the plan.'),
        explain: bi('同一时刻在不同时区不是同一个钟点。\n公布前写下：看哪个数据、预期是多少、触发后做什么、不触发做什么。\n只盯一个数字，忽略当时的仓位和流动性，解释不了价格。\n计划可以明确写成这次不交易。', 'The same instant is not the same clock time in every timezone.\nBefore the release, write which data you watch, what the forecast is, what you do if it triggers, and what you do if it does not.\nWatching one number while ignoring positions and liquidity does not explain price.\nThe plan can explicitly say this event is a no-trade.'),
        example: bi('虚构事件：2027-01-15 13:30 UTC。\nCPI 预期 2.8%，模拟实际值 3.1%。\n在看见 3.1% 之前，计划已经写好，而不是事后改口。', 'Fictional event: 2027-01-15 13:30 UTC.\nCPI forecast 2.8%, simulated actual 3.1%.\nThe plan is written before 3.1% is seen, not rewritten afterward.'),
        pitfalls: [bi('不看时区就对钟点', 'Matching the clock time without checking the timezone'), bi('用一个宏观数字解释全部涨跌', 'Explaining the whole move with one macro number')],
        practice: bi('先写下“不交易”或具体触发条件，再看模拟实际值。', 'Write “no trade” or a specific trigger before you look at the simulated actual.'),
        check: { ask: bi('公布前要核对时区吗？', 'Should you check the timezone before the release?'), options: [opt('A', '要', 'Yes'), opt('B', '不用', 'No'), opt('C', '只有 CPI 要', 'Only for CPI')], answer: 'A', miss: bi('13:30 UTC 和本地钟点不是自动相同。', '13:30 UTC is not automatically the local clock time.') },
        quizzes: [
          quiz('公布前要核对时区吗？', 'Check the timezone before the release?', [opt('A', '要', 'Yes'), opt('B', '不用', 'No'), opt('C', '看完结果再核', 'Check after the result')], 'A', { A: ['同一个 UTC 时刻，本地显示可以差几个小时。', 'The same UTC instant can be several hours different on a local clock.'], B: ['不核对就会把别的钟点当成公布时刻。', 'Without checking, you treat a different clock time as the release.'], C: ['事后再核，计划已经来不及按原时钟执行。', 'Checking afterward is too late to follow the original clock.'] }),
          quiz('只看一个变量够解释价格吗？', 'Is one variable enough to explain price?', [opt('A', '够', 'Yes'), opt('B', '不够', 'No'), opt('C', '实际值高于预期就够', 'Yes if the actual beats the forecast')], 'B', { A: ['仓位、流动性和当时的定价都会一起作用。', 'Positions, liquidity, and what was already priced all act together.'], B: ['一个 CPI 数字不是价格的全部原因。', 'One CPI number is not the whole cause of price.'], C: ['高于预期仍然只是一个输入。', 'Beating the forecast is still only one input.'] }),
          quiz('计划可以是这次不交易吗？', 'Can the plan be “no trade” this time?', [opt('A', '可以', 'Yes'), opt('B', '不可以', 'No'), opt('C', '只有亏钱后可以', 'Only after a loss')], 'A', { A: ['不交易是一个明确动作，可以写在公布之前。', 'No-trade is an explicit action. It can be written before the release.'], B: ['没有规则要求每次宏观数据都必须下单。', 'No rule says every macro print must be traded.'], C: ['不需要等亏了才允许观望。', 'You do not need a loss before standing aside is allowed.'] })
        ],
        study: { kind: 'panel', rows: [bi('虚构：2027-01-15 13:30 UTC。', 'Fictional: 2027-01-15 13:30 UTC.'), bi('CPI 预期 2.8%，模拟实际 3.1%。先写计划再看结果。', 'CPI forecast 2.8%, simulated actual 3.1%. Write the plan before the result.')] }
      })
    ]
  };
})(window.STAR_PACK);
