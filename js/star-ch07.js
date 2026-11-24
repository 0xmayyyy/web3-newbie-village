(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['07'] = {
    title: bi('项目研究与市场叙事', 'Project research and narratives'),
    lessons: [
      lesson({
        id: '01', title: bi('项目研究：别只看币价', 'Project research: do not look only at the coin price'),
        scene: bi('合作公告、收入帖和推广一起出来，价格先涨，能当成证据吗？', 'A partnership post, a revenue post, and promotion show up together and price rises first, can that count as evidence?'),
        one: bi('合作公告、集中推广和收入帖可以先把价格打上去，核对不上使用证据时常常再跌回去。', 'Partnership posts, concentrated promotion, and revenue posts can push price up first, and it often falls back when the usage evidence does not check out.'),
        explain: bi('研究时把每句话分成声称、已核对、还不知道。\n虚构项目星桥协议只作教学。\n地址数不是人数。\n代币能不能分到收入，要看机制，不看它涨过没有。\n项目新闻常见三类：合作公告、集中推广、收入帖。', 'In research, mark each sentence as claimed, checked, or still unknown.\nThe fictional project Starbridge Protocol is for teaching only.\nAn address count is not a head count.\nWhether the token receives revenue depends on the mechanism, not on whether it has risen.\nProject news usually comes in three kinds: partnership posts, concentrated promotion, and revenue posts.'),
        topic: {
          title: bi('项目新闻出来时，价格通常怎么走', 'When project news hits, what price usually does'),
          body: bi('合作公告刚出、证据还没核对时，价格常常先跟着冲一段。\n推广把注意力带过来时，也常常先冲，喊的人常常比使用的人更多。\n收入帖若只有网页上的一句话，涨可以只是热度。\n使用数据对不上说法时，这段冲劲常常回落。\n规则里没有把收入分给持币人，这轮上涨常常只是交易出来的。\n证据不足也可以热很久，不要当成迟早会跌就去做空。', 'When a partnership post is fresh and the evidence is not checked yet, price often runs with it for a stretch first.\nWhen promotion brings the attention, it also often runs first, and the people calling it out often outnumber the users.\nIf a revenue post is only one sentence on a page, the rise can be only attention.\nWhen usage does not match the claims, that push often fades.\nIf the rules do not share revenue with holders, this rise is often just trading.\nThin evidence can also stay hot for a long time, so do not short it as if it will fall sooner or later.')
        },
        example: bi('教学模拟：网页写收入很高，核对前只能标成声称。\n地址 10 万不能写成 10 万个用户。\n这种帖子先热起来时，价格可以先涨，证据迟迟没有，常常再跌回去。', 'Teaching simulation: a page that says revenue is high can only be marked claimed until you check it.\n100,000 addresses cannot be written as 100,000 users.\nWhen this kind of post heats up first, price can rise first, and if the evidence stays missing it often falls back.'),
        pitfalls: [
          bi('把地址数写成用户人数', 'Writing an address count as a user count'),
          bi('把没核对的公告当成上涨的理由', 'Treating an unchecked post as a reason for the rise')
        ],
        practice: bi('看到合作公告或收入帖时，先标成声称，再找能不能复核的使用数据。', 'When you see a partnership post or a revenue post, mark it claimed first, then look for usage data you can re-check.'),
        check: {
          ask: bi('合作公告刚出，使用证据对不上，价格已经先涨过一截，后面更常见的是？', 'A partnership post is fresh, the usage evidence does not match, and price already rose a notch, what is more common next?'),
          options: [
            opt('A', '公告出来通常还要再涨一段', 'Once the post is out it usually rises for another stretch'),
            opt('B', '推广一多，证据就会补上', 'Once promotion picks up, the evidence gets filled in'),
            opt('C', '冲劲常常回落', 'The push often fades'),
            opt('D', '收入帖比合作公告更硬，可以当已核对', 'A revenue post is harder than a partnership, so it can count as checked')
          ],
          answer: 'C',
          note: bi('公告对不上使用证据，先涨过的那一截常常回落。', 'When the post does not match the usage evidence, the stretch that already rose often fades.'),
          miss: bi('公告对不上使用证据，先涨过的那一截常常回落。', 'When the post does not match the usage evidence, the stretch that already rose often fades.')
        },
        quizzes: [
          quiz('网页写收入很高，你还没看到来源，价格正在涨，该怎么看？', 'The page says revenue is high, you have not seen a source, and price is rising, how should you read it?', [
            opt('A', '价格在涨，收入多半是真的', 'Price is rising, so the revenue is mostly real'),
            opt('B', '收入帖通常比公告更接近已核对', 'A revenue post is usually closer to checked than an announcement'),
            opt('C', '先看有没有人在推广，来源可以后补', 'First see whether anyone is promoting it, and the source can be added later'),
            opt('D', '这仍是声称，涨可以只是热度', 'It is still a claim, and the rise can be only attention')
          ], 'D', {
            A: ['价格涨过，证明不了收入。', 'A rise in price does not prove the revenue.'],
            B: ['收入帖在核对前同样只是声称。', 'A revenue post is also only a claim before it is checked.'],
            C: ['推广带来的是关注，不是来源，来源不能后补成已核对。', 'Promotion brings attention, not a source, and a source cannot be added later and counted as checked.'],
            D: ['没看到来源就还是声称，这轮涨可以只是热度。', 'Without a source it is still a claim, and this rise can be only attention.']
          }),
          quiz('规则里没有把收入分给持币人，币价却在涨，通常说明什么？', 'The rules do not share revenue with holders, but the coin is rising, what does that usually say?', [
            opt('A', '涨了规则通常会补上分成', 'Once it rises the rules usually add a share'),
            opt('B', '这轮上涨常常只是交易出来的', 'This rise is often just trading'),
            opt('C', '这种上涨常常更扎实', 'This kind of rise is often more solid'),
            opt('D', '持币人已经在分，只是没写进规则', 'Holders are already sharing, it is just not written in the rules')
          ], 'B', {
            A: ['上涨不会把分成写进规则。', 'A rising price does not write a share into the rules.'],
            B: ['没有分收入的规则时，上涨常常只是交易出来的。', 'Without a rule that shares revenue, the rise is often just trading.'],
            C: ['没有分成的上涨，常常不是更扎实。', 'A rise with no share is often not more solid.'],
            D: ['规则里没有这条路径，就还没在分。', 'If the rules have no such path, the sharing is not happening.']
          }),
          quiz('证据不足，但推广已经持续很久，价格还在涨，这时？', 'The evidence is thin, but the promotion has gone on for a long time and price is still rising, what then?', [
            opt('A', '热可以持续，不要当成迟早会跌', 'Heat can last, so do not treat it as a drop that will come sooner or later'),
            opt('B', '推得久通常就等于证据齐了', 'A long promotion usually means the evidence is complete'),
            opt('C', '推得越久越该做空', 'The longer the promotion, the more you should short'),
            opt('D', '收入帖一出就能把证据补齐', 'One revenue post can complete the evidence')
          ], 'A', {
            A: ['证据不足也可以热很久，不要当成迟早会跌。', 'Thin evidence can stay hot for a long time, so do not treat it as a drop that will come sooner or later.'],
            B: ['推得久仍是关注，不是证据。', 'A long promotion is still attention, not evidence.'],
            C: ['推得久不是做空的理由。', 'A long promotion is not a reason to short.'],
            D: ['一篇收入帖补不齐使用证据。', 'One revenue post does not complete the usage evidence.']
          })
        ],
        study: { kind: 'panel', headers: [bi('说法', 'Statement'), bi('状态', 'Status')], cells: [[bi('用户 10 万', '100,000 users'), bi('声称，不能当成人数', 'Claimed, not a head count')], [bi('收入很高', 'Revenue is high'), bi('未知，待核对', 'Unknown, still to check')], [bi('代币分享收入', 'The token shares revenue'), bi('要看机制', 'Depends on the mechanism')]], rows: [
          bi('虚构项目：星桥协议。', 'Fictional project: Starbridge Protocol.')
        ] }
      }),
      lesson({
        id: '02', title: bi('Tokenomics：供应与解锁', 'Tokenomics: supply and unlocks'),
        scene: bi('大额解锁临近，价格通常先怎样？', 'A large unlock is near, what does price usually do first?'),
        one: bi('解开的量超过流通量几个百分点就算大，临近时价格常常先软，解锁后持有者不动、不转交易所，又常常跌完再弹。', 'An unlock larger than a few percent of the circulating supply counts as large, price is often soft as it nears, and if holders do not move the coins to an exchange afterward it often bounces after the drop.'),
        explain: bi('流通市值是用现在的价格去记能交易的那些币。\nFDV 是用现在的价格去记最大供应，不是已经有人买过的金额。\n教学模拟里，价格是 2，流通是 1 亿。\n悬崖式是一天解开一大笔，线性是按天慢慢放。\n解锁日历上看日期、数量，以及是谁的币。', 'Circulating market cap uses today’s price to mark the coins that can trade.\nFDV uses today’s price to mark the max supply, and it is not cash someone already spent to buy.\nIn the teaching simulation the price is 2, and the circulating supply is 100 million.\nA cliff unlock releases a large chunk on one day, and a gradual unlock releases it slowly by the day.\nOn an unlock calendar you read the date, the amount, and whose coins they are.'),
        topic: {
          title: bi('解锁临近时，价格通常怎么走', 'As an unlock nears, what price usually does'),
          body: bi('解开的数量超过流通量的几个百分点，就算大。\n大额、又是团队或早期持有者、又是悬崖式，价格常常提前变软。\n币解开后被转到交易所，后面常常真的有卖压。\n解锁后持有者不动、不转交易所，常常是利空出尽，跌完再弹。\n线性解锁每天只有一小截，压力常常比悬崖式轻。\n流通很少、FDV 很大的币，容易先被拉得很凶，大额解锁一到就更重。', 'An amount above a few percent of the circulating supply counts as large.\nA large cliff unlock that belongs to the team or early holders often softens price ahead of time.\nCoins that are unlocked and then moved to an exchange often bring real selling afterward.\nIf after the unlock the holders do not move the coins to an exchange, it is often used-up bad news, a drop and then a bounce.\nA gradual unlock is only a small slice each day, and the pressure is often lighter than a cliff.\nA coin with a small float and a large FDV is easy to run up hard, and it gets heavier once a large unlock arrives.')
        },
        example: bi('教学模拟：再解锁 5000 万，流通从 1 亿变成 1.5 亿。\n这是流通量的一半，远超几个百分点。\n真正的压力，要看这些币会不会进交易所。', 'Teaching simulation: another 50 million unlocks, and the circulating supply goes from 100 million to 150 million.\nThat is half of the circulating supply, far beyond a few percent.\nThe real pressure is whether these coins enter an exchange.'),
        pitfalls: [
          bi('把 FDV 当成已经买入的金额', 'Treating FDV as cash already spent to buy'),
          bi('把线性解锁也读成悬崖式的一天砸盘', 'Reading a gradual unlock as a one-day cliff dump')
        ],
        practice: bi('在解锁日历上先看数量占流通量的多少，再看是悬崖式还是线性。', 'On the unlock calendar, first see how much of the circulating supply the amount is, then see whether it is a cliff or gradual.'),
        check: {
          ask: bi('解锁日前价格已经软了一截，当天持有者不动、也不转交易所，后面更常见的是？', 'Price already softened a notch before the unlock day, and that day the holders do not move the coins to an exchange, what is more common next?'),
          options: [
            opt('A', '常常跌完再弹', 'Often bounces after the drop'),
            opt('B', '不转交易所也等于已经在卖', 'Not moving to an exchange still counts as already selling'),
            opt('C', '悬崖式没来就通常还要再软', 'If the cliff has not arrived it usually stays soft'),
            opt('D', '线性解锁也会在当天集中砸完', 'A gradual unlock also dumps in one pile that day')
          ],
          answer: 'A',
          note: bi('跌已经走在前面，解锁后持有者不动、不转交易所，常常跌完再弹。', 'When the drop already ran ahead, and holders do not move the coins to an exchange after the unlock, it often bounces after the drop.'),
          miss: bi('跌已经走在前面，解锁后持有者不动、不转交易所，常常跌完再弹。', 'When the drop already ran ahead, and holders do not move the coins to an exchange after the unlock, it often bounces after the drop.')
        },
        quizzes: [
          quiz('团队的悬崖式解锁正在转入交易所，后面常常？', 'The team’s cliff unlock is moving into an exchange, what often follows?', [
            opt('A', '进交易所通常是锁得更久', 'Entering an exchange usually means locking for longer'),
            opt('B', '线性的那一截常常更大', 'The gradual slice is often larger'),
            opt('C', '卖压上来，价格偏软', 'Selling comes in, and price leans soft'),
            opt('D', '占流通量很小也可以先忽略', 'A small share of the float can be ignored first')
          ], 'C', {
            A: ['进交易所是可卖的库存变多，不是锁得更久。', 'Entering an exchange means more inventory that can be sold, not a longer lock.'],
            B: ['悬崖式是一天一大笔，不是线性的那一截更大。', 'A cliff is a large chunk on one day, not a gradual slice that is larger.'],
            C: ['解开的币进交易所，后面常常有卖压，价格偏软。', 'Unlocked coins entering an exchange often bring selling, and price leans soft.'],
            D: ['超过流通量几个百分点就算大，不能先忽略。', 'Above a few percent of the circulating supply counts as large, so it is not ignored first.']
          }),
          quiz('每天只放开一小截的线性解锁，和悬崖式相比，压力常常？', 'A gradual unlock that releases only a small slice each day, compared with a cliff, the pressure is often?', [
            opt('A', '常常更重，因为天天都有', 'Often heavier, because it happens every day'),
            opt('B', '常常更轻', 'Often lighter'),
            opt('C', '两种日历读法一样', 'The two calendar reads are the same'),
            opt('D', '线性的更该在第一天做空', 'The gradual one is the better short on day one')
          ], 'B', {
            A: ['每天一小截，通常没有悬崖式那一天重。', 'A small slice each day is usually not as heavy as the cliff day.'],
            B: ['线性解锁的压力常常比悬崖式轻。', 'The pressure of a gradual unlock is often lighter than a cliff.'],
            C: ['悬崖式和线性不是同一种日历。', 'A cliff and a gradual unlock are not the same calendar.'],
            D: ['更轻的那一种，不是更该在第一天做空。', 'The lighter kind is not the better short on day one.']
          }),
          quiz('解开的量超过流通量几个百分点，又是悬崖式，临近该防什么？', 'The unlock is more than a few percent of the circulating supply, and it is a cliff, what do you watch for as it nears?', [
            opt('A', '防钱包余额被砍掉一截', 'Watch for wallet balances being cut'),
            opt('B', '防 FDV 变成已经成交的钱', 'Watch for FDV turning into cash that already traded'),
            opt('C', '防线性的那一截被提前算进今天', 'Watch for the gradual slice being counted into today early'),
            opt('D', '防价格提前变软，当天还可能更重', 'Watch for price softening ahead of time, and for the day itself getting heavier')
          ], 'D', {
            A: ['解锁不会把已有余额砍掉。', 'An unlock does not cut existing balances.'],
            B: ['FDV 本来就不是成交额。', 'FDV was never traded cash.'],
            C: ['这是悬崖式，不是把线性的一截算进今天。', 'This is a cliff, not a gradual slice counted into today.'],
            D: ['大额悬崖式临近，价格常常提前变软，币若进交易所还会更重。', 'As a large cliff nears, price often softens ahead of time, and it gets heavier if the coins enter an exchange.']
          })
        ],
        study: { kind: 'panel', headers: [bi('项目', 'Item'), bi('数值', 'Value')], cells: [[bi('价格', 'Price'), '2'], [bi('流通', 'Circulating'), bi('1 亿', '100 million')], [bi('最大供应', 'Max supply'), bi('10 亿', '1 billion')], [bi('流通市值', 'Circulating market cap'), bi('2 亿', '200 million')], ['FDV', bi('20 亿', '2 billion')], [bi('解锁后再计流通市值', 'Circulating market cap after the unlock'), bi('3 亿', '300 million')]], rows: [
          bi('解锁 5000 万后，按原价计，流通市值是 3 亿。', 'After unlocking 50 million, at the same price, circulating market cap is 300 million.'),
          bi('解锁 5000 万后，流通从 1 亿变成 1.5 亿。', 'After unlocking 50 million, the circulating supply goes from 100 million to 150 million.')
        ] }
      }),
      lesson({
        id: '03', title: bi('市场叙事：热度不是基本面', 'Narratives: attention is not fundamentals'),
        scene: bi('板块里冒出新故事时，你先看什么？', 'When a new story shows up in the sector, what do you look at first?'),
        one: bi('叙事很热时价格常常先跑在使用前面，龙头一见顶跟风常常先跌，圈外的人开始谈论这枚币时往往已经不早。', 'When a narrative is hot price often runs ahead of usage, copycats often drop first once the leader tops, and when people outside crypto start talking about the coin it is often already late.'),
        explain: bi('讨论变多，可以是少数账号反复发，不是用户变多。\n同一个板块里，先看龙头，再看跟风。\n大所上币的公告，常常让价格先冲一段。\n圈外的人，比如不看盘的朋友也开始谈这枚币，往往是热度已经传到外面。\n薄盘口时，吃掉前几档会让价格跳一截，随后常常吐回一部分。', 'More discussion can be a few accounts posting again and again, not more users.\nIn one sector, watch the leader first, then the copycats.\nA listing post from a big exchange often makes price run for a stretch first.\nWhen people outside crypto, such as friends who do not watch the book, start talking about the coin, the heat has often already spread outside.\nWhen the order book is thin, taking the first levels makes price jump, and it often gives some of that back afterward.'),
        topic: {
          title: bi('叙事换挡时，谁先跌', 'When the narrative rotates, who drops first'),
          body: bi('一个叙事刚热起来，相关的币常常一起涨，而且涨在使用数据前面。\n钱从旧故事转到新故事时，旧的那一边即使产品没变，价格也常常退。\n龙头见顶之后，同板块的跟风币常常先跌。\n大所上币的消息可以再冲一段，上完若没有新增使用，常常再吐回去。\n圈外的人开始谈论，常常说明这一段已经不早。\n真的有使用在增加的叙事，退潮会慢一些。', 'When a narrative first gets hot, the related coins often rise together, and they rise ahead of the usage data.\nWhen money rotates from an old story to a new one, the old side often fades even if the product did not change.\nAfter the leader tops, the copycats in the same sector often drop first.\nA big-exchange listing can push another stretch, and if usage does not grow after it, the move often gets given back.\nWhen people outside crypto start talking, it often means this stretch is already late.\nA narrative that really has rising usage fades more slowly.')
        },
        example: bi('教学模拟：龙头还在高位，跟风币先掉了下来。\n这常常是板块在退，不是跟风自己出了坏消息。\n若这时大所又发了上币公告，跟风仍可能再冲一下，然后更容易吐回去。', 'Teaching simulation: the leader is still high, and the copycats fall first.\nThat is often the sector fading, not the copycat releasing its own bad news.\nIf a big exchange then posts a listing, the copycat can still push once more, and it is easier for that push to be given back.'),
        pitfalls: [
          bi('龙头见顶还去追跟风', 'Chasing copycats after the leader has topped'),
          bi('把圈外的谈论当成刚开始', 'Treating talk from outside crypto as the start')
        ],
        practice: bi('先找这个板块的龙头，再看跟风是不是已经先跌。', 'First find the leader of this sector, then see whether the copycats have already dropped first.'),
        check: {
          ask: bi('龙头还没跌，跟风币已经先掉下来，这更常见的读法是？', 'The leader has not fallen, and the copycats have already dropped, what is the more common read?'),
          options: [
            opt('A', '跟风先跌通常是自己的坏消息', 'Copycats dropping first is usually their own bad news'),
            opt('B', '板块在退，跟风常常先跌', 'The sector is fading, and copycats often drop first'),
            opt('C', '圈外的人还没谈，所以还早', 'People outside crypto have not talked yet, so it is still early'),
            opt('D', '龙头还在就应该抄跟风', 'While the leader is still up you should buy the copycats')
          ],
          answer: 'B',
          note: bi('龙头见顶前后，跟风常常先跌，这是板块在退。', 'Around the time the leader tops, copycats often drop first, and that is the sector fading.'),
          miss: bi('龙头见顶前后，跟风常常先跌，这是板块在退。', 'Around the time the leader tops, copycats often drop first, and that is the sector fading.')
        },
        quizzes: [
          quiz('大所刚发上币公告，使用数据没有新增，后面常常？', 'A big exchange just posted a listing, and usage data did not grow, what often follows?', [
            opt('A', '先冲一段，没有使用就常常吐回去', 'It pushes for a stretch first, and without usage it often gets given back'),
            opt('B', '上币通常是趋势的起点', 'A listing is usually the start of the trend'),
            opt('C', '公告一出跟风会比龙头更稳', 'Once the post is out the copycat is steadier than the leader'),
            opt('D', '圈外的人还没谈，通常不会冲', 'People outside crypto have not talked yet, so it usually does not push')
          ], 'A', {
            A: ['大所上币可以再冲一段，没有新增使用就常常吐回去。', 'A big-exchange listing can push another stretch, and without new usage it often gets given back.'],
            B: ['上币可以先冲，但没有使用时常常不是趋势起点。', 'A listing can push first, but without usage it is often not the start of the trend.'],
            C: ['跟风不会因为一条上币公告就比龙头更稳。', 'A copycat does not become steadier than the leader because of one listing post.'],
            D: ['圈外的人还没谈，公告本身仍可以先冲。', 'Even if people outside crypto have not talked, the post itself can still push first.']
          }),
          quiz('钱从旧故事转到新故事，旧的那一边产品没变，价格通常怎样？', 'Money rotates from an old story to a new one, and the old side’s product did not change, what does price usually do?', [
            opt('A', '产品没变，价格通常也横住', 'If the product did not change, price usually chops'),
            opt('B', '要等圈外的人开始谈，才会退', 'It fades only after people outside crypto start talking'),
            opt('C', '旧故事通常再当一次龙头', 'The old story usually becomes the leader once more'),
            opt('D', '常常退，产品没变也挡不住', 'It often fades, and an unchanged product does not stop that')
          ], 'D', {
            A: ['钱转走时，产品没变挡不住价格退。', 'When money rotates away, an unchanged product does not stop the fade.'],
            B: ['退潮可以发生在圈外谈论之前。', 'The fade can happen before people outside crypto start talking.'],
            C: ['钱已经转走，旧故事通常不是下一任龙头。', 'Once the money has rotated, the old story is usually not the next leader.'],
            D: ['旧的那一边常常退，哪怕产品没有变。', 'The old side often fades, even when the product did not change.']
          }),
          quiz('不看盘的朋友也开始谈这枚币，这时更常见的位置是？', 'Friends who do not watch the book also start talking about this coin, where are you more often standing?', [
            opt('A', '谈论刚出圈，通常还早', 'The talk just left the circle, so it is usually still early'),
            opt('B', '这是使用数据开始增加的信号', 'This is the sign that usage data is starting to grow'),
            opt('C', '热度已经传到外面，这一段常常不早', 'The heat has spread outside, and this stretch is often already late'),
            opt('D', '龙头还在就可以继续追跟风', 'While the leader is still up you can keep chasing copycats')
          ], 'C', {
            A: ['传到圈外常常是晚，不是刚开始。', 'Spreading outside crypto is often late, not the start.'],
            B: ['圈外的谈论不是使用数据。', 'Talk from outside crypto is not usage data.'],
            C: ['圈外的人开始谈论，常常说明这一段已经不早。', 'When people outside crypto start talking, it often means this stretch is already late.'],
            D: ['外面都在谈的时候，追跟风常常更晚。', 'When people outside crypto are talking, chasing copycats is often even later.']
          })
        ],
        study: { kind: 'book', headers: [bi('卖价', 'Ask'), bi('数量', 'Size')], cells: [['2', '100'], ['2.1', '100'], ['2.3', '100']], rows: [
          bi('买 300：花费 640，均价 2.1333333333。', 'Buy 300: cost 640, average 2.1333333333.')
        ] }
      }),
      lesson({
        id: '04', title: bi('项目尽调：写出可以被推翻的结论', 'Diligence: write a conclusion that can be overturned'),
        scene: bi('审计指出管理员能改合约，价格通常怎么走？', 'An audit says the admin can change the contract, what does price usually do?'),
        one: bi('藏起反证的故事常常先冲，审计公布一把管理员钥匙就能改合约时，价格常常回落。', 'A story that hides the counter-evidence often runs first, and when an audit publishes that one admin key can change the contract, price often falls.'),
        explain: bi('每条证据写下出处，并允许以后被推翻。\n只留利好，反证就被藏起来了。\n管理员能改合约，这本身就是风险，要写明能改什么。\n还不知道的标成未知，不要补成肯定句。\n新闻里要看的是审计有没有写明一把钥匙就能改合约。', 'Write a source for each piece of evidence, and leave it open to being overturned later.\nKeeping only the bullish points hides the counter-evidence.\nAn admin who can change the contract is a risk by itself, so write what that power can change.\nMark what you still do not know as unknown, and do not fill it in as a certainty.\nIn the news, watch whether the audit writes down that one key can change the contract.'),
        topic: {
          title: bi('反证被揭出来时', 'When the counter-evidence is exposed'),
          body: bi('故事很满、反证被忽略时，价格常常先冲一段。\n审计报告指出合约能被管理员改掉，价格常常快速回落。\n群里说还没用过所以没事，这是把没发生读成没有风险。\n未知被说成利好时，追进去的人常常买在故事上。\n有权限风险的项目也可以涨很久，写出来不是马上做空的命令。', 'When the story is full and the counter-evidence is ignored, price often runs a stretch first.\nWhen an audit says the admin can change the contract, price often falls back quickly.\nA group chat that says it has not been used so it is fine is reading “has not happened” as “there is no risk”.\nWhen an unknown is told as good news, the people who chase are often buying the story.\nA project with a permission risk can also rise for a long time, so writing the risk down is not an order to short at once.')
        },
        example: bi('教学模拟：证据 A 支持产品存在，B 是管理员能改合约，C 和收入说法冲突，D 还未知。\n只拿 A 去讲，价格可以先涨。\n审计把 B 写出来，常常把这段涨势打回去。', 'Teaching simulation: evidence A supports that a product exists, B is an admin who can change the contract, C conflicts with the revenue claim, and D is still unknown.\nTelling only A, price can rise first.\nWhen an audit writes B down, it often knocks that rise back.'),
        pitfalls: [
          bi('只收集看涨证据', 'Collecting only bullish evidence'),
          bi('钥匙没被用过就当成没有风险', 'Treating an unused key as no risk')
        ],
        practice: bi('看到审计或披露时，先写它指出的权限能做什么，再看价格有没有已经涨过。', 'When you see an audit or a disclosure, first write what power it points out, then see whether price has already risen.'),
        check: {
          ask: bi('审计刚指出合约能被管理员改掉，价格在这之前已经涨过，后面更常见的是？', 'An audit has just said the admin can change the contract, and price had already risen, what is more common next?'),
          options: [
            opt('A', '审计通常滞后，价格还会再冲', 'Audits are usually late, so price pushes again'),
            opt('B', '反证被看见，常常快速回落', 'Once the counter-evidence is seen, it often falls back quickly'),
            opt('C', '没改过合约就可以当没看见', 'If the contract has not been changed you can pretend not to see it'),
            opt('D', '钥匙没披露，审计就可以先放着', 'If the key has not been disclosed, the audit can wait')
          ],
          answer: 'B',
          note: bi('审计把能改合约写出来之后，先涨过的价格常常快速回落。', 'Once an audit writes down that the contract can be changed, the price that already rose often falls back quickly.'),
          miss: bi('审计把能改合约写出来之后，先涨过的价格常常快速回落。', 'Once an audit writes down that the contract can be changed, the price that already rose often falls back quickly.')
        },
        quizzes: [
          quiz('管理员可以改合约，但还没用过，价格正在涨，该怎么看？', 'An admin can change the contract, but has not used it, and price is rising, how should you read it?', [
            opt('A', '没用过就等于没有这个权限', 'Unused means the power does not exist'),
            opt('B', '正在涨就说明风险已经被定价', 'A rising price means the risk is already priced'),
            opt('C', '等用了一次再承认风险', 'Admit the risk only after it is used once'),
            opt('D', '权限还在，涨可以继续，但风险不能当没看见', 'The power is still there, the rise can continue, but the risk is not something you pretend not to see')
          ], 'D', {
            A: ['还没使用，不表示以后不能使用。', 'Not having used it does not mean it cannot be used later.'],
            B: ['价格在涨，不能说明风险已经被定价。', 'A rising price does not mean the risk is already priced.'],
            C: ['风险在权限还在的时候就在，不用等它被用一次。', 'The risk is there while the power is there, and you do not wait for one use.'],
            D: ['涨可以继续，但能改合约仍是风险，不能当没看见。', 'The rise can continue, but the power to change the contract is still a risk you do not pretend not to see.']
          }),
          quiz('还不知道的一条被说成利好，追进去通常是在买什么？', 'Something still unknown is being told as good news, what are you usually buying if you chase it?', [
            opt('A', '未知被喊成利好，通常很快会核对上', 'An unknown told as good news usually checks out soon'),
            opt('B', '在买审计已经放过的那一条', 'You are buying the point the audit already cleared'),
            opt('C', '在买故事，不是在买已经核对的证据', 'You are buying the story, not evidence that has been checked'),
            opt('D', '在买钥匙已经失效的项目', 'You are buying a project whose key is already dead')
          ], 'C', {
            A: ['说成利好不会让未知很快核对上。', 'Telling it as good news does not make an unknown check out soon.'],
            B: ['还没核对，就不是审计已经放过的证据。', 'If it is not checked, it is not evidence an audit already cleared.'],
            C: ['未知被说成利好，追进去买的是故事。', 'When an unknown is told as good news, a chase buys the story.'],
            D: ['这一条没说钥匙失效。', 'This point does not say the key is dead.']
          }),
          quiz('只拿证据 A 去讲，价格先涨了，这时指出证据 C 和收入说法冲突，后面更常见的是？', 'Only evidence A is told and price rises first, then C is pointed out as conflicting with the revenue claim, what is more common next?', [
            opt('A', '只讲了好消息，这段涨通常更稳', 'Telling only the good news makes this rise steadier'),
            opt('B', '和收入说法冲突，通常再冲一段', 'A conflict with the revenue claim usually pushes another stretch'),
            opt('C', '指出和收入冲突的 C，这段涨常常被打回去', 'Pointing out C, which conflicts with the revenue claim, often knocks that rise back'),
            opt('D', 'C 还没写成审计，价格通常毫无反应', 'Until C is written into an audit, price usually does not react')
          ], 'C', {
            A: ['只讲 A 可以先涨，指出冲突之后这段常常不更稳。', 'Telling only A can rise first, and after the conflict is pointed out the rise is often not steadier.'],
            B: ['和收入说法冲突不是再冲一段的理由。', 'A conflict with the revenue claim is not a reason for another push.'],
            C: ['只讲好消息可以先涨，指出和收入冲突的 C 之后，这段涨常常被打回去。', 'Telling only the good news can rise first, and after C is pointed out as conflicting with the revenue claim, that rise is often knocked back.'],
            D: ['冲突被指出来就可以读，不用等它写进审计。', 'Once the conflict is pointed out it can be read, and you do not wait for it to be written into an audit.']
          })
        ],
        study: { kind: 'panel', headers: [bi('证据', 'Evidence'), bi('作用', 'Role')], cells: [['A', bi('支持产品存在', 'Supports that a product exists')], ['B', bi('管理员可升级', 'Admin can upgrade')], ['C', bi('与收入声称冲突', 'Conflicts with the revenue claim')], ['D', bi('未知', 'Unknown')]], rows: [
          bi('结论要容得下反证。这不是买卖建议。', 'The conclusion has to leave room for counter-evidence. This is not a buy or sell recommendation.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
