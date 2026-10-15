/* 站点配置：维护者可直接修改此文件，无需构建。 */
window.SITE_CONFIG = {
  /* 反馈入口：填写真实联系方式后页脚才显示反馈按钮；留空则隐藏。
     例：url: 'https://github.com/xxx/issues/new' 或 email: 'hi@example.com' */
  feedback: { url: 'https://t.me/Mayyy00x', email: '' },

  /* 站长联系方式 */
  contacts: [
    { name: 'X', label: '@0xMayyy', url: 'https://x.com/0xMayyy' },
    { name: 'Telegram', label: '@Mayyy00x', url: 'https://t.me/Mayyy00x' }
  ],

  /* 打赏地址：逐字复制自站长消息，二维码 assets/img/donate-qr-*.svg 由同一字符串生成并已解码核对。
     修改后请运行 python3 tools/check_addresses.py */
  donate: [
    { key: 'bnb', chain: 'BNB Chain（BEP-20）', address: '0x496d22b39777f25fd6ef4999dc0def5d21ade8a0' },
    { key: 'eth', chain: 'Ethereum（ERC-20）', address: '0x496d22b39777f25fd6ef4999dc0def5d21ade8a0' },
    { key: 'tron', chain: 'TRON（TRC-20）', address: 'TEYeM3B58MTtpR4kAgrM6zEYZAnoPJdXUU' },
    { key: 'sol', chain: 'Solana', address: '38CPbiomk2C9A4DqKyHkv4kndekwp7mftnydD7DmRJAJ' }
  ],

  /* 链接核验记录：只有在浏览器中真实打开并通过官方渠道确认后，才按 '网址': 'YYYY-MM-DD' 填写。
     未填写的链接在页面上一律显示「待核验」。不要编造日期。 */
  verified: {
    'https://www.panewslab.com/zh': '2026-10-15',
    'https://www.odaily.news/zh-CN': '2026-10-15',
    'https://www.theblockbeats.info/': '2026-10-15',
    'https://www.coindesk.com/': '2026-10-15',
    'https://www.theblock.co/': '2026-10-15',
    'https://academy.binance.com/': '2026-10-15',
    'https://accounts.binance.info/zh-CN/register?ref=I1GN6RMJ': '2026-10-15',
    'https://arbiscan.io/': '2026-10-15',
    'https://basescan.org/': '2026-10-15',
    'https://bitcoin.org/bitcoin.pdf': '2026-10-15',
    'https://bitcoin.org/en/bitcoin-paper': '2026-10-15',
    'https://bitcoin.org/en/faq': '2026-10-15',
    'https://bscscan.com/': '2026-10-15',
    'https://coinmarketcap.com/': '2026-10-15',
    'https://debot.ai/r/0xMay': '2026-10-15',
    'https://defillama.com/': '2026-10-15',
    'https://dexscreener.com/': '2026-10-15',
    'https://ethereum.org/learn/': '2026-10-15',
    'https://ethereum.org/security/': '2026-10-15',
    'https://etherscan.io/': '2026-10-15',
    'https://gopluslabs.io/en': '2026-10-15',
    'https://mempool.space/': '2026-10-15',
    'https://partner.bybit.com/b/0xmay': '2026-10-15',
    'https://www.gatewebsite.app/share/u1dgb10j': '2026-10-15',
    'https://revoke.cash/': '2026-10-15',
    'https://solscan.io/': '2026-10-15',
    'https://t.me/Mayyy00x': '2026-10-15',
    'https://tronscan.org/': '2026-10-15',
    'https://web3.binance.com/referral?ref=BFSADLNM': '2026-10-15',
    'https://www.coinbase.com/learn': '2026-10-15',
    'https://www.coingecko.com/': '2026-10-15',
    'https://www.htx.com/invite/zh-cn/1h?invite_code=jdz98223': '2026-10-15',
    'https://www.tradingkey.com/zh-hans/news/cryptocurrencies': '2026-10-15',
    'https://www.tradingview.com/': '2026-10-15',
    'https://x.com/0xMayyy': '2026-10-15',
    'https://robinhoodchain.blockscout.com/': '2026-10-15',
    'https://robin.etherscan.io/': '2026-10-15'
  },

  /* 专属邀请链接：页面上显示「专属邀请链接」小标签。
     只有在确认该邀请链接注册后确实享有手续费减免时，才把 feeDiscount 改为 true，
     标签会变成「专属邀请链接 · 注册享手续费减免」。 */
  referrals: {
    'https://accounts.binance.info/zh-CN/register?ref=I1GN6RMJ': { feeDiscount: false },
    'https://partner.bybit.com/b/0xmay': { feeDiscount: false },
    'https://www.gatewebsite.app/share/u1dgb10j': { feeDiscount: false },
    'https://www.htx.com/invite/zh-cn/1h?invite_code=jdz98223': { feeDiscount: false },
    'https://web3.binance.com/referral?ref=BFSADLNM': { feeDiscount: false },
    'https://debot.ai/r/0xMay': { feeDiscount: false }
  },

  /* CEX 邀请注册入口（用户提供的邀请链接，保留参数，勿改成官网首页）。
     enabled: false 可临时停用某个按钮。 */
  exchanges: [
    { name: 'Binance', mainDomain: 'binance.com', url: 'https://accounts.binance.info/zh-CN/register?ref=I1GN6RMJ', enabled: true },
    { name: 'Bybit', mainDomain: 'bybit.com', url: 'https://partner.bybit.com/b/0xmay', enabled: true },
    { name: 'Gate', mainDomain: 'gate.com', url: 'https://www.gatewebsite.app/share/u1dgb10j', enabled: true },
    { name: 'HTX', mainDomain: 'htx.com', url: 'https://www.htx.com/invite/zh-cn/1h?invite_code=jdz98223', enabled: true }
  ],

  /* 链上交易工具（二级市场链上买卖，不是一级市场） */
  onchain: [
    { name: 'DeBot', desc: '链上 Meme 币交易与跟踪工具', url: 'https://debot.ai/r/0xMay' },
    { name: '币安 Web3 钱包', desc: '无私钥（MPC）钱包，内置链上兑换', url: 'https://web3.binance.com/referral?ref=BFSADLNM' }
  ],

  /* 搜索别名：同一组里的词互相等价 */
  aliases: [
    ['爆仓', '强平', '清算', 'liquidation', '保证金'],
    ['助记词', 'seed phrase', 'seed', '恢复短语', '私钥', 'private key', '备份'],
    ['gas', '网费', '网络费', '矿工费', '手续费', 'fee'],
    ['钱包', 'wallet', '冷钱包', '硬件钱包', '热钱包', '自托管'],
    ['一级市场', '私募', '公募', 'ido', 'launchpad', '早期'],
    ['二级市场', '买卖', '流转'],
    ['空投', 'airdrop', '撸毛', '积分', '测试网'],
    ['滑点', 'slippage', '价格影响', '价差'],
    ['授权', 'approve', 'approval', '签名', '盲签', '撤销', 'revoke'],
    ['稳定币', 'usdt', 'usdc', '脱锚'],
    ['交易所', 'cex', 'dex', '币安', 'binance', 'bybit', 'gate', 'htx', '火币'],
    ['合约', '永续', 'perp', '杠杆', '期货', '资金费率', 'funding rate'],
    ['kyc', '实名', '身份验证'],
    ['白皮书', 'whitepaper', '中本聪', 'satoshi', '比特币', 'btc'],
    ['区块浏览器', 'robinhood', 'blockscout', 'etherscan', 'tronscan', 'bscscan', 'solscan', 'basescan', 'txid', '交易哈希', 'hash'],
    ['memo', 'tag', '备注', '标签'],
    ['跨链', '跨链桥', 'bridge', '桥'],
    ['质押', 'staking', 'earn', '理财', 'apr', 'apy', '年化'],
    ['止损', 'stop loss', '仓位', '风险管理'],
    ['做多', 'long', '做空', 'short'],
    ['出金', '入金', '提现', '充值', 'p2p', 'otc'],
    ['骗局', '诈骗', '防骗', 'scam', '钓鱼', '假客服', '地址投毒'],
    ['剪贴板', '粘贴板', 'clipboard'],
    ['k线', 'k 线', '蜡烛图', 'rsi', 'macd', 'ema', '布林带', '斐波那契', '指标'],
    ['meme', '土狗', 'memecoin', 'meme 币', '高风险小币', '金狗'],
    ['狗庄', '庄家', '市场操纵', '操纵', '拉盘', '砸盘', '控盘', '出货'],
    ['韭菜', '割韭菜', '接盘', '追高', 'fomo', '被套'],
    ['上车', '下车', '买入', '入场', '离场', '卖出', '止盈'],
    ['梭哈', 'all in', '满仓', '全仓'],
    ['报单', '喊单', '带单', 'kol', '推荐', '返佣', '推广'],
    ['换汇', '兑换', 'swap', '闪兑', '快捷兑换', '换币'],
    ['黑u', '黑 u', '冻卡', '银行卡冻结', '杀猪盘', '跑分', '收u', '高价收u', '帮信罪', '掩隐罪', '洗钱', '带单群'],
    ['无私钥', '无私钥钱包', 'mpc', '多方计算', '币安钱包', 'binance wallet', '币安 web3 钱包', '币安钱包（无私钥）', '无助记词', '密钥分片', '链上钱包', '钱包推荐', '新手钱包', '用什么钱包', 'web3钱包', 'web3 钱包'],
    ['跑路', 'rug pull', 'rug', '貔貅', 'honeypot', '卷款', '归零']
  ]
};
