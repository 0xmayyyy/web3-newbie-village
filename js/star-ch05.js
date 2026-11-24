(function (P) {
  var bi = P.bi, opt = P.opt, quiz = P.quiz, lesson = P.lesson;
  P.chapters['05'] = {
    title: bi('宏观经济与市场周期', 'Macroeconomics and market cycles'),
    lessons: [
      lesson({
        id: '01', title: bi('CPI/PPI：市场看的是预期差', 'CPI/PPI: the market looks at the surprise'),
        scene: bi('CPI 比预期低 0.2，比特币就一定涨吗？', 'If CPI is 0.2 below the forecast, must bitcoin rise?'),
        one: bi('先看实际比预期高还是低，再看头几分钟的美元和两年美债，差的非农不是只有跌这一个方向。', 'First see whether the actual is above or below the forecast, then watch the dollar and the two-year yield in the first minutes, because a weak payrolls print is not only a drop.'),
        explain: bi('CPI 看物价，PPI 看出厂价格。\n同比是和去年比，环比是和上一期比。\n市场主要看实际比预期高还是低。\n还要分核心和整体，油价和食品可以一下子把整体带偏。\n公布时间在美国夏令时是北京时间 20:30，冬令时是 21:30。', 'CPI looks at consumer prices, and PPI looks at factory prices.\nYear-over-year compares with last year, and month-over-month compares with the previous period.\nThe market mainly looks at whether the actual is above or below the forecast.\nAlso separate core from headline, because oil and food can yank the headline in one move.\nThe release is 20:30 Beijing time in US summer time, and 21:30 Beijing time in winter.'),
        topic: {
          title: bi('数据公布后，头几分钟先看什么', 'After the release, what to watch in the first minutes'),
          body: bi('实际比预期高一截，美元和两年美债收益率常常先上，比特币常常先跌一截。\n实际比预期低一截，比如低 0.2，第一下常常先涨。\n和预期差不多，公布前的那一冲常常很快回去。\n比预期好但大家早就在等，常常是利好出尽，冲一下就回。\n非农比预期差时有两种走法。\n市场正想着降息，差的非农会被当成离降息更近，比特币可以先涨。\n市场正怕衰退，差的非农会被当成经济坏了，比特币常常先跌。\n头几分钟盯美元指数和两年期收益率，它们比标题更快告诉你市场选了哪一种。\n如果大家更关心下一次议息，第一下也可以在几十分钟里反过来。', 'When the actual is a notch above the forecast, the dollar and the two-year yield often rise first, and bitcoin often drops a notch first.\nWhen the actual is a notch below the forecast, for example by 0.2, the first move is often up.\nWhen it matches the forecast, the push from before the release often fades quickly.\nBetter than expected, but long awaited, is often the good news getting used up, a push and then a fade.\nA weak payrolls print has two paths.\nIf the market wants rate cuts, weak payrolls get read as cuts coming closer, and bitcoin can rise first.\nIf the market fears a recession, weak payrolls get read as a bad economy, and bitcoin often drops first.\nIn the first minutes watch the dollar index and the two-year yield, because they tell you which path the market picked faster than the headline.\nIf people care more about the next rate meeting, the first move can also reverse within a few tens of minutes.')
        },
        example: bi('教学模拟：预期 2.8%，实际 3.1%，比预期高 0.3 个百分点。\n这种偏热，第一下常常是风险资产回落。\n若实际和预期一样，第一下常常没什么后续。', 'Teaching simulation: forecast 2.8%, actual 3.1%, 0.3 percentage points above the forecast.\nA hot print like this often starts with risk assets pulling back.\nIf the actual matches the forecast, the first move often has little follow-through.'),
        pitfalls: [
          bi('只看整体、不看核心', 'Watching only the headline and not the core'),
          bi('把差的非农只读成必须跌', 'Reading weak payrolls as a drop that must happen')
        ],
        practice: bi('先看实际比预期高还是低，再看头几分钟美元指数和两年美债往哪边。', 'First see whether the actual is above or below the forecast, then see which way the dollar index and the two-year yield go in the first minutes.'),
        check: {
          ask: bi('CPI 实际比预期低 0.2 个百分点，第一下更常见的是？', 'When CPI prints 0.2 percentage points below the forecast, what is the more common first move?'),
          options: [
            opt('A', '常常先涨一截，因为比预期凉', 'Often rises a notch first, because it is cooler than expected'),
            opt('B', '常常先跌，因为低了就是衰退', 'Often drops first, because lower means a recession'),
            opt('C', '通常先横住，0.2 太小不值得动', 'Usually chops first, because 0.2 is too small to move'),
            opt('D', '先等非农，CPI 本身没有方向', 'Wait for payrolls, because CPI itself has no direction')
          ],
          answer: 'A',
          note: bi('比预期低 0.2，第一下常常先涨，除非当时更怕衰退。', '0.2 below the forecast, the first move is often up, unless recession fear is the bigger worry.'),
          miss: bi('比预期低 0.2，第一下常常先涨，除非当时更怕衰退。', '0.2 below the forecast, the first move is often up, unless recession fear is the bigger worry.')
        },
        quizzes: [
          quiz('实际和预期几乎一样，公布后第一下常常怎样？', 'The actual almost matches the forecast, what does the first move often do?', [
            opt('A', '顺着公布前的方向追下去', 'Chase further along the pre-release direction'),
            opt('B', '数字一对上，趋势通常就确认了', 'Once the number matches, the trend is usually confirmed'),
            opt('C', '常常很快回去，因为已经提前计价', 'Often fades quickly, because it was already priced in'),
            opt('D', '符合预期就要反过来做', 'A match means you fade it the other way')
          ], 'C', {
            A: ['公布前那一冲，在符合预期时常常吐回去，不是接着追。', 'The pre-release push often gets given back when the print matches, so it is not a chase.'],
            B: ['对上预期只说明没有新意外，不是趋势确认。', 'Matching the forecast only says there is no new surprise, not that the trend is confirmed.'],
            C: ['大家早就按这个数字交易过，第一下常常很快回去。', 'People already traded this number, so the first move often fades quickly.'],
            D: ['符合预期不是反向命令，它常常只是没后劲。', 'A match is not an order to fade, and it often just has no follow-through.']
          }),
          quiz('大家已经在等一个很好的 CPI，结果也确实好，常怎么走？', 'Everyone already waited for a good CPI, and it is good, what often happens?', [
            opt('A', '常常是利好出尽，冲一下就回', 'Often the good news is used up, a push and then a fade'),
            opt('B', '好数字出来通常还要再涨一段', 'A good number usually keeps rising for another stretch'),
            opt('C', '等了很久的好消息，常常先横住', 'Long-awaited good news often chops first'),
            opt('D', '只看核心就行，整体可以忽略', 'Watch only the core, and ignore the headline')
          ], 'A', {
            A: ['好消息被等了很久，公布时常是冲一下就回。', 'Good news that was long awaited often pushes and fades on the release.'],
            B: ['早就料到的好，通常没有再涨一段的后劲。', 'Expected good news usually does not have the fuel for another stretch.'],
            C: ['它常常不是先横住，而是冲一下再回去。', 'It often does not chop first, and it pushes and then comes back.'],
            D: ['整体和核心都要看，整体不能直接忽略。', 'Watch both headline and core, and the headline is not simply ignored.']
          }),
          quiz('非农比预期差，市场又在怕衰退，第一下更常见的是？', 'Payrolls are weaker than expected, and the market fears a recession, what is the more common first move?', [
            opt('A', '想降息的交易会先把币价拉起来', 'The cut trade lifts the coin first'),
            opt('B', '就业差通常只砸美股，币价不动', 'Weak jobs usually hit only stocks, and the coin stays put'),
            opt('C', '差得不多就常常先横住', 'A small miss often chops first'),
            opt('D', '怕衰退时常常先跌一截', 'When recession is the fear, it often drops a notch first')
          ], 'D', {
            A: ['想降息时差的非农可以先涨，但这一题的市场是在怕衰退。', 'When the market wants cuts, weak payrolls can rise first, but this question’s market fears a recession.'],
            B: ['怕衰退时，比特币常常跟着风险资产一起先跌。', 'When recession is the fear, bitcoin often drops with other risk assets.'],
            C: ['怕衰退时的差非农，第一下常常是跌，不是横住。', 'Weak payrolls under recession fear often drop first, not chop.'],
            D: ['市场正怕衰退，差的非农会被当成经济坏了，常常先跌。', 'If the market fears a recession, weak payrolls get read as a bad economy, and it often drops first.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('预期 2.8%，实际 3.1%，高出 0.3 个百分点。', 'Forecast 2.8%, actual 3.1%, 0.3 percentage points above the forecast.'),
          bi('指数从 100 到 103.1，同比 3.1%。', 'The index goes from 100 to 103.1, year-over-year 3.1%.')
        ] }
      }),
      lesson({
        id: '02', title: bi('利率：降息不是上涨按钮', 'Rates: a cut is not an up button'),
        scene: bi('降息公布了，币价是不是应该直接追多？', 'The cut is announced, so should you chase the long?'),
        one: bi('降息或加息若早就被料到，公布时常没后劲，发布会和点阵图偏紧时，降息也可以不涨反跌。', 'If a cut or a hike was already expected, the announcement often has little follow-through, and when the press conference and the dot plot are tight, a cut can fall instead of rise.'),
        explain: bi('利率是借钱的价钱。\n降息是价钱变低，加息是价钱变高。\n25 个基点，也就是 0.25 个百分点。\n大家事先怎么定价，可以看市场上的降息概率，比如 CME FedWatch。\n真正的意外常常出在发布会的说法和点阵图，不只在降息这两个字。', 'The interest rate is the price of borrowing.\nA cut makes that price lower, and a hike makes it higher.\n25 basis points are 0.25 percentage points.\nHow people priced it beforehand shows up in market odds of a cut, for example CME FedWatch.\nThe real surprise often comes from the press conference and the dot plot, not only from the word cut.'),
        topic: {
          title: bi('利率决议出来，价格通常跟谁', 'When the rate decision lands, what price usually follows'),
          body: bi('符合预期的降息，公布时常常不涨，甚至冲一下就回。\n意外的降息，风险资产常常先涨一截。\n意外的加息，或者说法比预期更紧，比特币常常先跌一截。\n降息但发布会偏紧、点阵图还上移，这是鹰派降息，价格常常不涨反跌。\n加息比大家怕的要小，常常被当成没那么紧，先涨一截。\n若降息是因为经济已经很差，价格也可以跌。\n仓位已经挤在一边时，第一下过一会儿仍可能反过来。', 'A cut that matches expectations often does not rally on the announcement, and it can even push and fade.\nA surprise cut often lifts risk assets a notch first.\nA surprise hike, or language tighter than expected, often drops bitcoin a notch first.\nA cut with a tight press conference and a higher dot plot is a hawkish cut, and price often falls instead of rises.\nA hike smaller than people feared is often read as less tight, and price rises a notch first.\nIf the cut is because the economy is already weak, price can also fall.\nWhen positioning is already crowded on one side, the first move can still reverse a little later.')
        },
        example: bi('教学模拟：从 5.00% 降到 4.75%，就是大家已经料到的 25 个基点。\n若发布会偏紧，价格可以几乎不涨。\n若一下子降得更多，才更像意外宽松，第一下常常先涨。', 'Teaching simulation: a drop from 5.00% to 4.75% is the 25 basis points people already expected.\nIf the press conference is tight, price can barely rise.\nA larger cut all at once looks more like surprise easing, and the first move is often up.'),
        pitfalls: [
          bi('看见降息就当成放水去追多', 'Treating a cut as easy money and chasing the long'),
          bi('不看发布会和点阵图', 'Ignoring the press conference and the dot plot')
        ],
        practice: bi('先看降息概率里这次有没有被料到，再听发布会和点阵图偏松还是偏紧。', 'First see whether the cut odds already priced this move, then listen for whether the press conference and the dot plot are easy or tight.'),
        check: {
          ask: bi('降息符合预期，发布会却偏紧，点阵图也上移，价格通常跟谁？', 'The cut matches expectations, the press conference is tight, and the dot plot moves up, what does price usually follow?'),
          options: [
            opt('A', '降息就是放水，直接追多', 'A cut is easy money, so chase the long'),
            opt('B', '跟发布会和点阵图，不跟降息两个字', 'Follow the press conference and the dot plot, not the word cut'),
            opt('C', '点阵图只是预测，通常可以忽略', 'The dot plot is only a forecast, so it can usually be ignored'),
            opt('D', '符合预期的降息，当天通常大涨', 'An expected cut usually surges on the day')
          ],
          answer: 'B',
          note: bi('鹰派降息时，价格跟发布会和点阵图，常常不涨反跌。', 'On a hawkish cut, price follows the press conference and the dot plot, and often falls instead of rises.'),
          miss: bi('鹰派降息时，价格跟发布会和点阵图，常常不涨反跌。', 'On a hawkish cut, price follows the press conference and the dot plot, and often falls instead of rises.')
        },
        quizzes: [
          quiz('决议比预期更紧，第一下更常见的是？', 'The decision is tighter than expected, what is the more common first move?', [
            opt('A', '更紧通常还要等发布会才跌', 'Tighter usually waits for the press conference before it drops'),
            opt('B', '更紧会被当成利空出尽，先涨', 'Tighter gets read as used-up bad news, and rises first'),
            opt('C', '符合预期的降息也是这个走法', 'An expected cut walks the same path'),
            opt('D', '比特币常常先跌一截', 'Bitcoin often drops a notch first')
          ], 'D', {
            A: ['更紧本身就是意外，第一下常常已经先跌。', 'Tighter is itself the surprise, and the first move has often already dropped.'],
            B: ['更紧不是利空出尽，利空出尽是坏消息被等了很久。', 'Tighter is not used-up bad news, and used-up bad news is bad news that was long awaited.'],
            C: ['符合预期的降息常常没后劲，更紧是先跌。', 'An expected cut often has no follow-through, and tighter drops first.'],
            D: ['比预期更紧，比特币第一下常常先跌。', 'Tighter than expected, bitcoin often drops first.']
          }),
          quiz('降息是因为经济已经很差，这时该怎么看？', 'The cut is because the economy is already weak, how should you read it?', [
            opt('A', '经济差配降息，通常是追多的时候', 'A weak economy plus a cut is usually the time to chase longs'),
            opt('B', '价格也可以不涨反跌', 'Price can fall instead of rise'),
            opt('C', '这种降息常常先横一天再涨', 'This kind of cut often chops for a day and then rises'),
            opt('D', '先看点阵图就行，原因不用管', 'Watch only the dot plot, and ignore the reason')
          ], 'B', {
            A: ['因为经济差而降息，常常是害怕，不是追多。', 'A cut because the economy is weak is often fear, not a chase of longs.'],
            B: ['坏的降息可以让价格下跌。', 'A cut for bad reasons can come with a falling price.'],
            C: ['它没有先横一天的固定走法，可以当时就跌。', 'It has no fixed path of chopping for a day, and it can fall at the time.'],
            D: ['原因就是这次偏空的来源，不能丢掉。', 'The reason is the source of the soft lean this time, so do not drop it.']
          }),
          quiz('加息比大家怕的要小，常怎么走？', 'The hike is smaller than people feared, what often happens?', [
            opt('A', '常常被当成没那么紧，先涨一截', 'Often read as less tight, and price rises a notch first'),
            opt('B', '小幅加息通常还是先跌', 'A small hike usually still drops first'),
            opt('C', '比怕的小就要等下次补加', 'Smaller than feared means you wait for the rest next time'),
            opt('D', '点阵图会把这一小步抵消', 'The dot plot cancels this small step')
          ], 'A', {
            A: ['没大家怕的那么紧，第一下常常先涨。', 'Less tight than feared, the first move is often up.'],
            B: ['比怕的小不是意外加息，通常不是先跌。', 'Smaller than feared is not a surprise hike, so it usually does not drop first.'],
            C: ['比怕的小就是这次没那么紧，不是还欠一次加息。', 'Smaller than feared means this time is less tight, not that another hike is still owed.'],
            D: ['点阵图可以另说方向，但这一小步本身常常先涨。', 'The dot plot can point elsewhere, but this smaller step itself often rises first.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('从 5.00% 降到 4.75%，就是降 25 个基点。', 'A drop from 5.00% to 4.75% is a cut of 25 basis points.')
        ] }
      }),
      lesson({
        id: '03', title: bi('DXY 与美债：相关不是因果', 'DXY and Treasuries: correlation is not causation'),
        scene: bi('美元指数突破近高，比特币通常怎样？', 'When the dollar index breaks a recent high, what does bitcoin usually do?'),
        one: bi('美元和十年美债收益率一起走强时比特币常常偏弱，一起走弱时常常好过一些，但这不是谁在指挥谁。', 'When the dollar and the ten-year yield rise together bitcoin is often softer, and when they fall together it is often easier, but neither one is giving orders to the other.'),
        explain: bi('美元指数看美元相对一篮子货币的强弱。\n十年美债收益率高，借美元更贵。\n要盯的画面是美元指数突破近一段的高点，或数据后十年收益率突然跳升。\n两条一起走，只说明这一段同向，不说明谁造成了谁。', 'The dollar index looks at the dollar against a basket of currencies.\nA high ten-year yield means borrowing dollars is more expensive.\nThe picture to watch is the dollar index breaking a recent high, or the ten-year yield jumping after data.\nMoving together only says they pointed the same way in this stretch, and it does not say which one caused the other.'),
        topic: {
          title: bi('美元和美债一起动的时候', 'When the dollar and yields move together'),
          body: bi('美元指数突破近高，十年收益率也在跳，比特币常常更难涨。\n美元走弱、十年收益率回落，比特币常常好过一些。\n通胀数据偏热时，收益率跳升、币价偏弱更常见。\n增长担心时，收益率和币价也可以一起跌。\n美元在涨、币价却因为别的利好继续涨时，不要用美元一条线硬做空。\n换一段日子，这个关系可以反过来。', 'When the dollar index breaks a recent high and the ten-year yield is jumping too, bitcoin is often harder to lift.\nWhen the dollar is weak and the ten-year yield is falling, bitcoin is often easier.\nWhen inflation data runs hot, a jumping yield with a softer coin is more common.\nWhen growth is the worry, yields and the coin can fall together.\nWhen the dollar is rising and the coin keeps rising on other good news, do not force a short from the dollar line alone.\nSwitch the stretch of time and this relationship can flip.')
        },
        example: bi('教学模拟：数据公布后，十年美债收益率跳升，美元指数突破近一段的高点。\n这种时候比特币常常更难涨。\n若下一次数据让两条都回落，币价又常常好过一些。', 'Teaching simulation: after the release, the ten-year yield jumps, and the dollar index breaks a recent high.\nAt a time like this bitcoin is often harder to lift.\nIf the next release pulls both lines back down, the coin is often easier again.'),
        pitfalls: [
          bi('美元一突破近高就满仓做空', 'Going full short the moment the dollar breaks a recent high'),
          bi('把一起走说成谁造成了谁', 'Calling a move together a case of one causing the other')
        ],
        practice: bi('看到美元指数或十年收益率跳动时，先看它们是一起走强还是一起走弱。', 'When the dollar index or the ten-year yield jumps, first see whether they are rising together or falling together.'),
        check: {
          ask: bi('数据出来后十年收益率跳升，美元指数也突破了近高，比特币更常见的是？', 'After the data the ten-year yield jumps, and the dollar index also breaks a recent high, what is more common for bitcoin?'),
          options: [
            opt('A', '收益率升说明经济好，币价通常跟着涨', 'A rising yield means a good economy, so the coin usually rises with it'),
            opt('B', '美元突破近高是滞后的，通常不用管', 'A dollar break of a recent high is late, so it can usually be ignored'),
            opt('C', '两边一起走强，比特币常常更难涨', 'With both rising together, bitcoin is often harder to lift'),
            opt('D', '只看收益率就够，美元指数和币价无关', 'The yield is enough, and the dollar index has nothing to do with the coin')
          ],
          answer: 'C',
          note: bi('美元指数突破近高、十年收益率一起跳，比特币常常更难涨。', 'When the dollar index breaks a recent high and the ten-year yield jumps with it, bitcoin is often harder to lift.'),
          miss: bi('美元指数突破近高、十年收益率一起跳，比特币常常更难涨。', 'When the dollar index breaks a recent high and the ten-year yield jumps with it, bitcoin is often harder to lift.')
        },
        quizzes: [
          quiz('大家担心增长，十年收益率和比特币一起跌，能不能据此说美元也在跌？', 'People fear weak growth, and the ten-year yield and bitcoin fall together, so can you say the dollar is falling too?', [
            opt('A', '不能，增长担心时它们可以一起跌', 'No, under growth fear they can fall together'),
            opt('B', '能，币价跌的时候美元通常也跌', 'Yes, when the coin falls the dollar usually falls too'),
            opt('C', '能，收益率一跌美元指数就会破近低', 'Yes, a falling yield breaks the dollar index under a recent low'),
            opt('D', '不能，这种时候币价通常不跟收益率', 'No, in this case the coin usually does not follow the yield')
          ], 'A', {
            A: ['增长担心时，收益率和币价可以一起跌，美元不一定跟着。', 'Under growth fear, yields and the coin can fall together, and the dollar does not have to follow.'],
            B: ['币价和收益率一起跌，不是美元也在跌的证明。', 'The coin and the yield falling together is not proof the dollar is falling too.'],
            C: ['收益率下跌不会自动把美元指数打到近低下面。', 'A falling yield does not automatically push the dollar index under a recent low.'],
            D: ['这一题里币价正跟着收益率一起跌。', 'In this question the coin is falling together with the yield.']
          }),
          quiz('换了一段日子，美元和币价的关系反过来了，这说明什么？', 'In another stretch of time the dollar and the coin flipped their relationship, what does that say?', [
            opt('A', '前一段的高低点都要重画', 'The prior highs and lows all have to be redrawn'),
            opt('B', '从此只看币价，美元可以放下', 'From then on watch only the coin, and set the dollar aside'),
            opt('C', '关系可以变，不能当成永远的命令', 'The relationship can change, so it is not a permanent order'),
            opt('D', '反过来就按新方向加大仓位', 'A flip means you size up along the new direction')
          ], 'C', {
            A: ['关系反过来，不是把以前的高低点作废。', 'A flipped relationship does not void the old highs and lows.'],
            B: ['关系会变，不是美元从此不用看。', 'The relationship can change, and that does not mean the dollar is no longer worth watching.'],
            C: ['换一段日子关系就能反过来，所以不是永远的命令。', 'The relationship can flip in another stretch, so it is not a permanent order.'],
            D: ['会变的关系更不能拿来加大仓位。', 'A relationship that can flip is a worse reason to size up.']
          }),
          quiz('美元在涨，币价却因为别的利好继续涨，该怎么做？', 'The dollar is rising, but the coin keeps rising on other good news, what should you do?', [
            opt('A', '美元没跌就先减仓观望', 'If the dollar has not fallen, cut the position and wait'),
            opt('B', '不要用美元一条线硬做空', 'Do not force a short from the dollar line alone'),
            opt('C', '利好通常盖不过美元，还是偏空', 'Good news usually cannot beat the dollar, so it still leans short'),
            opt('D', '等美元回到近低再承认这段涨', 'Wait until the dollar is back at a recent low before you admit this rise')
          ], 'B', {
            A: ['别的利好正在推币价，美元没跌不是减仓的理由。', 'Other good news is lifting the coin, and a dollar that has not fallen is not a reason to cut.'],
            B: ['一条美元线盖不过正在起作用的利好，就不要硬做空。', 'When one dollar line does not override the good news that is working, do not force the short.'],
            C: ['这一段币价在涨，不能说利好通常盖不过美元。', 'The coin is rising in this stretch, so you cannot say good news usually loses to the dollar.'],
            D: ['不用等美元回到近低，才承认币价在涨。', 'You do not wait for the dollar to return to a recent low before you admit the coin is rising.']
          })
        ],
        study: { kind: 'panel', headers: ['X', 'Y'], cells: [['1', '5'], ['2', '4'], ['3', '3'], ['4', '2'], ['5', '1']], rows: [
          bi('这两列数往相反的方向走。', 'These two series move in opposite directions.')
        ] }
      }),
      lesson({
        id: '04', title: bi('BTC 减半：减的是新币补贴', 'The BTC halving: what is cut is the new-coin subsidy'),
        scene: bi('减半当天新闻都说利好，价格是不是还要再涨？', 'Halving-day headlines are all bullish, so does price still have to rise again?'),
        one: bi('减半减的是新挖出来的补贴，钱包里的币不会少，高点常常不在减半当天。', 'The halving cuts the new mining subsidy, coins already in wallets stay put, and the high is often not on the halving day.'),
        explain: bi('减半是新区块的奖励变少。\n奖励按区块高度从 50、25、12.5、6.25 到 3.125。\n时间看区块高度，不是每年同一天。\n你原来的 1 枚还是 1 枚。\n读减半新闻时，先看价格在消息铺开前涨过没有。', 'The halving makes the reward of a new block smaller.\nThe reward steps down by block height, from 50, to 25, to 12.5, to 6.25, to 3.125.\nThe timing follows block height, not the same calendar day each year.\nThe 1 coin you already had is still 1 coin.\nWhen you read halving news, first see whether price already rose before the headlines spread.'),
        topic: {
          title: bi('减半前后，价格通常什么时候涨', 'Around a halving, when price usually rises'),
          body: bi('减半前几个月故事很热时，价格常常先涨一截。\n减半当天若新闻才铺满，而价格已经涨过，常常横住或先回落，像利好出尽。\n过去几轮的周期高点，大约在减半后 12 到 18 个月。\n2024 年的高点出现在减半之前，所以高点也可以来早。\n每次路径都不一样，不能用上一次的涨幅预订下一次。\n减半前后也可以一直横着，故事很热也不涨。', 'When the story is hot in the months before the halving, price often rises a notch first.\nIf the headlines only fill the halving day and price already rose, it often chops or pulls back first, like the good news is used up.\nCycle highs in past rounds came about 12 to 18 months after the halving.\nThe 2024 high came before the halving, so the high can also arrive early.\nEach path is different, so you cannot book the next rally from the last one’s gain.\nPrice can also chop straight through the halving and not rise even while the story is hot.')
        },
        example: bi('教学模拟：补贴从 50 减到 25，减的是新发行。\n你原来的 1 枚还是 1 枚。\n新闻在当天铺满、价格却早已涨过时，常常是故事已经走完。', 'Teaching simulation: a subsidy cut from 50 to 25 cuts new issuance.\nThe 1 coin you already had is still 1 coin.\nWhen headlines fill the day but price rose long before, the story is often already finished.'),
        pitfalls: [
          bi('减半减供给，当天必涨', 'A halving cuts supply, so the day must rise'),
          bi('用 12 到 18 个月当成下一次的闹钟', 'Using 12 to 18 months as an alarm clock for the next time')
        ],
        practice: bi('读一条减半新闻时，先看它是提前几个月就在讲，还是当天才铺满。', 'When you read a halving headline, first see whether it was already the story for months, or whether it only filled the day.'),
        check: {
          ask: bi('减半当天新闻都在说利好，价格在这之前已经涨过一截，当天更常见的是？', 'On the halving day every headline is bullish, and price already rose a notch before it, what is more common that day?'),
          options: [
            opt('A', '减半减供给，当天通常还要大涨', 'A halving cuts supply, so the day usually surges again'),
            opt('B', '当天新闻越多，通常越要追', 'The more headlines that day, the more you usually chase'),
            opt('C', '减半只影响矿工，价格通常不动', 'The halving only affects miners, so price usually does not move'),
            opt('D', '常常横住或先回落，故事已经走完', 'Often chops or pulls back first, because the story is already finished')
          ],
          answer: 'D',
          note: bi('新闻当天才铺满、价格已经涨过，常常是利好出尽，横住或先回落。', 'When headlines only fill the day and price already rose, it is often used-up good news, a chop or a pullback first.'),
          miss: bi('新闻当天才铺满、价格已经涨过，常常是利好出尽，横住或先回落。', 'When headlines only fill the day and price already rose, it is often used-up good news, a chop or a pullback first.')
        },
        quizzes: [
          quiz('2024 年的高点在减半之前，更早几轮的高点却在减半后一年多，这说明什么？', 'The 2024 high came before the halving, while earlier highs came more than a year after, what does that say?', [
            opt('A', '高点一定改到减半前了', 'The high has now moved to before the halving for good'),
            opt('B', '高点可以来早，也可以在减半后一年左右', 'The high can arrive early, or about a year after the halving'),
            opt('C', '减半后 12 到 18 个月才准许有高点', 'A high is only allowed 12 to 18 months after the halving'),
            opt('D', '高点提前就说明这次减半失效', 'An early high means this halving failed')
          ], 'B', {
            A: ['2024 年来早了，不表示以后都改到减半前。', '2024 arrived early, and that does not move every later high to before the halving.'],
            B: ['高点可以在减半前，也可以在减半后大约 12 到 18 个月。', 'The high can come before the halving, or about 12 to 18 months after it.'],
            C: ['那只是过去几轮大约的位置，不是准许高点的窗口。', 'That is only about where past rounds peaked, not a window that permits the high.'],
            D: ['来早不是减半失效，减半仍然在减新币补贴。', 'Arriving early is not a failed halving, and the halving still cuts the new-coin subsidy.']
          }),
          quiz('用上一次减半后的涨幅去预订下一次，这样读对吗？', 'Using the gain after the last halving to book the next one, is that a good read?', [
            opt('A', '对，供给每次少一半，涨幅也差不多', 'Yes, supply halves each time, so the gain is about the same'),
            opt('B', '对，12 到 18 个月后会重复同一段', 'Yes, the same stretch repeats 12 to 18 months later'),
            opt('C', '只对矿工成本涨的那一段', 'Only for the stretch where miner costs rise'),
            opt('D', '不对，每次路径可以完全不一样', 'No, each path can be completely different')
          ], 'D', {
            A: ['新币变少的比例不是价格涨幅。', 'The proportion of new coins cut is not the price gain.'],
            B: ['12 到 18 个月是过去高点大约的距离，不是同一段涨幅。', '12 to 18 months is about how far past highs sat, not the same gain.'],
            C: ['矿工成本不是把上一次涨幅搬到下一次的理由。', 'Miner costs are not a reason to carry the last gain into the next time.'],
            D: ['奖励规则可以重复，价格路径不必重复。', 'The reward rule can repeat, and the price path need not.']
          }),
          quiz('一条「减半利好」的新闻，先看哪一件事？', 'A headline that says the halving is bullish, what do you look at first?', [
            opt('A', '先看矿工有没有关停', 'First see whether miners have shut off'),
            opt('B', '先看钱包余额会不会少', 'First see whether wallet balances will shrink'),
            opt('C', '先看价格在新闻铺开前涨过没有', 'First see whether price already rose before the headline spread'),
            opt('D', '先看是不是减半当月的第一个周一', 'First see whether it is the first Monday of the halving month')
          ], 'C', {
            A: ['矿工关不停，不决定这条新闻是不是已经走完。', 'Whether miners shut off does not decide whether this headline is already finished.'],
            B: ['钱包余额不会因为减半变少，也不是读新闻的第一步。', 'Wallet balances do not shrink because of the halving, and that is not the first step in reading the headline.'],
            C: ['价格在消息铺开前已经涨过，这条利好常常已经走完。', 'If price already rose before the headline spread, this good news is often already finished.'],
            D: ['减半看区块高度，不是当月的第一个周一。', 'The halving follows block height, not the first Monday of that month.']
          })
        ],
        study: { kind: 'panel', headers: [bi('阶段', 'Stage'), bi('补贴', 'Subsidy')], cells: [['1', '50'], ['2', '25'], ['3', '12.5'], ['4', '6.25'], ['5', '3.125']], rows: [
          bi('补贴按区块高度从 50 减到 3.125。', 'The subsidy steps down by block height from 50 to 3.125.')
        ] }
      }),
      lesson({
        id: '05', title: bi('宏观事件日历：先计划再看结果', 'A macro calendar: plan before the result'),
        scene: bi('日历上的钟点还没核对，能先写做还是不做吗？', 'Before the clock time on the calendar is checked, can you already write whether you trade?'),
        one: bi('先把公布时间、时区和做还是不做写好，再看数字，公布前后的来回刺常常不可靠。', 'Write the release time, the timezone, and whether you trade before you see the number, because the pokes around the release are often unreliable.'),
        explain: bi('CPI 和非农是纽约时间 8:30。\n北京时间夏令时是 20:30，冬令时是 21:30。\n美联储决议是纽约时间 14:00。\n北京时间夏令时是第二天 02:00，冬令时是 03:00。\n同一个时刻，各地钟点不一样，写错时区就会看错那一根。\n计划写成这次不做，也是一种做法。', 'CPI and payrolls are 8:30 New York time.\nThat is 20:30 Beijing time in summer time, and 21:30 in winter.\nThe Fed decision is 14:00 New York time.\nThat is 02:00 the next day Beijing time in summer time, and 03:00 in winter.\nThe same instant is not the same clock time everywhere, and the wrong timezone makes you watch the wrong candle.\nWriting no trade this time is also a way to act.'),
        topic: {
          title: bi('公布日历上，先写什么再看什么', 'On the release calendar, what you write before you look'),
          body: bi('公布前一段时间，价格常常来回刺，方向不可靠。\n钟点写错，就会把别的小时当成公布那一根。\n数字出来的头几分钟常常先冲一段，和预期差不多时这一冲常常回去。\n只看一个标题就追第一下，最容易追在回头的那一段。\n意外很大、仓位又挤在同一边时，这一下可以走得比平时远。\n计划若写了这次不做，波动大也不是临时改计划的理由。\n一个数字解释不了全部涨跌，还要看当时仓位挤不挤。', 'In the stretch before the release, price often pokes back and forth, and the direction is unreliable.\nThe wrong clock time makes you treat another hour as the release candle.\nThe first minutes after the number often push first, and when it matches the forecast that push often comes back.\nChasing the first spike from the headline alone is the easiest way to chase the part that fades.\nWhen the surprise is large and positioning is crowded on that same side, the move can run farther than usual.\nIf the plan says no trade this time, a large move is not a reason to rewrite it on the spot.\nOne number does not explain the whole move, and you also look at whether positioning is crowded.')
        },
        example: bi('教学模拟：日历写着 CPI，纽约时间 8:30。\n夏令时应写成北京时间 20:30，不是 21:30。\n钟点没写对之前，来回刺的方向都先不要跟。', 'Teaching simulation: the calendar says CPI, 8:30 New York time.\nIn summer time that should be written as 20:30 Beijing time, not 21:30.\nBefore the clock time is right, do not follow the direction of the pokes.'),
        pitfalls: [
          bi('夏令时和冬令时用同一个北京时间', 'Using the same Beijing time for summer time and winter'),
          bi('来回刺的时候临时改做不做', 'Changing trade or no-trade while price is poking back and forth')
        ],
        practice: bi('先在日历上写出纽约时间和对应的北京时间，再写这次做还是不做。', 'On the calendar, write the New York time and the matching Beijing time before you write whether you trade this time.'),
        check: {
          ask: bi('CPI 写的是纽约时间 8:30，现在是美国夏令时，北京时间该记成几点？', 'CPI is listed as 8:30 New York time, and it is US summer time, what Beijing time should you write?'),
          options: [
            opt('A', '20:30，夏令时比冬令时早一小时', '20:30, because summer time is one hour earlier than winter'),
            opt('B', '21:30，夏令时和冬令时同一个钟点', '21:30, because summer time and winter share one clock time'),
            opt('C', '02:00，和美联储决议用同一个点', '02:00, the same slot as the Fed decision'),
            opt('D', '8:30，直接把纽约时间当成北京时间', '8:30, using New York time as if it were Beijing time')
          ],
          answer: 'A',
          note: bi('夏令时 CPI 和非农是北京时间 20:30，冬令时才是 21:30。', 'In summer time, CPI and payrolls are 20:30 Beijing time, and 21:30 only in winter.'),
          miss: bi('夏令时 CPI 和非农是北京时间 20:30，冬令时才是 21:30。', 'In summer time, CPI and payrolls are 20:30 Beijing time, and 21:30 only in winter.')
        },
        quizzes: [
          quiz('公布前价格来回刺，计划还没写做不做，这时更稳的是？', 'Before the release price is poking back and forth, and the plan does not yet say whether you trade, what is the steadier choice?', [
            opt('A', '先写好做不做，不跟每一刺', 'Write trade or no-trade first, and do not follow every poke'),
            opt('B', '刺破前高就先做，回来再改计划', 'Trade the poke through the prior high, and rewrite the plan if it comes back'),
            opt('C', '等标题出来再决定追不追', 'Wait for the headline, then decide whether to chase'),
            opt('D', '来回刺通常是方向，跟着最狠的一刺', 'The pokes are usually the direction, so follow the sharpest one')
          ], 'A', {
            A: ['来回刺方向不可靠，先把做不做写好。', 'The pokes have an unreliable direction, so write trade or no-trade first.'],
            B: ['刺出去再回来很常见，不是先做再改计划。', 'A poke that comes back is common, so do not trade first and rewrite the plan after.'],
            C: ['标题出来再追，最容易追在回头的那一段。', 'Chasing after the headline is the easiest way to chase the part that fades.'],
            D: ['来回刺不是方向，最狠的一刺也可以马上回去。', 'The pokes are not the direction, and the sharpest one can come back at once.']
          }),
          quiz('美联储决议是纽约时间 14:00，冬令时的北京时间该记成几点？', 'The Fed decision is 14:00 New York time, what Beijing time should you write in winter?', [
            opt('A', '20:30，和 CPI 同一个点', '20:30, the same slot as CPI'),
            opt('B', '14:00，纽约时间不用换', '14:00, with no need to convert New York time'),
            opt('C', '02:00，冬令时和夏令时一样', '02:00, the same in winter and in summer time'),
            opt('D', '03:00，冬令时比夏令时晚一小时', '03:00, because winter is one hour later than summer time')
          ], 'D', {
            A: ['20:30 是夏令时的 CPI，不是决议。', '20:30 is CPI in summer time, not the decision.'],
            B: ['不换时区，就会看错那一根。', 'Without converting the timezone, you watch the wrong candle.'],
            C: ['夏令时的决议是北京时间 02:00，冬令时不是同一个点。', 'The decision in summer time is 02:00 Beijing time, and winter is not the same slot.'],
            D: ['冬令时决议是北京时间 03:00，夏令时是 02:00。', 'In winter the decision is 03:00 Beijing time, and in summer time it is 02:00.']
          }),
          quiz('计划写了这次不交易，公布后波动却很大，该怎么做？', 'The plan says no trade this time, but the move after the release is large, what should you do?', [
            opt('A', '波动大就改成追第一下', 'A large move means you switch to chasing the first spike'),
            opt('B', '仍然按不交易做', 'Still follow the no-trade'),
            opt('C', '等它回去再按波动加大', 'Wait for it to come back, then size up with the move'),
            opt('D', '只在夏令时才坚持不做', 'Keep the no-trade only in summer time')
          ], 'B', {
            A: ['波动大不是临时改成追的理由。', 'A large move is not a reason to switch to a chase on the spot.'],
            B: ['写了不做，就仍然不做。', 'If you wrote no trade, you still do not trade.'],
            C: ['不交易也包括不在回去时加大。', 'No-trade also means not sizing up on the way back.'],
            D: ['做不做跟夏令时冬令时无关，跟你事先写的有关。', 'Trade or no-trade does not depend on summer time or winter, and it depends on what you wrote beforehand.']
          })
        ],
        study: { kind: 'panel', rows: [
          bi('CPI 和非农：纽约 8:30，北京夏令时 20:30，冬令时 21:30。', 'CPI and payrolls: 8:30 New York, 20:30 Beijing in summer time, 21:30 in winter.'),
          bi('美联储决议：纽约 14:00，北京夏令时 02:00，冬令时 03:00。', 'Fed decision: 14:00 New York, 02:00 Beijing in summer time, 03:00 in winter.')
        ] }
      })
    ]
  };
})(window.STAR_PACK);
