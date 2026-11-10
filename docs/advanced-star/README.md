# 进阶知识星 · 协作说明

## 铁律

所有操作不允许修改一二大王原有的内容。GPT 和编程布都只能新增；任何需要改动、删除、重写原有课程、文案、页面、样式或功能的地方，必须先停下来，在 PR 里写明原因，等一二大王确认。

GPT 是设计：写课程正文、配图需求、图解规格和审阅意见，并维护 `TASKS.md`。编程布是开发：按这些文件改网站。GPT 用 Pull Request 提交改动，不要直接推到 `main`。

## 站点约束

- 不改 V23 行情实验室的多窗格引擎、SMC 算法、指标计算和行情请求。
- 品牌保持「Web3 新手村」。
- 隐私表述保持「本站不收集任何个人信息」。
- 图中的价格必须是可核对的确定数据，并标明「教学模拟」。不要编造行情。

## 代码位置

课程数据在 `js/data-advanced.js`，页面和图在 `js/advanced.js`，样式在 `css/advanced.css`。后续课文优先只改数据文件。

`window.ADVANCED_STAR` 的字段：

- `enReview`：英文是否仍待站长审阅。
- `tagline.zh` / `tagline.en`：星球总览副标题。
- `modules[]`：`id`、`status`（`open` 或 `soon`）、`title`、`blurb`。`title` 与 `blurb` 都是 `{ zh, en }`。
- `chapters[id].title`：章节标题，`{ zh, en }`。
- `chapters[id].lessons[]`：
  - `id`、`status`（`live` 或 `soon`）。未上线的课可以只有 `id`、`status`、`title`。
  - `chart`：图解编号，例如 `a1`。
  - `title`、`one`、`explain`、`example`、`practice`：`{ zh, en }`。
  - `pitfalls`：`{ zh, en }` 数组。
  - `lab`：`symbol`、`interval`、`studies`。实验室只有真正读取这些参数时才自动预选。
  - `quiz`：`q`、`options`（`id`、`zh`、`en`）、`answer`、`why`。`q` 与 `why` 是 `{ zh, en }`。

目录：`lessons/` 教材，`illustrations/` 图需，`chart-specs/` 图解规格，`reviews/` 审阅，`TASKS.md` 待办。
