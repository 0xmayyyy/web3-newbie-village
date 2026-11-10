(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['06'] = {
    title: bi('链上数据与资金流向', 'On-chain data and flows'),
    lessons: [
      lesson({
        id: '01', title: bi('区块浏览器：成功不等于到账', 'A block explorer: success is not the same as arrival'),
        scene: bi('浏览器显示成功，钱就一定到了你认识的那个地址吗？', 'The explorer says success. Did the funds necessarily reach the address you know?'),
        one: bi('先核对链、代币合约和收款地址。成功只说明这笔模拟交易被打包，不说明收款人是你以为的那一个。', 'Check the chain, the token contract, and the recipient first. Success only means this simulated transaction was included. It does not mean the recipient is the one you expected.'),
        explain: bi('浏览器要看链的名字，而不是只看代币符号。\n同名代币可以是另一份合约。\n确认数增加，表示后面又接上了区块，不是收款身份证明。\n本课数据全部是模拟，不提供真实浏览器链接。', 'An explorer is read by the chain name, not by the token symbol alone.\nA token with the same name can be a different contract.\nMore confirmations mean later blocks were added. They are not proof of who the recipient is.\nEvery figure in this lesson is simulated. There is no real explorer link.'),
        example: bi('模拟链 DemoChain，交易 DEMO_TX_001，区块 1001。\n金额 100 DEMO_USDT，确认数 3。\n这些字段都要单独看。成功状态不能代替地址核对。', 'Simulated chain DemoChain, transaction DEMO_TX_001, block 1001.\nAmount 100 DEMO_USDT, 3 confirmations.\nEach field is read on its own. A success status does not replace checking the address.'),
        pitfalls: [bi('只看成功两个字', 'Reading only the word success'), bi('同名代币当成同一份资产', 'Treating a same-name token as the same asset')],
        practice: bi('指出模拟卡片上的链名、交易号和金额，并说明还缺哪一项核对。', 'Point to the chain name, transaction id, and amount on the simulated card, and say which check is still missing.'),
        check: { ask: bi('成功是否等于到了你认识的收款人？', 'Does success mean it reached the recipient you know?'), options: [opt('A', '等于', 'Yes'), opt('B', '否', 'No'), opt('C', '确认数大于 1 就等于', 'Yes once confirmations exceed 1')], answer: 'B', miss: bi('成功只说明交易被打包。地址和合约仍要另核。', 'Success only means the transaction was included. The address and contract still need their own checks.') },
        quizzes: [
          quiz('要核对链吗？', 'Do you need to check the chain?', [opt('A', '要', 'Yes'), opt('B', '不用', 'No'), opt('C', '只看金额就行', 'The amount is enough')], 'A', { A: ['同名代币可以出现在另一条链或另一份合约上。', 'A token of the same name can sit on another chain or another contract.'], B: ['不看链，就无法知道这张卡片属于哪本账。', 'Without the chain, you cannot tell which ledger the card belongs to.'], C: ['金额对了，链错了，资产仍然不是那一个。', 'A correct amount on the wrong chain is still not that asset.'] }),
          quiz('成功是否等于你认识的收款人已经收到？', 'Does success mean the recipient you know has received it?', [opt('A', '等于', 'Yes'), opt('B', '否', 'No'), opt('C', '三笔确认就等于', 'Yes at three confirmations')], 'B', { A: ['成功没有包含“收款地址是你核对过的那一个”。', 'Success does not include “the recipient is the address you checked.”'], B: ['地址、合约和链都要另外看。', 'Address, contract, and chain each need their own look.'], C: ['确认数不是身份证明。', 'A confirmation count is not proof of identity.'] }),
          quiz('同名代币就是同一份代币吗？', 'Is a same-name token the same token?', [opt('A', '是', 'Yes'), opt('B', '否', 'No'), opt('C', '符号一样就是', 'Yes if the symbol matches')], 'B', { A: ['名字可以复制，合约地址不能靠名字代替。', 'A name can be copied. A contract address cannot be replaced by a name.'], B: ['要核对合约，而不是只核对符号。', 'Check the contract, not only the symbol.'], C: ['符号相同仍然可能是另一份合约。', 'The same symbol can still be a different contract.'] })
        ],
        study: { kind: 'panel', headers: ['字段', '模拟值'], cells: [['链', 'DemoChain'], ['交易', 'DEMO_TX_001'], ['区块', '1001'], ['金额', '100 DEMO_USDT'], ['确认', '3']], rows: [bi('教学模拟。成功不等于收款人已被你核对。', 'Teaching simulation. Success does not mean you have checked the recipient.')] }
      }),
      lesson({
        id: '02', title: bi('交易所净流入：进交易所不等于卖掉', 'Exchange netflow: coins in do not mean coins sold'),
        scene: bi('净流入 +300，是不是已经卖掉了 300？', 'Net inflow is +300. Have 300 already been sold?'),
        one: bi('净流入只统计外部进出。内部划转不算。进交易所也不等于已经成交卖出。', 'Net inflow counts only external deposits and withdrawals. Internal transfers do not count. Coins entering an exchange are not the same as coins already sold.'),
        explain: bi('外部流入减去外部流出，得到净流入。\n同一平台内部从钱包划到现货，不改变平台整体的外部净额。\n未知标签要单独列出，不能塞进净流入。\n标签不完整时，净额会被算错。', 'External inflow minus external outflow is the net inflow.\nMoving from a wallet to spot inside the same platform does not change the platform’s external net.\nUnknown labels are listed separately. They are not pushed into the net inflow.\nIncomplete labels can make the net wrong.'),
        example: bi('流入 1000，流出 700，内部划转 500。\n内部划转排除后，净流入=1000−700=+300。\n未知 200 另外列出。\n+300 不是“已经卖掉 300”。', 'Inflow 1000, outflow 700, internal transfer 500.\nAfter excluding the internal transfer, net inflow=1000−700=+300.\nUnknown 200 is listed separately.\n+300 is not “300 has been sold.”'),
        pitfalls: [bi('把内部划转算进净流入', 'Counting an internal transfer in net inflow'), bi('把净流入当成已经卖出', 'Treating net inflow as coins already sold')],
        practice: bi('用 1000 和 700 算出 +300，并排除 500 的内部划转。', 'Use 1000 and 700 to get +300, and exclude the internal transfer of 500.'),
        check: { ask: bi('内部划转算进净流入吗？', 'Does an internal transfer count in net inflow?'), options: [opt('A', '算', 'Yes'), opt('B', '不算', 'No'), opt('C', '只算一半', 'Only half')], answer: 'B', miss: bi('内部划转没有改变外部进出。', 'An internal transfer does not change external deposits and withdrawals.') },
        quizzes: [
          quiz('内部划转算进净流入吗？', 'Does an internal transfer count in net inflow?', [opt('A', '算', 'Yes'), opt('B', '不算', 'No'), opt('C', '未知标签才不算', 'Only unknown labels are excluded')], 'B', { A: ['内部划转没有新的外部币进入或离开。', 'An internal transfer does not bring new external coins in or out.'], B: ['净额只用外部流入减外部流出。', 'The net uses external inflow minus external outflow only.'], C: ['未知标签也不塞进净额，但内部划转本来就排除。', 'Unknown labels are also kept out of the net, but internal transfers are excluded on their own.'] }),
          quiz('净流入 +300 等于卖掉 300 吗？', 'Does a net inflow of +300 mean 300 was sold?', [opt('A', '等于', 'Yes'), opt('B', '否', 'No'), opt('C', '过了 24 小时就等于', 'Yes after 24 hours')], 'B', { A: ['进入交易所还可以继续放着，没有成交记录就不能说已卖。', 'Coins can sit on the exchange. Without a trade record you cannot say they were sold.'], B: ['+300 只是外部净进入的数量。', '+300 is only the external net amount that entered.'], C: ['时间过去也不会自动把转入变成卖出。', 'Time passing does not automatically turn a deposit into a sale.'] }),
          quiz('标签不完整会不会影响净额？', 'Can incomplete labels change the net?', [opt('A', '会', 'Yes'), opt('B', '不会', 'No'), opt('C', '只影响未知 200', 'Only the unknown 200')], 'A', { A: ['把外部流转错标成内部，净额就会变。', 'Mislabelling an external flow as internal changes the net.'], B: ['口径依赖标签。标签错了，加减的集合就错了。', 'The measure depends on labels. Wrong labels mean the wrong set is added and subtracted.'], C: ['未知 200 只是其中一项。其他错标也会影响。', 'The unknown 200 is only one item. Other mislabels matter too.'] })
        ],
        study: { kind: 'panel', headers: ['项目', '数量'], cells: [['外部流入', '1000'], ['外部流出', '700'], ['内部划转', '500（排除）'], ['净流入', '+300'], ['未知', '200']], rows: [bi('净流入不是已卖出。', 'Net inflow is not coins already sold.')] }
      }),
      lesson({
        id: '03', title: bi('稳定币增发：Mint 不等于买盘', 'Stablecoin minting: a mint is not buying pressure'),
        scene: bi('一条链上增发了，是不是就有人拿去买比特币？', 'A chain minted new supply. Did someone use it to buy bitcoin?'),
        one: bi('单链增发不等于全网供应上升，增发也不等于买盘。跨链还要多条链一起核对。', 'A mint on one chain is not a rise in supply across all chains. A mint is also not buying pressure. A cross-chain move has to be checked on more than one chain.'),
        explain: bi('先分清这条链和全网。\n一条链 mint，另一条链 burn，两边金额相同也不等于已经证明是一笔桥。\n增发本身没有“必须买入 BTC”的动作。\n要看供应变化，就得把相关链放在一起。', 'Separate this chain from the whole network.\nA mint on one chain and a burn on another, even for the same amount, is not proof of a bridge.\nA mint itself contains no action that says “must buy BTC.”\nTo read a supply change, put the relevant chains together.'),
        example: bi('链 A mint 1 亿，链 B burn 1 亿。\n两边相加的变化可以是 0。\n金额相同仍不足以证明桥接。\n也不能把 A 的 mint 当成 BTC 买盘。', 'Chain A mints 100 million and chain B burns 100 million.\nThe sum of the two changes can be 0.\nThe same amount is still not enough to prove a bridge.\nA’s mint also cannot be read as BTC buying.'),
        pitfalls: [bi('单链增发当成总供应上升', 'Reading a single-chain mint as a rise in total supply'), bi('把 mint 写成买盘', 'Writing a mint down as buying pressure')],
        practice: bi('把 A 的 +1 亿和 B 的 −1 亿加总，看合计是否为 0。', 'Add A’s +100 million and B’s −100 million and see whether the sum is 0.'),
        check: { ask: bi('单链 mint 是否一定让总供应上升？', 'Does a single-chain mint necessarily raise total supply?'), options: [opt('A', '一定', 'Yes'), opt('B', '不一定', 'Not necessarily'), opt('C', '稳定币一定', 'Yes for stablecoins')], answer: 'B', miss: bi('另一条链可以同时 burn 同样的数量。', 'Another chain can burn the same amount at the same time.') },
        quizzes: [
          quiz('单链增发是否表示总供应一定上升？', 'Does a single-chain mint mean total supply must rise?', [opt('A', '一定', 'Yes'), opt('B', '不一定', 'Not necessarily'), opt('C', '只有美元稳定币一定', 'Only for dollar stablecoins')], 'B', { A: ['别的链上的销毁可以对冲这一笔增发。', 'A burn on another chain can offset this mint.'], B: ['A mint 1 亿、B burn 1 亿，合计可以是 0。', 'A mints 100 million and B burns 100 million. The sum can be 0.'], C: ['计价货币不改变“要看多链”这件事。', 'The quote currency does not remove the need to look at several chains.'] }),
          quiz('Mint 是否等于有人买比特币？', 'Does a mint mean someone bought bitcoin?', [opt('A', '等于', 'Yes'), opt('B', '不是', 'No'), opt('C', '一小时后等于', 'Yes after one hour')], 'B', { A: ['增发记录里没有买入 BTC 这个动作。', 'A mint record does not contain a BTC purchase.'], B: ['供应变化和买盘是两件事。', 'A supply change and buying pressure are two different things.'], C: ['时间过去不会自动把 mint 变成买单。', 'Time passing does not turn a mint into a buy.'] }),
          quiz('跨链判断要不要多链一起看？', 'For a cross-chain claim, do you look at several chains together?', [opt('A', '要', 'Yes'), opt('B', '不用', 'No'), opt('C', '看符号就够', 'The symbol is enough')], 'A', { A: ['单链的 mint 看不到另一条链有没有 burn。', 'A mint on one chain does not show whether another chain burned.'], B: ['只看一条链，合计供应可能算错。', 'Looking at one chain can mis-count combined supply.'], C: ['符号相同不能代替另一条链的记录。', 'The same symbol does not replace the other chain’s record.'] })
        ],
        study: { kind: 'panel', headers: ['链', '变化'], cells: [['A', 'mint 1 亿'], ['B', 'burn 1 亿'], ['合计', '0']], rows: [bi('金额相同不等于已经证明是桥。也不是 BTC 买盘。', 'The same amount is not proof of a bridge. It is also not BTC buying.')] }
      }),
      lesson({
        id: '04', title: bi('TVL 与巨鲸：估值涨不等于流入', 'TVL and large holders: a higher valuation is not an inflow'),
        scene: bi('TVL 涨了 25%，是不是就有新资金进来？', 'TVL rose 25%. Did new money come in?'),
        one: bi('TVL 会随价格变动。数量不变时，价格上涨也会让 TVL 变大。活跃地址不是用户人数，大额转账也不是卖出。', 'TVL moves with price. If the quantity is unchanged, a higher price still makes TVL larger. Active addresses are not users, and a large transfer is not a sale.'),
        explain: bi('TVL 的一块可以写成数量×价格。\n只改价格、不改数量，TVL 仍会变。\n活跃地址可以是程序或同一个控制者的多个地址。\n巨鲸转账要看从哪到哪，不能直接写成卖出。', 'One piece of TVL can be written as quantity×price.\nChange only the price and TVL still changes.\nAn active address can be a program, or one controller using several addresses.\nA large transfer depends on where it went. It cannot be written down as a sale immediately.'),
        example: bi('100 ETH × 2000=200000。\n价格到 2500，数量仍是 100，TVL=250000，涨 25%。\n110×2500=275000，这时数量也变了。\n25% 的涨幅单独看，不能区分是价格还是流入。', '100 ETH × 2000=200000.\nAt a price of 2500, quantity is still 100, so TVL=250000, up 25%.\n110×2500=275000, and then the quantity changed too.\nA 25% rise by itself cannot tell price from inflow.'),
        pitfalls: [bi('把 TVL 上涨都当成资金流入', 'Treating every TVL rise as an inflow'), bi('把活跃地址数当成人数', 'Treating active-address counts as people')],
        practice: bi('用 100 和 2000、2500 算出 200000 与 250000。', 'Use 100 with 2000 and 2500 to get 200000 and 250000.'),
        check: { ask: bi('数量不变、价格从 2000 到 2500，TVL 涨了多少？', 'Quantity unchanged, price from 2000 to 2500. How much did TVL rise?'), options: [opt('A', '25%', '25%'), opt('B', '0', '0'), opt('C', '10 枚', '10 coins')], answer: 'A', miss: bi('250000/200000−1=25%。数量没有增加。', '250000/200000−1=25%. The quantity did not increase.') },
        quizzes: [
          quiz('TVL 上涨 25% 是否一定是资金流入？', 'Does a 25% TVL rise necessarily mean inflows?', [opt('A', '一定', 'Yes'), opt('B', '不一定', 'Not necessarily'), opt('C', '只要是 ETH 就一定', 'Yes if it is ETH')], 'B', { A: ['100 枚不变、价格从 2000 到 2500，TVL 也会 +25%。', 'With 100 units unchanged and price from 2000 to 2500, TVL is also +25%.'], B: ['要拆开价格效应和数量效应。', 'Split the price effect from the quantity effect.'], C: ['换成别的资产，数量×价格仍然一样会混在一起。', 'For another asset, quantity×price still mixes the two.'] }),
          quiz('活跃地址等于用户人数吗？', 'Do active addresses equal users?', [opt('A', '等于', 'Yes'), opt('B', '不是', 'No'), opt('C', '大于 100 就等于', 'Yes above 100')], 'B', { A: ['一个控制者可以有很多地址，程序也可以发交易。', 'One controller can use many addresses, and a program can send transactions.'], B: ['地址数不是人头数。', 'An address count is not a head count.'], C: ['数量阈值不能把地址变成用户。', 'A count threshold does not turn addresses into users.'] }),
          quiz('巨鲸转账是否等于卖出？', 'Does a large-holder transfer equal a sale?', [opt('A', '等于', 'Yes'), opt('B', '不一定', 'Not necessarily'), opt('C', '转入交易所才一定不是', 'It is certainly not a sale only if it enters an exchange')], 'B', { A: ['转给自己的另一个地址，或者转入托管，都还不是卖出成交。', 'Moving to another address of the same holder, or into custody, is not yet a sale.'], B: ['要看从哪转到哪，以及有没有成交。', 'Look at the source, the destination, and whether a trade happened.'], C: ['转入交易所更不能反过来证明“一定不是卖出”，它仍可能之后才卖。', 'A deposit to an exchange does not prove it is certainly not a sale. It may be sold later. It is still not the sale itself.'] })
        ],
        study: { kind: 'panel', headers: ['数量', '价格', 'TVL'], cells: [['100', '2000', '200000'], ['100', '2500', '250000'], ['110', '2500', '275000']], rows: [bi('第二行涨 25%，数量没变。', 'The second row is up 25% with unchanged quantity.')] }
      })
    ]
  };
})(window.STAR_PACK);
