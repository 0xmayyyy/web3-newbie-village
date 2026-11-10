(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['07'] = {
    title: bi('项目研究与市场叙事', 'Project research and narratives'),
    lessons: [
      lesson({
        id: '01', title: bi('项目研究：别只看币价', 'Project research: do not look only at the coin price'),
        scene: bi('地址数到了 10 万，是不是就有 10 万人在用？', 'The address count reached 100,000. Does that mean 100,000 people are using it?'),
        one: bi('研究项目要分开“项目声称”和“你核对过的证据”。地址数不是人数，网页上的收入也要核对来源。', 'Research separates what the project claims from evidence you have checked. An address count is not a head count, and revenue on a website still needs a source.'),
        explain: bi('虚构项目“星桥协议”只作教学。\n每个说法标成：声称、已核对、未知。\n10 万个地址可以是程序或同一控制者。\n代币是否捕获价值，要看机制，而不是看价格涨过。', 'The fictional project “Starbridge Protocol” is for teaching only.\nMark each statement as claimed, checked, or unknown.\n100,000 addresses can be programs or one controller.\nWhether the token captures value depends on the mechanism, not on whether the price has risen.'),
        example: bi('官网写着很高的收入，在核对来源之前只能标成声称。\n地址数 100000 不能写成 100000 人。\n没有机制说明，就不能说持币一定分享收入。', 'A high revenue figure on the website is only “claimed” until the source is checked.\nAn address count of 100000 cannot be written as 100000 people.\nWithout a mechanism, you cannot say holders necessarily share the revenue.'),
        pitfalls: [bi('把地址数写成用户人数', 'Writing an address count as a user count'), bi('把官网数字写成已核对事实', 'Writing a website number as a checked fact')],
        practice: bi('把“收入很高”这一条标成声称或未知，而不是已核对。', 'Mark “revenue is high” as claimed or unknown, not as checked.'),
        check: { ask: bi('10 万地址等于 10 万人吗？', 'Do 100,000 addresses equal 100,000 people?'), options: [opt('A', '等于', 'Yes'), opt('B', '不等于', 'No'), opt('C', '活跃过就等于', 'Yes if they were active')], answer: 'B', miss: bi('地址可以属于程序或同一个人。', 'Addresses can belong to a program or to the same person.') },
        quizzes: [
          quiz('10 万个地址等于 10 万人吗？', 'Do 100,000 addresses equal 100,000 people?', [opt('A', '等于', 'Yes'), opt('B', '不等于', 'No'), opt('C', '官网这么写就等于', 'Yes if the website says so')], 'B', { A: ['一个控制者可以控制很多地址。', 'One controller can control many addresses.'], B: ['地址不是人头。', 'An address is not a person.'], C: ['官网的句子仍然可能只是声称。', 'A sentence on the website can still be only a claim.'] }),
          quiz('网页上写着收入很高，你应该？', 'The page says revenue is high. What should you do?', [opt('A', '直接引用为事实', 'Cite it as fact'), opt('B', '忽略所有收入', 'Ignore all revenue'), opt('C', '核对证据来源', 'Check the evidence')], 'C', { A: ['没看来源，就不能从声称跳到事实。', 'Without a source, a claim cannot jump to a fact.'], B: ['收入可能重要，但要核对，不是一概忽略。', 'Revenue may matter, but it needs a check. It is not ignored automatically.'], C: ['标成已核对之前，要看到能复核的来源。', 'Before marking it checked, you need a source you can re-check.'] }),
          quiz('代币会不会捕获价值，要研究什么？', 'To know whether the token captures value, what do you study?', [opt('A', '机制', 'The mechanism'), opt('B', '只看价格新高', 'Only the price high'), opt('C', '只看地址数', 'Only the address count')], 'A', { A: ['费用、回购、分配或没有任何路径，都写在机制里。', 'Fees, buybacks, distributions, or no path at all are written in the mechanism.'], B: ['价格新高不说明持币人分享了收入。', 'A price high does not show that holders shared the revenue.'], C: ['地址数不是价值捕获。', 'An address count is not value capture.'] })
        ],
        study: { kind: 'panel', headers: ['说法', '状态'], cells: [['用户 10 万', '声称，不能当成人数'], ['收入很高', '未知，待核对'], ['代币分享收入', '要看机制']], rows: [bi('虚构项目：星桥协议。', 'Fictional project: Starbridge Protocol.')] }
      }),
      lesson({
        id: '02', title: bi('Tokenomics：供应与解锁', 'Tokenomics: supply and unlocks'),
        scene: bi('FDV 有 20 亿，是不是已经有人买了 20 亿？', 'FDV is 2 billion. Has someone already bought 2 billion?'),
        one: bi('流通市值=价格×流通量。FDV=价格×最大供应。解锁增加的是流通量，不是自动出现的买盘。', 'Circulating market cap=price×circulating supply. FDV=price×max supply. An unlock increases circulating supply. It does not automatically create buying.'),
        explain: bi('价格不变时，流通量上升，流通市值上升。\nFDV 用的是最大供应，不是已经成交的金额。\n解锁 5000 万枚，若价格仍按原价计算，流通市值增加的是价格乘以这 5000 万。\n这不等于市场上出现了同等金额的卖压证明。', 'If price is unchanged and circulating supply rises, circulating market cap rises.\nFDV uses max supply. It is not cash that has already traded.\nIf 50 million unlock and you still use the old price, circulating market cap rises by price times those 50 million.\nThat is not proof of the same amount of selling pressure.'),
        example: bi('价格 2，流通 1 亿，最大供应 10 亿。\n流通市值=2 亿。\nFDV=20 亿。\n再解锁 5000 万，流通变为 1.5 亿，按价格 2 计算，流通市值=3 亿。', 'Price 2, circulating supply 100 million, max supply 1 billion.\nCirculating market cap=200 million.\nFDV=2 billion.\nUnlock another 50 million and circulating supply is 150 million. At price 2, circulating market cap=300 million.'),
        pitfalls: [bi('把 FDV 当成已经买入的金额', 'Treating FDV as cash already spent to buy'), bi('把解锁数量直接写成砸盘金额', 'Writing the unlocked quantity directly as a dump in cash')],
        practice: bi('用价格 2 和流通 1 亿算出市值 2 亿。', 'Use price 2 and circulating supply 100 million to get a market cap of 200 million.'),
        check: { ask: bi('流通市值怎么算？', 'How is circulating market cap calculated?'), options: [opt('A', '价格×流通量', 'Price×circulating supply'), opt('B', '价格×地址数', 'Price×address count'), opt('C', 'FDV÷胜率', 'FDV÷win rate')], answer: 'A', miss: bi('地址数和胜率都不在这个定义里。', 'Address count and win rate are not in this definition.') },
        quizzes: [
          quiz('流通市值是什么？', 'What is circulating market cap?', [opt('A', '价格×流通量', 'Price×circulating supply'), opt('B', '价格×最大供应', 'Price×max supply'), opt('C', '成交量×价格', 'Volume×price')], 'A', { A: ['例子：2×1 亿=2 亿。', 'Example: 2×100 million=200 million.'], B: ['那是 FDV。2×10 亿=20 亿。', 'That is FDV. 2×1 billion=2 billion.'], C: ['成交量不是流通供应。', 'Volume is not circulating supply.'] }),
          quiz('FDV 20 亿表示已经有人买了 20 亿吗？', 'Does an FDV of 2 billion mean someone bought 2 billion?', [opt('A', '表示', 'Yes'), opt('B', '不是', 'No'), opt('C', '解锁前表示', 'Yes before unlocks')], 'B', { A: ['FDV 是价格乘以最大供应，不是成交额。', 'FDV is price times max supply, not traded cash.'], B: ['很多代币可能还没进入流通，更没有被买成 20 亿成交。', 'Many tokens may not be circulating, and they were not bought as 2 billion of trades.'], C: ['解锁前 FDV 的定义仍然不是成交额。', 'Before unlocks, FDV is still not traded cash.'] }),
          quiz('解锁 5000 万是否一定砸盘？', 'Does unlocking 50 million necessarily dump the price?', [opt('A', '一定', 'Yes'), opt('B', '一定不跌', 'It certainly does not fall'), opt('C', '不一定', 'Not necessarily')], 'C', { A: ['解锁增加的是可流通数量，不是一张已经成交的卖单。', 'An unlock increases the quantity that can circulate. It is not a sell order that has already traded.'], B: ['也不能保证不跌。卖出与否还没发生。', 'It also does not guarantee no drop. Whether anyone sells has not happened yet.'], C: ['价格 2 不变时，流通市值从 2 亿记到 3 亿，这只是计价，不是卖压证明。', 'If price stays 2, circulating market cap is marked from 200 million to 300 million. That is a valuation, not proof of selling pressure.'] })
        ],
        study: { kind: 'panel', headers: ['项目', '数值'], cells: [['价格', '2'], ['流通', '1 亿'], ['最大供应', '10 亿'], ['流通市值', '2 亿'], ['FDV', '20 亿'], ['解锁后再计流通市值', '3 亿']], rows: [bi('解锁 5000 万后，按原价计，流通市值是 3 亿。', 'After unlocking 50 million, at the same price, circulating market cap is 300 million.')] }
      }),
      lesson({
        id: '03', title: bi('市场叙事：热度不是基本面', 'Narratives: attention is not fundamentals'),
        scene: bi('讨论量翻了 100 倍，用户是不是也翻了 100 倍？', 'Posts grew 100 times. Did users also grow 100 times?'),
        one: bi('帖子变多不是用户变多。盘口薄时，同样的买单会滑得更远。还要回到真实产品和证据。', 'More posts are not more users. In a thin book, the same buy slips further. You still return to the real product and the evidence.'),
        explain: bi('讨论量可以来自少数账号重复发送。\n薄盘口意味着每一档数量很小。\n市价买入会一路吃到更差的价格。\n热度之后仍要核对产品是否存在、证据是否可复核。', 'Post volume can come from a few accounts posting repeatedly.\nA thin book means each level has small size.\nA market buy lifts worse prices as it goes.\nAfter the attention, you still check whether the product exists and whether the evidence can be re-checked.'),
        example: bi('卖盘：100 个在 2，100 个在 2.1，100 个在 2.3。\n买入 300 个，花费=2×100+2.1×100+2.3×100=640。\n均价=640/300=2.1333333333。\n讨论量从 100 到 10000，不能写成用户也是 100 倍。', 'Asks: 100 at 2, 100 at 2.1, and 100 at 2.3.\nBuying 300 costs 2×100+2.1×100+2.3×100=640.\nAverage=640/300=2.1333333333.\nPosts from 100 to 10000 cannot be written as 100 times the users.'),
        pitfalls: [bi('把帖子数当成用户数', 'Treating post counts as user counts'), bi('忽略薄盘口的滑点', 'Ignoring slippage in a thin book')],
        practice: bi('算买入 300 个的花费 640。', 'Compute the cost 640 of buying 300.'),
        check: { ask: bi('讨论量×100 等于用户×100 吗？', 'Do 100× posts equal 100× users?'), options: [opt('A', '等于', 'Yes'), opt('B', '不等于', 'No'), opt('C', '有图片就等于', 'Yes if there are pictures')], answer: 'B', miss: bi('帖子可以重复，用户口径要另核。', 'Posts can be repeated. The user measure needs its own check.') },
        quizzes: [
          quiz('帖子变成 100 倍，用户也是 100 倍吗？', 'If posts become 100 times, are users 100 times too?', [opt('A', '是', 'Yes'), opt('B', '不是', 'No'), opt('C', '转发不算的话就是', 'Yes if reposts are excluded')], 'B', { A: ['讨论量不是去重后的用户数。', 'Post volume is not a de-duplicated user count.'], B: ['少数账号可以制造很多帖子。', 'A few accounts can produce many posts.'], C: ['就算去掉转发，帖子仍不是人数。', 'Even without reposts, a post is still not a person.'] }),
          quiz('盘口薄时，滑点通常怎样？', 'When the book is thin, slippage is usually?', [opt('A', '更明显', 'More visible'), opt('B', '消失', 'Gone'), opt('C', '只影响卖出', 'Only sells')], 'A', { A: ['300 个要吃到 2.3，均价高于第一档的 2。', '300 units reach 2.3, so the average is above the first level at 2.'], B: ['档位数量小，滑点不会消失。', 'Small size at each level does not remove slippage.'], C: ['买入一样会往上吃价。', 'A buy also lifts prices upward.'] }),
          quiz('热度之外还要看什么？', 'Besides attention, what else do you check?', [opt('A', '真实产品和证据', 'The real product and the evidence'), opt('B', '只看帖子排名', 'Only the post ranking'), opt('C', '只看均价', 'Only the average price')], 'A', { A: ['产品是否存在、证据能否复核，热度回答不了。', 'Whether the product exists and whether evidence can be re-checked is not answered by attention.'], B: ['排名仍是热度。', 'A ranking is still attention.'], C: ['均价只描述这笔成交，不描述项目。', 'The average only describes this fill. It does not describe the project.'] })
        ],
        study: { kind: 'book', headers: ['卖价', '数量'], cells: [['2', '100'], ['2.1', '100'], ['2.3', '100']], rows: [bi('买 300：花费 640，均价 2.1333333333。', 'Buy 300: cost 640, average 2.1333333333.')] }
      }),
      lesson({
        id: '04', title: bi('项目尽调：写出可以被推翻的结论', 'Diligence: write a conclusion that can be overturned'),
        scene: bi('只收集利好证据，这份尽调完整吗？', 'If you collect only bullish evidence, is the diligence complete?'),
        one: bi('结论要写清证据、反证和未知。可升级的管理员权限是风险，不是可以跳过的细节。', 'A conclusion states the evidence, the counter-evidence, and the unknowns. Upgradeable admin power is a risk, not a detail you skip.'),
        explain: bi('每条证据注明来源，并允许后面被新证据推翻。\n只留利好，会把反证藏起来。\n合约如果能被管理员升级，就要写明权限能做什么。\n不知道的信息标成未知，而不是补成肯定句。', 'Each piece of evidence names a source and can be overturned by later evidence.\nKeeping only bullish points hides the counter-evidence.\nIf an admin can upgrade the contract, write what that power can do.\nUnknown information is marked unknown. It is not filled in as a certainty.'),
        example: bi('证据 A 支持产品存在，证据 B 显示权限可升级，证据 C 与收入声称冲突，证据 D 仍未知。\n结论必须同时放得下 B 和 C。\n输出只是尽调记录，不是买卖建议。', 'Evidence A supports that a product exists, B shows the admin can upgrade, C conflicts with the revenue claim, and D is still unknown.\nThe conclusion has to be able to hold B and C at the same time.\nThe output is a diligence note, not a buy or sell recommendation.'),
        pitfalls: [bi('只收集看涨证据', 'Collecting only bullish evidence'), bi('把未知写成已经证实', 'Writing an unknown as if it were confirmed')],
        practice: bi('给一条反证和一条未知各留一个位置，再写结论。', 'Leave a slot for one counter-point and one unknown before you write the conclusion.'),
        check: { ask: bi('只收集利好，这份尽调好吗？', 'Is diligence that collects only bullish points good?'), options: [opt('A', '好', 'Yes'), opt('B', '不好', 'No'), opt('C', '结论乐观就好', 'Yes if the conclusion is optimistic')], answer: 'B', miss: bi('没有反证的结论无法被认真推翻，也就无法被核对。', 'A conclusion with no counter-evidence cannot be seriously overturned, so it cannot be checked.') },
        quizzes: [
          quiz('只收集看涨证据，可以吗？', 'Is it acceptable to collect only bullish evidence?', [opt('A', '可以', 'Yes'), opt('B', '不可以', 'No'), opt('C', '最后再补也行', 'It is fine to add the rest at the end')], 'B', { A: ['反证被丢掉以后，结论只剩一种方向。', 'Once counter-evidence is dropped, the conclusion has only one direction.'], B: ['尽调要同时留下支持、反对和未知。', 'Diligence keeps support, opposition, and unknowns together.'], C: ['事后再补，很容易只补不伤结论的句子。', 'Adding them afterward makes it easy to add only sentences that do not hurt the conclusion.'] }),
          quiz('管理员可以升级合约时，你应该？', 'If an admin can upgrade the contract, you should?', [opt('A', '评估权限能做什么', 'Assess what the power can do'), opt('B', '忽略，因为还没升级', 'Ignore it because it has not been upgraded'), opt('C', '当成已经去中心化', 'Treat it as already decentralized')], 'A', { A: ['权限本身就是风险：它能改什么，要写出来。', 'The power is the risk. Write down what it can change.'], B: ['还没使用，不表示以后不能使用。', 'Not having used it does not mean it cannot be used later.'], C: ['可升级的管理员权限与“已经去中心化”相反。', 'An upgradeable admin is the opposite of “already decentralized.”'] }),
          quiz('还不知道的信息怎么写？', 'How do you write information you still do not know?', [opt('A', '写成有利', 'Write it as favorable'), opt('B', '写成不利', 'Write it as unfavorable'), opt('C', '标成未知并继续核实', 'Mark it unknown and keep checking')], 'C', { A: ['未知不是利好。', 'Unknown is not bullish.'], B: ['未知也不是自动的利空。', 'Unknown is not automatically bearish either.'], C: ['标成未知，结论才留着被以后的证据推翻或补上。', 'Mark it unknown so later evidence can overturn or fill the conclusion.'] })
        ],
        study: { kind: 'panel', headers: ['证据', '作用'], cells: [['A', '支持产品存在'], ['B', '管理员可升级'], ['C', '与收入声称冲突'], ['D', '未知']], rows: [bi('结论要容得下反证。这不是买卖建议。', 'The conclusion has to fit the counter-evidence. This is not a buy or sell recommendation.')] }
      })
    ]
  };
})(window.STAR_PACK);
