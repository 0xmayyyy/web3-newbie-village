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
          options: [opt('A', '会，它会跳过去', 'Yes, it jumps there'), opt('B', '不会，它还在慢慢跟上', 'No, it is still catching up'), opt('C', '只有 BTC 会跳', 'Only BTC jumps'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')],
          answer: 'B',
          miss: bi('收盘价是这根 K 线的价格，不是均线。\nEMA20 还停在更高的地方。', 'The close is this candle’s price, not the average.\nEMA20 is still higher up.')
        },
        quizzes: [
          quiz('1 小时图上的 EMA20 是什么意思？', 'What does EMA20 mean on a 1-hour chart?', [opt('A', '过去 20 天的简单平均', 'A simple average of the past 20 days'), opt('B', '未来 20 小时的预测价', 'The predicted price for the next 20 hours'), opt('C', '20 根小时 K 线收盘价的指数加权均线', 'An exponentially weighted average of 20 hourly closes'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'C', {A: ['20 根不等于 20 天。1 小时图上的一根是一小时。', '20 bars are not 20 days. On a 1-hour chart, one bar is one hour.'], B: ['EMA 是已经发生的价格的平滑，不是未来价格。', 'An EMA smooths prices that already happened. It is not a future price.'], C: ['它把最近 20 根小时收盘做指数加权。越近的越重要。', 'It exponentially weights the last 20 hourly closes. Nearer closes matter more.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('均线是拿来预测下一根价格的吗？', 'Is an average used to predict the next price?', [opt('A', '是', 'Yes'), opt('B', '只在上涨时是', 'Only while price is rising'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '不是', 'No')], 'D', {A: ['它只描述价格已经走过的位置，不预言下一根。', 'It only describes where price has already been. It does not predict the next bar.'], B: ['上涨的时候它也只是跟着走，并不预告下一根。', 'While price is rising it is still only following. It does not announce the next bar.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['均线跟着已经发生的价格，不是下一根的答案。', 'The average follows price that has already happened. It is not the answer for the next bar.']}),
          quiz('横盘时均线来回交叉，能当成方向已经确定吗？', 'When averages cross back and forth in a sideways market, is the direction already decided?', [opt('A', '不能', 'No'), opt('B', '能', 'Yes'), opt('C', '交叉就一定涨', 'A cross must rise'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['横盘里价格围着均线来回穿，交叉不等于方向已经定了。', 'In a sideways market, price crosses the average back and forth. A cross does not mean the direction is settled.'], B: ['同一条均线在横盘里会反复交叉，所以不能当成方向已定。', 'The same average crosses again and again in a sideways market, so it cannot be treated as a settled direction.'], C: ['交叉只说明两条线换了上下位置，不保证下一根上涨。', 'A cross only says the two lines swapped places. It does not guarantee the next bar rises.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
        ],
        study: { kind: 'ema', lessonChart: 'ema-full', closes: [100, 102, 104, 100, 98], periods: [20, 50] }
      }),
      lesson({
        id: '02',
        title: bi('MACD：柱子变短不等于马上跌', 'MACD: a shorter bar does not mean price falls now'),
        scene: bi('柱子变短的时候，价格是不是一定马上跌？', 'When the bars get shorter, must price fall right away?'),
        one: bi('快线从下往上穿过慢线叫金叉，反过来叫死叉，柱子变短也不等于价格马上跌。', 'The fast line crossing up through the slow line is a golden cross, the other way is a death cross, and shorter bars still do not mean price falls at once.'),
        explain: bi('上面画的是价格 K 线。\n下面黄线是快线，看最近涨跌的速度。\n蓝线是慢线，它是快线的平均，走得更稳。\n快线从下往上穿过慢线，叫金叉。\n快线从上往下穿过慢线，叫死叉。\n柱子是两条线隔得有多远。\n绿柱变长，上涨的力量在变强。\n红柱变长，下跌的力量在变强。\n柱子变短，只说明两条线在靠近。\n靠近不等于价格马上转向。\n0 轴上方，整体偏多。\n0 轴下方，整体偏空。\n金叉不是买入信号，死叉也不是卖出信号。\n交易员一般都会结合 3 种或以上的技术指标来观察走势。', 'The top shows price candles.\nThe gold line below is the fast line, and it shows how fast price has been moving.\nThe blue line is the slow line. It is the average of the fast line, so it moves more calmly.\nThe fast line crossing up through the slow line is a golden cross.\nThe fast line crossing down through the slow line is a death cross.\nThe bars are how far apart the two lines are.\nA longer green bar means the upward push is getting stronger.\nA longer red bar means the downward push is getting stronger.\nShorter bars only mean the two lines are getting closer.\nGetting closer does not mean price turns right away.\nAbove the zero line, the picture leans up.\nBelow the zero line, the picture leans down.\nA golden cross is not a buy signal, and a death cross is not a sell signal.\nTraders usually watch the move with 3 or more indicators together.'),
        topic: {
          title: bi('金叉和死叉', 'Golden cross and death cross'),
          body: bi('金叉，是快线从下往上穿过慢线。\n死叉，是快线从上往下穿过慢线。\n图上会标出这两个点。\n金叉不是必涨。\n死叉不是必跌。\n它们只说明两条线换了上下位置。', 'A golden cross is the fast line crossing up through the slow line.\nA death cross is the fast line crossing down through the slow line.\nThe chart marks these two spots.\nA golden cross is not a sure rise.\nA death cross is not a sure fall.\nThey only say the two lines swapped which one is on top.')
        },
        example: bi('教学模拟：绿柱变长，只说明上涨更有劲。\n0 轴上方的金叉，只是偏多，不是买入。\n0 轴下方也可以出现金叉，价格随后仍能再跌一截。\n红柱变短时，收盘还可以继续跌。', 'Teaching simulation: a longer green bar only means the rise has more push.\nA golden cross above zero only leans up. It is not a buy.\nA golden cross can also appear below zero, and price can still fall further.\nWhen the red bars get shorter, the close can keep falling.'),
        pitfalls: [
          bi('把柱子变短直接当成卖出', 'Taking shorter bars as a sell by itself'),
          bi('看见金叉就当成必涨，看见死叉就当成必跌', 'Treating a golden cross as a sure rise, or a death cross as a sure fall'),
          bi('把 0 轴上方当成已经可以无脑买', 'Treating “above zero” as a reason to buy without looking')
        ],
        practice: bi('点出快线从下往上穿过慢线的那根。\n0 轴上方不是买入保证。\n0 轴下方的金叉，后面仍可能再跌。', 'Tap the bar where the fast line crosses up through the slow line.\nAbove zero is not a promise to buy.\nA golden cross below zero can still be followed by another drop.'),
        check: {
          ask: bi('绿柱变长，直接表示什么？', 'What does a longer green bar say directly?'),
          options: [opt('A', '必须马上买入', 'You must buy now'), opt('B', '价格一定到顶', 'Price has definitely topped'), opt('C', '上涨的力量在变强', 'The upward push is getting stronger'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')],
          answer: 'C',
          miss: bi('绿柱变长只说明两条线拉得更开，上涨更有劲。\n它不是买入按钮。', 'A longer green bar only means the two lines pulled farther apart, so the rise has more push.\nIt is not a buy button.')
        },
        quizzes: [
          quiz('金叉是什么？', 'What is a golden cross?', [opt('A', '快线从上往下穿过慢线', 'The fast line crosses down through the slow line'), opt('B', '快线从下往上穿过慢线', 'The fast line crosses up through the slow line'), opt('C', '绿柱变长', 'The green bars get longer'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['快线从上往下穿过慢线，那是死叉。', 'The fast line crossing down through the slow line is a death cross.'], B: ['快线从下往上穿过慢线，就是金叉。', 'The fast line crossing up through the slow line is a golden cross.'], C: ['绿柱变长只说明上涨更有劲，不是金叉。', 'Longer green bars only mean the rise has more push. That is not a golden cross.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('死叉是什么？', 'What is a death cross?', [opt('A', '快线从下往上穿过慢线', 'The fast line crosses up through the slow line'), opt('B', '价格一定马上跌', 'Price must fall at once'), opt('C', '快线从上往下穿过慢线', 'The fast line crosses down through the slow line'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['从下往上穿，那是金叉。', 'A cross from below is a golden cross.'], B: ['死叉只说明两条线换了位置，不保证马上跌。', 'A death cross only says the two lines swapped places. It does not guarantee an immediate drop.'], C: ['快线从上往下穿过慢线，就是死叉。', 'The fast line crossing down through the slow line is a death cross.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('教学模拟：红柱从很长变成较短，收盘还在跌。最准确的说法是？', 'Teaching simulation: the red bars go from long to shorter, and the close is still falling. What is the most accurate statement?', [opt('A', '价格已经确认上涨', 'Price has confirmed a rise'), opt('B', '下一根一定会反弹', 'The next bar must bounce'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '两条线在靠近，不能单独证明已经涨回来', 'The two lines are getting closer, which alone does not prove price has turned up')], 'D', {A: ['柱子变短只说明两条线在靠近，不是价格已经上涨。', 'Shorter bars only mean the two lines are closer. It is not proof that price has risen.'], B: ['没有“下一根必须反弹”这条规则。', 'There is no rule that the next bar must bounce.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['红柱变短，是下跌的力量在减弱。还要看上面的 K 线。', 'Shorter red bars mean the downward push is fading. You still have to look at the candles.']}),
          quiz('柱子变短是不是价格一定下跌？', 'If the bars get shorter, must price fall?', [opt('A', '不是', 'No'), opt('B', '一定', 'It must'), opt('C', '只在日线一定', 'Only on the daily chart'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['靠近不等于方向已经反过来。', 'Getting closer is not the same as the direction already reversing.'], B: ['柱子变短只说明两条线在靠近，价格仍可以继续涨。', 'Shorter bars only mean the two lines are getting closer. Price can still keep rising.'], C: ['换成日线，也不保证下跌。', 'Switching to the daily chart does not guarantee a fall either.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
        ],
        study: { kind: 'macd', lessonChart: 'macd-full', closes: macdCloses }
      }),
      lesson({
        id: '03',
        title: bi('RSI：涨得猛不等于立刻卖', 'RSI: a strong rise does not mean sell now'),
        scene: bi('这条线到了 75，是不是必须马上卖？', 'The line is at 75. Do you have to sell immediately?'),
        one: bi('RSI 看最近涨得多还是跌得多，到了 70 以上只说明涨得猛，并不叫你马上卖。', 'RSI looks at whether recent rises or falls are bigger, and above 70 it only says the rise is strong, not that you must sell now.'),
        explain: bi('上面画的是价格 K 线。\n下面这条线看最近 14 根涨得多还是跌得多。\n刻度从 0 到 100。\n线到 70 以上，最近涨得比较猛。\n线到 30 以下，最近跌得比较猛。\n50 在中间，涨和跌差不多。\n涨得猛，不等于马上要跌。\n很强的上涨里，线可以在 70 上面停很久，价格还在涨。\n跌得猛，也不等于马上要涨。\n线还算不出来的时候先空着，不画成 0。', 'The top shows price candles.\nThe line below looks at whether the last 14 bars rose more or fell more.\nThe scale runs from 0 to 100.\nAbove 70, the recent rise has been fairly strong.\nBelow 30, the recent fall has been fairly strong.\n50 is the middle, where rises and falls are about even.\nA strong rise does not mean a drop is due.\nIn a very strong rally the line can stay above 70 for a long time while price is still rising.\nA strong fall does not mean a bounce is due.\nWhen the line cannot be calculated yet, leave it blank. Do not draw 0.'),
        example: bi('教学模拟：线到 75，只说明最近涨得更猛。\n它还可以停在 70 上面，价格继续创新高。\n大跌的时候也可以停在 30 下面，价格继续创新低。\n所以高位不是卖出命令。\n低位也不是买入命令。', 'Teaching simulation: a reading of 75 only means the recent rise was stronger.\nIt can stay above 70 while price keeps making new highs.\nIn a big drop it can also stay under 30 while price keeps making new lows.\nSo a high reading is not a sell order.\nA low reading is not a buy order.'),
        pitfalls: [
          bi('线一过 70 就认为必须马上跌', 'Assuming price must drop as soon as the line crosses 70'),
          bi('把还没算出来的空位当成 0', 'Treating a blank, before the line is ready, as 0')
        ],
        practice: bi('点一根线还在 70 上面、后面价格还在涨的 K 线。\n高位不是马上卖。', 'Tap a candle where the line is still above 70 and a later price is higher.\nA high reading is not an immediate sell.'),
        check: {
          ask: bi('线到 75，直接表示什么？', 'The line is at 75. What does that say directly?'),
          options: [opt('A', '最近涨得更猛', 'The recent rise was stronger'), opt('B', '必须马上卖', 'You must sell now'), opt('C', '成交量创新高', 'Volume made a new high'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'A',
          miss: bi('它看的是涨跌，不是成交量。\n75 也不下卖出命令。', 'It looks at rises and falls, not volume.\n75 is not a sell order either.')
        },
        quizzes: [
          quiz('教学模拟：这条线到了 78。最准确的说法是？', 'Teaching simulation: the line is at 78. What is the most accurate statement?', [opt('A', '一定要立刻做空', 'You must short immediately'), opt('B', '最近涨得猛，还可以停在高位，不能单凭 78 说马上跌', 'The recent rise is strong and can stay high. 78 alone does not mean a drop is imminent'), opt('C', '价格已经确定到顶', 'Price has definitely topped'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['涨得猛不是做空命令。', 'A strong rise is not an order to short.'], B: ['78 只说明最近涨得猛。很强的上涨里，它可以一直停在 70 上面。', '78 only says the recent rise is strong. A very strong rally can stay above 70.'], C: ['没有“到了 78 就到顶”这条规则。', 'There is no rule that 78 means the top is in.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('很强的上涨，可以一直停在 70 上面吗？', 'Can a very strong rally stay above 70?', [opt('A', '不能', 'No'), opt('B', '只能停一根', 'Only for one bar'), opt('C', '能', 'Yes'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['没有“到了 70 下一根必须跌”这条规则。', 'There is no rule that the next bar must fall once the line reaches 70.'], B: ['停多久看后面还涨不涨，不是固定一根。', 'How long it stays depends on whether price keeps rising, not a fixed single bar.'], C: ['价格接连上涨时，这条线可以在高位停留。', 'When price keeps rising, this line can stay high.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('这条线主要看什么？', 'What does this line mainly look at?', [opt('A', '成交量', 'Volume'), opt('B', '持仓量', 'Open interest'), opt('C', '只看名字就够了', 'The name alone is enough.'), opt('D', '最近的涨和跌', 'Recent rises and falls')], 'D', {A: ['成交量不进这条线。', 'Volume does not go into this line.'], B: ['持仓量是还没平掉的合约，这条线不用它。', 'Open interest is contracts still open. This line does not use it.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['它把收盘的上涨和下跌分开来看。', 'It separates the up moves and down moves of the close.']})
        ],
        study: { kind: 'rsi', main: 'rsi', lessonChart: 'rsi-full', closes: rsi75 }
      }),
      lesson({
        id: '05',
        title: bi('背离：价格和下面的线没走在一起', 'Divergence: price and the lower lines did not move together'),
        scene: bi('价格创新高、下面的线没创新高，是不是已经要跌了？', 'Price made a new high and the line below did not. Does that mean it is about to fall?'),
        one: bi('顶背离是价格高点更高、快线高点更低，它只说明这两段没走在一起，不保证马上跌。', 'Top divergence is a higher price high with a lower fast-line high, and it only says those two stretches did not move together, so it does not guarantee an immediate drop.'),
        explain: bi('上面是价格 K 线。\n下面是 MACD。\n黄线是快线，看最近涨跌的速度。\n蓝线是慢线，是快线的平均。\n顶背离：后面的价格高点更高，快线的高点却更低。\n底背离：后面的价格低点更低，快线的低点却更高。\n图上会把这两个点连起来，并标上顶背离或底背离。\n这只是已经走出来的两段对不上。\n它不保证下一根就转向。\nRSI 等其他指标也会出现背离，看法一样：价格创新高或新低，指标却没跟上。', 'The top is the price candles.\nMACD is below.\nThe gold line is the fast line. It shows how fast price has been moving.\nThe blue line is the slow line, the average of the fast line.\nTop divergence: the later price high is higher, but the fast-line high is lower.\nBottom divergence: the later price low is lower, but the fast-line low is higher.\nThe chart connects those two points and labels top divergence or bottom divergence.\nThat only says two stretches that already happened did not match.\nIt does not guarantee the next candle turns.\nRSI and other indicators can diverge the same way: price makes a new high or a new low, and the indicator does not keep up.'),
        example: bi('教学模拟：价格做出更高的高点时，快线的高点更低。\n价格做出更低的低点时，快线的低点更高。\n反例里，标出顶背离之后价格还在继续涨。\n所以背离不是买卖按钮。', 'Teaching simulation: when price makes a higher high, the fast line makes a lower high.\nWhen price makes a lower low, the fast line makes a higher low.\nIn the counterexample, price keeps rising after the top divergence is marked.\nSo divergence is not a buy or sell button.'),
        pitfalls: [
          bi('把背离当成马上要转向', 'Treating divergence as an immediate turn'),
          bi('只看线，不看价格有没有真的更高或更低', 'Looking only at the line, without checking whether price really went higher or lower')
        ],
        practice: bi('点出顶背离的第二个高点。\n价格更高，快线更低。\n这不保证马上跌。', 'Tap the second high of the top divergence.\nPrice is higher and the fast line is lower.\nThat does not guarantee an immediate drop.'),
        check: {
          ask: bi('价格更高、快线更低，这叫什么？', 'Price is higher and the fast line is lower. What is that called?'),
          options: [opt('A', '底背离', 'Bottom divergence'), opt('B', '金叉', 'A golden cross'), opt('C', '只看名字就够了', 'The name alone is enough.'), opt('D', '顶背离', 'Top divergence')],
          answer: 'D',
          miss: bi('底背离比的是低点。\n金叉是快线穿过慢线。', 'Bottom divergence compares lows.\nA golden cross is the fast line crossing the slow line.')
        },
        quizzes: [
          quiz('价格新高、快线没有新高，这是？', 'A new price high, while the fast line does not make a new high. What is that?', [opt('A', '顶背离', 'Top divergence'), opt('B', '底背离', 'Bottom divergence'), opt('C', '没有意义', 'Meaningless'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['价格高点更高，快线的高点更低，这就是顶背离。', 'A higher price high with a lower fast-line high is top divergence.'], B: ['底背离比的是更低的低点。', 'Bottom divergence compares a lower low.'], C: ['它说明两段没走在一起，不是空话，也不保证马上跌。', 'It says two stretches did not move together. That is not empty, and it still does not guarantee an immediate drop.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('背离是不是一定马上转向？', 'Must divergence turn price right away?', [opt('A', '一定', 'It must'), opt('B', '不一定', 'Not necessarily'), opt('C', '只有上涨时一定', 'Only in a rise'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['背离之后价格仍可以顺着原来的方向再走一段。', 'After divergence, price can still keep going the same way.'], B: ['它只是价格和快线没有一起创新高或创新低。', 'It only says price and the fast line did not make the new extreme together.'], C: ['换成上涨或下跌，也不变成保证。', 'A rise or a fall does not turn it into a guarantee.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('底背离看的是什么？', 'What does bottom divergence look at?', [opt('A', '价格和快线一起创新高', 'Price and the fast line both make a new high'), opt('B', '绿柱变长', 'The green bars get longer'), opt('C', '价格低点更低，快线的低点更高', 'A lower price low and a higher fast-line low'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['一起创新高就不是背离。', 'Making a new high together is not divergence.'], B: ['绿柱变长说的是快线和慢线拉得更开。', 'A longer green bar means the fast and slow lines pulled farther apart.'], C: ['后面的价格更低，快线却没再创新低，这是底背离。', 'Later price is lower, but the fast line did not make a new low. That is bottom divergence.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
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
        title: bi('斐波那契：参考线不是必到的价', 'Fibonacci: a reference line is not a price that must be hit'),
        scene: bi('价格碰到 0.618 就一定会弹回去吗？', 'Must price bounce when it touches 0.618?'),
        one: bi('斐波那契是把上一段明显的低点到高点分成几条参考线，价格可以在那里停一停，但不必在那里转身。', 'Fibonacci splits the obvious low-to-high of the last swing into a few reference lines, so price may pause there, but it does not have to turn there.'),
        explain: bi('先找到眼前这一段最明显的低点和高点。\n从这段的起点拖到终点。\n上涨时从低点拖到高点。\n下跌时从高点拖到低点。\n松开后，0、0.382、0.5、0.618 和 1 会自动画出来。\n0 在这段的终点，1 在起点。\n回调时，大家常看 0.5 到 0.618 这一带。\n价格可能在那里停一停，或弹一下。\n这些线只是参考区。\n它们不保证反弹，也不保证跌破。\n拿来看的时候，止损还是要自己放。', 'First find the most obvious low and high of the swing in front of you.\nDrag from the start of that swing to the end.\nIn a rise, drag from the low to the high.\nIn a drop, drag from the high to the low.\nWhen you let go, 0, 0.382, 0.5, 0.618, and 1 draw themselves.\n0 is at the end of the swing, and 1 is at the start.\nIn a pullback, people often watch the band from 0.5 to 0.618.\nPrice may pause there, or bounce a little.\nThese lines are only reference zones.\nThey do not guarantee a bounce, and they do not guarantee a break.\nIf you use them, you still place the stop yourself.'),
        example: bi('教学模拟：这一段从大约 60000 涨到 70000，再往回走。\n看示范会把低点到高点的线画出来。\n价格可以碰到 0.618，也可以穿过去。\n碰到不是必弹。', 'Teaching simulation: this swing rises from about 60000 to 70000, then pulls back.\nSee the example draws the lines from that low to that high.\nPrice can touch 0.618, or pass through it.\nA touch is not a required bounce.'),
        pitfalls: [
          bi('把 0.618 当成必须反弹的价', 'Treating 0.618 as a price that must bounce'),
          bi('换了一段高低点，还用着旧线', 'Keeping the old lines after the swing high and low changed')
        ],
        practice: bi('从这段低点拖到高点。\n看价格回撤时有没有靠近 0.5 到 0.618。\n靠近也不是必弹。', 'Drag from the low of this swing to the high.\nSee whether the pullback comes near 0.5 to 0.618.\nBeing near it is still not a required bounce.'),
        check: {
          ask: bi('价格碰到 0.618，是不是一定弹回去？', 'Price touches 0.618. Must it bounce?'),
          options: [opt('A', '一定弹', 'It must bounce'), opt('B', '只有上涨时一定', 'Only in a rise'), opt('C', '不一定', 'Not necessarily'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')],
          answer: 'C',
          miss: bi('0.618 只是一条参考线。\n价格可以停、可以穿、也可以不碰。', '0.618 is only a reference line.\nPrice can pause, pass through, or never touch it.')
        },
        quizzes: [
          quiz('画这条线时，先找什么？', 'When you draw this, what do you find first?', [opt('A', '任意两根 K 线', 'Any two candles'), opt('B', '成交量最大的那根', 'The candle with the most volume'), opt('C', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.'), opt('D', '眼前这段最明显的低点和高点', 'The most obvious low and high of the swing in front of you')], 'D', {A: ['随便点两根，画出来的线对不上这段涨跌。', 'Two random candles do not line up with this swing.'], B: ['这条线看的是高低点，不是成交量。', 'These lines look at the high and the low, not volume.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['从这段的起点拖到终点，线才对得上这段行情。', 'Drag from the start of that swing to the end, and the lines match that move.']}),
          quiz('0.5 到 0.618 通常用来看什么？', 'What are 0.5 to 0.618 usually watched for?', [opt('A', '回调时可能停一停的区域', 'A zone where a pullback may pause'), opt('B', '必到的反转价', 'A reversal price that must be hit'), opt('C', '止损必须放在这里', 'The stop must sit here'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['回调时价格常在这一带慢下来，但这不是保证。', 'In a pullback, price often slows in this band. That is not a guarantee.'], B: ['没有“必须在这里转身”这一条。', 'There is no rule that price must turn here.'], C: ['止损放哪里，要你自己定。线不替你放。', 'Where the stop goes is yours to choose. The line does not place it.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('这些线保证反弹吗？', 'Do these lines guarantee a bounce?', [opt('A', '保证', 'They do'), opt('B', '不保证', 'They do not'), opt('C', '看示范就保证', 'The example guarantees it'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['参考区不是到站必停。', 'A reference zone is not a stop that must happen.'], B: ['价格可以碰到、穿过，或根本不来。', 'Price can touch them, pass through, or never arrive.'], C: ['看示范只是把这一段画出来，不是保证。', 'See the example only draws this swing. It is not a guarantee.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
        ],
        study: { kind: 'fib', lessonChart: 'fib-full', closes: [100, 108, 116, 124, 132, 140, 136, 128, 120], low: 100, high: 140, start: 6 }
      }),
      lesson({
        id: '07',
        title: bi('SMC：指标自动标出结构和缺口', 'SMC: the indicator marks structure and gaps for you'),
        scene: bi('这些 BOS 和 CHoCH，要自己在图上找吗？', 'Do you have to find these BOS and CHoCH marks yourself?'),
        one: bi('SMC 是现成指标，会自动标出 BOS、CHoCH 和 FVG。', 'SMC is a ready-made indicator, and it marks BOS, CHoCH, and FVG on its own.'),
        explain: bi('SMC 是一种现成指标，和 TradingView 上的 Smart Money Concepts 是一类。\n打开就能用，不用自己在图上找点。\n图上会自动标出 BOS、CHoCH，以及 FVG 方框。\nBOS 是结构延续。\n原来往上走，收盘又越过前一个高点，就标 BOS。\n原来往下走，收盘又跌破前一个低点，也标 BOS。\n只是影线刺过去、收盘没过去，不算。\nCHoCH 是结构转向。\n原来往上走，收盘反过来跌破刚才护着的低点，就标 CHoCH。\n原来往下走，收盘反过来升破刚才压着的高点，也标 CHoCH。\n它只说明方向可能在变，不保证已经转完。\nFVG 是三根 K 线中间留下的缺口方框。\n中间那根要是一根冲得很猛的大 K 线。\n往上冲时，第一根的高点够不着第三根的低点。\n往下冲时，第一根的低点够不着第三根的高点。\n两边对不上，中间就空出一块，指标把它画成方框。\n资金和动能还在，大方向也顺着的时候，价格常常会先回来补一波流动性，再继续走。\n补上不是每次都有。\n要和其他信号一起看。', 'SMC is a ready-made indicator, in the same family as Smart Money Concepts on TradingView.\nYou turn it on and use it, without hunting for the points yourself.\nThe chart marks BOS, CHoCH, and the FVG boxes on its own.\nBOS means the structure continues.\nIf price was rising and the close passes the previous high, it marks BOS.\nIf price was falling and the close breaks the previous low, it also marks BOS.\nA wick through the level does not count when the close stays back.\nCHoCH means the structure turns.\nIf price was rising and the close breaks the low that was holding, the other way, it marks CHoCH.\nIf price was falling and the close breaks the high that was capping it, the other way, it also marks CHoCH.\nIt only says the direction may be changing, and it does not mean the turn is already finished.\nAn FVG is the gap box left between three candles.\nThe middle candle has to be a big, fast candle.\nOn a push up, the first candle\'s high does not reach the third candle\'s low.\nOn a push down, the first candle\'s low does not reach the third candle\'s high.\nThe two sides do not overlap, a space is left in the middle, and the indicator draws it as a box.\nWhen the funds and the momentum are still there, and the bigger trend agrees, price often comes back to fill some liquidity, then continues.\nThe fill does not happen every time.\nLook at it together with other signals.'),
        example: bi('', ''),
        pitfalls: [
          bi('把影线刺过当成收盘已经突破', 'Treating a wick through a level as a close that already broke it'),
          bi('以为每个 FVG 都会补上', 'Assuming every FVG gets filled')
        ],
        practice: bi('到行情实验室打开 SMC，看它自动标出的 BOS、CHoCH 和 FVG。', 'Open SMC in the market lab and look at the BOS, CHoCH, and FVG it marks on its own.'),
        check: {
          ask: bi('往上的缺口方框，是怎么出现的？', 'What makes an upward gap box appear?'),
          options: [opt('A', '一根影线刺过前高', 'A wick pokes through the prior high'), opt('B', '中间一根冲得猛，第一根高点够不着第三根低点', 'The middle candle is a fast push, and the first high does not reach the third low'), opt('C', '这个价位完全没有成交', 'Nothing traded at that price'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'B',
          miss: bi('缺口看的是三根 K 线的高低对不上。\n影线刺过，或者没人成交，都不是这个方框的条件。', 'A gap is three candles whose high and low do not meet.\nA wick through a level, or a claim that nobody traded, is not what makes this box.')
        },
        quizzes: [
          quiz('原来往上走，收盘又越过前一个高点。指标标什么？', 'Price was rising, and the close passes the previous high again. What does the indicator mark?', [opt('A', 'CHoCH', 'CHoCH'), opt('B', 'FVG', 'FVG'), opt('C', 'BOS', 'BOS'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'C', {A: ['反过来破掉护着的低点，才是 CHoCH。', 'Breaking the low that was holding, the other way, is CHoCH.'], B: ['FVG 是三根 K 线中间的缺口方框，不是这次突破。', 'An FVG is the gap box between three candles, not this break.'], C: ['顺着原来的方向，收盘越过前高，这是结构延续，标 BOS。', 'A close that passes the prior high in the same direction is structure continuing. That mark is BOS.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('原来往上走，收盘反过来跌破刚才护着的低点。这是？', 'Price was rising, and the close breaks the low that was holding, the other way. What is that?', [opt('A', 'CHoCH', 'CHoCH'), opt('B', 'BOS', 'BOS'), opt('C', '一定已经转跌完', 'The drop is already finished'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'A', {A: ['方向反过来破掉原来护着的点，这是结构转向，标 CHoCH。它不保证已经转完。', 'Breaking the level that was holding, the other way, is a change of structure. The mark is CHoCH. It does not mean the turn is finished.'], B: ['BOS 是顺着原来的方向越过前高或前低。', 'BOS passes the prior high or low in the same direction.'], C: ['标出来只说明可能在变，不是已经转完。', 'The mark only says it may be changing. The turn is not finished.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('资金和动能还在，大方向也顺着。价格对 FVG 常常怎样？', 'The funds and the momentum are still there, and the bigger trend agrees. What does price often do with an FVG?', [opt('A', '方框一出来就必须反向', 'The box must reverse as soon as it appears'), opt('B', '每次都会补满，而且一定继续', 'It fills every time, and it must continue'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '常常先回来补一波流动性，再继续，但不是每次都有', 'It often comes back to fill some liquidity, then continues, but not every time')], 'D', {A: ['方框不是反向命令。', 'The box is not an order to reverse.'], B: ['回来补一波很常见，但不是每次都有，也不保证接着怎么走。', 'Coming back to fill some is common, but it is not every time, and it does not guarantee what follows.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['资金和动能还在、大方向也顺着时，价格常常先回来补一波流动性，再继续。要和其他信号一起看。', 'When the funds and the momentum are still there, and the bigger trend agrees, price often comes back to fill some liquidity, then continues. Look at it with other signals.']})
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
          caption: bi('BOS、CHoCH 和 FVG 是指标自动标在 K 线上的。', 'BOS, CHoCH, and FVG are marked on the candles by the indicator.'),
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
              ? { ask: zh ? '价格先跌破结构时，EMA50 会不会马上跟着拐头？' : 'When price breaks structure first, does EMA50 turn at the same moment?', answer: 'C', options: [['A', zh ? '会，它和价格同时转' : 'Yes, it turns with price'], ['B', zh ? '它会提前转' : 'It turns earlier'], ['C', zh ? '不会，它转得更晚' : 'No. It turns later']] }
              : { ask: zh ? '收盘离快线不到 0.3%。这是不是已经确认反弹？' : 'The close is within 0.3% of the fast line. Is the bounce already confirmed?', answer: 'A', options: [['A', zh ? '还没有，靠近和确认不是同一件事' : 'No. Near and confirmed are different'], ['B', zh ? '已经确认，可以买' : 'Yes, it is confirmed'], ['C', zh ? '只有跌破才算靠近' : 'Only a break below counts as near']] };
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
  function mix(n) {
    var x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
    x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
    return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
  }
  function unit(i, salt) {
    return mix(i * 997 + salt * 131 + 17);
  }
  function tape(start, count, salt, segs) {
    var bars = [];
    var price = start;
    var vol = 0.007;
    var i;
    for (i = 0; i < count; i++) {
      var at = 0;
      var drift = segs[segs.length - 1][1];
      var s;
      for (s = 0; s < segs.length; s++) {
        at += segs[s][0];
        if (i < at) { drift = segs[s][1]; break; }
      }
      var u = unit(i, salt);
      if (u > 0.94) vol = Math.min(0.022, vol * 1.7);
      else if (u < 0.06) vol = Math.max(0.003, vol * 0.5);
      else vol = vol * 0.88 + 0.007 * 0.12;
      var ret = drift + (unit(i, salt + 17) - 0.5) * 2 * vol;
      var open = price;
      var close = open * (1 + ret);
      var body = Math.abs(close - open);
      var high = Math.max(open, close) + body * (0.45 + unit(i, salt + 3) * 1.8) + open * 0.0012 * unit(i, salt + 4);
      var low = Math.min(open, close) - body * (0.45 + unit(i, salt + 5) * 1.8) - open * 0.0012 * unit(i, salt + 6);
      bars.push({
        t: i,
        o: Math.round(open * 100) / 100,
        h: Math.round(high * 100) / 100,
        l: Math.round(low * 100) / 100,
        c: Math.round(close * 100) / 100,
        v: Math.round(40 + unit(i, salt + 9) * 220 * (0.45 + Math.abs(ret) / 0.01))
      });
      price = close;
    }
    return bars;
  }
  function decorate(bars, from) {
    var pack = macd(bars.map(function (bar) { return bar.c; }));
    if (from == null) from = 60;
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
      above: Object.assign({ id: 'above', zh: '来回交叉', en: 'Many crosses' }, decorate(tape(41000, 150, 15, [[22, 0.0006], [16, 0.0026], [12, -0.0022], [18, 0.002], [14, -0.0018], [18, 0.0024], [12, -0.0026], [18, 0.0012], [20, -0.0008]]), 40)),
      fail: Object.assign({ id: 'fail', zh: '金叉失败', en: 'Failed golden cross' }, decorate(tape(72000, 150, 8, [[36, -0.0022], [8, 0.0002], [20, 0.0034], [86, -0.0026]]), 40)),
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
      shown: scenes.above.bars.length - scenes.above.visibleFrom,
      cursor: null,
      playing: false,
      showFast: false,
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
        if (kind === 'gold' && dif <= 0) return { tone: 'is-right', text: zh ? '这是一次失败的金叉。快线穿过了慢线，价格随后还创新低。它不是买入按钮。' : 'This golden cross failed. The fast line crossed the slow line, and price then made a new low. It is not a buy button.' };
        if (kind === 'gold') return { tone: 'is-wrong', text: zh ? '这根在 0 轴上方。反例要找穿过之后价格还继续跌的那一次。' : 'This one is above zero. The counterexample asks for the cross that was still followed by a drop.' };
        return { tone: '', text: zh ? '这根快线没有从下往上穿过慢线。' : 'The fast line does not cross up through the slow line on this bar.' };
      }
      if (kind === 'gold' && dif > 0) return { tone: 'is-right', text: zh ? '这是 0 轴上方的金叉。快线刚从下往上穿过慢线，整体偏多，但不是买入按钮。' : 'This golden cross is above zero. The fast line just crossed up through the slow line, so it leans up, but it is not a buy button.' };
      if (kind === 'gold') return { tone: 'is-wrong', text: zh ? '这次金叉在 0 轴下方，整体还偏空。请点 0 轴上方的那一次。' : 'This golden cross is below zero, so the picture still leans down. Tap the one above zero.' };
      if (kind === 'death') return { tone: '', text: zh ? '这根是死叉。快线从上往下穿过慢线。本练习要你点金叉。' : 'This bar is a death cross. The fast line crossed down through the slow line. This practice asks for a golden cross.' };
      return { tone: '', text: zh ? '这根快线没有穿过慢线。' : 'The fast line does not cross the slow line on this bar.' };
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
      var side = dif == null ? '' : (dif > 0 ? (zh ? ' 快线在 0 轴上方，偏多。' : ' The fast line is above zero, so it leans up.') : (dif < 0 ? (zh ? ' 快线在 0 轴下方，偏空。' : ' The fast line is below zero, so it leans down.') : (zh ? ' 快线正在 0 轴上。' : ' The fast line is on zero.')));
      return when + '<br>' + (zh ? '开 ' : 'O ') + fmt(bar.o) + (zh ? ' 高 ' : ' H ') + fmt(bar.h) + (zh ? ' 低 ' : ' L ') + fmt(bar.l) + (zh ? ' 收 ' : ' C ') + fmt(bar.c) +
        '<br>' + (zh ? '快线 ' : 'Fast ') + (dif == null ? (zh ? '还算不出' : 'not ready') : fmt(dif)) + (zh ? ' · 慢线 ' : ' · Slow ') + (dea == null ? (zh ? '还算不出' : 'not ready') : fmt(dea)) + (zh ? ' · 距离 ' : ' · Gap ') + (hist == null ? (zh ? '还算不出' : 'not ready') : fmt(hist)) + tag + side;
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
      var priceH = 236;
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
      var macTop = 278;
      var macH = 158;
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
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(1.6, slot * 0.62);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.1"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.2, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 20 === 0) bits.push('<text x="' + xc + '" y="462" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
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
        var prev = abs > 0 ? pack.macd.hist[abs - 1] : null;
        var growing = prev == null || (hist >= 0 ? hist >= prev : hist <= prev);
        var color = hist >= 0 ? (growing ? '#1f8a4d' : '#145c34') : (growing ? '#d4534e' : '#6e2c32');
        var xc = padL + i * slot + slot / 2;
        var y1 = my(0);
        var y2 = my(hist);
        bits.push('<rect x="' + (xc - Math.max(1.4, slot * 0.32)) + '" y="' + Math.min(y1, y2) + '" width="' + Math.max(2, slot * 0.58) + '" height="' + Math.max(1, Math.abs(y2 - y1)) + '" fill="' + color + '"></rect>');
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
      draw.forEach(function (bar, i) {
        var abs = from + i;
        var kind = kindAt(pack, abs);
        if (!kind) return;
        var xc = padL + i * slot + slot / 2;
        var dif = pack.macd.dif[abs];
        var dea = pack.macd.dea[abs];
        var at = my((dif + dea) / 2);
        var bump = (i % 2) * 10;
        if (kind === 'gold') {
          bits.push('<text data-cross="gold" x="' + xc + '" y="' + Math.min(macTop + macH - 2, at + 14 + bump) + '" text-anchor="middle" fill="#1f8a4d" font-size="11">' + (zh ? '金叉' : 'Gold') + '</text>');
        } else {
          bits.push('<text data-cross="death" x="' + xc + '" y="' + Math.max(macTop + 11, at - 6 - bump) + '" text-anchor="middle" fill="#d4534e" font-size="11">' + (zh ? '死叉' : 'Death') + '</text>');
        }
      });
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
        bits.push('<rect data-bar="' + abs + '" data-pane="price" x="' + x + '" y="' + top + '" width="' + slot + '" height="' + (macTop - top - 8) + '" fill="transparent" style="cursor:pointer"></rect>');
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
            ? { ask: zh ? '负柱缩短，但收盘仍在下跌。价格是不是已经反转？' : 'The negative bars shrink, but the close is still falling. Has price already reversed?', answer: 'C', options: [['A', zh ? '已经确认上涨' : 'The rise is confirmed'], ['B', zh ? '下一根一定会反弹' : 'The next bar must bounce'], ['C', zh ? '不能，负差值变小不是反转' : 'No. A smaller negative gap is not a reversal']] }
            : state.scene === 'div'
              ? { ask: zh ? '价格更高高点，DIF 更低高点。这是否保证随后反转？' : 'Price makes a higher high and DIF a lower high. Does that guarantee a reversal?', answer: 'A', options: [['A', zh ? '不保证' : 'It does not'], ['B', zh ? '保证' : 'It guarantees it'], ['C', zh ? '柱子也更低才保证' : 'Only if the bar is lower too']] }
              : state.scene === 'fake'
                ? { ask: zh ? '价格的第二个高点并没有更高，DIF 却在下降。这是顶背离吗？' : 'The second price high is not higher, while DIF falls. Is that bearish divergence?', answer: 'B', options: [['A', zh ? '是' : 'Yes'], ['B', zh ? '不是，价格没有更高高点' : 'No. Price did not make a higher high'], ['C', zh ? '只要 DIF 下降就是' : 'Any falling DIF counts']] }
                : { ask: zh ? '零轴上方的金叉，是不是就可以当作买入？' : 'A golden cross above zero: is it a buy order?', answer: 'C', options: [['A', zh ? '是，金叉必涨' : 'Yes, a cross must rise'], ['B', zh ? '死叉才是买入' : 'A death cross is the buy'], ['C', zh ? '不是，只是延续候选' : 'No, it is only a continuation candidate']] };
        judge = '<p>' + esc(q.ask) + '</p><div class="a1-modes">' + q.options.map(function (opt) {
          return '<button type="button" data-judge="' + opt[0] + '" data-answer="' + q.answer + '">' + opt[0] + '. ' + esc(opt[1]) + '</button>';
        }).join('') + '</div>';
      }
      var note = state.note || readout(pack) || (zh ? '小练习：点出一根金叉，也就是快线从下往上穿过慢线的那根。' : 'Short practice: tap a golden cross, the bar where the fast line crosses up through the slow line.');
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是 K 线，下面是 MACD。' : 'Candles are on top, and MACD is below.') + '</p>' +
        '<div class="macd-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>' + (zh ? '快线' : 'Fast line') + '</span><span><i style="background:#8eb4ff"></i>' + (zh ? '慢线' : 'Slow line') + '</span><span><i style="background:#1f8a4d"></i>' + (zh ? '绿柱' : 'Green bar') + '</span><span><i style="background:#d4534e"></i>' + (zh ? '红柱' : 'Red bar') + '</span><span>0 ' + (zh ? '轴' : 'line') + '</span></p>' +
        '<p>' + (state.scene === 'fail'
          ? (zh ? '反例：快线穿过慢线之后，价格还是继续跌。' : 'Counterexample: after the fast line crosses the slow line, price still keeps falling.')
          : (zh ? '小练习：点出一根金叉。金叉不是买入按钮。' : 'Short practice: tap a golden cross. A golden cross is not a buy button.')) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="macd">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '想知道怎么算：快线是近 12 根收盘和近 26 根收盘的差。慢线是快线自己的 9 根平均。柱子是快线减慢线，不乘 2。根数不够时不画线，也不假装是 0。'
          : 'Want the calculation: the fast line is the last 12 closes minus the last 26 closes. The slow line is the fast line’s own 9-bar average. A bar is fast minus slow, not doubled. Before there are enough bars, no line is drawn, and it is not faked as 0.') + '</p></div>';
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
        state.shown = maxShown();
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
          if (state.shown >= maxShown()) state.shown = 40;
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
          state.shown = state.step === 'exam' ? 36 : 40;
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
  function mix(n) {
    var x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
    x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
    return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
  }
  function unit(i, salt) {
    return mix(i * 997 + salt * 131 + 17);
  }
  function intraday(start, count, salt, plan) {
    var bars = [];
    var price = start;
    var dir = 1;
    var left = 0;
    var i;
    for (i = 0; i < count; i++) {
      var drift = 0;
      var p;
      for (p = 0; p < plan.length; p++) if (i >= plan[p][0] && i < plan[p][0] + plan[p][1]) drift = plan[p][2];
      if (!drift && left <= 0) {
        left = 5 + Math.floor(mix(i * 13 + salt) * 4);
        dir = mix(i * 19 + salt) > 0.5 ? 1 : -1;
      }
      if (!drift) left -= 1;
      var noise = (mix(i * 41 + salt) - 0.5) * 0.004;
      var ret = drift ? drift + noise * 0.3 : dir * 0.0055 + noise;
      var open = price;
      var close = open * (1 + ret);
      var wick = open * (0.001 + mix(i * 3 + salt) * 0.0025);
      var high = Math.max(open, close) + wick;
      var low = Math.min(open, close) - wick;
      bars.push({
        t: i,
        o: Math.round(open * 100) / 100,
        h: Math.round(high * 100) / 100,
        l: Math.round(low * 100) / 100,
        c: Math.round(close * 100) / 100,
        v: Math.round(40 + mix(i + salt + 9) * 80)
      });
      price = close;
    }
    return bars;
  }
  function tape(start, count, salt, segs) {
    var bars = [];
    var price = start;
    var vol = 0.008;
    var i;
    for (i = 0; i < count; i++) {
      var at = 0;
      var drift = segs[segs.length - 1][1];
      var s;
      for (s = 0; s < segs.length; s++) {
        at += segs[s][0];
        if (i < at) { drift = segs[s][1]; break; }
      }
      var u = unit(i, salt);
      if (u > 0.94) vol = Math.min(0.024, vol * 1.7);
      else if (u < 0.06) vol = Math.max(0.003, vol * 0.5);
      else vol = vol * 0.88 + 0.008 * 0.12;
      var ret = drift + (unit(i, salt + 17) - 0.5) * 2 * vol;
      var open = price;
      var close = open * (1 + ret);
      var body = Math.abs(close - open);
      var high = Math.max(open, close) + body * (0.45 + unit(i, salt + 3) * 1.8) + open * 0.0012 * unit(i, salt + 4);
      var low = Math.min(open, close) - body * (0.45 + unit(i, salt + 5) * 1.8) - open * 0.0012 * unit(i, salt + 6);
      bars.push({
        t: i,
        o: Math.round(open * 100) / 100,
        h: Math.round(high * 100) / 100,
        l: Math.round(low * 100) / 100,
        c: Math.round(close * 100) / 100,
        v: Math.round(40 + unit(i, salt + 9) * 200)
      });
      price = close;
    }
    return bars;
  }
  function decorate(bars, from) {
    var values = rsi(bars.map(function (bar) { return bar.c; }), 14);
    if (from == null) from = 60;
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
      hot: Object.assign({ id: 'hot', zh: '急跌再急拉', en: 'A dump and a pump' }, decorate(intraday(61200, 230, 1, [[100, 4, -0.02], [104, 5, 0.018], [170, 5, 0.016]]), 40)),
      cold: Object.assign({ id: 'cold', zh: '跌破后还在跌', en: 'Still falling after the drop' }, decorate(intraday(62800, 220, 10, [[70, 5, -0.022], [76, 4, 0.006], [120, 5, -0.012]]), 40)),
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
      shown: scenes.hot.bars.length - scenes.hot.visibleFrom,
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
        if (value < state.os && lower) return { tone: 'is-right', text: zh ? '这根已经跌到 30 下面，后面的价格还更低。跌得猛不是马上抄底。' : 'This bar is already under 30, and a later price is lower. A sharp fall is not an order to buy the dip.' };
        if (value < state.os) return { tone: '', text: zh ? '这根在 30 下面，但后面还没有更低的收盘。点更早的一根，或继续播放。' : 'This bar is under 30, but no later close is lower yet. Pick an earlier bar, or keep playing.' };
        return { tone: '', text: zh ? '这根还没跌到 30 下面。' : 'This bar is not under 30 yet.' };
      }
      if (state.scene === 'bear' || state.scene === 'bull' || state.scene === 'fake') return gradeDivergence(pack);
      var higher = false;
      var j;
      for (j = index + 1; j < pack.bars.length; j++) if (pack.bars[j].c > pack.bars[index].c) higher = true;
      if (value > state.ob && higher) return { tone: 'is-right', text: zh ? '这根已经涨到 70 上面，后面的价格还更高。涨得猛不是马上卖。' : 'This bar is already above 70, and a later price is higher. A strong rise is not an order to sell.' };
      if (value > state.ob) return { tone: '', text: zh ? '这根在 70 上面，但后面还没有更高的收盘。点更早的一根，或继续播放。' : 'This bar is above 70, but no later close is higher yet. Pick an earlier bar, or keep playing.' };
      return { tone: 'is-wrong', text: zh ? '这根还没到 70。请点涨得猛、后面还在涨的那根。' : 'This bar is not at 70 yet. Tap one that is rising hard and is still followed by a higher price.' };
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
      var h = 470;
      var padL = 10;
      var padR = 78;
      var top = 16;
      var priceH = 228;
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
      var rsiTop = 270;
      var rsiH = 164;
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
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var x = padL + i * slot;
        var xc = x + slot / 2;
        var bw = Math.max(1.6, slot * 0.62);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.1"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.2, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 20 === 0) bits.push('<text x="' + xc + '" y="462" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
      });
      [100, 70, 50, 30].forEach(function (level) {
        var guide = level === 100 ? 'rgba(190,176,230,.32)' : 'rgba(190,176,230,.75)';
        var dash = level === 100 ? '3 4' : '4 4';
        bits.push('<line x1="' + padL + '" y1="' + ry(level) + '" x2="' + (w - padR) + '" y2="' + ry(level) + '" stroke="' + guide + '" stroke-dasharray="' + dash + '"></line>');
      });
      if (state.showRsi) {
        var bandTop = ry(70);
        var bandBot = ry(30);
        bits.push('<rect x="' + padL + '" y="' + bandTop + '" width="' + (w - padL - padR) + '" height="' + (bandBot - bandTop) + '" fill="rgba(176,154,230,.16)"></rect>');
        draw.forEach(function (bar, i) {
          var value = pack.rsi[from + i];
          if (value == null) return;
          var xc = padL + i * slot + slot / 2;
          var bw = Math.max(1.4, slot * 0.7);
          if (value > 70) bits.push('<rect x="' + (xc - bw / 2) + '" y="' + ry(value) + '" width="' + bw + '" height="' + Math.max(1, ry(70) - ry(value)) + '" fill="rgba(61,190,134,.55)"></rect>');
          if (value < 30) bits.push('<rect x="' + (xc - bw / 2) + '" y="' + ry(30) + '" width="' + bw + '" height="' + Math.max(1, ry(value) - ry(30)) + '" fill="rgba(224,112,144,.55)"></rect>');
        });
        var rsiPts = [];
        var smaPts = [];
        var sma = pack.rsi.map(function () { return null; });
        var si;
        for (si = 0; si < pack.rsi.length; si++) {
          if (si < 13 || pack.rsi[si] == null) continue;
          var ok = true;
          var sum = 0;
          var sk;
          for (sk = si - 13; sk <= si; sk++) {
            if (pack.rsi[sk] == null) ok = false;
            else sum += pack.rsi[sk];
          }
          if (ok) sma[si] = sum / 14;
        }
        draw.forEach(function (bar, i) {
          var abs = from + i;
          var xc = (padL + i * slot + slot / 2).toFixed(1);
          if (pack.rsi[abs] != null) rsiPts.push(xc + ',' + ry(pack.rsi[abs]).toFixed(1));
          if (sma[abs] != null) smaPts.push(xc + ',' + ry(sma[abs]).toFixed(1));
        });
        if (rsiPts.length > 1) bits.push('<polyline points="' + rsiPts.join(' ') + '" fill="none" stroke="#9a84d6" stroke-width="1.6"></polyline>');
        if (smaPts.length > 1) bits.push('<polyline points="' + smaPts.join(' ') + '" fill="none" stroke="#f4cb82" stroke-width="1.5"></polyline>');
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
        bits.push('<rect data-bar="' + abs + '" data-pane="price" x="' + x + '" y="' + top + '" width="' + slot + '" height="' + (rsiTop - top - 8) + '" fill="transparent" style="cursor:pointer"></rect>');
        bits.push('<rect data-bar="' + abs + '" data-pane="rsi" x="' + x + '" y="' + rsiTop + '" width="' + slot + '" height="' + rsiH + '" fill="transparent" style="cursor:pointer"></rect>');
      });
      bits.push('</svg>');
      var steps = [['watch', zh ? '看懂' : 'Watch'], ['mark', zh ? '自己标记' : 'Mark'], ['judge', zh ? '判断真假' : 'True or false'], ['fail', zh ? '失败案例' : 'Failure'], ['exam', zh ? '新行情考试' : 'New tape']];
      var sceneIds = ['hot', 'cold', 'bear', 'bull', 'fake'];
      var judge = '';
      if (state.step === 'judge') {
        var q = state.scene === 'cold'
          ? { ask: zh ? 'RSI 低于 30，是不是必须马上抄底？' : 'RSI is below 30. Do you have to buy immediately?', answer: 'A', options: [['A', zh ? '不是，低于 30 仍可以继续跌' : 'No. It can keep falling under 30'], ['B', zh ? '必须抄底' : 'You must buy'], ['C', zh ? '只有 RSI 到 0 才不是' : 'Only RSI 0 is not a buy']] }
          : state.scene === 'bear'
            ? { ask: zh ? '价格更高高点、RSI 更低高点，是否保证随后下跌？' : 'A higher price high and a lower RSI high: does that guarantee a drop?', answer: 'B', options: [['A', zh ? '保证，马上做空' : 'Yes, short now'], ['B', zh ? '不保证' : 'It does not'], ['C', zh ? '到了 70 才保证' : 'Only after 70']] }
            : state.scene === 'bull'
              ? { ask: zh ? '价格更低低点、RSI 更高低点，是否保证随后上涨？' : 'A lower price low and a higher RSI low: does that guarantee a rise?', answer: 'C', options: [['A', zh ? '保证' : 'It guarantees it'], ['B', zh ? '超卖了就保证' : 'Oversold guarantees it'], ['C', zh ? '不保证' : 'It does not']] }
              : state.scene === 'fake'
                ? { ask: zh ? '第二个价格高点没有更高，RSI 却在下降。这是顶背离吗？' : 'The second price high is not higher, while RSI falls. Is that bearish divergence?', answer: 'A', options: [['A', zh ? '不是' : 'No'], ['B', zh ? '是' : 'Yes'], ['C', zh ? '只要 RSI 下降就是' : 'Any falling RSI counts']] }
                : { ask: zh ? 'RSI 高于 70，是不是必须马上卖？' : 'RSI is above 70. Do you have to sell immediately?', answer: 'B', options: [['A', zh ? '必须马上卖' : 'You must sell now'], ['B', zh ? '不是，它还可以停在高位' : 'No. It can stay high'], ['C', zh ? '到了 80 才必须卖' : 'Only 80 forces a sale']] };
        judge = '<p>' + esc(q.ask) + '</p><div class="a1-modes">' + q.options.map(function (opt) {
          return '<button type="button" data-judge="' + opt[0] + '" data-answer="' + q.answer + '">' + opt[0] + '. ' + esc(opt[1]) + '</button>';
        }).join('') + '</div>';
      }
      var exam = '';
      if (state.step === 'exam' && state.examStage === 'strength') {
        exam = '<div class="a1-modes"><button type="button" data-bias="up">' + (zh ? '收盘在抬高' : 'Closes are rising') + '</button><button type="button" data-bias="flat">' + (zh ? '差不多' : 'About flat') + '</button><button type="button" data-bias="down">' + (zh ? '收盘在压低' : 'Closes are falling') + '</button></div>';
      }
      var note = state.note || readout(pack) || (zh ? '小练习：点出一根线在 70 上面、后面价格还更高的 K 线。' : 'Short practice: tap a candle where the line is above 70 and a later price is higher.');
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是 K 线，下面是强弱线。' : 'Candles are on top, and the strength line is below.') + '</p>' +
        '<div class="rsi-chart"><div class="rsi-scroll">' + bits.join('') + '</div><div class="rsi-axis" aria-label="RSI">' + [100, 70, 50, 30].map(function (level) {
          return '<span class="rsi-tick" style="top:' + (ry(level) / h * 100).toFixed(2) + '%">' + level + '</span>';
        }).join('') + '</div></div>' +
        '<p class="star-key"><span><i style="background:#9a84d6"></i>' + (zh ? '强弱线' : 'Strength') + '</span><span><i style="background:#f4cb82"></i>' + (zh ? '强弱线的平均' : 'Average of the line') + '</span><span><i style="background:#b09ae6"></i>30–70</span></p>' +
        '<p>' + (state.scene === 'cold'
          ? (zh ? '反例：线到 30 下面时，价格仍可以继续跌。' : 'Counterexample: while the line is under 30, price can keep falling.')
          : (zh ? '小练习：点出一根线在 70 上面、后面还在涨的 K 线。涨得猛不是马上卖。' : 'Short practice: tap a candle above 70 that is still followed by a higher price. A strong rise is not an immediate sell.')) + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play" aria-pressed="' + state.playing + '">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="rsi">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + maxShown() + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p>' +
        '<p class="ema-note">' + (zh
          ? '想知道怎么算：把最近 14 根的上涨和下跌分开平均，再看成 0 到 100。根数不够时不画，也不假装是 0。'
          : 'Want the calculation: average the rises and the falls of the last 14 bars separately, then read that as 0 to 100. Before there are enough bars, nothing is drawn, and it is not faked as 0.') + '</p></div>';
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
        state.shown = maxShown();
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
          if (state.shown >= maxShown()) state.shown = 40;
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
          state.shown = state.step === 'exam' ? 40 : 40;
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
    return { dif: dif, dea: dea, hist: dif.map(function (value, i) { return value == null || dea[i] == null ? null : value - dea[i]; }) };
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
  function mix(n) {
    var x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
    x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
    return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
  }
  function storyBars(extra) {
    var segs = [[22, 0.0003], [20, 0.0034], [12, -0.0024], [22, 0.0015], [14, -0.002], [18, -0.0038], [10, 0.0022], [16, -0.0026], [12, 0.001]];
    if (extra) segs = segs.concat([[18, 0.0045]]);
    var price = 42000;
    var plan = [];
    segs.forEach(function (seg) { var k; for (k = 0; k < seg[0]; k++) plan.push(seg[1]); });
    var bars = [];
    var vol = 0.007;
    var i;
    for (i = 0; i < plan.length; i++) {
      var u = mix(i * 997 + 9 * 131);
      if (u > 0.94) vol = Math.min(0.022, vol * 1.7);
      else vol = vol * 0.88 + 0.007 * 0.12;
      var ret = plan[i] + (mix(i * 997 + 9 * 17) - 0.5) * 2 * vol;
      var open = price;
      var close = open * (1 + ret);
      var body = Math.abs(close - open);
      var high = Math.max(open, close) + body * (0.45 + mix(i * 3 + 9) * 1.6) + open * 0.001;
      var low = Math.min(open, close) - body * (0.45 + mix(i * 5 + 9) * 1.6) - open * 0.001;
      bars.push({ t: i, o: Math.round(open * 100) / 100, h: Math.round(high * 100) / 100, l: Math.round(low * 100) / 100, c: Math.round(close * 100) / 100, v: 40 + Math.floor(mix(i + 4) * 80) });
      price = close;
    }
    return bars;
  }
  function pairOf(bars, mode) {
    var values = rsi(bars.map(function (bar) { return bar.c; }), 14);
    var pack = macd(bars.map(function (bar) { return bar.c; }));
    var points = swings(bars, 2, mode);
    var best = null;
    var score = 0;
    points.forEach(function (a) {
      points.forEach(function (b) {
        if (b - a < 8 || values[a] == null || values[b] == null || pack.dif[a] == null || pack.dif[b] == null) return;
        var priceOk = mode === 'high' ? bars[b].h > bars[a].h : bars[b].l < bars[a].l;
        var rsiOk = mode === 'high' ? values[b] < values[a] - 3 : values[b] > values[a] + 3;
        var macdOk = mode === 'high' ? pack.dif[b] < pack.dif[a] : pack.dif[b] > pack.dif[a];
        var gap = mode === 'high' ? bars[b].h - bars[a].h : bars[a].l - bars[b].l;
        if (priceOk && rsiOk && macdOk && gap > score) { score = gap; best = [a, b]; }
      });
    });
    return best;
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var scenes = buildScenes();
    var storyBarsMain = storyBars(false);
    var storyBarsFail = storyBars(true);
    scenes.story = { id: 'story', bars: storyBarsMain, visible: storyBarsMain.length, mode: 'high', start: 40, top: pairOf(storyBarsMain, 'high'), bot: pairOf(storyBarsMain, 'low') };
    scenes.miss = { id: 'miss', bars: storyBarsFail, visible: storyBarsFail.length, mode: 'high', start: 40, top: scenes.story.top, bot: scenes.story.bot };
    var state = { scene: 'story', step: 'watch', shown: scenes.story.visible, cursor: null, playing: false, source: 'rsi', wing: 2, showTime: false, pricePts: [], indPts: [], note: '', tone: '' };
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
    function paintStory() {
      var current = scene();
      var draw = current.bars.slice(0, state.shown);
      var closes = draw.map(function (bar) { return bar.c; });
      var pack = macd(closes);
      var w = 980;
      var h = 560;
      var padL = 12;
      var padR = 72;
      var top = 18;
      var priceH = 300;
      var vals = [];
      draw.forEach(function (bar) { vals.push(bar.h, bar.l); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = max - min || 1;
      min -= span * 0.06;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * priceH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      var macTop = 348;
      var macH = 186;
      var macAbs = [1];
      pack.dif.forEach(function (v, i) { if (v != null) macAbs.push(Math.abs(v), Math.abs(pack.hist[i] || 0)); });
      var macMax = Math.max.apply(null, macAbs);
      function my(v) { return macTop + macH / 2 - (v / macMax) * (macH / 2 - 12); }
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = padL + i * slot + slot / 2;
        var bw = Math.max(1.5, slot * 0.62);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '" stroke-width="1.1"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.1, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 20 === 0) bits.push('<text x="' + xc + '" y="548" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
      });
      function line(series, color, dash, mapY) {
        var pts = [];
        series.forEach(function (value, i) { if (value != null && i < draw.length) pts.push((padL + i * slot + slot / 2).toFixed(1) + ',' + mapY(value).toFixed(1)); });
        if (pts.length > 1) bits.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="6 4"' : '') + '></polyline>');
      }
      bits.push('<line x1="' + padL + '" y1="' + my(0) + '" x2="' + (w - padR) + '" y2="' + my(0) + '" stroke="#f0d59a" stroke-dasharray="4 3"></line>');
      draw.forEach(function (bar, i) {
        var hist = pack.hist[i];
        if (hist == null) return;
        var xc = padL + i * slot + slot / 2;
        var y1 = my(0);
        var y2 = my(hist);
        bits.push('<rect x="' + (xc - Math.max(1, slot * 0.28)) + '" y="' + Math.min(y1, y2) + '" width="' + Math.max(1.6, slot * 0.5) + '" height="' + Math.max(1, Math.abs(y2 - y1)) + '" fill="' + (hist >= 0 ? '#1f8a4d' : '#d4534e') + '" opacity="0.85"></rect>');
      });
      line(pack.dif, '#f4cb82', false, my);
      line(pack.dea, '#8eb4ff', true, my);
      function macdPeak(index, mode) {
        var best = index;
        var bestV = pack.dif[index];
        var k;
        for (k = Math.max(0, index - 2); k <= Math.min(draw.length - 1, index + 2); k++) {
          var value = pack.dif[k];
          if (value == null) continue;
          if (bestV == null || (mode === 'high' ? value > bestV : value < bestV)) { best = k; bestV = value; }
        }
        return best;
      }
      function linkPair(pair, label, mode, color) {
        if (!pair || pair[1] >= draw.length) return;
        var mark = label === (zh ? '顶背离' : 'Top') ? 'top' : 'bot';
        var pricePts = pair.map(function (index) {
          var xc = padL + index * slot + slot / 2;
          var yy = y(mode === 'high' ? draw[index].h : draw[index].l);
          bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="4.5" fill="' + color + '"></circle>');
          return xc.toFixed(1) + ',' + yy.toFixed(1);
        });
        bits.push('<polyline points="' + pricePts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="3.2" stroke-linecap="round"></polyline>');
        var macPts = [];
        pair.forEach(function (index) {
          var at = macdPeak(index, mode);
          if (pack.dif[at] == null) return;
          var xc = padL + at * slot + slot / 2;
          var yy = my(pack.dif[at]);
          bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="4.5" fill="' + color + '"></circle>');
          macPts.push(xc.toFixed(1) + ',' + yy.toFixed(1));
        });
        if (macPts.length === 2) bits.push('<polyline points="' + macPts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="3.2" stroke-linecap="round"></polyline>');
        var xc = padL + pair[1] * slot + slot / 2;
        var priceY = y(mode === 'high' ? draw[pair[1]].h : draw[pair[1]].l);
        var labelY = mode === 'high' ? Math.max(top + 14, priceY - 10) : Math.min(top + priceH - 6, priceY + 16);
        var nearRight = xc > w - padR - 56;
        bits.push('<text data-mark="' + mark + '" x="' + (nearRight ? xc - 8 : xc) + '" y="' + labelY + '" text-anchor="' + (nearRight ? 'end' : 'middle') + '" fill="' + color + '" font-size="14" font-weight="700">' + label + '</text>');
      }
      linkPair(current.top, zh ? '顶背离' : 'Top', 'high', '#ff8f86');
      linkPair(current.bot, zh ? '底背离' : 'Bottom', 'low', '#8ee0b0');
      draw.forEach(function (bar, i) {
        bits.push('<rect data-bar="' + i + '" data-pane="price" x="' + (padL + i * slot) + '" y="' + top + '" width="' + slot + '" height="' + priceH + '" fill="transparent"></rect>');
      });
      bits.push('</svg>');
      var note = state.note || (current.id === 'miss'
        ? (zh ? '反例：顶背离标出来之后，价格还在继续涨。' : 'Counterexample: after the top divergence is marked, price keeps rising.')
        : (zh ? '小练习：点出顶背离的第二个高点。背离不保证马上跌。' : 'Short practice: tap the second high of the top divergence. Divergence does not guarantee an immediate drop.'));
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? '上面是 K 线，下面是 MACD。' : 'Candles are on top, and MACD is below.') + '</p>' +
        '<div class="div-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span><i style="background:#f4cb82"></i>' + (zh ? '快线' : 'Fast line') + '</span><span><i style="background:#8eb4ff"></i>' + (zh ? '慢线' : 'Slow line') + '</span><span><i style="background:#ff8f86"></i>' + (zh ? '顶背离' : 'Top') + '</span><span><i style="background:#8ee0b0"></i>' + (zh ? '底背离' : 'Bottom') + '</span></p>' +
        '<p>' + note + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button><button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button><button type="button" data-more="div">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button><span>' + state.shown + ' / ' + current.visible + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + note + '</p></div>';
    }
    function paint() {
      if (state.scene === 'story' || state.scene === 'miss') { paintStory(); return; }
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
        stop();
        state.scene = state.scene === 'story' ? 'miss' : 'story';
        state.shown = scene().visible;
        state.note = '';
        state.tone = '';
        state.pricePts = [];
        state.indPts = [];
        paint();
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
          if (state.shown >= scene().visible) state.shown = scene().start || 40;
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
      if (state.scene === 'story' || state.scene === 'miss') {
        var top = scene().top;
        var hit = top && Math.abs(index - top[1]) <= 1;
        if (hit && state.scene === 'miss') {
          state.tone = 'is-right';
          state.note = zh ? '这是顶背离的第二个高点。可是后面价格还在涨，所以它没有拦住行情。' : 'This is the second high of the top divergence. Price kept rising afterward, so it did not stop the move.';
        } else if (hit) {
          state.tone = 'is-right';
          state.note = zh ? '这是顶背离的第二个高点。价格更高，快线更低。这不保证马上跌。' : 'This is the second high of the top divergence. Price is higher, and the fast line is lower. That does not guarantee an immediate drop.';
        } else {
          state.tone = 'is-wrong';
          state.note = zh ? '还不是。请点标着顶背离的那个更高的高点。' : 'Not yet. Tap the higher high labeled top divergence.';
        }
        paint();
        return;
      }
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
      var upW = Math.abs(close) * (0.0016 + unit(i, 19) * 0.0045);
      var dnW = Math.abs(close) * (0.0014 + unit(i, 23) * 0.004);
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
    bars[50].c = 69680;
    bars[50].o = 69120;
    bars[50].l = 68840;
    var climb;
    for (climb = 45; climb < 50; climb++) {
      var step = (69120 - bars[44].c) * (climb - 44) / 6;
      bars[climb].c = Math.round((bars[44].c + step) * 100) / 100;
      bars[climb].o = bars[climb - 1].c;
      bars[climb].h = Math.round((Math.max(bars[climb].o, bars[climb].c) + 180) * 100) / 100;
      bars[climb].l = Math.round((Math.min(bars[climb].o, bars[climb].c) - 140) * 100) / 100;
    }
    bars.forEach(function (bar, index) {
      if (index !== 20) bar.l = Math.max(bar.l, 60120);
      if (index !== 50) bar.h = Math.min(bar.h, 69840);
      bar.h = Math.max(bar.h, bar.o, bar.c);
      bar.l = Math.min(bar.l, bar.o, bar.c);
    });
    return { bars: bars, lowAt: 20, highAt: 50, version: 1, source: 'sim-btc-usdt-fib-v1' };
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var data = tape();
    var state = {
      dir: 'up',
      mode: 'retrace',
      shown: data.bars.length,
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
      var showRatio = { 0: true, 0.382: true, 0.5: true, 0.618: true, 1: true };
      var shownLines = drawn && drawn.lines ? drawn.lines.filter(function (line) { return showRatio[line.r]; }).slice().sort(function (p, q) { return q.price - p.price; }) : [];
      var zi;
      for (zi = 0; zi < shownLines.length - 1; zi++) {
        var yHi = y(shownLines[zi].price);
        var yLo = y(shownLines[zi + 1].price);
        bits.push('<rect x="' + padL + '" y="' + Math.min(yHi, yLo) + '" width="' + (w - padL - padR) + '" height="' + Math.abs(yLo - yHi) + '" fill="rgba(240,213,154,' + (zi % 2 ? '0.14' : '0.07') + ')"></rect>');
      }
      shownLines.forEach(function (line) {
        var yy = y(line.price);
        bits.push('<line x1="' + padL + '" y1="' + yy + '" x2="' + (w - padR) + '" y2="' + yy + '" stroke="#f0d59a" stroke-width="1.4"></line>');
        bits.push('<text x="' + (padL + 6) + '" y="' + (yy - 4) + '" fill="#f0d59a" font-size="13">' + line.r + '  ' + Math.round(line.price) + '</text>');
      });
      if (state.a && state.b && state.a.price !== state.b.price) {
        var ax = padL + state.a.index * slot + slot / 2;
        var bx = padL + state.b.index * slot + slot / 2;
        bits.push('<line x1="' + ax + '" y1="' + y(state.a.price) + '" x2="' + bx + '" y2="' + y(state.b.price) + '" stroke="#ffffff" stroke-width="1.4"></line>');
      }
      draw.forEach(function (bar, i) {
        bits.push('<rect data-bar="' + i + '" x="' + (padL + i * slot) + '" y="' + top + '" width="' + slot + '" height="' + plotH + '" fill="transparent"></rect>');
      });
      function handle(which, point, color) {
        if (!point) return;
        var xc = padL + point.index * slot + slot / 2;
        var yy = y(point.price);
        bits.push('<circle data-handle="' + which + '" cx="' + xc + '" cy="' + yy + '" r="16" fill="transparent"></circle>');
        bits.push('<circle cx="' + xc + '" cy="' + yy + '" r="6" fill="' + color + '" stroke="#120e21" stroke-width="2"></circle>');
      }
      handle('a', state.a, '#f4cb82');
      handle('b', state.b, '#8eb4ff');
      bits.push('</svg>');
      var hint = state.a == null
        ? (state.dir === 'up' ? (zh ? '按住这段低点，拖到高点后松开。也可以先点低点，再点高点。' : 'Press this swing’s low and drag to the high. You can also tap the low, then the high.') : (zh ? '按住这段高点，拖到低点后松开。' : 'Press this swing’s high and drag to the low.'))
        : (state.b == null
          ? (state.dir === 'up' ? (zh ? '再点这一段的高点。' : 'Now tap the high of this swing.') : (zh ? '再点这一段的低点。' : 'Now tap the low of this swing.'))
          : (zh ? '线已经画好。可以再拖两端。0.5 到 0.618 只是参考。' : 'The lines are locked. You can still drag either end. 0.5 to 0.618 is only a reference.'));
      var liveHost = state.gesture && root.querySelector('.fib-scroll');
      if (liveHost) {
        liveHost.innerHTML = bits.join('');
        var liveRead = root.querySelector('.a2-readout');
        if (liveRead) liveRead.textContent = state.note || hint;
        return;
      }
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh
          ? '找到这段最明显的低点和高点。<br>按住起点拖到终点，线会跟着走，松开就定住。<br>上涨从低点拖到高点，下跌从高点拖到低点。<br>画好后可以再拖两端。0.5 到 0.618 只是参考。'
          : 'Find the most obvious low and high of this swing.<br>Press the start and drag to the end. The lines follow, and they lock when you let go.<br>In a rise, drag from the low to the high. In a drop, drag from the high to the low.<br>After that, you can drag either end. 0.5 to 0.618 is only a reference.') + '</p>' +
        '<div class="fib-scroll" style="touch-action:none">' + bits.join('') + '</div>' +
        '<p>' + hint + '</p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button>' +
        '<button type="button" data-act="clear">' + (zh ? '重画' : 'Redraw') + '</button>' +
        '<button type="button" data-act="demo">' + (zh ? '看示范' : 'See the example') + '</button>' +
        '<button type="button" data-act="reset">' + (zh ? '重新开始' : 'Start again') + '</button>' +
        '<button type="button" data-more="fib">' + (zh ? '再看一个反例' : 'See a counterexample') + '</button>' +
        '<span>' + state.shown + ' / ' + data.bars.length + '</span></div>' +
        '<p class="a2-readout ' + state.tone + '">' + (state.note || hint) + '</p>' +
        '<p class="ema-note">' + (zh
          ? '这些线只是把这一段高低点分成参考区。价格可以停、可以穿、也可以不来。止损要自己放。'
          : 'These lines only split this swing into reference zones. Price can pause, pass through, or never arrive. You place the stop yourself.') + '</p></div>';
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
        } else if (act === 'demo') {
          state.dir = 'up';
          state.mode = 'retrace';
          state.shown = data.bars.length;
          state.a = { index: data.lowAt, price: data.bars[data.lowAt].l };
          state.b = { index: data.highAt, price: data.bars[data.highAt].h };
          state.note = zh ? '示范：从这段低点拖到高点。线只是参考，价格不必在这里弹回去。' : 'Example: drag from this low to this high. The lines are only a reference. Price does not have to bounce here.';
          state.tone = '';
        }
        paint();
        return;
      }
      if (state.skipClick) { state.skipClick = false; return; }
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
    if (root._fibPtr) {
      root.removeEventListener('pointerdown', root._fibPtr);
      root.removeEventListener('pointermove', root._fibPtr);
      root.removeEventListener('pointerup', root._fibPtr);
    }
    var fibFrame = 0;
    function schedulePaint() {
      if (fibFrame) return;
      fibFrame = requestAnimationFrame(function () {
        fibFrame = 0;
        if (!root.isConnected) return;
        paint();
      });
    }
    function pointFrom(ev) {
      var svg = root.querySelector('svg');
      if (!svg) return null;
      var rect = svg.getBoundingClientRect();
      var px = ((ev.clientX - rect.left) / Math.max(rect.width, 1)) * 980;
      var py = ((ev.clientY - rect.top) / Math.max(rect.height, 1)) * 420;
      var slot = (980 - 12 - 108) / Math.max(state.shown, 1);
      var index = Math.max(0, Math.min(state.shown - 1, Math.floor((px - 12) / slot)));
      var bar = data.bars[index];
      var vals = [];
      var i;
      for (i = 0; i < state.shown; i++) vals.push(data.bars[i].h, data.bars[i].l);
      var lo = Math.min.apply(null, vals);
      var hi = Math.max.apply(null, vals);
      var span = hi - lo || 1;
      lo -= span * 0.08;
      hi += span * 0.08;
      function yOf(price) { return 16 + (hi - price) / (hi - lo) * 360; }
      function priceOf(pixel) { return hi - (pixel - 16) / 360 * (hi - lo); }
      var raw = priceOf(py);
      var pick = bar.h;
      var best = Math.abs(py - yOf(bar.h));
      if (Math.abs(py - yOf(bar.l)) < best) { pick = bar.l; best = Math.abs(py - yOf(bar.l)); }
      if (best <= 16) return { index: index, price: pick, t: bar.t };
      return { index: index, price: Math.round(raw * 100) / 100, t: bar.t };
    }
    function follow(which, point) {
      if (!point) return;
      if (which === 'a') state.a = point;
      else state.b = point;
      if (state.a && state.b) state.dir = state.b.price >= state.a.price ? 'up' : 'down';
    }
    root._fibPtr = function (ev) {
      if (ev.type === 'pointerdown') {
        if (ev.target.closest && ev.target.closest('button, a, input, label')) return;
        var handle = ev.target.closest ? ev.target.closest('[data-handle]') : null;
        var onChart = ev.target.closest ? ev.target.closest('svg') : null;
        if (!handle && !onChart) return;
        stop();
        state.skipClick = true;
        state.moved = false;
        if (handle) {
          state.gesture = handle.getAttribute('data-handle');
        } else if (state.a && !state.b) {
          state.gesture = 'b';
          state.fresh = false;
          follow('b', pointFrom(ev));
        } else {
          state.gesture = 'b';
          state.fresh = true;
          state.a = pointFrom(ev);
          state.b = { index: state.a.index, price: state.a.price, t: state.a.t };
        }
        try { root.setPointerCapture(ev.pointerId); } catch (err) {}
        schedulePaint();
        return;
      }
      if (ev.type === 'pointermove') {
        if (!state.gesture) return;
        state.moved = true;
        follow(state.gesture, pointFrom(ev));
        state.note = zh ? '线跟着光标走。松开就定住。' : 'The lines follow the cursor. They lock when you let go.';
        schedulePaint();
        return;
      }
      if (ev.type !== 'pointerup' || !state.gesture) return;
      if (state.fresh && !state.moved) state.b = null;
      state.gesture = null;
      state.fresh = false;
      if (state.a && state.b) state.note = zh ? '线定住了。可以再拖两端，或按重画。' : 'The lines are locked. Drag either end, or press Redraw.';
      try { root.releasePointerCapture(ev.pointerId); } catch (err2) {}
      schedulePaint();
    };
    root.addEventListener('pointerdown', root._fibPtr);
    root.addEventListener('pointermove', root._fibPtr);
    root.addEventListener('pointerup', root._fibPtr);
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

/* SMC lesson chart. Rules and drawing live here, not in the lab. */
(function (global) {
  function mix(n) {
    var x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
    x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
    return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
  }
  function candle(open, close, i) {
    var body = Math.abs(close - open);
    var high = Math.max(open, close) + body * (0.35 + mix(i + 2) * 0.8) + Math.abs(close) * 0.0011;
    var low = Math.min(open, close) - body * (0.35 + mix(i + 8) * 0.8) - Math.abs(close) * 0.001;
    return { t: i, o: Math.round(open * 100) / 100, h: Math.round(high * 100) / 100, l: Math.round(low * 100) / 100, c: Math.round(close * 100) / 100, v: 40 };
  }
  function tape() {
    var bars = [];
    function put(o, h, l, c) {
      bars.push({
        t: bars.length,
        o: Math.round(o),
        h: Math.round(Math.max(h, o, c)),
        l: Math.round(Math.min(l, o, c)),
        c: Math.round(c),
        v: 80
      });
    }
    function step(close) {
      var open = bars.length ? bars[bars.length - 1].c : close - 80;
      var up = close >= open;
      put(open, Math.max(open, close) + (up ? 55 : 18), Math.min(open, close) - (up ? 28 : 62), close);
    }
    var i;
    var price = 58200;
    for (i = 0; i < 10; i++) { price += 220; step(price); }
    for (i = 0; i < 4; i++) { price -= 140; step(price); }
    put(60840, 61320, 60680, 61140);
    put(61220, 64680, 61160, 64240);
    put(64180, 65240, 63480, 64920);
    price = 64920;
    for (i = 0; i < 3; i++) { price += 140; step(price); }
    for (i = 0; i < 8; i++) { price -= 280; step(price); }
    for (i = 0; i < 5; i++) { price += 240; step(price); }
    for (i = 0; i < 3; i++) { price -= 150; step(price); }
    for (i = 0; i < 3; i++) { price += 180; step(price); }
    put(price, price + 70, price - 210, price - 160);
    put(price - 160, price - 80, price - 980, price - 860);
    put(price - 860, price - 760, price - 1320, price - 1180);
    price = bars[bars.length - 1].c;
    for (i = 0; i < 3; i++) { price -= 80; step(price); }
    return bars;
  }
  function swings(bars) {
    var highs = [];
    var lows = [];
    var i;
    var k;
    for (i = 2; i < bars.length - 2; i++) {
      var hi = true;
      var lo = true;
      for (k = 1; k <= 2; k++) {
        if (bars[i].h <= bars[i - k].h || bars[i].h <= bars[i + k].h) hi = false;
        if (bars[i].l >= bars[i - k].l || bars[i].l >= bars[i + k].l) lo = false;
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
    var usedHigh = -1;
    var usedLow = -1;
    var i;
    function latest(list, before) {
      var found = null;
      list.forEach(function (index) { if (index < before) found = index; });
      return found;
    }
    for (i = 1; i < bars.length; i++) {
      var high = latest(sw.highs, i);
      var low = latest(sw.lows, i);
      var close = bars[i].c;
      var prev = bars[i - 1].c;
      var breakHigh = high != null && high !== usedHigh && prev <= bars[high].h && close > bars[high].h;
      var breakLow = low != null && low !== usedLow && prev >= bars[low].l && close < bars[low].l;
      if (breakHigh && trend !== -1) {
        bos.push({ i: i, price: bars[high].h, from: high, dir: 'up' });
        usedHigh = high;
        trend = 1;
      } else if (breakLow && trend !== 1) {
        bos.push({ i: i, price: bars[low].l, from: low, dir: 'down' });
        usedLow = low;
        trend = -1;
      } else if (breakLow && trend === 1) {
        choch.push({ i: i, price: bars[low].l, from: low, dir: 'down' });
        usedLow = low;
        trend = -1;
      } else if (breakHigh && trend === -1) {
        choch.push({ i: i, price: bars[high].h, from: high, dir: 'up' });
        usedHigh = high;
        trend = 1;
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
    return { bos: bos, choch: choch, sweeps: sweeps, fvgs: fvgs, obs: obs };
  }
  function fvgExample() {
    return { low: 103, high: 106 };
  }
  function mount(root, lesson, lang) {
    var zh = lang !== 'en';
    var bars = tape();
    var state = { shown: bars.length, playing: false, structure: true, fvg: true, note: '', tone: '' };
    if (root._smcTimer) clearInterval(root._smcTimer);
    function stop() { state.playing = false; if (root._smcTimer) clearInterval(root._smcTimer); root._smcTimer = null; }
    function view() {
      var series = bars.slice(0, state.shown);
      var info = read(series);
      return {
        bos: info.bos,
        choch: info.choch,
        fvgs: info.fvgs.filter(function (zone) {
          var mid = series[zone.i - 1];
          return mid && (zone.high - zone.low) > 800 && Math.abs(mid.c - mid.o) > 1500;
        })
      };
    }
    function paint() {
      var draw = bars.slice(0, state.shown);
      var info = view();
      var w = 980;
      var h = 460;
      var padL = 12;
      var padR = 16;
      var top = 28;
      var plotH = 390;
      var vals = [];
      draw.forEach(function (bar) { vals.push(bar.h, bar.l); });
      info.fvgs.forEach(function (zone) { vals.push(zone.low, zone.high); });
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = max - min || 1;
      min -= span * 0.06;
      max += span * 0.08;
      function y(p) { return top + (max - p) / (max - min) * plotH; }
      var slot = (w - padL - padR) / Math.max(draw.length, 1);
      function xAt(i) { return padL + i * slot + slot / 2; }
      var bits = ['<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">'];
      bits.push('<rect width="' + w + '" height="' + h + '" fill="#120e21"></rect>');
      if (state.fvg) info.fvgs.forEach(function (zone) {
        var y1 = y(zone.high);
        var y2 = y(zone.low);
        var end = draw.length - 1;
        var j;
        for (j = zone.i + 1; j < draw.length; j++) {
          if (zone.dir === 'up' && draw[j].l <= zone.low) { end = j; break; }
          if (zone.dir === 'down' && draw[j].h >= zone.high) { end = j; break; }
        }
        var x1 = xAt(Math.max(0, zone.i - 1));
        var x2 = Math.max(x1 + slot * 3, xAt(end));
        var bull = zone.dir === 'up';
        var fill = bull ? '#3aab88' : '#c16b78';
        var ink = bull ? '#8bd5ba' : '#e6a1a9';
        bits.push('<rect x="' + x1 + '" y="' + Math.min(y1, y2) + '" width="' + (x2 - x1) + '" height="' + Math.max(2, Math.abs(y2 - y1)) + '" rx="2" fill="' + fill + '" fill-opacity="0.22" stroke="' + fill + '" stroke-opacity="0.6" stroke-width="1"></rect>');
        bits.push('<text x="' + (x1 + 8) + '" y="' + (Math.min(y1, y2) + 14) + '" fill="' + ink + '" font-size="11" font-weight="700">FVG</text>');
      });
      draw.forEach(function (bar, i) {
        var up = bar.c >= bar.o;
        var color = up ? '#1f8a4d' : '#d4534e';
        var xc = xAt(i);
        var bw = Math.max(1.8, slot * 0.62);
        bits.push('<line x1="' + xc + '" y1="' + y(bar.h) + '" x2="' + xc + '" y2="' + y(bar.l) + '" stroke="' + color + '"></line>');
        bits.push('<rect x="' + (xc - bw / 2) + '" y="' + Math.min(y(bar.o), y(bar.c)) + '" width="' + bw + '" height="' + Math.max(1.2, Math.abs(y(bar.c) - y(bar.o))) + '" fill="' + color + '"></rect>');
        if (i % 12 === 0) bits.push('<text x="' + xc + '" y="448" fill="#b7aac8" font-size="12">' + (zh ? '第' + (i + 1) + '根' : '#' + (i + 1)) + '</text>');
      });
      function mark(item, name, color, dash) {
        var yy = y(item.price);
        var x1 = xAt(item.from);
        var x2 = xAt(item.i);
        bits.push('<line x1="' + x1 + '" y1="' + yy + '" x2="' + x2 + '" y2="' + yy + '" stroke="' + color + '" stroke-width="1.5"' + (dash ? ' stroke-dasharray="5 3"' : '') + '></line>');
        var lx = Math.max(padL + 36, Math.min(w - 46, (x1 + x2) / 2));
        var ly = dash ? Math.min(top + plotH - 6, yy + 14) : Math.max(top + 14, yy - 8);
        var anchor = lx > w - 70 ? 'end' : 'middle';
        if (anchor === 'end') lx = w - 10;
        bits.push('<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '" fill="' + color + '" font-size="12" font-weight="700">' + name + '</text>');
      }
      if (state.structure) {
        info.bos.forEach(function (item) { mark(item, 'BOS', '#748ca8', false); });
        info.choch.forEach(function (item) { mark(item, 'CHoCH', '#b28b58', true); });
      }
      bits.push('</svg>');
      var note = zh ? '标签跟着已经走出来的 K 线出现。它不保证下一根。' : 'The marks show up on candles that have already printed. They do not promise the next one.';
      root.innerHTML =
        '<div class="a1"><p class="a1-flag">' + (zh ? '模拟行情·非实时' : 'Simulated tape · not live') + '</p>' +
        '<p>' + (zh ? 'BOS、CHoCH 和 FVG 是指标自动标在 K 线上的。' : 'BOS, CHoCH, and FVG are marked on the candles by the indicator.') + '</p>' +
        '<p class="a1-checks"><label><input type="checkbox" data-layer="structure"' + (state.structure ? ' checked' : '') + '> BOS / CHoCH</label> <label><input type="checkbox" data-layer="fvg"' + (state.fvg ? ' checked' : '') + '> FVG</label></p>' +
        '<div class="smc-scroll">' + bits.join('') + '</div>' +
        '<p class="star-key"><span style="color:#748ca8">BOS</span><span style="color:#b28b58">CHoCH</span><span style="color:#8bd5ba">FVG</span></p>' +
        '<div class="a1-modes"><button type="button" data-move="play">' + (state.playing ? (zh ? '暂停' : 'Pause') : (zh ? '播放' : 'Play')) + '</button><button type="button" data-move="reset">' + (zh ? '重新开始' : 'Start again') + '</button><span>' + state.shown + ' / ' + bars.length + '</span></div>' +
        '<p class="a2-readout">' + note + '</p></div>';
    }
    if (root._smcClick) root.removeEventListener('click', root._smcClick);
    root._smcClick = function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-move]') : null;
      if (!el || !root.contains(el)) return;
      var move = el.getAttribute('data-move');
      if (move === 'play') {
        if (state.playing) { stop(); paint(); return; }
        if (state.shown >= bars.length) state.shown = 12;
        state.playing = true;
        root._smcTimer = setInterval(function () {
          if (!root.isConnected || state.shown >= bars.length) { stop(); paint(); return; }
          state.shown += 1;
          paint();
        }, 280);
        paint();
        return;
      }
      stop();
      state.shown = 12;
      paint();
    };
    root.addEventListener('click', root._smcClick);
    if (root._smcChange) root.removeEventListener('change', root._smcChange);
    root._smcChange = function (ev) {
      var box = ev.target;
      if (!box || !box.getAttribute || !root.contains(box)) return;
      var layer = box.getAttribute('data-layer');
      if (!layer) return;
      state[layer] = box.checked;
      paint();
    };
    root.addEventListener('change', root._smcChange);
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
  global.STAR_CH02_SMC = { read: read, tape: tape, fvgExample: fvgExample, mount: mount };
})(typeof window !== 'undefined' ? window : global);
