/* 进阶知识星 lesson data. Lesson 01 Chinese text follows the textbook.
   English is a draft for the owner to review before it is treated as final. */
window.ADVANCED_STAR = {
  enReview: true,
  tagline: {
    zh: '从看懂市场，到建立自己的交易系统',
    en: 'From reading the market to building your own process'
  },
  modules: [
    { id: '01', status: 'open', title: { zh: 'K 线与价格行为', en: 'Candlesticks and price action' }, blurb: { zh: '看懂蜡烛图、趋势、支撑压力与市场结构', en: 'Candles, trend, support, resistance, and market structure' } },
    { id: '02', status: 'soon', title: { zh: '技术指标与信号', en: 'Indicators and signals' }, blurb: { zh: 'EMA、MACD、RSI、布林带、背离与 SMC', en: 'EMA, MACD, RSI, Bollinger Bands, divergence, and SMC' } },
    { id: '03', status: 'soon', title: { zh: '交易系统与风险管理', en: 'Trading systems and risk' }, blurb: { zh: '仓位、止损、盈亏比与交易计划', en: 'Position size, stops, reward-to-risk, and a trading plan' } },
    { id: '04', status: 'soon', title: { zh: '合约与市场微观结构', en: 'Contracts and market microstructure' }, blurb: { zh: '杠杆、资金费率、持仓量与流动性', en: 'Leverage, funding, open interest, and liquidity' } },
    { id: '05', status: 'soon', title: { zh: '宏观经济与市场周期', en: 'Macroeconomics and market cycles' }, blurb: { zh: '利率、通胀、美元、BTC 周期与 ETF 影响', en: 'Rates, inflation, the dollar, the BTC cycle, and ETFs' } },
    { id: '06', status: 'soon', title: { zh: '链上数据与资金流向', en: 'On-chain data and flows' }, blurb: { zh: '交易所流量、稳定币、巨鲸、TVL 与链上活跃度', en: 'Exchange flows, stablecoins, large holders, TVL, and activity' } },
    { id: '07', status: 'soon', title: { zh: '项目研究与市场叙事', en: 'Project research and narratives' }, blurb: { zh: '团队、产品、代币经济与赛道催化剂', en: 'Team, product, token design, and the narrative around a sector' } },
    { id: '08', status: 'soon', title: { zh: '交易心理与复盘', en: 'Trading psychology and review' }, blurb: { zh: '情绪管理、交易日志、复盘与策略优化', en: 'Emotions, a trade log, review, and refining a strategy' } }
  ],
  chapters: {
    '01': {
      title: { zh: 'K 线与价格行为', en: 'Candlesticks and price action' },
      lessons: [
        {
          id: '01',
          status: 'live',
          chart: 'a1',
          title: { zh: '一根 K 线究竟告诉我们什么？', en: 'What does one candlestick actually tell you?' },
          one: {
            zh: 'K 线记录某段时间的开盘、最高、最低、收盘（OHLC），不记录价格运行的完整顺序。',
            en: 'A candlestick records the open, high, low, and close (OHLC) for a period of time. It does not record the full order in which price moved.'
          },
          explain: {
            zh: '实体连接开盘价与收盘价；上影线到最高价，下影线到最低价。收盘高于开盘常画绿色，低于开盘常画红色，但平台配色可能相反。长影线表示期间价格曾到过那里，却不能单凭影线判断下一根涨跌。',
            en: 'The body connects the open and the close. The upper wick runs to the high, and the lower wick runs to the low. A close above the open is often drawn green, and a close below the open is often drawn red, but a platform can reverse those colors. A long wick means price traded there during that period. The wick alone does not tell you whether the next candle will rise or fall.'
          },
          example: {
            zh: '开100、高110、低95、收106：实体100–106，上影106–110，下影95–100。不能据此知道先涨到110还是先跌到95。',
            en: 'Open 100, high 110, low 95, close 106: the body is 100–106, the upper wick is 106–110, and the lower wick is 95–100. This still does not tell you whether price hit 110 first or 95 first.'
          },
          pitfalls: [
            { zh: '大阳线不等于必涨。', en: 'A large bullish candle does not mean price must rise.' },
            { zh: '影线不证明“主力操纵”。', en: 'A wick does not prove that “big players manipulated” the market.' }
          ],
          practice: {
            zh: '在 BTC 4H 任取三根 K 线，指出开高低收。',
            en: 'Pick any three BTC 4H candles and point out the open, high, low, and close.'
          },
          lab: { symbol: 'BTCUSDT', interval: '4h', studies: 'none' },
          quiz: {
            q: { zh: 'OHLC 能判断最高价发生在最低价之前吗？', en: 'Can OHLC tell you whether the high happened before the low?' },
            options: [
              { id: 'A', zh: '能', en: 'Yes' },
              { id: 'B', zh: '不能', en: 'No' }
            ],
            answer: 'B',
            why: {
              zh: '不能据此知道先涨到110还是先跌到95。',
              en: 'You cannot tell from this candle whether price reached 110 before 95, or 95 before 110.'
            }
          }
        },
        {
          id: '02',
          status: 'live',
          chart: 'a2',
          title: { zh: '为什么5分钟图和日线看起来相反？', en: 'Why can a 5-minute chart and a daily chart look opposite?' },
          scene: {
            zh: '日线是一根阳线的时候，5 分钟图为什么还能走出一段下跌？',
            en: 'If the daily candle is bullish, why can the 5-minute chart still show a decline?'
          },
          one: {
            zh: '不同周期是对同一段价格的不同尺度观察。',
            en: 'Different timeframes are different scales of the same prices.'
          },
          explain: {
            zh: '5分钟图把一天拆成很多段，日线把整天压成一根。日线收涨不代表其中每个5分钟都涨。短周期更容易受到噪声影响；长周期更适合观察较大结构，但反应也更慢。交易观察周期应与自己的持仓计划相匹配。',
            en: 'A 5-minute chart splits the day into many pieces. A daily candle compresses the whole day into one. A rising daily close does not mean every 5-minute candle rose. Shorter timeframes pick up more noise. Longer timeframes are better for larger structure, but they react more slowly. The timeframe you watch should match how long you plan to hold.'
          },
          example: {
            zh: '价格从早上100到晚上105，日线收涨；下午从108跌到103的两小时，短周期却可能是下降结构。',
            en: 'Price goes from 100 in the morning to 105 in the evening, so the daily candle rises. During two afternoon hours it falls from 108 to 103, so the shorter timeframe can show a downtrend.'
          },
          pitfalls: [
            { zh: '用一分钟图的波动推翻长期计划。', en: 'Letting a one-minute wiggle cancel a longer plan.' },
            { zh: '混用不同周期的支撑压力。', en: 'Mixing support and resistance from different timeframes.' }
          ],
          practice: {
            zh: '比较 BTC 15m、4H、1D 的高低点变化。',
            en: 'Compare how the highs and lows change on BTC 15m, 4H, and 1D.'
          },
          lab: { symbol: 'BTCUSDT', interval: '15m', studies: 'none' },
          check: {
            ask: {
              zh: '这组教学模拟里，哪句是对的？',
              en: 'Which statement matches this teaching simulation?'
            },
            options: [
              { id: 'A', zh: '日线收涨，同时下午两小时的 5 分钟可以连着收跌', en: 'The day closes up, while the afternoon 5-minute candles can keep closing down' },
              { id: 'B', zh: '日线收涨，所以每一根 5 分钟都收涨', en: 'The day closes up, so every 5-minute candle closes up' }
            ],
            answer: 'A',
            miss: {
              zh: '答错了。日线收涨不代表其中每个5分钟都涨。',
              en: 'Not right. A rising daily close does not mean every 5-minute candle rose.'
            },
            why: {
              zh: '价格从早上100到晚上105，日线收涨；下午从108跌到103的两小时，短周期却可能是下降结构。',
              en: 'Price goes from 100 in the morning to 105 in the evening, so the daily candle rises. During two afternoon hours it falls from 108 to 103, so the shorter timeframe can show a downtrend.'
            }
          },
          quiz: {
            q: { zh: '日线收阳意味着所有 5 分钟 K 线都收阳吗？', en: 'Does a bullish daily candle mean every 5-minute candle closed up?' },
            options: [
              { id: 'A', zh: '是', en: 'Yes' },
              { id: 'B', zh: '否', en: 'No' }
            ],
            answer: 'B',
            why: {
              zh: '日线收涨不代表其中每个5分钟都涨。',
              en: 'A rising daily close does not mean every 5-minute candle rose.'
            }
          }
        },
        {
          id: '03',
          status: 'live',
          chart: 'a3',
          title: { zh: '趋势、高点与低点', en: 'Trend, highs, and lows' },
          scene: {
            zh: '趋势是看最后一根 K 线的颜色，还是看重要高点和低点有没有抬高或降低？',
            en: 'Does trend come from the color of the last candle, or from whether the important highs and lows are rising or falling?'
          },
          one: {
            zh: '上升结构常见更高的高点HH和更高的低点HL；下降结构常见更低的高点LH和更低的低点LL。',
            en: 'An uptrend often shows a higher high (HH) and a higher low (HL). A downtrend often shows a lower high (LH) and a lower low (LL).'
          },
          explain: {
            zh: '先标记明显的摆动高低点，不要把每个小波动都算成转折。上涨中一次回调不必然意味着趋势结束；震荡区里高低点可能交错，没必要强行定方向。摆动点的选择也依赖时间周期和规则。趋势不是最后一根K线颜色，而是重要高点与低点是否持续抬高或降低。HH更高的高点、HL更高的低点、LH更低的高点、LL更低的低点。上涨结构常见HH+HL；下跌结构常见LH+LL；混合结构可能是震荡/转折/不明确。只描述已发生事实，不预测下一根。',
            en: 'Mark the obvious swing highs and lows. Do not treat every small wiggle as a turn. One pullback in a rise does not have to mean the trend is over. In a range, highs and lows can interleave, so there is no need to force a direction. Which swings you mark also depends on the timeframe and the rule. Trend is not the color of the last candle. It is whether the important highs and lows keep rising or falling. HH is a higher high, HL a higher low, LH a lower high, and LL a lower low. An uptrend often shows HH plus HL. A downtrend often shows LH plus LL. A mix can be a range, a turn, or simply unclear. Describe what has already happened. Do not predict the next candle.'
          },
          example: {
            zh: '高点100→110→120，低点90→98→105，是典型上移结构。跌破105可能提示结构变化，但不保证反转。爬楼梯也有暂时向下的一步。',
            en: 'Highs 100, then 110, then 120, and lows 90, then 98, then 105, are a typical rising structure. A break below 105 may hint that the structure is changing. It does not guarantee a reversal. Climbing stairs can include a step down.'
          },
          pitfalls: [
            { zh: '看到新高就断言继续上涨。', en: 'Treating a new high as proof that price must keep rising.' },
            { zh: '事后随意调整结构点。', en: 'Moving the swing points afterward so the story fits.' },
            { zh: '一根红K线不等于反转。', en: 'One red candle is not a reversal.' },
            { zh: 'HH/HL不等于保证未来上涨。', en: 'HH and HL do not guarantee a future rise.' },
            { zh: '不同周期可以相反。', en: 'Different timeframes can point in different directions.' }
          ],
          practice: {
            zh: '关闭指标，在BTC 4H上标出三个主要高点和低点。',
            en: 'Turn the indicators off and mark three main highs and lows on the BTC 4H chart.'
          },
          lab: { symbol: 'BTCUSDT', interval: '4h', studies: 'none' },
          check: {
            ask: {
              zh: '高点 105、112、120，低点 90、96、101。这组已经发生的摆动点属于？',
              en: 'Highs at 105, 112, and 120, lows at 90, 96, and 101. What structure has already happened?'
            },
            options: [
              { id: 'A', zh: '上涨结构', en: 'An up structure' },
              { id: 'B', zh: '下跌结构', en: 'A down structure' },
              { id: 'C', zh: '还不明确', en: 'Still unclear' }
            ],
            answer: 'A',
            misses: {
              B: {
                zh: '答错了。下跌结构常见更低的高点LH和更低的低点LL。这组高点和低点都在抬高。',
                en: 'Not right. A down structure usually shows a lower high (LH) and a lower low (LL). These highs and lows are rising.'
              },
              C: {
                zh: '答错了。这些高点和低点已经依次抬高，不是还分不出来。',
                en: 'Not right. These highs and lows have already stepped up. The direction is not still unclear.'
              }
            }
          },
          quiz: {
            q: { zh: '高点与低点持续上移通常属于？', en: 'Highs and lows that keep stepping up usually belong to which structure?' },
            options: [
              { id: 'A', zh: '上升', en: 'Up' },
              { id: 'B', zh: '下降', en: 'Down' }
            ],
            answer: 'A',
            why: { zh: '上升结构常见更高的高点HH和更高的低点HL。', en: 'An up structure usually shows a higher high (HH) and a higher low (HL).' }
          },
          quizzes: [
            {
              q: { zh: '高点与低点持续上移通常属于？', en: 'Highs and lows that keep stepping up usually belong to which structure?' },
              options: [
                { id: 'A', zh: '上升', en: 'Up' },
                { id: 'B', zh: '下降', en: 'Down' }
              ],
              answer: 'A',
              why: { zh: '上升结构常见更高的高点HH和更高的低点HL。', en: 'An up structure usually shows a higher high (HH) and a higher low (HL).' }
            },
            {
              q: { zh: '高点 105、112、120，低点 90、96、101，这组结构是？', en: 'Highs at 105, 112, and 120, lows at 90, 96, and 101. Which structure is this?' },
              options: [
                { id: 'A', zh: '下跌', en: 'Down' },
                { id: 'B', zh: '上涨', en: 'Up' },
                { id: 'C', zh: '必然暴涨', en: 'Must surge' }
              ],
              answer: 'B',
              why: { zh: '上涨结构常见HH+HL。这里高点和低点都在抬高。这只描述已经发生的事实，不表示下一根必然暴涨。', en: 'An up structure usually shows HH plus HL. These highs and lows are rising. That only describes what has already happened. It does not mean the next candle must surge.' }
            },
            {
              q: { zh: '刚出现一个疑似高点，可以立刻标成 HH 吗？', en: 'A possible high just printed. Can you mark it HH immediately?' },
              options: [
                { id: 'A', zh: '可以', en: 'Yes' },
                { id: 'B', zh: '要等右侧两根 K 线', en: 'Wait for two bars on the right' },
                { id: 'C', zh: '收盘是绿色就可以', en: 'Yes, if it closes green' }
              ],
              answer: 'B',
              why: { zh: '摆动点要左右各 2 根都满足，右侧两根出现之后才确认。不能因为这一根是绿色就确认。', en: 'A swing needs two bars on each side. It is confirmed only after the two bars on the right have printed. A green close is not enough.' }
            },
            {
              q: { zh: '5 分钟在跌，日线在涨，可能吗？', en: 'Can the 5-minute chart fall while the daily chart rises?' },
              options: [
                { id: 'A', zh: '数据一定错了', en: 'The data must be wrong' },
                { id: 'B', zh: '日线接下来必跌', en: 'The daily chart must then fall' },
                { id: 'C', zh: '不同周期可以方向不同', en: 'Different timeframes can point different ways' }
              ],
              answer: 'C',
              why: { zh: '不同周期可以相反。5 分钟下跌并不表示日线数据是错的，也不表示日线必然下跌。', en: 'Different timeframes can disagree. A falling 5-minute chart does not mean the daily data is wrong, and it does not mean the daily chart must fall.' }
            }
          ]
        },
        { id: '04', status: 'soon', title: { zh: '支撑与压力', en: 'Support and resistance' } },
        { id: '05', status: 'soon', title: { zh: '突破、假突破、回踩与震荡', en: 'Breakouts, failed breaks, retests, and ranges' } },
        { id: '06', status: 'soon', title: { zh: '成交量与价格', en: 'Volume and price' } }
      ]
    }
  }
};
