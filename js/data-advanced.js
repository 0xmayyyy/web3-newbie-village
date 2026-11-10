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
        { id: '02', status: 'soon', title: { zh: '为什么5分钟图和日线看起来相反？', en: 'Why can a 5-minute chart and a daily chart look opposite?' } },
        { id: '03', status: 'soon', title: { zh: '趋势、高点与低点', en: 'Trend, highs, and lows' } },
        { id: '04', status: 'soon', title: { zh: '支撑与压力', en: 'Support and resistance' } },
        { id: '05', status: 'soon', title: { zh: '突破、假突破、回踩与震荡', en: 'Breakouts, failed breaks, retests, and ranges' } },
        { id: '06', status: 'soon', title: { zh: '成交量与价格', en: 'Volume and price' } }
      ]
    }
  }
};
