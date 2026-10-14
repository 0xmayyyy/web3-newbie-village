# Web3 新手村 🧸

纯静态网站（HTML/CSS/JS），无需构建即可运行。

## 本地预览
    python3 -m http.server 8765   # 在本目录运行，然后打开 http://localhost:8765/

## 目录
- index.html            页面骨架
- css/style.css         样式（手机优先，含减少动画、焦点样式）
- js/config.js          ★ 维护配置：反馈联系方式、链接核验日期、交易所邀请链接、搜索别名
- js/data.js            由 content/content.md 自动生成的章节数据（勿手改）
- js/app.js             路由、搜索、进度、计算器、清单、自测、话术翻译器
- content/content.md    访客可见的全部文案（原稿 B 部分）
- tools/build.py        改了 content.md 后运行：pip install markdown && python3 tools/build.py
- tools/screenshots.py  Playwright 截图 + 冒烟测试
- assets/img/           小熊/熊猫插画

## 维护要点
- 反馈按钮：在 config.js 的 feedback 填写真实 url 或 email 后才显示。
- 核验：真实打开并确认某链接后，在 config.js 的 verified 中写 '网址': 'YYYY-MM-DD'；未写的一律显示「待核验」。
- 交易所邀请链接保留原参数；可用 enabled:false 暂停某个按钮。
- 学习进度只保存在访客浏览器 localStorage（键 w3nv-progress-v1）。
