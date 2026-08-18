# AGENTS.md — AI 协作规范

本文件供 AI 编程工具（Claude Code / Cursor / Qoder 等）阅读。修改本项目内容前请先通读本文件。

## 项目概述

VitePress 1.x 构建的历史科普站点「王朝编年史」。内容全部为 Markdown，位于 `docs/` 下四大板块：`battles/`（战役）、`figures/`（人物）、`dynasties/`（朝代）、`culture/`（文化）。纯内容型项目，无前端源码需要维护，核心工作是**新增/修订 Markdown 页面并保持站内链接一致**。

## 常用命令

```bash
npm run docs:dev     # 本地开发预览
npm run docs:build   # 构建（会先跑 gen-random-pages.mjs）
node docs/.vitepress/check-links.mjs   # 全站死链校验，必须零断链
node docs/.vitepress/sidebar-gen.mjs   # 打印自动生成的侧边栏 JSON（调试用）
```

**提交前必做**：`check-links.mjs` 通过 + `docs:build` 成功。

## 侧边栏机制（最重要）

侧边栏**不是手写配置**，由 `docs/.vitepress/sidebar-gen.mjs` 扫描所有 md 的 frontmatter 自动生成。新增页面**不需要改任何配置**，只需保证 frontmatter 的 `era` 值在脚本的映射表内：

- `ERA_TO_GROUP`：era → 侧边栏一级分组
- `ERA_SUBGROUP_MAP`：era → 二级子分组
- 映射表位于 sidebar-gen.mjs 顶部，若 era 值不在表内会落入"其他"或按原值分组，视为错误

Frontmatter 关键字段：

```yaml
---
title: 垓下之战        # 侧边栏显示名
dynasty: 秦汉          # 朝代归属（人物页还会用于正文朝代栏）
era: 楚汉之争          # 侧边栏分组依据，必须查映射表
type: general          # 人物专用：general / emperor / strategist
order: 1               # 可选，同组排序（数字小靠前）
start: -202            # 战役专用：年份，负数 = 公元前
description: "一句话简介"  # SEO/卡片摘要
---
```

## 新增战役的完整流程

1. 按**时代 → 朝代**的目录层级放置，参照现有目录（如 `docs/battles/sanguo/qunxiong/`）。子目录已存在就复用，不要另起新名。
2. 复制同类战役的模板结构（推荐参考 `docs/battles/qinhan/chu-han/gaixia.md`）：frontmatter → `# 战役名` → `> 年份 ｜ 一句话导语` → `## 📖 概述` → `## ⚔️ 双方实力`（阵营/统帅/兵力表格）→ `## 💡 战术亮点`（3 个**加粗**要点）→ `## 🔗 相关人物` → `## 📖 参考资料`，段落间用 `---` 分隔。
3. **手动更新 `docs/battles/index.md` 总览表**，按时间顺序插入行，格式与现有行完全一致。
4. 相关人物**只链接实际存在的文件**，用 `find docs/figures -name "*.md"` 或 grep title 确认；不存在的人物用纯文字列出，不要造死链。

## 新增人物的完整流程

1. 类别与目录：帝王 `figures/emperors/`、武将 `figures/generals/`、谋臣 `figures/strategists/`、科学家 `figures/scientists/`，其下按时代 → 朝代子目录。
2. 模板：武将参考 `generals/suitang/tang/zhang-xun.md`，谋臣参考 `strategists/songliao/nansong/yu-yun-wen.md`，帝王参考 `emperors/jinchao/shiliuguo/fu-jian.md`（帝王页含庙号/谥号/在位，标题格式"庙号 · 姓名"）。
3. **手动同步各总览索引**（都是手写表格）：`figures/generals/index.md`、`figures/strategists/index.md`、`figures/emperors/index.md`（emperors 索引按朝代分小节、朝代内按在位时间排序）、`figures/scientists/index.md`（多一列"领域"，按 古代/民国/现代 分段）。
4. 帝王板块东周部分**只收周天子，不收诸侯君主**（齐桓公、秦穆公、吴王阖闾等均不建页）——这是项目既定约定。
5. 科学家板块：**按时代分组，不按学科分组**；学科用 frontmatter 的 `field` 字段 + 总览表"领域"列表达；1912 年后人物 era 用 `民国`（1912–1949）或 `现代`（1949 后），归入侧边栏"现代"一级分组；古代科学家复用现有 era 键（战国/东汉/北宋等）。

## 关键约定与易错点

- **era 值断代惯例**：三国战役 220 年前用 `东汉末年`、之后用 `三国初年`，`dynasty` 字段一律写 `三国`。
- **朝代页链接路径**（正文"朝代"栏）：唐 `/dynasties/suitang/tang`；南宋 `/dynasties/songliao/southern-song`；明/清/元 `/dynasties/imperial/{ming,qing,yuan}`；十六国 `/dynasties/weijin/sixteen-kingdoms`。写前先看同目录现有文件照抄。
- **非汉族/非中原人物归类**：也先（瓦剌）放 `generals/ming/`、era 用 `明`，页面内注明按时期归类即可；拖雷这类追尊庙号的帝王照常入 `emperors/yuan/`。
- **容易误判为"缺失"但实际已有页面的人物**（新增链接前务必 grep title 确认）：曹操 `emperors/qinhan/donghanmo/cao-cao`、完颜亮 `emperors/songliao/jin/wan-yan-liang`、蒙哥 `emperors/yuan/yuan-xianzong`、唐代宗/唐宪宗 `emperors/suitang/tang/`、满桂 `generals/ming/man-gui`。
- **slug 拼写陷阱**：伍子胥是 `wu-zi-xu`（不是 wu-zixu）；编辑失败先 Read 文件核对实际字符串，不要凭记忆重试。
- **文件编码**：一律 UTF-8（无 BOM）。Windows 环境下写文件后建议抽查首行中文是否正常。
- **index.md 总览表是手动的**，侧边栏是自动的——两者机制独立，漏更新 index 不会报错，需要人工保证。

## 批量内容生成建议

大批量新增（如补一个朝代的战役/人物）时：先规划清单并核对每个引用链接的目标文件是否存在 → 并行子任务分批写文件 → 主流程同步更新各 index.md → 最后统一跑 `check-links.mjs` + `docs:build` 验证。参考文献格式：`《史记》· 项羽本纪`（史籍名 + 篇目）。
