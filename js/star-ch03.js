(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['03'] = {
    title: bi('交易系统与风险管理', 'Trading systems and risk'),
    lessons: [
      lesson({
        id: '01',
        title: bi('交易计划：先写好进场、止损和止盈', 'A trading plan: write the entry, the stop, and the target first'),
        scene: bi('这笔交易，进场、止损和止盈要不要提前写好？', 'For this trade, should the entry, the stop, and the target be written in advance?'),
        one: bi('一笔交易要在进场前写好进场条件、止损位置和止盈目标。', 'Before you enter, write the entry condition, the stop, and the take-profit target.'),
        explain: bi('进场之前，先把这一笔写成计划。\n计划里要有三样。\n第一，写下进场条件，也就是价格走到什么样子你才买。\n第二，写下止损位置，也就是判断错了就离场的价格。\n第三，写下止盈目标，也就是你打算在哪里兑现。\n见过不少案例：交易时没有设止损，心态一直充满希望，最后满盘皆输。\n做交易不要怕短期的亏损。\n只要保住本金，你就还有重来的筹码。', 'Before you enter, write this trade down as a plan.\nThe plan needs three things.\nFirst, write the entry condition: the price action you wait for before you buy.\nSecond, write the stop: the price where you leave if the idea is wrong.\nThird, write the take-profit target: the price where you plan to take the gain.\nMany cases go like this: no stop was set during the trade, hope stayed high the whole time, and in the end everything was lost.\nDo not be afraid of a short-term loss in trading.\nAs long as you keep the principal, you still have chips to start again.'),
        example: bi('', ''),
        pitfalls: [
          bi('交易时不设止损，只靠希望扛着', 'Trading with no stop and holding on with hope'),
          bi('怕短期亏损，就把本金一次亏光', 'Fearing a short-term loss and then losing the whole principal at once')
        ],
        practice: bi('先写下这一笔的进场条件、止损位置和止盈目标，再去看行情。', 'Write this trade’s entry condition, stop, and take-profit target before you look at the market.'),
        check: {
          ask: bi('一笔交易提前要写好哪几样？', 'What should be written before a trade?'),
          options: [opt('A', '只写想赚多少', 'Only how much you want to make'), opt('B', '进场条件、止损位置和止盈目标', 'The entry condition, the stop, and the take-profit target'), opt('C', '看到涨了再决定', 'Decide after you see it rise'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'B',
          miss: bi('进场条件、止损位置、止盈目标，三样都要提前写。\n看到涨了再想，或者只写想赚多少，都不是一份计划。', 'The entry condition, the stop, and the take-profit target all have to be written in advance.\nDeciding after a rise, or writing only how much you want to make, is not a plan.')
        },
        quizzes: [
          quiz('交易时不设止损，心态一直充满希望，常见的结局是？', 'No stop is set, and hope stays high the whole time. What ending is common?', [opt('A', '满盘皆输', 'Everything is lost'), opt('B', '一定会小赚', 'A small profit is guaranteed'), opt('C', '止损会自己出现', 'A stop appears on its own'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'A', {A: ['没设止损，希望一直在，最后常见的就是满盘皆输。', 'With no stop and hope the whole way, the common ending is losing everything.'], B: ['不设止损并不能保证小赚。', 'Leaving out the stop does not guarantee a small profit.'], C: ['止损要自己提前写，不会自己冒出来。', 'You write the stop in advance. It does not appear by itself.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('做交易，该怎么看短期的亏损？', 'In trading, how should you look at a short-term loss?', [opt('A', '亏一点就再也不能做', 'One loss means you can never trade again'), opt('B', '怕亏就不要设止损', 'If you fear a loss, skip the stop'), opt('C', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.'), opt('D', '不要怕，保住本金就还有重来的筹码', 'Do not fear it. Keep the principal and you still have chips to start again')], 'D', {A: ['短期亏损不等于本金没了，也不等于以后不能做。', 'A short-term loss does not mean the principal is gone, and it does not mean you can never trade again.'], B: ['怕亏就把止损拿掉，更容易把本金亏光。', 'Taking the stop away because you fear a loss makes it easier to lose the principal.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['不要怕短期亏损。本金还在，就还有重来的筹码。', 'Do not fear a short-term loss. If the principal is still there, you still have chips to start again.']}),
          quiz('止盈目标价应该什么时候定？', 'When should the take-profit target be set?', [opt('A', '赚到了再看', 'After you have already made money'), opt('B', '亏了再补', 'Add it after a loss'), opt('C', '进场之前，和止损一起写好', 'Before entry, written together with the stop'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'C', {A: ['赚到了再看，进场时就没有目标。', 'Looking after the profit means there was no target at entry.'], B: ['亏了再补，计划已经晚了。', 'Adding it after a loss means the plan is already late.'], C: ['止盈和止损、进场条件一样，都在进场前写好。', 'The target is written before entry, the same as the stop and the entry condition.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
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
        title: bi('仓位：先定最多能亏多少钱', 'Position size: first decide the most money you can lose'),
        scene: bi('本金 1000 美元，最多接受亏 100 美元。60000 全仓买 BTC，止损放哪？', 'The principal is 1000 dollars, and the most you can accept losing is 100 dollars. You buy BTC at 60000 with the full position. Where is the stop?'),
        one: bi('仓位先定自己能接受的亏损，也就是这笔最多亏掉本金里的多少钱。', 'Position size starts by deciding the loss you can accept, the most of your principal this trade may lose.'),
        explain: bi('仓位不是先决定买多少，而是先决定自己能接受亏多少。\n这个数字要在你承受得了的范围里。\n打个比方：本金有 1000 美元，最大能接受的亏损是 100 美元，那就是本金的 10%。\n按全仓买入来算，在 60000 买入 BTC，止损位置就是 54000。\n这是你给自己定的交易规矩。\n并不是说不怕把钱亏完，就可以不设止损。\n一般情况下，都要守住这条规矩。\n只有当你真的很信仰自己购买的代币时，一直持有也无所谓。', 'Position size does not start by deciding how much to buy, it starts by deciding how much loss you can accept.\nThat number has to sit inside the range you can bear.\nFor example: the principal is 1000 dollars, and the most you can accept losing is 100 dollars, which is 10% of the principal.\nOn a full-position buy, if you buy BTC at 60000, the stop is 54000.\nThis is a trading rule you set for yourself.\nIt does not mean you can skip the stop just because you are not afraid of losing it all.\nIn general, you keep this rule.\nOnly when you truly believe in the token you bought is it fine to hold all the way.'),
        example: bi('', ''),
        pitfalls: [
          bi('不怕亏完，就干脆不设止损', 'Skipping the stop because you are not afraid of losing it all'),
          bi('把这个例子理解成可以不按全仓来对 54000', 'Reading this example as if 54000 still applied without a full position')
        ],
        practice: bi('用 1000 美元本金、最多亏 100 美元、60000 全仓买 BTC，对照止损是不是 54000。', 'Use 1000 dollars of principal, a maximum loss of 100 dollars, and a full-position BTC buy at 60000, and check that the stop is 54000.'),
        check: {
          ask: bi('本金 1000 美元，最多接受亏 100 美元。60000 全仓买 BTC，止损在哪？', 'Principal 1000 dollars, and the most you accept losing is 100 dollars. You buy BTC at 60000 with the full position. Where is the stop?'),
          options: [opt('A', '66000', '66000'), opt('B', '54000', '54000'), opt('C', '60000', '60000'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'B',
          miss: bi('100 美元是 1000 美元本金的 10%。\n全仓在 60000 买入，止损就是 54000。', '100 dollars is 10% of a 1000 dollar principal.\nA full-position buy at 60000 puts the stop at 54000.')
        },
        quizzes: [
          quiz('这 100 美元是什么？', 'What is this 100 dollars?', [opt('A', '必须赚到的利润', 'Profit you must make'), opt('B', '手续费', 'The fee'), opt('C', '本金里最多能接受的亏损', 'The most of the principal you can accept losing'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['100 美元是能接受的亏损，不是必须赚到的钱。', 'The 100 dollars is the loss you can accept, not money you must make.'], B: ['这里没有把 100 美元当成手续费。', 'This lesson does not treat the 100 dollars as a fee.'], C: ['本金 1000 美元，100 美元就是最多能接受的亏损，也就是 10%。', 'On a 1000 dollar principal, 100 dollars is the most loss you can accept, which is 10%.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('把止损定在 54000，是为了什么？', 'Why set the stop at 54000?', [opt('A', '给自己制定交易规矩', 'To set a trading rule for yourself'), opt('B', '不怕亏完就可以不设', 'If you are not afraid of losing it all, you can skip it'), opt('C', '保证这一笔一定赚钱', 'To guarantee this trade makes money'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'A', {A: ['这是给自己定的规矩，用来卡住最多能亏的钱。', 'This is a rule you set for yourself, to cap the most money you can lose.'], B: ['不怕亏完，也不是不设止损的理由。', 'Not being afraid of losing it all is not a reason to skip the stop.'], C: ['止损不保证赚钱，它管的是亏到哪停。', 'The stop does not guarantee a profit. It says where the loss stops.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('什么情况下，一直持有也无所谓？', 'When is it fine to just keep holding?', [opt('A', '任何币都可以一直拿', 'Any coin can be held forever'), opt('B', '亏完了也不用管', 'Ignore it even after the principal is gone'), opt('C', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.'), opt('D', '真的很信仰自己买的那枚代币', 'You truly believe in the token you bought')], 'D', {A: ['不是任何币都适合一直拿。', 'Not every coin is something to hold the whole way.'], B: ['亏完了再不管，就不是这条规矩。', 'Ignoring it after the principal is gone is not this rule.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['一般情况下要有止损。真的很信仰这枚代币，一直持有也无所谓。', 'In general you want a stop. If you truly believe in this token, holding all the way is fine.']})
        ],
        study: { kind: 'panel', rows: [
          bi('本金 1000 美元，最多接受亏 100 美元，是本金的 10%。', 'Principal 1000 dollars, and the most you accept losing is 100 dollars, which is 10% of the principal.'),
          bi('60000 全仓买 BTC，止损在 54000。', 'A full-position BTC buy at 60000 has the stop at 54000.'),
          bi('这是给自己定的规矩。很信仰这枚代币时，一直持有也无所谓。', 'This is a rule you set for yourself. If you truly believe in the token, holding all the way is fine.')
        ] }
      }),
      lesson({
        id: '03',
        title: bi('胜率：看金额，不只看笔数', 'Win rate: look at the money, not only the count'),
        scene: bi('只看赢了几笔，或者只看最近一次大赚，能不能说明做得好？', 'If you only count the winning trades, or only look at one recent large win, does that show the trading is going well?'),
        one: bi('不要只看胜率或一次结果，要看每一笔亏了多少、赚了多少，每笔风险保持固定，并且守住止损。', 'Do not judge by the win rate or by one result alone, look at how much each win and each loss is, keep the risk on each trade fixed, and keep the stop.'),
        explain: bi('看一个人做得怎么样，不要只数赢了几笔，也不要只看最近一次的结果。\n每一笔亏了多少、赚了多少，才更有参考价值。\n有一种很常见的过程。\n刚开始每一单都在赚钱，人就飘了。\n后来方向开错了，却仍然坚信自己不会出错，于是不停地加仓。\n最后一笔亏掉的，可能是前面 10 笔赚到的利润，再加上本金。\n反过来也会发生。\n有人连着亏了很多笔，就把剩下的钱一次押上，想一把捞回来。\n碰巧这一笔赚了，前面的亏损都回来了，甚至还多赚了一截。\n这是运气，不是方法。\n照这个做法再来几次，本金很可能一次亏光。\n一次碰巧的大赚，并不能证明这个做法有效。\n所以下结论时，不要只看胜率，也不要只看单次结果。\n要看每一笔亏赚的金额。\n每一笔承担的风险保持固定，并且守住止损。', 'When you judge how someone is doing, do not only count winning trades, and do not look only at the latest result.\nHow much each trade lost, and how much it made, is the more useful view.\nOne pattern is very common.\nAt the start every trade makes money, and the person gets cocky.\nLater the direction is wrong, but they still believe they cannot be wrong, so they keep adding to the position.\nThe last trade can lose the profit from the previous 10 trades, plus the principal.\nThe opposite also happens.\nSomeone loses trade after trade, then puts the remaining money on one large bet, hoping to win it all back at once.\nThat one trade happens to win, the earlier losses come back, and there may even be a large profit on top.\nThat is luck, not a method.\nRepeat this approach a few more times, and the principal can be wiped out in one trade.\nOne lucky large win does not prove the approach works.\nSo when you draw a conclusion, do not look only at the win rate, and do not look only at a single result.\nLook at how much each win and each loss is.\nKeep the risk on each trade fixed, and keep the stop.'),
        example: bi('', ''),
        pitfalls: [
          bi('只数赢了几笔，不看每一笔亏了多少、赚了多少', 'Counting winning trades and ignoring how much each one lost or made'),
          bi('连亏之后把剩下的钱一次押上，把运气当成方法', 'After a string of losses, putting the rest on one bet and treating luck as a method')
        ],
        practice: bi('翻记录时写下每一笔亏了多少、赚了多少。不要只数赢的笔数，也不要只看最近一次结果。', 'When you look back, write how much each trade lost or made. Do not only count the winners, and do not look only at the latest result.'),
        check: {
          ask: bi('看一个人的交易胜率，哪一种更有参考价值？', 'When you look at a person’s trading win rate, which is more useful?'),
          options: [opt('A', '只数赢了几笔', 'Only count how many trades won'), opt('B', '看亏赚的金额', 'Look at the money won and lost'), opt('C', '看群里说了几次', 'Count how many times the chat mentioned it'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'B',
          miss: bi('笔数会骗人。\n金额才看得出，一次大亏能不能把前面的盈利都吃掉。', 'The count can mislead you.\nThe money shows whether one large loss can eat the earlier profits.')
        },
        quizzes: [
          quiz('刚开始每一单都赚钱，后面常见什么？', 'Every trade makes money at the start. What often comes next?', [opt('A', '说明以后不会再错', 'It proves you will not be wrong again'), opt('B', '可以放心不停加仓', 'You can keep adding without worry'), opt('C', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.'), opt('D', '人容易飘，错了还不停加仓', 'The person gets cocky and keeps adding even after the direction is wrong')], 'D', {A: ['连赢不是以后不会错的证明。', 'A winning streak is not proof that you will not be wrong later.'], B: ['飘了再加仓，正是这里要避开的。', 'Getting cocky and adding more is what this lesson warns against.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['每一单都赚，人容易飘。方向错了还坚信自己不会错，就不停加仓。', 'When every trade wins, it is easy to get cocky. When the direction is wrong, believing you cannot be wrong leads to adding more.']}),
          quiz('最后那一笔大亏，可能亏掉什么？', 'What can that last large loss take away?', [opt('A', '前面 10 笔的盈利，再搭上本金', 'The profit from the previous 10 trades, plus the principal'), opt('B', '只亏手续费', 'Only the fee'), opt('C', '什么都不亏', 'Nothing'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'A', {A: ['加仓加到最后，一笔就可能亏掉前面 10 笔的盈利，再搭上本金。', 'After adding and adding, one trade can lose the profit from the previous 10 trades, plus the principal.'], B: ['这里说的不是手续费那么小。', 'This is not about a loss as small as the fee.'], C: ['这一笔可以是大亏，不是什么都不亏。', 'This trade can be a large loss. It is not a loss of nothing.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('方向已经开错，还不停加仓，通常是因为什么？', 'The direction is already wrong, and the position keeps growing. What is that usually from?', [opt('A', '止盈写得太早', 'The target was written too early'), opt('B', '只看了手续费', 'Only the fee was checked'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '依旧坚信自己不会出错', 'Still believing you cannot be wrong')], 'D', {A: ['止盈写早不写，都不是这里说的加仓原因。', 'Whether the target was written early is not why the position grows here.'], B: ['手续费解释不了不停加仓。', 'The fee does not explain keeping on adding.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['方向错了，还是坚信自己不会出错，于是不停加仓。', 'The direction is wrong, they still believe they cannot be wrong, and they keep adding.']}),
          quiz('连亏之后把剩下的钱一次押上，碰巧赚回全部亏损。这说明什么？', 'After a string of losses, the remaining money goes on one large bet and happens to earn all the losses back. What does that show?', [opt('A', '这个做法以后可以照做', 'The approach can be repeated from now on'), opt('B', '这是运气，不是方法。再做几次，本金很可能亏光', 'This is luck, not a method. A few more times, and the principal is likely gone'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '一次大赚就证明做法有效', 'One large win proves the approach works')], 'B', {A: ['碰巧赚回来，不能当成以后的做法。', 'Winning it back by chance is not a method to keep using.'], B: ['这是运气。照着再押几次，本金很可能一次亏光。', 'This is luck. Bet this way a few more times, and the principal can be wiped out in one trade.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['一次碰巧的大赚，证明不了这个做法有效。', 'One lucky large win does not prove the approach works.']})
        ],
        study: { kind: 'panel', rows: [
          bi('不要只看胜率或一次结果，要看每一笔亏了多少、赚了多少。', 'Do not look only at the win rate or at one result. Look at how much each trade lost or made.'),
          bi('连赢后加仓，一笔可能亏掉前面 10 笔的盈利，再搭上本金。', 'After a winning streak, adding more can make one trade lose the profit from the previous 10 trades, plus the principal.'),
          bi('连亏后一次押上，碰巧赚回来，那是运气，不是方法。', 'After a string of losses, one large bet that happens to win the money back is luck, not a method.'),
          bi('每笔风险保持固定，并且守住止损。', 'Keep the risk on each trade fixed, and keep the stop.')
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
          options: [opt('A', '5', '5'), opt('B', '3', '3'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '8', '8')],
          answer: 'D',
          miss: bi('5 只是 100 到触发价 95。成交在 92，亏损是 8。', '5 is only the distance from 100 to the trigger at 95. The fill is 92, so the loss is 8.')
        },
        quizzes: [
          quiz('止损市价单保护成交价吗？', 'Does a stop-market order protect the fill price?', [opt('A', '保护', 'It protects it'), opt('B', '只保护整数价', 'Only round prices'), opt('C', '不保护', 'It does not'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'C', {A: ['它保护的是“触发后去成交”，不是成交在触发价。', 'It protects “go trade after the trigger,” not “fill at the trigger.”'], B: ['整数价没有特殊保护。', 'A round price has no special protection.'], C: ['盘口薄时，成交价可以是 92 而不是 95。', 'In a thin book the fill can be 92 rather than 95.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('止损限价单可能不成交吗？', 'Can a stop-limit fail to fill?', [opt('A', '不可能', 'No'), opt('B', '触发了就一定成交', 'A trigger always fills'), opt('C', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.'), opt('D', '可能', 'Yes')], 'D', {A: ['限价单的定义就包含“价格不合适则不成交”。', 'The definition of a limit includes “no fill if the price is not acceptable.”'], B: ['触发只是启动，限价仍要被市场碰到。', 'The trigger only starts it. The limit still has to be met by the market.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['限价挡在触发价附近时，价格跳过限价就可以留下未成交。', 'If the limit sits near the trigger, price can jump past the limit and leave the order unfilled.']}),
          quiz('例子里每枚亏损是多少？', 'What is the loss per coin in the example?', [opt('A', '8', '8'), opt('B', '5', '5'), opt('C', '92', '92'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['100−92=8。', '100−92=8.'], B: ['5=100−95，那是触发距离，不是成交亏损。', '5=100−95. That is the distance to the trigger, not the fill loss.'], C: ['92 是成交价，不是亏损额。', '92 is the fill price, not the loss.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
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
          options: [opt('A', '100%', '100%'), opt('B', '50%', '50%'), opt('C', '25%', '25%'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')],
          answer: 'A',
          miss: bi('500×1.5=750，还没回到 1000。500×2=1000。', '500×1.5=750, which is not back to 1000. 500×2=1000.')
        },
        quizzes: [
          quiz('亏掉一半之后，回本需要上涨多少？', 'After losing half, what rise is needed to recover?', [opt('A', '50%', '50%'), opt('B', '100%', '100%'), opt('C', '200%', '200%'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['500 上涨 50% 只到 750。', 'A 50% rise from 500 only reaches 750.'], B: ['500×(1+100%)=1000，正好回到峰值。', '500×(1+100%)=1000, exactly back to the peak.'], C: ['200% 会到 1500，超过原来的峰值。', '200% would reach 1500, past the old peak.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('1000 连续五次亏当前权益的 1%，大约剩多少？', 'Start at 1000 and lose 1% of current equity five times. About what remains?', [opt('A', '950', '950'), opt('B', '995', '995'), opt('C', '950.99', '950.99'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['950 是五次各扣固定的 10，不是每次按剩余权益的 1%。', '950 would be five flat deductions of 10, not 1% of the remaining equity each time.'], B: ['995 只扣了一次 5，不是五次。', '995 removes 5 once, not five times.'], C: ['1000×0.99^5≈950.99。', '1000×0.99^5≈950.99.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('回撤是相对什么计算的？', 'Drawdown is calculated against what?', [opt('A', '第一笔的进场价', 'The first entry price'), opt('B', '手续费', 'Fees'), opt('C', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.'), opt('D', '历史峰值', 'The historical peak')], 'D', {A: ['进场价不是权益曲线的峰值定义。', 'An entry price is not the definition of the peak on the equity curve.'], B: ['手续费会影响权益，但回撤的对照物仍是峰值。', 'Fees affect equity, but the reference for drawdown is still the peak.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['回撤=(峰值−当前权益)/峰值。', 'Drawdown=(peak−current equity)/peak.']})
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
          options: [opt('A', '好，看着安心', 'Yes, it feels better'), opt('B', '只在亏损月不好', 'Only bad in a losing month'), opt('C', '只看名字就够了', 'The name alone is enough.'), opt('D', '不好', 'No')],
          answer: 'D',
          miss: bi('缺了亏损和违规，日志不能复盘。', 'Without losses and rule breaks, the log cannot be reviewed.')
        },
        quizzes: [
          quiz('只把赚钱的单写进日志，好吗？', 'Is it good to write only winners into the log?', [opt('A', '不好', 'No'), opt('B', '好', 'Yes'), opt('C', '样本少的时候好', 'Yes when the sample is small'), opt('D', '不用学，看到就买', 'Skip the lesson and buy as soon as you see it.')], 'A', {A: ['赚钱和亏钱、按计划和违规，都要留下。', 'Winners and losers, plan-following and rule-breaking, all have to stay in the log.'], B: ['缺亏损样本，期望和错误都看不出来。', 'Without the losing sample, you cannot see expectancy or mistakes.'], C: ['样本越少越不能再删掉一半。', 'The smaller the sample, the worse it is to delete half of it.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('策略问题和执行问题要分开吗？', 'Should strategy problems and execution problems be separated?', [opt('A', '不用', 'No'), opt('B', '要', 'Yes'), opt('C', '只分开盈利单', 'Only separate the winners'), opt('D', '只看名字就够了', 'The name alone is enough.')], 'B', {A: ['混在一起就不知道该改规则还是改执行。', 'Mixed together, you cannot tell whether to change the rule or the execution.'], B: ['按计划却亏钱，和违规却赚钱，处理方式不同。', 'Losing while following the plan is handled differently from winning while breaking it.'], C: ['亏损单更需要知道有没有违规。', 'Losing trades need that distinction even more.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('十笔记录能保证以后的结果吗？', 'Can ten records guarantee later results?', [opt('A', '能', 'Yes'), opt('B', '胜率过半就能', 'Yes if the win rate is above half'), opt('C', '不能', 'No'), opt('D', '私聊里说可以，就可以做', 'If a private chat says yes, you can do it.')], 'C', {A: ['十笔只是一小段样本，可以偏离期望。', 'Ten trades are a short sample. They can deviate from expectancy.'], B: ['过半的胜率仍然可能期望为负，也不能外推。', 'A win rate above half can still have negative expectancy, and it still cannot be extrapolated.'], C: ['日志帮助复盘，不承诺下一段的胜率。', 'A log helps review. It does not promise the next stretch’s win rate.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
        ],
        study: { kind: 'panel', rows: [
          bi('多单盈亏 = (出场 − 进场) × 数量 − 费用。', 'Long PnL = (exit − entry) × quantity − fees.'),
          bi('空单方向相反。胜率只数净盈亏大于 0 的笔。', 'A short reverses the direction. Win rate counts only net PnL above 0.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
