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
            zh: '先标记明显的摆动高低点，不要把每个小波动都算成转折。上涨中一次回调不必然意味着趋势结束；震荡区里高低点可能交错，没必要强行定方向。摆动点的选择也依赖时间周期和规则。趋势不是最后一根K线颜色，而是重要高点与低点是否持续抬高或降低。',
            en: 'Mark the obvious swing highs and lows. Do not treat every small wiggle as a turn. One pullback in a rise does not have to mean the trend is over. In a range, highs and lows can interleave, so there is no need to force a direction. Which swings you mark also depends on the timeframe and the rule. Trend is not the color of the last candle. It is whether the important highs and lows keep rising or falling.'
          },
          example: {
            zh: '高点100→110→120，低点90→98→105，是典型上移结构。跌破105可能提示结构变化，但不保证反转。',
            en: 'Highs 100, then 110, then 120, and lows 90, then 98, then 105, are a typical rising structure. A break below 105 may hint that the structure is changing. It does not guarantee a reversal.'
          },
          pitfalls: [
            { zh: '看到新高就断言继续上涨。', en: 'Treating a new high as proof that price must keep rising.' },
            { zh: '事后随意调整结构点。', en: 'Moving the swing points afterward so the story fits.' },
            { zh: '一根红K线不等于反转。', en: 'One red candle is not a reversal.' },
            { zh: 'HH/HL不等于保证未来上涨。', en: 'HH and HL do not guarantee a future rise.' },
            { zh: '不同周期可以相反。', en: 'Different timeframes can point in different directions.' },
            { zh: '市场总会有噪音破坏结构。', en: 'The market always has noise that can break the structure.' }
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
        {
          id: '04',
          status: 'live',
          chart: 'a4',
          title: { zh: '支撑与压力', en: 'Support and resistance' },
          scene: {
            zh: '支撑是一根碰到就必反弹的线，还是一块过去有过反应的价格区域？',
            en: 'Is support a line that must bounce, or a price zone that reacted before?'
          },
          one: {
            zh: '支撑压力是价格过去出现明显反应的区域，不是保证有效的精准价位。',
            en: 'Support and resistance are zones where price reacted before, not exact prices that are guaranteed to hold.'
          },
          explain: {
            zh: '支撑是价格跌到附近曾出现承接的区域；压力是涨到附近曾出现卖压的区域。实际绘图更适合画价格带，而非一条绝对精确的线。价格可以反弹、突破或直接穿过；过去有效不等于未来有效。支撑区为过去价格下探时曾出现反应的区间，压力区为上行时曾出现反应的区间；区域宽度由影线、波动和多次反应综合观察。价格可以穿越区域，角色转换不是必然。',
            en: 'Support is a zone where price found buyers on the way down. Resistance is a zone where price found sellers on the way up. It is more useful to draw a band than one perfectly exact line. Price can bounce, break, or pass through. What worked before is not the same as what must work next. A support zone is where dips reacted before. A resistance zone is where rallies reacted before. The width comes from wicks, the size of the swings, and how many times price reacted. Price can travel through a zone. A role change is not guaranteed.'
          },
          example: {
            zh: '98–102多次止跌，可暂视为候选支撑；之后跌到90，就说明这次没有守住。',
            en: 'If 98–102 stopped several declines, it can be treated for now as a candidate support zone. A later drop to 90 means it did not hold that time.'
          },
          pitfalls: [
            { zh: '把支撑当作必涨买点。', en: 'Treating support as a price that must rise.' },
            { zh: '为了让预测显得准确而事后挪线。', en: 'Moving the line afterward so a forecast looks right.' },
            { zh: '多次测试不等于永不跌破。', en: 'Several tests do not mean the zone can never break.' },
            { zh: '压力突破不等于必然变支撑。', en: 'A break of resistance does not have to become support.' }
          ],
          practice: {
            zh: '在BTC日线上画两个候选区域，记录成功和失败的触及案例。',
            en: 'On the BTC daily chart, draw two candidate zones and note touches that held and touches that failed.'
          },
          lab: { symbol: 'BTCUSDT', interval: '4h', studies: 'none' },
          check: {
            ask: {
              zh: '98–102 多次下探后又回升。这块更适合看成？',
              en: 'Price dipped into 98–102 more than once and then rose. What is the better description?'
            },
            options: [
              { id: 'A', zh: '绝对底部', en: 'An absolute bottom' },
              { id: 'B', zh: '候选支撑区', en: 'A candidate support zone' },
              { id: 'C', zh: '下一根必涨', en: 'The next candle must rise' }
            ],
            answer: 'B',
            misses: {
              A: {
                zh: '答错了。支撑压力是价格过去出现明显反应的区域，不是保证有效的精准价位，也不是绝对底部。',
                en: 'Not right. Support and resistance are zones where price reacted before, not an exact price that is guaranteed to hold, and not an absolute bottom.'
              },
              C: {
                zh: '答错了。过去有效不等于未来有效。不能由这块区域推出下一根必涨。',
                en: 'Not right. What worked before is not the same as what must work next. This zone does not mean the next candle must rise.'
              }
            }
          },
          quiz: {
            q: { zh: '支撑是？', en: 'Support is?' },
            options: [
              { id: 'A', zh: '必涨价位', en: 'A price that must rise' },
              { id: 'B', zh: '历史反应区域', en: 'A zone of past reactions' }
            ],
            answer: 'B',
            why: { zh: '支撑压力是价格过去出现明显反应的区域，不是保证有效的精准价位。', en: 'Support and resistance are zones where price reacted before, not exact prices that are guaranteed to hold.' }
          },
          quizzes: [
            {
              q: { zh: '支撑是？', en: 'Support is?' },
              options: [
                { id: 'A', zh: '必涨价位', en: 'A price that must rise' },
                { id: 'B', zh: '历史反应区域', en: 'A zone of past reactions' }
              ],
              answer: 'B',
              why: { zh: '支撑压力是价格过去出现明显反应的区域，不是保证有效的精准价位。', en: 'Support and resistance are zones where price reacted before, not exact prices that are guaranteed to hold.' }
            },
            {
              q: { zh: '支撑压力更适合看成？', en: 'Support and resistance are better treated as?' },
              options: [
                { id: 'A', zh: '永不失效的精确线', en: 'An exact line that never fails' },
                { id: 'B', zh: '一块价格区域', en: 'A price zone' }
              ],
              answer: 'B',
              why: { zh: '实际绘图更适合画价格带，而非一条绝对精确的线。', en: 'It is more useful to draw a band than one perfectly exact line.' }
            },
            {
              q: { zh: '价格第三次碰到支撑，接下来？', en: 'Price touches support for a third time. What comes next?' },
              options: [
                { id: 'A', zh: '必反弹', en: 'It must bounce' },
                { id: 'B', zh: '必跌破', en: 'It must break' },
                { id: 'C', zh: '仍需观察', en: 'It still has to be watched' }
              ],
              answer: 'C',
              why: { zh: '过去有效不等于未来有效。多次测试不等于永不跌破。', en: 'What worked before is not the same as what must work next. Several tests do not mean the zone can never break.' }
            },
            {
              q: { zh: '价格穿过压力之后，应该？', en: 'After price trades through resistance, you should?' },
              options: [
                { id: 'A', zh: '立刻宣布那里永远变成支撑', en: 'Immediately call it permanent support' },
                { id: 'B', zh: '观察后续', en: 'Watch what happens next' },
                { id: 'C', zh: '把历史反应删掉', en: 'Erase the earlier reactions' }
              ],
              answer: 'B',
              why: { zh: '价格可以穿越区域，角色转换不是必然。压力突破不等于必然变支撑。', en: 'Price can travel through a zone. A role change is not guaranteed. A break of resistance does not have to become support.' }
            }
          ]
        },
        {
          id: '05',
          status: 'live',
          chart: 'a5',
          title: { zh: '突破、假突破、回踩与震荡', en: 'Breakouts, failed breaks, retests, and ranges' },
          scene: {
            zh: '价格越过边界，是不是就等于已经稳稳突破？',
            en: 'If price crosses a boundary, does that already mean the breakout has held?'
          },
          one: {
            zh: '价格越过区间边界叫突破，但是否站稳要看后续表现。',
            en: 'Price crossing a range boundary is called a breakout. Whether it holds depends on what happens next.'
          },
          explain: {
            zh: '越过前高、前低或震荡区边界可称为突破；越过后很快返回原区间，常称假突破；突破后重新接近边界测试叫回踩。回踩不是每次都有，收盘确认和成交量只能提供辅助信息，不能保证突破成功。越过边界不等于稳稳突破；要区分影线越界、收盘越界、回踩和重新跌回。候选震荡区100–110，上边界观察带109–111；本课用4h收盘价>111作为收盘突破的条件。',
            en: 'A cross of a prior high, prior low, or range boundary can be called a breakout. A quick return into the old range is often called a failed breakout. A move back toward the boundary after the break is a retest. A retest does not happen every time. A closing confirmation and volume are only extra information. They do not guarantee success. Crossing a boundary is not the same as a breakout that has held. Separate a wick cross, a close cross, a retest, and a move back inside. The candidate range here is 100–110, and the upper watch band is 109–111. This lesson uses a 4-hour close above 111 as its close-break rule.'
          },
          example: {
            zh: '区间95–105，价格刺到107又收回103，是假突破示例；另一段收在108、回踩105后继续上行，是突破回踩示例。',
            en: 'In a 95–105 range, a poke to 107 that comes back to 103 is an example of a failed breakout. Another stretch that closes at 108, retests 105, and then continues up is an example of a breakout and retest.'
          },
          pitfalls: [
            { zh: '看到一根影线刺穿就追价。', en: 'Chasing because one wick poked through.' },
            { zh: '认为回踩必然出现。', en: 'Assuming a retest must happen.' },
            { zh: '影线越界不等于收盘确认。', en: 'A wick beyond the line is not a close confirmation.' },
            { zh: '收盘突破仍可失败。', en: 'A close beyond the line can still fail.' },
            { zh: '回踩不是必然发生。', en: 'A retest does not have to occur.' },
            { zh: '不能提前知道假突破。', en: 'You cannot know a failed breakout before it has failed.' }
          ],
          practice: {
            zh: '找一段历史震荡，分别标注成功和失败的突破。',
            en: 'Find a past range and mark one breakout that held and one that failed.'
          },
          lab: { symbol: 'BTCUSDT', interval: '4h', studies: 'none' },
          check: {
            ask: {
              zh: '最高 113，收盘 108，本课门槛是收盘价大于 111。这根满足收盘突破吗？',
              en: 'High 113, close 108. This lesson’s line is a close above 111. Does this candle meet that close rule?'
            },
            options: [
              { id: 'A', zh: '满足', en: 'Yes' },
              { id: 'B', zh: '不满足', en: 'No' },
              { id: 'C', zh: '所以它一定是假突破', en: 'So it must be a failed breakout' }
            ],
            answer: 'B',
            misses: {
              A: {
                zh: '答错了。本课用收盘价大于 111 作为收盘突破。收盘是 108，不满足。',
                en: 'Not right. This lesson uses a close above 111. The close is 108, so it does not meet that rule.'
              },
              C: {
                zh: '答错了。收盘没有大于 111，只是影线越过。不能提前把它叫成假突破。',
                en: 'Not right. The close is not above 111. Only the wick went beyond. That is not yet a failed breakout.'
              }
            }
          },
          quiz: {
            q: { zh: '瞬间高于压力就一定成功突破？', en: 'Does a brief move above resistance mean the breakout has succeeded?' },
            options: [
              { id: 'A', zh: '是', en: 'Yes' },
              { id: 'B', zh: '否', en: 'No' }
            ],
            answer: 'B',
            why: { zh: '价格越过区间边界叫突破，但是否站稳要看后续表现。', en: 'Crossing a range boundary is called a breakout. Whether it holds depends on what happens next.' }
          },
          quizzes: [
            {
              q: { zh: '瞬间高于压力就一定成功突破？', en: 'Does a brief move above resistance mean the breakout has succeeded?' },
              options: [
                { id: 'A', zh: '是', en: 'Yes' },
                { id: 'B', zh: '否', en: 'No' }
              ],
              answer: 'B',
              why: { zh: '价格越过区间边界叫突破，但是否站稳要看后续表现。', en: 'Crossing a range boundary is called a breakout. Whether it holds depends on what happens next.' }
            },
            {
              q: { zh: '最高 113，收盘 108，门槛是收盘价大于 111。这根怎么看？', en: 'High 113, close 108. The line is a close above 111. How do you read this candle?' },
              options: [
                { id: 'A', zh: '满足收盘突破', en: 'It meets the close rule' },
                { id: 'B', zh: '不满足收盘突破', en: 'It does not meet the close rule' },
                { id: 'C', zh: '一定是假突破', en: 'It must be a failed breakout' }
              ],
              answer: 'B',
              why: { zh: '收盘 108，没有大于 111，不符合本课的收盘突破。也不能因此就叫它假突破。', en: 'The close is 108, not above 111, so it does not meet this lesson’s close rule. That does not by itself make it a failed breakout.' }
            },
            {
              q: { zh: '先收在 112，下一根收在 107。这时能说什么？', en: 'Price closes at 112, then the next candle closes at 107. What can you say?' },
              options: [
                { id: 'A', zh: '之后必涨', en: 'It must rise after that' },
                { id: 'B', zh: '收盘回到了区间', en: 'The close came back into the range' },
                { id: 'C', zh: '不知道有没有收盘', en: 'There is no close to look at' }
              ],
              answer: 'B',
              why: { zh: '112 大于 111，107 又回到 100–110 里。收盘突破仍可失败。', en: '112 is above 111, and 107 is back inside 100–110. A close beyond the line can still fail.' }
            },
            {
              q: { zh: '回踩更准确的说法是？', en: 'Which statement about a retest is the accurate one?' },
              options: [
                { id: 'A', zh: '回踩必成功', en: 'A retest must succeed' },
                { id: 'B', zh: '回踩必反转', en: 'A retest must reverse' },
                { id: 'C', zh: '价格返回测试边界，但结果不定', en: 'Price comes back to test the boundary, and the result is not settled' }
              ],
              answer: 'C',
              why: { zh: '突破后重新接近边界测试叫回踩。回踩不是每次都有，也不能保证成功或反转。', en: 'A move back toward the boundary after a break is a retest. It does not happen every time, and it does not guarantee success or a reversal.' }
            }
          ]
        },
        {
          id: '06',
          status: 'live',
          chart: 'a6',
          title: { zh: '成交量与价格', en: 'Volume and price' },
          scene: {
            zh: '只看成交量，能不能知道下一根会涨还是会跌？',
            en: 'Can volume alone tell you whether the next candle will rise or fall?'
          },
          one: {
            zh: '成交量描述交易活跃程度，不能单独预测未来涨跌。',
            en: 'Volume describes how active trading is. It cannot by itself predict the next rise or fall.'
          },
          explain: {
            zh: '放量表示相对近期成交活跃，缩量表示相对清淡。成交量有交易所、交易对和单位差异；BTC成交量与USDT成交额不能混作同一数值。现货成交量和合约成交量也不同。缩量上涨不必然下跌，放量下跌也不必然反弹。价格反映这段时间的结果向哪边移动；成交量表示成交数量，不能单靠它预测下一根。成交量是指定市场、时段的成交标的数量；成交额是逐笔价格×数量求和；持仓量是未平仓合约规模，不是成交量。现货和永续的口径不可混淆。每笔成交有买卖双方，成交量柱不是净买入量。本课里，量增或量减只和上一根K线比较。',
            en: 'Heavier volume means trading is more active than the recent bars. Lighter volume means it is quieter. Volume depends on the exchange, the pair, and the unit. BTC volume and USDT turnover are not the same number. Spot volume and contract volume are also different. A rise on lighter volume does not have to be followed by a fall, and a drop on heavier volume does not have to bounce. Price shows which way the result of that period moved. Volume is how much was traded. It cannot by itself predict the next candle. Volume is the amount traded in a named market and period. Turnover adds price times size trade by trade. Open interest is the size of contracts still open, not volume. Spot and perpetual figures should not be mixed. Every trade has a buyer and a seller, so a volume bar is not net buying. In this lesson, more or less volume is compared only with the previous candle.'
          },
          example: {
            zh: '过去20根平均成交1000 BTC，本根1800 BTC可视为相对放量，但之后涨跌仍不确定。',
            en: 'If the last 20 candles averaged 1000 BTC and this one trades 1800 BTC, that is relatively heavy volume. What happens next is still not settled.'
          },
          pitfalls: [
            { zh: '把成交量当资金净流入。', en: 'Treating volume as net money flowing in.' },
            { zh: '认为放量一定是“主力”。', en: 'Assuming heavy volume must be “the big players”.' },
            { zh: '量大不必涨，量小不必跌。', en: 'Heavy volume does not have to rise, and light volume does not have to fall.' },
            { zh: '现货量不等于合约量。', en: 'Spot volume is not the same as contract volume.' },
            { zh: '收盘价乘成交量不是精确成交额。没有逐笔成交时，不能伪造精确成交额。', en: 'Close times volume is not exact turnover. Without each trade, do not invent an exact turnover figure.' }
          ],
          practice: {
            zh: 'BTC 4H找三根相对放量K线，记录后续走势，不预设结论。',
            en: 'On BTC 4H, find three relatively heavy candles, write down what happened next, and do not decide the ending in advance.'
          },
          lab: { symbol: 'BTCUSDT', interval: '4h', studies: 'none' },
          check: {
            ask: {
              zh: '第 6 根开 108、收 111、成交量 75 BTC。前一根成交量 130 BTC。这根是？',
              en: 'Candle 6 opens at 108, closes at 111, and trades 75 BTC. The previous candle traded 130 BTC. What is candle 6?'
            },
            options: [
              { id: 'A', zh: '缩量上涨', en: 'A rise on less volume' },
              { id: 'B', zh: '放量上涨', en: 'A rise on more volume' },
              { id: 'C', zh: '下一根必跌', en: 'The next candle must fall' }
            ],
            answer: 'A',
            misses: {
              B: {
                zh: '答错了。75 低于前一根 130，不是放量。收盘 111 高于开盘 108，是上涨。',
                en: 'Not right. 75 is below the previous 130, so this is not more volume. The close 111 is above the open 108, so it is a rise.'
              },
              C: {
                zh: '答错了。缩量上涨不必然下跌。不能单靠成交量预测下一根。',
                en: 'Not right. A rise on less volume does not have to be followed by a fall. Volume alone cannot predict the next candle.'
              }
            }
          },
          quiz: {
            q: { zh: '缩量下跌必然即将反弹？', en: 'Must a drop on less volume bounce soon?' },
            options: [
              { id: 'A', zh: '是', en: 'Yes' },
              { id: 'B', zh: '否', en: 'No' }
            ],
            answer: 'B',
            why: { zh: '成交量不能单独预测未来涨跌。放量下跌也不必然反弹。', en: 'Volume cannot by itself predict the next move. A drop on heavier volume does not have to bounce either.' }
          },
          quizzes: [
            {
              q: { zh: '缩量下跌必然即将反弹？', en: 'Must a drop on less volume bounce soon?' },
              options: [
                { id: 'A', zh: '是', en: 'Yes' },
                { id: 'B', zh: '否', en: 'No' }
              ],
              answer: 'B',
              why: { zh: '成交量不能单独预测未来涨跌。放量下跌也不必然反弹。', en: 'Volume cannot by itself predict the next move. A drop on heavier volume does not have to bounce either.' }
            },
            {
              q: { zh: '第 7 根开 111、收 107、成交量 210 BTC。前一根成交量 75 BTC。这根是？', en: 'Candle 7 opens at 111, closes at 107, and trades 210 BTC. The previous candle traded 75 BTC. What is candle 7?' },
              options: [
                { id: 'A', zh: '缩量上涨', en: 'A rise on less volume' },
                { id: 'B', zh: '放量下跌', en: 'A drop on more volume' },
                { id: 'C', zh: '缩量下跌', en: 'A drop on less volume' }
              ],
              answer: 'B',
              why: { zh: '收盘 107 低于开盘 111，成交量 210 高于前一根 75。本课把这叫放量下跌。', en: 'The close 107 is below the open 111, and 210 BTC is above the previous 75. This lesson calls that a drop on more volume.' }
            },
            {
              q: { zh: '一根成交量柱表示什么？', en: 'What does one volume bar show?' },
              options: [
                { id: 'A', zh: '只有买入', en: 'Buying only' },
                { id: 'B', zh: '买入减去卖出', en: 'Buying minus selling' },
                { id: 'C', zh: '指定时段的成交数量', en: 'The amount traded in that period' }
              ],
              answer: 'C',
              why: { zh: '成交量是指定市场、时段的成交标的数量。每笔成交有买卖双方，成交量柱不是净买入量。', en: 'Volume is the amount traded in a named market and period. Every trade has a buyer and a seller, so a volume bar is not net buying.' }
            },
            {
              q: { zh: '缩量上涨说明什么？', en: 'What does a rise on less volume show?' },
              options: [
                { id: 'A', zh: '下一根必跌', en: 'The next candle must fall' },
                { id: 'B', zh: '量低于比较基准，但后面还不确定', en: 'Volume is below the comparison, and what follows is not settled' },
                { id: 'C', zh: '一定被操纵', en: 'It must be manipulation' }
              ],
              answer: 'B',
              why: { zh: '本课的量增减只和上一根比。缩量上涨不必然下跌。不能把缩量上涨写成必跌。', en: 'In this lesson, more or less volume is compared only with the previous candle. A rise on less volume does not have to fall next. Do not write it as a certain drop.' }
            }
          ]
        }
      ]
    }
  }
};
