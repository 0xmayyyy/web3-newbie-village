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
        explain: bi('均线是一条跟着蜡烛收盘走的平滑线。\n图上的 K 线有涨有跌，不是一条直线。\n黄实线是 EMA20，蓝虚线是 EMA50。\n两条线和 K 线用同一个价格轴。\nEMA20 看的是最近 20 根收盘，越近的越重要。\n看 1 小时图时，这 20 根是小时 K 线，不是 20 天。\nEMA50 看的是最近 50 根，走得更慢。\n它不是用来预言下一根会到哪里。\n价格先转，均线后转。\n计算是 α=2/(N+1)。\n第一根有效值是前 N 根收盘的简单平均。\n之后每根是 α×当根收盘+(1−α)×上一根。\n不够 N 根就写数据不足，不画 0。\n本课把“靠近”定成 |收盘−快线|/快线 ≤ 0.3%。\n这是教学规则，不是买卖信号。\n后面的 K 线先藏着。\n请一根一根放出来，再自己点。', 'An average is a smooth line that follows candle closes.\nThe candles rise and fall. They are not one straight line.\nThe gold solid line is EMA20, and the blue dashed line is EMA50.\nBoth lines share the candle price axis.\nEMA20 looks at the last 20 closes, and the nearer ones matter more.\nOn a 1-hour chart those 20 bars are hours, not 20 days.\nEMA50 looks at the last 50 closes, and it moves more slowly.\nIt is not there to predict where the next bar will go.\nPrice turns first. The average turns later.\nThe formula is α=2/(N+1).\nThe first valid value is the simple average of the first N closes.\nAfter that, each bar is α times this close plus (1−α) times the previous value.\nFewer than N bars says the data is not ready, and it does not draw 0.\nThis lesson calls a bar “near” when |close − fast line| / fast line ≤ 0.3%.\nThat is a teaching rule, not a buy or sell signal.\nLater candles stay hidden.\nReveal them one by one, then mark them yourself.'),
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
        explain: bi('上面是蜡烛 K 线，只作价格对照。\n图的主体是 RSI(14)，刻度从 0 到 100。\n它看的是最近 14 根涨跌。\n70 的横线标成超买。\n50 在中间。\n30 的横线标成超卖。\n这两条只是参考线，可以改，但改了也不是买卖命令。\n本课用 Wilder 的平滑法。\n先把前 14 次涨跌分成平均涨幅和平均跌幅。\n之后平均涨幅等于（13×上一根平均涨幅+这一根涨幅）除以 14。\n跌幅同样计算。\nRS 是平均涨幅除以平均跌幅。\nRSI 等于 100 减去 100 除以（1 加 RS）。\n只有上涨时 RSI 可以到 100。\n只有下跌时可以到 0。\n涨跌都是 0 时，本课记为 50。\n样本不够 N 次变化时不显示 0，而是还不能计算。\n图上至少 90 根模拟 K 线。\n后面的 K 线先藏着。\n顶背离是价格更高的高点，配上同一时间更低的 RSI 高点。\n底背离是价格更低的低点，配上更高的 RSI 低点。\nRSI 自己下降，而价格没有更高的高点，就不是顶背离。', 'The candles above are only price, for reference.\nThe main picture is RSI(14), on a scale from 0 to 100.\nIt looks at the rises and falls of the last 14 bars.\nThe line at 70 is labeled overbought.\n50 sits in the middle.\nThe line at 30 is labeled oversold.\nThose two lines are only reference lines. They can be moved, and moving them is still not a buy or sell order.\nThis lesson uses Wilder smoothing.\nFirst split the first 14 changes into an average gain and an average loss.\nAfter that, average gain equals (13 times the previous average gain plus this bar’s gain) divided by 14.\nLoss is calculated the same way.\nRS is the average gain divided by the average loss.\nRSI equals 100 minus 100 divided by (1 plus RS).\nIf price only rises, RSI can reach 100.\nIf price only falls, it can reach 0.\nIf both gain and loss are 0, this lesson records 50.\nBefore N changes exist, do not show 0. It cannot be calculated yet.\nThe chart has at least 90 simulated candles.\nLater candles stay hidden.\nBearish divergence is a higher price high with a lower RSI high at the same time.\nBullish divergence is a lower price low with a higher RSI low.\nA falling RSI without a higher price high is not bearish divergence.'),
        example: bi('教学模拟：RSI 75 只表示近期上涨幅度相对更大。\n强趋势里它可以在 70 上方停留很多根，价格还在创新高。\n跌势里它可以停在 30 下方，价格还在创新低。\n所以“超买”不是立刻卖出的命令，“超卖”也不是立刻买入的命令。\n价格创新高时，RSI 的高点可以更低。\n那也不保证反转。', 'Teaching simulation: RSI 75 only means recent gains are relatively larger.\nIn a strong trend it can stay above 70 for many bars while price still makes new highs.\nIn a decline it can stay below 30 while price still makes new lows.\nSo “overbought” is not an order to sell, and “oversold” is not an order to buy.\nPrice can make a new high while the RSI high is lower.\nThat still does not guarantee a reversal.'),
        pitfalls: [
          bi('RSI 一过 70 就认为必须反转', 'Assuming price must reverse as soon as RSI crosses 70'),
          bi('把样本不足时的空值当成 0', 'Treating an empty value, before the sample is ready, as 0')
        ],
        practice: bi('在超买剧情里点一根 RSI 高于 70、后面收盘还在更高的 K 线。顶背离要自己点两个价格高点，再点同一时间的 RSI。', 'In the overbought scene, mark a bar with RSI above 70 whose later close is still higher. For bearish divergence, mark two price highs, then the RSI highs at the same time.'),
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
        study: { kind: 'rsi', main: 'rsi', lessonChart: 'rsi-full', closes: rsi75 }
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
        one: bi('看跌背离是价格高点抬高而指标高点降低，它只描述两段已经确认的摆动，不保证下一根反转。', 'Bearish divergence is a higher price high with a lower indicator high, and it only describes two confirmed swings, so it does not guarantee the next bar reverses.'),
        explain: bi('左右各 2 根都走出来，这个高低点才算确认。\n右侧 2 根还没出现，就不能标。\n看跌背离是价格高点更高，左右 2 根以内的 RSI 高点更低。\n看涨背离是价格低点更低，RSI 低点更高。\n换成 DIF 或柱子时，两个点都要比同一条线。\n背离之后价格仍可以顺着原方向继续走。\n教学模拟：高点 105 再到 112，同一条收盘算出的 RSI 约 78 再到 69。', 'A high or low is confirmed only after 2 bars exist on each side.\nIf the 2 bars on the right have not printed, you cannot mark it.\nBearish divergence is a higher price high with a lower RSI high within 2 bars.\nBullish divergence is a lower price low with a higher RSI low.\nIf you switch to DIF or the histogram, both points must use that same line.\nAfter divergence, price can still continue in the original direction.\nTeaching simulation: highs at 105 then 112, and RSI from the same closes is about 78 then 69.'),
        example: bi('教学模拟：价格高点从 105 到 112。\n同一条收盘序列上，RSI 高点从约 78 到约 69。\n这是算出来的，不是事后填上的。\n即便如此，后面仍可能继续上涨。', 'Teaching simulation: the price highs go from 105 to 112.\nOn the same close series, the RSI highs go from about 78 to about 69.\nThose numbers are calculated, not filled in afterward.\nEven then, price can still continue up.'),
        pitfalls: [
          bi('用还没走完的右侧 K 线提前标摆动', 'Marking a swing before the bars on its right have printed'),
          bi('把背离当成必然而不是一种关系', 'Treating divergence as a certainty instead of a relationship')
        ],
        practice: bi('自己点两个已经确认的价格高点，再点左右 2 根以内的 RSI。右侧不够 2 根时，图会说还需要后续 K 线确认。', 'Mark two confirmed price highs yourself, then the RSI highs within 2 bars. If 2 bars are not yet on the right, the chart says later candles are still needed.'),
        check: {
          ask: bi('价格更高高点，RSI 更低高点，这叫什么？', 'Price makes a higher high and RSI makes a lower high. What is that called?'),
          options: [opt('A', '看跌背离', 'Bearish divergence'), opt('B', '看涨背离', 'Bullish divergence'), opt('C', '缩口', 'A squeeze')],
          answer: 'A',
          miss: bi('看涨背离比的是低点。缩口说的是布林带宽度。', 'Bullish divergence compares lows. A squeeze talks about Bollinger width.')
        },
        quizzes: [
          quiz('价格新高、RSI 更低高点属于？', 'A new price high with a lower RSI high is?', [opt('A', '看跌背离', 'Bearish divergence'), opt('B', '必涨信号', 'A signal that must rise'), opt('C', '没有意义', 'Meaningless')], 'A', {
            A: ['价格高点更高，RSI 高点更低，这就是看跌背离。', 'A higher price high with a lower RSI high is bearish divergence.'],
            B: ['它没有上涨这一项。看涨背离比的是低点。', 'It has no rise in it. Bullish divergence compares lows.'],
            C: ['它描述两段已确认摆动的关系，不是空话，也不保证反转。', 'It describes two confirmed swings. That is not empty, and it still does not guarantee a reversal.']
          }),
          quiz('背离一定导致反转？', 'Must divergence cause a reversal?', [opt('A', '一定', 'It must'), opt('B', '不一定', 'Not necessarily'), opt('C', '只有 ETH 会', 'Only ETH does')], 'B', {
            A: ['背离之后价格仍可以顺着原方向继续走。', 'After divergence, price can still continue in the original direction.'],
            B: ['它只是价格和指标没有一起创新高或创新低。', 'It only says price and the indicator did not make the new extreme together.'],
            C: ['换成 ETH 这个名字，确认规则也不变。', 'The name ETH does not change the confirmation rule.']
          }),
          quiz('可用未来 K 线确认今天的信号吗？', 'Can future candles confirm today’s signal?', [opt('A', '可以提前画', 'You can draw it early'), opt('B', '不可以提前显示', 'Do not show it early'), opt('C', '随便', 'Either way')], 'B', {
            A: ['右侧 2 根还没走出来，这个高低点还没确认。', 'Until 2 bars have printed on the right, the swing is not confirmed.'],
            B: ['本课等右侧 2 根出现，才允许标这个点。', 'This lesson waits for 2 bars on the right before the point can be marked.'],
            C: ['确认规则是固定的，不能有时提前、有时不提前。', 'The confirmation rule is fixed. It is not sometimes early and sometimes not.']
          })
        ],
        study: {
          kind: 'rsi',
          lessonChart: 'div-full',
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
        one: bi('斐波那契回撤只是把一段高点和低点按比例分成参考位，价格不必在那里转身。', 'A Fibonacci retracement only divides a high and a low into reference levels, so price does not have to turn there.'),
        explain: bi('先定这一段的低点 L 和高点 H。\n上涨回撤：价格=H−(H−L)×比例。\n0 在高点，1 在低点。\n下跌回撤：价格=L+(H−L)×比例。\n0 在低点，1 在高点。\n0.5 是中点，不是严格的斐波那契比例。\n扩展用两点：价格=起点+(终点−起点)×比例。\n1.272 和 1.618 在波段外面。\n两个锚点相同就不能画。\n锚点一改，所有价位都跟着改。\n碰到 0.618 也不保证反弹。', 'First fix the low L and the high H of the swing.\nFor an up retracement, price=H−(H−L)×ratio.\n0 is at the high, and 1 is at the low.\nFor a down retracement, price=L+(H−L)×ratio.\n0 is at the low, and 1 is at the high.\n0.5 is the midpoint. It is not a strict Fibonacci ratio.\nAn extension uses two points: price=start+(end−start)×ratio.\n1.272 and 1.618 sit outside the swing.\nIf the two anchors are the same, no lines are drawn.\nIf you move an anchor, every level moves with it.\nTouching 0.618 still does not guarantee a bounce.'),
        example: bi('教学模拟：L=100，H=140。\n上涨回撤的 0 在 140，1 在 100。\n0.236 在 130.56。\n0.382 在 124.72。\n0.5 在 120。\n0.618 在 115.28。\n0.786 在 108.56。\n另一段教学模拟从 60000 涨到 70000。\n0.618 在 63820。\n价格仍可以穿过它继续走。', 'Teaching simulation: L=100 and H=140.\nOn an up retracement, 0 is at 140 and 1 is at 100.\n0.236 is at 130.56.\n0.382 is at 124.72.\n0.5 is at 120.\n0.618 is at 115.28.\n0.786 is at 108.56.\nAnother teaching simulation rises from 60000 to 70000.\n0.618 is at 63820.\nPrice can still pass through it and keep going.'),
        pitfalls: [
          bi('把 0.618 当成必须成交的反转价', 'Treating 0.618 as a reversal price that must trade'),
          bi('锚点换了却沿用旧价位', 'Keeping old prices after the anchors moved')
        ],
        practice: bi('先点低点，再点高点。看 0.618 的价格。再把后面的 K 线放出来，看它会不会穿过这条线。', 'Tap the low, then the high. Read the 0.618 price. Then reveal the later candles and see whether price passes that line.'),
        check: {
          ask: bi('100 到 140 的上涨回撤，0.618 在哪里？', 'For an up retracement from 100 to 140, where is 0.618?'),
          options: [opt('A', '115.28', '115.28'), opt('B', '140', '140'), opt('C', '86.48', '86.48')],
          answer: 'A',
          miss: bi('140−40×0.618=115.28。\n140 是高点本身。', '140−40×0.618=115.28.\n140 is the high itself.')
        },
        quizzes: [
          quiz('100 到 140 的 0.618 回撤约是多少？', 'About where is the 0.618 retracement from 100 to 140?', [opt('A', '115.28', '115.28'), opt('B', '124.72', '124.72'), opt('C', '140', '140')], 'A', {
            A: ['140−(140−100)×0.618=115.28。', '140−(140−100)×0.618=115.28.'],
            B: ['124.72 是 0.382，不是 0.618。', '124.72 is 0.382, not 0.618.'],
            C: ['140 是高点本身，对应比例 0，不是 0.618。', '140 is the high itself. That is ratio 0, not 0.618.']
          }),
          quiz('0.618 必反弹吗？', 'Must price bounce at 0.618?', [opt('A', '是', 'Yes'), opt('B', '否', 'No'), opt('C', '只在牛市', 'Only in a bull market')], 'B', {
            A: ['比例没有“必须反弹”这一项。', 'The ratio has no clause that says price must bounce.'],
            B: ['价格可以穿过、停住，或根本不碰这条线。', 'Price can pass through it, pause, or never touch the line.'],
            C: ['牛市这个名字不改变公式。', 'The word bull market does not change the formula.']
          }),
          quiz('锚点改变后，价位会变吗？', 'If an anchor changes, do the prices change?', [opt('A', '会', 'Yes'), opt('B', '不会', 'No'), opt('C', '只变颜色', 'Only the color changes')], 'A', {
            A: ['每个价位都由两个锚点算出来。锚点变了，价位就变。', 'Every price is calculated from the two anchors. Move an anchor and the prices move.'],
            B: ['旧价位不能继续套在新的锚点上。', 'The old prices cannot stay pasted onto the new anchors.'],
            C: ['颜色没变，变的是算出来的价格。', 'The color stays. What changes is the calculated price.']
          })
        ],
        study: { kind: 'fib', lessonChart: 'fib-full', closes: [100, 108, 116, 124, 132, 140, 136, 128, 120], low: 100, high: 140, start: 6 }
      }),
      lesson({
        id: '07',
        title: bi('SMC：结构标签不等于机构证据', 'SMC: a structure label is not evidence of an institution'),
        scene: bi('图上标了订单块，是不是已经证明有机构在买？', 'The chart labels an order block. Does that prove an institution is buying?'),
        one: bi('FVG 和订单块只是按本课规则标出的价格区域，不证明是谁在交易，也不保证后面的走势。', 'An FVG and an order block are only price zones marked by this lesson’s rules, so they do not prove who traded and they do not guarantee the later path.'),
        explain: bi('左右各 2 根都出现，摆动高点或低点才算确认。\nBOS 是收盘价顺着原来的方向越过最近一个已确认高低点。\n影线刺穿但收盘没过，不算 BOS。\nCHoCH 是收盘价反向跌破或升破保护性的高低点。\n它只表示结构可能在变，不是反转已经完成，也不能和 BOS 贴在同一根上。\n扫荡是影线越过前高或前低，收盘又回到内侧。\n本课只说它符合这个形态，不说真有人在扫单。\n看涨 FVG：第三根低点高于第一根高点，区间是第一根高点到第三根低点。\n教学模拟：第一根高点 103，第三根低点 106，区间 103–106。\n这不是这段没有成交。\n订单块是突破前最后一根反向 K 线的实体，只是候选。\n这些标签都不保证后面的路径。', 'A swing high or low is confirmed only after 2 bars exist on each side.\nA BOS is a close that passes the latest confirmed high or low in the existing direction.\nA wick through that level does not count when the close stays back.\nA CHoCH is a close that breaks the protective high or low the other way.\nIt only says the structure may be changing. It is not a finished reversal, and it is not placed on the same bar as a BOS.\nA sweep is a wick beyond a prior high or low with the close back inside.\nThis lesson only says the shape matches. It does not say someone swept orders.\nA bullish FVG means the third low is above the first high, and the zone runs from that high to that low.\nTeaching simulation: the first high is 103 and the third low is 106, so the zone is 103–106.\nThat is not “nobody traded there.”\nAn order block is the body of the last opposite candle before the break. It is only a candidate.\nNone of these labels guarantees the later path.'),
        example: bi('教学模拟：A 高 103，C 低 106。\n106 高于 103，所以看涨缺口是 103–106。\n价格后来可以回到这个区间，也可以不回。\n订单块仍只是候选，不是机构买单的证据。', 'Teaching simulation: A’s high is 103 and C’s low is 106.\n106 is above 103, so the bullish gap is 103–106.\nPrice may come back into that zone later, or it may not.\nAn order block is still only a candidate. It is not proof of an institutional buy.'),
        pitfalls: [
          bi('把缺口理解成零成交', 'Reading a gap as zero trades'),
          bi('把订单块理解成机构已经买入的证据', 'Reading an order block as proof an institution already bought')
        ],
        practice: bi('点出收盘价突破结构的那根 K 线。影线刺穿但收盘没过，不算。', 'Tap the candle whose close breaks the structure. A wick through it does not count if the close does not.'),
        check: {
          ask: bi('103 到 106 的缺口等于这段没有成交吗？', 'Does a 103 to 106 gap mean nothing traded there?'),
          options: [opt('A', '等于', 'Yes'), opt('B', '不是', 'No'), opt('C', '只在模拟盘等于', 'Only on a demo account')],
          answer: 'B',
          miss: bi('缺口是三根 K 线的价格带没有重叠，不是成交量为零。', 'A gap means the price bands of three candles do not overlap. It does not mean volume was zero.')
        },
        quizzes: [
          quiz('FVG 说明这个区域绝对没有交易吗？', 'Does an FVG mean the zone had absolutely no trades?', [opt('A', '是', 'Yes'), opt('B', '不是', 'No'), opt('C', '必然', 'It must')], 'B', {
            A: ['三根 K 线只比较高低是否重叠，给不出无人成交的证明。', 'Three candles only compare whether the highs and lows overlap. They cannot prove nobody traded.'],
            B: ['103–106 只是第一根高点到第三根低点之间没有重叠。', '103–106 is only the band with no overlap from the first high to the third low.'],
            C: ['没有“必然没有成交”这条规则。', 'There is no rule that says trades were necessarily absent.']
          }),
          quiz('订单块标签能证明机构在买入吗？', 'Can an order-block label prove an institution is buying?', [opt('A', '能', 'Yes'), opt('B', '不能', 'No'), opt('C', '只有 BTC 能', 'Only BTC can')], 'B', {
            A: ['规则只挑出突破前的一根反向 K 线，不知道是谁下的单。', 'The rule only picks the opposite candle before the break. It does not know who placed the order.'],
            B: ['它是候选区，不是机构行为的证据。', 'It is a candidate zone, not evidence of an institution.'],
            C: ['换成 BTC 这个名字，证据也不会多出来。', 'The name BTC does not add evidence.']
          }),
          quiz('结构标签保证后面的走势吗？', 'Do structure labels guarantee the later path?', [opt('A', '保证', 'They do'), opt('B', '不保证', 'They do not'), opt('C', '只做多保证', 'Only longs are guaranteed')], 'B', {
            A: ['标签描述已经确认的结构，不锁定后面的路径。', 'A label describes structure that is already confirmed. It does not lock the later path.'],
            B: ['延续、转向或不回到这个区域都可能发生。', 'Continuation, a turn, or never returning to the zone can all happen.'],
            C: ['做多这个方向同样没有保证条款。', 'The long side has no guarantee clause either.']
          })
        ],
        study: {
          kind: 'zone',
          lessonChart: 'smc-full',
          bars: [
            { o: 100, h: 103, l: 99, c: 102 },
            { o: 102, h: 109, l: 101, c: 108 },
            { o: 108, h: 112, l: 106, c: 111 }
          ],
          zone: { low: 103, high: 106 },
          caption: bi('色带 103–106：第三根低点高于第一根高点。', 'Band 103–106: the third low is above the first high.'),
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
  function unit(i, salt) {
    var x = Math.imul((i + 1) ^ (salt * 131), 1103515245) + 12345;
    x = (x ^ (x >>> 16)) >>> 0;
    return (x % 10000) / 10000;
  }
  function tape(start, plan, salt) {
    var bars = [];
    var price = start;
    var hour = 0;
    plan.forEach(function (leg, legIndex) {
      var i;
      for (i = 0; i < leg.n; i++) {
        var u = unit(hour, salt + legIndex * 19);
        var mag = leg.lo + (leg.hi - leg.lo) * u;
        var delta = leg.dir * mag;
        if (u > 0.78) delta = -delta * (0.35 + unit(hour, salt + 5) * 0.4);
        var open = price;
        var close = round2(open + delta);
        var upWick = 6 + unit(hour, salt + 3) * (12 + Math.abs(delta) * 0.8);
        var downWick = 5 + unit(hour, salt + 8) * (10 + Math.abs(delta) * 0.6);
        bars.push({
          t: hour,
          o: open,
          h: round2(Math.max(open, close) + upWick),
          l: round2(Math.min(open, close) - downWick),
          c: close,
          v: 25 + Math.floor(unit(hour, salt + 21) * 110 + Math.abs(delta) * unit(hour, salt + 4) * 0.35)
        });
        price = close;
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
    var plans = {
      up: [{ n: 20, dir: 1, lo: 8, hi: 40 }, { n: 14, dir: -1, lo: 10, hi: 36 }, { n: 12, dir: 1, lo: 6, hi: 28 }, { n: 14, dir: -1, lo: 8, hi: 30 }, { n: 18, dir: 1, lo: 35, hi: 110 }, { n: 9, dir: -1, lo: 28, hi: 80 }, { n: 24, dir: 1, lo: 30, hi: 100 }, { n: 14, dir: -1, lo: 40, hi: 120 }, { n: 16, dir: 1, lo: 25, hi: 90 }, { n: 7, dir: -1, lo: 20, hi: 70 }, { n: 12, dir: 1, lo: 20, hi: 70 }],
      down: [{ n: 24, dir: 1, lo: 10, hi: 40 }, { n: 18, dir: -1, lo: 12, hi: 36 }, { n: 18, dir: 1, lo: 8, hi: 30 }, { n: 22, dir: -1, lo: 40, hi: 110 }, { n: 8, dir: 1, lo: 30, hi: 80 }, { n: 20, dir: -1, lo: 35, hi: 100 }, { n: 6, dir: 1, lo: 25, hi: 70 }, { n: 18, dir: -1, lo: 30, hi: 90 }, { n: 10, dir: 1, lo: 15, hi: 50 }, { n: 16, dir: -1, lo: 25, hi: 80 }],
      range: [{ n: 16, dir: 1, lo: 20, hi: 70 }, { n: 14, dir: -1, lo: 25, hi: 80 }, { n: 12, dir: 1, lo: 18, hi: 60 }, { n: 18, dir: -1, lo: 22, hi: 75 }, { n: 11, dir: 1, lo: 30, hi: 90 }, { n: 15, dir: -1, lo: 20, hi: 70 }, { n: 9, dir: 1, lo: 15, hi: 55 }, { n: 13, dir: -1, lo: 28, hi: 85 }, { n: 14, dir: 1, lo: 20, hi: 65 }, { n: 10, dir: -1, lo: 18, hi: 60 }, { n: 12, dir: 1, lo: 16, hi: 50 }, { n: 16, dir: -1, lo: 20, hi: 70 }],
      turn: [{ n: 36, dir: 1, lo: 20, hi: 70 }, { n: 8, dir: -1, lo: 8, hi: 20 }, { n: 28, dir: 1, lo: 30, hi: 90 }, { n: 6, dir: -1, lo: 80, hi: 180 }, { n: 18, dir: -1, lo: 25, hi: 70 }, { n: 8, dir: 1, lo: 20, hi: 50 }, { n: 16, dir: -1, lo: 20, hi: 60 }, { n: 20, dir: 1, lo: 10, hi: 30 }, { n: 20, dir: -1, lo: 15, hi: 40 }],
      exam: [{ n: 40, dir: 1, lo: 12, hi: 48 }, { n: 12, dir: -1, lo: 10, hi: 36 }, { n: 28, dir: 1, lo: 20, hi: 70 }, { n: 10, dir: -1, lo: 18, hi: 50 }, { n: 22, dir: 1, lo: 16, hi: 55 }, { n: 16, dir: -1, lo: 12, hi: 40 }, { n: 18, dir: 1, lo: 14, hi: 46 }, { n: 14, dir: -1, lo: 10, hi: 32 }]
    };
    var meta = { version: 1, timeframe: '1h', source: 'sim-btc-usdt-v1' };
    return {
      up: Object.assign({ id: 'up', zh: '上升回踩', en: 'Uptrend and pullbacks', salt: 40 }, meta, decorate(tape(60000, plans.up, 40), 60)),
      down: Object.assign({ id: 'down', zh: '下跌反弹', en: 'Decline and failed bounce', salt: 53 }, meta, decorate(tape(60000, plans.down, 53), 60)),
      range: Object.assign({ id: 'range', zh: '震荡假交叉', en: 'Range and fake crosses', salt: 66 }, meta, decorate(tape(60000, plans.range, 66), 60)),
      turn: Object.assign({ id: 'turn', zh: '反转滞后', en: 'Reversal and lag', salt: 11 }, meta, decorate(tape(62000, plans.turn, 11), 60)),
      exam: Object.assign({ id: 'exam', zh: '新行情', en: 'New tape', salt: 90 }, meta, decorate(tape(58000, plans.exam, 90), 60))
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
      scene: 'up',
      step: 'watch',
      shown: 48,
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
        if (id === 'down') return zh ? '点一根高点穿过快线、收盘又回到快线下面，而且后面收盘更低的 K 线。穿过不是反弹成功。' : 'Mark a bar whose high crosses the fast line and whose close comes back under it, with a later close still lower. A cross is not a successful bounce.';
        if (id === 'turn') return zh ? '点一根收盘已经跌破快线，但这条快线仍比 5 根之前更高的 K 线。价格先变，均线后转。' : 'Mark a bar whose close is already under the fast line while that line is still higher than it was 5 bars earlier. Price turns first.';
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
      if (state.scene === 'down') {
        var failed = state.marks.some(function (index) {
          var bar = pack.bars[index];
          var fast = pack.fast[index];
          if (!bar || fast == null || !(bar.h > fast && bar.c < fast)) return false;
          var later = false;
          var j;
          for (j = index + 1; j < pack.bars.length; j++) if (pack.bars[j].c < bar.c) later = true;
          return later;
        });
        if (failed) return { tone: 'is-right', text: zh ? '这根穿过快线后又回到下面，后面的收盘还更低。反弹失败不是买入。' : 'This bar crossed the fast line and came back under it, and a later close is lower. A failed bounce is not a buy.' };
        return { tone: '', text: zh ? '还不是。要高点在快线之上、收盘在快线之下，而且后面还有更低的收盘。' : 'Not yet. The high must be above the fast line, the close under it, and a later close must be lower.' };
      }
      if (state.scene === 'turn') {
        var lagged = state.marks.some(function (index) {
          var bar = pack.bars[index];
          var fast = pack.fast[index];
          var earlier = pack.fast[index - 5];
          return !!(bar && fast != null && earlier != null && bar.c < fast && fast > earlier);
        });
        if (lagged) return { tone: 'is-right', text: zh ? '收盘已经在快线下面，快线却还比 5 根之前更高。价格先转，均线后转。' : 'The close is already under the fast line, but the line is still higher than it was 5 bars earlier. Price turns first.' };
        return { tone: '', text: zh ? '还不是滞后那一根。收盘要在快线下面，快线本身还在抬高。' : 'Not the lag bar yet. The close must be under the fast line while the line itself is still rising.' };
      }
      if (state.scene === 'exam') {
        if (roles.some(function (item) { return item.crash; })) return { tone: 'is-right', text: zh ? '这根收盘先穿过去了，均线还在上面慢慢变。EMA 不能预测这根下跌。' : 'This close crossed first. The average is still catching up. EMA does not predict this drop.' };
        return { tone: '', text: zh ? '先打开均线，再点收盘穿过快线、快线还离得很远的那一根。' : 'Turn the averages on, then mark the bar whose close crosses the fast line while the line is still far away.' };
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
      if (!state.sized && root.clientWidth) {
        state.sized = true;
        if (root.clientWidth >= 800) state.shown = Math.min(80, maxShown());
      }
      var pack = prefix();
      var from = pack.current.visibleFrom;
      var draw = pack.bars.slice(from);
      var w = 980;
      var h = 440;
      var padL = 10;
      var padR = 74;
      var top = 14;
      var priceH = 300;
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
        var vh = Math.max(1, bar.v / volMax * 78);
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + (418 - vh) + '" width="' + bw + '" height="' + vh + '" fill="' + color + '" opacity="0.85"></rect>');
        if (i % 16 === 0) bits.push('<text x="' + xc + '" y="434" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
        var abs = from + i;
        if (state.marks.indexOf(abs) >= 0) bits.push('<circle cx="' + xc + '" cy="' + y(bar.h) + '" r="5" fill="none" stroke="#f4cb82" stroke-width="2"></circle>');
        if (!state.hideAnswer && state.showCross && roleAt(pack, abs).cross) bits.push('<polygon points="' + xc + ',' + (y(bar.l) + 12) + ' ' + (xc - 5) + ',' + (y(bar.l) + 22) + ' ' + (xc + 5) + ',' + (y(bar.l) + 22) + '" fill="#f0d59a"></polygon>');
        if (!state.hideAnswer && state.showReact && roleAt(pack, abs).near) bits.push('<circle cx="' + xc + '" cy="' + y(bar.c) + '" r="4" fill="none" stroke="#ffffff" stroke-width="1.4"></circle>');
        if (state.cursor === abs) bits.push('<line x1="' + xc + '" y1="' + top + '" x2="' + xc + '" y2="' + (top + priceH) + '" stroke="rgba(255,255,255,.45)" stroke-dasharray="3 3"></line>');
      });
      function poly(series, color, dash) {
        var run = [];
        function flush() {
          if (run.length > 1) bits.push('<polyline points="' + run.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.5"' + (dash ? ' stroke-dasharray="6 4"' : '') + '></polyline>');
          run = [];
        }
        draw.forEach(function (bar, i) {
          var value = series[from + i];
          if (value == null || value !== value || value === Infinity || value === -Infinity) flush();
          else run.push((padL + i * slot + slot / 2).toFixed(1) + ',' + y(value).toFixed(1));
        });
        flush();
      }
      if (state.showFast) poly(pack.fast, '#f4cb82', false);
      if (state.showSlow) poly(pack.slow, '#8eb4ff', true);
      if (state.showSlow && pack.slow.slice(from, from + draw.length).every(function (value) { return value == null; })) {
        bits.push('<text x="' + (padL + 8) + '" y="' + (top + 28) + '" fill="#f0d59a" font-size="14">' + (zh ? '历史数据不足，无法计算 EMA' + state.slowN : 'Not enough history to calculate EMA' + state.slowN) + '</text>');
      }
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
      var scenesBtns = ['up', 'down', 'range', 'turn'].map(function (id) {
        var item = scenes[id];
        return '<button type="button" data-scene="' + id + '" aria-pressed="' + (state.scene === id) + '">' + esc(zh ? item.zh : item.en) + '</button>';
      }).join('');
      var judge = '';
      if (state.step === 'judge') {
        var q = state.scene === 'range'
          ? { ask: zh ? '快线上穿慢线，但价格在窄幅来回。能否直接判定随后上涨？' : 'The fast line crosses above the slow line while price chops. Can you decide that price must then rise?', answer: 'A', options: [['A', zh ? '不能，交叉可能反复' : 'No, crosses can repeat'], ['B', zh ? '能，金叉必涨' : 'Yes, a cross must rise'], ['C', zh ? '只有第一根算' : 'Only the first one counts']] }
          : state.scene === 'down'
            ? { ask: zh ? '价格短暂穿过 EMA20 后又跌回去。这是不是已经反转向上？' : 'Price pokes through EMA20 and falls back. Has it already reversed upward?', answer: 'B', options: [['A', zh ? '已经反转，可以买' : 'Yes, buy it'], ['B', zh ? '不是，这是反弹失败' : 'No. The bounce failed'], ['C', zh ? '只有 EMA50 穿过才算' : 'Only an EMA50 cross counts']] }
            : state.scene === 'turn'
              ? { ask: zh ? '价格先跌破结构时，EMA50 会不会马上跟着拐头？' : 'When price breaks structure first, does EMA50 turn at the same moment?', answer: 'B', options: [['A', zh ? '会，它和价格同时转' : 'Yes, it turns with price'], ['B', zh ? '不会，它转得更晚' : 'No. It turns later'], ['C', zh ? '它会提前转' : 'It turns earlier']] }
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
      var note = state.note || readout(pack) || (zh ? '点一根 K 线，看收盘和两条均线。' : 'Tap a candle to read the close and both averages.');
      var look = state.scene === 'up'
        ? (zh ? '看这里：K 线回调时可能跌穿 EMA20，但这不代表趋势马上反转。' : 'Look here: a pullback can close through EMA20, and that still does not mean the trend reverses at once.')
        : (zh ? '反例：横盘里两条均线会反复交叉，交叉不是必涨。' : 'Counterexample: in a range the two averages cross again and again. A cross is not a sure rise.');
      root.innerHTML =
        '<div class="a1">' +
        '<p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p class="a1-checks"><label><input type="checkbox" data-check="fast"' + (state.showFast ? ' checked' : '') + '> ' + (zh ? 'EMA20（快线）黄色实线' : 'EMA20 (fast) gold solid line') + '</label> <label><input type="checkbox" data-check="slow"' + (state.showSlow ? ' checked' : '') + '> ' + (zh ? 'EMA50（慢线）蓝色虚线' : 'EMA50 (slow) blue dashed line') + '</label></p>' +
        '<p>' + (zh ? 'EMA20（快线）周期较短，通常更贴近近期价格。EMA50（慢线）周期较长，反应更慢。快线不是预测线，慢线也不是保证支撑。' : 'EMA20 (the fast line) uses fewer bars, so it usually stays closer to recent prices. EMA50 (the slow line) uses more bars, so it reacts more slowly. The fast line is not a forecast, and the slow line is not guaranteed support.') + '</p>' +
        '<div class="ema-scroll">' + bits.join('') + '</div>' +
        '<p>' + look + '</p>' +
        '<p>' + (zh ? '小练习：点出一根收盘跌穿 EMA20 的 K 线。' : 'Short practice: tap a candle whose close falls through EMA20.') + '</p>' +
        '<div class="a1-modes">' +
        '<button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="1">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + '</span></div>' +
        '<details class="ema-note"><summary>' + (zh ? '更多设置' : 'More settings') + '</summary><div class="a1-fields">' +
        '<label>EMA <input data-n="fast" type="number" min="5" max="200" value="' + state.fastN + '"></label>' +
        '<label>EMA <input data-n="slow" type="number" min="5" max="200" value="' + state.slowN + '"></label></div></details>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '公式：α=2/(N+1)。种子是前 N 根收盘的简单平均，之后 EMA=α×收盘+(1−α)×上一根 EMA。不够 N 根显示数据不足，不画 0。'
          : 'Formula: α=2/(N+1). The seed is the simple average of the first N closes, then EMA=α×close+(1−α)×previous EMA. Fewer than N bars says not ready, and does not draw 0.') + '</p></div>';
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
      var wide = (root.clientWidth || 0) >= 800;
      if (step === 'fail') {
        state.scene = state.scene === 'range' ? 'down' : 'range';
        state.hideAnswer = true;
        state.showCross = false;
        state.showFast = true;
        state.showSlow = true;
        state.shown = wide ? 80 : 48;
      } else if (step === 'exam') {
        state.scene = 'exam';
        state.hideAnswer = true;
        state.showFast = false;
        state.showSlow = false;
        state.shown = wide ? 70 : 40;
      } else {
        if (state.scene === 'exam') state.scene = 'up';
        state.shown = wide ? 80 : 48;
        state.showFast = true;
        state.showSlow = true;
      }
      paint();
    }
    if (root._emaClick) root.removeEventListener('click', root._emaClick);
    root._emaClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-step],[data-scene],[data-move],[data-layer],[data-bar],[data-judge],[data-trend],[data-lines],[data-more]') : null;
      if (!el || !root.contains(el)) return;
      if (el.hasAttribute('data-more')) {
        stop();
        state.scene = state.scene === 'up' ? 'range' : 'up';
        state.shown = (root.clientWidth || 0) >= 800 ? 80 : 48;
        state.note = state.scene === 'range'
          ? (zh ? '反例：这里两条均线来回交叉。交叉不是后面一定涨。' : 'Counterexample: the two averages cross back and forth here. A cross does not mean a later rise.')
          : '';
        state.tone = '';
        paint();
        return;
      }
      if (el.hasAttribute('data-step')) { enter(el.getAttribute('data-step')); return; }
      if (el.hasAttribute('data-scene')) {
        stop();
        state.scene = el.getAttribute('data-scene');
        state.step = 'mark';
        state.marks = [];
        state.note = '';
        state.tone = '';
        state.shown = (root.clientWidth || 0) >= 800 ? 80 : 48;
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
          state.shown = (root.clientWidth || 0) >= 800 ? (state.step === 'exam' ? 70 : 80) : (state.step === 'exam' ? 40 : 48);
          paint();
          return;
        }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      if (el.hasAttribute('data-layer')) {
        var layer = el.getAttribute('data-layer');
        if (layer === 'fast') { state.showFast = true; state.showSlow = false; }
        if (layer === 'slow') { state.showFast = false; state.showSlow = true; }
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
        var live = prefix();
        var barNow = live.bars[index];
        var fastNow = live.fast[index];
        var prevFast = live.fast[index - 1];
        var prevBar = live.bars[index - 1];
        if (state.scene === 'up' && barNow && fastNow != null && prevFast != null && prevBar && prevBar.c >= prevFast && barNow.c < fastNow) {
          state.note = zh ? '这根收盘跌穿了 EMA20。跌穿还不代表趋势马上反转。' : 'This close fell through EMA20. Falling through it still does not mean the trend reverses at once.';
          state.tone = 'is-right';
          paint();
          return;
        }
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
      if (!input || !input.getAttribute) return;
      if (input.getAttribute('data-check')) {
        if (input.getAttribute('data-check') === 'fast') state.showFast = !!input.checked;
        if (input.getAttribute('data-check') === 'slow') state.showSlow = !!input.checked;
        paint();
        return;
      }
      if (!input.getAttribute('data-n')) return;
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
      step: 'mark',
      shown: 28,
      cursor: null,
      playing: false,
      showFast: true,
      showSlow: false,
      showDif: true,
      showDea: true,
      showHist: true,
      showCross: false,
      hideAnswer: true,
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
      var note = state.note || readout(pack) || (zh ? '小练习：点出一根金叉，也就是 DIF 上穿 DEA 的那根。' : 'Short practice: tap a golden cross, the bar where DIF crosses above DEA.');
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是 K 线，下面是 MACD。黄线 DIF 是 EMA12 减 EMA26，蓝虚线 DEA 是 DIF 的 9 根平均，柱子是 DIF 减 DEA，不乘 2。' : 'Candles are on top. MACD is below. The gold DIF line is EMA12 minus EMA26, the blue dashed DEA line is the 9-bar average of DIF, and a bar is DIF minus DEA, not doubled.') + '</p>' +
        '<div class="macd-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>DIF</span><span><i style="background:#8eb4ff"></i>DEA</span><span><i style="background:#1f8a4d"></i>' + (zh ? '正柱' : 'Positive bar') + '</span><span><i style="background:#d4534e"></i>' + (zh ? '负柱' : 'Negative bar') + '</span><span>0 ' + (zh ? '零轴' : 'zero') + '</span></p>' +
        '<p>' + (state.scene === 'fail'
          ? (zh ? '反例：零轴下方的金叉仍可能后面创新低。' : 'Counterexample: a golden cross below zero can still be followed by a new low.')
          : (zh ? '小练习：点出一根金叉。金叉不是买入按钮。' : 'Short practice: tap a golden cross. A golden cross is not a buy button.')) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="macd">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '公式：DIF=EMA(收盘,12)−EMA(收盘,26)。DEA 是有效 DIF 的 9 周期 EMA。柱=DIF−DEA，不乘 2。不够预热显示数据不足，不画 0。'
          : 'Formula: DIF=EMA(close,12)−EMA(close,26). DEA is the 9-bar EMA of valid DIF values. A bar is DIF−DEA, not doubled. Before the warmup, the chart says not ready and does not draw 0.') + '</p></div>';
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
      var el = ev.target.closest ? ev.target.closest('[data-step],[data-scene],[data-move],[data-layer],[data-bar],[data-judge],[data-more]') : null;
      if (!el || !root.contains(el)) return;
      if (el.getAttribute('data-more') === 'macd') {
        stop();
        state.scene = state.scene === 'above' ? 'fail' : 'above';
        state.step = 'mark';
        state.pricePts = [];
        state.macdPts = [];
        state.note = '';
        state.tone = '';
        state.shown = 28;
        paint();
        return;
      }
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

/* RSI lesson chart. Wilder math and drawing live here, not in the lab engine. */
(function (global) {
  function rsi(closes, n) {
    var out = closes.map(function () { return null; });
    n = Math.round(Number(n));
    if (n < 1 || closes.length <= n) return out;
    var gain = 0;
    var loss = 0;
    var i;
    for (i = 1; i <= n; i++) {
      var ch = closes[i] - closes[i - 1];
      if (ch > 0) gain += ch;
      else loss -= ch;
    }
    var avgGain = gain / n;
    var avgLoss = loss / n;
    function value(g, l) {
      if (g === 0 && l === 0) return 50;
      if (l === 0 && g > 0) return 100;
      if (g === 0 && l > 0) return 0;
      return 100 - 100 / (1 + g / l);
    }
    out[n] = value(avgGain, avgLoss);
    for (i = n + 1; i < closes.length; i++) {
      var delta = closes[i] - closes[i - 1];
      var up = delta > 0 ? delta : 0;
      var down = delta < 0 ? -delta : 0;
      avgGain = ((n - 1) * avgGain + up) / n;
      avgLoss = ((n - 1) * avgLoss + down) / n;
      out[i] = value(avgGain, avgLoss);
    }
    return out;
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
        var wick = Math.max(8, Math.abs(step[1]) * 0.35);
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
  function swings(bars, from, mode) {
    var out = [];
    var i;
    for (i = Math.max(from, 3); i < bars.length - 3; i++) {
      var ok = true;
      var k;
      for (k = 1; k <= 3; k++) {
        if (mode === 'high') {
          if (bars[i].h < bars[i - k].h || bars[i].h < bars[i + k].h) ok = false;
        } else if (bars[i].l > bars[i - k].l || bars[i].l > bars[i + k].l) ok = false;
      }
      if (ok) out.push(i);
    }
    return out;
  }
  function decorate(bars) {
    var values = rsi(bars.map(function (bar) { return bar.c; }), 14);
    var from = 60;
    return {
      bars: bars,
      visibleFrom: from,
      visible: bars.length - from,
      rsi: values,
      highs: swings(bars, from, 'high'),
      lows: swings(bars, from, 'low')
    };
  }
  function buildScenes() {
    return {
      hot: Object.assign({ id: 'hot', zh: '持续超买', en: 'Stays overbought' }, decorate(walk(40000, [[40, 8], [100, 18], [20, -2]]))),
      cold: Object.assign({ id: 'cold', zh: '持续超卖', en: 'Stays oversold' }, decorate(walk(80000, [[160, -30]]))),
      bear: Object.assign({ id: 'bear', zh: '顶背离', en: 'Bearish divergence' }, decorate(walk(42000, [[50, 6], [24, 80], [12, -35], [22, 28], [18, -8], [28, 4]]))),
      bull: Object.assign({ id: 'bull', zh: '底背离', en: 'Bullish divergence' }, decorate(walk(70000, [[50, -4], [24, -70], [12, 30], [22, -22], [18, 6], [28, -3]]))),
      fake: Object.assign({ id: 'fake', zh: '假背离', en: 'Fake divergence' }, decorate(walk(43000, [[50, 6], [24, 70], [14, -40], [18, 18], [16, -6], [24, 2], [12, 2]]))),
      exam: Object.assign({ id: 'exam', zh: '新行情', en: 'New tape' }, decorate(walk(45000, [[48, 10], [28, 55], [10, -20], [20, 22], [16, -8], [24, 8], [12, -6]])))
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
      scene: 'hot',
      step: 'mark',
      shown: 28,
      cursor: null,
      playing: false,
      period: 14,
      ob: 70,
      os: 30,
      showRsi: true,
      showTime: false,
      hideAnswer: false,
      pricePts: [],
      rsiPts: [],
      note: '',
      tone: '',
      examStage: 'strength'
    };
    if (root._rsiTimer) clearInterval(root._rsiTimer);
    root._rsiTimer = null;
    function scene() { return scenes[state.scene]; }
    function maxShown() { return scene().bars.length - scene().visibleFrom; }
    function stop() {
      state.playing = false;
      if (root._rsiTimer) clearInterval(root._rsiTimer);
      root._rsiTimer = null;
    }
    function prefix() {
      var current = scene();
      var end = current.visibleFrom + state.shown;
      var bars = current.bars.slice(0, end);
      return { current: current, end: end, bars: bars, rsi: rsi(bars.map(function (bar) { return bar.c; }), state.period) };
    }
    function bias(pack) {
      var first = pack.bars[pack.current.visibleFrom].c;
      var last = pack.bars[pack.bars.length - 1].c;
      if (last > first * 1.01) return 'up';
      if (last < first * 0.99) return 'down';
      return 'flat';
    }
    function confirmed(pack, index, mode) {
      if (index < 3 || index + 3 >= pack.bars.length) return false;
      var k;
      for (k = 1; k <= 3; k++) {
        if (mode === 'high') {
          if (pack.bars[index].h < pack.bars[index - k].h || pack.bars[index].h < pack.bars[index + k].h) return false;
        } else if (pack.bars[index].l > pack.bars[index - k].l || pack.bars[index].l > pack.bars[index + k].l) return false;
      }
      return true;
    }
    function taskText() {
      if (state.step === 'exam') {
        if (state.examStage === 'strength') return zh ? '先藏起 RSI。看已经放出来的 K 线，判断收盘整体是抬高、差不多，还是压低。' : 'RSI stays hidden. From the candles already shown, judge whether closes are rising, flat, or falling.';
        return zh ? 'RSI 打开了。点两个价格高点，再点同一时间附近的 RSI 高点。第二处价格要更高，RSI 要更低。' : 'RSI is on. Mark two price highs, then the nearby RSI highs. The later price high must be higher and the RSI high lower.';
      }
      if (state.step === 'judge') return zh ? '判断这一句。点错会说明原因。' : 'Judge this statement. A wrong pick explains why.';
      if (state.scene === 'cold') return zh ? '点一根 RSI 低于超卖参考线、而且后面已经放出来的收盘还更低的 K 线。低于 30 不是抄底命令。' : 'Mark a bar with RSI under the oversold line whose later close is still lower. Below 30 is not an order to buy.';
      if (state.scene === 'bear' || state.scene === 'exam') return zh ? '先点两个价格高点，再在副图点对应的 RSI 高点。时间要对上。' : 'Mark two price highs, then the matching RSI highs. The times have to line up.';
      if (state.scene === 'bull') return zh ? '先点两个价格低点，再点对应的 RSI 低点。第二处价格要更低，RSI 要更高，才是底背离。' : 'Mark two price lows, then the matching RSI lows. The later price low must be lower and the RSI low higher.';
      if (state.scene === 'fake') return zh ? '试着点两个价格高点和 RSI。如果第二个价格高点没有更高，就不是顶背离。' : 'Try two price highs and the RSI highs. If the second price high is not higher, it is not bearish divergence.';
      return zh ? '看 RSI 停在超买参考线上面时，价格是不是还在涨。后面的 K 线先藏着。点一根看收盘和 RSI。' : 'Watch whether price is still rising while RSI stays above the overbought line. Later candles stay hidden. Tap one for the close and RSI.';
    }
    function gradeDivergence(pack) {
      var mode = state.scene === 'bull' ? 'low' : 'high';
      if (state.pricePts.length < 2 || state.rsiPts.length < 2) {
        return { tone: '', text: zh ? '价格点 ' + state.pricePts.length + '/2，RSI 点 ' + state.rsiPts.length + '/2。' : 'Price points ' + state.pricePts.length + '/2, RSI points ' + state.rsiPts.length + '/2.' };
      }
      var price = state.pricePts.slice().sort(function (a, b) { return a - b; });
      var rsiPts = state.rsiPts.slice().sort(function (a, b) { return a - b; });
      if (!confirmed(pack, price[0], mode) || !confirmed(pack, price[1], mode)) {
        return { tone: 'is-wrong', text: zh ? '有一根还不能算摆动点。左右各 3 根都要更' + (mode === 'high' ? '低' : '高') + '，而且右边 3 根要已经放出来。' : 'One mark is not a confirmed swing. Three bars on each side must be beyond it, and the later three must already be shown.' };
      }
      if (Math.abs(rsiPts[0] - price[0]) > 2 || Math.abs(rsiPts[1] - price[1]) > 2) {
        return { tone: 'is-wrong', text: zh ? '时间窗口不对应。RSI 的点要和价格摆动点在同一根，或左右不超过 2 根。' : 'The time windows do not match. Each RSI point must be on the same bar as the price swing, or within 2 bars.' };
      }
      var left = pack.rsi[rsiPts[0]];
      var right = pack.rsi[rsiPts[1]];
      if (left == null || right == null) return { tone: '', text: zh ? '这两根的 RSI 还不能计算，不显示 0。' : 'RSI is not ready on one of these bars. No fake zero is shown.' };
      if (mode === 'high') {
        if (!(pack.bars[price[1]].h > pack.bars[price[0]].h)) {
          return { tone: state.scene === 'fake' ? 'is-right' : 'is-wrong', text: zh ? '第二价格高点没有更高，所以这不是本课的顶背离。RSI 下降本身不是背离。' : 'The second price high is not higher, so this is not bearish divergence. A falling RSI by itself is not divergence.' };
        }
        if (!(right < left)) return { tone: 'is-wrong', text: zh ? 'RSI 没有更低高点。两个点都要看 RSI 的局部高点。' : 'RSI does not make a lower high. Both points have to be RSI highs.' };
        return { tone: 'is-right', text: zh ? '价格更高高点，RSI 更低高点，时间也对齐。这是顶背离，仍然不保证反转，也不是做空命令。' : 'Higher price high, lower RSI high, and the times line up. This is bearish divergence. It still does not guarantee a reversal or a short.' };
      }
      if (!(pack.bars[price[1]].l < pack.bars[price[0]].l)) return { tone: 'is-wrong', text: zh ? '第二价格低点没有更低，所以这不是底背离。' : 'The second price low is not lower, so this is not bullish divergence.' };
      if (!(right > left)) return { tone: 'is-wrong', text: zh ? 'RSI 没有更高低点。' : 'RSI does not make a higher low.' };
      return { tone: 'is-right', text: zh ? '价格更低低点，RSI 更高低点，时间也对齐。这是底背离，仍然不保证反弹，也不是买入命令。' : 'Lower price low, higher RSI low, and the times line up. This is bullish divergence. It still does not guarantee a bounce or a buy.' };
    }
    function gradeBar(pack, index) {
      var value = pack.rsi[index];
      if (state.step === 'exam' && state.examStage === 'div') return gradeDivergence(pack);
      if (value == null) return { tone: '', text: zh ? '这根 RSI 还不能计算。前 ' + state.period + ' 次涨跌不够，不显示 0。' : 'RSI is not ready. Fewer than ' + state.period + ' changes exist, so no fake 0 is shown.' };
      if (state.scene === 'cold') {
        var lower = false;
        var i;
        for (i = index + 1; i < pack.bars.length; i++) if (pack.bars[i].c < pack.bars[index].c) lower = true;
        if (value < state.os && lower) return { tone: 'is-right', text: zh ? 'RSI 低于 ' + state.os + '，后面的收盘还更低。超卖只说明最近跌得相对多，不是马上抄底。' : 'RSI is under ' + state.os + ', and a later close is lower. Oversold only says the recent fall is relatively large. It is not an order to buy.' };
        if (value < state.os) return { tone: '', text: zh ? '这根是低于参考线，但后面还没有更低的收盘。把后面的 K 线放出来，或点更早的一根。' : 'This bar is under the line, but no later close is lower yet. Reveal more bars, or pick an earlier one.' };
        return { tone: '', text: zh ? '这根没有低于超卖参考线 ' + state.os + '。这只是参考阈值。' : 'This bar is not under the oversold line at ' + state.os + '. That number is only a reference.' };
      }
      if (state.scene === 'bear' || state.scene === 'bull' || state.scene === 'fake') return gradeDivergence(pack);
      var higher = false;
      var j;
      for (j = index + 1; j < pack.bars.length; j++) if (pack.bars[j].c > pack.bars[index].c) higher = true;
      if (value > state.ob && higher) return { tone: 'is-right', text: zh ? 'RSI 高于 ' + state.ob + '，后面的收盘还更高。超买只说明涨得相对强，不是马上卖，也不是做空命令。' : 'RSI is above ' + state.ob + ', and a later close is higher. Overbought only says the rise is relatively strong. It is not an order to sell or short.' };
      if (value > state.ob) return { tone: '', text: zh ? '这根高于参考线，但后面还没有更高的收盘。请点更早的一根，或继续播放。' : 'This bar is above the line, but no later close is higher yet. Pick an earlier bar, or keep playing.' };
      return { tone: '', text: zh ? '这根没有高于超买参考线 ' + state.ob + '。' : 'This bar is not above the overbought line at ' + state.ob + '.' };
    }
    function readout(pack) {
      if (state.cursor == null) return '';
      var bar = pack.bars[state.cursor];
      if (!bar) return '';
      var value = pack.rsi[state.cursor];
      var prev = pack.rsi[state.cursor - 1];
      var when = zh ? '第 ' + (state.cursor - pack.current.visibleFrom + 1) + ' 根 · 模拟 1 小时' : 'Bar ' + (state.cursor - pack.current.visibleFrom + 1) + ' · simulated 1h';
      var rsiText = !state.showRsi ? (zh ? 'RSI 先藏着' : 'RSI is still hidden') : (value == null ? (zh ? '数据不足' : 'not ready') : fmt(value));
      var delta = !state.showRsi || value == null || prev == null ? (zh ? '数据不足' : 'not ready') : fmt(value - prev);
      return when + '<br>' + (zh ? '开 ' : 'O ') + fmt(bar.o) + (zh ? ' 高 ' : ' H ') + fmt(bar.h) + (zh ? ' 低 ' : ' L ') + fmt(bar.l) + (zh ? ' 收 ' : ' C ') + fmt(bar.c) + (zh ? ' 量 ' : ' V ') + bar.v +
        '<br>RSI(' + state.period + ') ' + rsiText + (zh ? '，较前一根 ' : ', change ') + delta;
    }
    function paint() {
      var pack = prefix();
      var from = pack.current.visibleFrom;
      var draw = pack.bars.slice(from);
      var w = 980;
      var h = 460;
      var padL = 10;
      var padR = 78;
      var top = 16;
      var priceH = 188;
      var vals = [];
      draw.forEach(function (bar) { vals.push(bar.h, bar.l); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      if (min === max) { min -= 1; max += 1; }
      var span = max - min;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * priceH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var rsiTop = 286;
      var rsiH = 140;
      function ry(v) { return rsiTop + (100 - v) / 100 * rsiH; }
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (zh ? '模拟BTC与RSI' : 'Simulated BTC and RSI') + '">'];
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
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + (262 - vh) + '" width="' + bw + '" height="' + vh + '" fill="' + color + '" opacity="0.8"></rect>');
        if (i % 16 === 0) bits.push('<text x="' + xc + '" y="452" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
      });
      if (state.showRsi) {
        bits.push('<rect x="' + padL + '" y="' + ry(100) + '" width="' + (w - padL - padR) + '" height="' + (ry(state.ob) - ry(100)) + '" fill="rgba(212,83,78,.12)"></rect>');
        bits.push('<rect x="' + padL + '" y="' + ry(state.os) + '" width="' + (w - padL - padR) + '" height="' + (ry(0) - ry(state.os)) + '" fill="rgba(31,138,77,.12)"></rect>');
        [[state.ob, zh ? state.ob + ' 超买' : state.ob + ' overbought', '#d4534e'], [50, '50', '#8eb4ff'], [state.os, zh ? state.os + ' 超卖' : state.os + ' oversold', '#7dcea0']].forEach(function (level) {
          bits.push('<line x1="' + padL + '" y1="' + ry(level[0]) + '" x2="' + (w - padR) + '" y2="' + ry(level[0]) + '" stroke="' + level[2] + '" stroke-dasharray="4 3"></line>');
          bits.push('<text x="' + (w - 8) + '" y="' + (ry(level[0]) + 4) + '" text-anchor="end" fill="' + level[2] + '" font-size="13">' + level[1] + '</text>');
        });
        var pts = [];
        draw.forEach(function (bar, i) {
          var value = pack.rsi[from + i];
          if (value != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + ry(value).toFixed(1));
        });
        if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#f4cb82" stroke-width="2.4"></polyline>');
      } else {
        bits.push('<text x="' + (padL + 12) + '" y="' + (rsiTop + 40) + '" fill="#d4bc9e" font-size="16">' + (zh ? 'RSI 先藏着' : 'RSI is hidden') + '</text>');
      }
      function link(points, pane) {
        if (points.length < 2) return;
        var sorted = points.slice().sort(function (a, b) { return a - b; });
        var line = sorted.map(function (abs) {
          var i = abs - from;
          if (i < 0 || i >= draw.length) return '';
          var xc = padL + i * slot + slot / 2;
          var yy = pane === 'price' ? y(state.scene === 'bull' ? pack.bars[abs].l : pack.bars[abs].h) : ry(pack.rsi[abs] == null ? 50 : pack.rsi[abs]);
          return xc.toFixed(1) + ',' + yy.toFixed(1);
        }).filter(Boolean);
        if (line.length === 2) bits.push('<polyline points="' + line.join(' ') + '" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 3"></polyline>');
      }
      link(state.pricePts, 'price');
      if (state.showRsi) link(state.rsiPts, 'rsi');
      function dots(points, pane) {
        points.forEach(function (abs) {
          var i = abs - from;
          if (i < 0 || i >= draw.length) return;
          var xc = padL + i * slot + slot / 2;
          var yy = pane === 'price' ? y(state.scene === 'bull' ? pack.bars[abs].l : pack.bars[abs].h) : ry(pack.rsi[abs] == null ? 50 : pack.rsi[abs]);
          bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="5" fill="none" stroke="#ffffff" stroke-width="2"></circle>');
          if (state.showTime && pane === 'price') bits.push('<line x1="' + xc + '" y1="' + top + '" x2="' + xc + '" y2="' + (rsiTop + rsiH) + '" stroke="rgba(240,213,154,.7)" stroke-dasharray="2 3"></line>');
        });
      }
      dots(state.pricePts, 'price');
      if (state.showRsi) dots(state.rsiPts, 'rsi');
      if (state.cursor != null && state.cursor >= from && state.cursor < pack.end) {
        var cx = padL + (state.cursor - from) * slot + slot / 2;
        bits.push('<line x1="' + cx + '" y1="' + top + '" x2="' + cx + '" y2="' + (rsiTop + rsiH) + '" stroke="rgba(255,255,255,.4)" stroke-dasharray="3 3"></line>');
      }
      draw.forEach(function (bar, i) {
        var abs = from + i;
        var x = padL + i * slot;
        bits.push('<rect data-bar="' + abs + '" data-pane="price" x="' + x + '" y="' + top + '" width="' + slot + '" height="246" fill="transparent" style="cursor:pointer"></rect>');
        bits.push('<rect data-bar="' + abs + '" data-pane="rsi" x="' + x + '" y="' + rsiTop + '" width="' + slot + '" height="' + rsiH + '" fill="transparent" style="cursor:pointer"></rect>');
      });
      bits.push('</svg>');
      var steps = [['watch', zh ? '看懂' : 'Watch'], ['mark', zh ? '自己标记' : 'Mark'], ['judge', zh ? '判断真假' : 'True or false'], ['fail', zh ? '失败案例' : 'Failure'], ['exam', zh ? '新行情考试' : 'New tape']];
      var sceneIds = ['hot', 'cold', 'bear', 'bull', 'fake'];
      var judge = '';
      if (state.step === 'judge') {
        var q = state.scene === 'cold'
          ? { ask: zh ? 'RSI 低于 30，是不是必须马上抄底？' : 'RSI is below 30. Do you have to buy immediately?', answer: 'B', options: [['A', zh ? '必须抄底' : 'You must buy'], ['B', zh ? '不是，低于 30 仍可以继续跌' : 'No. It can keep falling under 30'], ['C', zh ? '只有 RSI 到 0 才不是' : 'Only RSI 0 is not a buy']] }
          : state.scene === 'bear'
            ? { ask: zh ? '价格更高高点、RSI 更低高点，是否保证随后下跌？' : 'A higher price high and a lower RSI high: does that guarantee a drop?', answer: 'B', options: [['A', zh ? '保证，马上做空' : 'Yes, short now'], ['B', zh ? '不保证' : 'It does not'], ['C', zh ? '到了 70 才保证' : 'Only after 70']] }
            : state.scene === 'bull'
              ? { ask: zh ? '价格更低低点、RSI 更高低点，是否保证随后上涨？' : 'A lower price low and a higher RSI low: does that guarantee a rise?', answer: 'B', options: [['A', zh ? '保证' : 'It guarantees it'], ['B', zh ? '不保证' : 'It does not'], ['C', zh ? '超卖了就保证' : 'Oversold guarantees it']] }
              : state.scene === 'fake'
                ? { ask: zh ? '第二个价格高点没有更高，RSI 却在下降。这是顶背离吗？' : 'The second price high is not higher, while RSI falls. Is that bearish divergence?', answer: 'B', options: [['A', zh ? '是' : 'Yes'], ['B', zh ? '不是' : 'No'], ['C', zh ? '只要 RSI 下降就是' : 'Any falling RSI counts']] }
                : { ask: zh ? 'RSI 高于 70，是不是必须马上卖？' : 'RSI is above 70. Do you have to sell immediately?', answer: 'B', options: [['A', zh ? '必须马上卖' : 'You must sell now'], ['B', zh ? '不是，它还可以停在高位' : 'No. It can stay high'], ['C', zh ? '到了 80 才必须卖' : 'Only 80 forces a sale']] };
        judge = '<p>' + esc(q.ask) + '</p><div class="a1-modes">' + q.options.map(function (opt) {
          return '<button type="button" data-judge="' + opt[0] + '" data-answer="' + q.answer + '">' + opt[0] + '. ' + esc(opt[1]) + '</button>';
        }).join('') + '</div>';
      }
      var exam = '';
      if (state.step === 'exam' && state.examStage === 'strength') {
        exam = '<div class="a1-modes"><button type="button" data-bias="up">' + (zh ? '收盘在抬高' : 'Closes are rising') + '</button><button type="button" data-bias="flat">' + (zh ? '差不多' : 'About flat') + '</button><button type="button" data-bias="down">' + (zh ? '收盘在压低' : 'Closes are falling') + '</button></div>';
      }
      var note = state.note || readout(pack) || (zh ? '小练习：点出一根 RSI 高于 70、后面收盘还更高的 K 线。' : 'Short practice: tap a bar with RSI above 70 whose later close is still higher.');
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是 K 线，下面是 RSI(14)，刻度 0 到 100。70 是超买参考，30 是超卖参考，都不是买卖命令。' : 'Candles are on top. RSI(14) is below, on a scale from 0 to 100. 70 is an overbought reference and 30 is an oversold reference. Neither is an order.') + '</p>' +
        '<div class="rsi-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>RSI(14)</span><span><i style="background:#d4534e"></i>70 ' + (zh ? '超买' : 'overbought') + '</span><span><i style="background:#8eb4ff"></i>50</span><span><i style="background:#7dcea0"></i>30 ' + (zh ? '超卖' : 'oversold') + '</span></p>' +
        '<p>' + (state.scene === 'cold'
          ? (zh ? '反例：RSI 低于 30 时，价格仍可以继续跌。' : 'Counterexample: while RSI is under 30, price can keep falling.')
          : (zh ? '小练习：点出一根 RSI 高于 70、后面还在涨的 K 线。超买不是马上卖。' : 'Short practice: tap a bar with RSI above 70 that is still followed by a higher close. Overbought is not a sell order.')) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="rsi">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p></div>';
    }
    function setShown(next) {
      state.shown = Math.max(1, Math.min(maxShown(), next));
      if (state.cursor != null && state.cursor >= scene().visibleFrom + state.shown) state.cursor = null;
    }
    function enter(step) {
      stop();
      state.step = step;
      state.pricePts = [];
      state.rsiPts = [];
      state.cursor = null;
      state.note = '';
      state.tone = '';
      state.examStage = 'strength';
      state.showRsi = true;
      if (step === 'fail') {
        state.scene = state.scene === 'fake' ? 'cold' : 'fake';
        state.hideAnswer = true;
        state.shown = 28;
      } else if (step === 'exam') {
        state.scene = 'exam';
        state.hideAnswer = true;
        state.showRsi = false;
        state.shown = 40;
      } else {
        if (state.scene === 'exam') state.scene = 'hot';
        state.shown = 28;
        state.hideAnswer = step !== 'watch';
      }
      paint();
    }
    if (root._rsiClick) root.removeEventListener('click', root._rsiClick);
    root._rsiClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-step],[data-scene],[data-move],[data-layer],[data-bar],[data-judge],[data-bias],[data-more]') : null;
      if (!el || !root.contains(el)) return;
      if (el.getAttribute('data-more') === 'rsi') {
        stop();
        state.scene = state.scene === 'hot' ? 'cold' : 'hot';
        state.step = 'mark';
        state.note = '';
        state.tone = '';
        state.shown = 28;
        paint();
        return;
      }
      if (el.hasAttribute('data-step')) { enter(el.getAttribute('data-step')); return; }
      if (el.hasAttribute('data-scene')) {
        stop();
        state.scene = el.getAttribute('data-scene');
        state.step = 'mark';
        state.pricePts = [];
        state.rsiPts = [];
        state.note = '';
        state.tone = '';
        state.hideAnswer = true;
        state.showRsi = true;
        state.shown = 28;
        paint();
        return;
      }
      if (el.hasAttribute('data-move')) {
        var move = el.getAttribute('data-move');
        if (move === 'play') {
          if (state.playing) { stop(); paint(); return; }
          state.playing = true;
          root._rsiTimer = setInterval(function () {
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
          state.rsiPts = [];
          state.cursor = null;
          state.note = '';
          state.tone = '';
          state.examStage = 'strength';
          if (state.step === 'exam') state.showRsi = false;
          state.shown = state.step === 'exam' ? 40 : 28;
          paint();
          return;
        }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      if (el.hasAttribute('data-layer')) {
        var layer = el.getAttribute('data-layer');
        if (layer === 'time') state.showTime = !state.showTime;
        if (layer === 'hide') state.hideAnswer = !state.hideAnswer;
        paint();
        return;
      }
      if (el.hasAttribute('data-bias')) {
        var pick = el.getAttribute('data-bias');
        var answer = bias(prefix());
        var right = pick === answer;
        state.tone = right ? 'is-right' : 'is-wrong';
        if (right) {
          state.examStage = 'div';
          state.showRsi = true;
          state.note = zh ? '对。这只是已经放出来的方向，不是下一根的保证。现在打开 RSI，自己点顶背离。' : 'Correct. That is only the direction already shown, not a promise for the next bar. RSI is on. Mark the bearish divergence yourself.';
        } else state.note = zh ? '先看已经放出来的收盘。这段整体还在抬高，不是超卖，也不是叫你做空。' : 'Look at the closes already shown. This stretch is still rising. It is not oversold, and it is not an order to short.';
        paint();
        return;
      }
      if (el.hasAttribute('data-bar')) {
        var index = Number(el.getAttribute('data-bar'));
        var pane = el.getAttribute('data-pane');
        state.cursor = index;
        var marking = state.step === 'mark' || state.step === 'fail' || (state.step === 'exam' && state.examStage === 'div');
        var divMode = state.scene === 'bear' || state.scene === 'bull' || state.scene === 'fake' || (state.step === 'exam' && state.examStage === 'div');
        if (marking && divMode) {
          if (state.step === 'exam' && !state.showRsi) {
            state.note = zh ? '先判断 K 线方向，再打开 RSI。' : 'Judge the candles first, then turn RSI on.';
            state.tone = '';
          } else {
            var list = pane === 'rsi' ? state.rsiPts : state.pricePts;
            var at = list.indexOf(index);
            if (at >= 0) list.splice(at, 1);
            else {
              if (list.length >= 2) list.shift();
              list.push(index);
            }
            var graded = gradeDivergence(prefix());
            state.note = graded.text;
            state.tone = graded.tone;
          }
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
        var rightJudge = el.getAttribute('data-judge') === el.getAttribute('data-answer');
        state.tone = rightJudge ? 'is-right' : 'is-wrong';
        state.note = rightJudge
          ? (zh ? '对。超买、超卖和背离都不是下一根的命令。' : 'Correct. Overbought, oversold, and divergence are not orders for the next bar.')
          : (zh ? '不对。RSI 说的是最近涨跌的相对强弱，不保证下一根涨或跌。' : 'No. RSI describes the relative strength of recent rises and falls. It does not guarantee the next bar.');
        paint();
      }
    };
    root.addEventListener('click', root._rsiClick);
    if (root._rsiChange) root.removeEventListener('change', root._rsiChange);
    root._rsiChange = function (ev) {
      var input = ev.target;
      if (!input || !input.getAttribute || !input.getAttribute('data-n')) return;
      var key = input.getAttribute('data-n');
      var value = Math.round(Number(input.value));
      if (key === 'period') {
        state.period = Math.max(5, Math.min(30, value || 14));
        state.note = zh ? '周期已改成 ' + state.period + '，按同一条 Wilder 公式重算。之前的标记清掉了。' : 'Period is now ' + state.period + '. RSI was recalculated with the same Wilder formula. Earlier marks were cleared.';
      } else if (key === 'ob') {
        state.ob = Math.max(51, Math.min(95, value || 70));
        state.note = zh ? '超买参考线改成 ' + state.ob + '。这仍是参考阈值，不是卖出命令。' : 'The overbought reference is now ' + state.ob + '. It is still a reference, not a sell order.';
      } else {
        state.os = Math.max(5, Math.min(49, value || 30));
        state.note = zh ? '超卖参考线改成 ' + state.os + '。这仍是参考阈值，不是买入命令。' : 'The oversold reference is now ' + state.os + '. It is still a reference, not a buy order.';
      }
      state.pricePts = [];
      state.rsiPts = [];
      state.tone = '';
      paint();
    };
    root.addEventListener('change', root._rsiChange);
    if (root._rsiKey) root.removeEventListener('keydown', root._rsiKey);
    root.tabIndex = 0;
    root._rsiKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      setShown(state.shown + (ev.key === 'ArrowRight' ? 1 : -1));
      paint();
    };
    root.addEventListener('keydown', root._rsiKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._rsiWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'rsi-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._rsiWrapped = true;
  }
  global.STAR_CH02_RSI = { rsi: rsi, buildScenes: buildScenes, mount: mount };
})(typeof window !== 'undefined' ? window : global);

/* Divergence lesson chart. Confirmation and indicator math live here, not in the lab. */
(function (global) {
  var CLASSIC = [
    { o: 76.4, h: 77.6, l: 75.9, c: 77 }, { o: 77, h: 82.6, l: 76.5, c: 82 }, { o: 82, h: 82.6, l: 78.5, c: 79 },
    { o: 79, h: 84.6, l: 78.5, c: 84 }, { o: 84, h: 84.6, l: 80.5, c: 81 }, { o: 81, h: 86.6, l: 80.5, c: 86 },
    { o: 86, h: 86.6, l: 82.5, c: 83 }, { o: 83, h: 88.6, l: 82.5, c: 88 }, { o: 88, h: 88.6, l: 85.5, c: 86 },
    { o: 86, h: 91.6, l: 85.5, c: 91 }, { o: 91, h: 91.6, l: 90.5, c: 91 }, { o: 91, h: 96.6, l: 90.5, c: 96 },
    { o: 96, h: 96.6, l: 95.5, c: 96 }, { o: 96, h: 101.6, l: 95.5, c: 101 }, { o: 101, h: 105, l: 100, c: 105 },
    { o: 99, h: 100, l: 96, c: 97 }, { o: 97, h: 97.6, l: 91, c: 91.5 }, { o: 91.5, h: 92.1, l: 91, c: 91.5 },
    { o: 91.5, h: 96.6, l: 91, c: 96 }, { o: 96, h: 102.1, l: 95.5, c: 101.5 }, { o: 101.5, h: 109, l: 101, c: 107 },
    { o: 107, h: 112, l: 104, c: 106 }, { o: 106, h: 106.6, l: 103.5, c: 104 }, { o: 104, h: 104.6, l: 100.5, c: 101 }
  ];
  function rsi(closes, n) {
    var out = closes.map(function () { return null; });
    if (closes.length <= n) return out;
    var gain = 0;
    var loss = 0;
    var i;
    for (i = 1; i <= n; i++) {
      var ch = closes[i] - closes[i - 1];
      if (ch > 0) gain += ch;
      else loss -= ch;
    }
    var avgGain = gain / n;
    var avgLoss = loss / n;
    function value(g, l) {
      if (g === 0 && l === 0) return 50;
      if (l === 0 && g > 0) return 100;
      if (g === 0 && l > 0) return 0;
      return 100 - 100 / (1 + g / l);
    }
    out[n] = value(avgGain, avgLoss);
    for (i = n + 1; i < closes.length; i++) {
      var delta = closes[i] - closes[i - 1];
      avgGain = ((n - 1) * avgGain + (delta > 0 ? delta : 0)) / n;
      avgLoss = ((n - 1) * avgLoss + (delta < 0 ? -delta : 0)) / n;
      out[i] = value(avgGain, avgLoss);
    }
    return out;
  }
  function ema(closes, n) {
    var out = closes.map(function () { return null; });
    if (closes.length < n) return out;
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
      for (j = 9; j < idx.length; j++) {
        prev = 0.2 * dif[idx[j]] + 0.8 * prev;
        dea[idx[j]] = prev;
      }
    }
    return { dif: dif, hist: dif.map(function (value, i) { return value == null || dea[i] == null ? null : value - dea[i]; }) };
  }
  function walk(start, steps) {
    var bars = [];
    var price = start;
    steps.forEach(function (step) {
      var i;
      for (i = 0; i < step[0]; i++) {
        var open = price;
        price = Math.round((open + step[1]) * 100) / 100;
        var wick = Math.max(0.4, Math.abs(step[1]) * 0.35);
        bars.push({
          o: open,
          h: Math.round((Math.max(open, price) + wick) * 100) / 100,
          l: Math.round((Math.min(open, price) - wick * 0.8) * 100) / 100,
          c: price,
          v: 40 + (bars.length % 5) * 3
        });
      }
    });
    return bars;
  }
  function extend(seed, deltas) {
    var bars = seed.map(function (bar) { return { o: bar.o, h: bar.h, l: bar.l, c: bar.c, v: bar.v || 40 }; });
    var price = bars[bars.length - 1].c;
    deltas.forEach(function (delta) {
      var open = price;
      price = Math.round((open + delta) * 100) / 100;
      var wick = Math.max(0.4, Math.abs(delta) * 0.35);
      bars.push({
        o: open,
        h: Math.round((Math.max(open, price) + wick) * 100) / 100,
        l: Math.round((Math.min(open, price) - wick * 0.8) * 100) / 100,
        c: price,
        v: 40
      });
    });
    return bars;
  }
  function swings(bars, wing, mode) {
    var out = [];
    var i;
    for (i = wing; i < bars.length - wing; i++) {
      var ok = true;
      var k;
      for (k = 1; k <= wing; k++) {
        if (mode === 'high') {
          if (bars[i].h < bars[i - k].h || bars[i].h < bars[i + k].h) ok = false;
        } else if (bars[i].l > bars[i - k].l || bars[i].l > bars[i + k].l) ok = false;
      }
      if (ok) out.push(i);
    }
    return out;
  }
  function decorate(bars, mode) {
    return { bars: bars, visible: bars.length, mode: mode, highs: swings(bars, 2, 'high'), lows: swings(bars, 2, 'low'), rsi: rsi(bars.map(function (bar) { return bar.c; }), 14) };
  }
  function buildScenes() {
    var mild = [];
    var rally = [];
    var i;
    for (i = 0; i < 40; i++) {
      mild.push(i < 20 ? -0.3 : 0.15);
      rally.push(0.9);
    }
    return {
      bear: Object.assign({ id: 'bear', zh: '这段顶背离', en: 'This bearish divergence', start: 22 }, decorate(extend(CLASSIC, mild), 'high')),
      bear2: Object.assign({ id: 'bear2', zh: '另一段顶背离', en: 'Another bearish divergence', start: 42 }, decorate(walk(100, [[20, 0.4], [18, 1.6], [8, -0.8], [16, 0.7], [8, -0.3], [12, 0.2]]), 'high')),
      bull: Object.assign({ id: 'bull', zh: '这段底背离', en: 'This bullish divergence', start: 42 }, decorate(walk(200, [[20, -0.3], [18, -1.5], [8, 0.7], [16, -0.6], [8, 0.2], [12, -0.15]]), 'low')),
      bull2: Object.assign({ id: 'bull2', zh: '另一段底背离', en: 'Another bullish divergence', start: 42 }, decorate(walk(160, [[16, -0.2], [22, -1.2], [10, 0.5], [18, -0.55], [10, 0.25], [12, -0.1]]), 'low')),
      fake: Object.assign({ id: 'fake', zh: '价格没更高', en: 'Price did not make a higher high', start: 40 }, decorate(walk(120, [[16, 0.3], [20, 1.4], [10, -0.9], [14, 0.35], [12, -0.2], [12, 0.1]]), 'high')),
      agree: Object.assign({ id: 'agree', zh: '一起创新高', en: 'Both make higher highs', start: 30 }, decorate(walk(100, [[8, 0.25], [6, -0.3], [8, 0.2], [6, -0.2], [12, 0.35], [10, -0.45], [18, 0.55], [8, -0.15]]), 'high')),
      rally: Object.assign({ id: 'rally', zh: '背离后仍涨', en: 'Still rising after divergence', start: 22 }, decorate(extend(CLASSIC, rally), 'high'))
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
    var state = { scene: 'bear', step: 'watch', shown: 22, cursor: null, playing: false, source: 'rsi', wing: 2, showTime: false, pricePts: [], indPts: [], note: '', tone: '' };
    if (root._divTimer) clearInterval(root._divTimer);
    root._divTimer = null;
    function scene() { return scenes[state.scene]; }
    function stop() {
      state.playing = false;
      if (root._divTimer) clearInterval(root._divTimer);
      root._divTimer = null;
    }
    function prefix() {
      var current = scene();
      var bars = current.bars.slice(0, state.shown);
      var closes = bars.map(function (bar) { return bar.c; });
      var pack = macd(closes);
      var series = state.source === 'dif' ? pack.dif : (state.source === 'hist' ? pack.hist : rsi(closes, 14));
      return { current: current, bars: bars, series: series };
    }
    function swingState(pack, index) {
      var wing = state.wing;
      var mode = pack.current.mode;
      if (index < wing || index + wing >= pack.bars.length) return 'wait';
      var k;
      for (k = 1; k <= wing; k++) {
        if (mode === 'high') {
          if (pack.bars[index].h < pack.bars[index - k].h || pack.bars[index].h < pack.bars[index + k].h) return 'no';
        } else if (pack.bars[index].l > pack.bars[index - k].l || pack.bars[index].l > pack.bars[index + k].l) return 'no';
      }
      return 'yes';
    }
    function taskText() {
      if (state.scene === 'bull' || state.scene === 'bull2') return zh ? '点两个已确认的价格低点，再点左右 2 根以内的指标低点。第二处价格要更低，指标要更高。' : 'Mark two confirmed price lows, then the indicator lows within 2 bars. The later price low must be lower and the indicator low higher.';
      if (state.scene === 'fake') return zh ? '试着点两个价格高点。如果第二个价格高点没有更高，就不是顶背离。' : 'Try two price highs. If the second price high is not higher, it is not bearish divergence.';
      if (state.scene === 'agree') return zh ? '点两个价格高点和对应的指标。如果两边一起创新高，就不是背离。' : 'Mark two price highs and the matching indicator points. If both make higher highs, it is not divergence.';
      if (state.scene === 'rally') return zh ? '先点 105 和 112 这一对已确认高点。再把后面的 K 线放出来，看价格是不是还能更高。' : 'First mark the confirmed highs at 105 and 112. Then reveal the later candles and see whether price can go higher still.';
      return zh ? '点两个已确认的价格高点，再点左右 2 根以内的指标高点。右侧 2 根没出来时不能标。' : 'Mark two confirmed price highs, then the indicator highs within 2 bars. You cannot mark a high before 2 bars exist on its right.';
    }
    function grade(pack) {
      if (state.pricePts.length < 2 || state.indPts.length < 2) return { tone: '', text: zh ? '价格点 ' + state.pricePts.length + '/2，指标点 ' + state.indPts.length + '/2。' : 'Price points ' + state.pricePts.length + '/2, indicator points ' + state.indPts.length + '/2.' };
      var price = state.pricePts.slice().sort(function (a, b) { return a - b; });
      var inds = state.indPts.slice().sort(function (a, b) { return a - b; });
      var left = swingState(pack, price[0]);
      var right = swingState(pack, price[1]);
      if (left === 'wait' || right === 'wait') return { tone: '', text: zh ? '还需要后续 K 线确认。左右各 ' + state.wing + ' 根都走出来，才能标。' : 'Later candles are still needed. ' + state.wing + ' bars must exist on each side before you can mark it.' };
      if (left !== 'yes' || right !== 'yes') return { tone: 'is-wrong', text: zh ? '有一根不是按左右各 ' + state.wing + ' 根确认的摆动点。' : 'One mark is not a swing confirmed by ' + state.wing + ' bars on each side.' };
      if (Math.abs(inds[0] - price[0]) > 2 || Math.abs(inds[1] - price[1]) > 2) return { tone: 'is-wrong', text: zh ? '时间窗口不对应。指标点要落在价格摆动点左右 2 根以内。' : 'The time windows do not match. Each indicator point must sit within 2 bars of the price swing.' };
      var a = pack.series[inds[0]];
      var b = pack.series[inds[1]];
      if (a == null || b == null) return { tone: '', text: zh ? '这两根指标还不能计算，不显示 0。' : 'The indicator is not ready on one of these bars. No fake 0 is shown.' };
      var mode = pack.current.mode;
      var name = state.source === 'dif' ? 'DIF' : (state.source === 'hist' ? (zh ? '柱子' : 'histogram') : 'RSI');
      if (mode === 'low') {
        if (!(pack.bars[price[1]].l < pack.bars[price[0]].l)) return { tone: 'is-wrong', text: zh ? '第二价格低点没有更低，所以不是底背离。' : 'The second price low is not lower, so this is not bullish divergence.' };
        if (!(b > a)) return { tone: 'is-wrong', text: zh ? name + ' 没有更高低点。两个点都要比同一条线。' : name + ' does not make a higher low. Both points must use the same line.' };
        return { tone: 'is-right', text: zh ? '价格更低低点，' + name + ' 更高低点，时间也在 2 根以内。这是底背离，不保证反弹。' : 'Lower price low, higher ' + name + ' low, within 2 bars. This is bullish divergence. It does not guarantee a bounce.' };
      }
      if (!(pack.bars[price[1]].h > pack.bars[price[0]].h)) {
        return { tone: state.scene === 'fake' || state.scene === 'agree' ? 'is-right' : 'is-wrong', text: zh ? '第二价格高点没有更高，所以这不是顶背离。' : 'The second price high is not higher, so this is not bearish divergence.' };
      }
      if (!(b < a)) {
        return { tone: state.scene === 'agree' ? 'is-right' : 'is-wrong', text: zh ? '价格和 ' + name + ' 一起走高，这不是背离。背离要的是指标没有一起创新高。' : 'Price and ' + name + ' both made a higher high. That is not divergence. Divergence needs the indicator to miss the new high.' };
      }
      var extra = state.scene === 'rally' ? (zh ? ' 再把后面的 K 线放出来，价格仍可能高于 112。' : ' Reveal the later candles. Price can still go above 112.') : (zh ? ' 这不保证下一根反转。' : ' It does not guarantee the next bar reverses.');
      return { tone: 'is-right', text: (zh ? '价格更高高点，' + name + ' 更低高点。' : 'Higher price high, lower ' + name + ' high.') + extra + (name === 'RSI' ? ' ' + fmt(a) + ' → ' + fmt(b) + '。' : '') };
    }
    function paint() {
      var pack = prefix();
      var draw = pack.bars;
      var w = 980;
      var h = 460;
      var padL = 10;
      var padR = 72;
      var top = 16;
      var priceH = 180;
      var vals = [];
      draw.forEach(function (bar) { vals.push(bar.h, bar.l); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = max - min || 1;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * priceH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var paneTop = 280;
      var paneH = 140;
      var smin = 0;
      var smax = 100;
      if (state.source !== 'rsi') {
        var abs = [];
        pack.series.forEach(function (value) { if (value != null) abs.push(Math.abs(value)); });
        smax = Math.max(1, Math.max.apply(null, abs.concat([1])));
        smin = -smax;
      }
      function sy(v) { return paneTop + (smax - v) / (smax - smin) * paneH; }
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = padL + i * slot + slot / 2;
        var bw = Math.max(2.2, slot * 0.55);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.2, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 12 === 0) bits.push('<text x="' + xc + '" y="452" fill="#b7aac8" font-size="12">' + (i + 1) + '</text>');
      });
      if (state.source === 'rsi') {
        [70, 50, 30].forEach(function (level) {
          bits.push('<line x1="' + padL + '" y1="' + sy(level) + '" x2="' + (w - padR) + '" y2="' + sy(level) + '" stroke="#8eb4ff" stroke-dasharray="4 3"></line>');
          bits.push('<text x="' + (w - 8) + '" y="' + (sy(level) + 4) + '" text-anchor="end" fill="#8eb4ff" font-size="13">' + level + '</text>');
        });
      } else {
        bits.push('<line x1="' + padL + '" y1="' + sy(0) + '" x2="' + (w - padR) + '" y2="' + sy(0) + '" stroke="#f0d59a" stroke-dasharray="4 3"></line>');
        bits.push('<text x="' + (w - 8) + '" y="' + (sy(0) + 4) + '" text-anchor="end" fill="#f0d59a" font-size="13">0</text>');
      }
      var pts = [];
      pack.series.forEach(function (value, i) { if (value != null) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + sy(value).toFixed(1)); });
      if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#f4cb82" stroke-width="2.4"></polyline>');
      function mark(list, pane) {
        var sorted = list.slice().sort(function (a, b) { return a - b; });
        if (sorted.length === 2) {
          var line = sorted.map(function (index) {
            var xc = padL + index * slot + slot / 2;
            var yy = pane === 'price' ? y(pack.current.mode === 'low' ? pack.bars[index].l : pack.bars[index].h) : sy(pack.series[index] == null ? (smin + smax) / 2 : pack.series[index]);
            return xc.toFixed(1) + ',' + yy.toFixed(1);
          });
          bits.push('<polyline points="' + line.join(' ') + '" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="4 3"></polyline>');
        }
        list.forEach(function (index) {
          if (index >= draw.length) return;
          var xc = padL + index * slot + slot / 2;
          var yy = pane === 'price' ? y(pack.current.mode === 'low' ? pack.bars[index].l : pack.bars[index].h) : sy(pack.series[index] == null ? (smin + smax) / 2 : pack.series[index]);
          bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="5" fill="none" stroke="#fff" stroke-width="2"></circle>');
          if (state.showTime && pane === 'price') bits.push('<line x1="' + xc + '" y1="' + top + '" x2="' + xc + '" y2="' + (paneTop + paneH) + '" stroke="rgba(240,213,154,.75)"></line>');
        });
      }
      mark(state.pricePts, 'price');
      mark(state.indPts, 'ind');
      if (state.cursor != null && state.cursor < draw.length) {
        var cx = padL + state.cursor * slot + slot / 2;
        bits.push('<line x1="' + cx + '" y1="' + top + '" x2="' + cx + '" y2="' + (paneTop + paneH) + '" stroke="rgba(255,255,255,.45)" stroke-dasharray="3 3"></line>');
      }
      draw.forEach(function (bar, i) {
        var x = padL + i * slot;
        bits.push('<rect data-bar="' + i + '" data-pane="price" x="' + x + '" y="' + top + '" width="' + slot + '" height="240" fill="transparent"></rect>');
        bits.push('<rect data-bar="' + i + '" data-pane="ind" x="' + x + '" y="' + paneTop + '" width="' + slot + '" height="' + paneH + '" fill="transparent"></rect>');
      });
      bits.push('</svg>');
      var ids = ['bear', 'bear2', 'bull', 'bull2', 'fake', 'agree', 'rally'];
      var readout = '';
      if (state.cursor != null && pack.bars[state.cursor]) {
        var bar = pack.bars[state.cursor];
        readout = (zh ? '第 ' + (state.cursor + 1) + ' 根 · 模拟' : 'Bar ' + (state.cursor + 1) + ' · simulated') + '<br>' + (zh ? '高 ' : 'H ') + fmt(bar.h) + (zh ? ' 低 ' : ' L ') + fmt(bar.l) + (zh ? ' 收 ' : ' C ') + fmt(bar.c) + '<br>' + (state.source === 'rsi' ? 'RSI(14) ' : state.source === 'dif' ? 'DIF ' : (zh ? '柱 ' : 'bar ')) + (pack.series[state.cursor] == null ? (zh ? '数据不足' : 'not ready') : fmt(pack.series[state.cursor]));
      }
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是价格，下面是指标。先点两个价格高点，再点同一时间附近的指标高点。EMA 只帮忙看趋势，不拿来判定背离。' : 'Price is on top and the indicator is below. Tap two price highs, then the indicator highs near the same time. EMA only helps you see the trend. It is not the divergence test.') + '</p>' +
        '<div class="a1-modes"><button type="button" data-source="rsi" aria-pressed="' + (state.source === 'rsi') + '">RSI</button><button type="button" data-source="dif" aria-pressed="' + (state.source === 'dif') + '">MACD</button></div>' +
        '<div class="div-scroll">' + bits.join('') + '</div>' +
        '<p>' + (state.scene === 'fake'
          ? (zh ? '反例：第二个价格高点没有更高，所以这不是顶背离。' : 'Counterexample: the second price high is not higher, so this is not bearish divergence.')
          : (zh ? '小练习：点出价格更高、RSI 更低的两个高点。背离不保证反转。' : 'Short practice: mark a higher price high with a lower RSI high. Divergence does not guarantee a reversal.')) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button><button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button><button type="button" data-more="div">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button><span>' + state.shown + ' / ' + scene().visible + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + (state.note || readout || (zh ? '价格两点和指标两点要对上时间。' : 'The two price points and the two indicator points have to match in time.')) + '</p></div>';
    }
    function setShown(next) { state.shown = Math.max(8, Math.min(scene().visible, next)); }
    function openScene(id) {
      stop();
      state.scene = id;
      state.shown = scenes[id].start;
      state.pricePts = [];
      state.indPts = [];
      state.cursor = null;
      state.note = '';
      state.tone = '';
      paint();
    }
    if (root._divClick) root.removeEventListener('click', root._divClick);
    root._divClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-scene],[data-move],[data-source],[data-wing],[data-time],[data-bar],[data-more]') : null;
      if (!el || !root.contains(el)) return;
      if (el.getAttribute('data-more') === 'div') {
        openScene(state.scene === 'bear' ? 'fake' : 'bear');
        return;
      }
      if (el.hasAttribute('data-scene')) { openScene(el.getAttribute('data-scene')); return; }
      if (el.hasAttribute('data-source')) {
        state.source = el.getAttribute('data-source');
        state.indPts = [];
        state.note = zh ? '已改成比这一条线。之前的指标点清掉了，不能和另一条线拼在一起。' : 'Now comparing this line. The old indicator points were cleared, so they are not mixed with another line.';
        state.tone = '';
        paint();
        return;
      }
      if (el.hasAttribute('data-wing')) { state.wing = Number(el.getAttribute('data-wing')); state.pricePts = []; state.indPts = []; paint(); return; }
      if (el.hasAttribute('data-time')) { state.showTime = !state.showTime; paint(); return; }
      if (el.hasAttribute('data-move')) {
        var move = el.getAttribute('data-move');
        if (move === 'play') {
          if (state.playing) { stop(); paint(); return; }
          state.playing = true;
          root._divTimer = setInterval(function () {
            if (!root.isConnected || state.shown >= scene().visible) { stop(); paint(); return; }
            setShown(state.shown + 1);
            paint();
          }, 280);
          paint();
          return;
        }
        if (move === 'reset') { state.shown = scene().start; state.pricePts = []; state.indPts = []; state.note = ''; state.tone = ''; stop(); paint(); return; }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      var index = Number(el.getAttribute('data-bar'));
      var pane = el.getAttribute('data-pane');
      state.cursor = index;
      if (pane === 'price' && swingState(prefix(), index) === 'wait') {
        state.note = zh ? '还需要后续 K 线确认。' : 'Later candles are still needed to confirm this swing.';
        state.tone = '';
        paint();
        return;
      }
      var list = pane === 'ind' ? state.indPts : state.pricePts;
      var at = list.indexOf(index);
      if (at >= 0) list.splice(at, 1);
      else { if (list.length >= 2) list.shift(); list.push(index); }
      var graded = grade(prefix());
      state.note = graded.text;
      state.tone = graded.tone;
      paint();
    };
    root.addEventListener('click', root._divClick);
    if (root._divKey) root.removeEventListener('keydown', root._divKey);
    root.tabIndex = 0;
    root._divKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      setShown(state.shown + (ev.key === 'ArrowRight' ? 1 : -1));
      paint();
    };
    root.addEventListener('keydown', root._divKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._divWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'div-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._divWrapped = true;
  }
  global.STAR_CH02_DIV = { rsi: rsi, buildScenes: buildScenes, classic: CLASSIC, mount: mount };
})(typeof window !== 'undefined' ? window : global);

/* Fibonacci lesson chart. Level math lives here, not in the lab. */
(function (global) {
  var RETRACE = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  var EXTEND = [1.272, 1.618];
  function round2(n) { return Math.round(n * 100) / 100; }
  function unit(i, salt) {
    var x = Math.imul((i + 1) ^ (salt * 131), 1103515245) + 12345;
    x = (x ^ (x >>> 16)) >>> 0;
    return (x % 10000) / 10000;
  }
  function levels(low, high, dir, mode) {
    if (low == null || high == null || low === high) return null;
    var span = high - low;
    var ratios = mode === 'extend' ? EXTEND : RETRACE;
    return ratios.map(function (ratio) {
      var price;
      if (mode === 'extend') price = dir === 'up' ? low + span * ratio : high - span * ratio;
      else price = dir === 'up' ? high - span * ratio : low + span * ratio;
      return { r: ratio, price: round2(price) };
    });
  }
  function tape() {
    var bars = [];
    var price = 64000;
    var i;
    for (i = 0; i < 92; i++) {
      var open = price;
      var close = open;
      if (i < 20) close = round2(open - 160 - unit(i, 3) * 80);
      else if (i === 20) close = 60240;
      else if (i < 50) close = round2(open + 220 + unit(i, 7) * 140);
      else if (i === 50) close = 69680;
      else close = round2(Math.max(60800, open - 180 - unit(i, 11) * 90));
      if (i !== 20 && i !== 50 && unit(i, 17) > 0.82) close = round2(open + (open - close) * 0.5);
      var upW = 18 + unit(i, 19) * 50;
      var dnW = 14 + unit(i, 23) * 40;
      bars.push({
        t: i,
        o: open,
        h: round2(Math.max(open, close) + upW),
        l: round2(Math.min(open, close) - dnW),
        c: close,
        v: 40 + Math.floor(unit(i, 29) * 70)
      });
      price = close;
    }
    bars[20].l = 60000;
    bars[20].o = Math.max(bars[20].o, 60100);
    bars[20].c = Math.max(bars[20].c, 60240);
    bars[20].h = Math.max(bars[20].h, bars[20].o, bars[20].c);
    bars[50].h = 70000;
    bars[50].o = Math.min(bars[50].o, 69400);
    bars[50].c = Math.min(bars[50].c, 69680);
    bars[50].l = Math.min(bars[50].l, bars[50].o, bars[50].c);
    return { bars: bars, lowAt: 20, highAt: 50, version: 1, source: 'sim-btc-usdt-fib-v1' };
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var data = tape();
    var state = {
      dir: 'up',
      mode: 'retrace',
      shown: 56,
      a: null,
      b: null,
      cursor: null,
      past: [],
      future: [],
      playing: false,
      note: '',
      tone: ''
    };
    if (root._fibTimer) clearInterval(root._fibTimer);
    function stop() {
      state.playing = false;
      if (root._fibTimer) clearInterval(root._fibTimer);
      root._fibTimer = null;
    }
    function snap(index) {
      var bar = data.bars[index];
      if (!bar) return null;
      var first = state.a == null;
      var price = state.dir === 'up' ? (first ? bar.l : bar.h) : (first ? bar.h : bar.l);
      return { index: index, price: price, t: bar.t };
    }
    function remember() {
      state.past.push({ a: state.a, b: state.b, dir: state.dir, mode: state.mode });
      if (state.past.length > 20) state.past.shift();
      state.future = [];
    }
    function anchors() {
      if (!state.a || !state.b) return null;
      var low = Math.min(state.a.price, state.b.price);
      var high = Math.max(state.a.price, state.b.price);
      return { low: low, high: high, lines: levels(low, high, state.dir, state.mode) };
    }
    function paint() {
      var draw = data.bars.slice(0, state.shown);
      var w = 980;
      var h = 420;
      var padL = 12;
      var padR = 108;
      var top = 16;
      var plotH = 360;
      var vals = [];
      draw.forEach(function (bar) { vals.push(bar.h, bar.l); });
      var drawn = anchors();
      if (drawn && drawn.lines) drawn.lines.forEach(function (line) { vals.push(line.price); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = max - min || 1;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * plotH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      var g;
      for (g = 0; g < 4; g++) {
        var price = min + (max - min) * g / 3;
        var gy = y(price);
        bits.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="rgba(230,199,158,.16)"></line>');
        bits.push('<text x="' + (w - 8) + '" y="' + (gy + 4) + '" text-anchor="end" fill="#d4bc9e" font-size="13">' + Math.round(price) + '</text>');
      }
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = padL + i * slot + slot / 2;
        var bw = Math.max(2.4, slot * 0.55);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.3, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 12 === 0) bits.push('<text x="' + xc + '" y="408" fill="#b7aac8" font-size="12">' + (i + 1) + '</text>');
        if (state.a && state.a.index === i) bits.push('<circle cx="' + xc + '" cy="' + y(state.a.price) + '" r="6" fill="none" stroke="#f4cb82" stroke-width="2"></circle>');
        if (state.b && state.b.index === i) bits.push('<circle cx="' + xc + '" cy="' + y(state.b.price) + '" r="6" fill="none" stroke="#8eb4ff" stroke-width="2"></circle>');
      });
      if (drawn && drawn.lines) {
        drawn.lines.forEach(function (line) {
          var yy = y(line.price);
          bits.push('<line x1="' + padL + '" y1="' + yy + '" x2="' + (w - padR) + '" y2="' + yy + '" stroke="#f0d59a" stroke-dasharray="5 3"></line>');
          var label = line.r + '  ' + line.price + (line.r === 0.5 ? (zh ? ' 中点' : ' mid') : '');
          bits.push('<text x="' + (padL + 6) + '" y="' + (yy - 4) + '" fill="#f0d59a" font-size="13">' + label + '</text>');
        });
      } else if (state.a && state.b && state.a.price === state.b.price) {
        bits.push('<text x="' + (padL + 12) + '" y="40" fill="#f0d59a" font-size="16">' + (zh ? '两个锚点重合，请重新选择' : 'The anchors are the same. Pick again.') + '</text>');
      }
      draw.forEach(function (bar, i) {
        bits.push('<rect data-bar="' + i + '" x="' + (padL + i * slot) + '" y="' + top + '" width="' + slot + '" height="' + plotH + '" fill="transparent"></rect>');
      });
      bits.push('</svg>');
      var hint = state.a == null
        ? (state.dir === 'up' ? (zh ? '先点这一段的低点。它会吸到那根 K 线的最低价。' : 'Tap the low of this swing first. It snaps to that candle’s low.') : (zh ? '先点这一段的高点。它会吸到那根 K 线的最高价。' : 'Tap the high of this swing first. It snaps to that candle’s high.'))
        : (state.b == null
          ? (state.dir === 'up' ? (zh ? '再点这一段的高点。' : 'Now tap the high of this swing.') : (zh ? '再点这一段的低点。' : 'Now tap the low of this swing.'))
          : (zh ? '线已经按你的两个锚点重算。播放后面的 K 线，看价格是否穿过 0.618。' : 'The lines were recalculated from your two anchors. Play the later candles and see whether price crosses 0.618.'));
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '在同一张 K 线上画回撤。先点低点，再点高点。0 在高点，1 在低点。' : 'Draw the retracement on this same chart. Tap the low, then the high. 0 is at the high and 1 is at the low.') + '</p>' +
        '<div class="fib-scroll">' + bits.join('') + '</div>' +
        '<p>' + hint + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-act="clear">' + (zh ? '重画' : 'Redraw') + '</button>' +
        '<button type="button" data-act="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="fib">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<button type="button" data-act="sample">' + (zh ? '核对 100→140' : 'Check 100 to 140') + '</button>' +
        '<span>' + state.shown + ' / ' + data.bars.length + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + (state.note || hint) + '</p>' +
        '<p class="ema-note">' + (zh
          ? '上涨回撤：价格=H−(H−L)×比例，0 在高点。下跌回撤：价格=L+(H−L)×比例，0 在低点。0.5 是常用中点，不是严格的斐波那契数列比率。'
          : 'Up retracement: price=H−(H−L)×ratio, and 0 is at the high. Down retracement: price=L+(H−L)×ratio, and 0 is at the low. 0.5 is a common midpoint, not a strict Fibonacci-sequence ratio.') + '</p></div>';
    }
    function setShown(next) {
      state.shown = Math.max(8, Math.min(data.bars.length, next));
    }
    if (root._fibClick) root.removeEventListener('click', root._fibClick);
    root._fibClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-dir],[data-mode],[data-move],[data-act],[data-bar],[data-more]') : null;
      if (!el || !root.contains(el)) return;
      if (el.getAttribute('data-more') === 'fib') {
        remember();
        state.dir = state.dir === 'up' ? 'down' : 'up';
        state.a = null;
        state.b = null;
        state.note = state.dir === 'down'
          ? (zh ? '反例改成下跌回撤：0 在低点，1 在高点。先点高点，再点低点。' : 'The counterexample uses a down retracement: 0 is at the low and 1 is at the high. Tap the high, then the low.')
          : '';
        state.tone = '';
        paint();
        return;
      }
      if (el.hasAttribute('data-dir')) {
        remember();
        state.dir = el.getAttribute('data-dir');
        state.note = zh ? '方向改了。同一对锚点会按另一条公式重算。' : 'The direction changed. The same anchors are recalculated with the other formula.';
        state.tone = '';
        paint();
        return;
      }
      if (el.hasAttribute('data-mode')) {
        remember();
        state.mode = el.getAttribute('data-mode');
        state.note = state.mode === 'extend'
          ? (zh ? '现在是两点扩展。1.272 和 1.618 在这段外面。' : 'This is a two-point extension. 1.272 and 1.618 sit outside the swing.')
          : (zh ? '现在是回撤。0.618 只是参考位。' : 'This is a retracement. 0.618 is only a reference.');
        state.tone = '';
        paint();
        return;
      }
      if (el.hasAttribute('data-move')) {
        var move = el.getAttribute('data-move');
        if (move === 'play') {
          if (state.playing) { stop(); paint(); return; }
          state.playing = true;
          root._fibTimer = setInterval(function () {
            if (!root.isConnected || state.shown >= data.bars.length) { stop(); paint(); return; }
            setShown(state.shown + 1);
            paint();
          }, 280);
          paint();
          return;
        }
        setShown(state.shown + Number(move));
        paint();
        return;
      }
      if (el.hasAttribute('data-act')) {
        var act = el.getAttribute('data-act');
        if (act === 'undo' && state.past.length) {
          state.future.push({ a: state.a, b: state.b, dir: state.dir, mode: state.mode });
          var prev = state.past.pop();
          state.a = prev.a; state.b = prev.b; state.dir = prev.dir; state.mode = prev.mode;
        } else if (act === 'redo' && state.future.length) {
          state.past.push({ a: state.a, b: state.b, dir: state.dir, mode: state.mode });
          var next = state.future.pop();
          state.a = next.a; state.b = next.b; state.dir = next.dir; state.mode = next.mode;
        } else if (act === 'clear') {
          remember();
          state.a = null; state.b = null;
        } else if (act === 'reset') {
          stop();
          state.dir = 'up'; state.mode = 'retrace'; state.a = null; state.b = null; state.past = []; state.future = [];
          state.shown = 56;
          state.note = ''; state.tone = '';
        } else if (act === 'sample') {
          var sample = levels(100, 140, 'up', 'retrace');
          var row = sample.filter(function (line) { return line.r === 0.618; })[0];
          state.note = zh
            ? '教学模拟。140−(140−100)×0.618=' + row.price + '。124.72 是 0.382，140 是高点。'
            : 'Teaching simulation. 140−(140−100)×0.618=' + row.price + '. 124.72 is 0.382, and 140 is the high.';
          state.tone = 'is-right';
        }
        paint();
        return;
      }
      var index = Number(el.getAttribute('data-bar'));
      var bar = data.bars[index];
      state.cursor = index;
      if (state.a && state.b) {
        remember();
        state.a = null;
        state.b = null;
      }
      var point = snap(index);
      if (!state.a) state.a = point;
      else state.b = point;
      var book = anchors();
      var touch = '';
      if (book && book.lines && state.b) {
        var near = book.lines.slice().sort(function (p, q) { return Math.abs(p.price - bar.c) - Math.abs(q.price - bar.c); })[0];
        var gap = Math.abs(bar.c - near.price);
        if (bar.l <= near.price && bar.h >= near.price) touch = zh ? ' 这根碰到了 ' + near.r + '（' + near.price + '）。碰到不是必反弹。' : ' This candle touches ' + near.r + ' (' + near.price + '). A touch is not a required bounce.';
        else if (gap / near.price < 0.003) touch = zh ? ' 收盘靠近 ' + near.r + '。靠近不是确认转身。' : ' The close is near ' + near.r + '. Near is not a confirmed turn.';
        else if ((state.dir === 'up' && bar.c < near.price && near.r === 0.618) || (state.dir === 'down' && bar.c > near.price && near.r === 0.618)) touch = zh ? ' 收盘已经穿过 0.618。穿过也不是反向保证。' : ' The close has crossed 0.618. A cross is not a reversal guarantee.';
      }
      state.note = (zh ? '第 ' + (index + 1) + ' 根，收盘 ' + bar.c + '。' : 'Bar ' + (index + 1) + ', close ' + bar.c + '. ') + touch;
      state.tone = touch ? '' : '';
      paint();
    };
    root.addEventListener('click', root._fibClick);
    if (root._fibKey) root.removeEventListener('keydown', root._fibKey);
    root.tabIndex = 0;
    root._fibKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      setShown(state.shown + (ev.key === 'ArrowRight' ? 1 : -1));
      paint();
    };
    root.addEventListener('keydown', root._fibKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._fibWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'fib-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._fibWrapped = true;
  }
  global.STAR_CH02_FIB = { levels: levels, tape: tape, mount: mount };
})(typeof window !== 'undefined' ? window : global);

/* SMC lesson chart. Structure rules live here, not in the lab. */
(function (global) {
  function bar(o, h, l, c) { return { o: o, h: h, l: l, c: c, v: 40 }; }
  var BARS = [
    bar(100, 103, 98, 102), bar(102, 105, 101, 104), bar(104, 108, 103, 107), bar(107, 109, 105, 106),
    bar(106, 112, 105, 111), bar(111, 111.5, 106, 107), bar(107, 108, 104, 105), bar(105, 110, 105, 109),
    bar(109, 113, 108, 112), bar(112, 116, 111, 115), bar(115, 118, 114, 117), bar(117, 120, 116, 119),
    bar(119, 119.5, 114, 115), bar(115, 116, 112, 113), bar(113, 114, 112.4, 113), bar(113, 113.2, 112.2, 112.8),
    bar(112.8, 113, 109, 110), bar(110, 111, 108, 109), bar(109, 112, 108, 109), bar(109, 121, 108, 110),
    bar(110, 112, 109, 111), bar(111, 118, 110, 117), bar(117, 122, 116, 120), bar(120, 124, 118, 123),
    bar(123, 127, 121, 125)
  ].map(function (item, i) { item.t = i; item.v = 30 + ((i * 17) % 23); return item; });
  var EXAMPLE = [bar(100, 103, 99, 102), bar(102, 109, 101, 108), bar(108, 112, 106, 111)];
  function swings(bars) {
    var highs = [];
    var lows = [];
    var i;
    var k;
    for (i = 2; i < bars.length - 2; i++) {
      var hi = true;
      var lo = true;
      for (k = 1; k <= 2; k++) {
        if (bars[i].h < bars[i - k].h || bars[i].h < bars[i + k].h) hi = false;
        if (bars[i].l > bars[i - k].l || bars[i].l > bars[i + k].l) lo = false;
      }
      if (hi) highs.push(i);
      if (lo) lows.push(i);
    }
    return { highs: highs, lows: lows };
  }
  function read(bars) {
    var sw = swings(bars);
    var bos = [];
    var choch = [];
    var sweeps = [];
    var trend = 0;
    var i;
    function latest(list, before) {
      var found = null;
      list.forEach(function (index) { if (index < before) found = index; });
      return found;
    }
    for (i = 0; i < bars.length; i++) {
      var high = latest(sw.highs, i);
      var low = latest(sw.lows, i);
      var close = bars[i].c;
      if (trend >= 0 && high != null && close > bars[high].h) {
        bos.push({ i: i, price: bars[high].h, dir: 'up' });
        trend = 1;
      } else if (trend <= 0 && low != null && close < bars[low].l) {
        bos.push({ i: i, price: bars[low].l, dir: 'down' });
        trend = -1;
      } else if (trend === 1 && low != null && close < bars[low].l) {
        choch.push({ i: i, price: bars[low].l, dir: 'down' });
        trend = 0;
      } else if (trend === -1 && high != null && close > bars[high].h) {
        choch.push({ i: i, price: bars[high].h, dir: 'up' });
        trend = 0;
      }
      if (high != null && bars[i].h > bars[high].h && close <= bars[high].h) sweeps.push({ i: i, price: bars[high].h, dir: 'up' });
      if (low != null && bars[i].l < bars[low].l && close >= bars[low].l) sweeps.push({ i: i, price: bars[low].l, dir: 'down' });
    }
    var fvgs = [];
    for (i = 2; i < bars.length; i++) {
      if (bars[i].l > bars[i - 2].h) fvgs.push({ i: i, low: bars[i - 2].h, high: bars[i].l, dir: 'up' });
      if (bars[i].h < bars[i - 2].l) fvgs.push({ i: i, low: bars[i].h, high: bars[i - 2].l, dir: 'down' });
    }
    var obs = bos.map(function (item) {
      var j;
      for (j = item.i - 1; j >= 0; j--) {
        var bull = bars[j].c >= bars[j].o;
        if (item.dir === 'up' && !bull) return { i: j, bos: item.i, low: Math.min(bars[j].o, bars[j].c), high: Math.max(bars[j].o, bars[j].c) };
        if (item.dir === 'down' && bull) return { i: j, bos: item.i, low: Math.min(bars[j].o, bars[j].c), high: Math.max(bars[j].o, bars[j].c) };
      }
      return null;
    }).filter(Boolean);
    return { swings: sw, bos: bos, choch: choch, sweeps: sweeps, fvgs: fvgs, obs: obs };
  }
  function fvgExample(bars) {
    if (bars.length < 3) return null;
    if (!(bars[2].l > bars[0].h)) return null;
    return { low: bars[0].h, high: bars[2].l };
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var state = { shown: 10, cursor: null, playing: false, structure: true, sweep: false, fvg: false, ob: false, note: '', tone: '' };
    if (root._smcTimer) clearInterval(root._smcTimer);
    function stop() { state.playing = false; if (root._smcTimer) clearInterval(root._smcTimer); root._smcTimer = null; }
    function pack() { return read(BARS.slice(0, state.shown)); }
    function paint() {
      var draw = BARS.slice(0, state.shown);
      var info = read(draw);
      var w = 980;
      var h = 420;
      var padL = 12;
      var padR = 64;
      var top = 16;
      var plotH = 360;
      var vals = [];
      draw.forEach(function (b) { vals.push(b.h, b.l); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = max - min || 1;
      min -= span * 0.08;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * plotH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      if (state.fvg) info.fvgs.forEach(function (zone) {
        var y1 = y(zone.high);
        var y2 = y(zone.low);
        bits.push('<rect x="' + padL + '" y="' + Math.min(y1, y2) + '" width="' + (w - padL - padR) + '" height="' + Math.abs(y2 - y1) + '" fill="rgba(142,180,255,.22)"></rect>');
        bits.push('<text x="' + (padL + 8) + '" y="' + (Math.min(y1, y2) + 14) + '" fill="#d7e4ff" font-size="13">FVG ' + zone.low + '–' + zone.high + '</text>');
      });
      if (state.ob) info.obs.forEach(function (zone) {
        var x = padL + zone.i * slot;
        bits.push('<rect x="' + x + '" y="' + y(zone.high) + '" width="' + Math.max(8, slot) + '" height="' + Math.max(2, Math.abs(y(zone.low) - y(zone.high))) + '" fill="rgba(244,203,130,.35)"></rect>');
      });
      draw.forEach(function (b, i) {
        var up = b.c >= b.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = padL + i * slot + slot / 2;
        var bw = Math.max(3, slot * 0.55);
        bits.push('<line x1="' + xc + '" y1="' + y(b.h) + '" x2="' + xc + '" y2="' + y(b.l) + '" stroke="' + color + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(b.o), y(b.c)) + '" width="' + bw + '" height="' + Math.max(1.4, Math.abs(y(b.c) - y(b.o))) + '" fill="' + color + '"></rect>');
        if (i % 4 === 0) bits.push('<text x="' + xc + '" y="408" fill="#b7aac8" font-size="12">' + (i + 1) + '</text>');
        bits.push('<rect data-bar="' + i + '" x="' + (padL + i * slot) + '" y="' + top + '" width="' + slot + '" height="' + plotH + '" fill="transparent"></rect>');
      });
      if (state.structure) {
        info.bos.forEach(function (item) {
          var yy = y(item.price);
          bits.push('<line x1="' + padL + '" y1="' + yy + '" x2="' + (w - padR) + '" y2="' + yy + '" stroke="#8eb4ff"></line>');
          bits.push('<text x="' + (padL + item.i * slot) + '" y="' + (yy - 6) + '" fill="#8eb4ff" font-size="13">BOS</text>');
        });
        info.choch.forEach(function (item) {
          var yy = y(item.price);
          bits.push('<line x1="' + padL + '" y1="' + yy + '" x2="' + (w - padR) + '" y2="' + yy + '" stroke="#f4cb82" stroke-dasharray="5 3"></line>');
          bits.push('<text x="' + (padL + item.i * slot) + '" y="' + (yy - 6) + '" fill="#f4cb82" font-size="13">CHoCH</text>');
        });
      }
      if (state.sweep) info.sweeps.forEach(function (item) {
        bits.push('<text x="' + (padL + item.i * slot) + '" y="32" fill="#ffb4c0" font-size="13">' + (zh ? '扫荡' : 'Sweep') + '</text>');
      });
      bits.push('</svg>');
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p class="a1-checks"><label><input type="checkbox" data-layer="structure"' + (state.structure ? ' checked' : '') + '> ' + (zh ? '结构' : 'Structure') + '</label> <label><input type="checkbox" data-layer="sweep"' + (state.sweep ? ' checked' : '') + '> ' + (zh ? '扫荡' : 'Sweep') + '</label> <label><input type="checkbox" data-layer="fvg"' + (state.fvg ? ' checked' : '') + '> FVG</label> <label><input type="checkbox" data-layer="ob"' + (state.ob ? ' checked' : '') + '> OB</label></p>' +
        '<p>' + (zh ? '这些名字是本课的价格规则。不同人的画法可以不同。标签不是机构一定在买卖的证据。' : 'These names are this lesson’s price rules. Other people may draw them differently. A label is not proof that an institution is buying or selling.') + '</p>' +
        '<div class="smc-scroll">' + bits.join('') + '</div>' +
        '<p>' + (zh ? '小练习：点出收盘价突破前高的那根。影线过了但收盘没过，不算 BOS。' : 'Short practice: tap the candle whose close breaks the prior high. A wick through it is not a BOS if the close stays back.') + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button><button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button><button type="button" data-more="1">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button><span>' + state.shown + ' / ' + BARS.length + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + (state.note || (zh ? '先看结构。其他图层默认关着。' : 'Structure is on. The other layers start off.')) + '</p>' +
        '<p class="ema-note">' + (zh ? 'BOS 和 CHoCH 都看收盘价。看涨 FVG 是第三根低点高于第一根高点。订单块是突破前最后一根反向 K 线的实体。' : 'BOS and CHoCH both use the close. A bullish FVG is a third low above the first high. An order block is the body of the last opposite candle before the break.') + '</p></div>';
    }
    function explain(index) {
      var info = pack();
      var b = BARS[index];
      var bos = info.bos.filter(function (item) { return item.i === index; })[0];
      var ch = info.choch.filter(function (item) { return item.i === index; })[0];
      var sw = info.sweeps.filter(function (item) { return item.i === index; })[0];
      var gap = info.fvgs.filter(function (item) { return item.i === index; })[0];
      var ob = info.obs.filter(function (item) { return item.i === index; })[0];
      if (bos) return { tone: 'is-right', text: zh ? '这根收盘越过了已确认的结构位，所以是 BOS。它不是影线刺穿，也不保证后面继续涨。' : 'This close passed a confirmed structure level, so it is a BOS. It is not a wick poke, and it does not guarantee the later move.' };
      if (ch) return { tone: 'is-right', text: zh ? '这根收盘反向破了保护位，所以是 CHoCH。它不是 BOS，也不是反转已经完成。' : 'This close broke the protective level the other way, so it is a CHoCH. It is not a BOS, and the reversal is not finished.' };
      if (sw && state.sweep) return { tone: 'is-right', text: zh ? '影线越过了前高，收盘回到内侧。这是本课的扫荡形态，不证明有人在扫单。' : 'The wick went beyond the prior high and the close came back inside. That matches this lesson’s sweep. It does not prove someone swept orders.' };
      if (sw && !state.sweep) return { tone: '', text: zh ? '这根影线过了但收盘没过。打开“扫荡”才能看见这个标签。它不是 BOS。' : 'The wick went through, but the close did not. Turn on Sweep to see that label. It is not a BOS.' };
      if (gap) return { tone: 'is-right', text: zh ? '第三根低点 ' + gap.high + ' 高于第一根高点 ' + gap.low + '。区间是 ' + gap.low + '–' + gap.high + '。这不是无人成交，也不保证回补。' : 'The third low ' + gap.high + ' is above the first high ' + gap.low + '. The zone is ' + gap.low + '–' + gap.high + '. That is not zero trades, and it does not have to be filled.' };
      if (ob) return { tone: 'is-right', text: zh ? '这是突破前最后一根反向 K 线，实体在 ' + ob.low + '–' + ob.high + '。它是候选，不证明机构在买。' : 'This is the last opposite candle before the break. Its body is ' + ob.low + '–' + ob.high + '. It is a candidate, not proof an institution is buying.' };
      return { tone: '', text: zh ? '第 ' + (index + 1) + ' 根，收盘 ' + b.c + '。再点收盘真正越过结构的那根。' : 'Bar ' + (index + 1) + ', close ' + b.c + '. Tap the bar whose close actually passes the structure.' };
    }
    if (root._smcClick) root.removeEventListener('click', root._smcClick);
    root._smcClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-move],[data-more],[data-bar]') : null;
      if (!el || !root.contains(el)) return;
      if (el.getAttribute('data-more')) {
        stop();
        state.shown = BARS.length;
        state.fvg = true;
        state.note = zh ? '反例：缺口 112–116 后面的 K 线没有回到这个区间。不回补也是一种走法。' : 'Counterexample: later candles do not return to the 112–116 gap. Never filling it is one possible path.';
        state.tone = 'is-right';
        paint();
        return;
      }
      if (el.getAttribute('data-move') === 'play') {
        if (state.playing) { stop(); paint(); return; }
        state.playing = true;
        root._smcTimer = setInterval(function () {
          if (!root.isConnected || state.shown >= BARS.length) { stop(); paint(); return; }
          state.shown += 1;
          paint();
        }, 320);
        paint();
        return;
      }
      if (el.getAttribute('data-move') === 'reset') {
        stop();
        state.shown = 10;
        state.cursor = null;
        state.note = '';
        state.tone = '';
        state.structure = true;
        state.sweep = false;
        state.fvg = false;
        state.ob = false;
        paint();
        return;
      }
      var index = Number(el.getAttribute('data-bar'));
      state.cursor = index;
      var said = explain(index);
      state.note = said.text;
      state.tone = said.tone;
      paint();
    };
    root.addEventListener('click', root._smcClick);
    if (root._smcChange) root.removeEventListener('change', root._smcChange);
    root._smcChange = function (ev) {
      var input = ev.target;
      var key = input && input.getAttribute && input.getAttribute('data-layer');
      if (!key) return;
      state[key] = !!input.checked;
      paint();
    };
    root.addEventListener('change', root._smcChange);
    if (root._smcKey) root.removeEventListener('keydown', root._smcKey);
    root.tabIndex = 0;
    root._smcKey = function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      state.shown = Math.max(4, Math.min(BARS.length, state.shown + (ev.key === 'ArrowRight' ? 1 : -1)));
      paint();
    };
    root.addEventListener('keydown', root._smcKey);
    paint();
  }
  var study = global.STAR_STUDY;
  if (study && !study._smcWrapped) {
    var inner = study.mount;
    study.mount = function (root, lesson, lang) {
      if (lesson && lesson.study && lesson.study.lessonChart === 'smc-full') return mount(root, lesson, lang);
      return inner.apply(this, arguments);
    };
    study._smcWrapped = true;
  }
  global.STAR_CH02_SMC = { bars: BARS, example: EXAMPLE, read: read, fvgExample: fvgExample, mount: mount };
})(typeof window !== 'undefined' ? window : global);
