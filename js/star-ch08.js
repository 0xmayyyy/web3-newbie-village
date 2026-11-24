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
          bi('用别人的盈利代替自己的条件', 'Replacing your own conditions with someone else profit'),
          bi('费率很高还当成趋势刚开始', 'Treating a very high funding rate as the start of the trend')
        ],
        practice: bi('看到连续大阳线时，顺手看资金费率、未平仓量和成交量是不是一起冲。', 'When you see several big green candles in a row, check whether funding, open interest, and volume are spiking together.'),
        check: {
          ask: bi('连续几根大阳线，资金费率很高，未平仓量和成交量一起冲，这时去追更常见的是？', 'Several big green candles in a row, funding is very high, and open interest and volume spike together, and if you chase now, what is more common?'),
          options: [
            opt('A', '费率高说明多头还能续，通常要追', 'High funding means longs can continue, so you usually chase'),
            opt('B', '常常买在这一段的后部', 'You often buy the late part of this stretch'),
            opt('C', '放量上涨就是趋势刚开始', 'A volume jump means the trend is just starting'),
            opt('D', '未平仓量一冲，越早越安全', 'Once open interest spikes, earlier is safer')
          ],
          answer: 'B',
          note: bi('大阳线、高费率、持仓和成交量一起冲的时候，追常常买在后部。', 'When big green candles, high funding, open interest, and volume spike together, a chase often buys the late part.'),
          miss: bi('大阳线、高费率、持仓和成交量一起冲的时候，追常常买在后部。', 'When big green candles, high funding, open interest, and volume spike together, a chase often buys the late part.')
        },
        quizzes: [
          quiz('计划要求等回撤，价格停在 120 没有回，该怎么做？', 'The plan asks you to wait for a pullback, and price is sitting at 120 with no pullback, what should you do?', [
            opt('A', '费率不高就可以把 120 当回撤', 'If funding is not high you can treat 120 as the pullback'),
            opt('B', '成交量一大就改成立刻追', 'If volume jumps you switch to chasing at once'),
            opt('C', '群里喊得越大越接近条件', 'The louder the group, the closer it is to the condition'),
            opt('D', '不做，120 还没满足计划', 'Do not trade, because 120 has not met the plan')
          ], 'D', {
            A: ['回撤不是用费率低来代替的。', 'A pullback is not replaced by low funding.'],
            B: ['成交量放大常常是晚，不是把计划改成追。', 'A volume jump is often late, not a reason to rewrite the plan into a chase.'],
            C: ['喊得更大通常更晚，不是条件。', 'Louder shouting is usually later, not the condition.'],
            D: ['没有回撤，120 还没满足计划，就不做。', 'With no pullback, 120 has not met the plan, so you do not trade.']
          }),
          quiz('很直的上涨后面继续到 130，这说明什么？', 'A very straight rise continues to 130, what does that say?', [
            opt('A', '到 130 就证明刚才必须追', 'Reaching 130 proves you had to chase'),
            opt('B', '120 因此变成计划里的起涨点', '120 therefore becomes the start in the plan'),
            opt('C', '强趋势可以继续，回落不是必来的', 'A strong trend can continue, and a pullback is not guaranteed'),
            opt('D', '继续涨说明费率不高', 'Continuing up means funding is not high')
          ], 'C', {
            A: ['后来到了 130，不能倒回去说当时必须追。', 'Reaching 130 later does not go back and say you had to chase at the time.'],
            B: ['继续涨不把 120 改成计划里的起涨点。', 'Continuing up does not turn 120 into the start in the plan.'],
            C: ['可以继续到 130，所以回落不是必来的，不追也会错过。', 'It can continue to 130, so a pullback is not guaranteed, and not chasing can miss it.'],
            D: ['继续涨不能说明费率不高。', 'Continuing up does not mean funding is not high.']
          }),
          quiz('资金费率已经很高，又接了几根大阳线，怕错过就追，这更像什么？', 'Funding is already very high, several more big green candles print, and you chase because you fear missing out, what is this more like?', [
            opt('A', '晚到的追，常常买在后部', 'A late chase, and you often buy the late part'),
            opt('B', '费率高是趋势刚确认', 'High funding is the trend just being confirmed'),
            opt('C', '大阳线连续就是计划里的进场', 'A row of big green candles is the entry in the plan'),
            opt('D', '未平仓量还没冲，所以还早', 'Open interest has not spiked, so it is still early')
          ], 'A', {
            A: ['高费率再接大阳线还去追，常常买在这一段的后部。', 'Chasing after high funding and more big green candles often buys the late part of this stretch.'],
            B: ['费率很高常常是拥挤，不是刚确认。', 'Very high funding is often a crowd, not a fresh confirmation.'],
            C: ['连续大阳线不是计划条件本身。', 'A row of big green candles is not the plan condition itself.'],
            D: ['这一问没有说未平仓量没冲，不能据此说还早。', 'This question does not say open interest failed to spike, so you cannot call it early from that.']
          })
        ],
        study: { kind: 'levels', closes: [100, 105, 112, 120], levels: [{ price: 120, label: '120' }], caption: bi('已走出 100、105、112、120。', 'Already printed: 100, 105, 112, 120.'), start: 4 }
      }),
      lesson({
        id: '02', title: bi('亏损厌恶与报复性交易', 'Loss aversion and revenge trading'),
        scene: bi('亏了一笔就加大风险，后面账户通常怎么掉？', 'You raise the risk after one loss, how does the account usually fall next?'),
        one: bi('亏了一笔就加大风险去翻本，下一笔再亏时掉得更快，钱通常不会因此马上回来。', 'Raising the risk after a loss to win it back makes the next loss fall faster, and the money usually does not come back right away because of that.'),
        explain: bi('亏了以后最想马上赚回来。\n把下一笔的风险加大，亏的时候掉得更快。\n教学模拟：从 1000 起，每次亏掉剩余的 1%，三次后大约还剩 970。\n若改成先亏 1%，再亏 2%，再亏 4%，大约还剩 931。\n一次比一次加大，剩下的更少，不是赚回来了。', 'After a loss, the strongest urge is to earn it back at once.\nRaising the risk of the next trade makes the fall faster when you lose.\nTeaching simulation: start at 1000, lose 1% of what remains each time, and after three times about 970 is left.\nIf it is 1% first, then 2%, then 4%, about 931 is left.\nMaking each loss larger than the last leaves less, and it is not earned back.'),
        topic: {
          title: bi('亏了想翻本时，账户通常怎么掉', 'When you want the loss back, how the account usually falls'),
          body: bi('刚亏完就加大，下一笔再亏是常见的，不是少见的。\n价格不会因为你想翻本，就走出相反的方向。\n每次仍只亏剩余的 1%，三次后大约剩 970。\n改成 1%、2%、4%，大约剩 931，掉得更多。\n先停一下，是为了打断这一下，不是保证下一笔会赚。\n加大之后下一笔也可能赚，于是更敢再加，直到一次大亏把赚回来的吐出去。', 'Right after a loss, sizing up and then losing again is common, not rare.\nPrice does not walk the other way just because you want the money back.\nIf each loss is still only 1% of what remains, about 970 is left after three times.\nChanging it to 1%, then 2%, then 4% leaves about 931, which is a larger drop.\nPausing first is to interrupt that moment, not to guarantee the next trade wins.\nThe next trade after sizing up can also win, which makes another increase easier, until one large loss gives back what was earned back.')
        },
        example: bi('教学模拟：三次都亏剩余的 1%，大约剩 970。\n改成 1%，再 2%，再 4%，大约剩 931。\n加大没有把 1000 赚回去。', 'Teaching simulation: three losses of 1% of what remains leave about 970.\nChanging it to 1%, then 2%, then 4% leaves about 931.\nSizing up did not earn the 1000 back.'),
        pitfalls: [
          bi('亏了就加大风险想回本', 'Sizing up after a loss to get it back'),
          bi('把暂停当成认输', 'Treating a pause as giving up')
        ],
        practice: bi('刚亏完手想加大时，先记住按 1%、2%、4% 会比每次 1% 掉得更多。', 'When you want to size up right after a loss, remember that 1%, then 2%, then 4% drops more than 1% each time.'),
        check: {
          ask: bi('刚亏完，下一笔从剩余的 1% 加大到 2% 再加大到 4%，再亏时更常见的是？', 'Right after a loss, the next trades go from 1% of what remains to 2% and then to 4%, and if you lose again, what is more common?'),
          options: [
            opt('A', '市场通常会反向，把加大的部分送回来', 'The market usually reverses and sends the extra size back'),
            opt('B', '每次 1% 和 1%、2%、4% 掉得一样多', '1% each time and 1%, 2%, 4% drop the same amount'),
            opt('C', '掉得更快，大约从 1000 掉到 931', 'It falls faster, from about 1000 down to about 931'),
            opt('D', '三次 1% 才是掉得更多的那条', 'Three times 1% is the path that drops more')
          ],
          answer: 'C',
          note: bi('1%、2%、4% 大约剩 931，比每次亏 1% 剩下的 970 更少。', '1%, then 2%, then 4% leaves about 931, less than the 970 left by losing 1% each time.'),
          miss: bi('1%、2%、4% 大约剩 931，比每次亏 1% 剩下的 970 更少。', '1%, then 2%, then 4% leaves about 931, less than the 970 left by losing 1% each time.')
        },
        quizzes: [
          quiz('刚亏完把风险加大，下一笔又亏了，账户通常怎样？', 'You size up right after a loss, and the next trade loses too, what does the account usually do?', [
            opt('A', '停一下和加大掉得一样快', 'A pause and a larger size fall equally fast'),
            opt('B', '加大以后通常下一笔会赚回来', 'After sizing up the next trade usually earns it back'),
            opt('C', '价格会因为你想翻本而反向', 'Price reverses because you want the money back'),
            opt('D', '掉得比按原来的小比例再亏更快', 'It falls faster than another loss at the old small rate')
          ], 'D', {
            A: ['停一下是少做一笔，不是和加大掉得一样快。', 'A pause is skipping a trade, not falling as fast as the larger size.'],
            B: ['加大不会让下一笔通常赚回来。', 'Sizing up does not make the next trade usually earn it back.'],
            C: ['价格不因为你想翻本就反向。', 'Price does not reverse just because you want the money back.'],
            D: ['风险加大后再亏，掉得比原来的小比例更快。', 'A loss after the risk is raised falls faster than the old small rate.']
          }),
          quiz('想翻本的时候，价格会不会替你走出相反的方向？', 'When you want the loss back, does price walk the other way for you?', [
            opt('A', '会，亏完的下一根常常反向', 'Yes, the candle after a loss often reverses'),
            opt('B', '会，但只在你把风险加大以后', 'Yes, but only after you raise the risk'),
            opt('C', '不会，价格不替你翻本', 'No, price does not win the money back for you'),
            opt('D', '不会，所以要一次性把亏损加回去', 'No, so you add the whole loss back in one trade')
          ], 'C', {
            A: ['下一根没有因为你亏了就反向的规则。', 'There is no rule that the next candle reverses because you lost.'],
            B: ['加大风险不会把价格叫到反方向。', 'Raising the risk does not call price to the other side.'],
            C: ['价格不会因为你想翻本，就走出相反的方向。', 'Price does not walk the other way just because you want the money back.'],
            D: ['价格不替你翻本，也不是把亏损一次加回去的理由。', 'Price does not win it back for you, and that is not a reason to add the whole loss back at once.']
          }),
          quiz('加大之后下一笔碰巧赚了，通常接着会怎样？', 'After sizing up, the next trade happens to win, what usually follows?', [
            opt('A', '赚一次就说明加大是对的，可以固定下来', 'One win means sizing up was right, so you can keep it'),
            opt('B', '更容易再加，直到一次大亏把赚回来的吐出去', 'It gets easier to size up again, until one large loss gives back what was earned back'),
            opt('C', '风险会自己缩回原来的 1%', 'The risk shrinks itself back to the old 1%'),
            opt('D', '这次赚的通常够覆盖 1%、2%、4% 的差额', 'This win usually covers the gap between 1% and 1%, 2%, 4%')
          ], 'B', {
            A: ['碰巧赚一次，不能把加大固定下来。', 'One lucky win cannot lock the larger size in place.'],
            B: ['碰巧赚了会让人更敢再加，直到一次大亏吐回去。', 'A lucky win makes another increase easier, until one large loss gives it back.'],
            C: ['风险不会因为赚了就自己缩回 1%。', 'The risk does not shrink itself back to 1% because you won.'],
            D: ['一次碰巧的赚，不是用来补 1%、2%、4% 那条差额的方法。', 'One lucky win is not a method for covering the gap on the 1%, 2%, 4% path.']
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
        explain: bi('每笔记成四格：按计划赚、按计划亏、违规赚、违规亏。\n赚钱只说明结果，不说明这次守没守规矩。\n教学模拟的十笔里，赢 5 笔亏 5 笔，有 4 笔没按计划。\n这 50% 不是以后的胜率。\n违规却赚了，先标成没守规矩，再看里面有没有值得参考的地方。', 'Put each trade in one of four cells: followed the plan and made money, followed the plan and lost, broke the rule and made money, broke the rule and lost.\nMaking money only describes the outcome, and it does not say whether this trade kept the rule.\nIn the ten-trade teaching set, 5 wins and 5 losses, and 4 did not follow the plan.\nThat 50% is not the future win rate.\nA win that broke the rule is marked as a broken rule first, then checked for anything worth learning from.'),
        topic: {
          title: bi('复盘时，先标没守规矩，再看有没有可学的', 'In a review, mark the broken rule first, then see if anything is worth learning'),
          body: bi('违规却赚钱，先标成没守规矩，再看看里面有没有值得参考的地方。\n只因为赚了就放过，后面常常再犯一次。\n恐慌把仓位砸在一段急跌的低点附近，价格常常先反弹一截。\n怕错过追在一段急涨的高点，价格常常先回一截。\n按计划做了但亏了，做法可以是对的，不要为了翻本改做法。\n恐慌的低点也可以继续跌，追高的位置也可以再涨。\n十笔样本只能看你自己的毛病，不能写成以后也会五五开。', 'A win that broke the rule is marked as a broken rule first, then checked for anything in it worth learning from.\nLetting it pass only because it made money often leads to doing it again.\nPanic selling near the low of a fast drop is often followed by a bounce first.\nChasing the high of a fast rise from fear of missing out is often followed by a pullback first.\nA loss that followed the plan can still be the right way to do it, so do not change the way to win the money back.\nThe panic low can also keep falling, and the chase high can also keep rising.\nTen trades can only show your own weaknesses, and they cannot be written as a future that also splits half and half.')
        },
        example: bi('教学模拟：十笔合计赚 50，胜率 50%，其中 4 笔没按计划。\n没按计划却赚钱的那几笔，先标成没守规矩。\n标完再看里面有没有值得参考的地方，而不是因为赚了就放过。', 'Teaching simulation: ten trades made 50 in total, the win rate is 50%, and 4 did not follow the plan.\nThe ones that made money without following the plan are marked as a broken rule first.\nAfter the mark, see whether anything in them is worth learning from, instead of letting them pass because they made money.'),
        pitfalls: [
          bi('用盈利把没守规矩的单放过', 'Letting a broken rule pass because it made money'),
          bi('按计划亏了就改做法去翻本', 'Changing the way you trade after a loss that followed the plan, just to win it back')
        ],
        practice: bi('先把没按计划的单标出来，再单独看里面有没有值得参考的地方。', 'First mark the trades that did not follow the plan, then look on their own for anything worth learning from.'),
        check: {
          ask: bi('一段急跌里，恐慌把仓位砸在低点附近，后面更常见的是？', 'In a fast drop, panic sells the position near the low, what is more common next?'),
          options: [
            opt('A', '砸在低点通常还会再跌一截', 'A sale at the low usually drops another notch'),
            opt('B', '这算按计划，因为躲开了更低', 'This counts as following the plan, because it avoided a lower price'),
            opt('C', '低点附近的恐慌卖出常常是起涨', 'Panic selling near the low is often the start of a rise'),
            opt('D', '常常先反弹一截', 'It often bounces a notch first')
          ],
          answer: 'D',
          note: bi('恐慌砸在急跌低点附近，后面常常先反弹一截。', 'Panic selling near the low of a fast drop is often followed by a bounce first.'),
          miss: bi('恐慌砸在急跌低点附近，后面常常先反弹一截。', 'Panic selling near the low of a fast drop is often followed by a bounce first.')
        },
        quizzes: [
          quiz('违规却赚了钱，这笔和后面通常怎样？', 'You broke the rule and made money, what about this trade, and what usually follows?', [
            opt('A', '赚了就可以放过，后面通常会自己守规矩', 'A win can be let go, and you usually keep the rule afterward'),
            opt('B', '先标成没守规矩，不标的话常常再犯', 'Mark it as a broken rule first, or you often do it again'),
            opt('C', '先看赚了多少，规矩可以后补', 'Look at the profit first, and the rule can be added later'),
            opt('D', '这种单通常不放进四格', 'This kind of trade usually stays out of the four cells')
          ], 'B', {
            A: ['因为赚了就放过，后面常常再犯一次。', 'Letting it pass because it made money often leads to doing it again.'],
            B: ['先标成没守规矩，再看有没有值得参考的地方。', 'Mark it as a broken rule first, then see if anything is worth learning from.'],
            C: ['赚了多少是结果，规矩不是后补的。', 'How much it made is the outcome, and the rule is not added later.'],
            D: ['四格就是为了把违规却赚了单独放下。', 'The four cells exist so a win that broke the rule has its own place.']
          }),
          quiz('按计划做了但亏了，该怎么看？', 'You followed the plan and lost, how should you read it?', [
            opt('A', '亏了就说明计划该改', 'A loss means the plan should be changed'),
            opt('B', '和违规却赚了是同一类', 'It is the same kind as a win that broke the rule'),
            opt('C', '低点卖出才算按计划', 'Only a sale at the low counts as following the plan'),
            opt('D', '做法可以是对的，不要为了翻本改做法', 'The way can still be right, so do not change it to win the money back')
          ], 'D', {
            A: ['一次按计划的亏损，不是把计划改掉的理由。', 'One loss that followed the plan is not a reason to rewrite the plan.'],
            B: ['按计划亏了，和没守规矩却赚了，要分开放。', 'A loss that followed the plan, and a win that broke the rule, go in different cells.'],
            C: ['按计划不是专指卖在低点。', 'Following the plan does not mean only selling at the low.'],
            D: ['做法可以是对的，结果可以是亏的，不要为了翻本改做法。', 'The way can still be right, and the outcome can still be a loss, so do not change the way to win the money back.']
          }),
          quiz('这十笔里有 4 笔没按计划，50% 的胜率该怎么用？', 'Four of these ten trades did not follow the plan, how should the 50% win rate be used?', [
            opt('A', '写成以后也会五五开', 'Write it down as a future that also splits half and half'),
            opt('B', '只看赚的 5 笔，4 笔可以先拿掉', 'Look only at the 5 winners, and set the 4 aside first'),
            opt('C', '样本这么小，通常说明计划已经失败', 'A sample this small usually means the plan has already failed'),
            opt('D', '只用来看这 4 笔的毛病，不外推成以后', 'Use it only to see the weaknesses in those 4, and do not extrapolate it')
          ], 'D', {
            A: ['十笔不是以后的分布。', 'Ten trades are not the future distribution.'],
            B: ['拿掉没按计划的 4 笔，毛病就看不见了。', 'If you set aside the 4 that broke the plan, the weaknesses disappear.'],
            C: ['样本小不是计划失败，它只是这一小段。', 'A small sample is not a failed plan, and it is only this small stretch.'],
            D: ['这 50% 只用来看这一小段里没按计划的毛病，不能写成以后也是 50%。', 'This 50% is only for seeing the broken-rule weaknesses in this small stretch, and it cannot be written as the future also being 50%.']
          })
        ],
        study: { kind: 'panel', headers: [bi('项目', 'Item'), bi('十笔教学记录', 'Ten-trade teaching record')], cells: [[bi('盈亏合计', 'Total PnL'), '+50'], [bi('赢 / 亏', 'Wins / losses'), '5 / 5'], [bi('胜率', 'Win rate'), '50%'], [bi('未按计划', 'Did not follow the plan'), bi('4 笔', '4 trades')]], rows: [
          bi('十笔合计赚 50，赢 5 笔亏 5 笔，4 笔没按计划。', 'Ten trades made 50 in total, 5 wins and 5 losses, and 4 did not follow the plan.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
