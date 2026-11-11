(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['08'] = {
    title: bi('交易心理与复盘', 'Trading psychology and review'),
    lessons: [
      lesson({
        id: '01', title: bi('FOMO：怕错过时先看计划', 'FOMO: when you fear missing out, look at the plan first'),
        scene: bi('价格从 100 很快到了 120，现在不追是不是就错了？', 'Price ran from 100 to 120. Is it wrong not to chase?'),
        one: bi('FOMO 是怕错过而想马上行动。快涨本身不要求追，不交易也可以符合计划。', 'FOMO is wanting to act immediately because you fear missing out. A fast rise does not require a chase. No-trade can still match the plan.'),
        explain: bi('先回到进场条件，而不是回到“别人已经赚了”。\n价格路径 100、105、112、120 只说明已经发生的上涨。\n后面可以继续到 125、130，也可以跌到 110、95。\n两条都是隐藏的分支，用来说明追与不追都不是事后唯一正确答案。', 'Return to the entry condition, not to “someone else already made money.”\nThe path 100, 105, 112, 120 only describes the rise that already happened.\nIt can continue to 125 and 130, or fall to 110 and 95.\nBoth branches stay hidden as illustrations. Chasing and not chasing are not the only correct answer after the fact.'),
        example: bi('聊天里出现“再不买就没了”，这是情绪，不是计划条件。\n若计划要求等待回撤或确认，120 并没有自动满足它。\n不交易可以是按计划留下的结果。', 'A chat line that says “buy or it is gone” is emotion, not a plan condition.\nIf the plan asks for a pullback or a confirmation, 120 does not satisfy it automatically.\nNo-trade can be the result of following the plan.'),
        pitfalls: [bi('用别人的盈利代替自己的条件', 'Replacing your conditions with someone else’s profit'), bi('把已经涨过的路径当成必须继续追', 'Treating the path that already rose as something you must chase')],
        practice: bi('在 120 这个位置先回答：计划条件满足了没有。', 'At 120, answer first: has the plan’s condition been met?'),
        check: { ask: bi('FOMO 指的是什么？', 'What does FOMO refer to?'), options: [opt('A', '怕错过而冲动行动', 'Acting on impulse from fear of missing out'), opt('B', '按计划等待', 'Waiting according to the plan'), opt('C', '把止损写在事前', 'Writing the stop beforehand')], answer: 'A', miss: bi('等待和事前止损是计划动作，不是 FOMO。', 'Waiting and a stop written beforehand are plan actions, not FOMO.') },
        quizzes: [
          quiz('FOMO 是什么？', 'What is FOMO?', [opt('A', '怕错过而冲动行动', 'Acting on impulse from fear of missing out'), opt('B', '按计划不交易', 'Not trading according to the plan'), opt('C', '计算盈亏比', 'Calculating reward-to-risk')], 'A', { A: ['它描述的是怕错过，而不是一条进场规则。', 'It describes fear of missing out, not an entry rule.'], B: ['按计划不交易正好是在对抗这种冲动。', 'Not trading according to the plan is a response against that impulse.'], C: ['盈亏比是计划里的数字，不是情绪名称。', 'Reward-to-risk is a number in the plan, not the name of the emotion.'] }),
          quiz('快速上涨必须追吗？', 'Must you chase a fast rise?', [opt('A', '必须', 'You must'), opt('B', '不必，先看计划', 'No, look at the plan first'), opt('C', '涨过 20% 必须', 'You must after 20%')], 'B', { A: ['100 到 120 已经发生，不自动生成新的进场条件。', 'The move from 100 to 120 already happened. It does not create a new entry condition.'], B: ['计划若要求确认或回撤，就可以不追。', 'If the plan asks for confirmation or a pullback, you can choose not to chase.'], C: ['百分比阈值不是本课的追价命令。', 'A percent threshold is not this lesson’s order to chase.'] }),
          quiz('这次不交易表示什么？', 'What can “no trade this time” mean?', [opt('A', '一定错过了', 'You definitely missed it'), opt('B', '计划失败', 'The plan failed'), opt('C', '也可能符合计划', 'It can also match the plan')], 'C', { A: ['后面既可能到 130，也可能到 95，当时并不能用未来判错过。', 'It might later reach 130 or 95. You cannot use the future, at that moment, to say you missed it.'], B: ['没下单可以正是条件没满足。', 'Not placing an order can be exactly “the condition was not met.”'], C: ['符合计划的等待也是一种结果。', 'Waiting that matches the plan is also an outcome.'] })
        ],
        study: { kind: 'levels', closes: [100, 105, 112, 120], levels: [{ price: 120, label: '120' }], caption: bi('已发生：100 → 105 → 112 → 120。后面分支未展示。', 'Already printed: 100 → 105 → 112 → 120. Later branches are not shown.'), start: 4 }
      }),
      lesson({
        id: '02', title: bi('亏损厌恶与报复性交易', 'Loss aversion and revenge trading'),
        scene: bi('亏了一笔就加大风险，能更快赚回来吗？', 'You lost one trade and increased the risk. Does that get the money back faster?'),
        one: bi('亏了以后放大风险，不会把期望变成正的。连续按剩余权益百分比亏损，回撤会叠上去。', 'Raising risk after a loss does not turn expectancy positive. Repeated percent losses of remaining equity stack the drawdown.'),
        explain: bi('下一笔权益=当前权益×(1−亏损比例)。\n每次都亏当前权益的 1%，三次是 1000×0.99^3。\n若比例变成 1%、2%、4%，跌得更快。\n暂停规则用来减少情绪化违规，不是保证下一笔盈利。', 'Next equity=current equity×(1−loss rate).\nLosing 1% of current equity each time, three times, is 1000×0.99^3.\nIf the rates become 1%, 2%, and 4%, the drop is faster.\nA pause rule reduces emotional rule-breaking. It does not guarantee the next trade wins.'),
        example: bi('1000 连续三次亏当前权益的 1%：1000×0.99^3=970.299，约 970.30。\n1%、2%、4%：1000×0.99×0.98×0.96=931.392。\n加大亏损比例并没有把钱赚回来。', 'Three losses of 1% of current equity from 1000: 1000×0.99^3=970.299, about 970.30.\n1%, 2%, 4%: 1000×0.99×0.98×0.96=931.392.\nIncreasing the loss rate did not earn the money back.'),
        pitfalls: [bi('亏了就加倍风险想回本', 'Doubling risk after a loss to get it back'), bi('把暂停当成认输而不是风控', 'Treating a pause as surrender instead of risk control')],
        practice: bi('手算 1000×0.99^3，对照约 970.30。', 'Compute 1000×0.99^3 by hand and compare it with about 970.30.'),
        check: { ask: bi('三次各亏当前权益 1%，大约剩多少？', 'Three losses of 1% of current equity. About what remains?'), options: [opt('A', '970.30', '970.30'), opt('B', '970', '970'), opt('C', '931.39', '931.39')], answer: 'A', miss: bi('970 是粗算。931.39 是 1%、2%、4% 那一条。', '970 is a rough cut. 931.39 is the 1%, 2%, 4% path.') },
        quizzes: [
          quiz('亏损后把风险加倍，能更快赚回来吗？', 'After a loss, does doubling the risk earn it back faster?', [opt('A', '能', 'Yes'), opt('B', '否', 'No'), opt('C', '只加倍一次就能', 'Yes if you double only once')], 'B', { A: ['风险变大，亏的时候权益跌得更快，期望并没有因此变正。', 'Larger risk makes equity fall faster when you lose. Expectancy does not become positive because of that.'], B: ['1%、2%、4% 的路径剩约 931.39，比三次 1% 更低。', 'The 1%, 2%, 4% path leaves about 931.39, lower than three 1% losses.'], C: ['加倍一次已经改变了事先的风险金额。', 'Doubling once already changes the risk cash you set beforehand.'] }),
          quiz('三次各亏当前权益的 1%，大约是多少？', 'Three losses of 1% of current equity are about what?', [opt('A', '970.30', '970.30'), opt('B', '990', '990'), opt('C', '931.39', '931.39')], 'A', { A: ['1000×0.99^3=970.299，约 970.30。', '1000×0.99^3=970.299, about 970.30.'], B: ['990 只扣了固定的 10，不是三次按剩余权益。', '990 removes a flat 10, not three times against remaining equity.'], C: ['931.39 是递增的 1%、2%、4%。', '931.39 is the escalating 1%, 2%, 4% path.'] }),
          quiz('暂停规则主要用来？', 'A pause rule is mainly for?', [opt('A', '保证下一笔赚钱', 'Guaranteeing the next trade makes money'), opt('B', '提高胜率到 80%', 'Raising the win rate to 80%'), opt('C', '减少情绪化违规', 'Reducing emotional rule-breaking')], 'C', { A: ['暂停不改变下一笔的期望符号。', 'A pause does not change the sign of the next trade’s expectancy.'], B: ['没有任何公式把暂停变成 80% 胜率。', 'No formula turns a pause into an 80% win rate.'], C: ['它打断“亏了就加大”的那一下。', 'It interrupts the moment of “I lost, so I size up.”'] })
        ],
        study: { kind: 'panel', rows: [bi('1000×0.99^3 = 970.299，约 970.30。', '1000×0.99^3 = 970.299, about 970.30.'), bi('1000×0.99×0.98×0.96 = 931.392。', '1000×0.99×0.98×0.96 = 931.392.')] }
      }),
      lesson({
        id: '03', title: bi('复盘闭环：过程与结果分开看', 'A review loop: separate process from outcome'),
        scene: bi('违规却赚了钱，这笔执行算好吗？', 'You broke the rule and made money. Was the execution good?'),
        one: bi('复盘同时看过程和结果。违规的盈利不算好的执行。十笔样本也不能外推成以后的胜率。', 'Review looks at process and outcome together. A rule-breaking win is not good execution. Ten trades also cannot be extrapolated into a future win rate.'),
        explain: bi('把每笔放进四格：按计划且赚钱、按计划但亏钱、违规且赚钱、违规且亏钱。\n赚钱只说明结果，不说明过程合格。\n十笔里可以有一半赚钱，同时有多笔没有按计划。\n这段胜率不是下一段的承诺。', 'Put each trade in one of four cells: followed the plan and made money, followed the plan and lost, broke the rule and made money, broke the rule and lost.\nMaking money only describes the outcome. It does not say the process passed.\nTen trades can be half winners and still include several that broke the plan.\nThat win rate is not a promise for the next stretch.'),
        example: bi('固定的十笔教学记录：盈亏合计 +50，赢 5 笔、亏 5 笔，胜率 50%。\n其中 4 笔没有按计划。\n违规却赚钱的那几笔，执行仍然不合格。', 'A fixed teaching set of ten trades: total PnL +50, 5 wins and 5 losses, win rate 50%.\nFour of them did not follow the plan.\nThe ones that made money while breaking the rule still fail execution.'),
        pitfalls: [bi('用盈利为违规开脱', 'Excusing a rule break because it made money'), bi('把这十笔的 50% 胜率写成以后的胜率', 'Writing this ten-trade 50% win rate as the future win rate')],
        practice: bi('指出一笔“赚钱但违规”的记录，把它放进过程不合格的格子。', 'Point to one “made money but broke the rule” record and put it in the failed-process cell.'),
        check: { ask: bi('违规但赚钱，执行算好吗？', 'It broke the rule and made money. Was execution good?'), options: [opt('A', '算，因为赚钱了', 'Yes, because it made money'), opt('B', '不算', 'No'), opt('C', '赚得够多才算', 'Yes if the profit is large enough')], answer: 'B', miss: bi('结果赚钱不能把过程改成按计划。', 'A profitable outcome does not rewrite the process as having followed the plan.') },
        quizzes: [
          quiz('违规却赚钱，算好的执行吗？', 'A rule-breaking win: is that good execution?', [opt('A', '算', 'Yes'), opt('B', '不算', 'No'), opt('C', '下次守计划才不算', 'It fails only if the next one follows the plan')], 'B', { A: ['赚钱是结果格，不是过程合格。', 'Making money is the outcome cell, not a passing process.'], B: ['过程看的是有没有按计划，和盈亏分开。', 'Process asks whether you followed the plan. It is separate from PnL.'], C: ['这一笔自身已经违规，不必等下一笔才判定。', 'This trade already broke the rule. You do not wait for the next one to judge it.'] }),
          quiz('复盘要看什么？', 'What does a review look at?', [opt('A', '过程和结果', 'Process and outcome'), opt('B', '只看盈利截图', 'Only winning screenshots'), opt('C', '只看胜率一个数', 'Only the single win-rate number')], 'A', { A: ['四格就是为了同时留下过程和结果。', 'The four cells exist so process and outcome are kept together.'], B: ['只留盈利，违规和亏损都会消失。', 'Keeping only winners makes rule breaks and losses disappear.'], C: ['50% 胜率旁边还有 4 笔没按计划。', 'Beside the 50% win rate there are still 4 trades that broke the plan.'] }),
          quiz('这十笔的 50% 胜率等于以后也是 50% 吗？', 'Does this ten-trade 50% win rate mean the future is also 50%?', [opt('A', '等于', 'Yes'), opt('B', '高于 50% 才等于', 'Yes only if it is above 50%'), opt('C', '不是', 'No')], 'C', { A: ['十笔是一段样本，不是未来的分布。', 'Ten trades are one sample, not the future distribution.'], B: ['就算不是 50%，同样不能外推。', 'Even if it were not 50%, it still could not be extrapolated.'], C: ['样本胜率不是下一段的承诺。', 'A sample win rate is not a promise for the next stretch.'] })
        ],
        study: { kind: 'panel', headers: [bi('项目', 'Item'), bi('十笔教学记录', 'Ten-trade teaching record')], cells: [[bi('盈亏合计', 'Total PnL'), '+50'], [bi('赢 / 亏', 'Wins / losses'), '5 / 5'], [bi('胜率', 'Win rate'), '50%'], [bi('未按计划', 'Did not follow the plan'), bi('4 笔', '4 trades')]], rows: [bi('违规的盈利仍然放在过程不合格。', 'A rule-breaking win still sits in failed process.')] }
      })
    ]
  };
})(window.STAR_PACK);
