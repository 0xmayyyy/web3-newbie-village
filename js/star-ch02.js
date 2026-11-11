(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  var macd = [];
  var i;
  for (i = 0; i < 30; i++) macd.push(Math.round((100 + i * 0.8) * 1000) / 1000);
  for (i = 0; i < 12; i++) macd.push(Math.round((macd[macd.length - 1] + 0.12) * 1000) / 1000);
  var rsi75 = [100, 103, 106, 103.5, 106.5, 104, 107, 110, 107.5, 110.5, 108, 111, 114, 117, 120];
  P.chapters['02'] = {
    title: bi('技术指标与信号', 'Indicators and signals'),
    lessons: [
      lesson({
        id: '01',
        title: bi('EMA：均线为什么追着价格跑', 'EMA: why the average chases price'),
        scene: bi('价格刚跌下来，EMA 会不会一下子跳到最新收盘价？', 'When price just fell, does the EMA jump straight to the latest close?'),
        one: bi('EMA 让最近的收盘占更大权重，它跟着价格走，但不会一步跳到新收盘。', 'An EMA gives more weight to recent closes. It follows price, but it does not jump to the new close in one step.'),
        explain: bi('EMA 不是预测线。\n它只是让最近的价格占更大权重。\nα=2/(N+1)。\nE0 取第一根收盘。\n之后 Et=α×Ct+(1−α)×Et−1。\n周期短，反应更快，也更容易被横盘晃动。\n周期短不等于信号更准。', 'An EMA is not a forecast line.\nIt only gives more weight to recent prices.\nα=2/(N+1).\nE0 is the first close.\nAfter that, Et=α×Ct+(1−α)×Et−1.\nA short period reacts faster, and it is also shaken more by a range.\nA short period does not mean the signal is more accurate.'),
        example: bi('收盘 100、102、104、100、98。\nEMA3 为 100、101、102.5、101.25、99.625。\n第五根 α=0.5，前值 101.25，所以 0.5×98+0.5×101.25=99.625。\nEMA5 第五根是 100.123457。', 'Closes 100, 102, 104, 100, 98.\nEMA3 is 100, 101, 102.5, 101.25, 99.625.\nOn bar 5, α=0.5 and the previous value is 101.25, so 0.5×98+0.5×101.25=99.625.\nEMA5 on bar 5 is 100.123457.'),
        pitfalls: [
          bi('把 EMA 当成下一根的预测价', 'Treating the EMA as the predicted price of the next bar'),
          bi('横盘里的交叉当成方向已经确定', 'Treating a cross inside a range as a decided direction')
        ],
        practice: bi('在图上把 N 从 3 改到 5，核对第五根 EMA 是否不再是 99.625。', 'On the chart, change N from 3 to 5 and check that bar 5 is no longer 99.625.'),
        check: {
          ask: bi('第五根 EMA3 会等于最新收盘 98 吗？', 'Does EMA3 on bar 5 equal the latest close, 98?'),
          options: [opt('A', '会，它会跳过去', 'Yes, it jumps there'), opt('B', '不会，它按 α 跟上一步混合', 'No, it blends with the previous value by α'), opt('C', '只有 BTC 会跳', 'Only BTC jumps')],
          answer: 'B',
          miss: bi('98 是收盘，不是 EMA。\nEMA3 第五根是 99.625。', '98 is the close, not the EMA.\nEMA3 on bar 5 is 99.625.')
        },
        quizzes: [
          quiz('EMA3 第五根是多少？', 'What is EMA3 on bar 5?', [opt('A', '99.625', '99.625'), opt('B', '98', '98'), opt('C', '101.25', '101.25')], 'A', {
            A: ['α=0.5，0.5×98+0.5×101.25=99.625。', 'α=0.5, so 0.5×98+0.5×101.25=99.625.'],
            B: ['98 是当根收盘，EMA 还保留了前值 101.25 的一半。', '98 is that bar’s close. The EMA still keeps half of the previous value, 101.25.'],
            C: ['101.25 是第四根 EMA3，第五根已经把 98 算进去了。', '101.25 is EMA3 on bar 4. Bar 5 has already mixed in 98.']
          }),
          quiz('EMA 周期短就保证信号更准？', 'Does a shorter EMA period guarantee a more accurate signal?', [opt('A', '是', 'Yes'), opt('B', '否', 'No'), opt('C', '只在 BTC 是', 'Only on BTC')], 'B', {
            A: ['周期短只代表权重更靠近最近收盘，也更容易被横盘来回交叉。', 'A short period only puts more weight on the latest close, and it also crosses back and forth more in a range.'],
            B: ['更快不等于更准。横盘里的交叉可以没有方向优势。', 'Faster does not mean more accurate. A cross in a range can have no directional edge.'],
            C: ['公式不因品种变成“更准”。BTC 同样会被横盘晃动。', 'The formula does not become “more accurate” because the asset is BTC. BTC is shaken by ranges too.']
          }),
          quiz('横盘中均线交叉可以误导吗？', 'Can a moving-average cross mislead you during a range?', [opt('A', '可以', 'Yes'), opt('B', '不可以', 'No'), opt('C', '交叉必涨', 'A cross must rise')], 'A', {
            A: ['横盘里价格围绕均线来回穿，交叉不一定带来可交易的方向。', 'In a range, price crosses the average back and forth. A cross does not have to give a tradable direction.'],
            B: ['同一套 EMA 规则在横盘里会反复交叉，所以可以误导。', 'The same EMA rule crosses repeatedly in a range, so it can mislead.'],
            C: ['交叉只说明短均线和长均线换了上下位置，不保证下一根上涨。', 'A cross only says the short and long averages swapped places. It does not guarantee the next bar rises.']
          })
        ],
        study: { kind: 'ema', closes: [100, 102, 104, 100, 98], periods: [3, 5], start: 1 }
      }),
      lesson({
        id: '02',
        title: bi('MACD：柱子缩短意味着什么', 'MACD: what a shrinking histogram means'),
        scene: bi('柱子变短的时候，价格是不是一定马上跌？', 'When the histogram shrinks, must price fall right away?'),
        one: bi('柱子是 DIF 减 DEA。柱子缩短只说明两条线在靠近，不说明价格必须下跌。', 'The histogram is DIF minus DEA. A shorter bar only means the two lines are getting closer. It does not mean price must fall.'),
        explain: bi('DIF=EMA12−EMA26。\nDEA 是 DIF 的 EMA9。\n本课柱子=DIF−DEA，不乘 2。\n有的平台把柱子画成 2×(DIF−DEA)，所以数值可以差一倍，定义不同，不是算错。\n前 26 根附近仍在预热，早期数值不稳定。', 'DIF=EMA12−EMA26.\nDEA is the EMA9 of DIF.\nIn this lesson the histogram is DIF−DEA, not multiplied by 2.\nSome platforms draw 2×(DIF−DEA), so the number can be twice as large. That is a different display definition, not a wrong calculation.\nThe values near the first 26 bars are still warming up and are unstable.'),
        example: bi('若 DIF=2.4、DEA=1.9，柱子=0.5。\n价格仍在抬高时，DIF 与 DEA 的距离也可以缩小。\n所以柱子缩短不等于价格必须下跌。', 'If DIF=2.4 and DEA=1.9, the histogram is 0.5.\nWhile price is still rising, the gap between DIF and DEA can shrink.\nSo a shrinking histogram does not mean price must fall.'),
        pitfalls: [
          bi('把柱子缩短直接当成卖出信号', 'Taking a shrinking histogram as a sell signal by itself'),
          bi('忽略平台是否把柱子乘了 2', 'Ignoring whether the platform multiplies the histogram by 2')
        ],
        practice: bi('在图上往后播放，看价格还在上升时柱子是否可以变短。', 'Step the chart forward and see whether the histogram can shrink while price is still rising.'),
        check: {
          ask: bi('DIF 2.4、DEA 1.9，按本课定义柱子是多少？', 'DIF is 2.4 and DEA is 1.9. What is the histogram in this lesson?'),
          options: [opt('A', '0.5', '0.5'), opt('B', '4.3', '4.3'), opt('C', '2.4', '2.4')],
          answer: 'A',
          miss: bi('柱子=DIF−DEA=0.5。\n4.3 是两者相加。', 'Histogram=DIF−DEA=0.5.\n4.3 is the sum of the two.')
        },
        quizzes: [
          quiz('DIF 2.4、DEA 1.9，柱子是多少？', 'DIF is 2.4 and DEA is 1.9. What is the histogram?', [opt('A', '0.5', '0.5'), opt('B', '4.3', '4.3'), opt('C', '1.9', '1.9')], 'A', {
            A: ['本课柱子=DIF−DEA=2.4−1.9=0.5。', 'In this lesson histogram=DIF−DEA=2.4−1.9=0.5.'],
            B: ['4.3 是 2.4+1.9，不是相减。', '4.3 is 2.4+1.9, not the difference.'],
            C: ['1.9 是 DEA 本身，还没有减去。', '1.9 is DEA itself. It has not been subtracted.']
          }),
          quiz('柱子缩短是不是价格一定下跌？', 'If the histogram shrinks, must price fall?', [opt('A', '一定', 'It must'), opt('B', '否', 'No'), opt('C', '只在日线一定', 'Only on the daily chart')], 'B', {
            A: ['柱子缩短只说明 DIF 与 DEA 靠近，价格仍可以继续上涨。', 'A shorter histogram only means DIF and DEA are closer. Price can still keep rising.'],
            B: ['动量变缓不等于方向已经反转。', 'Slower momentum is not the same as a reversal.'],
            C: ['公式与周期无关，日线也不保证下跌。', 'The formula does not depend on the timeframe. The daily chart does not guarantee a fall either.']
          }),
          quiz('和别的平台差一倍，最常见的原因是？', 'When another platform differs by a factor of two, what is the usual reason?', [opt('A', '柱子显示定义不同', 'The histogram display definition differs'), opt('B', '收盘价单位变了', 'The close changed units'), opt('C', 'EMA 不能相减', 'EMAs cannot be subtracted')], 'A', {
            A: ['有的软件画 DIF−DEA，有的画 2 倍。定义不同，数值就可以差一倍。', 'Some software draws DIF−DEA and some draws twice that. Different definitions can double the number.'],
            B: ['同一条收盘序列不会因为“单位”单独把柱子正好放大一倍。', 'The same close series does not double the histogram just because of a unit label.'],
            C: ['DIF 就是两条 EMA 相减，可以相减。', 'DIF is exactly the difference of two EMAs. They can be subtracted.']
          })
        ],
        study: { kind: 'macd', closes: macd, start: 26 }
      }),
      lesson({
        id: '03',
        title: bi('RSI：超买不等于立刻卖', 'RSI: overbought does not mean sell now'),
        scene: bi('RSI 到了 75，是不是必须马上卖？', 'RSI is 75. Do you have to sell immediately?'),
        one: bi('RSI 比较的是近期上涨幅度和下跌幅度。超买只说明涨得相对强，不命令你卖出。', 'RSI compares recent gains with recent losses. Overbought only says the rise has been relatively strong. It does not order you to sell.'),
        explain: bi('本课用 Wilder 的 RSI(14)。\n先把涨跌幅分成平均涨幅和平均跌幅。\nRS=平均涨幅/平均跌幅。\nRSI=100−100/(1+RS)。\n只有上涨时 RSI 可以到 100。\n涨跌都是 0 时，本课记为 50。\n样本不够 14 次变化时不显示 0，而是还不能计算。', 'This lesson uses Wilder RSI(14).\nSplit the changes into an average gain and an average loss.\nRS=average gain/average loss.\nRSI=100−100/(1+RS).\nIf price only rises, RSI can reach 100.\nIf both gain and loss are 0, this lesson records 50.\nBefore 14 changes exist, do not show 0. It cannot be calculated yet.'),
        example: bi('RSI 75 只表示近期上涨幅度相对更大。\n强趋势里它可以在 70 上方停留很多根。\n所以“超买”不是立刻卖出的命令。', 'RSI 75 only means recent gains are relatively larger.\nIn a strong trend it can stay above 70 for many bars.\nSo “overbought” is not an order to sell immediately.'),
        pitfalls: [
          bi('RSI 一过 70 就认为必须反转', 'Assuming price must reverse as soon as RSI crosses 70'),
          bi('把样本不足时的空值当成 0', 'Treating an empty value, before the sample is ready, as 0')
        ],
        practice: bi('把图播放过 14 根以后，看 RSI 是否才出现数值。', 'Step the chart past 14 bars and see that RSI gets a number only then.'),
        check: {
          ask: bi('RSI 75 直接表示什么？', 'What does RSI 75 say directly?'),
          options: [opt('A', '必须马上卖', 'You must sell now'), opt('B', '近期上涨相对更强', 'The recent rise is relatively stronger'), opt('C', '成交量创新高', 'Volume made a new high')],
          answer: 'B',
          miss: bi('RSI 用的是涨跌幅，不是成交量，也不下卖出命令。', 'RSI uses price changes, not volume, and it does not issue a sell order.')
        },
        quizzes: [
          quiz('RSI 75 表示什么？', 'What does RSI 75 mean?', [opt('A', '必须立刻卖出', 'You must sell immediately'), opt('B', '近期上涨相对强', 'The recent rise is relatively strong'), opt('C', '成交量一定放大', 'Volume must have expanded')], 'B', {
            A: ['70 以上只是强弱刻度，强趋势可以继续涨。', 'Above 70 is a strength scale. A strong trend can keep rising.'],
            B: ['RSI 高，说明这段时间上涨幅度相对下跌幅度更大。', 'A high RSI means gains in this window are larger relative to losses.'],
            C: ['RSI 公式里没有成交量。', 'The RSI formula does not contain volume.']
          }),
          quiz('强趋势可以一直停在超买区吗？', 'Can a strong trend stay in the overbought zone?', [opt('A', '能', 'Yes'), opt('B', '不能', 'No'), opt('C', '只能停一根', 'Only for one bar')], 'A', {
            A: ['价格连续上涨时，平均涨幅会压过平均跌幅，RSI 可以在高位停留。', 'When price keeps rising, average gain outweighs average loss, so RSI can stay high.'],
            B: ['没有“到了 70 就必须下一根回落”这条规则。', 'There is no rule that the next bar must fall once RSI reaches 70.'],
            C: ['停留多久取决于后面的涨跌幅，不是固定一根。', 'How long it stays depends on later changes, not a fixed single bar.']
          }),
          quiz('RSI 主要使用什么？', 'What does RSI mainly use?', [opt('A', '涨跌幅', 'Price changes'), opt('B', '成交量', 'Volume'), opt('C', '持仓量', 'Open interest')], 'A', {
            A: ['它把收盘的上涨和下跌分开平滑。', 'It smooths the up moves and down moves of the close.'],
            B: ['成交量不进入这条 RSI 公式。', 'Volume does not enter this RSI formula.'],
            C: ['持仓量是合约未平仓数量，不是 RSI 的输入。', 'Open interest is outstanding contracts, not an RSI input.']
          })
        ],
        study: { kind: 'rsi', closes: rsi75, start: 15 }
      }),
      lesson({
        id: '04',
        title: bi('布林带：缩口不负责告诉你方向', 'Bollinger Bands: a squeeze does not owe you a direction'),
        scene: bi('带子变窄之后，价格一定向上吗？', 'After the bands narrow, must price go up?'),
        one: bi('布林带用均线和标准差描述波动散开的程度。缩口只说明最近更挤，不指明方向。', 'Bollinger Bands use an average and a standard deviation to describe how spread out prices are. A squeeze only says the recent range is tighter. It does not name a direction.'),
        explain: bi('中轨是最近 N 根收盘的平均数。\n上下轨=中轨±k×标准差。\n本课标准差用这 N 根对平均数的平方差再除以 N，然后开方。\n带子变宽，表示这组收盘更分散。\n缩口之后价格既可以上破，也可以下破。', 'The middle line is the average of the last N closes.\nThe outer bands are the middle ± k times the standard deviation.\nThis lesson takes the squared differences from the average, divides by N, then takes the square root.\nA wider band means those closes are more spread out.\nAfter a squeeze, price can break up or down.'),
        example: bi('收盘 98、100、102，N=3，k=2。\n中轨=100。\n标准差=√(8/3)≈1.632993。\n上轨≈103.266。\n下轨≈96.734。', 'Closes 98, 100, 102, N=3, k=2.\nMiddle=100.\nStandard deviation=√(8/3)≈1.632993.\nUpper≈103.266.\nLower≈96.734.'),
        pitfalls: [
          bi('看见缩口就预先写好只会上涨', 'Seeing a squeeze and writing in advance that it can only rise'),
          bi('把轨道当成必到的成交价', 'Treating a band as a price that must trade')
        ],
        practice: bi('核对图上最后一根的上轨是否约为 103.266。', 'Check that the upper band on the last bar is about 103.266.'),
        check: {
          ask: bi('缩口之后方向确定了吗？', 'Is the direction decided after a squeeze?'),
          options: [opt('A', '确定向上', 'It is decided upward'), opt('B', '不保证方向', 'Direction is not guaranteed'), opt('C', '确定向下', 'It is decided downward')],
          answer: 'B',
          miss: bi('缩口描述的是波动变小，不是方向。', 'A squeeze describes smaller variation, not a direction.')
        },
        quizzes: [
          quiz('98、100、102，N=3、k=2，上轨约为多少？', 'For 98, 100, 102 with N=3 and k=2, about what is the upper band?', [opt('A', '103.266', '103.266'), opt('B', '102', '102'), opt('C', '100', '100')], 'A', {
            A: ['中轨 100，标准差约 1.633，100+2×1.633≈103.266。', 'Middle is 100, standard deviation is about 1.633, and 100+2×1.633≈103.266.'],
            B: ['102 是最后一根收盘，不是上轨。', '102 is the last close, not the upper band.'],
            C: ['100 是中轨，上轨还要加上 2 倍标准差。', '100 is the middle. The upper band still adds 2 standard deviations.']
          }),
          quiz('缩口是否保证随后上涨？', 'Does a squeeze guarantee a later rise?', [opt('A', '保证', 'It guarantees it'), opt('B', '不保证', 'It does not'), opt('C', '只保证横盘', 'It only guarantees a range')], 'B', {
            A: ['带子变窄没有方向项。上破和下破都可能。', 'A narrower band has no direction term. A break up or down is both possible.'],
            B: ['它只说明最近收盘更挤在一起。', 'It only says the recent closes are packed closer together.'],
            C: ['缩口不是承诺继续横盘，波动随后可以放大。', 'A squeeze does not promise the range continues. Variation can expand afterward.']
          }),
          quiz('带子变宽通常表示什么？', 'What does a wider band usually mean?', [opt('A', '这组价格更分散', 'These prices are more spread out'), opt('B', '方向已经向上', 'Direction is already up'), opt('C', '成交量必须增加', 'Volume must increase')], 'A', {
            A: ['标准差变大，中轨上下的距离就变宽。', 'When the standard deviation grows, the distance around the middle grows.'],
            B: ['变宽不包含上涨或下跌的符号。', 'Width does not include an up or down sign.'],
            C: ['这条公式只用收盘，不用成交量。', 'This formula uses closes only, not volume.']
          })
        ],
        study: { kind: 'boll', closes: [98, 100, 102], n: 3, k: 2, start: 3 }
      }),
      lesson({
        id: '05',
        title: bi('背离：先确认高低点', 'Divergence: confirm the highs and lows first'),
        scene: bi('价格创新高、RSI 没创新高，是不是已经反转？', 'Price made a higher high and RSI did not. Has it already reversed?'),
        one: bi('看跌背离是价格高点抬高、指标高点降低。它描述两段已经确认的摆动，不保证下一根反转。', 'Bearish divergence is a higher price high with a lower indicator high. It describes two confirmed swings. It does not guarantee the next bar reverses.'),
        explain: bi('先标记已经确认的高点和低点。\n本课要求高点右侧至少再走出 2 根，才把它当成确认摆动。\n看跌背离：价格高点更高，RSI 高点更低。\n看涨背离：价格低点更低，RSI 低点更高。\n背离之后价格仍可以顺着原方向继续走。', 'Mark highs and lows only after they are confirmed.\nThis lesson waits for at least 2 bars to the right of a high before calling it a confirmed swing.\nBearish divergence: a higher price high with a lower RSI high.\nBullish divergence: a lower price low with a higher RSI low.\nAfter divergence, price can still continue in the original direction.'),
        example: bi('若价格高点从 105 到 112，而同一段 RSI 高点从 78 到 69，关系上是看跌背离。\n这两个 RSI 必须来自同一条收盘序列，不能事后挑点。\n即便如此，后面仍可能继续上涨。', 'If price highs go from 105 to 112 while RSI highs on the same stretch go from 78 to 69, the relationship is bearish divergence.\nThose RSI values must come from the same close series. You cannot pick points afterward.\nEven then, price can still continue up.'),
        pitfalls: [
          bi('用还没走完的右侧 K 线提前标摆动', 'Marking a swing before the bars on its right have printed'),
          bi('把背离当成必然而不是一种关系', 'Treating divergence as a certainty instead of a relationship')
        ],
        practice: bi('只比较图上已经走出来的高点，不要把最后一根未确认的影线当成摆动点。', 'Compare only highs that have already printed. Do not treat the last unconfirmed wick as a swing.'),
        check: {
          ask: bi('价格更高高点，RSI 更低高点，这叫什么？', 'Price makes a higher high and RSI makes a lower high. What is that called?'),
          options: [opt('A', '看跌背离', 'Bearish divergence'), opt('B', '看涨背离', 'Bullish divergence'), opt('C', '缩口', 'A squeeze')],
          answer: 'A',
          miss: bi('看涨背离比的是低点。缩口说的是布林带宽度。', 'Bullish divergence compares lows. A squeeze talks about Bollinger width.')
        },
        quizzes: [
          quiz('价格更高高点、RSI 更低高点，是？', 'A higher price high and a lower RSI high is?', [opt('A', '看跌背离', 'Bearish divergence'), opt('B', '看涨背离', 'Bullish divergence'), opt('C', '成交量背离', 'Volume divergence')], 'A', {
            A: ['价格高点抬高，指标高点降低，这是看跌背离的定义。', 'A higher price high with a lower indicator high is the definition of bearish divergence.'],
            B: ['看涨背离看的是更低的价格低点和更高的指标低点。', 'Bullish divergence looks at a lower price low and a higher indicator low.'],
            C: ['这一对比用的是 RSI，不是成交量。', 'This comparison uses RSI, not volume.']
          }),
          quiz('出现背离后一定会反转吗？', 'Must price reverse after divergence?', [opt('A', '一定', 'It must'), opt('B', '不一定', 'Not necessarily'), opt('C', '只在 4 小时一定', 'Only on the 4-hour chart')], 'B', {
            A: ['背离是两段摆动的关系，后面可以继续原方向。', 'Divergence is a relationship between two swings. Price can continue in the same direction.'],
            B: ['它不包含“下一根必须反向”的条款。', 'It does not contain a clause that the next bar must reverse.'],
            C: ['换周期不会把一种关系变成保证。', 'Changing timeframe does not turn a relationship into a guarantee.']
          }),
          quiz('可以用还没走出来的未来 K 线提前标高点吗？', 'Can you mark a high early with future bars that have not printed?', [opt('A', '可以', 'Yes'), opt('B', '不可以提前显示', 'No, do not show it early'), opt('C', '只有练习可以', 'Only in practice')], 'B', {
            A: ['右侧 K 线还没出现时，这个高点尚未按本课规则确认。', 'Before the bars on the right exist, this high is not confirmed under this lesson’s rule.'],
            B: ['本课至少等右侧 2 根走出来，避免用未来信息挑点。', 'This lesson waits for 2 bars on the right, so you do not pick points with future information.'],
            C: ['练习和正式图用同一条确认规则。', 'Practice and the main chart use the same confirmation rule.']
          })
        ],
        study: {
          kind: 'rsi',
          bars: [
            { o: 76.4, h: 77.6, l: 75.9, c: 77 }, { o: 77, h: 82.6, l: 76.5, c: 82 }, { o: 82, h: 82.6, l: 78.5, c: 79 },
            { o: 79, h: 84.6, l: 78.5, c: 84 }, { o: 84, h: 84.6, l: 80.5, c: 81 }, { o: 81, h: 86.6, l: 80.5, c: 86 },
            { o: 86, h: 86.6, l: 82.5, c: 83 }, { o: 83, h: 88.6, l: 82.5, c: 88 }, { o: 88, h: 88.6, l: 85.5, c: 86 },
            { o: 86, h: 91.6, l: 85.5, c: 91 }, { o: 91, h: 91.6, l: 90.5, c: 91 }, { o: 91, h: 96.6, l: 90.5, c: 96 },
            { o: 96, h: 96.6, l: 95.5, c: 96 }, { o: 96, h: 101.6, l: 95.5, c: 101 }, { o: 101, h: 105, l: 100, c: 105 },
            { o: 99, h: 100, l: 96, c: 97 }, { o: 97, h: 97.6, l: 91, c: 91.5 }, { o: 91.5, h: 92.1, l: 91, c: 91.5 },
            { o: 91.5, h: 96.6, l: 91, c: 96 }, { o: 96, h: 102.1, l: 95.5, c: 101.5 }, { o: 101.5, h: 109, l: 101, c: 107 },
            { o: 107, h: 112, l: 104, c: 106 }, { o: 106, h: 106.6, l: 103.5, c: 104 }, { o: 104, h: 104.6, l: 100.5, c: 101 }
          ],
          peaks: [{ index: 14, high: 105 }, { index: 21, high: 112 }],
          start: 24
        }
      }),
      lesson({
        id: '06',
        title: bi('斐波那契：参考位不是魔法价', 'Fibonacci: a reference level is not a magic price'),
        scene: bi('价格碰到 0.618 就一定会弹回去吗？', 'Must price bounce when it touches 0.618?'),
        one: bi('斐波那契回撤只是把一段高点和低点按比例分成参考位。价格不必在那里转身。', 'A Fibonacci retracement only divides a high and a low into reference levels. Price does not have to turn there.'),
        explain: bi('先定这一段的低点 L 和高点 H。\n上涨回撤：价格=H−(H−L)×比例。\n下跌回撤：价格=L+(H−L)×比例。\n0.5 是中点，不是严格的斐波那契比例。\n锚点一改，所有价位都跟着改。', 'First fix the low L and the high H of the swing.\nFor an up retracement, price=H−(H−L)×ratio.\nFor a down retracement, price=L+(H−L)×ratio.\n0.5 is the midpoint. It is not a strict Fibonacci ratio.\nIf you move an anchor, every level moves with it.'),
        example: bi('L=100，H=140。\n0 在 140，1 在 100。\n0.236 在 130.56。\n0.382 在 124.72。\n0.5 在 120。\n0.618 在 115.28。\n0.786 在 108.56。', 'L=100 and H=140.\n0 is at 140 and 1 is at 100.\n0.236 is at 130.56.\n0.382 is at 124.72.\n0.5 is at 120.\n0.618 is at 115.28.\n0.786 is at 108.56.'),
        pitfalls: [
          bi('把 0.618 当成必须成交的反转价', 'Treating 0.618 as a reversal price that must trade'),
          bi('锚点换了却沿用旧价位', 'Keeping old prices after the anchors moved')
        ],
        practice: bi('在图上切换上涨回撤和下跌回撤，看 0.618 的价格是否改变。', 'Switch between the up and down retracement and see whether the 0.618 price changes.'),
        check: {
          ask: bi('100 到 140 的上涨回撤，0.618 在哪里？', 'For an up retracement from 100 to 140, where is 0.618?'),
          options: [opt('A', '115.28', '115.28'), opt('B', '140', '140'), opt('C', '86.48', '86.48')],
          answer: 'A',
          miss: bi('140−40×0.618=115.28。\n140 是高点本身。', '140−40×0.618=115.28.\n140 is the high itself.')
        },
        quizzes: [
          quiz('100 到 140，上涨回撤的 0.618 是？', 'From 100 to 140, what is the 0.618 up-retracement?', [opt('A', '115.28', '115.28'), opt('B', '124.72', '124.72'), opt('C', '130.56', '130.56')], 'A', {
            A: ['40×0.618=24.72，140−24.72=115.28。', '40×0.618=24.72, and 140−24.72=115.28.'],
            B: ['124.72 是 0.382，不是 0.618。', '124.72 is 0.382, not 0.618.'],
            C: ['130.56 是 0.236。', '130.56 is 0.236.']
          }),
          quiz('价格必须在 0.618 反弹吗？', 'Must price bounce at 0.618?', [opt('A', '必须', 'It must'), opt('B', '否', 'No'), opt('C', '只在整数位必须', 'Only at round numbers')], 'B', {
            A: ['这是参考比例，不是成交指令。', 'It is a reference ratio, not an order to trade.'],
            B: ['价格可以穿过、停住或根本不碰这个价。', 'Price can pass through it, pause, or never touch it.'],
            C: ['整数位同样不是必到价。', 'A round number is not a price that must be reached either.']
          }),
          quiz('锚点改变后，这些价位会动吗？', 'If an anchor changes, do these prices move?', [opt('A', '会', 'Yes'), opt('B', '不会', 'No'), opt('C', '只有 0.5 会动', 'Only 0.5 moves')], 'A', {
            A: ['每个价位都由 L 和 H 算出来，锚点变了结果就变。', 'Every price is calculated from L and H. Change an anchor and the result changes.'],
            B: ['旧锚点的价位不能继续套在新的一段上。', 'Prices from the old anchors cannot stay pasted onto a new swing.'],
            C: ['0.236、0.618 和其他比例一起变。', '0.236, 0.618, and the other ratios all move together.']
          })
        ],
        study: { kind: 'fib', closes: [100, 108, 116, 124, 132, 140, 136, 128, 120], low: 100, high: 140, start: 6 }
      }),
      lesson({
        id: '07',
        title: bi('SMC：结构标签不等于机构证据', 'SMC: a structure label is not evidence of an institution'),
        scene: bi('图上标了订单块，是不是已经证明有机构在买？', 'The chart labels an order block. Does that prove an institution is buying?'),
        one: bi('FVG、订单块这些标签来自定义好的价格规则。它们描述价格留下的空档或候选区域，不证明是谁在交易。', 'Labels such as FVG and order block come from price rules you defined. They describe a gap price left, or a candidate zone. They do not prove who traded.'),
        explain: bi('公允价值缺口看的是三根 K 线之间没有重叠的价格带。\n例如第一根高点 103，第三根低点 106，中间带是 103 到 106。\n这不是“这段没有任何人成交”。\n订单块只是按规则挑出的候选区，不是机构买单的证据。\n结构标签也不保证后面的路径。', 'A fair value gap is a price band with no overlap across three candles.\nIf the first high is 103 and the third low is 106, the band is 103 to 106.\nThat is not “nobody traded there.”\nAn order block is only a candidate zone picked by a rule. It is not evidence of an institutional buy.\nA structure label also does not guarantee the later path.'),
        example: bi('A 高 103，C 低 106，缺口带为 103–106。\n价格后来可以回补，也可以不回补。\n把这块区域叫订单块，仍然只是候选，不是成交身份证明。', 'A’s high is 103 and C’s low is 106, so the gap band is 103–106.\nPrice may fill it later, or it may not.\nCalling the zone an order block is still only a candidate. It is not proof of who traded.'),
        pitfalls: [
          bi('把缺口理解成零成交', 'Reading a gap as zero trades'),
          bi('把订单块理解成机构已经买入的证据', 'Reading an order block as proof an institution already bought')
        ],
        practice: bi('看图上的色带，说出它的上沿和下沿，并说明它不能证明的事情。', 'Look at the shaded band, name its top and bottom, and say what it cannot prove.'),
        check: {
          ask: bi('103 到 106 的缺口等于这段没有成交吗？', 'Does a 103 to 106 gap mean nothing traded there?'),
          options: [opt('A', '等于', 'Yes'), opt('B', '不是', 'No'), opt('C', '只在模拟盘等于', 'Only on a demo account')],
          answer: 'B',
          miss: bi('缺口是三根 K 线的价格带没有重叠，不是成交量为零。', 'A gap means the price bands of three candles do not overlap. It does not mean volume was zero.')
        },
        quizzes: [
          quiz('FVG 是不是表示这个区间没有成交？', 'Does an FVG mean there were no trades in that zone?', [opt('A', '是', 'Yes'), opt('B', '不是', 'No'), opt('C', '只有实体没有成交', 'Only the body had no trades')], 'B', {
            A: ['K 线只给出高低区间，给不出“这段价格无人成交”的证明。', 'A candle only gives a high-low range. It cannot prove nobody traded at those prices.'],
            B: ['103–106 只是第一根高点和第三根低点之间没有重叠的带。', '103–106 is only the band with no overlap between the first high and the third low.'],
            C: ['规则看的是高低区间的重叠，不是实体内部有没有成交。', 'The rule looks at overlap of the high-low ranges, not whether trades happened inside the body.']
          }),
          quiz('订单块能证明机构在买吗？', 'Can an order block prove an institution is buying?', [opt('A', '能', 'Yes'), opt('B', '不能', 'No'), opt('C', '标注成英文就能', 'Yes, if the label is in English')], 'B', {
            A: ['规则只能挑出候选 K 线，不能识别下单的人。', 'A rule can only pick a candidate candle. It cannot identify who placed the order.'],
            B: ['它是候选区，不是机构行为的证据。', 'It is a candidate zone, not evidence of institutional behavior.'],
            C: ['换成英文标签也不会增加证据。', 'Translating the label into English does not add evidence.']
          }),
          quiz('这些结构标签保证后面的走势吗？', 'Do these structure labels guarantee the later path?', [opt('A', '保证', 'They do'), opt('B', '不保证', 'They do not'), opt('C', '回补了才保证', 'Only after a fill')], 'B', {
            A: ['标签描述已经发生的价格结构，不锁定后面的路径。', 'A label describes price structure that already happened. It does not lock the later path.'],
            B: ['回补、延续或不碰这个区域都可能发生。', 'A fill, a continuation, or never touching the zone can all happen.'],
            C: ['回补只是后来的一种走法，不是保证条款。', 'A fill is one later path, not a guarantee clause.']
          })
        ],
        study: {
          kind: 'zone',
          bars: [
            { o: 100, h: 103, l: 99, c: 102 },
            { o: 104, h: 109, l: 103.5, c: 108 },
            { o: 108, h: 112, l: 106, c: 110 }
          ],
          zone: { low: 103, high: 106 },
          caption: bi('色带 103–106：第一根高点到第三根低点之间没有重叠。', 'Band 103–106: no overlap between the first high and the third low.'),
          start: 3
        }
      })
    ]
  };
})(window.STAR_PACK);
