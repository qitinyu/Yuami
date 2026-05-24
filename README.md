# Yuami Blog

> 生命绚烂，别被黑暗压垮

Yuami 是一款基于 [Astro](https://astro.build) 的动漫风格个人博客系统，采用毛玻璃拟态设计语言，支持主题色动态切换、暗黑模式、樱花飘落特效、Live2D 看板娘、音乐播放器、Twikoo 评论系统、文章加密等丰富功能。部署于 Cloudflare Pages，零 JS 框架运行时开销。

---

## 目录

- [功能概览](#功能概览)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
  - [站点基础信息](#站点基础信息)
  - [主题色切换](#主题色切换)
  - [全局字体配置](#全局字体配置)
  - [全局阴影配置](#全局阴影配置)
  - [樱花飘落效果](#樱花飘落效果)
  - [音乐播放器](#音乐播放器)
  - [Twikoo 评论系统](#twikoo-评论系统)
  - [Umami 统计](#umami-统计)
  - [Live2D 看板娘](#live2d-看板娘)
  - [站点统计与公告](#站点统计与公告)
  - [导航栏](#导航栏)
  - [社交链接](#社交链接)
  - [项目展示](#项目展示)
- [页面说明](#页面说明)
- [内容编辑规范](#内容编辑规范)
  - [博客文章 (pots)](#博客文章-pots)
  - [旅记 (diary)](#旅记-diary)
  - [番剧数据 (anime.ts)](#番剧数据-animets)
  - [游戏数据 (game.ts)](#游戏数据-gamets)
  - [LES 数据 (les.ts)](#les-数据-lests)
  - [回忆相册 (memory.ts)](#回忆相册-memoryts)
  - [友链数据 (friends.ts)](#友链数据-friendsts)
  - [页脚配置 (footer.ts)](#页脚配置-footerts)
- [组件说明](#组件说明)
- [CSS 变量体系](#css-变量体系)
- [部署指南](#部署指南)
- [常见问题](#常见问题)
- [许可证](#许可证)

---

## 功能概览

| 功能 | 描述 |
|------|------|
| 🎨 主题色动态切换 | 导航栏调色板，8 种预设色 + 自定义，localStorage 持久化，config.ts 开关控制 |
| 🌙 暗黑模式 | 一键切换，localStorage 持久化，全局 CSS 变量驱动 |
| 🌸 樱花飘落特效 | CSS 动画实现，可配置花瓣数量/大小/速度/颜色，支持移动端关闭 |
| 🎵 音乐播放器 | 基于 Meting API，支持网易云歌单，三种播放模式 |
| 💬 Twikoo 评论 | jsDelivr + npmmirror 双 CDN 回退，全局主题适配 |
| 🔒 文章加密 | 密码保护内容，sessionStorage 解锁记忆 |
| 📡 朋友圈 RSS | 构建时从友链 RSS 抓取最新文章，零依赖 XML 解析 |
| 🎭 Live2D 看板娘 | PIXI.js + Cubism SDK，多模型切换，可拖拽 |
| 📖 文章目录 TOC | 三级标题层级，折叠展开，滚动高亮 |
| 🔍 博客搜索/筛选 | 标签筛选 + 关键词搜索，客户端过滤 |
| 📱 响应式布局 | PC / 平板 / 手机三端适配，导航栏自动隐藏 |
| 🗺️ 站点地图 | 自动生成 sitemap.xml |
| ⚡ Cloudflare Pages | 静态输出 + Wrangler 部署，全球 CDN 加速 |

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 5.x | 静态站点生成框架 |
| TypeScript | 5.x | 类型安全 |
| MDX | 4.x | Markdown 增强 |
| Cloudflare Pages | - | 部署平台 |
| Twikoo | 1.7.9 (CDN) | 评论系统 |
| PIXI.js | 6.5.10 (CDN) | Live2D 渲染 |
| Font Awesome | 6.4 (CDN) | 图标库 |
| Sharp | 0.34.x | 图片优化 |

---

## 项目结构

```
yuami-work/
├── config.ts                    # 🔧 全局配置（所有功能开关和数据）
├── astro.config.mjs             # Astro 构建配置
├── wrangler.jsonc               # Cloudflare 部署配置
├── package.json
├── tsconfig.json
│
├── src/
│   ├── components/              # 🧩 组件
│   │   ├── Navbar.astro         #   导航栏（主题切换/色板/自动隐藏）
│   │   ├── Footer.astro         #   页脚
│   │   ├── SidebarWidget.astro  #   侧边栏组件
│   │   ├── Sakura.astro         #   樱花飘落特效
│   │   ├── Live2D.astro         #   Live2D 看板娘
│   │   ├── FloatingButtons.astro#   悬浮按钮（音乐/回家/回顶）
│   │   ├── Twikoo.astro         #   评论系统
│   │   └── Encryptor.astro      #   内容加密
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     # 📐 全局布局
│   │
│   ├── pages/                   # 📄 页面路由
│   │   ├── index.astro          #   首页（尺素）
│   │   ├── blog/                #   博文列表 + 文章详情
│   │   ├── travel/              #   旅记列表 + 日记详情
│   │   ├── anime/index.astro    #   番剧追踪
│   │   ├── game/index.astro     #   闲游（游戏收藏）
│   │   ├── les/index.astro      #   LES 创作
│   │   ├── memory/index.astro   #   回忆（相册）
│   │   ├── friends/             #   友链
│   │   ├── friends-circle/      #   朋友圈（RSS聚合）
│   │   └── about/index.astro    #   关于
│   │
│   ├── content/                 # 📝 Content Collections
│   │   ├── config.ts            #   集合 Schema 定义
│   │   ├── pots/                #   博客文章（按分类子目录）
│   │   └── diary/               #   旅记日记
│   │
│   ├── data/                    # 📊 数据文件
│   │   ├── friends.ts           #   友链（含 RSS）
│   │   ├── anime.ts             #   番剧数据
│   │   ├── game.ts              #   游戏数据
│   │   ├── les.ts               #   LES 数据
│   │   ├── memory.ts            #   相册数据
│   │   └── footer.ts            #   页脚配置
│   │
│   ├── styles/
│   │   └── global.css           # 🎨 全局样式 + CSS 变量
│   │
│   └── utils/
│       └── rss-parser.ts        # 📡 RSS/Atom 解析器
│
└── public/                      # 📁 静态资源（需自行上传）
    ├── font/                    #   自定义字体文件
    ├── anime/                   #   番剧封面图
    ├── game/                    #   游戏相关图片
    ├── les/                     #   LES 封面图
    ├── huiyi/                   #   相册照片
    ├── live2/                   #   Live2D 模型
    └── avatar.webp              #   站主头像
```

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- pnpm >= 8.0

### 安装与运行

```bash
# 1. 解压项目
unzip yuami-fin1.zip -d yuami-blog
cd yuami-blog

# 2. 安装依赖
pnpm install

# 3. 本地开发
pnpm dev

# 4. 构建生产
pnpm build

# 5. 本地预览构建结果
pnpm preview

# 6. 部署到 Cloudflare Pages
pnpm deploy
```

### 重要提示

- `public/` 目录下的图片资源（番剧封面、游戏图片、相册照片、Live2D 模型、字体文件等）因体积限制未包含在代码包中，需自行上传到服务器的 `public/` 对应目录
- 封面图路径规则：Astro 的 `public/` 目录映射到站点根路径，即 `public/anime/xxx.webp` 的访问路径为 `/anime/xxx.webp`

---

## 配置说明

所有配置集中在项目根目录的 `config.ts` 文件中，修改后重新构建即可生效。

### 站点基础信息

```typescript
export const siteConfig = {
  title: 'Yuami',                    // 站点名称
  subtitle: '生命绚烂，别被黑暗压垮',  // 站点副标题
  description: 'Yuami的个人博客',     // 站点描述（SEO）
  url: 'https://yqamm.cc.cd',       // 站点 URL
  author: 'Yuami',                   // 作者名
  email: 'xxx@qq.com',              // 联系邮箱
  themeColor: '#7D98F5',            // 默认主题色
};
```

### 主题色切换

```typescript
themeColorPicker: {
  enabled: true,  // true: 导航栏显示调色板图标, false: 隐藏且禁用
},
```

启用后，导航栏右侧出现调色板图标，点击展开颜色选择条，包含 8 种预设色：
- 默认蓝 `#7D98F5`、樱粉 `#F5A0B0`、薄荷 `#5CC9A7`、琥珀 `#E8A838`
- 紫罗兰 `#A78BFA`、天蓝 `#38BDF8`、桃红 `#FB7185`、青柠 `#84CC16`

选择后自动计算衍生色（浅色/深色/透明度变体/阴影色/边框色），并写入 `localStorage('yuami_theme_color')` 持久化记忆。页面加载时通过 `<head>` 中的同步脚本恢复，防止 FOUC（闪烁）。

### 全局字体配置

```typescript
font: {
  fontFamily: "'朱雀仿宋', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontSize: '16px',                 // 基础字号，支持 px/rem
  fontFile: '/font/zqfs.woff2',    // 自定义字体文件路径
},
```

- `fontFamily`：字体回退链，首个可用字体优先
- `fontFile`：自定义字体文件需放入 `public/font/` 目录
- 修改后构建时自动注入 `<style>` 和 `@font-face` 声明

### 全局阴影配置

```typescript
shadow: {
  sm: '0 2px 8px rgba(125, 152, 245, 0.08)',
  md: '0 4px 20px rgba(125, 152, 245, 0.12)',
  lg: '0 8px 40px rgba(125, 152, 245, 0.16)',
  hover: '0 8px 30px rgba(125, 152, 245, 0.2)',
},
```

阴影颜色中的 `rgba` 值会随主题色自动更新，确保视觉一致性。

### 樱花飘落效果

```typescript
sakura: {
  enabled: true,        // 总开关
  petals: 25,           // 同屏花瓣数量
  minSize: 10,          // 最小花瓣大小 (px)
  maxSize: 22,          // 最大花瓣大小 (px)
  minDuration: 6,       // 最短飘落时间 (秒)
  maxDuration: 12,      // 最长飘落时间 (秒)
  color: '#ffb7c5',     // 花瓣颜色（任意 CSS 颜色值）
  mobileOff: false,     // 移动端是否关闭
},
```

### 音乐播放器

```typescript
music: {
  api: 'https://api.qijieya.cn/meting/',  // Meting API 地址
  server: 'netease',                        // 音源平台
  type: 'playlist',                         // 类型（playlist/song/album）
  id: '17863308200',                        // 对应 ID
},
```

支持的 `server` 值：`netease`（网易云）、`tencent`（QQ音乐）、`kugou`（酷狗）、`baidu`（百度音乐）。

### Twikoo 评论系统

```typescript
twikoo: {
  envId: 'https://your-twikoo-url',  // Twikoo 环境地址
  region: 'gansu',                    // 区域（腾讯云部署时填写）
},
```

- 若 `envId` 为空，评论区自动显示配置提示
- CDN 加载：jsDelivr 主 + npmmirror 回退
- 博客文章页使用 `bare` 模式（不渲染卡片外壳，避免嵌套重叠）

### Umami 统计

```typescript
umami: {
  src: 'https://cloud.umami.is/script.js',   // 统计脚本地址
  websiteId: 'your-website-id',               // 站点 ID
},
```

若 `websiteId` 为空则不加载统计脚本。

### Live2D 看板娘

```typescript
live2d: {
  enabled: true,
  modelPath: '/live2/models/wwa/',    // 当前模型路径
  modelName: 'wwa',                    // 当前模型名
  position: 'left',                    // 位置（left/right）
  bottom: 0,                           // 底部偏移
  width: 300,                          // 渲染宽度
  height: 500,                         // 渲染高度
  scale: 0.15,                         // 缩放比例
  mobileOff: true,                     // 移动端是否关闭
  modelList: [                         // 可切换模型列表
    { name: 'wwa', path: '/live2/models/wwa/wwa.model3.json' },
    { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
    { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
  ],
},
```

模型文件需放入 `public/live2/models/` 目录，每个模型一个子目录，包含 `.model3.json` 及相关纹理/动作文件。

### 站点统计与公告

```typescript
siteStats: {
  startDate: '2026-05-21',  // 建站日期
  totalPosts: 6,             // 文章总数
  totalWords: 12000,         // 总字数
  lastEdit: '2026-05-21',   // 最后编辑日期
},

siteAnnouncements: [
  { date: '2026-05-21', text: '博客功能持续更新中！' },
  { date: '2026-05-18', text: '博客正式上线！' },
],
```

公告按日期降序自动排列。

### 导航栏

```typescript
navItems: [
  {
    name: '轩窗',                           // 一级导航名
    path: '/blog',                          // 链接路径
    children: [                             // 下拉子菜单
      { name: '博文', path: '/blog' },
      { name: '旅记', path: '/travel' },
      { name: '回忆', path: '/memory' },
    ]
  },
  { name: '墨竹', path: '/anime', children: [...] },
  { name: '萍踪', path: '/friends', children: [...] },
  { name: '尺素', path: '/' },             // 无 children = 直接链接
],
```

- 一级导航在桌面端显示为下拉菜单，移动端显示为手风琴折叠
- 导航栏自动行为：向下滚动自动收起，向上滚动或鼠标悬浮自动展开

### 社交链接

```typescript
socialLinks: [
  { name: 'GitHub', url: 'https://github.com/xxx', icon: 'fa-brands fa-github-alt' },
  { name: 'B站', url: 'https://space.bilibili.com/xxx', icon: 'fab fa-bilibili' },
],
```

图标名参考 [Font Awesome 6](https://fontawesome.com/icons) 图标库。

### 项目展示

```typescript
projects: [
  {
    name: '项目名',
    desc: '项目描述',
    preview: 'https://preview-url',   // 预览链接
    github: 'https://github-url',     // GitHub 仓库
  },
],
```

项目展示在首页"筑迹"区域以卡片网格形式呈现。

---

## 页面说明

| 路由 | 导航归属 | 功能描述 |
|------|---------|---------|
| `/` | 尺素 | 首页：个人信息 + 打字机效果 + 项目展示 |
| `/blog` | 轩窗 → 博文 | 博文列表：标签筛选 + 搜索 + 分页 |
| `/blog/[slug]` | — | 文章详情：TOC + 加密 + 评论 + 随机推荐 |
| `/travel` | 轩窗 → 旅记 | 旅记列表：搜索 + 标签 + 分页 |
| `/travel/[slug]` | — | 旅记详情：日记内容 + 评论 |
| `/memory` | 轩窗 → 回忆 | 相册列表：点击打开照片弹窗浏览 |
| `/anime` | 墨竹 → 番剧 | 番剧追踪：状态筛选 + 进度条 + 分页 |
| `/game` | 墨竹 → 闲游 | 游戏收藏：轮播图 + 卡片网格 |
| `/les` | 墨竹 → LES | LES 创作：类型筛选 + 分页 |
| `/friends` | 萍踪 → 友链 | 友链展示 + 申请区 + 评论 |
| `/friends-circle` | 萍踪 → 朋友圈 | RSS 聚合的友链最新文章 |
| `/about` | 萍踪 → 关于 | 关于页面 |

---

## 内容编辑规范

### 博客文章 (pots)

**存放位置**：`src/content/pots/{分类}/`

**分类子目录**：`Blog/`、`Github/`、`Gonju/`、`Jiqiao/`、`Les/`、`Openlist/`、`Qushi/`（可自定义新增）

**Frontmatter 模板**：

```markdown
---
title: 文章标题
published: "2026-05-24"          # 发布日期（必填）
description: 文章简介             # 可选，用于摘要展示
tags: [标签1, 标签2]             # 可选，用于标签筛选
author: 作者名                   # 可选，默认使用 config.author
image: /cover-image.webp         # 可选，文章封面图
licenseName: CC BY-NC-SA 4.0    # 可选，版权协议
encrypted: false                 # 可选，是否加密（true 时需设 password）
password: "123456"              # 可选，加密密码（encrypted 为 true 时必填）
---

文章正文，支持 Markdown 和 MDX 语法。
```

**注意事项**：
- `published` 字段为必填，格式建议 `YYYY-MM-DD`
- 封面图 `image` 路径为相对于 `public/` 的路径，如 `/anime/xxx.webp`
- 同目录下的 `cover.png`、`cover1.png` 等为旧版封面，新文章建议使用 `image` 字段
- 加密文章使用 `<Encryptor>` 组件包裹，解锁状态保存在 `sessionStorage`
- 文件名不能包含空格（Cloudflare Pages manifest 要求），用连字符 `-` 替代
- 文章自动按 `published` 日期降序排列

**新增分类**：在 `src/content/pots/` 下创建新子目录，放入 `.md` 文件即可，无需修改代码。

### 旅记 (diary)

**存放位置**：`src/content/diary/`

**Frontmatter 模板**：

```markdown
---
title: 旅记标题
date: "2026-05-24"
tags: [旅行, 风景]
excerpt: 旅记简介
cover: /cover-image.webp
---

旅记正文
```

### 番剧数据 (anime.ts)

**文件位置**：`src/data/anime.ts`

**数据结构**：

```typescript
{
  title: '番剧名',
  status: 'completed',       // 'completed' | 'watching' | 'planned'
  rating: 9.8,               // 评分（0-10）
  cover: '/anime/xxx.webp',  // 封面路径（public/ 下的相对路径）
  description: '番剧简介',
  episodes: '12集',
  year: '2026',
  genre: ['奇幻', '冒险'],   // 类型标签
  studio: '制作公司',
  link: 'https://...',       // 外部链接
  progress: 12,              // 已看集数
  totalEpisodes: 12,         // 总集数
  startDate: '2026-01-01',
  endDate: '2026-03-30',
}
```

**封面图规范**：
- 存放于 `public/anime/` 目录
- 格式建议 WebP，体积小加载快
- 文件名不能含空格

### 游戏数据 (game.ts)

**文件位置**：`src/data/game.ts`

**包含三部分数据**：

1. **轮播图**：`carouselImages` 数组
   ```typescript
   { src: '/game/carousel-1.webp', alt: '描述' }
   ```

2. **游戏列表**：游戏对象数组
   ```typescript
   {
     id: 'genshin',
     name: '原神',
     playTime: '2025.06---至今',
     imageUrl: '/game/genshin.webp',
     description: '开放世界冒险游戏',
     url: 'https://ys.mihoyo.com',
     tags: ['开放世界', 'RPG'],
     rating: 5,              // 满分 5
     company: 'miHoYo',
     releaseDate: '2020-09-28',
   }
   ```

3. **感悟区**：`reflectionText` 字符串

### LES 数据 (les.ts)

**文件位置**：`src/data/les.ts`

```typescript
{
  title: '作品名',
  cover: '/les/xxx.webp',      // 封面路径
  type: '七小皇叔原著',         // 类型标签
  status: '一完结',             // '一完结' | '全完结' | '连载中'
  cv: '配音演员',
  cp: '角色配对',
  comment: '个人评价',
  url: 'https://...',          // 外部链接
}
```

### 回忆相册 (memory.ts)

**文件位置**：`src/data/memory.ts`

```typescript
{
  id: 'spring-2026',           // 相册 ID，对应 public/huiyi/ 下的目录名
  title: '2026 春日',
  desc: '春天的花朵与阳光',
  cover: '/huiyi/spring-2026/cover.webp',
  count: 12,                   // 照片数量
}
```

**相册照片存放规范**：
- 照片存放在 `public/huiyi/{id}/` 目录下
- 目录内可放 `index.json` 文件列出所有图片文件名（推荐）
- 若无 `index.json`，系统会自动扫描 `1.jpg`、`2.jpg`... 数字命名的图片
- 支持格式：`.jpg`、`.jpeg`、`.png`、`.webp`

### 友链数据 (friends.ts)

**文件位置**：`src/data/friends.ts`

```typescript
{
  id: 1,
  name: '友链名称',
  url: 'https://example.com',
  avatar: 'https://example.com/avatar.webp',  // 头像 URL
  desc: '一句话介绍',
  rss: 'https://example.com/rss.xml',         // 可选，朋友圈 RSS 源
}
```

**RSS 字段说明**：
- 填写后，朋友圈页面在构建时会自动抓取该友链的最新文章
- 留空则不抓取
- 支持 RSS 2.0 和 Atom 格式
- 常见 RSS 路径：`/rss.xml`、`/atom.xml`、`/feed/`、`/index.xml`

### 页脚配置 (footer.ts)

**文件位置**：`src/data/footer.ts`

```typescript
{
  copyright: {
    year: 2026,
    owner: 'Yuami',
    ownerUrl: 'https://yqamm.cc.cd',
    siteUrl: 'https://yqamm.cc.cd',
    email: 'xxx@qq.com',
  },
  powered: {
    framework: 'Astro',
    theme: 'Yuami',
    version: '1.0',
  },
  icp: '京ICP备XXXXXXXX号',     // ICP 备案号（可留空）
  customLines: [],               // 自定义 HTML 行
}
```

---

## 组件说明

### Navbar.astro — 导航栏

- 毛玻璃效果 (`backdrop-filter: blur`)
- 桌面端：Logo + 下拉菜单 + 调色板 + 暗黑切换
- 移动端：汉堡菜单 + 手风琴子菜单
- 自动隐藏：向下滚动收起，向上滚动或悬浮展开
- 主题色选择器：8 预设色 + 自定义，动态计算所有衍生变量

### SidebarWidget.astro — 侧边栏

- Props：`showPersonalInfo`、`showSiteAnnouncement`、`showSiteStats`、`compact`
- 三个面板：个人信息、站点公告、站点统计
- 统计数据从 `config.siteStats` 读取

### Twikoo.astro — 评论系统

- Props：`bare`（boolean）— 为 true 时不渲染卡片外壳和标题
- 博客文章页使用 `bare` 模式（避免卡片嵌套重叠）
- 其他页面使用默认模式（自带卡片背景和"评论区"标题）

### Encryptor.astro — 内容加密

- Props：`password`（string）
- 显示锁图标 + 密码输入框
- 正确输入后解锁内容，状态保存在 `sessionStorage`
- 错误时抖动动画

### Sakura.astro — 樱花特效

- 纯 CSS 动画实现（`@keyframes sakuraFall` + `sakuraSway`）
- 每片花瓣随机大小/速度/延迟/位置
- 页面隐藏时暂停动画，resize 时重建

### Live2D.astro — 看板娘

- 加载 PIXI.js + Live2D Cubism Core + pixi-live2d-display
- 支持鼠标/触摸拖拽，自动约束在视口内
- 点击显示随机提示语
- 皮肤切换按钮（循环 modelList）
- 关闭后显示恢复按钮

### FloatingButtons.astro — 悬浮按钮

- 音乐播放器：完整播放面板（专辑图/进度条/播放列表/三种模式）
- 回到顶部：平滑滚动
- 回到首页：一键跳转

---

## CSS 变量体系

全局样式通过 CSS 变量驱动，在 `src/styles/global.css` 的 `:root` 和 `[data-theme="dark"]` 中定义。

### 亮色模式核心变量

| 变量 | 默认值 | 用途 |
|------|--------|------|
| `--primary` | `#7D98F5` | 主色 |
| `--primary-light` | `#9DB3F7` | 浅主色 |
| `--primary-dark` | `#5A75D4` | 深主色 |
| `--primary-alpha` | `rgba(125,152,245,0.15)` | 主色透明 15% |
| `--primary-alpha-30` | `rgba(125,152,245,0.3)` | 主色透明 30% |
| `--bg-primary` | `#f8f9fc` | 页面背景 |
| `--bg-card` | `#ffffff` | 卡片背景 |
| `--bg-glass` | `rgba(255,255,255,0.72)` | 毛玻璃背景 |
| `--text-primary` | `#000000` | 主文字色 |
| `--text-secondary` | `#1a1a1a` | 次文字色 |
| `--text-muted` | `#4a4a4a` | 弱化文字色 |
| `--border-color` | `rgba(125,152,245,0.15)` | 边框色 |
| `--nav-height` | `64px` | 导航栏高度 |
| `--sidebar-width` | `280px` | 侧边栏宽度 |
| `--max-width` | `1400px` | 最大内容宽度 |

### 暗色模式自动切换

当 `document.documentElement` 设置 `data-theme="dark"` 时，所有颜色变量自动切换为暗色方案，无需手动修改。

### 主题色联动

切换主题色时，以下变量全部动态重算：
- `--primary` → 用户选择色
- `--primary-light` → 亮度提升 20%
- `--primary-dark` → 亮度降低 20%
- `--primary-alpha` → 主色 15% 透明度
- `--primary-alpha-30` → 主色 30% 透明度
- `--border-color` → 主色 15% 透明度
- `--shadow-sm/md/lg/hover` → 主色阴影

---

## 部署指南

### Cloudflare Pages 部署

1. 安装 Wrangler CLI：
   ```bash
   pnpm add -D wrangler
   ```

2. 登录 Cloudflare：
   ```bash
   npx wrangler login
   ```

3. 修改 `wrangler.jsonc` 中的 `name` 字段为你的项目名

4. 构建并部署：
   ```bash
   pnpm deploy
   ```

### 其他平台部署

Yuami 是标准 Astro 静态站点，支持所有主流部署平台：

- **Vercel**：`pnpm build` 后部署 `dist/` 目录
- **Netlify**：构建命令 `pnpm build`，输出目录 `dist`
- **GitHub Pages**：使用 GitHub Actions 构建 + 部署
- **自建服务器**：`pnpm build` 后将 `dist/` 目录部署到 Nginx/Apache

---

## 常见问题

### Q: 封面图/头像不显示？
A: 确保图片文件已放入 `public/` 对应目录。Astro 的 `public/` 目录映射到站点根路径，即 `public/anime/xxx.webp` → 访问 `/anime/xxx.webp`。

### Q: 文件名有空格导致构建失败？
A: Cloudflare Pages 的 manifest 不支持 URI 编码的文件名。所有文件名（包括 `public/` 和 `src/content/` 下的文件）禁止包含空格，请用连字符 `-` 替代。

### Q: 朋友圈没有显示文章？
A: 检查 `src/data/friends.ts` 中对应友链是否填写了 `rss` 字段。朋友圈数据在构建时获取，添加 RSS 后需要重新构建部署。

### Q: 评论区显示"待配置"？
A: 在 `config.ts` 中填写 `twikoo.envId`，该值来自 Twikoo 云函数部署后的环境 ID。

### Q: 主题色切换后下次访问闪烁？
A: 主题色通过 `<head>` 中的同步脚本从 `localStorage` 恢复，理论上不会闪烁。如果仍有闪烁，检查浏览器是否禁用了 `localStorage`。

### Q: Live2D 模型加载失败？
A: 确认模型文件已放入 `public/live2/models/{模型名}/` 目录，且 `config.ts` 中 `modelList` 的 `path` 路径正确指向 `.model3.json` 文件。

### Q: 自定义字体不生效？
A: 确认字体文件已放入 `public/font/` 目录，且 `config.ts` 中 `font.fontFile` 路径正确。浏览器需要支持 `.woff2` 格式。

---

## 许可证

本项目基于 **MIT** 和 **Apache-2.0** 双许可证发布，详见 `LICENSE-MIT` 和 `LICENSE-APACHE` 文件。
