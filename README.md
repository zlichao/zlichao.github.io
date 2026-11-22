# Kevin Zhao 的个人主页

后端/全栈开发者的个人站，深色极客风，记录成长与技术分享。
部署在 GitHub Pages：https://zlichao.github.io

## 站点结构

- **首页** `/` — 终端启动画面风格的自我介绍、技能栈、最新笔记
- **笔记** `/notes/` — 全部技术笔记，支持标签筛选
- **笔记详情** `/notes/<id>/` — Markdown 渲染、代码高亮样式
- **关于** `/about/` — 个人介绍、成长时间线、联系方式

## 本地开发

```bash
npm install
npm run dev       # 本地预览 http://localhost:4321
npm run build     # 构建到 dist/
npm run preview   # 预览构建产物
```

## 怎么加一篇新笔记

在 `src/content/notes/` 下新建一个 `.md` 文件即可，例如 `my-post.md`：

```markdown
---
title: "文章标题"
description: "一句话简介，会显示在列表页"
date: 2026-11-22
tags: ["标签1", "标签2"]
category: "技术笔记"
draft: false
---

正文写在这里，支持标准 Markdown、代码块、表格。
```

保存后首页和笔记列表会自动更新。设 `draft: true` 可以隐藏草稿。

## 改成你自己的

用全局搜索替换这些占位内容：

| 位置 | 内容 |
|------|------|
| `src/pages/index.astro` | Hero 名字、简介、技能栈卡片 |
| `src/pages/about.astro` | 成长时间线、联系方式（GitHub / 邮箱） |
| `src/layouts/BaseLayout.astro` | 站点标题、导航、页脚文案 |
| `src/content/notes/*.md` | 示例笔记，可直接删掉换成自己的 |

配色调色板在 `src/layouts/BaseLayout.astro` 顶部的 `:root` 里（荧光绿 `--green`、青色 `--cyan` 等）。

## 技术栈

- Astro 7.4.1（静态输出，零 JS —— 标签筛选那点脚本是唯一的客户端 JS）
- Content Collections 管理 Markdown 笔记
- withastro/action@v6 + GitHub Actions 自动部署

## 部署

已配置好用户站点模式：`site = https://zlichao.github.io`，无 `base`，workflow 监听 `master`。
push 到 `master` 即自动构建发布（需在仓库 Settings → Pages → Source 选 GitHub Actions）。

## 注意

- 本地 Node 22.22.2，故锁定 Astro 7.4.1 + @astrojs/react 7.1.0。Astro 7.4.1 有一条中危安全公告（本模板纯静态输出，不受影响）。Node 升级到 22.23.4+ 后可 `npm install astro@latest @astrojs/react@latest`。
- GitHub Pages 限制：站点 ≤ 1 GB、带宽约 100 GB/月（软限制）、部署超时 10 分钟。
