---
AIGC: {"Label":"1","ContentProducer":"001191110108MA01KP2T5U00000","ProduceID":"921a22908f57f2c6ec15c2ff2fab7c7f","ReservedCode1":"","ContentPropagator":"001191110108MA01KP2T5U00000","PropagateID":"921a22908f57f2c6ec15c2ff2fab7c7f","ReservedCode2":""}
---

# YuQi 博客本地编辑指南

本文档详细介绍如何在本地编辑和管理 YuQi 个人博客的所有内容，包括博文、旅记、番剧、相册、LES 作品等模块的增删改查操作。

---

## 一、环境准备

### 1.1 安装 Node.js

确保本地已安装 Node.js 18+ 版本：

```bash
node -v   # 应显示 v18.x.x 或更高
npm -v    # 应显示 9.x.x 或更高
```

如未安装，前往 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本。

### 1.2 安装项目依赖

```bash
cd yuqi-blog
npm install
```

### 1.3 启动本地开发服务器

```bash
npm run dev
```

浏览器访问 `http://localhost:4321` 即可实时预览。修改文件后页面会自动热更新。

### 1.4 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录下，可直接部署到任何静态托管平台。

### 1.5 本地预览构建结果

```bash
npm run preview
```

---

## 二、项目结构总览

```
yuqi-blog/
├── config.ts                 ← 全局配置（站点信息、导航、社交链接、番剧、游戏等）
├── astro.config.mjs          ← Astro 框架配置
├── package.json
├── public/                   ← 静态资源目录
│   ├── avatar.webp           ← 头像图片
│   ├── logo.webp             ← Logo 图片
│   ├── logo.svg
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── font/                 ← 字体文件目录
│   │   └── zqfs.woff2        ← 朱雀仿宋字体（需自行放入）
│   ├── mod/                  ← Live2D 看板娘模型目录
│   │   └── shizuku/          ← 模型文件（需自行放入）
│   └── huiyi/                ← 相册照片目录（需自行创建）
├── src/
│   ├── components/           ← 全局组件
│   │   ├── Navbar.astro      ← 顶部导航栏
│   │   ├── Footer.astro      ← 页脚
│   │   ├── Sakura.astro      ← 樱花飘落特效
│   │   ├── Live2D.astro      ← 看板娘组件
│   │   └── FloatingButtons.astro  ← 右侧浮动按钮（音乐、回顶部等）
│   ├── layouts/
│   │   └── BaseLayout.astro  ← 基础页面布局
│   ├── pages/                ← 页面文件
│   │   ├── index.astro       ← 首页（尺素）
│   │   ├── blog/
│   │   │   ├── index.astro   ← 博文列表页
│   │   │   └── [slug].astro  ← 博文详情页
│   │   ├── travel/
│   │   │   ├── index.astro   ← 旅记列表页
│   │   │   └── [slug].astro  ← 旅记详情页
│   │   ├── bangumi/
│   │   │   └── index.astro   ← 番剧页面
│   │   ├── game/
│   │   │   └── index.astro   ← 闲游页面
│   │   ├── les/
│   │   │   └── index.astro   ← LES（创作与灵感）页面
│   │   ├── memory/
│   │   │   └── index.astro   ← 回忆（相册）页面
│   │   └── friends/
│   │       └── index.astro   ← 萍踪（友链）页面
│   ├── styles/
│   │   └── global.css        ← 全局样式（主题色、暗色模式、动画等）
│   ├── posts/                ← 博文 Markdown 源文件目录
│   │   └── hello-world.md
│   └── dairy/                ← 旅记 Markdown 源文件目录
│       └── spring-trip.md
└── dist/                     ← 构建输出目录
```

---

## 三、全局配置编辑（config.ts）

`config.ts` 是博客的核心配置文件，几乎所有站点信息都在这里集中管理。

### 3.1 站点基本信息

```typescript
export const siteConfig = {
  title: 'YuQi',                              // 站点名称
  subtitle: '生命绚烂，别被黑暗压垮',            // 站点副标题/格言
  description: '雨祁的个人博客 - 记录生活、思考与创造',  // 站点描述
  url: 'https://yqamm.cc.cd',                 // 站点URL
  author: 'YuQi',                             // 作者名
  email: '484894496@qq.com',                  // 邮箱
  themeColor: '#7D98F5',                      // 主题色
  // ...
};
```

**修改方式**：直接编辑 `config.ts` 中对应字段的值即可。

### 3.2 导航菜单

```typescript
navItems: [
  { name: '尺素', path: '/' },
  { name: '轩窗', path: '/blog', children: [
    { name: '博文', path: '/blog' },
    { name: '旅记', path: '/travel' },
    { name: '回忆', path: '/memory' },
  ]},
  { name: '墨竹', path: '/bangumi', children: [
    { name: '番剧', path: '/bangumi' },
    { name: '闲游', path: '/game' },
    { name: 'LES', path: '/les' },
  ]},
  { name: '萍踪', path: '/friends' },
],
```

**添加新导航项**：在 `navItems` 数组中添加新对象。如有子菜单，添加 `children` 数组。

**注意事项**：
- `path` 必须与 `src/pages/` 下的目录结构对应
- 带有 `children` 的项会显示为下拉菜单
- 最多支持两级导航

### 3.3 社交链接

```typescript
socialLinks: [
  { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'fa-brands fa-github-alt' },
  { name: '米游社', url: 'https://www.miyoushe.com/...', icon: 'fa-brands fa-battle-net' },
  { name: 'B站', url: 'https://space.bilibili.com/...', icon: 'fab fa-bilibili' },
  { name: 'QQ', url: 'https://qm.qq.com/...', icon: 'fa-brands fa-qq' },
  { name: 'Email', url: 'mailto:484894496@qq.com', icon: 'fa-solid fa-envelope' },
],
```

**添加新社交链接**：在数组中添加新对象，`icon` 使用 Font Awesome 6 图标类名。

**常用图标参考**：
- 微博：`fa-brands fa-weibo`
- 知乎：`fa-brands fa-zhihu`
- 微信：`fa-brands fa-weixin`
- Twitter/X：`fa-brands fa-x-twitter`
- Discord：`fa-brands fa-discord`

### 3.4 项目展示

```typescript
projects: [
  { name: '雨祁小窝', desc: '基于Astro的现代化个人博客', 
    preview: 'https://yqamm.cc.cd', github: 'https://github.com/qitinyu/yuqi/' },
  // ... 更多项目
],
```

**添加新项目**：在数组中添加对象，包含 `name`（项目名）、`desc`（描述）、`preview`（预览链接）、`github`（源码链接）。

### 3.5 音乐播放器

```typescript
music: {
  api: 'https://api.qijieya.cn/meting/',
  server: 'netease',      // 音乐平台：netease（网易云）、tencent（QQ）、kugou（酷狗）
  type: 'playlist',        // 类型：playlist（歌单）、song（单曲）
  id: '17863308200',       // 歌单/单曲ID
},
```

**更换歌单**：
1. 打开网易云音乐网页版，找到想要的歌单
2. 复制歌单URL中的ID（如 `https://music.163.com/#/playlist?id=123456789` 中的 `123456789`）
3. 替换 `id` 字段的值

### 3.6 看板娘（Live2D）配置

```typescript
live2d: {
  enabled: true,            // 是否启用
  modelPath: '/mod/',       // 模型文件目录
  modelName: 'shizuku',     // 模型名称
  position: 'left',         // 位置：'left' 或 'right'
  bottom: 0,                // 距底部偏移（px）
  left: 10,                 // 左侧偏移（px），position为left时生效
  right: 10,                // 右侧偏移（px），position为right时生效
  width: 280,               // 宽度（px）
  height: 350,              // 高度（px）
  mobileOff: true,          // 移动端是否关闭
},
```

**添加看板娘模型**：
1. 下载 Live2D 模型文件（Moc3 格式）
2. 将模型文件夹放入 `public/mod/` 目录，如 `public/mod/shizuku/`
3. 确保模型文件夹内包含：`shizuku.model3.json`、`.moc3`、`.physics3.json`、`textures/` 目录
4. 修改 `modelName` 为你的模型文件夹名称

### 3.7 番剧列表

```typescript
bangumiList: [
  { title: '葬送的芙莉莲', cover: '', score: 10, status: '看过', comment: '史诗级的冒险与告别' },
  // ...
],
```

**添加新番剧**：在数组中添加对象：
- `title`：番剧名称
- `cover`：封面图片路径（放入 `public/` 目录后填写相对路径，如 `/images/bangumi/frieren.webp`）
- `score`：评分（0-10 整数）
- `status`：状态（`'看过'`、`'在看'`、`'想看'`）
- `comment`：短评

### 3.8 游戏列表

```typescript
gameList: [
  { title: '原神', cover: '', platform: 'PC/PS5', status: '在玩', comment: '提瓦特的冒险永不停歇' },
  // ...
],
```

**添加新游戏**：在数组中添加对象：
- `platform`：运行平台（如 `'PC'`、`'PS5'`、`'Switch'`、`'Mobile'`）
- `status`：状态（`'在玩'`、`'看过'`、`'想玩'`）

### 3.9 LES 作品列表

```typescript
lesList: [
  { title: '示例作品', cover: '', type: '插画', status: '完成', comment: '' },
],
```

**添加新作品**：
- `type`：类型（`'插画'`、`'文字'`、`'其他'`）
- `status`：状态（`'完成'`、`'进行中'`）

### 3.10 友链配置

```typescript
friends: [
  { name: '示例友链', url: '#', avatar: '/assets/default-avatar.png', desc: '这是一个示例友链' },
],
```

**添加友链**：
- `name`：友站名称
- `url`：友站链接
- `avatar`：头像图片路径
- `desc`：站点描述

---

## 四、博文管理

### 4.1 添加新博文

打开 `src/pages/blog/index.astro`，在 `blogPosts` 数组中添加新文章条目：

```typescript
const blogPosts = [
  { slug: 'hello-world', title: 'Hello World - 博客诞生记', date: '2026-05-01', 
    tags: ['随笔', '博客'], excerpt: '记录博客从零到一的搭建过程...', cover: '' },
  // 在这里添加新博文 ↓
  { slug: 'my-new-post', title: '我的新文章', date: '2026-05-20', 
    tags: ['技术', 'JavaScript'], excerpt: '这是一篇关于JavaScript的新文章...', cover: '' },
];
```

**字段说明**：
- `slug`：文章URL标识，必须唯一，只能使用小写字母、数字和连字符
- `title`：文章标题
- `date`：发布日期，格式 `YYYY-MM-DD`
- `tags`：标签数组，可自定义
- `excerpt`：文章摘要，显示在列表卡片中
- `cover`：封面图片路径（可为空字符串）

### 4.2 编写博文详情内容

打开 `src/pages/blog/[slug].astro`，在 `getStaticPaths()` 函数的返回数组中添加新的文章数据：

```typescript
export async function getStaticPaths() {
  return [
    {
      params: { slug: 'hello-world' },
      props: {
        title: 'Hello World - 博客诞生记',
        date: '2026-05-01',
        tags: ['随笔', '博客'],
        content: `<h1>博客诞生记</h1><p>这是文章的HTML内容...</p>`,
      }
    },
    // 添加新文章详情 ↓
    {
      params: { slug: 'my-new-post' },
      props: {
        title: '我的新文章',
        date: '2026-05-20',
        tags: ['技术', 'JavaScript'],
        content: `<h1>我的新文章</h1><p>文章内容...</p>`,
      }
    },
  ];
}
```

**文章内容格式**：使用 HTML 字符串编写正文内容。常用的 HTML 标签：

| HTML 标签 | 用途 | 示例 |
|-----------|------|------|
| `<h1>` ~ `<h3>` | 标题 | `<h2>二级标题</h2>` |
| `<p>` | 段落 | `<p>正文内容</p>` |
| `<code>` | 行内代码 | `<code>console.log()</code>` |
| `<pre><code>` | 代码块 | `<pre><code>const a = 1;</code></pre>` |
| `<blockquote>` | 引用 | `<blockquote>引用内容</blockquote>` |
| `<img>` | 图片 | `<img src="/images/photo.webp" alt="描述">` |
| `<a>` | 链接 | `<a href="https://example.com">链接文字</a>` |
| `<ul><li>` | 无序列表 | `<ul><li>列表项</li></ul>` |
| `<ol><li>` | 有序列表 | `<ol><li>列表项</li></ol>` |

**重要**：`slug` 必须与列表页中对应的 `slug` 一致，否则链接无法跳转。

### 4.3 删除博文

1. 从 `src/pages/blog/index.astro` 的 `blogPosts` 数组中删除对应条目
2. 从 `src/pages/blog/[slug].astro` 的 `getStaticPaths()` 返回数组中删除对应条目
3. 两处必须同步删除，否则会出现 404 或孤立页面

### 4.4 修改博文

1. 在列表页修改 `title`、`date`、`tags`、`excerpt` 等元信息
2. 在详情页修改 `content` 中的正文内容
3. 如需修改 `slug`，两处必须同时修改

---

## 五、旅记管理

旅记的编辑方式与博文完全一致，只是文件位置不同。

### 5.1 添加新旅记

打开 `src/pages/travel/index.astro`，在 `dairyPosts` 数组中添加：

```typescript
const dairyPosts = [
  { slug: 'spring-trip', title: '春日漫步 - 记一次远行', date: '2026-04-05', 
    tags: ['旅记', '春天'], excerpt: '春天的风吹过原野...', cover: '' },
  // 添加新旅记 ↓
  { slug: 'autumn-mountain', title: '秋日登山记', date: '2026-05-15', 
    tags: ['旅记', '秋天'], excerpt: '秋天的山层林尽染...', cover: '' },
];
```

### 5.2 编写旅记详情内容

打开 `src/pages/travel/[slug].astro`，在 `getStaticPaths()` 中添加新条目，方式同博文详情。

---

## 六、番剧管理

番剧数据有两个来源，编辑时需要注意。

### 6.1 通过 config.ts 管理的番剧

打开 `config.ts`，在 `bangumiList` 数组中添加/修改/删除：

```typescript
bangumiList: [
  { title: '新番名称', cover: '', score: 9, status: '在看', comment: '短评内容' },
],
```

### 6.2 页面内硬编码的番剧

打开 `src/pages/bangumi/index.astro`，在 `bangumiList` 合并数组后面还可能有额外硬编码的条目。建议统一将所有番剧数据迁移到 `config.ts` 中管理。

### 6.3 添加番剧封面图片

1. 将封面图片放入 `public/images/bangumi/` 目录（需先创建目录）
2. 在番剧数据中设置 `cover` 字段：`cover: '/images/bangumi/frieren.webp'`
3. 推荐使用 WebP 格式以获得更好的加载速度

---

## 七、相册管理

### 7.1 创建相册

打开 `src/pages/memory/index.astro`，在 `albums` 数组中添加：

```typescript
const albums = [
  { id: 'spring-2026', title: '2026 春日随拍', desc: '春天来了，万物复苏...', 
    cover: '/huiyi/spring-2026/cover.webp', count: 12 },
  // 添加新相册 ↓
  { id: 'summer-beach', title: '夏日海滩', desc: '阳光、沙滩与海浪...', 
    cover: '/huiyi/summer-beach/cover.webp', count: 8 },
];
```

**字段说明**：
- `id`：相册唯一标识，同时对应 `public/huiyi/` 下的目录名
- `cover`：封面图片路径
- `count`：照片数量

### 7.2 上传照片

1. 在 `public/huiyi/` 目录下创建与相册 `id` 同名的子目录
2. 将照片放入该目录
3. 推荐使用 WebP 格式，单张照片大小不超过 500KB
4. 建议命名规范：`01.webp`、`02.webp`、`03.webp`...

目录结构示例：
```
public/huiyi/
├── spring-2026/
│   ├── cover.webp
│   ├── 01.webp
│   ├── 02.webp
│   └── ...
├── summer-beach/
│   ├── cover.webp
│   ├── 01.webp
│   └── ...
```

---

## 八、LES（创作与灵感）管理

### 8.1 通过 config.ts 管理

```typescript
lesList: [
  { title: '新作品名称', cover: '', type: '插画', status: '完成', comment: '作品简介' },
],
```

### 8.2 页面内添加

打开 `src/pages/les/index.astro`，在 `lesWorks` 数组中添加新作品。

**类型选项**：`'插画'`、`'文字'`、`'其他'`

**状态选项**：`'完成'`、`'进行中'`

---

## 九、闲游（游戏）管理

### 9.1 通过 config.ts 管理

```typescript
gameList: [
  { title: '新游戏名称', cover: '', platform: 'PC', status: '想玩', comment: '游戏评价' },
],
```

### 9.2 页面内添加

打开 `src/pages/game/index.astro`，在游戏列表数据中添加新条目。

---

## 十、友链管理

### 10.1 通过 config.ts 管理

```typescript
friends: [
  { name: '友站名称', url: 'https://friend-site.com', avatar: '/images/friends/avatar.webp', desc: '站点描述' },
],
```

### 10.2 页面内添加

打开 `src/pages/friends/index.astro`，在友链数据中添加。

**头像图片**：将友链头像放入 `public/images/friends/` 目录，然后在 `avatar` 字段中引用。

---

## 十一、首页管理

首页（尺素）包含左侧边栏和右侧主内容区，编辑文件为 `src/pages/index.astro`。

### 11.1 修改个人信息

```html
<img src="/avatar.webp" alt="YuQi" class="sidebar-avatar" />
<h2 class="sidebar-name">YuQi</h2>
<p class="sidebar-motto">生命绚烂，别被黑暗压垮</p>
```

**更换头像**：替换 `public/avatar.webp` 文件即可。

### 11.2 修改站点公告

```html
<div class="notice-item">
  <span class="notice-date">2026-05-18</span>
  <p class="notice-text">博客正式上线，欢迎访问！</p>
</div>
```

添加新公告：复制一个 `notice-item` 块，修改日期和文本。

### 11.3 修改站内统计

统计脚本在页面底部的 `<script>` 标签中：

```javascript
const startDate = new Date('2024-01-01');  // 站点起始日期
```

文章篇数和字数需手动更新，或修改为动态计算逻辑。

### 11.4 修改青衿（打字机效果）

```javascript
const texts = [
  '这个世界五彩斑斓，而我依旧想要一个安静简约的地方存放躁动的心灵。',
  '生活不止眼前的代码，还有星辰与大海。',
  '生命绚烂，别被黑暗压垮。',
  '记录生活中的每一份美好与感动。',
];
```

修改或添加新的打字机文案即可。

### 11.5 修改悟我（关于我）

直接编辑 `<section class="home-section">` 中悟我部分的 HTML 内容。

---

## 十二、样式自定义

### 12.1 主题色修改

打开 `src/styles/global.css`，修改 CSS 变量：

```css
:root {
  --primary: #7D98F5;           /* 主色 */
  --primary-light: #9DB3F7;     /* 浅色 */
  --primary-dark: #5A75D4;      /* 深色 */
  --primary-alpha: rgba(125, 152, 245, 0.15);  /* 半透明 */
}
```

### 12.2 暗色模式颜色

```css
[data-theme="dark"] {
  --bg-primary: #0f1225;        /* 背景 */
  --bg-secondary: #171b33;      /* 次要背景 */
  --bg-card: #1c2040;           /* 卡片背景 */
  --text-primary: #e4e8f1;      /* 主要文字 */
  --text-secondary: #a8b2c8;    /* 次要文字 */
  --text-muted: #6b7a96;        /* 辅助文字 */
}
```

### 12.3 字体修改

在 `src/layouts/BaseLayout.astro` 的 `<head>` 中修改字体声明：

```html
<style>
  @font-face {
    font-family: '朱雀仿宋';
    src: url('/font/zqfs.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
</style>
```

**更换字体**：
1. 将新字体文件放入 `public/font/` 目录
2. 修改 `@font-face` 中的 `font-family` 和 `src` 路径
3. 修改 `src/styles/global.css` 中 `body` 的 `font-family` 属性

### 12.4 布局尺寸修改

```css
:root {
  --nav-height: 72px;       /* 导航栏高度 */
  --sidebar-width: 320px;   /* 侧边栏宽度 */
  --max-width: 1800px;      /* 最大内容宽度 */
}
```

---

## 十三、组件管理

### 13.1 导航栏

文件：`src/components/Navbar.astro`

导航数据来自 `config.ts` 的 `navItems`，一般不需要直接编辑组件文件。如需修改导航样式或结构，编辑此文件。

### 13.2 页脚

文件：`src/components/Footer.astro`

修改版权信息、链接等：

```html
<div class="footer-line">Copyright © 2026 <a href="...">qitinyu</a>|...</div>
<div class="footer-line">Powered by Astro &amp; Yuami|Version 1.0</div>
```

### 13.3 樱花特效

文件：`src/components/Sakura.astro`

修改花瓣数量、大小、飘落速度等参数。

### 13.4 浮动按钮

文件：`src/components/FloatingButtons.astro`

包含音乐播放器、回到顶部等按钮。音乐配置来自 `config.ts` 的 `music` 字段。

### 13.5 看板娘

文件：`src/components/Live2D.astro`

配置来自 `config.ts` 的 `live2d` 字段。如看板娘不显示，请检查：
1. `enabled` 是否为 `true`
2. `public/mod/` 下是否有对应的模型文件
3. 模型文件结构是否完整（`.model3.json`、`.moc3`、`.physics3.json`、`textures/`）

---

## 十四、分页功能说明

博文、旅记、番剧、LES、相册五个列表页均已内置客户端分页功能：

- **每页显示数量**：6 条（可修改各页面中的 `ITEMS_PER_PAGE` 常量）
- **分页控件**：上一页 / 页码 / 下一页按钮
- **配合筛选**：分页与标签筛选、搜索功能联动
- **响应式**：移动端自动缩小分页按钮

### 14.1 修改每页显示数量

打开对应页面文件，找到 `<script>` 部分中的：

```javascript
const ITEMS_PER_PAGE = 6;  // 修改此数值
```

---

## 十五、评论系统集成

### 15.1 Twikoo 评论

当前为预留占位。集成步骤：

1. 部署 Twikoo 后端（支持 Vercel、云函数等）
2. 在 `config.ts` 中配置：

```typescript
twikoo: {
  envId: 'your-env-id',     // Twikoo 环境 ID
  region: '',                // 地区（腾讯云填 ap-shanghai 等）
},
```

3. 将各页面中的 Twikoo 占位符替换为实际的 Twikoo 组件

### 15.2 Umami 统计

当前为预留占位。集成步骤：

1. 部署 Umami 实例
2. 在 `config.ts` 中配置：

```typescript
umami: {
  src: 'https://your-umami.com/script.js',
  websiteId: 'your-website-id',
},
```

3. 在 `BaseLayout.astro` 中取消 Umami 脚本注释

---

## 十六、部署指南

### 16.1 构建静态文件

```bash
npm run build
```

构建产物在 `dist/` 目录，可直接上传到任何静态托管平台。

### 16.2 常用部署平台

| 平台 | 部署方式 | 特点 |
|------|---------|------|
| Vercel | 连接 GitHub 仓库，自动部署 | 免费、快速、支持自定义域名 |
| Netlify | 连接 GitHub 仓库，自动部署 | 免费、支持表单处理 |
| Cloudflare Pages | 连接 GitHub 仓库，自动部署 | 全球 CDN、速度快 |
| GitHub Pages | 推送 `dist/` 到 `gh-pages` 分支 | 完全免费 |
| 本地服务器 | 使用 `npm run preview` | 仅预览用 |

### 16.3 自定义域名

在各部署平台设置中添加自定义域名，并在域名服务商处配置 DNS 解析。

---

## 十七、常见问题

### Q1：修改后页面没有变化？

确保本地开发服务器正在运行（`npm run dev`），且浏览器没有缓存。尝试硬刷新（`Ctrl + Shift + R`）。

### Q2：构建报错？

检查 Markdown 语法和 HTML 标签是否闭合。运行 `npm run build` 查看详细错误信息。

### Q3：看板娘不显示？

1. 检查 `config.ts` 中 `live2d.enabled` 是否为 `true`
2. 检查 `public/mod/` 目录下是否有完整的模型文件
3. 检查浏览器控制台是否有加载错误
4. 移动端默认关闭看板娘（`mobileOff: true`），请用桌面浏览器测试

### Q4：字体没有生效？

1. 确认 `public/font/zqfs.woff2` 文件存在
2. 字体文件较大，首次加载可能需要时间
3. 检查浏览器控制台 Network 面板，确认字体文件是否成功加载

### Q5：如何添加新页面？

1. 在 `src/pages/` 下创建新的 `.astro` 文件
2. 在 `config.ts` 的 `navItems` 中添加导航项
3. 页面模板参考现有页面结构

### Q6：音乐播放器无法播放？

1. 检查 Meting API 是否可访问
2. 检查歌单 ID 是否正确
3. 部分歌曲可能因版权限制无法播放

---

## 十八、图片资源管理建议

### 18.1 推荐目录结构

```
public/
├── images/
│   ├── bangumi/          ← 番剧封面
│   ├── game/             ← 游戏封面
│   ├── les/              ← LES 作品封面
│   ├── friends/          ← 友链头像
│   ├── blog/             ← 博文配图
│   └── travel/           ← 旅记配图
├── huiyi/                ← 相册照片
│   ├── spring-2026/
│   ├── winter-trip/
│   └── ...
├── avatar.webp           ← 个人头像
└── logo.webp             ← 站点 Logo
```

### 18.2 图片优化建议

- **格式**：优先使用 WebP 格式，比 JPEG/PNG 小 30-50%
- **尺寸**：封面图建议 800×450px，头像 200×200px，文章配图不超过 1200px 宽
- **大小**：单张图片不超过 500KB，首页头像不超过 100KB
- **命名**：使用小写字母+连字符，如 `my-post-cover.webp`
- **工具**：使用 [Squoosh](https://squoosh.app/) 或 [TinyPNG](https://tinypng.com/) 压缩图片

---

*本指南最后更新：2026年5月19日*

---
*AI生成*
