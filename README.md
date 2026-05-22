---
AIGC: {"Label":"1","ContentProducer":"001191110108MA01KP2T5U00000","ProduceID":"1b9d6b5c439c7b537e3c224cf0d99985","ReservedCode1":"","ContentPropagator":"001191110108MA01KP2T5U00000","PropagateID":"1b9d6b5c439c7b537e3c224cf0d99985","ReservedCode2":""}
---

# Yuami

> 生命绚烂，别被黑暗压垮

基于 [Astro](https://astro.build) 的动漫风格个人博客，融合 Live2D 看板娘、樱花飘落、毛玻璃卡片等视觉元素，明暗双主题，纯 CSS 变量驱动。

**在线预览**：[yqamm.cc.cd](https://yqamm.cc.cd)  
**仓库地址**：[github.com/qitinyu/Yuami](https://github.com/qitinyu/Yuami)

---

## 特性

- **Astro SSG** — 纯静态生成，零 JS 框架运行时，极快加载
- **明暗主题** — CSS 变量一键切换，主题色 `#7D98F5`
- **朱雀仿宋** — 自定义 woff2 全局字体
- **Live2D 看板娘** — 支持 moc3 模型切换、拖拽、隐藏
- **樱花飘落** — CSS + JS 粒子动画
- **音乐播放器** — 网易云歌单，Meting API 代理
- **Twikoo 评论** — CDN 引入，双源回退（jsDelivr + npmmirror）
- **Umami 统计** — 轻量隐私友好分析
- **Content Collections** — 类型安全的 Markdown 内容管理
- **响应式** — 适配桌面 / 平板 / 手机

---

## 快速开始

### 环境要求

- Node.js >= 18.14
- pnpm / npm

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/qitinyu/Yuami.git
cd Yuami

# 安装依赖
npm install

# 启动开发服务器（默认 localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

---

## 项目结构

```
Yuami/
├── config.ts                  # 📌 全局站点配置（核心）
├── astro.config.mjs           # Astro 框架配置
├── package.json
├── tsconfig.json
│
├── public/                    # 静态资源（直接复制到构建输出）
│   ├── avatar.webp            #   头像
│   ├── favicon.ico            #   网站图标
│   ├── logo.webp              #   Logo
│   ├── font/zqfs.woff2       #   朱雀仿宋字体
│   ├── live2/models/          #   Live2D 模型（jk/ cmtt/）
│   ├── huiyi/                 #   回忆相册图片
│   ├── les/                   #   LES 作品图
│   └── games/                 #   游戏封面图
│
└── src/
    ├── components/            # Astro 组件
    │   ├── Navbar.astro       #   导航栏 + 移动端菜单
    │   ├── Footer.astro       #   页脚
    │   ├── SidebarWidget.astro#   侧边栏（公告/统计/社交）
    │   ├── FloatingButtons.astro # 悬浮按钮 + 音乐播放器
    │   ├── Live2D.astro       #   看板娘
    │   ├── Sakura.astro       #   樱花飘落特效
    │   └── Twikoo.astro       #   评论区（通用组件）
    │
    ├── layouts/
    │   └── BaseLayout.astro   # 全局基础布局
    │
    ├── pages/                 # 页面路由
    │   ├── index.astro        #   首页
    │   ├── blog/              #   博文（列表 + [slug] 详情）
    │   ├── travel/            #   旅记（列表 + [slug] 详情）
    │   ├── memory/            #   回忆相册
    │   ├── bangumi/           #   番剧追番
    │   ├── game/              #   闲游（游戏记录）
    │   ├── les/               #   LES 创作展示
    │   ├── friends/           #   友链
    │   ├── friends-circle/    #   朋友圈
    │   └── about/             #   关于页
    │
    ├── content/               # Content Collections
    │   ├── config.ts          #   集合 Schema 定义
    │   ├── posts/             #   博文 Markdown
    │   └── diary/             #   日记 Markdown
    │
    ├── data/                  # 数据源（TypeScript）
    │   ├── bangumi.ts         #   番剧数据
    │   ├── game.ts            #   游戏数据
    │   ├── les.ts             #   LES 创作数据
    │   ├── friends.ts         #   友链数据
    │   ├── memory.ts          #   回忆相册数据
    │   └── footer.ts          #   页脚配置
    │
    └── styles/
        └── global.css         # 全局样式（变量/动画/组件）
```

---

## 配置说明

### 站点信息 — `config.ts`

编辑根目录的 `config.ts` 修改全局配置：

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `title` / `subtitle` | 站点标题与副标题 | `'Yuami'` / `'生命绚烂，别被黑暗压垮'` |
| `url` | 站点 URL | `'https://yqamm.cc.cd'` |
| `author` / `email` | 作者信息 | `'Yuami'` / `'484894496@qq.com'` |
| `themeColor` | 主题色 | `'#7D98F5'` |
| `navItems` | 导航菜单（支持二级） | 见源码 |
| `socialLinks` | 社交链接 | GitHub / B站 / QQ 等 |
| `projects` | 项目展示 | 名称 + 描述 + 链接 |
| `siteStats` | 站点统计 | 创建日期 / 文章数 / 字数 |
| `siteAnnouncements` | 站点公告 | 日期 + 文本 |

### 第三方服务

```ts
// 音乐播放器 — 修改歌单 ID 即可换歌
music: {
  api: 'https://api.qijieya.cn/meting/',
  server: 'netease',
  type: 'playlist',
  id: '你的网易云歌单ID',
}

// Twikoo 评论 — 填写自己的环境 ID
twikoo: {
  envId: 'https://your-twikoo-endpoint',
  region: 'gansu',
}

// Umami 统计 — 填写自己的脚本地址和站点 ID
umami: {
  src: 'https://cloud.umami.is/script.js',
  websiteId: 'your-website-id',
}

// Live2D 看板娘 — 模型放在 public/live2/models/ 下
live2d: {
  enabled: true,
  scale: 0.15,
  mobileOff: true,
  modelList: [
    { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
    { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
  ],
}
```

### Astro 配置 — `astro.config.mjs`

```js
export default defineConfig({
  site: 'https://8872388.xyz',  // 改为你的域名
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'one-dark-pro' } },
});
```

---

## 各版块编辑指南

### 博文 / 日记

在 `src/content/posts/` 或 `src/content/diary/` 下新建 `.md` 文件：

```markdown
---
title: 文章标题
date: 2026-05-22
tags: [标签1, 标签2]
excerpt: 文章摘要
cover: /covers/example.webp
---

正文内容...
```

- `tags` 数组用于筛选过滤
- `cover` 为可选封面图路径（对应 `public/` 目录）
- 详情页路由自动生成：`/blog/文件名` 或 `/travel/文件名`

### 番剧追番

编辑 `src/data/bangumi.ts`，每条记录：

```ts
{
  title: '番剧名称',
  cover: '/fanju/xxx.webp',   // 图片放在 public/fanju/
  score: 9,                    // 0-10 评分
  status: '看过',              // 看过 / 在看 / 想看
  comment: '短评',
  url: 'https://bgm.tv/subject/xxx',
}
```

### 游戏记录

编辑 `src/data/game.ts`：

```ts
{
  title: '游戏名称',
  cover: '/games/xxx.webp',   // 图片放在 public/games/
  platform: 'PC / Switch',    // 平台
  status: '已通关',            // 已通关 / 在玩 / 想玩
  comment: '短评',
  url: 'https://store.steampowered.com/xxx',  // 商店链接
}
```

### LES 创作

编辑 `src/data/les.ts`：

```ts
{
  title: '作品名',
  cover: '/les/xxx.webp',
  type: '插画',               // 插画 / 文字 / 其他
  status: '已完成',
  comment: '简介',
}
```

### 回忆相册

编辑 `src/data/memory.ts`，每个相册含 `images` 图片数组：

```ts
{
  title: '相册名称',
  cover: '/huiyi/xxx/cover.webp',
  date: '2026-05',
  description: '描述',
  images: [
    { src: '/huiyi/xxx/1.webp', caption: '说明' },
  ],
}
```

图片放在 `public/huiyi/相册名/` 下。

### 友链

编辑 `src/data/friends.ts`：

```ts
{
  name: '友站名',
  url: 'https://example.com',
  avatar: '/assets/avatar.png',  // 头像图片
  desc: '一句话简介',
}
```

### 页脚

编辑 `src/data/footer.ts` 修改版权信息和备案号。

### 关于页

直接编辑 `src/pages/about/index.astro` 中的 HTML 内容。

### 首页项目展示

编辑 `config.ts` 中的 `projects` 数组。

### Live2D 模型

1. 将 moc3 模型文件夹放入 `public/live2/models/新模型名/`
2. 在 `config.ts` → `live2d.modelList` 中添加条目：

```ts
{ name: '新模型名', path: '/live2/models/新模型名/xxx.model3.json' }
```

---

## 主题与样式

所有样式在 `src/styles/global.css` 中，使用 CSS 变量控制：

```css
:root {
  --primary: #7D98F5;          /* 主题色 */
  --bg-primary: #f0f2f5;       /* 背景色 */
  --text-primary: #1a1a2e;     /* 文字色 */
  /* ... */
}

[data-theme="dark"] {
  --bg-primary: #0f0f1a;       /* 暗色背景 */
  --text-primary: #e0e0e0;     /* 暗色文字 */
  /* ... */
}
```

修改 `--primary` 即可全局更换主题色。

---

## 部署

构建产物在 `dist/` 目录，可部署到任意静态托管平台：

```bash
npm run build
```

**推荐平台**：Vercel / Netlify / Cloudflare Pages / GitHub Pages

以 Vercel 为例：
1. Fork 或导入仓库
2. Framework 选 Astro，Build Command 填 `npm run build`
3. Output Directory 填 `dist`
4. 部署完成

---

## 许可证

本项目采用 **MIT + Apache 2.0 双许可**，详见 [LICENSE-MIT](LICENSE-MIT) 和 [LICENSE-APACHE](LICENSE-APACHE)。

- 博客源代码：自由使用、修改和分发
- 博客文章内容（`src/content/` 下）：版权归作者所有，转载请联系
- Live2D 模型：归原模型作者所有，仅供个人学习使用

---

## 致谢

- [Astro](https://astro.build) — 静态站点生成框架
- [Twikoo](https://twikoo.js.org) — 评论系统
- [Umami](https://umami.is) — 网站统计
- [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) — Live2D 渲染
- [Meting API](https://github.com/metowolf/Meting) — 音乐接口

---

<p align="center">
  <sub>Built with 💜 by <a href="https://github.com/qitinyu">qitinyu</a></sub>
</p>

---
*AI生成*
