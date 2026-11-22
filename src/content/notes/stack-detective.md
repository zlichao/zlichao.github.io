---
title: "当侦探：如何一眼看穿一个网站的技术栈"
description: "不用问开发者，从 HTML、JS chunk 和响应头里扒出框架、UI 库和部署平台的证据链。"
date: 2026-11-20
tags: ["工具", "前端", "方法论"]
category: "工程实践"
draft: false
---

想知道一个网站用什么技术栈？别猜，去源码里找证据。这是我的侦查流程 🕵️

## 第一层：HTML 结构

看资源路径就知框架：

- `/_next/static/...` → Next.js
- `/_nuxt/...` → Nuxt
- `/assets/index-[hash].js` → 大概率 Vite 系（Vue/Astro）

`<body class="font-sans antialiased">` 这种是 Tailwind 的招牌。

## 第二层：JS chunk

下载几个核心 chunk 搜关键词，版本号往往就藏在里面：

```bash
curl -sL https://example.com | grep -o '/_next/static/chunks/[^"]*\.js' | head
# 在 chunk 里搜 "14.2.35"、"t.version=" 之类
```

React 的 `t.version="18.3.0-canary-..."` 就是这么翻出来的。

## 第三层：CSS 指纹

- `id="antd-cssinjs"` + `.ant-btn` → Ant Design 5
- 大量 `--tw-*` 变量 → Tailwind CSS
- `.lucide lucide-*` → lucide 图标库

## 第四层：响应头

这可能是最容易被忽略的宝藏：

```bash
curl -sI https://example.com
```

- `x-powered-by: Next.js` → 实锤框架
- `x-cloudbase-upstream-type: Tencent-CloudBaseRun` → 腾讯云云托管
- `EO-Cache-Status` → 边缘 One CDN

## 证据分级

把结论分成「实锤」和「推断」很重要：chunk 里的版本号是实锤；「用 TypeScript」这种从产物看不出来的，就诚实标注为推断。技术侦查和写论文一样，**证据链要经得起追问**。
