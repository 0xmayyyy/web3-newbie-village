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
        explain: bi('均线是一条跟着蜡烛收盘走的平滑线。\n图上黄线是 EMA20。\nEMA20 看的是最近 20 根 K 线，越近的越重要。\n看 1 小时图时，这 20 根是小时 K 线，不是 20 天。\n蓝线是 EMA50。\nEMA50 看的是最近 50 根 K 线，走得更慢。\n它不是用来预言下一根会到哪里。\n价格突然跌下来，均线还停在上面。\n你可以把它想成跟在身后的人。\n你停下了，他还要再走几步才到。\n追得快，不等于看得更准。\n计算是 α=2/(N+1)。\n第一根有效值是前 N 根收盘的简单平均。\n之后每根是 α×当根收盘+(1−α)×上一根。\n不够 N 根就写数据不足，不画 0。\n本课把“靠近”定成收盘离快线不超过 0.3%。\n这是教学规则，不是买卖信号。\n后面的 K 线先藏着。\n请一根一根放出来，再自己点。', 'An average is a smooth line that follows candle closes.\nThe gold line is EMA20.\nEMA20 looks at the last 20 bars, and the nearer ones matter more.\nOn a 1-hour chart those 20 bars are hours, not 20 days.\nThe blue line is EMA50.\nEMA50 looks at the last 50 bars, and it moves more slowly.\nIt is not there to predict where the next bar will go.\nWhen price drops suddenly, the average is still up above it.\nYou can think of it as a person walking behind you.\nYou stop, and he still needs a few more steps to arrive.\nFollowing faster does not mean seeing more clearly.\nThe formula is α=2/(N+1).\nThe first valid value is the simple average of the first N closes.\nAfter that, each bar is α times this close plus (1−α) times the previous value.\nFewer than N bars says the data is not ready, and it does not draw 0.\nThis lesson calls a bar “near” when the close is within 0.3% of the fast line.\nThat is a teaching rule, not a buy or sell signal.\nLater candles stay hidden.\nReveal them one by one, then mark them yourself.'),
        example: bi('教学模拟：主图有 90 根以上的 1 小时 K 线，前面另有一段预热。\n趋势里，价格大多在两条向上的均线上方。\n其中一根收盘贴近快线。\n贴近还不是确认反弹。\n横盘里，快线和慢线会交叉不止一次。\n交叉也不等于后面一定涨。', 'Teaching simulation: the main chart has more than 90 one-hour candles, plus a warmup before them.\nIn the trend, price spends most of the time above two rising averages.\nOne close sits near the fast line.\nBeing near it is not a confirmed bounce.\nIn the sideways scene, the fast and slow lines cross more than once.\nA cross still does not mean the next move must rise.'),
        pitfalls: [
          bi('把均线当成下一根的预测价', 'Treating the average as the predicted price of the next bar'),
          bi('横盘里来回交叉，就当成方向已经确定', 'Treating a back-and-forth cross in a sideways market as a decided direction')
        ],
        practice: bi('在图上自己点。先点一段两条均线都在抬头的 K 线，再点一根离快线不超过 0.3% 的 K 线。横盘里请点出至少两次交叉。', 'Mark the chart yourself. First mark a bar where both averages are rising, then a bar within 0.3% of the fast line. In the sideways scene, mark at least two crosses.'),
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
        study: { kind: 'ema', lessonChart: 'ema-full', closes: [100, 102, 104, 100, 98], periods: [20, 50] }
      }),
      lesson({
        id: '02',
        title: bi('MACD：柱子缩短意味着什么', 'MACD: what a shrinking histogram means'),
        scene: bi('柱子变短的时候，价格是不是一定马上跌？', 'When the histogram shrinks, must price fall right away?'),
        one: bi('金叉是快线 DIF 上穿慢线 DEA，死叉是下穿，柱子变短也不等于价格马上跌。', 'A golden cross is the fast DIF line crossing above the slow DEA line, a death cross is a cross below, and a shorter histogram still does not mean price falls at once.'),
        explain: bi('图的上半部分是蜡烛 K 线。\n下半部分才是 MACD（12、26、9）。\n黄线 DIF 是 EMA12 减去 EMA26。\n蓝线 DEA 是 DIF 的 9 根平均，也叫信号线。\n柱子画的是两条线差多远。\n本课的柱子等于 DIF 减去 DEA，不乘 2。\n有的软件把柱子画成两倍。\n数值就可以差一倍。\n那是画法不同，不是算错。\n金叉是 DIF 由下向上穿过 DEA。\n死叉是 DIF 由上向下穿过 DEA。\n两根相等不算穿过。\n不够预热就写数据不足，不画 0。\n图上至少 90 根模拟 K 线。\n后面的 K 线先藏着。\n顶背离要价格的第二个高点更高，而且同一时间的 DIF 高点更低。\n只看到 DIF 下降，还不是背离。\n金叉不是买入按钮。', 'The top half is candlesticks.\nThe bottom half is MACD (12, 26, 9).\nThe gold DIF line is EMA12 minus EMA26.\nThe blue DEA line is the 9-bar average of DIF, also called the signal line.\nThe bars show how far apart the two lines are.\nIn this lesson a bar equals DIF minus DEA, and it is not multiplied by 2.\nSome software draws the bar at twice that size.\nThe number can then differ by a factor of two.\nThat is a different way of drawing it, not a wrong calculation.\nA golden cross is DIF crossing up through DEA.\nA death cross is DIF crossing down through DEA.\nEqual values are not a cross.\nBefore the warmup is done, the chart says the data is not ready and does not draw 0.\nThe chart has at least 90 simulated candles.\nLater candles stay hidden.\nA bearish divergence needs a higher price high and, at the same time, a lower DIF high.\nA falling DIF by itself is not divergence.\nA golden cross is not a buy button.'),
        topic: {
          title: bi('金叉和死叉', 'Golden cross and death cross'),
          body: bi('金叉，是快线 DIF 从下往上穿过慢线 DEA。\n死叉，是快线 DIF 从上往下穿过慢线 DEA。\n图上会把这两个点标成「金叉」和「死叉」。\n金叉不是必涨。\n死叉不是必跌。\n它们只说明两条线换了上下位置。', 'A golden cross is the fast DIF line crossing up through the slow DEA line.\nA death cross is the fast DIF line crossing down through the slow DEA line.\nThe chart marks these two points as “golden cross” and “death cross”.\nA golden cross is not a sure rise.\nA death cross is not a sure fall.\nThey only say the two lines have swapped which one is on top.')
        },
        example: bi('教学模拟：DIF 是 2.4，DEA 是 1.9。\n柱子是 0.5，不乘 2。\n零轴上方有一次金叉，只是延续候选。\n零轴下方另有一次金叉，后面仍能创新低。\n负柱变短时，收盘还可以继续跌。\n价格创新高时，DIF 的高点可以更低。\n那也不保证反转。', 'Teaching simulation: DIF is 2.4 and DEA is 1.9.\nThe bar is 0.5, and it is not doubled.\nOne golden cross is above zero. It is only a continuation candidate.\nAnother golden cross is below zero, and price can still make a new low afterward.\nWhile the negative bars get shorter, the close can keep falling.\nPrice can make a new high while the DIF high is lower.\nThat still does not guarantee a reversal.'),
        pitfalls: [
          bi('把柱子缩短直接当成卖出信号', 'Taking a shrinking histogram as a sell signal by itself'),
          bi('看见金叉就当成必涨，看见死叉就当成必跌', 'Treating a golden cross as a sure rise, or a death cross as a sure fall'),
          bi('忽略平台是否把柱子乘了 2', 'Ignoring whether the platform multiplies the histogram by 2')
        ],
        practice: bi('自己点出金叉那根 K 线。零轴上方不是买入保证。零轴下方仍可能创新低。背离要自己点两个价格高点，再点同一时间的 DIF。', 'Mark the golden-cross candle yourself. Above zero is not a buy order. Below zero, price can still make a new low. For divergence, mark two price highs, then the DIF highs at the same time.'),
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
        study: { kind: 'macd', lessonChart: 'macd-full', closes: macdCloses }
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

/* EMA lesson chart. Formula and drawing live here, not in the lab engine. */
(function (global) {
  function round2(n) { return Math.round(n * 100) / 100; }
  function ema(closes, n) {
    var out = closes.map(function () { return null; });
    n = Math.round(Number(n));
    if (n < 1 || closes.length < n) return out;
    var sum = 0;
    var i;
    for (i = 0; i < n; i++) sum += closes[i];
    var prev = sum / n;
    out[n - 1] = prev;
    var alpha = 2 / (n + 1);
    for (i = n; i < closes.length; i++) {
      prev = alpha * closes[i] + (1 - alpha) * prev;
      out[i] = prev;
    }
    return out;
  }
  function crosses(fast, slow) {
    var out = [];
    var i;
    for (i = 1; i < fast.length; i++) {
      if (fast[i] == null || slow[i] == null || fast[i - 1] == null || slow[i - 1] == null) continue;
      var prev = fast[i - 1] - slow[i - 1];
      var now = fast[i] - slow[i];
      if (prev === 0 || now === 0) continue;
      if ((prev < 0 && now > 0) || (prev > 0 && now < 0)) out.push(i);
    }
    return out;
  }
  function nearLine(close, line) {
    return line != null && line !== 0 && Math.abs(close - line) / Math.abs(line) <= 0.003;
  }
  function walk(start, steps) {
    var bars = [];
    var price = start;
    var hour = 0;
    steps.forEach(function (step) {
      var count = step[0];
      var i;
      for (i = 0; i < count; i++) {
        var delta = step[1];
        if (typeof delta === 'function') delta = delta(i, hour);
        var open = price;
        price = round2(open + delta);
        var wick = Math.max(12, Math.abs(delta) * 0.35);
        bars.push({
          t: hour,
          o: open,
          h: round2(Math.max(open, price) + wick),
          l: round2(Math.min(open, price) - wick * 0.8),
          c: price,
          v: 80 + (hour % 7) * 11
        });
        hour += 1;
      }
    });
    return bars;
  }
  function decorate(bars, visibleFrom) {
    var closes = bars.map(function (bar) { return bar.c; });
    var fast = ema(closes, 20);
    var slow = ema(closes, 50);
    var rising = [];
    var near = [];
    var crash = [];
    var i;
    for (i = visibleFrom + 1; i < bars.length; i++) {
      if (nearLine(bars[i].c, fast[i])) near.push(i);
      if (fast[i] != null && slow[i] != null && fast[i] > fast[i - 1] && slow[i] > slow[i - 1] && bars[i].c > fast[i] && bars[i].c > slow[i]) rising.push(i);
      if (fast[i] != null && fast[i - 1] != null && bars[i - 1].c > fast[i - 1] && bars[i].c < fast[i] && (fast[i] - bars[i].c) / fast[i] > 0.01) crash.push(i);
    }
    return {
      bars: bars,
      visibleFrom: visibleFrom,
      visible: bars.length - visibleFrom,
      crosses: crosses(fast, slow).filter(function (index) { return index >= visibleFrom; }),
      rising: rising,
      near: near,
      crash: crash
    };
  }
  function buildScenes() {
    var trendBars = walk(48000, [[60, 22], [96, 48]]);
    var pull = 60 + 88;
    var seeded = ema(trendBars.map(function (bar) { return bar.c; }), 20);
    trendBars[pull].c = round2(seeded[pull - 1]);
    trendBars[pull].o = trendBars[pull - 1].c;
    trendBars[pull].h = round2(Math.max(trendBars[pull].o, trendBars[pull].c) + 20);
    trendBars[pull].l = round2(Math.min(trendBars[pull].o, trendBars[pull].c) - 18);
    return {
      trend: Object.assign({ id: 'trend', zh: '趋势上行与回踩', en: 'Uptrend and pullback' }, decorate(trendBars, 60)),
      range: Object.assign({ id: 'range', zh: '震荡假交叉', en: 'Range and fake crosses' }, decorate(walk(62000, [[160, function (i) { return (Math.floor(i / 9) % 2 ? -1 : 1) * 55; }]]), 60)),
      crash: Object.assign({ id: 'crash', zh: '大阴线与滞后', en: 'Drop and lag' }, decorate(walk(50000, [[60, 20], [70, 60], [1, -2800], [25, -30]]), 60)),
      exam: Object.assign({ id: 'exam', zh: '新行情', en: 'New tape' }, decorate(walk(54000, [[60, 15], [80, 45], [1, -2200], [15, 10]]), 60))
    };
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n, d) {
    if (n == null || n !== n) return '—';
    var p = Math.pow(10, d == null ? 2 : d);
    return (Math.round(n * p) / p).toString();
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var scenes = buildScenes();
    var state = {
      scene: 'trend',
      step: 'watch',
      shown: 30,
      cursor: null,
      marks: [],
      playing: false,
      fastN: 20,
      slowN: 50,
      showFast: true,
      showSlow: true,
      showCross: false,
      showReact: false,
      hideAnswer: true,
      note: '',
      tone: '',
      examPick: '',
      examOk: false
    };
    if (root._emaTimer) clearInterval(root._emaTimer);
    root._emaTimer = null;
    function scene() { return scenes[state.scene]; }
    function maxShown() {
      var cap = scene().bars.length - scene().visibleFrom;
      if (state.step === 'exam' && !state.examOk && scene().crash.length) return Math.min(cap, scene().crash[0] - scene().visibleFrom);
      return cap;
    }
    function stop() {
      state.playing = false;
      if (root._emaTimer) clearInterval(root._emaTimer);
      root._emaTimer = null;
    }
    function prefix() {
      var current = scene();
      var end = current.visibleFrom + state.shown;
      var bars = current.bars.slice(0, end);
      var closes = bars.map(function (bar) { return bar.c; });
      return { current: current, end: end, bars: bars, fast: ema(closes, state.fastN), slow: ema(closes, state.slowN) };
    }
    function roleAt(pack, index) {
      var bar = pack.bars[index];
      var fast = pack.fast[index];
      var slow = pack.slow[index];
      var prevFast = pack.fast[index - 1];
      var prevSlow = pack.slow[index - 1];
      if (!bar || fast == null || slow == null || prevFast == null || prevSlow == null) return { ready: false };
      var prevGap = prevFast - prevSlow;
      var gap = fast - slow;
      return {
        ready: true,
        rising: fast > prevFast && slow > prevSlow && bar.c > fast && bar.c > slow,
        near: nearLine(bar.c, fast),
        cross: prevGap !== 0 && gap !== 0 && ((prevGap < 0 && gap > 0) || (prevGap > 0 && gap < 0)),
        crash: pack.bars[index - 1].c > prevFast && bar.c < fast && (fast - bar.c) / fast > 0.01,
        fast: fast,
        slow: slow,
        bar: bar
      };
    }
    function taskText() {
      var id = state.scene;
      if (state.step === 'exam') return zh ? '新行情先藏着均线。大阴线放出来之前，先判断方向，再打开均线，点那根先穿过均线的 K 线。' : 'The new tape hides the averages. Before the long red candle, judge the direction, then turn the lines on and mark the candle that crosses first.';
      if (state.step === 'judge') return zh ? '判断这一句是真是假。点错会说明原因。' : 'Decide whether this statement holds. A wrong pick explains why.';
      if (state.step === 'fail' || state.step === 'mark') {
        if (id === 'range') return zh ? '自己点出至少两次交叉。交叉只说明两线换了位置，不保证后面上涨。' : 'Mark at least two crosses yourself. A cross only says the lines swapped places.';
        if (id === 'crash') return zh ? '点出那根先穿过均线的大阴线。均线不会跟着它马上跳下去。' : 'Mark the long red candle that crosses the average first. The average does not jump with it.';
        return zh ? '先点一根两条均线都在抬头、收盘在两线上方的 K 线，再点一根收盘离快线不超过 0.3% 的 K 线。靠近还不是确认反弹。' : 'First mark a bar where both lines rise and the close is above them, then a close within 0.3% of the fast line. Near is not a confirmed bounce.';
      }
      return zh ? '先看懂。后面的 K 线还藏着，用播放或下一根放出来。点一根看收盘和两条均线。' : 'Watch first. Later candles stay hidden until you play or step. Tap a candle for the close and both averages.';
    }
    function gradeMarks(pack) {
      var roles = state.marks.map(function (index) { return roleAt(pack, index); }).filter(function (item) { return item.ready; });
      if (state.scene === 'range') {
        var found = roles.filter(function (item) { return item.cross; }).length;
        if (found >= 2) return { tone: 'is-right', text: zh ? '你标出了至少两次交叉。横盘里交叉会反复出现，不能当成后面一定涨。' : 'You marked at least two crosses. In a range they repeat, so a cross is not a promise of a rise.' };
        return { tone: '', text: zh ? '还差交叉。现在标出 ' + found + ' 次。请点快慢线严格穿过的那一根，相等不算。' : 'Not enough crosses yet. You have marked ' + found + '. Tap a bar where the lines strictly swap. Equality does not count.' };
      }
      if (state.scene === 'crash' || state.scene === 'exam') {
        if (roles.some(function (item) { return item.crash; })) return { tone: 'is-right', text: zh ? '这根收盘先穿过去了，均线还在上面慢慢变。EMA 不能预测这根突发下跌，也不是卖出按钮。' : 'This close crossed first. The average is still catching up. EMA does not predict this drop, and it is not a sell button.' };
        return { tone: '', text: zh ? '还没点到那根大阴线。它的收盘穿过快线，快线仍离收盘超过 1%。' : 'That is not the long red candle yet. Its close crosses the fast line, and the line stays more than 1% away.' };
      }
      var hasRise = roles.some(function (item) { return item.rising; });
      var hasNear = roles.some(function (item) { return item.near; });
      if (hasRise && hasNear) return { tone: 'is-right', text: zh ? '抬头区和靠近的 K 线都点到了。靠近快线只说明距离不超过 0.3%，不是确认反弹，也不是买入。' : 'You marked both a rising stretch and a near bar. Within 0.3% only says it is close. It is not a confirmed bounce or a buy.' };
      if (!hasRise) return { tone: '', text: zh ? '还缺抬头区：两条线都比前一根高，并且收盘在两条线上方。' : 'Still missing a rising bar: both lines higher than the previous bar, and the close above both.' };
      return { tone: '', text: zh ? '还缺回踩：|收盘−快线|/快线 ≤ 0.3%。这是本课规则，不是行业通用信号。' : 'Still missing the pullback: |close − fast line| / fast line ≤ 0.3%. This is a lesson rule, not an industry signal.' };
    }
    function readout(pack) {
      if (state.cursor == null) return '';
      var bar = pack.bars[state.cursor];
      if (!bar) return '';
      var fast = pack.fast[state.cursor];
      var slow = pack.slow[state.cursor];
      var prev = pack.fast[state.cursor - 1];
      var fastText = fast == null ? (zh ? '数据不足' : 'not ready') : fmt(fast, 2);
      var slowText = slow == null ? (zh ? '数据不足' : 'not ready') : fmt(slow, 2);
      var delta = fast == null || prev == null ? (zh ? '数据不足' : 'not ready') : fmt(fast - prev, 2);
      var when = zh ? '第 ' + (state.cursor - pack.current.visibleFrom + 1) + ' 根' : 'Bar ' + (state.cursor - pack.current.visibleFrom + 1);
      return when + (zh ? ' · 模拟 1 小时' : ' · simulated 1h') +
        '<br>' + (zh ? '开 ' : 'O ') + fmt(bar.o, 2) + (zh ? ' 高 ' : ' H ') + fmt(bar.h, 2) + (zh ? ' 低 ' : ' L ') + fmt(bar.l, 2) + (zh ? ' 收 ' : ' C ') + fmt(bar.c, 2) + (zh ? ' 量 ' : ' V ') + bar.v +
        '<br>EMA' + state.fastN + ' ' + fastText + (zh ? '，较前一根 ' : ', change ') + delta +
        '<br>EMA' + state.slowN + ' ' + slowText;
    }
    function paint() {
      var pack = prefix();
      var from = pack.current.visibleFrom;
      var draw = pack.bars.slice(from);
      var w = 980;
      var h = 390;
      var padL = 10;
      var padR = 74;
      var top = 16;
      var priceH = 248;
      var vals = [];
      draw.forEach(function (bar, i) {
        vals.push(bar.h, bar.l);
        var abs = from + i;
        if (state.showFast && pack.fast[abs] != null) vals.push(pack.fast[abs]);
        if (state.showSlow && pack.slow[abs] != null) vals.push(pack.slow[abs]);
      });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      if (min === max) { min -= 1; max += 1; }
      var span = max - min;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * priceH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (zh ? '模拟BTC蜡烛与两条EMA' : 'Simulated BTC candles and two EMAs') + '">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      var g;
      for (g = 0; g < 4; g++) {
        var price = min + (max - min) * g / 3;
        var gy = y(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="rgba(230,199,158,.18)"></line>');
        bits.push('<text x="' + (w - 8) + '" y="' + (gy + 4) + '" text-anchor="end" fill="#d4bc9e" font-size="13">' + fmt(price, 0) + '</text>');
      }
      var volMax = 1;
      draw.forEach(function (bar) { if (bar.v > volMax) volMax = bar.v; });
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(2.4, slot * 0.58);
        var bodyTop = Math.min(y(bar.o), y(bar.c));
        var bh = Math.max(1.4, Math.abs(y(bar.c) - y(bar.o)));
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.3"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + bodyTop + '" width="' + bw + '" height="' + bh + '" fill="' + color + '"></rect>');
        var vh = Math.max(1, bar.v / volMax * 48);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + (348 - vh) + '" width="' + bw + '" height="' + vh + '" fill="' + color + '" opacity="0.85"></rect>');
        if (i % 16 === 0) bits.push('<text x="' + xc + '" y="376" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
        var abs = from + i;
        if (state.marks.indexOf(abs) >= 0) bits.push('<circle cx="' + xc + '" cy="' + y(bar.h) + '" r="5" fill="none" stroke="#f4cb82" stroke-width="2"></circle>');
        if (!state.hideAnswer && state.showCross && roleAt(pack, abs).cross) bits.push('<polygon points="' + xc + ',' + (y(bar.l) + 12) + ' ' + (xc - 5) + ',' + (y(bar.l) + 22) + ' ' + (xc + 5) + ',' + (y(bar.l) + 22) + '" fill="#f0d59a"></polygon>');
        if (!state.hideAnswer && state.showReact && roleAt(pack, abs).near) bits.push('<circle cx="' + xc + '" cy="' + y(bar.c) + '" r="4" fill="none" stroke="#ffffff" stroke-width="1.4"></circle>');
        if (state.cursor === abs) bits.push('<line x1="' + xc + '" y1="' + top + '" x2="' + xc + '" y2="' + (top + priceH) + '" stroke="rgba(255,255,255,.45)" stroke-dasharray="3 3"></line>');
      });
      function poly(series, color, dash) {
        var pts = [];
        draw.forEach(function (bar, i) {
          var value = series[from + i];
          if (value != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + y(value).toFixed(1));
        });
        if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.4"' + (dash ? ' stroke-dasharray="7 4"' : '') + '></polyline>');
      }
      if (state.showFast) poly(pack.fast, '#f4cb82', false);
      if (state.showSlow) poly(pack.slow, '#8eb4ff', true);
      draw.forEach(function (bar, i) {
        var abs = from + i;
        bits.push('<rect data-bar="' + abs + '" x="' + (padL + i * slot) + '" y="' + top + '" width="' + slot + '" height="' + (priceH + 8) + '" fill="transparent" style="cursor:pointer"></rect>');
      });
      bits.push('</svg>');
      var steps = [
        ['watch', zh ? '看懂' : 'Watch'],
        ['mark', zh ? '自己标记' : 'Mark'],
        ['judge', zh ? '判断真假' : 'True or false'],
        ['fail', zh ? '失败案例' : 'Failure'],
        ['exam', zh ? '新行情考试' : 'New tape']
      ];
      var scenesBtns = ['trend', 'range', 'crash'].map(function (id) {
        var item = scenes[id];
        return '<button type="button" data-scene="' + id + '" aria-pressed="' + (state.scene === id) + '">' + esc(zh ? item.zh : item.en) + '</button>';
      }).join('');
      var judge = '';
      if (state.step === 'judge') {
        var q = state.scene === 'range'
          ? { ask: zh ? '快线上穿慢线，但价格在窄幅来回。能否直接判定随后上涨？' : 'The fast line crosses above the slow line while price chops. Can you decide that price must then rise?', answer: 'A', options: [['A', zh ? '不能，交叉可能反复' : 'No, crosses can repeat'], ['B', zh ? '能，金叉必涨' : 'Yes, a cross must rise'], ['C', zh ? '只有第一根算' : 'Only the first one counts']] }
          : state.scene === 'crash'
            ? { ask: zh ? '大阴线已经穿过均线。均线有没有马上变成这根收盘价？' : 'The long red candle has crossed the average. Did the average become that close at once?', answer: 'B', options: [['A', zh ? '有，它会跳过去' : 'Yes, it jumps there'], ['B', zh ? '没有，它还在慢慢跟上' : 'No, it is still catching up'], ['C', zh ? '只有慢线会跳' : 'Only the slow line jumps']] }
            : { ask: zh ? '收盘离快线不到 0.3%。这是不是已经确认反弹？' : 'The close is within 0.3% of the fast line. Is the bounce already confirmed?', answer: 'B', options: [['A', zh ? '已经确认，可以买' : 'Yes, it is confirmed'], ['B', zh ? '还没有，靠近和确认不是同一件事' : 'No. Near and confirmed are different'], ['C', zh ? '只有跌破才算靠近' : 'Only a break below counts as near']] };
        judge = '<p>' + esc(q.ask) + '</p><div class="a1-modes">' + q.options.map(function (opt) {
          return '<button type="button" data-judge="' + opt[0] + '" data-answer="' + q.answer + '">' + opt[0] + '. ' + esc(opt[1]) + '</button>';
        }).join('') + '</div>';
      }
      var exam = '';
      if (state.step === 'exam' && !state.examOk) {
        exam = '<p>' + (zh ? '先别看均线。已经放出来的这段，主要方向是？' : 'Leave the averages off. What is the main direction of the candles shown so far?') + '</p><div class="a1-modes">' +
          '<button type="button" data-trend="up">' + (zh ? '上涨' : 'Rising') + '</button>' +
          '<button type="button" data-trend="flat">' + (zh ? '横盘' : 'Sideways') + '</button>' +
          '<button type="button" data-trend="down">' + (zh ? '下跌' : 'Falling') + '</button></div>';
      }
      if (state.step === 'exam' && state.examOk) {
        exam = '<div class="a1-modes"><button type="button" data-lines="1" aria-pressed="' + (state.showFast && state.showSlow) + '">' + (zh ? '打开 EMA 核对' : 'Turn EMA on') + '</button></div>';
      }
      var note = state.note || readout(pack) || taskText();
      root.innerHTML =
        '<div class="a1">' +
        '<p class="a1-flag">' + (zh ? '模拟，不是实时行情。教学虚构，不是投资建议。' : 'Simulated, not a live price. Teaching fiction, not investment advice.') + '</p>' +
        '<div class="a1-modes">' + steps.map(function (item) {
          return '<button type="button" data-step="' + item[0] + '" aria-pressed="' + (state.step === item[0]) + '">' + item[1] + '</button>';
        }).join('') + '</div>' +
        '<div class="a1-modes">' + scenesBtns + '</div>' +
        '<p>' + esc(taskText()) + '</p>' +
        '<div class="a1-modes">' +
        '<button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="-1">' + (zh ? '上一根' : 'Previous') + '</button>' +
        '<button type="button" data-move="1">' + (zh ? '下一根' : 'Next') + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重置' : 'Reset') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + (zh ? '，后面先隐藏' : ', later bars hidden') + '</span></div>' +
        '<div class="a1-fields">' +
        '<label>EMA <input data-n="fast" type="number" min="5" max="200" value="' + state.fastN + '"></label>' +
        '<label>EMA <input data-n="slow" type="number" min="5" max="200" value="' + state.slowN + '"></label>' +
        '<button type="button" data-layer="fast" aria-pressed="' + state.showFast + '">' + (zh ? '快线' : 'Fast') + '</button>' +
        '<button type="button" data-layer="slow" aria-pressed="' + state.showSlow + '">' + (zh ? '慢线' : 'Slow') + '</button>' +
        '<button type="button" data-layer="both" aria-pressed="' + (state.showFast && state.showSlow) + '">' + (zh ? '双线' : 'Both') + '</button>' +
        '<button type="button" data-layer="cross" aria-pressed="' + state.showCross + '">' + (zh ? '标出交叉' : 'Show crosses') + '</button>' +
        '<button type="button" data-layer="react" aria-pressed="' + state.showReact + '">' + (zh ? '显示靠近' : 'Show near bars') + '</button>' +
        '<button type="button" data-layer="hide" aria-pressed="' + state.hideAnswer + '">' + (state.hideAnswer ? (zh ? '答案隐藏中' : 'Answers hidden') : (zh ? '答案已显示' : 'Answers shown')) + '</button></div>' +
        '<div class="ema-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>EMA' + state.fastN + '</span><span><i style="background:#8eb4ff"></i>EMA' + state.slowN + (zh ? ' 虚线' : ' dashed') + '</span><span><i style="background:#1f8a4d"></i>' + (zh ? '阳线' : 'Up') + '</span><span><i style="background:#d4534e"></i>' + (zh ? '阴线' : 'Down') + '</span></p>' +
        judge + exam +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '公式：α=2/(N+1)。种子是前 N 根收盘的简单平均，之后 EMA=α×收盘+(1−α)×上一根 EMA。不够 N 根显示数据不足，不画 0。靠近的教学规则是 |收盘−快线|/快线≤0.3%，不是通用买卖信号。成交量在 K 线下方。'
          : 'Formula: α=2/(N+1). The seed is the simple average of the first N closes, then EMA=α×close+(1−α)×previous EMA. Fewer than N bars says not ready, and does not draw 0. A near bar means |close−fast|/fast≤0.3%. That is a teaching rule, not a general signal. Volume sits under the candles.') + '</p></div>';
    }
    function setShown(next) {
      state.shown = Math.max(1, Math.min(maxShown(), next));
      if (state.cursor != null && state.cursor >= scene().visibleFrom + state.shown) state.cursor = null;
    }
    function enter(step) {
      stop();
      state.step = step;
      state.marks = [];
      state.cursor = null;
      state.note = '';
      state.tone = '';
      state.examPick = '';
      state.examOk = false;
      if (step === 'fail') {
        state.scene = state.scene === 'range' ? 'crash' : 'range';
        state.hideAnswer = true;
        state.showCross = false;
        state.showFast = true;
        state.showSlow = true;
      }
      if (step === 'exam') {
        state.scene = 'exam';
        state.hideAnswer = true;
        state.showFast = false;
        state.showSlow = false;
        state.shown = Math.max(1, (scene().crash[0] || scene().visibleFrom + 30) - scene().visibleFrom);
      } else if (step !== 'fail') {
        if (state.scene === 'exam') state.scene = 'trend';
        state.shown = 30;
        state.showFast = true;
        state.showSlow = true;
      } else {
        state.shown = 30;
      }
      paint();
    }
    if (root._emaClick) root.removeEventListener('click', root._emaClick);
    root._emaClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-step],[data-scene],[data-move],[data-layer],[data-bar],[data-judge],[data-trend],[data-lines]') : null;
      if (!el || !root.contains(el)) return;
      if (el.hasAttribute('data-step')) { enter(el.getAttribute('data-step')); return; }
      if (el.hasAttribute('data-scene')) {
        stop();
        state.scene = el.getAttribute('data-scene');
        state.step = 'mark';
        state.marks = [];
        state.note = '';
        state.tone = '';
        state.shown = 30;
        state.showFast = true;
        state.showSlow = true;
        paint();
        return;
      }
      if (el.hasAttribute('data-move')) {
        var move = el.getAttribute('data-move');
        if (move === 'play') {
          if (state.playing) { stop(); paint(); return; }
          state.playing = true;
          root._emaTimer = setInterval(function () {
            if (!root.isConnected) { stop(); return; }
            if (state.shown >= maxShown()) { stop(); paint(); return; }
            setShown(state.shown + 1);
            paint();
          }, 280);
          paint();
          return;
        }
        if (move === 'reset') {
          stop();
          state.marks = [];
          state.cursor = null;
          state.note = '';
          state.tone = '';
          state.shown = state.step === 'exam' ? Math.max(1, (scene().crash[0] || 0) - scene().visibleFrom) : 30;
          paint();
          return;
        }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      if (el.hasAttribute('data-layer')) {
        var layer = el.getAttribute('data-layer');
        if (layer === 'fast') state.showFast = !state.showFast;
        if (layer === 'slow') state.showSlow = !state.showSlow;
        if (layer === 'both') { state.showFast = true; state.showSlow = true; }
        if (layer === 'cross') state.showCross = !state.showCross;
        if (layer === 'react') state.showReact = !state.showReact;
        if (layer === 'hide') state.hideAnswer = !state.hideAnswer;
        paint();
        return;
      }
      if (el.hasAttribute('data-bar')) {
        var index = Number(el.getAttribute('data-bar'));
        state.cursor = index;
        if (state.step === 'mark' || state.step === 'fail' || (state.step === 'exam' && state.examOk)) {
          var at = state.marks.indexOf(index);
          if (at >= 0) state.marks.splice(at, 1);
          else state.marks.push(index);
          if (state.step === 'exam' && (!state.examOk || !(state.showFast && state.showSlow))) {
            state.note = zh ? '先判断方向，再打开两条均线，然后点那根大阴线。' : 'Judge the direction, turn both lines on, then mark the long red candle.';
            state.tone = '';
          } else {
            var graded = gradeMarks(prefix());
            state.note = graded.text;
            state.tone = graded.tone;
          }
        } else {
          state.note = '';
          state.tone = '';
        }
        paint();
        return;
      }
      if (el.hasAttribute('data-judge')) {
        var pick = el.getAttribute('data-judge');
        var answer = el.getAttribute('data-answer');
        var right = pick === answer;
        state.tone = right ? 'is-right' : 'is-wrong';
        state.note = right
          ? (zh ? '对。这只说明你看懂了定义，不是叫你下单。' : 'Correct. That only means the definition is clear. It is not an order.')
          : (answer === 'A'
            ? (zh ? '不对。窄幅里的上穿会反复出现，不能直接判定随后上涨。' : 'No. An upward cross in a narrow range can repeat. It does not decide a later rise.')
            : (zh ? '不对。靠近、穿过，都还不是下一根的保证。' : 'No. Being near, or crossing, is still not a promise about the next bar.'));
        paint();
        return;
      }
      if (el.hasAttribute('data-trend')) {
        var trend = el.getAttribute('data-trend');
        state.examPick = trend;
        state.examOk = trend === 'up';
        state.tone = state.examOk ? 'is-right' : 'is-wrong';
        state.note = state.examOk
          ? (zh ? '对。放出来的这一段收盘在抬高。这只是已经发生的方向，不是下一根必涨。可以打开均线了。' : 'Correct. The candles shown so far close higher. That is the past direction, not a promise for the next bar. You can turn the averages on.')
          : (zh ? '先看已经放出来的这些阳线。收盘整体在抬高，还没到后面那根大阴线。' : 'Look at the candles already shown. The closes are rising. The long red candle is still hidden.');
        paint();
        return;
      }
      if (el.hasAttribute('data-lines')) {
        state.showFast = true;
        state.showSlow = true;
        state.note = zh ? '均线打开了。把后面的 K 线放出来，点那根收盘先穿过、均线还没跟上的大阴线。' : 'The averages are on. Reveal the later candles and mark the one whose close crosses while the average lags.';
        paint();
      }
    };
    root.addEventListener('click', root._emaClick);
    if (root._emaChange) root.removeEventListener('change', root._emaChange);
    root._emaChange = function (ev) {
      var input = ev.target;
      if (!input || !input.getAttribute || !input.getAttribute('data-n')) return;
      var value = Math.max(5, Math.min(200, Math.round(Number(input.value) || 20)));
      if (input.getAttribute('data-n') === 'fast') state.fastN = value;
      else state.slowN = value;
      state.marks = [];
      state.note = zh ? '周期已改成 ' + value + '，两条线按同一条公式重算。之前的标记清掉了。' : 'Period is now ' + value + '. Both lines were recalculated with the same formula. Earlier marks were cleared.';
      state.tone = '';
      paint();
    };
    root.addEventListener('change', root._emaChange);
    if (root._emaKey) root.removeEventListener('keydown', root._emaKey);
    root.tabIndex = 0;
    root._emaKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      setShown(state.shown + (ev.key === 'ArrowRight' ? 1 : -1));
      paint();
    };
    root.addEventListener('keydown', root._emaKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._emaWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'ema-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._emaWrapped = true;
  }
  global.STAR_CH02_EMA = { ema: ema, crosses: crosses, nearLine: nearLine, buildScenes: buildScenes, mount: mount };
})(typeof window !== 'undefined' ? window : global);

/* MACD lesson chart. Formula and drawing live here, not in the lab engine. */
(function (global) {
  function ema(closes, n) {
    var out = closes.map(function () { return null; });
    if (n < 1 || closes.length < n) return out;
    var sum = 0;
    var i;
    for (i = 0; i < n; i++) sum += closes[i];
    var prev = sum / n;
    out[n - 1] = prev;
    var alpha = 2 / (n + 1);
    for (i = n; i < closes.length; i++) {
      prev = alpha * closes[i] + (1 - alpha) * prev;
      out[i] = prev;
    }
    return out;
  }
  function macd(closes) {
    var fast = ema(closes, 12);
    var slow = ema(closes, 26);
    var dif = closes.map(function (_, i) { return fast[i] == null || slow[i] == null ? null : fast[i] - slow[i]; });
    var dea = dif.map(function () { return null; });
    var idx = [];
    dif.forEach(function (value, i) { if (value != null) idx.push(i); });
    if (idx.length >= 9) {
      var sum = 0;
      var j;
      for (j = 0; j < 9; j++) sum += dif[idx[j]];
      var prev = sum / 9;
      dea[idx[8]] = prev;
      var alpha = 2 / 10;
      for (j = 9; j < idx.length; j++) {
        prev = alpha * dif[idx[j]] + (1 - alpha) * prev;
        dea[idx[j]] = prev;
      }
    }
    var hist = dif.map(function (value, i) { return value == null || dea[i] == null ? null : value - dea[i]; });
    return { fast: fast, slow: slow, dif: dif, dea: dea, hist: hist };
  }
  function walk(start, steps) {
    var bars = [];
    var price = start;
    var hour = 0;
    steps.forEach(function (step) {
      var i;
      for (i = 0; i < step[0]; i++) {
        var open = price;
        price = Math.round((open + step[1]) * 100) / 100;
        var wick = Math.max(12, Math.abs(step[1]) * 0.35);
        bars.push({
          t: hour,
          o: open,
          h: Math.round((Math.max(open, price) + wick) * 100) / 100,
          l: Math.round((Math.min(open, price) - wick * 0.8) * 100) / 100,
          c: price,
          v: 80 + (hour % 7) * 11
        });
        hour += 1;
      }
    });
    return bars;
  }
  function swingHighs(bars, from) {
    var out = [];
    var i;
    for (i = Math.max(from, 3); i < bars.length - 3; i++) {
      var ok = true;
      var k;
      for (k = 1; k <= 3; k++) if (bars[i].h < bars[i - k].h || bars[i].h < bars[i + k].h) ok = false;
      if (ok) out.push(i);
    }
    return out;
  }
  function decorate(bars) {
    var pack = macd(bars.map(function (bar) { return bar.c; }));
    var from = 60;
    var gold = [];
    var death = [];
    var shrink = [];
    var zero = [];
    var i;
    for (i = from + 1; i < bars.length; i++) {
      if (pack.hist[i] == null || pack.hist[i - 1] == null) continue;
      var prev = pack.dif[i - 1] - pack.dea[i - 1];
      var now = pack.dif[i] - pack.dea[i];
      if (prev !== 0 && now !== 0 && prev < 0 && now > 0) gold.push(i);
      if (prev !== 0 && now !== 0 && prev > 0 && now < 0) death.push(i);
      if (pack.hist[i] < 0 && pack.hist[i - 1] < 0 && pack.hist[i] > pack.hist[i - 1] && bars[i].c < bars[i - 1].c) shrink.push(i);
      if (pack.dif[i - 1] !== 0 && pack.dif[i] !== 0 && ((pack.dif[i - 1] < 0 && pack.dif[i] > 0) || (pack.dif[i - 1] > 0 && pack.dif[i] < 0))) zero.push(i);
    }
    return {
      bars: bars,
      visibleFrom: from,
      visible: bars.length - from,
      gold: gold,
      death: death,
      shrink: shrink,
      zero: zero,
      highs: swingHighs(bars, from),
      macd: pack
    };
  }
  function buildScenes() {
    return {
      above: Object.assign({ id: 'above', zh: '零轴上金叉', en: 'Golden cross above zero' }, decorate(walk(50000, [[70, 45], [16, -30], [40, 40], [20, 15], [12, 10]]))),
      fail: Object.assign({ id: 'fail', zh: '零轴下金叉', en: 'Golden cross below zero' }, decorate(walk(68000, [[50, 10], [40, -80], [18, 130], [30, -70], [20, -40]]))),
      shrink: Object.assign({ id: 'shrink', zh: '负柱缩短', en: 'Negative bars shrink' }, decorate(walk(80000, [[50, -20], [30, -90], [40, -8], [36, -6]]))),
      div: Object.assign({ id: 'div', zh: '顶背离', en: 'Bearish divergence' }, decorate(walk(40000, [[60, 8], [28, 100], [14, -45], [24, 40], [16, -12], [14, -8]]))),
      fake: Object.assign({ id: 'fake', zh: '假背离', en: 'Fake divergence' }, decorate(walk(42000, [[60, 8], [28, 90], [16, -50], [18, 25], [16, -10], [16, -8]]))),
      exam: Object.assign({ id: 'exam', zh: '新行情', en: 'New tape' }, decorate(walk(46000, [[55, 12], [30, 85], [12, -35], [26, 32], [18, -70], [20, -25]])))
    };
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n) {
    if (n == null || n !== n) return '—';
    return (Math.round(n * 100) / 100).toString();
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var scenes = buildScenes();
    var state = {
      scene: 'above',
      step: 'watch',
      shown: 28,
      cursor: null,
      playing: false,
      showFast: true,
      showSlow: false,
      showDif: true,
      showDea: true,
      showHist: true,
      showCross: true,
      hideAnswer: false,
      useHist: false,
      pricePts: [],
      macdPts: [],
      note: '',
      tone: '',
      examStage: 'cross'
    };
    if (root._macdTimer) clearInterval(root._macdTimer);
    root._macdTimer = null;
    function scene() { return scenes[state.scene]; }
    function maxShown() { return scene().bars.length - scene().visibleFrom; }
    function stop() {
      state.playing = false;
      if (root._macdTimer) clearInterval(root._macdTimer);
      root._macdTimer = null;
    }
    function prefix() {
      var current = scene();
      var end = current.visibleFrom + state.shown;
      var bars = current.bars.slice(0, end);
      return { current: current, end: end, bars: bars, macd: macd(bars.map(function (bar) { return bar.c; })) };
    }
    function kindAt(pack, index) {
      var m = pack.macd;
      if (index < 1 || m.hist[index] == null || m.hist[index - 1] == null) return '';
      var prev = m.dif[index - 1] - m.dea[index - 1];
      var now = m.dif[index] - m.dea[index];
      if (prev === 0 || now === 0) return '';
      if (prev < 0 && now > 0) return 'gold';
      if (prev > 0 && now < 0) return 'death';
      return '';
    }
    function shrinkAt(pack, index) {
      var m = pack.macd;
      var bar = pack.bars[index];
      var prev = pack.bars[index - 1];
      return !!(bar && prev && m.hist[index] != null && m.hist[index] < 0 && m.hist[index - 1] < 0 && m.hist[index] > m.hist[index - 1] && bar.c < prev.c);
    }
    function confirmedHigh(pack, index) {
      if (index < 3 || index + 3 >= pack.bars.length) return false;
      var k;
      for (k = 1; k <= 3; k++) if (pack.bars[index].h < pack.bars[index - k].h || pack.bars[index].h < pack.bars[index + k].h) return false;
      return true;
    }
    function taskText() {
      if (state.step === 'exam') {
        if (state.examStage === 'cross') return zh ? '新行情不标答案。先把 K 线放出来，点出 DIF 仍在零轴上方的那次金叉。' : 'The new tape hides the labels. Reveal the candles and mark the golden cross that is still above zero.';
        if (state.examStage === 'zero') return zh ? '再点一根 DIF 在零轴下方的 K 线，看它从哪根穿过去。' : 'Now mark a candle whose DIF is below zero, and see where it crossed.';
        return zh ? '再点两个价格高点，然后在副图点同一时间附近的 DIF 高点。第二处价格要更高，DIF 要更低，才是本课的顶背离。' : 'Mark two price highs, then the nearby DIF highs. The later price high must be higher and the DIF high lower.';
      }
      if (state.step === 'judge') return zh ? '判断这一句。点错会说明原因。' : 'Judge this statement. A wrong pick explains why.';
      if (state.scene === 'fail') return zh ? '点出零轴下方的金叉。它和前面的下跌是矛盾的，后面仍可能创新低。' : 'Mark the golden cross below zero. It disagrees with the decline, and price can still make a new low.';
      if (state.scene === 'shrink') return zh ? '点一根负柱比前一根短、收盘却仍在跌的 K 线。柱子变短不是价格已经上涨。' : 'Mark a candle whose negative bar is shorter while the close is still falling.';
      if (state.scene === 'div' || state.scene === 'fake') return zh ? '先在主图点两个价格高点，再在副图点对应的 DIF 高点。时间要对上。改成比柱子时，旧的副图点会清掉。' : 'Mark two price highs, then the matching DIF highs. The times have to line up. Switching to the histogram clears the lower points.';
      return zh ? '看懂金叉和死叉。后面的 K 线先藏着。点一根，上下一起看收盘、DIF、DEA 和柱子。' : 'Watch the golden and death crosses. Later candles stay hidden. Tap one candle to read the close, DIF, DEA, and the bar together.';
    }
    function gradeDivergence(pack) {
      if (state.pricePts.length < 2 || state.macdPts.length < 2) {
        return { tone: '', text: zh ? '价格高点 ' + state.pricePts.length + '/2，副图点 ' + state.macdPts.length + '/2。' : 'Price highs ' + state.pricePts.length + '/2, lower points ' + state.macdPts.length + '/2.' };
      }
      var price = state.pricePts.slice().sort(function (a, b) { return a - b; });
      var macdPts = state.macdPts.slice().sort(function (a, b) { return a - b; });
      if (!confirmedHigh(pack, price[0]) || !confirmedHigh(pack, price[1])) {
        return { tone: 'is-wrong', text: zh ? '有一根还不能算摆动高点。左右各 3 根都要更低，而且右边 3 根要已经放出来。' : 'One mark is not a confirmed swing high. Three bars on each side must be lower, and the later three must already be shown.' };
      }
      if (Math.abs(macdPts[0] - price[0]) > 2 || Math.abs(macdPts[1] - price[1]) > 2) {
        return { tone: 'is-wrong', text: zh ? '时间窗口不对应。副图的点要和价格高点在同一根，或左右不超过 2 根。' : 'The time windows do not match. Each lower point must be on the same bar as a price high, or within 2 bars.' };
      }
      if (!(pack.bars[price[1]].h > pack.bars[price[0]].h)) {
        return { tone: state.scene === 'fake' ? 'is-right' : 'is-wrong', text: zh ? '第二价格高点没有更高，所以这不是本课的顶背离。只看到指标下降还不够。' : 'The second price high is not higher, so this is not bearish divergence in this lesson. A falling indicator is not enough.' };
      }
      var series = state.useHist ? pack.macd.hist : pack.macd.dif;
      var name = state.useHist ? (zh ? '柱子' : 'histogram') : 'DIF';
      if (series[macdPts[0]] == null || series[macdPts[1]] == null) return { tone: '', text: zh ? '这两根的' + name + '还不能计算，不显示 0。' : name + ' is not ready on one of these bars. No fake zero is shown.' };
      if (!(series[macdPts[1]] < series[macdPts[0]])) {
        return { tone: 'is-wrong', text: zh ? name + '没有更低高点。两个点都要比同一条线，不能一条用 DIF、一条用柱子。' : name + ' does not make a lower high. Both points must use the same line.' };
      }
      return { tone: 'is-right', text: zh ? '价格更高高点，' + name + ' 更低高点，时间也对齐。这是本课的顶背离，仍然不保证反转。' : 'Higher price high, lower ' + name + ' high, and the times line up. This is bearish divergence in this lesson. It still does not guarantee a reversal.' };
    }
    function gradeBar(pack, index) {
      var kind = kindAt(pack, index);
      var dif = pack.macd.dif[index];
      if (state.step === 'exam') {
        if (state.examStage === 'cross') {
          if (kind === 'gold' && dif > 0) {
            state.examStage = 'zero';
            return { tone: 'is-right', text: zh ? '这是零轴上方的金叉，只是延续候选，不是买入保证。再找一根 DIF 落到零轴下方的 K 线。' : 'This golden cross is above zero. It is a continuation candidate, not a buy order. Next, find a candle whose DIF is below zero.' };
          }
          if (kind === 'gold') return { tone: 'is-wrong', text: zh ? '这次金叉在零轴下方。请找 DIF 仍大于 0 的那一次。' : 'This golden cross is below zero. Find the one where DIF is still above 0.' };
          if (kind === 'death') return { tone: '', text: zh ? '这根是死叉。考试要先点零轴上方的金叉。' : 'This bar is a death cross. The exam asks for the golden cross above zero first.' };
          return { tone: '', text: zh ? '这根不是金叉。金叉是 DIF 从 DEA 下方严格穿到上方。' : 'This bar is not a golden cross. DIF has to move from strictly below DEA to strictly above it.' };
        }
        if (state.examStage === 'zero') {
          if (dif == null) return { tone: '', text: zh ? '这根 DIF 还不能计算。' : 'DIF is not ready on this bar.' };
          if (dif < 0) {
            state.examStage = 'div';
            return { tone: 'is-right', text: zh ? 'DIF 在零轴下方，说明快均线低于慢均线。接着点两个价格高点和对应的 DIF。' : 'DIF is below zero, so the fast average is under the slow one. Next, mark two price highs and the matching DIF highs.' };
          }
          return { tone: '', text: zh ? '这根 DIF 还在零轴上方。请点已经穿到下方的那根。' : 'DIF is still above zero on this bar. Mark one that has crossed below.' };
        }
        return gradeDivergence(pack);
      }
      if (state.scene === 'shrink') {
        if (shrinkAt(pack, index)) return { tone: 'is-right', text: zh ? '负柱在收窄，但收盘仍在跌。这只说明 DIF 和 DEA 的负差值变小，不能单独证明价格已经反转。' : 'The negative bar is narrowing, but the close is still falling. The gap got smaller. That alone does not prove a reversal.' };
        return { tone: '', text: zh ? '还不是。要负柱比前一根短，而且这根收盘更低。' : 'Not yet. The negative bar must be shorter than the previous one, and this close must be lower.' };
      }
      if (state.scene === 'div' || state.scene === 'fake') return gradeDivergence(pack);
      if (state.scene === 'fail') {
        if (kind === 'gold' && dif <= 0) return { tone: 'is-right', text: zh ? '这次金叉在零轴下方。交叉和大趋势矛盾，后面仍可能创新低。它不是买入保证。' : 'This golden cross is below zero. The cross disagrees with the larger decline, and price can still make a new low.' };
        if (kind === 'gold') return { tone: 'is-wrong', text: zh ? '这根在零轴上方。本剧情要找 DIF 小于或等于 0 的金叉。' : 'This one is above zero. This scene asks for a golden cross with DIF at or below 0.' };
        return { tone: '', text: zh ? '这根不是零轴下方的金叉。' : 'This bar is not the golden cross below zero.' };
      }
      if (kind === 'gold' && dif > 0) return { tone: 'is-right', text: zh ? '这是零轴上方的金叉，只是延续候选，不是买入保证。旁边的死叉也只是两条线换了位置。' : 'This golden cross is above zero. It is a continuation candidate, not a buy order. A death cross only says the lines swapped places.' };
      if (kind === 'gold') return { tone: 'is-wrong', text: zh ? '这次金叉在零轴下方。请换零轴上方的那一次。' : 'This golden cross is below zero. Find the one above zero.' };
      if (kind === 'death') return { tone: '', text: zh ? '这根标的是死叉。本剧情要你点金叉。' : 'This bar is the death cross. This scene asks for the golden cross.' };
      return { tone: '', text: zh ? '这根 DIF 没有穿过 DEA。' : 'DIF does not cross DEA on this bar.' };
    }
    function readout(pack) {
      if (state.cursor == null) return '';
      var bar = pack.bars[state.cursor];
      if (!bar) return '';
      var m = pack.macd;
      var dif = m.dif[state.cursor];
      var dea = m.dea[state.cursor];
      var hist = m.hist[state.cursor];
      var when = zh ? '第 ' + (state.cursor - pack.current.visibleFrom + 1) + ' 根 · 模拟 1 小时' : 'Bar ' + (state.cursor - pack.current.visibleFrom + 1) + ' · simulated 1h';
      var cross = kindAt(pack, state.cursor);
      var tag = cross === 'gold' ? (zh ? ' 这根是金叉。' : ' This bar is a golden cross.') : (cross === 'death' ? (zh ? ' 这根是死叉。' : ' This bar is a death cross.') : '');
      var side = dif == null ? '' : (dif > 0 ? (zh ? ' DIF 在零轴上方。' : ' DIF is above zero.') : (dif < 0 ? (zh ? ' DIF 在零轴下方。' : ' DIF is below zero.') : (zh ? ' DIF 正在零轴上。' : ' DIF is on zero.')));
      return when + '<br>' + (zh ? '开 ' : 'O ') + fmt(bar.o) + (zh ? ' 高 ' : ' H ') + fmt(bar.h) + (zh ? ' 低 ' : ' L ') + fmt(bar.l) + (zh ? ' 收 ' : ' C ') + fmt(bar.c) + (zh ? ' 量 ' : ' V ') + bar.v +
        '<br>EMA12 ' + fmt(m.fast[state.cursor]) + ' · EMA26 ' + fmt(m.slow[state.cursor]) +
        '<br>DIF ' + (dif == null ? (zh ? '数据不足' : 'not ready') : fmt(dif)) + ' · DEA ' + (dea == null ? (zh ? '数据不足' : 'not ready') : fmt(dea)) + ' · ' + (zh ? '柱 ' : 'bar ') + (hist == null ? (zh ? '数据不足' : 'not ready') : fmt(hist)) + tag + side;
    }
    function paint() {
      var pack = prefix();
      var from = pack.current.visibleFrom;
      var draw = pack.bars.slice(from);
      var w = 980;
      var h = 470;
      var padL = 10;
      var padR = 72;
      var top = 16;
      var priceH = 188;
      var vals = [];
      draw.forEach(function (bar, i) {
        vals.push(bar.h, bar.l);
        var abs = from + i;
        if (state.showFast && pack.macd.fast[abs] != null) vals.push(pack.macd.fast[abs]);
        if (state.showSlow && pack.macd.slow[abs] != null) vals.push(pack.macd.slow[abs]);
      });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      if (min === max) { min -= 1; max += 1; }
      var span = max - min;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * priceH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var macTop = 292;
      var macH = 140;
      var macVals = [1];
      draw.forEach(function (bar, i) {
        var abs = from + i;
        ['dif', 'dea', 'hist'].forEach(function (key) {
          var value = pack.macd[key][abs];
          if (value != null) macVals.push(Math.abs(value));
        });
      });
      var macMax = Math.max.apply(null, macVals);
      function my(v) { return macTop + macH / 2 - (v / macMax) * (macH / 2 - 10); }
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (zh ? '模拟BTC与MACD' : 'Simulated BTC and MACD') + '">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      var g;
      for (g = 0; g < 4; g++) {
        var price = min + (max - min) * g / 3;
        var gy = y(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="rgba(230,199,158,.16)"></line>');
        bits.push('<text x="' + (w - 8) + '" y="' + (gy + 4) + '" text-anchor="end" fill="#d4bc9e" font-size="13">' + fmt(price) + '</text>');
      }
      var volMax = 1;
      draw.forEach(function (bar) { if (bar.v > volMax) volMax = bar.v; });
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(2.2, slot * 0.55);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.2"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.3, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        var vh = Math.max(1, bar.v / volMax * 28);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + (268 - vh) + '" width="' + bw + '" height="' + vh + '" fill="' + color + '" opacity="0.8"></rect>');
        if (i % 16 === 0) bits.push('<text x="' + xc + '" y="462" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
      });
      function priceLine(series, color, dash) {
        var pts = [];
        draw.forEach(function (bar, i) {
          var value = series[from + i];
          if (value != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + y(value).toFixed(1));
        });
        if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="7 4"' : '') + '></polyline>');
      }
      if (state.showFast) priceLine(pack.macd.fast, '#f4cb82', false);
      if (state.showSlow) priceLine(pack.macd.slow, '#8eb4ff', true);
      bits.push('<line x1="' + padL + '" y1="' + my(0) + '" x2="' + (w - padR) + '" y2="' + my(0) + '" stroke="#f0d59a" stroke-dasharray="4 3"></line>');
      bits.push('<text x="' + (w - 8) + '" y="' + (my(0) + 4) + '" text-anchor="end" fill="#f0d59a" font-size="13">0</text>');
      draw.forEach(function (bar, i) {
        var abs = from + i;
        var hist = pack.macd.hist[abs];
        if (!state.showHist || hist == null) return;
        var xc = padL + i * slot + slot / 2;
        var y1 = my(0);
        var y2 = my(hist);
        bits.push('<rect x="' + (xc - Math.max(1.6, slot * 0.36)) + '" y="' + Math.min(y1, y2) + '" width="' + Math.max(2.4, slot * 0.62) + '" height="' + Math.max(1, Math.abs(y2 - y1)) + '" fill="' + (hist >= 0 ? '#1f8a4d' : '#d4534e') + '"></rect>');
      });
      function macdLine(series, color, dash) {
        var pts = [];
        draw.forEach(function (bar, i) {
          var value = series[from + i];
          if (value != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + my(value).toFixed(1));
        });
        if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.3"' + (dash ? ' stroke-dasharray="7 4"' : '') + '></polyline>');
      }
      if (state.showDif) macdLine(pack.macd.dif, '#f4cb82', false);
      if (state.showDea) macdLine(pack.macd.dea, '#8eb4ff', true);
      var showLabels = !state.hideAnswer && (state.step === 'watch' || state.showCross);
      if (showLabels) {
        draw.forEach(function (bar, i) {
          var abs = from + i;
          var kind = kindAt(pack, abs);
          if (!kind) return;
          var xc = padL + i * slot + slot / 2;
          bits.push('<text data-cross="' + kind + '" x="' + xc + '" y="' + (my(0) - 8) + '" text-anchor="middle" fill="' + (kind === 'gold' ? '#f4cb82' : '#ffb4c0') + '" font-size="13">' + (kind === 'gold' ? (zh ? '金叉' : 'Gold') : (zh ? '死叉' : 'Death')) + '</text>');
        });
      }
      function link(points, pane) {
        if (points.length < 2) return;
        var sorted = points.slice().sort(function (a, b) { return a - b; });
        var pts = sorted.map(function (abs) {
          var i = abs - from;
          if (i < 0 || i >= draw.length) return '';
          var xc = padL + i * slot + slot / 2;
          var yy = pane === 'price' ? y(pack.bars[abs].h) : my((state.useHist ? pack.macd.hist[abs] : pack.macd.dif[abs]) || 0);
          return xc.toFixed(1) + ',' + yy.toFixed(1);
        }).filter(Boolean);
        if (pts.length === 2) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 3"></polyline>');
      }
      link(state.pricePts, 'price');
      link(state.macdPts, 'macd');
      function dots(points, pane) {
        points.forEach(function (abs) {
          var i = abs - from;
          if (i < 0 || i >= draw.length) return;
          var xc = padL + i * slot + slot / 2;
          var yy = pane === 'price' ? y(pack.bars[abs].h) : my((state.useHist ? pack.macd.hist[abs] : pack.macd.dif[abs]) || 0);
          bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="5" fill="none" stroke="#ffffff" stroke-width="2"></circle>');
        });
      }
      dots(state.pricePts, 'price');
      dots(state.macdPts, 'macd');
      if (state.cursor != null && state.cursor >= from && state.cursor < pack.end) {
        var cx = padL + (state.cursor - from) * slot + slot / 2;
        bits.push('<line x1="' + cx + '" y1="' + top + '" x2="' + cx + '" y2="' + (macTop + macH) + '" stroke="rgba(255,255,255,.4)" stroke-dasharray="3 3"></line>');
      }
      draw.forEach(function (bar, i) {
        var abs = from + i;
        var x = padL + i * slot;
        bits.push('<rect data-bar="' + abs + '" data-pane="price" x="' + x + '" y="' + top + '" width="' + slot + '" height="250" fill="transparent" style="cursor:pointer"></rect>');
        bits.push('<rect data-bar="' + abs + '" data-pane="macd" x="' + x + '" y="' + macTop + '" width="' + slot + '" height="' + macH + '" fill="transparent" style="cursor:pointer"></rect>');
      });
      bits.push('</svg>');
      var steps = [['watch', zh ? '看懂' : 'Watch'], ['mark', zh ? '自己标记' : 'Mark'], ['judge', zh ? '判断真假' : 'True or false'], ['fail', zh ? '失败案例' : 'Failure'], ['exam', zh ? '新行情考试' : 'New tape']];
      var sceneIds = ['above', 'fail', 'shrink', 'div', 'fake'];
      var judge = '';
      if (state.step === 'judge') {
        var q = state.scene === 'fail'
          ? { ask: zh ? '零轴下方出现金叉，能不能说明下跌趋势已经转成上涨？' : 'A golden cross below zero: does it mean the decline has turned into a rise?', answer: 'B', options: [['A', zh ? '能，金叉必涨' : 'Yes, a cross must rise'], ['B', zh ? '不能，它和大趋势矛盾' : 'No, it disagrees with the larger trend'], ['C', zh ? '只有柱子变红才算' : 'Only a red bar counts']] }
          : state.scene === 'shrink'
            ? { ask: zh ? '负柱缩短，但收盘仍在下跌。价格是不是已经反转？' : 'The negative bars shrink, but the close is still falling. Has price already reversed?', answer: 'B', options: [['A', zh ? '已经确认上涨' : 'The rise is confirmed'], ['B', zh ? '不能，负差值变小不是反转' : 'No. A smaller negative gap is not a reversal'], ['C', zh ? '下一根一定会反弹' : 'The next bar must bounce']] }
            : state.scene === 'div'
              ? { ask: zh ? '价格更高高点，DIF 更低高点。这是否保证随后反转？' : 'Price makes a higher high and DIF a lower high. Does that guarantee a reversal?', answer: 'B', options: [['A', zh ? '保证' : 'It guarantees it'], ['B', zh ? '不保证' : 'It does not'], ['C', zh ? '柱子也更低才保证' : 'Only if the bar is lower too']] }
              : state.scene === 'fake'
                ? { ask: zh ? '价格的第二个高点并没有更高，DIF 却在下降。这是顶背离吗？' : 'The second price high is not higher, while DIF falls. Is that bearish divergence?', answer: 'B', options: [['A', zh ? '是' : 'Yes'], ['B', zh ? '不是，价格没有更高高点' : 'No. Price did not make a higher high'], ['C', zh ? '只要 DIF 下降就是' : 'Any falling DIF counts']] }
                : { ask: zh ? '零轴上方的金叉，是不是就可以当作买入？' : 'A golden cross above zero: is it a buy order?', answer: 'B', options: [['A', zh ? '是，金叉必涨' : 'Yes, a cross must rise'], ['B', zh ? '不是，只是延续候选' : 'No, it is only a continuation candidate'], ['C', zh ? '死叉才是买入' : 'A death cross is the buy']] };
        judge = '<p>' + esc(q.ask) + '</p><div class="a1-modes">' + q.options.map(function (opt) {
          return '<button type="button" data-judge="' + opt[0] + '" data-answer="' + q.answer + '">' + opt[0] + '. ' + esc(opt[1]) + '</button>';
        }).join('') + '</div>';
      }
      var note = state.note || readout(pack) || taskText();
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟，不是实时行情。教学虚构，不是投资建议。' : 'Simulated, not a live price. Teaching fiction, not investment advice.') + '</p>' +
        '<div class="a1-modes">' + steps.map(function (item) { return '<button type="button" data-step="' + item[0] + '" aria-pressed="' + (state.step === item[0]) + '">' + item[1] + '</button>'; }).join('') + '</div>' +
        '<div class="a1-modes">' + sceneIds.map(function (id) { return '<button type="button" data-scene="' + id + '" aria-pressed="' + (state.scene === id) + '">' + esc(zh ? scenes[id].zh : scenes[id].en) + '</button>'; }).join('') + '</div>' +
        '<p>' + esc(taskText()) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="-1">' + (zh ? '上一根' : 'Previous') + '</button><button type="button" data-move="1">' + (zh ? '下一根' : 'Next') + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重置' : 'Reset') + '</button><span>' + state.shown + ' / ' + maxShown() + (zh ? '，后面先隐藏' : ', later bars hidden') + '</span></div>' +
        '<div class="a1-modes">' +
        '<button type="button" data-layer="fast" aria-pressed="' + state.showFast + '">EMA12</button>' +
        '<button type="button" data-layer="slow" aria-pressed="' + state.showSlow + '">EMA26</button>' +
        '<button type="button" data-layer="dif" aria-pressed="' + state.showDif + '">DIF</button>' +
        '<button type="button" data-layer="dea" aria-pressed="' + state.showDea + '">DEA</button>' +
        '<button type="button" data-layer="hist" aria-pressed="' + state.showHist + '">' + (zh ? '柱' : 'Bars') + '</button>' +
        '<button type="button" data-layer="cross" aria-pressed="' + state.showCross + '">' + (zh ? '标出金叉死叉' : 'Show crosses') + '</button>' +
        '<button type="button" data-layer="hide" aria-pressed="' + state.hideAnswer + '">' + (state.hideAnswer ? (zh ? '答案隐藏中' : 'Answers hidden') : (zh ? '答案已显示' : 'Answers shown')) + '</button>' +
        '<button type="button" data-layer="src" aria-pressed="' + state.useHist + '">' + (state.useHist ? (zh ? '正在比柱子' : 'Comparing bars') : (zh ? '正在比 DIF' : 'Comparing DIF')) + '</button></div>' +
        '<div class="macd-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>DIF</span><span><i style="background:#8eb4ff"></i>DEA</span><span><i style="background:#1f8a4d"></i>' + (zh ? '正柱 / 阳线' : 'Positive / up') + '</span><span><i style="background:#d4534e"></i>' + (zh ? '负柱 / 阴线' : 'Negative / down') + '</span><span>0 ' + (zh ? '零轴' : 'zero') + '</span></p>' +
        judge +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '公式：DIF=EMA(收盘,12)−EMA(收盘,26)。DEA 是有效 DIF 的 9 周期 EMA，种子是前 9 个有效 DIF 的简单平均。柱=DIF−DEA，不乘 2。相等不算交叉。不够预热显示数据不足，不向前填 0。'
          : 'Formula: DIF=EMA(close,12)−EMA(close,26). DEA is the 9-bar EMA of valid DIF values, seeded with the simple average of the first 9. Histogram=DIF−DEA, not doubled. Equality is not a cross. Before the warmup, the chart says not ready and does not fill 0.') + '</p></div>';
    }
    function setShown(next) {
      state.shown = Math.max(1, Math.min(maxShown(), next));
      if (state.cursor != null && state.cursor >= scene().visibleFrom + state.shown) state.cursor = null;
    }
    function enter(step) {
      stop();
      state.step = step;
      state.pricePts = [];
      state.macdPts = [];
      state.cursor = null;
      state.note = '';
      state.tone = '';
      state.examStage = 'cross';
      if (step === 'fail') {
        state.scene = state.scene === 'div' ? 'fake' : (state.scene === 'fake' || state.scene === 'fail' ? 'shrink' : 'fail');
        state.hideAnswer = true;
        state.showCross = false;
        state.shown = 28;
      } else if (step === 'exam') {
        state.scene = 'exam';
        state.hideAnswer = true;
        state.showCross = false;
        state.shown = 36;
      } else {
        if (state.scene === 'exam') state.scene = 'above';
        state.shown = 28;
        state.hideAnswer = step !== 'watch';
        state.showCross = step === 'watch';
      }
      paint();
    }
    if (root._macdClick) root.removeEventListener('click', root._macdClick);
    root._macdClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-step],[data-scene],[data-move],[data-layer],[data-bar],[data-judge]') : null;
      if (!el || !root.contains(el)) return;
      if (el.hasAttribute('data-step')) { enter(el.getAttribute('data-step')); return; }
      if (el.hasAttribute('data-scene')) {
        stop();
        state.scene = el.getAttribute('data-scene');
        state.step = 'mark';
        state.pricePts = [];
        state.macdPts = [];
        state.note = '';
        state.tone = '';
        state.hideAnswer = true;
        state.showCross = false;
        state.shown = 28;
        paint();
        return;
      }
      if (el.hasAttribute('data-move')) {
        var move = el.getAttribute('data-move');
        if (move === 'play') {
          if (state.playing) { stop(); paint(); return; }
          state.playing = true;
          root._macdTimer = setInterval(function () {
            if (!root.isConnected) { stop(); return; }
            if (state.shown >= maxShown()) { stop(); paint(); return; }
            setShown(state.shown + 1);
            paint();
          }, 280);
          paint();
          return;
        }
        if (move === 'reset') {
          stop();
          state.pricePts = [];
          state.macdPts = [];
          state.cursor = null;
          state.note = '';
          state.tone = '';
          state.examStage = 'cross';
          state.shown = state.step === 'exam' ? 36 : 28;
          paint();
          return;
        }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      if (el.hasAttribute('data-layer')) {
        var layer = el.getAttribute('data-layer');
        if (layer === 'fast') state.showFast = !state.showFast;
        if (layer === 'slow') state.showSlow = !state.showSlow;
        if (layer === 'dif') state.showDif = !state.showDif;
        if (layer === 'dea') state.showDea = !state.showDea;
        if (layer === 'hist') state.showHist = !state.showHist;
        if (layer === 'cross') state.showCross = !state.showCross;
        if (layer === 'hide') state.hideAnswer = !state.hideAnswer;
        if (layer === 'src') { state.useHist = !state.useHist; state.macdPts = []; }
        var names = { fast: ['EMA12 是价格上较快的均线。DIF 用它减去 EMA26。', 'EMA12 is the faster average of price. DIF subtracts EMA26 from it.'], slow: ['EMA26 是较慢的均线。', 'EMA26 is the slower average.'], dif: ['DIF 是 EMA12 减 EMA26。零轴上方表示快均线更高。', 'DIF is EMA12 minus EMA26. Above zero, the fast average is higher.'], dea: ['DEA 是 DIF 的 9 周期 EMA，用来平滑 DIF。', 'DEA is the 9-bar EMA of DIF. It smooths DIF.'], hist: ['柱子等于 DIF 减 DEA，不乘 2。变短只说明两条线在靠近。', 'The bar equals DIF minus DEA, and it is not doubled. Shorter only means the lines are closer.'] };
        if (names[layer]) { state.note = zh ? names[layer][0] : names[layer][1]; state.tone = ''; }
        paint();
        return;
      }
      if (el.hasAttribute('data-bar')) {
        var index = Number(el.getAttribute('data-bar'));
        var pane = el.getAttribute('data-pane');
        state.cursor = index;
        var marking = state.step === 'mark' || state.step === 'fail' || state.step === 'exam';
        var divMode = state.scene === 'div' || state.scene === 'fake' || (state.step === 'exam' && state.examStage === 'div');
        if (marking && divMode) {
          var list = pane === 'macd' ? state.macdPts : state.pricePts;
          var at = list.indexOf(index);
          if (at >= 0) list.splice(at, 1);
          else {
            if (list.length >= 2) list.shift();
            list.push(index);
          }
          var graded = gradeDivergence(prefix());
          state.note = graded.text;
          state.tone = graded.tone;
        } else if (marking) {
          var gradedBar = gradeBar(prefix(), index);
          state.note = gradedBar.text;
          state.tone = gradedBar.tone;
        } else {
          state.note = '';
          state.tone = '';
        }
        paint();
        return;
      }
      if (el.hasAttribute('data-judge')) {
        var right = el.getAttribute('data-judge') === el.getAttribute('data-answer');
        state.tone = right ? 'is-right' : 'is-wrong';
        state.note = right
          ? (zh ? '对。这只说明定义看清了，不是叫你下单。' : 'Correct. That only means the definition is clear. It is not an order.')
          : (zh ? '不对。金叉、死叉和柱子变短，都不能单独证明下一根价格。' : 'No. A golden cross, a death cross, or a shorter bar cannot by itself prove the next price.');
        paint();
      }
    };
    root.addEventListener('click', root._macdClick);
    if (root._macdKey) root.removeEventListener('keydown', root._macdKey);
    root.tabIndex = 0;
    root._macdKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      setShown(state.shown + (ev.key === 'ArrowRight' ? 1 : -1));
      paint();
    };
    root.addEventListener('keydown', root._macdKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._macdWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'macd-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._macdWrapped = true;
  }
  global.STAR_CH02_MACD = { ema: ema, macd: macd, buildScenes: buildScenes, mount: mount };
})(typeof window !== 'undefined' ? window : global);
