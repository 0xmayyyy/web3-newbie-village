(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['06'] = {
    title: bi('链上数据与资金流向', 'On-chain data and flows'),
    lessons: [
      lesson({
        id: '01', title: bi('区块浏览器：成功不等于到账', 'A block explorer: success is not the same as arrival'),
        scene: bi('看到「某巨鲸向交易所转入 X 枚」，价格是不是已经跌完了？', 'When you see “a whale deposited X coins to an exchange,” has price already finished dropping?'),
        one: bi('转账成功只说明上了链，巨鲸把币转进交易所常常是卖出的前兆，转到他自己的冷钱包则常常是先拿住。', 'A successful transfer only means it is on the chain, a whale moving coins into an exchange is often an early sign of selling, and a move to his own cold wallet is often just holding.'),
        explain: bi('先核对链的名字、代币合约和收款地址。\n同名代币可以是另一份合约。\n确认数变多，只是后面又接上了区块，不是收款身份证明。\n本课数据全部是模拟，不提供真实浏览器链接。\n巨鲸警报里的「转入交易所 X 枚」，是币到了交易所，不是已经卖掉。\n「自己的冷钱包」是巨鲸自己的地址，不是你的钱包。', 'First check the chain name, the token contract, and the recipient address.\nA token with the same name can be a different contract.\nA higher confirmation count only means more blocks were added after it, and it is not proof of who received the coins.\nEvery figure in this lesson is simulated, and there is no link to a real explorer.\nA whale alert that says X coins moved to an exchange means the coins arrived there, not that they were already sold.\n“His own cold wallet” is the whale’s own address, not your wallet.'),
        topic: {
          title: bi('巨鲸转账消息出来时', 'When a whale-transfer post shows up'),
          body: bi('「某巨鲸向交易所转入 X 枚」，后面常常出现卖出，价格偏软。\n转到巨鲸自己的冷钱包，常常是拿走不卖，短线卖压反而轻。\n消息刚出来的那一刻，通常还没有成交，价格往往还没动。\n链或合约对错了，你看的那个币价通常不会因为这笔而动。\n转入交易所也可以是去做保证金，并不马上卖。\n先看转到哪，再看有没有真的卖出。', '“A whale deposited X coins to an exchange” is often followed by selling, and price leans soft.\nA move to the whale’s own cold wallet is often taking coins away to hold, and near-term selling is lighter.\nIn the moment the post appears there is usually no trade yet, and price often has not moved.\nIf the chain or the contract is the wrong one, the coin price you are watching usually does not move because of it.\nA deposit to an exchange can also be margin, and it is not sold at once.\nFirst see where it went, then whether it was actually sold.')
        },
        example: bi('教学模拟：DemoChain 上的 DEMO_TX_001，金额 100，确认数 3。\n状态是成功，只说明被打包。\n若收款地址是交易所，读法就是「向交易所转入」，后面才防卖出。', 'Teaching simulation: DEMO_TX_001 on DemoChain, amount 100, 3 confirmations.\nSuccess only means it was included.\nIf the recipient is an exchange, you read it as a deposit to an exchange, and the selling to watch for comes later.'),
        pitfalls: [
          bi('只看成功两个字', 'Reading only the word success'),
          bi('把巨鲸的冷钱包当成自己的钱包', 'Treating the whale’s cold wallet as your own wallet'),
          bi('同名代币当成同一份资产', 'Treating a same-name token as the same asset')
        ],
        practice: bi('看到巨鲸警报时，先读是转入交易所，还是转到巨鲸自己的冷钱包。', 'When you see a whale alert, first read whether it is a deposit to an exchange or a move to the whale’s own cold wallet.'),
        check: {
          ask: bi('卡片上是成功，金额和确认数都有，收款地址还没对上，这时能当到账吗？', 'The card says success, and the amount and confirmations are there, but the recipient address has not been matched, so can you treat it as arrived?'),
          options: [
            opt('A', '能，成功就说明地址也对了', 'Yes, success means the address matched too'),
            opt('B', '能，确认数够了就可以先记账', 'Yes, enough confirmations means you can book it first'),
            opt('C', '不能，成功不能代替地址核对', 'No, success does not replace checking the address'),
            opt('D', '不能，但金额对了通常就是那个人', 'No, but a matching amount is usually that person')
          ],
          answer: 'C',
          note: bi('成功只说明被打包，收款地址还要单独核对。', 'Success only means it was included, and the recipient address still has to be checked on its own.'),
          miss: bi('成功只说明被打包，收款地址还要单独核对。', 'Success only means it was included, and the recipient address still has to be checked on its own.')
        },
        quizzes: [
          quiz('同一条警报改成转到巨鲸自己的冷钱包，短线常常怎样？', 'The same alert is changed to a move to the whale’s own cold wallet, what is common in the short term?', [
            opt('A', '和转入交易所一样，常常偏软', 'The same as an exchange deposit, often soft'),
            opt('B', '卖压常常更轻，因为币离开了可卖的地方', 'Selling is often lighter, because the coins left the place they can be sold'),
            opt('C', '冷钱包是你的地址，要先核对私钥', 'The cold wallet is your address, so check the private key first'),
            opt('D', '一进冷钱包通常就会再转回交易所', 'Once in a cold wallet it usually moves back to an exchange')
          ], 'B', {
            A: ['冷钱包和交易所是相反的去向。', 'A cold wallet and an exchange are opposite destinations.'],
            B: ['币离开交易所，短线可卖的库存常常变少，卖压更轻。', 'Coins leave the exchange, so the inventory that can be sold often shrinks, and near-term selling is lighter.'],
            C: ['自己的冷钱包是巨鲸的地址，不是你的钱包。', 'His own cold wallet is the whale’s address, not your wallet.'],
            D: ['进冷钱包不是马上转回交易所的固定走法。', 'Entering a cold wallet is not a fixed path of moving straight back to an exchange.']
          }),
          quiz('帖子写转入交易所，你第一眼该读成什么？', 'The post says the coins moved to an exchange, what should the first read be?', [
            opt('A', '已经在交易所卖掉了', 'They have already been sold on the exchange'),
            opt('B', '数量一写出来，价格就会跟着跳', 'Once the amount is written, price jumps with it'),
            opt('C', '这是巨鲸在加保证金做多', 'The whale is adding margin to a long'),
            opt('D', '币到了交易所，卖出还要再看', 'The coins arrived at the exchange, and the sale is still to be seen')
          ], 'D', {
            A: ['转入不是成交，标题里没有卖出记录。', 'A deposit is not a trade, and the headline has no sale record.'],
            B: ['消息刚出来，价格往往还没动。', 'When the post has just appeared, price often has not moved.'],
            C: ['可以是保证金，但第一眼不能读成已经在做多。', 'It can be margin, but the first read cannot be that a long is already on.'],
            D: ['「向交易所转入 X 枚」只说明币到了，卖不卖要再看。', '“Deposited X coins to an exchange” only says the coins arrived, and whether they sell is still to be seen.']
          }),
          quiz('警报里的链或合约对不上你看的那个币，这个币价通常？', 'The chain or contract in the alert does not match the coin you watch, what does that coin’s price usually do?', [
            opt('A', '通常没有影响，因为不是那一份资产', 'Usually no effect, because it is not that asset'),
            opt('B', '同名就会带着这个币一起动', 'The same name carries this coin along with it'),
            opt('C', '确认多了就会补上这一跌', 'More confirmations fill in this drop'),
            opt('D', '先当成转入交易所，方向偏软', 'Read it first as an exchange deposit, so it leans soft')
          ], 'A', {
            A: ['不是那一条链、那一份合约，你看的价格通常不为它而动。', 'If it is not that chain and that contract, the price you watch usually does not move for it.'],
            B: ['同名可以是另一份合约，不会自动带着这个币动。', 'The same name can be another contract, and it does not automatically carry this coin.'],
            C: ['确认数只说明又接上了区块，补不齐一份对不上的资产。', 'The confirmation count only means more blocks were added, and it does not turn a mismatched asset into the right one.'],
            D: ['链都对不上，就还不是你这个币的转入交易所。', 'If the chain does not match, it is not an exchange deposit of the coin you watch.']
          })
        ],
        study: { kind: 'panel', headers: [bi('字段', 'Field'), bi('模拟值', 'Simulated value')], cells: [[bi('链', 'Chain'), 'DemoChain'], [bi('交易', 'Transaction'), 'DEMO_TX_001'], [bi('区块', 'Block'), '1001'], [bi('金额', 'Amount'), '100 DEMO_BTC'], [bi('确认', 'Confirmations'), '3']], rows: [
          bi('教学模拟。成功不等于收款地址已经核对。金额 100 DEMO_BTC，确认数 3。', 'Teaching simulation. Success does not mean the recipient address has been checked. Amount 100 DEMO_BTC, 3 confirmations.')
        ] }
      }),
      lesson({
        id: '02', title: bi('交易所净流入：进交易所不等于卖掉', 'Exchange netflow: coins in do not mean coins sold'),
        scene: bi('净流入比平时每天高出一截，后面价格通常怎样？', 'Net inflow is a notch above its usual daily level, what does price usually do next?'),
        one: bi('币进交易所常常偏空，稳定币进交易所常常偏多。', 'Coins flowing into exchanges often lean bearish, and stablecoins flowing in often lean bullish.'),
        explain: bi('净流入看外面转进来的比转出去的多多少。\n同一家交易所内部从钱包划到现货，不算新的进出。\n内部划转不算进净流入。\n标签不清楚的数量要单独列出，不能塞进净额。\n比平时每天的水平高出一截，才叫明显变大。\n进交易所也不等于已经成交卖出。', 'Net inflow looks at how much more came in from outside than went out.\nA move from wallet to spot inside the same exchange is not a new deposit or withdrawal.\nAn internal transfer does not count in net inflow.\nAmounts with unclear labels are listed on the side, and they are not pushed into the net.\nA notch above the usual daily level is what counts as clearly larger.\nCoins entering an exchange are not the same as coins already sold.'),
        topic: {
          title: bi('币和稳定币进出交易所时', 'When coins and stablecoins move in and out of exchanges'),
          body: bi('比特币这类币净流入明显变大，可卖的库存变多，后面价格常常偏软。\n稳定币净流入明显变大，买盘的弹药变多，后面常常偏多。\n净流出明显变大，币离开交易所，短线卖压常常减轻。\n流出也可能只是转到另一家交易所，卖压只是换了地方。\n标签把外部转账标成内部，净额就会看反。\n大涨途中也可以一边创新高、一边币在净流入，强趋势可以盖过这一条。', 'When net inflow of coins such as bitcoin gets clearly larger, more inventory can be sold, and price is often softer afterward.\nWhen stablecoin net inflow gets clearly larger, there is more ammunition for buying, and it often leans bullish afterward.\nWhen net outflow gets clearly larger, coins leave the exchange, and near-term selling is often lighter.\nAn outflow can also be a move to another exchange, so the selling just changed address.\nIf a label marks an external transfer as internal, you read the net backwards.\nA strong rise can also make new highs while coins are flowing in, and the trend can override this one line.')
        },
        example: bi('教学模拟：外部流入 1000，流出 700，内部划转 500 排除，净流入是 +300。\n未知 200 另外放着。\n这 +300 若比平时每天高出一截，才按偏空去读。', 'Teaching simulation: external inflow 1000, outflow 700, internal transfer 500 excluded, net inflow +300.\nUnknown 200 sits on the side.\nIf this +300 is a notch above the usual daily level, then you read it as a soft lean.'),
        pitfalls: [
          bi('净流入大说明大家在买', 'A large net inflow means people are buying'),
          bi('把币的流入和稳定币的流入读成同一个方向', 'Reading coin inflow and stablecoin inflow as the same direction')
        ],
        practice: bi('先分清流进来的是币还是稳定币，再和它平时每天的水平比。', 'First separate whether what flowed in is coins or stablecoins, then compare it with the usual daily level.'),
        check: {
          ask: bi('比特币净流入比平时每天的水平高出一截，后面更常见的是？', 'Bitcoin net inflow is a notch above its usual daily level, what is more common next?'),
          options: [
            opt('A', '可卖的币变多，价格常常偏软', 'More coins can be sold, and price is often softer'),
            opt('B', '和稳定币流入一样，是买盘变多', 'The same as stablecoin inflow, buying ammunition increased'),
            opt('C', '净流入大说明大家在买，常常偏多', 'A large net inflow means people are buying, so it often leans bullish'),
            opt('D', '比平时高一截通常没方向', 'A notch above usual usually has no direction')
          ],
          answer: 'A',
          note: bi('币的净流入比平时每天高一截，可卖的库存变多，后面常常偏软。', 'Coin net inflow a notch above the usual daily level means more inventory that can be sold, and it is often softer afterward.'),
          miss: bi('币的净流入比平时每天高一截，可卖的库存变多，后面常常偏软。', 'Coin net inflow a notch above the usual daily level means more inventory that can be sold, and it is often softer afterward.')
        },
        quizzes: [
          quiz('稳定币净流入比平时每天高出一截，这更像什么？', 'Stablecoin net inflow is a notch above its usual daily level, what is this more like?', [
            opt('A', '和币流入一样，常常偏空', 'The same as coin inflow, often bearish'),
            opt('B', '买盘弹药变多，常常偏多', 'More ammunition for buying, often bullish'),
            opt('C', '高出一截太常见，通常忽略', 'A notch above is too common, so it is usually ignored'),
            opt('D', '稳定币变多通常没人用，价格不动', 'More stablecoins usually go unused, and price stays put')
          ], 'B', {
            A: ['币流入偏空，稳定币流入偏多，方向相反。', 'Coin inflow leans bearish, and stablecoin inflow leans bullish, and the directions are opposite.'],
            B: ['稳定币净流入明显变大，买盘弹药变多，常常偏多。', 'When stablecoin net inflow gets clearly larger, buying ammunition grows, and it often leans bullish.'],
            C: ['比平时每天高出一截就叫明显变大，不是忽略。', 'A notch above the usual daily level is what counts as clearly larger, so it is not ignored.'],
            D: ['进了交易所的稳定币是买盘弹药，不是通常没人用。', 'Stablecoins that entered an exchange are buying ammunition, not usually unused.']
          }),
          quiz('币的净流出比平时每天高出一截，短线常常？', 'Coin net outflow is a notch above its usual daily level, what is common in the short term?', [
            opt('A', '高出一截通常还要再观察一周', 'A notch above usually needs another week of watching'),
            opt('B', '流出大说明大家在卖，常常偏空', 'A large outflow means people are selling, so it often leans bearish'),
            opt('C', '和稳定币流出是同一个方向', 'It is the same direction as stablecoin outflow'),
            opt('D', '卖压常常减轻，但要防只是转到另一家', 'Selling is often lighter, but watch for a move to another exchange')
          ], 'D', {
            A: ['比平时高一截就可以读，不用再等一周。', 'A notch above the usual level can be read, and you do not wait another week.'],
            B: ['流出是库存变少，不是大家正在卖。', 'Outflow is less inventory, not people in the middle of selling.'],
            C: ['这一问是币的流出，不和稳定币混成一个方向。', 'This question is coin outflow, and it is not mixed into one direction with stablecoins.'],
            D: ['币离开后短线卖压常常减轻，除非只是换到另一家交易所。', 'After coins leave, near-term selling is often lighter, unless they only moved to another exchange.']
          }),
          quiz('大涨中价格创新高，币的净流入也比平时高，该怎么看？', 'During a strong rise price makes a new high, and coin net inflow is also above usual, how should you read it?', [
            opt('A', '流入一出现，这段涨势通常结束', 'The rise usually ends the moment inflow appears'),
            opt('B', '创新高说明流入是买盘', 'A new high means the inflow is buying'),
            opt('C', '流入常常偏空，但强趋势可以盖过', 'Inflow often leans soft, but a strong trend can override it'),
            opt('D', '比平时高就要把多单先平掉', 'Above usual means you close the longs first')
          ], 'C', {
            A: ['强趋势可以在流入很大时还创新高。', 'A strong trend can still make new highs while inflow is large.'],
            B: ['币进交易所是库存，不是已经买进的成交。', 'Coins entering the exchange are inventory, not a buy that already filled.'],
            C: ['币的流入常常让价格偏软，这一段的强趋势仍可以盖过它。', 'Coin inflow often leans the price soft, and the strong trend of this stretch can still override it.'],
            D: ['盖得过的时候不用先平多，盖不过再考虑库存。', 'When the trend overrides it you do not close the longs first, and you weigh the inventory when it does not.']
          })
        ],
        study: { kind: 'panel', headers: [bi('项目', 'Item'), bi('数量', 'Amount')], cells: [[bi('外部流入', 'External inflow'), '1000'], [bi('外部流出', 'External outflow'), '700'], [bi('内部划转', 'Internal transfer'), bi('500，排除', '500, excluded')], [bi('净流入', 'Net inflow'), '+300'], [bi('未知', 'Unknown'), '200']], rows: [
          bi('外部流入 1000，外部流出 700，净流入 +300。+300 不是已经卖掉 300。', 'External inflow 1000, external outflow 700, net inflow +300. +300 is not 300 already sold.')
        ] }
      }),
      lesson({
        id: '03', title: bi('稳定币增发：Mint 不等于买盘', 'Stablecoin minting: a mint is not buying pressure'),
        scene: bi('看到「Tether 增发 10 亿」，是不是已经有人在买比特币？', 'When you see “Tether minted 1 billion,” is someone already buying bitcoin?'),
        one: bi('稳定币真的离开金库并进了交易所，风险资产常常更有买盘，只停在金库里或只是换了一条链就没有新钱。', 'When stablecoins really leave the treasury and enter exchanges, risk assets often have more buying, and money that only sits in the treasury or only changes chain is not new money.'),
        explain: bi('增发是新的稳定币被造出来。\n销毁是被烧掉。\n一条链上的增发，可能只是另一条链烧掉后搬过来。\n全网有没有变多，要把相关的链放在一起看。\n读「增发 10 亿」时，先看这些币有没有离开金库。', 'A mint is new stablecoins being created.\nA burn is stablecoins being destroyed.\nA mint on one chain can just be a move after a burn on another chain.\nTo see whether the whole network increased, put the relevant chains together.\nWhen you read “minted 1 billion,” first see whether those coins left the treasury.'),
        topic: {
          title: bi('看到稳定币增发时', 'When you see a stablecoin mint'),
          body: bi('标题写增发 10 亿，先看币有没有离开金库，再看有没有进交易所。\n离开金库并且进了交易所，后面风险资产常常更有买盘。\n只在一条链上变多、另一条链等量变少，合计常常是零，通常没有额外买盘。\n增发了却一直停在金库里，价格也可以毫无反应。\n所以增发标题不等于已经有人买了比特币。\n稳定币变多、但市场当时在躲风险时，新钱也可以先趴着，币价继续跌。', 'When the headline says 1 billion was minted, first see whether the coins left the treasury, then whether they entered exchanges.\nIf they left the treasury and entered exchanges, risk assets often have more buying afterward.\nMore on one chain and the same amount less on another often sums to zero, and there is usually no extra buying.\nA mint that keeps sitting in the treasury can leave price with no reaction.\nSo a mint headline does not mean someone already bought bitcoin.\nWhen stablecoins increase but the market is hiding from risk, the new money can sit first, and the coin can keep falling.')
        },
        example: bi('教学模拟：链 A 增发 1 亿，链 B 烧掉 1 亿，两边抵消。\n这更像搬家，不是新的买盘。\n若 10 亿离开了金库并进了交易所，才更像多了能拿去买的钱。', 'Teaching simulation: chain A mints 100 million and chain B burns 100 million, and the two sides offset.\nThat looks more like a move, not new buying.\nIf 1 billion left the treasury and entered exchanges, it looks more like new money that can be spent.'),
        pitfalls: [
          bi('看见增发标题就当成有人在买', 'Treating a mint headline as someone already buying'),
          bi('不看金库里的币走没走', 'Not checking whether the coins left the treasury')
        ],
        practice: bi('看到增发 10 亿时，先查这些币在不在金库，再查进没进交易所。', 'When you see a mint of 1 billion, first check whether the coins are still in the treasury, then whether they entered exchanges.'),
        check: {
          ask: bi('「Tether 增发 10 亿」，币已经离开金库，正在进交易所，后面更常见的是？', '“Tether minted 1 billion,” the coins have left the treasury, and they are entering exchanges, what is more common next?'),
          options: [
            opt('A', '还在标题阶段，价格通常不动', 'It is still only a headline, so price usually does not move'),
            opt('B', '买盘弹药变多，风险资产常常更有买盘', 'Buying ammunition increased, so risk assets often have more buying'),
            opt('C', '增发本身通常已经涨完了', 'The mint itself has usually finished the rise'),
            opt('D', '进交易所是去换成法币，常常偏空', 'Entering exchanges is to swap into fiat, so it often leans bearish')
          ],
          answer: 'B',
          note: bi('离开金库并且进交易所，后面风险资产常常更有买盘。', 'Once they leave the treasury and enter exchanges, risk assets often have more buying afterward.'),
          miss: bi('离开金库并且进交易所，后面风险资产常常更有买盘。', 'Once they leave the treasury and enter exchanges, risk assets often have more buying afterward.')
        },
        quizzes: [
          quiz('增发的 10 亿还停在金库里，该怎么看？', 'The minted 1 billion is still sitting in the treasury, how should you read it?', [
            opt('A', '停在金库等于已经买完', 'Sitting in the treasury means the buying is finished'),
            opt('B', '停在金库也常被当成已经进场', 'Coins still in the treasury are often treated as if they already came in'),
            opt('C', '金库里的增发通常过一天就进交易所', 'A treasury mint usually enters exchanges after one day'),
            opt('D', '还没进场，价格可以毫无反应', 'It has not come in yet, so price can show no reaction')
          ], 'D', {
            A: ['停着不是已经成交的买单。', 'Sitting there is not a buy that already filled.'],
            B: ['没进场的供应还不是买盘，常常不是偏多。', 'Supply that has not come in is not buying yet, so it often does not lean bullish.'],
            C: ['没有过一天就进交易所的固定走法。', 'There is no fixed path of entering exchanges after one day.'],
            D: ['币没离开金库，价格可以毫无反应。', 'If the coins have not left the treasury, price can show no reaction.']
          }),
          quiz('一条链增发 1 亿，另一条链烧掉 1 亿，币价通常？', 'One chain mints 100 million and another burns 100 million, what does the coin price usually do?', [
            opt('A', '两边抵消，通常没有新的买盘', 'The two sides offset, so there is usually no new buying'),
            opt('B', '烧掉的那条链会单独把币价打下去', 'The burning chain pushes the coin price down on its own'),
            opt('C', '两边金额一样，通常就是新的买盘', 'Matching amounts are usually new buying'),
            opt('D', '增发的那条链会单独把币价拉起来', 'The minting chain lifts the coin price on its own')
          ], 'A', {
            A: ['两边抵消，通常没有额外的买盘。', 'The two sides offset, so there is usually no extra buying.'],
            B: ['对等的销毁更像搬家，不是单独的卖出。', 'A matching burn looks more like a move, not a sale on its own.'],
            C: ['金额一样仍可能只是换链，不是新钱。', 'Matching amounts can still be only a chain change, not new money.'],
            D: ['单链增发看不到另一条链的销毁，不能单独当买盘。', 'A mint on one chain does not show the burn on the other, so it cannot stand alone as buying.']
          }),
          quiz('稳定币在变多，市场当时却在躲风险，常怎么走？', 'Stablecoins are increasing, but the market is hiding from risk, what often happens?', [
            opt('A', '躲风险时稳定币流入常常先推涨', 'While hiding from risk, stablecoin inflow often pushes price up first'),
            opt('B', '一躲风险，增发通常会马上被买成比特币', 'Once people hide from risk, the mint is usually bought into bitcoin at once'),
            opt('C', '新钱可以先趴着，币价仍可能继续跌', 'The new money can sit first, and the coin can keep falling'),
            opt('D', '新钱出来就说明风险已经过去', 'New money coming out means the risk has already passed')
          ], 'C', {
            A: ['躲风险时常常不是先推涨。', 'While hiding from risk, it often does not push price up first.'],
            B: ['躲风险时新钱常常不出来买，不是马上换成比特币。', 'While hiding from risk, the new money often stays unspent, and it is not swapped into bitcoin at once.'],
            C: ['新钱先趴着，币价仍可以继续跌。', 'The new money sits first, and the coin can still keep falling.'],
            D: ['钱还趴着，不能说风险已经过去。', 'If the money is still sitting, you cannot say the risk has already passed.']
          })
        ],
        study: { kind: 'panel', headers: [bi('链', 'Chain'), bi('变化', 'Change')], cells: [['A', bi('增发 1 亿', 'mint 100 million')], ['B', bi('销毁 1 亿', 'burn 100 million')], [bi('合计', 'Total'), '0']], rows: [
          bi('链 A 增发 1 亿，链 B 销毁 1 亿，合计 0。', 'Chain A mints 100 million, chain B burns 100 million, total 0.')
        ] }
      }),
      lesson({
        id: '04', title: bi('TVL 与巨鲸：估值涨不等于流入', 'TVL and large holders: a higher valuation is not an inflow'),
        scene: bi('锁仓金额涨了一截，是不是就有新钱进来？', 'Locked value rose a notch, did new money come in?'),
        one: bi('锁仓金额变大，要先分清是币价抬上去的，还是真的有新钱锁进来。', 'When locked value gets larger, first separate a lift from the coin price from new money actually locked in.'),
        explain: bi('锁仓金额会跟着币价和锁着的数量一起变。\n数量不变、币价涨了，金额也会变大。\n数量也增加，才更像有新钱锁进来。\n活跃地址不是使用的人数。\n巨鲸转账要看从哪到哪，不能直接写成卖出。', 'Locked value moves with both the coin price and the quantity locked.\nIf the quantity is unchanged and the coin price rises, the value still gets larger.\nWhen the quantity rises too, it looks more like new money locked in.\nActive addresses are not the number of people using it.\nA large-holder transfer has to be read by where it came from and where it went, and it cannot be written down as a sale straight away.'),
        topic: {
          title: bi('锁仓金额变了，先看数量还是价格', 'When locked value changes, look at quantity or price first'),
          body: bi('数量没变、只是币价把金额抬高，这段上涨常常更脆，因为没有新钱。\n数量和金额一起增加，才更像有新钱，趋势常常更稳。\n金额掉了、数量差不多，多半是币价掉下来，不一定是大家在撤资。\n只看金额的涨跌，会把币价和资金流混在一起。\n活跃地址变多，也不能当成使用的人变多。\n先把数量和价格拆开，再决定这段是新钱还是计价。', 'If the quantity is unchanged and only the coin price lifts the value, the rise is often more fragile, because there is no new money.\nWhen quantity and value rise together, it looks more like new money, and the trend is often steadier.\nIf the value falls and the quantity is about the same, it is mostly the coin price falling, not necessarily everyone pulling money out.\nWatching only the rise and fall of the value mixes the coin price with the flow of money.\nMore active addresses also cannot be read as more people using it.\nSplit quantity from price first, then decide whether this stretch is new money or just a valuation.')
        },
        example: bi('教学模拟：100 枚，价格 2000，锁仓金额 200000。\n价格到 2500，数量仍是 100，金额 250000。\n这是涨了两成五，数量没有变。', 'Teaching simulation: 100 units, price 2000, locked value 200000.\nAt a price of 2500 the quantity is still 100, and the value is 250000.\nThat is a rise of one quarter, and the quantity did not change.'),
        pitfalls: [
          bi('把锁仓金额上涨都当成新钱', 'Treating every rise in locked value as new money'),
          bi('把活跃地址变多当成使用的人变多', 'Treating more active addresses as more people using it')
        ],
        practice: bi('锁仓金额变动时，先看锁着的数量有没有一起变。', 'When locked value moves, first see whether the locked quantity moved with it.'),
        check: {
          ask: bi('锁仓金额涨了一截，锁着的数量没变，这段上涨该怎么看？', 'Locked value rose a notch, and the locked quantity did not change, how should you read this rise?'),
          options: [
            opt('A', '先看活跃地址，金额可以后看', 'Watch active addresses first, and the value can wait'),
            opt('B', '金额涨了就是有人在锁，趋势通常更稳', 'A higher value means people are locking, so the trend is usually steadier'),
            opt('C', '数量没变说明统计坏了，通常别用', 'Unchanged quantity means the count is broken, so usually do not use it'),
            opt('D', '多半是币价抬的，没有新钱，常常更脆', 'Mostly the coin price lifting it, no new money, often more fragile')
          ],
          answer: 'D',
          note: bi('数量不变、只是币价抬高金额，这段上涨常常更脆。', 'Unchanged quantity with only the coin price lifting the value means this rise is often more fragile.'),
          miss: bi('数量不变、只是币价抬高金额，这段上涨常常更脆。', 'Unchanged quantity with only the coin price lifting the value means this rise is often more fragile.')
        },
        quizzes: [
          quiz('数量和金额一起升，和只是价格抬上去相比，通常怎样？', 'Quantity and value rise together, compared with price alone lifting it, what is it usually like?', [
            opt('A', '两种都是新钱，读法一样', 'Both are new money, so the read is the same'),
            opt('B', '数量一起升常常更脆，因为锁得更多', 'Quantity rising with it is often more fragile, because more is locked'),
            opt('C', '更像有新钱，趋势常常更稳', 'More like new money, and the trend is often steadier'),
            opt('D', '金额不该跟数量一起看', 'Value should not be read together with quantity')
          ], 'C', {
            A: ['只是价格抬上去没有新钱，两种读法不一样。', 'Price alone lifting it is not new money, so the two reads are different.'],
            B: ['数量一起增加更像新钱，不是更脆。', 'Quantity rising with it looks more like new money, not more fragile.'],
            C: ['数量和金额一起升，更像有新钱，趋势常常更稳。', 'When quantity and value rise together, it looks more like new money, and the trend is often steadier.'],
            D: ['要拆开看，不是不要一起看。', 'You split them apart, and you do not refuse to look at them together.']
          }),
          quiz('锁仓金额掉了，数量差不多，币价也在跌，更常见的读法是？', 'Locked value fell, the quantity is about the same, and the coin price is falling too, what is the more common read?', [
            opt('A', '多半是币价掉下来，不一定是大家在撤资', 'Mostly the coin price falling, not necessarily everyone pulling money out'),
            opt('B', '金额一掉通常就是资金在逃', 'A falling value usually means money is fleeing'),
            opt('C', '数量没变，金额不该掉，数据通常错了', 'If quantity is unchanged the value should not fall, so the data is usually wrong'),
            opt('D', '先看活跃地址少没少，金额是附带的', 'First see whether active addresses fell, and the value is secondary')
          ], 'A', {
            A: ['数量差不多、币价在跌，金额掉下来多半是计价，不一定是撤资。', 'With quantity about the same and the coin price falling, a lower value is mostly valuation, not necessarily withdrawals.'],
            B: ['没有新钱离开的证据时，不能把金额下跌读成资金在逃。', 'Without evidence that money left, a lower value cannot be read as money fleeing.'],
            C: ['币价跌了，金额可以在数量不变时一起掉。', 'When the coin price falls, the value can fall with it while quantity stays unchanged.'],
            D: ['这一问先拆价格和数量，活跃地址不是第一步。', 'This question splits price from quantity first, and active addresses are not the first step.']
          }),
          quiz('巨鲸从自己的冷钱包转到自己的另一个地址，金额很大，该怎么读？', 'A large holder moves coins from one of their own cold wallets to another address of their own, and the amount is large, how do you read it?', [
            opt('A', '金额大就通常是在出货', 'A large amount is usually distribution'),
            opt('B', '从哪到哪都是自己的，不能写成卖出', 'Both ends are their own, so it cannot be written as a sale'),
            opt('C', '冷钱包一动，通常马上进交易所', 'Once a cold wallet moves, it usually enters an exchange at once'),
            opt('D', '地址变了，活跃地址变多就是人变多', 'The address changed, so more active addresses means more people')
          ], 'B', {
            A: ['金额大不是出货，出货要看到交易所或成交。', 'A large amount is not distribution, and distribution shows up at an exchange or in a trade.'],
            B: ['巨鲸转账要看从哪到哪，自己转给自己不能写成卖出。', 'A large-holder transfer is read by where it came from and where it went, and a move to their own address cannot be written as a sale.'],
            C: ['冷钱包转到自己的地址，不是马上进交易所。', 'A move from a cold wallet to their own address is not an immediate deposit to an exchange.'],
            D: ['一个控制者换地址，不是使用的人变多。', 'One controller changing addresses is not more people using it.']
          })
        ],
        study: { kind: 'panel', headers: [bi('数量', 'Quantity'), bi('价格', 'Price'), bi('金额', 'Value')], cells: [['100', '2000', '200000'], ['100', '2500', '250000'], ['110', '2500', '275000']], rows: [
          bi('第二行涨了两成五，数量没变。', 'The second row is up by a quarter, and the quantity did not change.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
