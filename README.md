# 王朝编年史

> **纵览华夏五千年** — 从夏商周至元明清，帝王将相、金戈铁马、文化瑰宝——一部中华文明的数字方志。

![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff?style=flat-square&logo=vitepress&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ✨ 项目特色

| 模块 | 说明 |
|------|------|
| 🏯 **朝代更迭** | 从夏商周到元明清，完整梳理每一个朝代的兴衰脉络、制度创新与历史遗产 |
| ⚔️ **著名战役** | 长平之战、巨鹿之战、赤壁之战、淝水之战……还原改变历史走向的关键战役 |
| 👤 **帝王将相** | 秦始皇、汉武帝、唐太宗、白起、诸葛亮——走进改变历史进程的风云人物 |
| 📚 **文化瑰宝** | 诗词歌赋、四大发明、百家争鸣——探寻延续五千年的中华文化根脉 |
| 🕐 **时间线** | 交互式历史时间线，直观呈现五千年历史脉络 |

---

## 🛠️ 技术栈

- **VitePress** — 基于 Vite & Vue 的静态站点生成器
- **Markdown** — 所有内容以 Markdown 格式编写
- **GitHub Pages** — 通过 GitHub Actions 自动部署

---

## 📁 项目结构

```
dynasty-chronicles/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # 站点配置（导航、侧边栏、搜索等）
│   │   └── cache/              # VitePress 缓存
│   ├── battles/                # ⚔️ 著名战役
│   │   ├── index.md            #   战役总览
│   │   ├── changping.md        #   长平之战
│   │   ├── chibi.md            #   赤壁之战
│   │   ├── feishui.md          #   淝水之战
│   │   └── ...
│   ├── culture/                # 📚 文化瑰宝
│   │   ├── index.md            #   文化总览
│   │   ├── literature.md       #   文学
│   │   ├── philosophy.md       #   哲学思想
│   │   ├── inventions.md       #   科技发明
│   │   └── art.md              #   艺术
│   ├── dynasties/              # 🏯 朝代
│   │   ├── index.md            #   朝代总览
│   │   ├── xia.md              #   夏朝
│   │   ├── shang.md            #   商朝
│   │   ├── qin.md              #   秦朝
│   │   ├── han.md              #   汉朝
│   │   ├── sanguo.md           #   三国
│   │   ├── tang.md             #   唐朝
│   │   ├── song.md             #   宋朝
│   │   ├── yuan.md             #   元朝
│   │   ├── ming.md             #   明朝
│   │   ├── qing.md             #   清朝
│   │   └── ...
│   ├── figures/                # 👤 人物
│   │   ├── emperors/           #   帝王
│   │   ├── generals/           #   武将
│   │   ├── strategists/        #   谋臣
│   │   └── index.md
│   ├── public/                 # 静态资源
│   │   └── logo.svg
│   ├── utils/                  # 工具脚本
│   │   ├── dynasties.js
│   │   ├── eras.js
│   │   └── timeline.data.js
│   ├── index.md                # 首页
│   └── timeline.md             # 时间线
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
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

构建产物输出到 `docs/.vitepress/dist/`。

### 预览生产构建

```bash
npm run docs:preview
```

---

## 📝 内容编写

### 新增朝代

在 `docs/dynasties/` 下创建 `.md` 文件，需包含 frontmatter：

```markdown
---
title: 夏朝
dynasty: 上古
era: 约前2070–前1600
---

# 夏朝

> 中国历史上第一个世袭制王朝。

---

## 概述
...
```

### 新增战役

在 `docs/battles/` 下创建 `.md` 文件，建议格式：

```markdown
---
title: 战役名称
dynasty: 所属朝代
era: 历史时期
---

# 战役名称

> 时间 ｜ 交战方 ｜ 一句话概括。

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

- **帝王**：`docs/figures/emperors/`
- **武将**：`docs/figures/generals/`
- **谋臣**：`docs/figures/strategists/`

### 更新导航

所有导航和侧边栏配置集中在 `docs/.vitepress/config.mts` 中修改。

---

## 🚢 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

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
