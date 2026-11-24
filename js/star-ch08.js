(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['08'] = {
    title: bi('交易心理与复盘', 'Trading psychology and review'),
    lessons: [
      lesson({
        id: '01', title: bi('FOMO：怕错过时先看计划', 'FOMO: when you fear missing out, look at the plan first'),
        scene: bi('价格很快从 100 到了 120。现在去追，通常买在哪？', 'Price went quickly from 100 to 120. If you chase now, where are you usually buying?'),
        one: bi('直线拉升时去追，常常买在这一段的后部，后面可以再冲，也常常先回一截。', 'When you chase a straight rise you often buy the late part of that stretch, it can push again afterward, and it often pulls back a notch first.'),
        explain: bi('怕错过而想马上买，就是 FOMO。\n先看自己的计划条件满不满足，不看别人已经赚了多少。\n晚到的追价，常见是连续几根大阳线、资金费率很高、未平仓量冲上去、成交量突然放大。\n教学模拟：价格已经很快走出 100、105、112、120。\n这只说明已经涨过，不说明 120 自动满足你的条件。', 'Wanting to buy at once because you fear missing out is FOMO.\nFirst see whether your own plan condition is met, not how much someone else already made.\nA late chase often shows up as several big green candles in a row, a very high funding rate, an open-interest spike, and a sudden jump in volume.\nTeaching simulation: price has already gone quickly through 100, 105, 112, 120.\nThat only says it already rose, and it does not say 120 automatically meets your condition.'),
        topic: {
          title: bi('这种心态出现时，价格往往在哪里', 'When this mood shows up, where price often is'),
          body: bi('连续几根大阳线再去追，常常买在这一段的后部。\n资金费率已经很高，多头拥挤，再追常常是接在后面。\n未平仓量冲上去、成交量突然放大，说明这一下人很多，不是刚开始。\n后面常见的是先回一截或横住，而不是立刻再走一根一样陡的线。\n群里都在喊再不买就没了时，往往已经不早了。\n计划若要求回撤或确认，120 可以只是看着，不做。\n强趋势可以继续到 125、130，不追也会错过后面一截。', 'Chasing after several big green candles in a row often buys the late part of that stretch.\nWhen funding is already very high and longs are crowded, another chase often arrives late.\nAn open-interest spike plus a sudden jump in volume means this move already has a crowd, and it is not the start.\nWhat is common next is a pullback first or a chop, not another line just as steep right away.\nWhen the group is shouting that it will be gone if you do not buy, it is often already late.\nIf the plan asks for a pullback or a confirmation, 120 can be something you only watch, and do not trade.\nA strong trend can continue to 125 or 130, and not chasing can also miss a later stretch.')
        },
        example: bi('教学模拟：聊天里说再不买就没了，这是情绪。\n120 之后可以再到 130，也可以跌到 110 或 95。\n两条都可能，所以不交易也可以是按计划留下的结果。', 'Teaching simulation: a chat line that says it will be gone if you do not buy is emotion.\nAfter 120 it can go on to 130, or fall to 110 or 95.\nBoth are possible, so no trade can also be the result left by following the plan.'),
        pitfalls: [
          bi('用别人的盈利代替自己的条件', 'Replacing your own conditions with someone else’s profit'),
          bi('费率很高还当成趋势刚开始', 'Treating a very high funding rate as the start of the trend')
        ],
        practice: bi('看到连续大阳线时，顺手看资金费率、未平仓量和成交量是不是一起冲。', 'When you see several big green candles in a row, check whether funding, open interest, and volume are spiking together.'),
        check: {
          ask: bi('连续几根大阳线，资金费率很高，未平仓量和成交量一起冲，这时去追更常见的是？', 'Several big green candles in a row, funding is very high, and open interest and volume spike together, and if you chase now, what is more common?'),
          options: [
            opt('A', '费率高说明多头还能续，通常要追', 'High funding means longs can continue, so you usually chase'),
            opt('B', '未平仓量一冲，越早越安全', 'Once open interest spikes, earlier is safer'),
            opt('C', '放量上涨就是趋势刚开始', 'A volume jump means the trend is just starting'),
            opt('D', '常常买在这一段的后部', 'You often buy the late part of this stretch')
          ],
          answer: 'D',
          note: bi('大阳线、高费率、持仓和成交量一起冲的时候，追常常买在后部。', 'When big green candles, high funding, open interest, and volume spike together, a chase often buys the late part.'),
          miss: bi('大阳线、高费率、持仓和成交量一起冲的时候，追常常买在后部。', 'When big green candles, high funding, open interest, and volume spike together, a chase often buys the late part.')
        },
        quizzes: [
          quiz('计划要求等回撤，价格停在 120 没有回，该怎么做？', 'The plan asks you to wait for a pullback, and price is sitting at 120 with no pullback, what should you do?', [
            opt('A', '不做，120 还没满足计划', 'Do not trade, because 120 has not met the plan'),
            opt('B', '成交量一大就改成立刻追', 'If volume jumps you switch to chasing at once'),
            opt('C', '群里喊得越大越接近条件', 'The louder the group, the closer it is to the condition'),
            opt('D', '费率不高就可以把 120 当回撤', 'If funding is not high you can treat 120 as the pullback')
          ], 'A', {
            A: ['没有回撤，120 还没满足计划，就不做。', 'With no pullback, 120 has not met the plan, so you do not trade.'],
            B: ['成交量放大常常是晚，不是把计划改成追。', 'A volume jump is often late, not a reason to rewrite the plan into a chase.'],
            C: ['喊得更大通常更晚，不是条件。', 'Louder shouting is usually later, not the condition.'],
            D: ['回撤不是用费率低来代替的。', 'A pullback is not replaced by low funding.']
          }),
          quiz('很直的上涨后面继续到 130，这说明什么？', 'A very straight rise continues to 130, what does that say?', [
            opt('A', '到 130 说明当时的计划条件已经满足', 'Reaching 130 means the plan condition was already met'),
            opt('B', '强趋势可以继续，回落不是必来的', 'A strong trend can continue, and a pullback is not guaranteed'),
            opt('C', '120 因此变成计划里的起涨点', '120 therefore becomes the start in the plan'),
            opt('D', '继续涨说明费率不高', 'Continuing up means funding is not high')
          ], 'B', {
            A: ['后来到了 130，不能倒回去说当时计划条件已经满足。', 'Reaching 130 later does not go back and say the plan condition was already met.'],
            B: ['可以继续到 130，所以回落不是必来的，不追也会错过。', 'It can continue to 130, so a pullback is not guaranteed, and not chasing can miss it.'],
            C: ['继续涨不把 120 改成计划里的起涨点。', 'Continuing up does not turn 120 into the start in the plan.'],
            D: ['继续涨不能说明费率不高。', 'Continuing up does not mean funding is not high.']
          }),
          quiz('群里都在喊再不买就没了，价格已经走出 100 到 120，这时更常见的位置是？', 'The group is all shouting that it will be gone if you do not buy, and price has already gone from 100 to 120, where are you more often standing?', [
            opt('A', '喊得越齐，通常越接近刚开始', 'The more the group agrees, the closer it usually is to the start'),
            opt('B', '群里一齐喊，就是计划里的条件', 'The group shouting together is the condition in the plan'),
            opt('C', '往往已经不早，可以只看着不做', 'It is often already late, and you can only watch and not trade'),
            opt('D', '到了 120 就必须把这一笔补上', 'Once it is at 120 you have to add this trade')
          ], 'C', {
            A: ['喊得越齐常常越晚，不是刚开始。', 'The more the group agrees, the later it often is, and it is not the start.'],
            B: ['别人的喊声不是你计划里的条件。', 'Other people’s shouting is not the condition in your plan.'],
            C: ['群里都在喊再不买就没了，往往已经不早，120 可以只看着。', 'When the group is shouting that it will be gone if you do not buy, it is often already late, and 120 can be something you only watch.'],
            D: ['走出 100 到 120，不是必须补上这一笔。', 'Having gone from 100 to 120 is not a requirement to add this trade.']
          })
        ],
        study: { kind: 'levels', closes: [100, 105, 112, 120], levels: [{ price: 120, label: '120' }], caption: bi('已发生：100 → 105 → 112 → 120。后面分支未展示。', 'Already printed: 100 → 105 → 112 → 120. Later branches are not shown.'), start: 4 }
      }),
      lesson({
        id: '02', title: bi('亏损厌恶与报复性交易', 'Loss aversion and revenge trading'),
        scene: bi('亏了一笔就加大风险，后面账户通常怎么掉？', 'You raise the risk after one loss, how does the account usually fall next?'),
        one: bi('亏了一笔就加大风险去翻本，下一笔再亏时掉得更快，钱通常不会因此马上回来。', 'Raising the risk after a loss to win it back makes the next loss fall faster, and the money usually does not come back right away because of that.'),
        explain: bi('亏了以后最想马上赚回来。\n把下一笔的风险加大，亏的时候掉得更快。\n一次比一次加大，剩下的更少，不是赚回来了。', 'After a loss, the strongest urge is to earn it back at once.\nRaising the risk of the next trade makes the fall faster when you lose.\nMaking each loss larger than the last leaves less, and it is not earned back.'),
        topic: {
          title: bi('亏了想翻本时，账户通常怎么掉', 'When you want the loss back, how the account usually falls'),
          body: bi('刚亏完就加大，下一笔再亏是常见的，不是少见的。\n价格不会因为你想翻本，就走出相反的方向。\n一次比一次加大，剩下的更少。\n先停一下，是为了打断这一下，不是保证下一笔会赚。\n暂停是风控，不是认输。\n加大之后下一笔也可能赚，于是更敢再加，直到一次大亏把赚回来的吐出去。', 'Right after a loss, sizing up and then losing again is common, not rare.\nPrice does not walk the other way just because you want the money back.\nMaking each loss larger than the last leaves less.\nPausing first is to interrupt that moment, not to guarantee the next trade wins.\nA pause is risk control, not giving up.\nThe next trade after sizing up can also win, which makes another increase easier, until one large loss gives back what was earned back.')
        },
        example: bi('教学模拟：三次都亏剩余的 1%，大约剩 970。\n改成 1%，再 2%，再 4%，大约剩 931。\n加大并没有把钱赚回来。', 'Teaching simulation: three losses of 1% of what remains leave about 970.\nChanging it to 1%, then 2%, then 4% leaves about 931.\nSizing up did not earn the money back.'),
        pitfalls: [
          bi('亏了就加大风险想回本', 'Sizing up after a loss to get it back'),
          bi('把暂停当成认输', 'Treating a pause as giving up')
        ],
        practice: bi('刚亏完手想加大时，先记住按 1%、2%、4% 会比每次 1% 掉得更多。', 'When you want to size up right after a loss, remember that 1%, then 2%, then 4% drops more than 1% each time.'),
        check: {
          ask: bi('刚亏完手想马上加大，更稳的一步是？', 'Right after a loss you want to size up at once, what is the steadier next step?'),
          options: [
            opt('A', '先加大，下一笔通常能赚回来', 'Size up first, because the next trade usually earns it back'),
            opt('B', '先停一下，打断这一下', 'Pause first, and interrupt this moment'),
            opt('C', '价格会替你反向，所以马上做', 'Price will reverse for you, so trade at once'),
            opt('D', '停一下就是认输，所以不能停', 'A pause is giving up, so you cannot pause')
          ],
          answer: 'B',
          note: bi('先停一下是打断这一下，暂停是风控，不是认输。', 'Pausing first interrupts this moment, and a pause is risk control, not giving up.'),
          miss: bi('先停一下是打断这一下，暂停是风控，不是认输。', 'Pausing first interrupts this moment, and a pause is risk control, not giving up.')
        },
        quizzes: [
          quiz('刚亏完把风险加大，下一笔又亏了，账户通常怎样？', 'You size up right after a loss, and the next trade loses too, what does the account usually do?', [
            opt('A', '停一下和加大掉得一样快', 'A pause and a larger size fall equally fast'),
            opt('B', '加大以后通常下一笔会赚回来', 'After sizing up the next trade usually earns it back'),
            opt('C', '掉得比按原来的小比例再亏更快', 'It falls faster than another loss at the old small rate'),
            opt('D', '价格会因为你想翻本而反向', 'Price reverses because you want the money back')
          ], 'C', {
            A: ['停一下是少做一笔，不是和加大掉得一样快。', 'A pause is skipping a trade, not falling as fast as the larger size.'],
            B: ['加大不会让下一笔通常赚回来。', 'Sizing up does not make the next trade usually earn it back.'],
            C: ['风险加大后再亏，掉得比原来的小比例更快。', 'A loss after the risk is raised falls faster than the old small rate.'],
            D: ['价格不因为你想翻本就反向。', 'Price does not reverse just because you want the money back.']
          }),
          quiz('刚亏完，计划写了今天到此为止，手还想再做一笔翻本，该怎么做？', 'Right after a loss, the plan says stop for the day, and you still want another trade to win it back, what should you do?', [
            opt('A', '计划可以改成再做一笔小的', 'The plan can be rewritten into one more small trade'),
            opt('B', '再做一笔通常就能把亏损补上', 'One more trade usually covers the loss'),
            opt('C', '先停，按计划今天不再做', 'Stop first, and do not trade again today, as the plan says'),
            opt('D', '停一天等于认输，所以要继续', 'Stopping for a day is giving up, so you continue')
          ], 'C', {
            A: ['写了今天到此为止，就不是再改成一笔小的。', 'If the plan says stop for the day, it is not rewritten into one more small trade.'],
            B: ['再做一笔不是把亏损补上的常见结果。', 'One more trade is not the common way the loss gets covered.'],
            C: ['计划写了今天到此为止，就先停，今天不再做。', 'If the plan says stop for the day, you stop, and you do not trade again today.'],
            D: ['停一天是风控，不是认输。', 'Stopping for a day is risk control, not giving up.']
          }),
          quiz('加大之后下一笔碰巧赚了，通常接着会怎样？', 'After sizing up, the next trade happens to win, what usually follows?', [
            opt('A', '赚一次就说明加大是对的，可以固定下来', 'One win means sizing up was right, so you can keep it'),
            opt('B', '这次赚的通常够补上 1%、2%、4% 那条差额', 'This win usually covers the gap on the 1%, 2%, 4% path'),
            opt('C', '风险会自己缩回原来的 1%', 'The risk shrinks itself back to the old 1%'),
            opt('D', '更容易再加，直到一次大亏把赚回来的吐出去', 'It gets easier to size up again, until one large loss gives back what was earned back')
          ], 'D', {
            A: ['碰巧赚一次，不能把加大固定下来。', 'One lucky win cannot lock the larger size in place.'],
            B: ['一次碰巧的赚，不是用来补 1%、2%、4% 那条差额的方法。', 'One lucky win is not a method for covering the gap on the 1%, 2%, 4% path.'],
            C: ['风险不会因为赚了就自己缩回 1%。', 'The risk does not shrink itself back to 1% because you won.'],
            D: ['碰巧赚了会让人更敢再加，直到一次大亏吐回去。', 'A lucky win makes another increase easier, until one large loss gives it back.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('从 1000 起，每次亏剩余的 1%，三次后大约剩 970。', 'Start at 1000, lose 1% of what remains each time, and after three times about 970 is left.'),
          bi('先亏 1%，再亏 2%，再亏 4%，大约剩 931。', 'Lose 1% first, then 2%, then 4%, and about 931 is left.')
        ] }
      }),
      lesson({
        id: '03', title: bi('复盘闭环：过程与结果分开看', 'A review loop: separate process from outcome'),
        scene: bi('违规却赚了，这笔该怎么记？', 'You broke the rule and made money, how should this trade be written down?'),
        one: bi('复盘先把每笔分成按计划和没按计划，违规却赚了的先标成没守规矩，再看看有没有值得参考的地方。', 'A review first sorts each trade into followed the plan or did not, and a win that broke the rule is marked as a broken rule first, then checked for anything worth learning from.'),
        explain: bi('每笔记成四格：按计划赚、按计划亏、违规赚、违规亏。\n赚钱只说明结果，不说明这次守没守规矩。\n教学模拟的十笔里，赢 5 笔亏 5 笔，有 4 笔没按计划。\n这 50% 不是以后的胜率。\n违规却赚了，先标成没守规矩。', 'Put each trade in one of four cells: followed the plan and made money, followed the plan and lost, broke the rule and made money, broke the rule and lost.\nMaking money only describes the outcome, and it does not say whether this trade kept the rule.\nIn the ten-trade teaching set, 5 wins and 5 losses, and 4 did not follow the plan.\nThat 50% is not the future win rate.\nA win that broke the rule is marked as a broken rule first.'),
        topic: {
          title: bi('复盘时，先标没守规矩，再看有没有可学的', 'In a review, mark the broken rule first, then see if anything is worth learning'),
          body: bi('违规却赚钱，先标成没守规矩。\n只因为赚了就放过，后面常常再犯一次。\n恐慌把仓位砸在一段急跌的低点附近，价格常常先反弹一截。\n怕错过追在一段急涨的高点，价格常常先回一截。\n按计划做了但亏了，做法可以是对的，不要为了翻本改做法。\n恐慌的低点也可以继续跌，追高的位置也可以再涨。\n十笔样本只能看你自己的毛病，不能写成以后也会五五开。', 'A win that broke the rule is marked as a broken rule first.\nLetting it pass only because it made money often leads to doing it again.\nPanic selling near the low of a fast drop is often followed by a bounce first.\nChasing the high of a fast rise from fear of missing out is often followed by a pullback first.\nA loss that followed the plan can still be the right way to do it, so do not change the way to win the money back.\nThe panic low can also keep falling, and the chase high can also keep rising.\nTen trades can only show your own weaknesses, and they cannot be written as a future that also splits half and half.')
        },
        example: bi('教学模拟：十笔合计赚 50，胜率 50%，其中 4 笔没按计划。\n没按计划却赚钱的那几笔，先标成没守规矩。\n标完再看这笔，而不是因为赚了就放过。', 'Teaching simulation: ten trades made 50 in total, the win rate is 50%, and 4 did not follow the plan.\nThe ones that made money without following the plan are marked as a broken rule first.\nAfter the mark, look at this trade again, instead of letting it pass because it made money.'),
        pitfalls: [
          bi('用盈利把没守规矩的单放过', 'Letting a broken rule pass because it made money'),
          bi('按计划亏了就改做法去翻本', 'Changing the way you trade after a loss that followed the plan, just to win it back')
        ],
        practice: bi('先把没按计划的单标出来，再单独看这一小段。', 'First mark the trades that did not follow the plan, then look at this small stretch on its own.'),
        check: {
          ask: bi('违规却赚了钱，这笔该怎么记？', 'You broke the rule and made money, how should this trade be written down?'),
          options: [
            opt('A', '先标成没守规矩，再看有没有值得参考的地方', 'Mark it as a broken rule first, then see if anything is worth learning from'),
            opt('B', '先看赚了多少，规矩以后再补', 'Look at the profit first, and add the rule later'),
            opt('C', '赚了就可以放过', 'A win can be let go'),
            opt('D', '标成没守规矩以后，就不用再看这笔', 'Once it is marked as a broken rule, you do not look at this trade again')
          ],
          answer: 'A',
          note: bi('违规却赚了，先标成没守规矩。', 'A win that broke the rule is marked as a broken rule first.'),
          miss: bi('违规却赚了，先标成没守规矩。', 'A win that broke the rule is marked as a broken rule first.')
        },
        quizzes: [
          quiz('一段急跌里，恐慌把仓位砸在低点附近，后面更常见的是？', 'In a fast drop, panic sells the position near the low, what is more common next?', [
            opt('A', '砸在低点通常还会再跌一截', 'A sale at the low usually drops another notch'),
            opt('B', '这算按计划，因为躲开了更低', 'This counts as following the plan, because it avoided a lower price'),
            opt('C', '低点附近的卖出通常是这一轮的底', 'A sale near the low is usually the bottom of this cycle'),
            opt('D', '常常先反弹一截，也可以继续跌', 'It often bounces a notch first, and it can also keep falling')
          ], 'D', {
            A: ['砸在低点附近，后面常常先反弹，不是通常再跌一截。', 'A sale near the low is often followed by a bounce first, not usually another drop.'],
            B: ['恐慌卖出不是按计划。', 'Panic selling is not following the plan.'],
            C: ['先反弹不是这一轮的底已经确认。', 'A bounce first is not a confirmed bottom for this cycle.'],
            D: ['恐慌砸在急跌低点附近，后面常常先反弹一截，低点也可以继续跌。', 'Panic selling near the low of a fast drop is often followed by a bounce first, and the low can also keep falling.']
          }),
          quiz('按计划做了但亏了，该怎么看？', 'You followed the plan and lost, how should you read it?', [
            opt('A', '亏了就说明计划该改', 'A loss means the plan should be changed'),
            opt('B', '做法可以是对的，不要为了翻本改做法', 'The way can still be right, so do not change it to win the money back'),
            opt('C', '低点卖出才算按计划', 'Only a sale at the low counts as following the plan'),
            opt('D', '和违规却赚了是同一类', 'It is the same kind as a win that broke the rule')
          ], 'B', {
            A: ['一次按计划的亏损，不是把计划改掉的理由。', 'One loss that followed the plan is not a reason to rewrite the plan.'],
            B: ['做法可以是对的，结果可以是亏的，不要为了翻本改做法。', 'The way can still be right, and the outcome can still be a loss, so do not change the way to win the money back.'],
            C: ['按计划不是专指卖在低点。', 'Following the plan does not mean only selling at the low.'],
            D: ['按计划亏了，和没守规矩却赚了，要分开放。', 'A loss that followed the plan, and a win that broke the rule, go in different cells.']
          }),
          quiz('这十笔里有 4 笔没按计划，50% 的胜率该怎么用？', 'Four of these ten trades did not follow the plan, how should the 50% win rate be used?', [
            opt('A', '写成以后也会五五开', 'Write it down as a future that also splits half and half'),
            opt('B', '只看赚的 5 笔，4 笔可以先拿掉', 'Look only at the 5 winners, and set the 4 aside first'),
            opt('C', '只说明这一小段，不外推', 'It only describes this small stretch, and you do not extrapolate'),
            opt('D', '样本这么小，通常说明计划已经失败', 'A sample this small usually means the plan has already failed')
          ], 'C', {
            A: ['十笔不是以后的分布。', 'Ten trades are not the future distribution.'],
            B: ['拿掉没按计划的 4 笔，毛病就看不见了。', 'If you set aside the 4 that broke the plan, the weaknesses disappear.'],
            C: ['只说明这一小段，不外推成以后的胜率。', 'It only describes this small stretch, and you do not extrapolate it into a future win rate.'],
            D: ['样本小不是计划失败，它只是这一小段。', 'A small sample is not a failed plan, and it is only this small stretch.']
          })
        ],
        study: { kind: 'panel', headers: [bi('项目', 'Item'), bi('十笔教学记录', 'Ten-trade teaching record')], cells: [[bi('盈亏合计', 'Total PnL'), '+50'], [bi('赢 / 亏', 'Wins / losses'), '5 / 5'], [bi('胜率', 'Win rate'), '50%'], [bi('未按计划', 'Did not follow the plan'), bi('4 笔', '4 trades')]], rows: [
          bi('十笔合计赚 50，赢 5 笔亏 5 笔，4 笔没按计划。', 'Ten trades made 50 in total, 5 wins and 5 losses, and 4 did not follow the plan.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
