# Astro + GitHub Pages 模板

一个最小可运行的 Astro 静态站点模板，配好了 GitHub Actions 自动部署。

## 本地开发

```bash
npm install
npm run dev       # 本地预览 http://localhost:4321
npm run build     # 构建到 dist/
npm run preview   # 预览构建产物
```

## 部署到 GitHub Pages（当前目标：zlichao.github.io）

本模板已配置好 **用户站点**模式，`site = https://zlichao.github.io`，无 `base`，workflow 监听 `master` 分支（仓库默认分支）。

迁移状态（已完成本地部分）：

1. ✅ 旧 Jekyll 站点已备份在 `E:\zlichao-github-io-backup`
2. ✅ 本目录（`E:\zlichao-github-io`）已替换为 Astro 模板，旧 Jekyll 文件已 git rm
3. ✅ 依赖已安装、构建已验证通过（`npm run build`）
4. ✅ Git 身份已配置（Kevin-Zhao <zlichao0910@gmail.com>，仅本仓库），commit 已完成：`fd668da 迁移到 Astro`
5. ⬜ 待操作：在 GitHub 仓库 Settings → Pages → Source 选 **GitHub Actions**
6. ⬜ 待操作：`git push origin master`，几分钟后 https://zlichao.github.io 上线

### 若换个仓库，配置对照

- 用户站点（仓库名 `<用户名>.github.io`）：`site` 填 `https://<用户名>.github.io`，**删掉 base**，workflow 分支对齐仓库默认分支
- 项目站点（例如仓库名 `my-blog`）：`site` 填 `https://<用户名>.github.io`，`base` 填 `'/my-blog'`
- 自定义域名：`site` 填你的域名，删掉 base，并把 `public/CNAME.example` 改名为 `CNAME` 写入域名

## 目录结构

```
├── .github/workflows/deploy.yml   # 自动构建部署
├── public/                        # 静态文件原样输出
├── src/
│   ├── components/Counter.jsx     # React island 示例
│   ├── layouts/BaseLayout.astro   # 共享布局
│   └── pages/                     # 路由页面
├── astro.config.mjs               # 站点与部署配置
└── package.json
```

## 技术栈

- Astro 7.4.1（静态输出）
- React 19（仅 island 部分加载 JS）
- withastro/action@v6（官方部署 Action）

## 注意

- **版本选择**：本地 Node 是 22.22.2，故锁定 Astro 7.4.1 + @astrojs/react 7.1.0（已实测构建通过）。这版 Astro 有一条中危安全公告（动态标签名 XSS / @astrojs/node 图片端点路径问题，GHSA-mh32-jxcr-mh9f），本模板是纯静态输出、不用 @astrojs/node、无动态标签名，不受影响。若本地 Node 升级到 22.23.4+，建议 `npm install astro@latest @astrojs/react@latest` 跟进修复版。
- GitHub Actions 云端构建默认用 Node 24，不受本地 Node 版本限制。
- GitHub Pages 限制：站点 ≤ 1 GB、带宽约 100 GB/月（软限制）、部署超时 10 分钟。
