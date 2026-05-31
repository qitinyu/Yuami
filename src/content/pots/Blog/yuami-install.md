---
title: "Yuami本地安装使用"
published: 2026-05-23
description: "Yuami本地安装使用教程"
tags: [BLOG]
licenseName: "CC BY 4.0"
author: "Yuami"
image: ""
pubDate: 2026-05-23
encrypted: false
password: "0723"
---


# Yuami本地安装使用

## 环境准备


>[!note]
>在开始安装 Yuami 之前，请确保你的本地环境已经安装了以下工具：

:spoiler[这里看不见]
- Node.js 18+ 
- pnpm 包管理器
- Git 版本控制

## 克隆项目

```bash
git clone https://github.com/qitinyu/yuqi.git
cd yuqi
```

## 安装依赖

```bash
pnpm install
```

## 本地运行

```bash
pnpm dev
```

打开浏览器访问 `http://localhost:4321` 即可看到博客页面。

## 构建部署

```bash
pnpm build
```

构建产物会输出到 `dist/` 目录，可以部署到 Cloudflare Pages/Workers、Vercel 等平台。
