# 王朝编年史

> **纵览华夏五千年** — 从夏商周至元明清，帝王将相、金戈铁马、文化瑰宝——一部中华文明的数字方志。

![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff?style=flat-square&logo=vitepress&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

**内容规模**：🌍 37 个朝代专题 ｜ ⚔️ 99 篇战役实录 ｜ 👤 1000+ 人物传记 ｜ 📚 49 篇文化专题

---

## ✨ 项目特色

| 模块 | 说明 |
|------|------|
| 🏯 **朝代更迭** | 从夏商周到元明清，完整梳理每一个朝代的兴衰脉络、制度创新与历史遗产 |
| ⚔️ **著名战役** | 长平之战、巨鹿之战、赤壁之战、淝水之战……还原改变历史走向的关键战役 |
| 👤 **帝王将相** | 秦始皇、汉武帝、唐太宗、白起、诸葛亮——走进那些改变历史进程的风云人物 |
| 📚 **文化瑰宝** | 诗词歌赋、四大发明、百家争鸣——探寻延续五千年的中华文化根脉 |
| 🕐 **时间线** | 交互式历史时间线，直观呈现五千年历史脉络 |

---

## 🛠️ 技术栈

- **VitePress 1.x** — 基于 Vite & Vue 的静态站点生成器
- **Markdown** — 全部内容以 Markdown + YAML frontmatter 编写
- **GitHub Pages** — 通过 GitHub Actions 自动构建与部署

---

## 📁 项目结构

内容按「时代 → 朝代」的层级目录组织，与侧边栏分组一一对应：

```
dynasty-chronicles/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # 站点配置（导航、搜索、主题等）
│   │   ├── sidebar-gen.mjs      # 侧边栏自动生成脚本（扫描 frontmatter）
│   │   ├── check-links.mjs      # 全站死链校验脚本
│   │   ├── gen-random-pages.mjs # 随机页面生成（dev/build 前自动执行）
│   │   └── theme/               # 自定义主题（RandomButton 组件等）
│   ├── battles/                 # ⚔️ 战役，如 qinhan/chu-han/gaixia.md
│   ├── dynasties/               # 🏯 朝代，如 imperial/ming.md
│   ├── figures/                 # 👤 人物（各分类下再按时代→朝代细分）
│   │   ├── emperors/            #   帝王
│   │   ├── generals/            #   武将
│   │   ├── strategists/         #   谋臣
│   │   ├── scientists/          #   科学家
│   │   └── writers/             #   文学家
│   ├── culture/                 # 📚 文化（literature/philosophy/inventions/art）
│   ├── public/                  # 静态资源（favicon、logo 等）
│   ├── utils/                   # 朝代、年代等工具数据
│   ├── index.md                 # 首页
│   └── timeline.md              # 时间线页
├── scripts/                     # 批量生成/整理内容的辅助脚本
├── .github/workflows/
│   └── deploy.yml               # GitHub Pages 部署配置
├── package.json
└── README.md
```

---

## 🚀 快速开始

### 环境要求

- Node.js **20+**
- npm（或 pnpm / yarn）

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

浏览器访问 [http://localhost:5173](http://localhost:5173) 查看站点。

### 构建生产版本

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist/`。`docs:dev` 与 `docs:build` 都会先自动执行 `gen-random-pages.mjs` 生成随机页面数据。

### 预览生产构建

```bash
npm run docs:preview
```

---

## 📝 内容编写

### 通用流程

1. 按「时代 → 朝代」的目录层级放置文件（如 `docs/battles/qinhan/chu-han/`），子目录不存在时再创建。
2. 每个页面必须包含 YAML frontmatter，其中 `era` 决定侧边栏分组归属。
3. **侧边栏无需手动配置**：`sidebar-gen.mjs` 会在构建时扫描所有页面的 frontmatter 自动生成。
4. 手动同步对应板块的 `index.md` 总览表（表格为手写，与侧边栏相互独立）。

### 新增战役

参考 `docs/battles/qinhan/chu-han/gaixia.md` 的模板：

```markdown
---
title: 垓下之战
dynasty: 秦汉
era: 楚汉之争
start: -202            # 公元前用负数
description: "一句话简介"
---

# 垓下之战

> 公元前202 ｜ 楚汉争霸的终局之战。

---

## 📖 概述
...

## ⚔️ 双方实力
...

## 💡 战术亮点
...

## 🔗 相关人物
...

## 📖 参考资料
...
```

### 新增人物

- **帝王** → `docs/figures/emperors/`（格式「庙号 · 姓名」）
- **武将** → `docs/figures/generals/`
- **谋臣** → `docs/figures/strategists/`
- **科学家** → `docs/figures/scientists/`
- **文学家** → `docs/figures/writers/`

```markdown
---
title: 张巡
dynasty: 隋唐
type: general         # general / emperor / strategist / scientist / writer
era: 安史之乱
description: "一句话简介"
---

# 张巡
...
```

### 新增朝代

参考 `docs/dynasties/imperial/ming.md`：

```markdown
---
title: 明朝
period: 大一统皇朝
order: 8
start: '1368'
end: '1644'
capital: '南京→北京'
founder: 明太祖
last: 明思宗
keyword: 七下西洋
description: "一句话简介"
---

# 明朝
...
```

> 💡 提示：`era` 值需要落在 `docs/.vitepress/sidebar-gen.mjs` 的映射表内，新增页面时先用该脚本确认分组归属。

---

## ✅ 提交前校验

```bash
# 全站死链校验（必须零断链）
node docs/.vitepress/check-links.mjs

# 构建验证
npm run docs:build
```

---

## 🚢 部署

本项目通过 GitHub Actions 自动部署到 GitHub Pages。

### 触发条件

- 推送到 `main` 分支时自动触发
- 支持手动触发（`workflow_dispatch`）

### 工作流程

1. **Checkout** — 检出仓库代码
2. **Setup Node** — 配置 Node.js 20
3. **Install** — `npm ci` 安装依赖
4. **Build** — `npm run docs:build` 构建
5. **Deploy** — 上传产物到 GitHub Pages

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

## 🤝 致谢

- [VitePress](https://vitepress.dev/) — 文档框架
- [Vue.js](https://vuejs.org/) — 前端框架
