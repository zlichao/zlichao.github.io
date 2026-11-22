---
title: "Next.js 部署：GitHub Pages 能用吗？"
description: "拆解 Next.js 的资源需求，以及静态导出与 Node 服务器两条部署路线的分水岭。"
date: 2026-11-21
tags: ["前端", "部署", "Next.js", "CI/CD"]
category: "工程实践"
draft: false
---

这个问题像「我的车能加 92 号油吗」——答案藏在渲染模式里。

## 资源需求分三档

| 场景 | 服务器资源 | 说明 |
|------|-----------|------|
| 静态导出 | 运行时 0 | 只有 HTML/CSS/JS，随便一个静态托管都能放 |
| Node 服务器 | 官方最低一个 `next start` 进程 | 经验值：小站 512 MB 能起，1 GB+ 更稳 |
| 图片优化 | 唯一额外依赖 `sharp` | 不用 `next/image` 可省掉 |

Next.js 官方并没有给出硬性 RAM/CPU 门槛，只说「一个 Node.js server 就够了」。

## GitHub Pages：能，但只走独木桥

GitHub Pages 只托管静态文件，在 Next.js 官方文档里被归到 Static Only 那一栏。想用它，必须：

```js
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

代价是砍掉一堆能力：ISR、Server Actions、Middleware、Rewrites/Redirects、默认图片优化、读 Request/Cookies 的 Route Handlers。

## 分水岭

- **纯展示型**（博客、文档、作品集）→ 静态导出 + GitHub Pages，白嫖到底
- **要服务端能力**（登录、API、SSR）→ Vercel / 云托管 / VPS

GitHub Pages 免费额度：站点 ≤ 1 GB、带宽约 100 GB/月软限制、部署超时 10 分钟，且条款明确不能跑商业 SaaS。

## 我的选择

内容型站点我更倾向直接用 Astro——默认零 JS、官方 Action 一条龙，不用为了静态而给 Next.js「削足适履」。这个博客本身就是例子 😄
