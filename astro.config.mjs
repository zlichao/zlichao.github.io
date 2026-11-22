import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// 当前配置：用户站点 zlichao.github.io
// 仓库名 = 用户名.github.io，站点从根路径发布，不需要 base
// -----------------------------------------------------------
// 若日后改为项目站点（如 /my-blog/），只需：
//   site: 'https://zlichao.github.io', base: '/my-blog'
// 若绑定自定义域名（如 example.com），则：
//   site: 'https://example.com'，删掉 base，并在 public/CNAME 写入域名
// -----------------------------------------------------------
export default defineConfig({
  site: 'https://zlichao.github.io',
  // 用户站点无 base，链接走根路径
  output: 'static',
  integrations: [react()],
});
