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
          options: [opt('A', '只写想赚多少', 'Only how much you want to make'), opt('B', '进场条件、止损位置和止盈目标', 'The entry condition, the stop, and the take-profit target'), opt('C', '看到涨了再决定', 'Decide after you see it rise'), opt('D', '只写币的名字', 'Only the coin name')],
          answer: 'B',
          miss: bi('进场条件、止损位置、止盈目标，三样都要提前写。\n看到涨了再想，或者只写想赚多少，都不是一份计划。', 'The entry condition, the stop, and the take-profit target all have to be written in advance.\nDeciding after a rise, or writing only how much you want to make, is not a plan.')
        },
        quizzes: [
          quiz('交易时不设止损，心态一直充满希望，常见的结局是？', 'No stop is set, and hope stays high the whole time. What ending is common?', [opt('A', '满盘皆输', 'Everything is lost'), opt('B', '一定会小赚', 'A small profit is guaranteed'), opt('C', '止损会自己出现', 'A stop appears on its own'), opt('D', '本金会自己变多', 'The principal grows by itself')], 'A', {A: ['没设止损，希望一直在，最后常见的就是满盘皆输。', 'With no stop and hope the whole way, the common ending is losing everything.'], B: ['不设止损并不能保证小赚。', 'Leaving out the stop does not guarantee a small profit.'], C: ['止损要自己提前写，不会自己冒出来。', 'You write the stop in advance. It does not appear by itself.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('做交易，该怎么看短期的亏损？', 'In trading, how should you look at a short-term loss?', [opt('A', '亏一点就再也不能做', 'One loss means you can never trade again'), opt('B', '怕亏就不要设止损', 'If you fear a loss, skip the stop'), opt('C', '亏了就要把仓位翻倍', 'A loss means you double the position'), opt('D', '不要怕，保住本金就还有重来的筹码', 'Do not fear it. Keep the principal and you still have chips to start again')], 'D', {A: ['短期亏损不等于本金没了，也不等于以后不能做。', 'A short-term loss does not mean the principal is gone, and it does not mean you can never trade again.'], B: ['怕亏就把止损拿掉，更容易把本金亏光。', 'Taking the stop away because you fear a loss makes it easier to lose the principal.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['不要怕短期亏损。本金还在，就还有重来的筹码。', 'Do not fear a short-term loss. If the principal is still there, you still have chips to start again.']}),
          quiz('止盈目标价应该什么时候定？', 'When should the take-profit target be set?', [opt('A', '赚到了再看', 'After you have already made money'), opt('B', '亏了再补', 'Add it after a loss'), opt('C', '进场之前，和止损一起写好', 'Before entry, written together with the stop'), opt('D', '平仓之后再补上', 'Write it after you close')], 'C', {A: ['赚到了再看，进场时就没有目标。', 'Looking after the profit means there was no target at entry.'], B: ['亏了再补，计划已经晚了。', 'Adding it after a loss means the plan is already late.'], C: ['止盈和止损、进场条件一样，都在进场前写好。', 'The target is written before entry, the same as the stop and the entry condition.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
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
          options: [opt('A', '66000', '66000'), opt('B', '54000', '54000'), opt('C', '60000', '60000'), opt('D', '57000', '57000')],
          answer: 'B',
          miss: bi('100 美元是 1000 美元本金的 10%。\n全仓在 60000 买入，止损就是 54000。', '100 dollars is 10% of a 1000 dollar principal.\nA full-position buy at 60000 puts the stop at 54000.')
        },
        quizzes: [
          quiz('这 100 美元是什么？', 'What is this 100 dollars?', [opt('A', '必须赚到的利润', 'Profit you must make'), opt('B', '手续费', 'The fee'), opt('C', '本金里最多能接受的亏损', 'The most of the principal you can accept losing'), opt('D', '这一笔必须花掉的本金', 'Principal you must spend on this trade')], 'C', {A: ['100 美元是能接受的亏损，不是必须赚到的钱。', 'The 100 dollars is the loss you can accept, not money you must make.'], B: ['这里没有把 100 美元当成手续费。', 'This lesson does not treat the 100 dollars as a fee.'], C: ['本金 1000 美元，100 美元就是最多能接受的亏损，也就是 10%。', 'On a 1000 dollar principal, 100 dollars is the most loss you can accept, which is 10%.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('把止损定在 54000，是为了什么？', 'Why set the stop at 54000?', [opt('A', '给自己制定交易规矩', 'To set a trading rule for yourself'), opt('B', '不怕亏完就可以不设', 'If you are not afraid of losing it all, you can skip it'), opt('C', '保证这一笔一定赚钱', 'To guarantee this trade makes money'), opt('D', '让价格停在 54000', 'To make the price stop at 54000')], 'A', {A: ['这是给自己定的规矩，用来卡住最多能亏的钱。', 'This is a rule you set for yourself, to cap the most money you can lose.'], B: ['不怕亏完，也不是不设止损的理由。', 'Not being afraid of losing it all is not a reason to skip the stop.'], C: ['止损不保证赚钱，它管的是亏到哪停。', 'The stop does not guarantee a profit. It says where the loss stops.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('什么情况下，一直持有也无所谓？', 'When is it fine to just keep holding?', [opt('A', '任何币都可以一直拿', 'Any coin can be held forever'), opt('B', '亏完了也不用管', 'Ignore it even after the principal is gone'), opt('C', '止损放得越远就越可以', 'The farther the stop, the more it is fine'), opt('D', '真的很信仰自己买的那枚代币', 'You truly believe in the token you bought')], 'D', {A: ['不是任何币都适合一直拿。', 'Not every coin is something to hold the whole way.'], B: ['亏完了再不管，就不是这条规矩。', 'Ignoring it after the principal is gone is not this rule.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['一般情况下要有止损。真的很信仰这枚代币，一直持有也无所谓。', 'In general you want a stop. If you truly believe in this token, holding all the way is fine.']})
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
          options: [opt('A', '只数赢了几笔', 'Only count how many trades won'), opt('B', '看亏赚的金额', 'Look at the money won and lost'), opt('C', '看群里说了几次', 'Count how many times the chat mentioned it'), opt('D', '只看最近一笔赚没赚', 'Only whether the last trade made money')],
          answer: 'B',
          miss: bi('笔数会骗人。\n金额才看得出，一次大亏能不能把前面的盈利都吃掉。', 'The count can mislead you.\nThe money shows whether one large loss can eat the earlier profits.')
        },
        quizzes: [
          quiz('刚开始每一单都赚钱，后面常见什么？', 'Every trade makes money at the start. What often comes next?', [opt('A', '说明以后不会再错', 'It proves you will not be wrong again'), opt('B', '可以放心不停加仓', 'You can keep adding without worry'), opt('C', '可以不再写止损', 'You can stop writing a stop'), opt('D', '人容易飘，错了还不停加仓', 'The person gets cocky and keeps adding even after the direction is wrong')], 'D', {A: ['连赢不是以后不会错的证明。', 'A winning streak is not proof that you will not be wrong later.'], B: ['飘了再加仓，正是这里要避开的。', 'Getting cocky and adding more is what this lesson warns against.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['每一单都赚，人容易飘。方向错了还坚信自己不会错，就不停加仓。', 'When every trade wins, it is easy to get cocky. When the direction is wrong, believing you cannot be wrong leads to adding more.']}),
          quiz('最后那一笔大亏，可能亏掉什么？', 'What can that last large loss take away?', [opt('A', '前面 10 笔的盈利，再搭上本金', 'The profit from the previous 10 trades, plus the principal'), opt('B', '只亏手续费', 'Only the fee'), opt('C', '什么都不亏', 'Nothing'), opt('D', '只亏掉这一笔的目标', 'Only that trade target')], 'A', {A: ['加仓加到最后，一笔就可能亏掉前面 10 笔的盈利，再搭上本金。', 'After adding and adding, one trade can lose the profit from the previous 10 trades, plus the principal.'], B: ['这里说的不是手续费那么小。', 'This is not about a loss as small as the fee.'], C: ['这一笔可以是大亏，不是什么都不亏。', 'This trade can be a large loss. It is not a loss of nothing.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('方向已经开错，还不停加仓，通常是因为什么？', 'The direction is already wrong, and the position keeps growing. What is that usually from?', [opt('A', '止盈写得太早', 'The target was written too early'), opt('B', '只看了手续费', 'Only the fee was checked'), opt('C', '止损设得太近', 'The stop was set too close'), opt('D', '依旧坚信自己不会出错', 'Still believing you cannot be wrong')], 'D', {A: ['止盈写早不写，都不是这里说的加仓原因。', 'Whether the target was written early is not why the position grows here.'], B: ['手续费解释不了不停加仓。', 'The fee does not explain keeping on adding.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['方向错了，还是坚信自己不会出错，于是不停加仓。', 'The direction is wrong, they still believe they cannot be wrong, and they keep adding.']}),
          quiz('连亏之后把剩下的钱一次押上，碰巧赚回全部亏损。这说明什么？', 'After a string of losses, the remaining money goes on one large bet and happens to earn all the losses back. What does that show?', [opt('A', '这个做法以后可以照做', 'The approach can be repeated from now on'), opt('B', '这是运气，不是方法。再做几次，本金很可能亏光', 'This is luck, not a method. A few more times, and the principal is likely gone'), opt('C', '说明止损可以取消', 'It means the stop can be dropped'), opt('D', '一次大赚就证明做法有效', 'One large win proves the approach works')], 'B', {A: ['碰巧赚回来，不能当成以后的做法。', 'Winning it back by chance is not a method to keep using.'], B: ['这是运气。照着再押几次，本金很可能一次亏光。', 'This is luck. Bet this way a few more times, and the principal can be wiped out in one trade.'], C: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.'], D: ['一次碰巧的大赚，证明不了这个做法有效。', 'One lucky large win does not prove the approach works.']})
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
        scene: bi('止损市价卖掉 2 个 BTC，看得见的买盘不够时，剩下的在哪成交？', 'A stop-market sell of 2 BTC. If the bids you can see are not enough, where does the rest fill?'),
        one: bi('止损市价卖出时，看得见的买盘不够，剩下的就会在更低的价格成交。', 'On a stop-market sell, if the bids you can see are not enough, the rest fills at a lower price.'),
        explain: bi('你想用止损市价单卖掉 2 个 BTC。\n触发之后，卖单会去吃当时的买盘，成交价不是锁在触发价上。\n图上绿色买盘从 61,245.7 到 61,242.6，加在一起只有 1.58872 个 BTC。\n卖掉 2 个时，这些买盘先被吃完，还剩 0.41128 个。\n剩下的会在 61,242.6 下面成交，所以平均成交价比触发价更差。\n如果改成限价单，价格不到你写的限价就不成交，2 个 BTC 可能卖不完。', 'You want to sell 2 BTC with a stop-market order.\nAfter it triggers, the sell order takes the bids that are there, and the fill is not locked at the trigger.\nThe green bids from 61,245.7 down to 61,242.6 add up to only 1.58872 BTC.\nWhen you sell 2, those bids are taken first, and 0.41128 is left.\nThe rest fills below 61,242.6, so the average fill is worse than the trigger.\nIf you switch to a limit order, it does not trade until price reaches your limit, so all 2 BTC may not sell.'),
        example: bi('这张盘上，先被吃掉的是绿色买盘。\n看得见的一共 1.58872 个 BTC。\n卖出 2 个以后，还剩 0.41128 个，要到 61,242.6 下面才有人接。', 'On this book, the green bids are taken first.\nThe ones you can see add up to 1.58872 BTC.\nAfter selling 2, 0.41128 is left, and that part needs a buyer below 61,242.6.'),
        pitfalls: [
          bi('把触发价当成已经成交的价格', 'Treating the trigger price as the price you already sold at'),
          bi('以为限价单一定能把 2 个 BTC 卖完', 'Assuming a limit order will always sell all 2 BTC')
        ],
        practice: bi('把卖出数量点到 2 个 BTC，看哪些绿色买盘被吃掉，剩下的会在更低的价格成交。', 'Set the sell amount to 2 BTC, see which green bids are taken, and see that the rest fills at a lower price.'),
        check: {
          ask: bi('看得见的买盘，从 61,245.7 到 61,242.6，一共多少 BTC？', 'How much BTC do the bids you can see add up to, from 61,245.7 down to 61,242.6?'),
          options: [opt('A', '2', '2'), opt('B', '3.21208', '3.21208'), opt('C', '大约 0.41', 'About 0.41'), opt('D', '1.58872', '1.58872')],
          answer: 'D',
          miss: bi('把绿色买盘加在一起是 1.58872 个 BTC。\n2 是你想卖的数量，0.41 是吃完以后还剩的部分。', 'The green bids add up to 1.58872 BTC.\n2 is how much you want to sell, and about 0.41 is what is left after those bids are taken.')
        },
        quizzes: [
          quiz('止损市价卖掉 2 个 BTC，看得见的买盘只有 1.58872。剩下的怎样？', 'A stop-market sell of 2 BTC, and the bids you can see are only 1.58872. What happens to the rest?', [opt('A', '仍按触发价成交', 'It still fills at the trigger'), opt('B', '会在 61,242.6 下面成交，平均价更差', 'It fills below 61,242.6, and the average price is worse'), opt('C', '自动取消', 'It is cancelled'), opt('D', '剩下的会卖得更贵', 'The rest sells at a higher price')], 'B', {A: ['触发价只是开始卖，不是成交价。', 'The trigger only starts the sell. It is not the fill.'], B: ['买盘先被吃完，还剩 0.41128 个，要到 61,242.6 下面才有人接。', 'Those bids are taken first. 0.41128 is left, and it needs a buyer below 61,242.6.'], C: ['市价单不会因为买盘不够就取消，它会继续往下吃。', 'A market order is not cancelled because the visible bids run out. It keeps selling lower.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('同样想卖掉 2 个 BTC，改成限价单，可能怎样？', 'You still want to sell 2 BTC, but you use a limit order. What can happen?', [opt('A', '一定按触发价全部卖完', 'It must sell all of it at the trigger'), opt('B', '买盘会自动变多', 'The bids grow on their own'), opt('C', '价格不到限价，可能卖不完', 'If price does not reach the limit, it may not all sell'), opt('D', '限价一定比市价卖得更好', 'A limit always sells better than a market order')], 'C', {A: ['限价单不保证按触发价卖完。', 'A limit order does not guarantee a full sale at the trigger.'], B: ['你的订单类型不会把别人的买盘变多。', 'Your order type does not make other people bid more.'], C: ['限价保护价格，但买盘不够、或者价格没到，剩下的可以不成交。', 'A limit protects the price, but if the bids are not there, or price never reaches it, the rest can stay unsold.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('止损市价单保的是成交价吗？', 'Does a stop-market order protect the fill price?', [opt('A', '不保。它按当时买盘能成交的价格走', 'No. It fills at the bids that are there'), opt('B', '保，一定是触发价', 'Yes. It is always the trigger'), opt('C', '只保整数价', 'Only round prices'), opt('D', '只保第一档买盘的价格', 'It only protects the first bid')], 'A', {A: ['它只保证触发后去卖，成交价跟着买盘走。', 'It only guarantees that the sell starts after the trigger. The fill follows the bids.'], B: ['触发价不是成交保证。', 'The trigger is not a guaranteed fill.'], C: ['整数价没有特殊保护。', 'A round price has no special protection.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']})
        ],
        study: { kind: 'spotbook' }
      }),
      lesson({
        id: '05',
        title: bi('回撤：亏一半要翻倍才回本', 'Drawdown: losing half requires a double to get back'),
        scene: bi('1000 变成 500，要涨多少才能回到 1000？', '1000 became 500. How much does it need to rise to get back to 1000?'),
        one: bi('回撤相对的是历史峰值，亏掉 50% 之后，要上涨 100% 才回到原峰值。', 'Drawdown is measured from the historical peak, and after a 50% loss, price must rise 100% to regain that peak.'),
        explain: bi('回撤=(峰值−当前权益)/峰值。\n恢复所需涨幅=峰值/当前权益−1。\n连续按当前权益百分比亏损，不是简单相加。\n五次各亏当前权益的 1%，结果是 1000×0.99 的 5 次方。\n亏损和浮亏，是从你的成本价往下算少了多少。\n回撤是从账户曾经到过的最高点往下算少了多少。\n账户从 1000 涨到 1500，再回到 1200。\n比起成本价，这时还赚着 200。\n回撤是从 1500 下来的 300，相当于那个最高点的 20%。\n它说的是，已经赚到手的利润里，又吐回去了多少。', 'Drawdown=(peak−current equity)/peak.\nThe rise needed to recover=peak/current equity−1.\nRepeated percent losses of current equity are not a simple sum.\nFive losses of 1% of current equity are 1000×0.99 to the 5th power.\nA loss, including one that is still only on paper, counts how far you are down from your cost price.\nA drawdown counts how far you are down from the highest point the account has reached.\nThe account goes from 1000 up to 1500, then back to 1200.\nAgainst the cost price, it is still ahead by 200.\nThe drawdown is 300 down from 1500, which is 20% of that high.\nIt says how much of the profit you had already made you gave back.'),
        example: bi('1000 到 500，回撤=50%。\n要回到 1000，需要 +100%。\n1000×0.99^5=950.9900499，约 950.99。', 'From 1000 to 500, drawdown=50%.\nTo get back to 1000, you need +100%.\n1000×0.99^5=950.9900499, about 950.99.'),
        pitfalls: [
          bi('把亏 50% 理解成涨回 50% 就够', 'Thinking a 50% loss is repaired by a 50% rise'),
          bi('把五次 1% 加总成正好少 50', 'Adding five 1% losses into a flat loss of 50')
        ],
        practice: bi('算 500 回到 1000 需要的涨幅，再算 0.99 的五次方。', 'Compute the rise from 500 back to 1000, then compute 0.99 to the 5th power.'),
        check: {
          ask: bi('账户 1000 涨到 1500，再回到 1200。回撤大约是多少？', 'The account goes from 1000 up to 1500, then back to 1200. About how large is the drawdown?'),
          options: [opt('A', '300，从最高的 1500 算下来', '300, counted down from the high of 1500'), opt('B', '200，只看比起成本还赚着', '200, only that it is still ahead of the cost'), opt('C', '500，把涨上去的一段全算进去', '500, the whole rise from 1000 to 1500'), opt('D', '0，因为还在成本上面', '0, because it is still above the cost')],
          answer: 'A',
          miss: bi('比起成本还赚着 200，但回撤从最高点 1500 算，下来了 300。', 'It is still 200 ahead of the cost, but the drawdown is 300 counted down from the high of 1500.')
        },
        quizzes: [
          quiz('亏掉一半之后，回本需要上涨多少？', 'After losing half, what rise is needed to recover?', [opt('A', '50%', '50%'), opt('B', '100%', '100%'), opt('C', '200%', '200%'), opt('D', '150%', '150%')], 'B', {A: ['500 上涨 50% 只到 750。', 'A 50% rise from 500 only reaches 750.'], B: ['500×(1+100%)=1000，正好回到峰值。', '500×(1+100%)=1000, exactly back to the peak.'], C: ['200% 会到 1500，超过原来的峰值。', '200% would reach 1500, past the old peak.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('1000 连续五次亏当前权益的 1%，大约剩多少？', 'Start at 1000 and lose 1% of current equity five times. About what remains?', [opt('A', '950', '950'), opt('B', '995', '995'), opt('C', '950.99', '950.99'), opt('D', '990', '990')], 'C', {A: ['950 是五次各扣固定的 10，不是每次按剩余权益的 1%。', '950 would be five flat deductions of 10, not 1% of the remaining equity each time.'], B: ['995 只扣了一次 5，不是五次。', '995 removes 5 once, not five times.'], C: ['1000×0.99^5≈950.99。', '1000×0.99^5≈950.99.'], D: ['这不是这道题要选的。回到题目里的说法再看一次。', 'That is not the choice this question wants. Look again at what the question says.']}),
          quiz('回撤是从哪里开始算跌了多少的？', 'Where does a drawdown start counting how far it has fallen?', [opt('A', '持仓成本（买入价）', 'The position cost (the buy price)'), opt('B', '手续费', 'Fees'), opt('C', '最近一笔的止损价', 'The stop on the latest trade'), opt('D', '账户或价格曾经到过的最高点', 'The highest point the account or the price has reached')], 'D', {A: ['亏损和浮亏从成本价算，1200 比起 1000 还赚着 200，回撤则从最高点 1500 下来 300，是最高点的 20%，也就是已经赚到的利润里又吐回去的部分。', 'A loss, on paper or booked, is counted from the cost price, so 1200 is still 200 ahead of 1000, while the drawdown is 300 down from the high of 1500, 20% of that high, the part of the profit already made that was given back.'], B: ['手续费会让账上少一点钱，但跌了多少不是从手续费开始算的。', 'Fees make the account a little smaller, but the drop is not counted from the fee.'], C: ['止损价是你自己设的离场价，不是账户曾经到过的最高点。', 'A stop is the exit you set yourself, not the highest point the account has reached.'], D: ['亏损和浮亏从成本价算，1200 比起 1000 还赚着 200，回撤则从最高点 1500 下来 300，是最高点的 20%，也就是已经赚到的利润里又吐回去的部分。', 'A loss, on paper or booked, is counted from the cost price, so 1200 is still 200 ahead of 1000, while the drawdown is 300 down from the high of 1500, 20% of that high, the part of the profit already made that was given back.']})
        ],
        study: { kind: 'panel', rows: [
          bi('1000 → 500，回撤 50%，回本需要 +100%。', '1000 → 500, drawdown 50%, recovery needs +100%.'),
          bi('1000×0.99^5 ≈ 950.99。', '1000×0.99^5 ≈ 950.99.')
        ] }
      }),
      lesson({
        id: '06',
        title: bi('交易日志：别只收藏赚钱截图', 'A trade log: do not keep only the winning screenshots'),
        scene: bi('只记下赚钱的单，还能看清自己哪里做得不好吗？', 'If you only write down the winning trades, can you still see where your trading is weak?'),
        one: bi('赚钱和亏钱的单都要记下，再逐笔分清哪些是看错、哪些是没守自己的规矩，这样才看得到自己的毛病，也才是在积累交易经验。', 'Write down both winning and losing trades, then go through each one to see which was a wrong call and which broke your own rules, so you can see your own weaknesses and build real trading experience.'),
        explain: bi('日志不要只留赚钱的截图。\n亏钱的单也要写下来。\n写完之后，一笔一笔回头看。\n有的单是方向看错了。\n有的单方向看对了，但没有守住自己事先定的规矩。\n这两类要分开。\n分开之后，才说得清自己做交易时反复出现的毛病。\n一次次这样复盘，才是在积累真正的交易经验。\n只收藏赚钱的单，这两类问题都会被藏起来。', 'A log should not keep only screenshots of winning trades.\nLosing trades have to be written down too.\nAfter you write them down, look back at them one by one.\nSome trades were a wrong call on direction.\nSome calls on direction were right, but you did not keep the rules you had set for yourself.\nThese two kinds have to be kept apart.\nOnce they are kept apart, you can say clearly which mistakes keep showing up in your own trading.\nReviewing this way, time after time, is how real trading experience is built.\nIf you only keep the winning trades, both kinds of problems stay hidden.'),
        example: bi('只留一张盈利截图，看不出这笔是看对了，还是碰巧没守规矩。\n把亏钱的单也摆在一起，才能问这笔是方向错了，还是自己破了规矩。\n问清这两类，才知道下次该改判断，还是该把自己的规矩守住。', 'One winning screenshot does not show whether the call was right, or whether you happened to break your own rules.\nPut the losing trades beside it, and you can ask whether the direction was wrong, or whether you broke your own rules.\nOnce those two kinds are clear, you know whether to change the judgment next time, or to keep your own rules.'),
        pitfalls: [
          bi('只收藏赚钱的截图，亏钱的单没有留下', 'Keeping only winning screenshots, so the losing trades are never written down'),
          bi('复盘时不分开看错和没守规矩，所以说不出自己的毛病', 'Reviewing without separating a wrong call from a broken rule, so you cannot name your own weaknesses')
        ],
        practice: bi('拿出一笔亏钱的单，和一笔没守规矩却赚钱的单，分别标上是看错了，还是没守自己的规矩。', 'Take one losing trade, and one winning trade that broke your rules, and mark each as a wrong call or as a broken rule.'),
        check: {
          ask: bi('一笔没守规矩却赚钱的单，复盘时该怎么标？', 'A trade broke your rules and still made money. How do you mark it in a review?'),
          options: [opt('A', '赚钱了，就算守住了规矩', 'It made money, so the rules were kept'), opt('B', '标成没守规矩，不能当成以后的方法', 'Mark it as a broken rule, and do not treat it as a method'), opt('C', '不用写进日志', 'Leave it out of the log'), opt('D', '只标成看错了方向', 'Only mark it as a wrong call on direction')],
          answer: 'B',
          miss: bi('结果赚钱不能把没守规矩改成守住了。它也不能当成以后照做的方法。', 'A profit does not rewrite a broken rule as a rule that was kept. It is also not a method to copy later.')
        },
        quizzes: [
          quiz('复盘时，亏钱的单要不要写进日志？', 'When you review, do the losing trades need to go into the log?', [opt('A', '要，不写就看不见自己反复犯的错', 'Yes, leave them out and you cannot see the mistakes you keep making'), opt('B', '不要，看着难受', 'No, they are unpleasant to look at'), opt('C', '只写下跌很猛的那几笔', 'Only the ones that fell very hard'), opt('D', '赚钱的单已经能代表全部', 'The winning trades already stand for all of them')], 'A', {A: ['亏钱的单不留下，就没法分清哪些是看错、哪些是没守规矩。', 'If the losing trades are not written down, you cannot separate a wrong call from a broken rule.'], B: ['难看不是不记的理由，不记下来，毛病会被藏住。', 'Being unpleasant to look at is not a reason to leave them out, and if you leave them out the weaknesses stay hidden.'], C: ['不是只有跌得很猛才值得记，亏掉的每一笔都要能回头看。', 'A hard drop is not the only trade worth writing down, and every losing trade has to be there to look back at.'], D: ['只留赚钱的单，看错和没守规矩都会被藏起来。', 'If you keep only the winning trades, both wrong calls and broken rules stay hidden.']}),
          quiz('一笔一笔看的时候，要分开的是哪两类？', 'When you look through them one by one, which two kinds do you separate?', [opt('A', '手续费高的和手续费低的', 'High fees and low fees'), opt('B', '白天做的和夜里做的', 'Trades made by day and trades made at night'), opt('C', '方向看错的，和没守自己规矩的', 'A wrong call on direction, and a trade that broke your own rules'), opt('D', '持仓时间长的和持仓时间短的', 'Trades held a long time and trades held a short time')], 'C', {A: ['手续费高低不是这里要分开的两类。', 'High fees and low fees are not the two kinds to separate here.'], B: ['什么时间做的，代替不了看错和没守规矩。', 'The time of day does not stand in for a wrong call and a broken rule.'], C: ['方向看错了，和没有守住自己事先定的规矩，要分开。分开了才说得出自己的毛病。', 'A wrong call on direction, and not keeping the rules you set beforehand, have to be kept apart. Once they are apart, you can name your own weaknesses.'], D: ['拿了多久，说明不了这笔是看错了还是没守规矩。', 'How long you held it does not say whether the call was wrong or the rules were broken.']}),
          quiz('这样复盘，主要是为了什么？', 'What is this kind of review mainly for?', [opt('A', '保证下一笔一定赚钱', 'To guarantee the next trade makes money'), opt('B', '把胜率凑到一半以上', 'To push the win rate above half'), opt('C', '给别人看自己多会做', 'To show other people how well you trade'), opt('D', '看清自己的毛病，并积累真正的交易经验', 'To see your own weaknesses, and to build real trading experience')], 'D', {A: ['复盘不能保证下一笔赚钱。', 'A review cannot guarantee that the next trade makes money.'], B: ['这里不是为了把胜率凑到某个数字。', 'This is not about pushing the win rate to some number.'], C: ['日志是给自己回头看的，不是用来展示的。', 'The log is for you to look back at. It is not for showing off.'], D: ['分清看错和没守规矩之后，才总结得出自己的毛病。一次次这样看，才是在积累真正的交易经验。', 'After you separate a wrong call from a broken rule, you can sum up your own weaknesses. Looking this way, time after time, is how real trading experience is built.']})
        ],
        study: { kind: 'panel', rows: [
          bi('赚钱的单和亏钱的单都要留下。', 'Keep both the winning trades and the losing trades.'),
          bi('一笔一笔看：是方向看错了，还是没守自己的规矩。', 'Look at each one: was the direction a wrong call, or did you break your own rules?'),
          bi('分开之后，才总结得出自己的毛病，这也是在积累交易经验。', 'Once they are separated, you can sum up your own weaknesses, and that is how trading experience is built.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
