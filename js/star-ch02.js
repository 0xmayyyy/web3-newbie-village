(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  var macdCloses = [138.6, 137.2, 135.8, 134.4, 133, 131.6, 130.2, 128.8, 127.4, 126, 124.6, 123.2, 121.8, 120.4, 119, 117.6, 116.2, 114.8, 113.4, 112, 110.6, 109.2, 107.8, 106.4, 108.4, 110.4, 112.4, 114.4, 116.4, 118.4, 120.4, 122.4, 124.4, 126.4, 128.4, 130.4, 132.4, 134.4, 136.4, 138.4, 140.4, 142.4, 144.4, 146.4, 145, 143.6, 142.2, 140.8, 139.4, 138, 136.6, 135.2, 133.8, 132.4, 131, 129.6, 128.2, 126.8, 125.4, 124];
  var rsi75 = [100, 103, 106, 103.5, 106.5, 104, 107, 110, 107.5, 110.5, 108, 111, 114, 117, 120, 122, 121, 124, 126, 125, 128, 130, 129, 132, 134, 133, 136, 135, 138, 140];
  P.chapters['02'] = {
    title: bi('技术指标与信号', 'Indicators and signals'),
    lessons: [
      lesson({
        id: '01',
        title: bi('EMA：均线为什么追着价格跑', 'EMA: why the average chases price'),
        scene: bi('价格刚跌下来，均线会不会马上跳到最新价？', 'Price just fell. Does the average jump to the latest price right away?'),
        one: bi('EMA 更重视最近的收盘，所以会跟着价格走，但不会在一根大阴线时瞬间跳下去。', 'An EMA weights recent closes more, so it follows price, but it does not jump down on one large red candle.'),
        explain: bi('均线是一条跟着蜡烛收盘走的平滑线。\n图上黄线是 EMA20。\nEMA20 看的是最近 20 根 K 线，越近的越重要。\n看 1 小时图时，这 20 根是小时 K 线，不是 20 天。\n蓝线是 EMA50。\nEMA50 看的是最近 50 根 K 线，走得更慢。\n它不是用来预言下一根会到哪里。\n价格突然跌下来，均线还停在上面。\n你可以把它想成跟在身后的人。\n你停下了，他还要再走几步才到。\n追得快，不等于看得更准。', 'An average is a smooth line that follows candle closes.\nThe gold line is EMA20.\nEMA20 looks at the last 20 bars, and the nearer ones matter more.\nOn a 1-hour chart those 20 bars are hours, not 20 days.\nThe blue line is EMA50.\nEMA50 looks at the last 50 bars, and it moves more slowly.\nIt is not there to predict where the next bar will go.\nWhen price drops suddenly, the average is still up above it.\nYou can think of it as a person walking behind you.\nYou stop, and he still needs a few more steps to arrive.\nFollowing faster does not mean seeing more clearly.'),
        example: bi('教学模拟：价格从大约 101 涨到大约 137，再跌到大约 107。\nEMA20 贴得更近。\nEMA50 还留在更高的地方。\n最新收盘已经下来了，两条均线都还在它上面。', 'Teaching simulation: price rises from about 101 to about 137, then falls to about 107.\nEMA20 stays closer.\nEMA50 is still higher up.\nThe latest close has already come down, and both averages are still above it.'),
        pitfalls: [
          bi('把均线当成下一根的预测价', 'Treating the average as the predicted price of the next bar'),
          bi('横盘里来回交叉，就当成方向已经确定', 'Treating a back-and-forth cross in a sideways market as a decided direction')
        ],
        practice: bi('看图里的教学模拟 K 线。最新收盘已经掉下来了，EMA20 和 EMA50 还在它上面。', 'Look at the teaching-simulation candles. The latest close has already fallen, and EMA20 and EMA50 are still above it.'),
        check: {
          ask: bi('最新这根 K 线跌下来了，EMA20 会马上变成这根收盘价吗？', 'This latest candle fell. Does EMA20 become that close right away?'),
          options: [opt('A', '会，它会跳过去', 'Yes, it jumps there'), opt('B', '不会，它还在慢慢跟上', 'No, it is still catching up'), opt('C', '只有 BTC 会跳', 'Only BTC jumps')],
          answer: 'B',
          miss: bi('收盘价是这根 K 线的价格，不是均线。\nEMA20 还停在更高的地方。', 'The close is this candle’s price, not the average.\nEMA20 is still higher up.')
        },
        quizzes: [
          quiz('1 小时图上的 EMA20 是什么意思？', 'What does EMA20 mean on a 1-hour chart?', [opt('A', '过去 20 天的简单平均', 'A simple average of the past 20 days'), opt('B', '20 根小时 K 线收盘价的指数加权均线', 'An exponentially weighted average of 20 hourly closes'), opt('C', '未来 20 小时的预测价', 'The predicted price for the next 20 hours')], 'B', {
            A: ['20 根不等于 20 天。1 小时图上的一根是一小时。', '20 bars are not 20 days. On a 1-hour chart, one bar is one hour.'],
            B: ['它把最近 20 根小时收盘做指数加权。越近的越重要。', 'It exponentially weights the last 20 hourly closes. Nearer closes matter more.'],
            C: ['EMA 是已经发生的价格的平滑，不是未来价格。', 'An EMA smooths prices that already happened. It is not a future price.']
          }),
          quiz('均线是拿来预测下一根价格的吗？', 'Is an average used to predict the next price?', [opt('A', '是', 'Yes'), opt('B', '不是', 'No'), opt('C', '只在上涨时是', 'Only while price is rising')], 'B', {
            A: ['它只描述价格已经走过的位置，不预言下一根。', 'It only describes where price has already been. It does not predict the next bar.'],
            B: ['均线跟着已经发生的价格，不是下一根的答案。', 'The average follows price that has already happened. It is not the answer for the next bar.'],
            C: ['上涨的时候它也只是跟着走，并不预告下一根。', 'While price is rising it is still only following. It does not announce the next bar.']
          }),
          quiz('横盘时均线来回交叉，能当成方向已经确定吗？', 'When averages cross back and forth in a sideways market, is the direction already decided?', [opt('A', '不能', 'No'), opt('B', '能', 'Yes'), opt('C', '交叉就一定涨', 'A cross must rise')], 'A', {
            A: ['横盘里价格围着均线来回穿，交叉不等于方向已经定了。', 'In a sideways market, price crosses the average back and forth. A cross does not mean the direction is settled.'],
            B: ['同一条均线在横盘里会反复交叉，所以不能当成方向已定。', 'The same average crosses again and again in a sideways market, so it cannot be treated as a settled direction.'],
            C: ['交叉只说明两条线换了上下位置，不保证下一根上涨。', 'A cross only says the two lines swapped places. It does not guarantee the next bar rises.']
          })
        ],
        study: { kind: 'ema', practical: 'ema', closes: [100, 102, 104, 100, 98], periods: [20, 50] }
      }),
      lesson({
        id: '02',
        title: bi('MACD：柱子缩短意味着什么', 'MACD: what a shrinking histogram means'),
        scene: bi('柱子变短的时候，价格是不是一定马上跌？', 'When the histogram shrinks, must price fall right away?'),
        one: bi('金叉是快线 DIF 上穿慢线 DEA，死叉是下穿，柱子变短也不等于价格马上跌。', 'A golden cross is the fast DIF line crossing above the slow DEA line, a death cross is a cross below, and a shorter histogram still does not mean price falls at once.'),
        explain: bi('图的上半部分是蜡烛 K 线。\n下半部分才是 MACD（12、26、9）。\n黄线 DIF 是 EMA12 减去 EMA26。\n蓝线 DEA 是 DIF 的 9 根平均，也叫信号线。\n柱子画的是两条线差多远。\n本课的柱子等于 DIF 减去 DEA，不乘 2。\n有的软件把柱子画成两倍。\n数值就可以差一倍。\n那是画法不同，不是算错。\n最前面大约 26 根还在预热。\n早期的线还不稳。\n金叉不是买入按钮。', 'The top half is candlesticks.\nThe bottom half is MACD (12, 26, 9).\nThe gold DIF line is EMA12 minus EMA26.\nThe blue DEA line is the 9-bar average of DIF, also called the signal line.\nThe bars show how far apart the two lines are.\nIn this lesson a bar equals DIF minus DEA, and it is not multiplied by 2.\nSome software draws the bar at twice that size.\nThe number can then differ by a factor of two.\nThat is a different way of drawing it, not a wrong calculation.\nAbout the first 26 bars are still warming up.\nThe early lines are not steady yet.\nA golden cross is not a buy button.'),
        topic: {
          title: bi('金叉和死叉', 'Golden cross and death cross'),
          body: bi('金叉，是快线 DIF 从下往上穿过慢线 DEA。\n死叉，是快线 DIF 从上往下穿过慢线 DEA。\n图上会把这两个点标成「金叉」和「死叉」。\n金叉不是必涨。\n死叉不是必跌。\n它们只说明两条线换了上下位置。', 'A golden cross is the fast DIF line crossing up through the slow DEA line.\nA death cross is the fast DIF line crossing down through the slow DEA line.\nThe chart marks these two points as “golden cross” and “death cross”.\nA golden cross is not a sure rise.\nA death cross is not a sure fall.\nThey only say the two lines have swapped which one is on top.')
        },
        example: bi('教学虚构：DIF 是 2.4，DEA 是 1.9。\n柱子是 0.5。\n价格还在涨的时候，两条线也可以靠近。\n所以柱子变短，不等于价格必须下跌。\n图上另有一次金叉和一次死叉，都标了名字。', 'Teaching fiction: DIF is 2.4 and DEA is 1.9.\nThe bar is 0.5.\nWhile price is still rising, the two lines can also move closer.\nSo a shorter bar does not mean price must fall.\nThe chart also has one golden cross and one death cross, and both are named.'),
        pitfalls: [
          bi('把柱子缩短直接当成卖出信号', 'Taking a shrinking histogram as a sell signal by itself'),
          bi('看见金叉就当成必涨，看见死叉就当成必跌', 'Treating a golden cross as a sure rise, or a death cross as a sure fall'),
          bi('忽略平台是否把柱子乘了 2', 'Ignoring whether the platform multiplies the histogram by 2')
        ],
        practice: bi('先在图上找到标着金叉和死叉的点，再看柱子变短时价格是不是还可能在涨。', 'First find the points marked golden cross and death cross, then see that price can still be rising when the bars get shorter.'),
        check: {
          ask: bi('教学虚构：DIF 2.4、DEA 1.9，按本课定义柱子是多少？', 'Teaching fiction: DIF is 2.4 and DEA is 1.9. What is the bar in this lesson?'),
          options: [opt('A', '0.5', '0.5'), opt('B', '4.3', '4.3'), opt('C', '2.4', '2.4')],
          answer: 'A',
          miss: bi('柱子等于 DIF 减去 DEA，是 0.5。\n4.3 是两者相加。', 'The bar equals DIF minus DEA, which is 0.5.\n4.3 is the two numbers added together.')
        },
        quizzes: [
          quiz('金叉是什么？', 'What is a golden cross?', [opt('A', '快线 DIF 上穿慢线 DEA', 'The fast DIF line crosses above the slow DEA line'), opt('B', '快线 DIF 下穿慢线 DEA', 'The fast DIF line crosses below the slow DEA line'), opt('C', '柱子变长', 'The bars get longer')], 'A', {
            A: ['快线从下往上穿过慢线，就是金叉。', 'The fast line crossing up through the slow line is a golden cross.'],
            B: ['快线从上往下穿过慢线，那是死叉。', 'The fast line crossing down through the slow line is a death cross.'],
            C: ['柱子变长只说明两条线离得更远，不是金叉的定义。', 'Longer bars only mean the two lines are farther apart. That is not the definition of a golden cross.']
          }),
          quiz('死叉是什么？', 'What is a death cross?', [opt('A', '快线 DIF 下穿慢线 DEA', 'The fast DIF line crosses below the slow DEA line'), opt('B', '快线 DIF 上穿慢线 DEA', 'The fast DIF line crosses above the slow DEA line'), opt('C', '价格一定马上跌', 'Price must fall at once')], 'A', {
            A: ['快线从上往下穿过慢线，就是死叉。', 'The fast line crossing down through the slow line is a death cross.'],
            B: ['上穿是金叉，不是死叉。', 'A cross above is a golden cross, not a death cross.'],
            C: ['死叉只说明两条线换了位置，不保证价格马上跌。', 'A death cross only says the two lines swapped places. It does not guarantee that price falls at once.']
          }),
          quiz('教学模拟：MACD 柱从 -120 变成 -40，但收盘价仍在下跌。最准确的说法是？', 'Teaching simulation: the MACD bar goes from -120 to -40, but the close is still falling. What is the most accurate statement?', [opt('A', '价格已经确认上涨', 'Price has confirmed a rise'), opt('B', '下一根一定会反弹', 'The next bar must bounce'), opt('C', '负差值在收窄，不能单独证明反转', 'The negative gap is narrowing, which alone does not prove a reversal')], 'C', {
            A: ['柱子变短只说明 DIF 和 DEA 在靠近，不是价格已经上涨。', 'A shorter bar only means DIF and DEA are closer. It is not proof that price has risen.'],
            B: ['没有“下一根必须反弹”这条规则。', 'There is no rule that the next bar must bounce.'],
            C: ['-120 到 -40 是负的差距变小。还要看上面的 K 线。', '-120 to -40 means the negative gap got smaller. You still have to look at the candles.']
          }),
          quiz('柱子缩短是不是价格一定下跌？', 'If the bars get shorter, must price fall?', [opt('A', '一定', 'It must'), opt('B', '否', 'No'), opt('C', '只在日线一定', 'Only on the daily chart')], 'B', {
            A: ['柱子变短只说明两条线在靠近，价格仍可以继续涨。', 'Shorter bars only mean the two lines are getting closer. Price can still keep rising.'],
            B: ['靠近不等于方向已经反过来。', 'Getting closer is not the same as the direction already reversing.'],
            C: ['换成日线，也不保证下跌。', 'Switching to the daily chart does not guarantee a fall either.']
          })
        ],
        study: { kind: 'macd', practical: 'macd', closes: macdCloses }
      }),
      lesson({
        id: '03',
        title: bi('RSI：超买不等于立刻卖', 'RSI: overbought does not mean sell now'),
        scene: bi('RSI 到了 75，是不是必须马上卖？', 'RSI is 75. Do you have to sell immediately?'),
        one: bi('RSI 看最近涨得多还是跌得多，超买只说明涨得相对强，并不叫你马上卖。', 'RSI looks at whether recent rises outweigh recent falls, and overbought only says the rise is relatively strong, not that you must sell now.'),
        explain: bi('上面是蜡烛 K 线，只作价格对照。\n图的主体是 RSI(14)，刻度从 0 到 100。\n它看的是最近 14 根涨跌。\n70 的横线标成超买。\n30 的横线标成超卖。\n本课用 Wilder 的平滑法。\n先把涨跌幅分成平均涨幅和平均跌幅。\nRS 是平均涨幅除以平均跌幅。\nRSI 等于 100 减去 100 除以（1 加 RS）。\n只有上涨时 RSI 可以到 100。\n涨跌都是 0 时，本课记为 50。\n样本不够 14 次变化时不显示 0，而是还不能计算。', 'The candles above are only price, for reference.\nThe main picture is RSI(14), on a scale from 0 to 100.\nIt looks at the rises and falls of the last 14 bars.\nThe line at 70 is labeled overbought.\nThe line at 30 is labeled oversold.\nThis lesson uses Wilder smoothing.\nFirst split the changes into an average gain and an average loss.\nRS is the average gain divided by the average loss.\nRSI equals 100 minus 100 divided by (1 plus RS).\nIf price only rises, RSI can reach 100.\nIf both gain and loss are 0, this lesson records 50.\nBefore 14 changes exist, do not show 0. It cannot be calculated yet.'),
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
          quiz('教学模拟：BTC 的 RSI(14) 等于 78，最准确的说法是？', 'Teaching simulation: BTC RSI(14) is 78. What is the most accurate statement?', [opt('A', '最近上涨相对强，可能停在高位，不能单凭 78 判断马上下跌', 'The recent rise is relatively strong and can stay high. 78 alone does not mean a drop is imminent'), opt('B', '一定要立刻做空', 'You must short immediately'), opt('C', '价格已经确定到顶', 'Price has definitely topped')], 'A', {
            A: ['78 只说明最近涨得相对强。强趋势里它可以一直高于 70。', '78 only says the recent rise is relatively strong. A strong trend can stay above 70.'],
            B: ['超买不是做空命令。', 'Overbought is not an order to short.'],
            C: ['没有“到了 78 就到顶”这条规则。', 'There is no rule that 78 means the top is in.']
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
        study: { kind: 'rsi', main: 'rsi', practical: 'rsi', closes: rsi75 }
      }),
      lesson({
        id: '04',
        title: bi('布林带：缩口不负责告诉你方向', 'Bollinger Bands: a squeeze does not owe you a direction'),
        scene: bi('带子变窄之后，价格一定向上吗？', 'After the bands narrow, must price go up?'),
        one: bi('布林带把均价和波动画在一起，带子变窄只说明最近更挤，不指明方向。', 'Bollinger Bands draw the average and the variation together, and a narrower band only says the recent prices are tighter, not which way they go.'),
        explain: bi('中轨是最近 20 根收盘的简单平均。\n上轨是中轨加上 2 倍总体标准差。\n下轨是中轨减去 2 倍总体标准差。\n标准差是这 20 根对平均数的偏差，平方后除以 20，再开方。\n前 19 根还没有完整的带，不显示伪造轨道。\n带子变宽，表示这组收盘更分散。\n缩口之后价格既可以上破，也可以下破。\n沿上轨走，也不等于该做空。\n收盘跑到带外，再回到带内，是另一件事。', 'The middle line is the simple average of the last 20 closes.\nThe upper band is the middle plus 2 population standard deviations.\nThe lower band is the middle minus 2 population standard deviations.\nThe standard deviation is the spread of those 20 closes around the average, squared, divided by 20, then square-rooted.\nThe first 19 bars do not have a full band, so no fake band is drawn.\nA wider band means those closes are more spread out.\nAfter a squeeze, price can break up or down.\nRiding the upper band is not an order to short.\nA close outside the band, and a later close back inside, are two different events.'),
        example: bi('教学模拟：收盘 98、100、102，N=3，k=2。\n中轨是 100。\n总体标准差是 √(8/3)，约 1.632993。\n上轨约 103.266。\n下轨约 96.734。\n图上的主图用的是 20 根，不是这 3 根小例子。', 'Teaching simulation: closes 98, 100, 102, N=3, k=2.\nThe middle is 100.\nThe population standard deviation is √(8/3), about 1.632993.\nThe upper band is about 103.266.\nThe lower band is about 96.734.\nThe main chart uses 20 bars, not this 3-close example.'),
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
          quiz('缩口是否保证随后上涨？', 'Does a squeeze guarantee a later rise?', [opt('A', '保证', 'It guarantees it'), opt('B', '不保证', 'It does not'), opt('C', '只对稳定币保证', 'It guarantees it only for stablecoins')], 'B', {
            A: ['带子变窄没有方向项。上破和下破都可能。', 'A narrower band has no direction term. A break up or down is both possible.'],
            B: ['它只说明最近收盘更挤在一起。', 'It only says the recent closes are packed closer together.'],
            C: ['稳定币这个名字不改变公式。缩口仍然没有方向。', 'The word stablecoin does not change the formula. A squeeze still has no direction.']
          }),
          quiz('带子变宽通常表示什么？', 'What does a wider band usually mean?', [opt('A', '这组价格更分散', 'These prices are more spread out'), opt('B', '方向已经向上', 'Direction is already up'), opt('C', '成交量必须增加', 'Volume must increase')], 'A', {
            A: ['标准差变大，中轨上下的距离就变宽。', 'When the standard deviation grows, the distance around the middle grows.'],
            B: ['变宽不包含上涨或下跌的符号。', 'Width does not include an up or down sign.'],
            C: ['这条公式只用收盘，不用成交量。', 'This formula uses closes only, not volume.']
          })
        ],
        study: { kind: 'boll', practical: 'boll', closes: [98, 100, 102], n: 20, k: 2 }
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
