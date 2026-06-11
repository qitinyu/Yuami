/**
 * 构建时图片扫描工具
 * 自动扫描 public/huiyi/ 下的子目录，发现所有图片文件
 * 支持本地路径和URL图片混合使用
 * 无需 index.json，支持任意文件名和格式
 */
import fs from 'node:fs';
import path from 'node:path';
import type { AlbumConfig } from '../data/memory';

// 支持的图片格式
const IMAGE_EXTENSIONS = new Set(['webp', 'jpg', 'jpeg', 'png', 'gif', 'avif', 'svg', 'bmp', 'ico']);

export interface AlbumImages {
  id: string;
  images: string[];
  cover: string;
  count: number;
  encrypted: boolean;
  password: string;
}

/**
 * 判断路径是否为在线URL
 */
function isUrl(imgPath: string): boolean {
  return imgPath.startsWith('http://') || imgPath.startsWith('https://');
}

/**
 * 判断路径是否为目录路径（以 / 结尾的本地路径）
 */
function isDirectoryPath(imgPath: string): boolean {
  return !isUrl(imgPath) && imgPath.endsWith('/');
}

/**
 * 扫描本地目录获取图片列表
 */
function scanLocalDirectory(dirPath: string): string[] {
  // 去掉末尾的 / 并解析为 public/ 下的路径
  const cleanPath = dirPath.replace(/\/+$/, '');
  const fullDir = path.resolve('public', cleanPath);

  if (!fs.existsSync(fullDir)) {
    console.log(`[image-scanner] public/${cleanPath}/ 目录不存在，跳过图片扫描`);
    return [];
  }

  try {
    const files = fs.readdirSync(fullDir, { withFileTypes: true });
    const images: string[] = [];

    for (const entry of files) {
      if (entry.isDirectory()) continue;
      if (entry.name === 'index.json') continue;
      const ext = entry.name.split('.').pop()?.toLowerCase() || '';
      if (IMAGE_EXTENSIONS.has(ext)) {
        const webPath = `${cleanPath}/${entry.name}`.replace(/\/+/g, '/');
        images.push(webPath.startsWith('/') ? webPath : '/' + webPath);
      }
    }

    images.sort((a, b) => {
      const nameA = a.split('/').pop() || '';
      const nameB = b.split('/').pop() || '';
      return nameA.localeCompare(nameB, undefined, { numeric: true });
    });

    return images;
  } catch (err) {
    console.warn(`[image-scanner] 扫描 public/${cleanPath}/ 出错:`, err);
    return [];
  }
}

/**
 * 从本地文件路径中提取目录路径
 * 例如: '/huiyi/spring-2026/cover.webp' → '/huiyi/spring-2026/'
 * 如果路径本身就是目录（以 / 结尾）或URL，则原样返回
 */
function extractDirectoryPath(filePath: string): string {
  if (!filePath || isUrl(filePath) || filePath.endsWith('/')) return filePath;
  const lastSlash = filePath.lastIndexOf('/');
  if (lastSlash >= 0) return filePath.substring(0, lastSlash + 1);
  return '';
}

/**
 * 根据相册配置解析图片列表
 * 核心逻辑：始终从 cover 所在目录自动扫描本地图片，再与 images 中的 URL 合并
 * 1. 优先自动扫描 cover 所在目录下的所有本地图片
 * 2. 合并 images 数组中的 URL 图片（本地路径会去重，URL 直接追加）
 * 3. 如果以上均无结果，回退到 public/huiyi/{id}/
 */
function resolveAlbumImages(album: AlbumConfig): string[] {
  const { id, images, cover } = album;

  const result: string[] = [];
  const seen = new Set<string>();

  // 步骤1：始终自动扫描 cover 所在目录的本地图片
  if (cover && !isUrl(cover)) {
    const coverDir = extractDirectoryPath(cover);
    if (coverDir) {
      const scanned = scanLocalDirectory(coverDir);
      for (const img of scanned) {
        if (!seen.has(img)) {
          seen.add(img);
          result.push(img);
        }
      }
    }
  }

  // 步骤2：合并 images 中的 URL 和本地路径（本地路径与自动扫描去重）
  if (images && images.length > 0) {
    for (const imgPath of images) {
      if (isUrl(imgPath)) {
        // URL 图片直接追加
        if (!seen.has(imgPath)) {
          seen.add(imgPath);
          result.push(imgPath);
        }
      } else if (isDirectoryPath(imgPath)) {
        // 目录路径：扫描并追加
        const scanned = scanLocalDirectory(imgPath);
        for (const img of scanned) {
          if (!seen.has(img)) {
            seen.add(img);
            result.push(img);
          }
        }
      } else {
        // 单个本地文件：追加（与自动扫描去重）
        const normalizedPath = imgPath.startsWith('/') ? imgPath : '/' + imgPath;
        if (!seen.has(normalizedPath)) {
          seen.add(normalizedPath);
          result.push(normalizedPath);
        }
      }
    }
  }

  // 步骤3：如果以上均无结果，回退到默认路径
  if (result.length === 0) {
    return scanLocalDirectory(`/huiyi/${id}/`);
  }

  return result;
}

/**
 * 扫描 public/huiyi/ 目录下的所有子目录，
 * 返回每个子目录中发现的图片列表
 */
export function scanHuiyiImages(): Map<string, AlbumImages> {
  const result = new Map<string, AlbumImages>();
  const huiyiDir = path.resolve('public/huiyi');

  if (!fs.existsSync(huiyiDir)) {
    console.log('[image-scanner] public/huiyi/ 目录不存在，跳过图片扫描');
    return result;
  }

  try {
    const entries = fs.readdirSync(huiyiDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const albumId = entry.name;
      const albumDir = path.join(huiyiDir, albumId);

      try {
        const files = fs.readdirSync(albumDir)
          .filter(f => {
            if (f === 'index.json') return false;
            const ext = f.split('.').pop()?.toLowerCase() || '';
            return IMAGE_EXTENSIONS.has(ext);
          })
          .sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true });
          });

        if (files.length > 0) {
          const images = files.map(f => `/huiyi/${albumId}/${f}`);
          result.set(albumId, {
            id: albumId,
            images,
            cover: images[0],
            count: files.length,
            encrypted: false,
            password: '',
          });
        }
      } catch (err) {
        console.warn(`[image-scanner] 无法读取目录 ${albumDir}:`, err);
      }
    }

    console.log(`[image-scanner] 扫描完成，发现 ${result.size} 个相册`);
    for (const [id, data] of result) {
      console.log(`  - ${id}: ${data.count} 张图片`);
    }
  } catch (err) {
    console.warn('[image-scanner] 扫描出错:', err);
  }

  return result;
}

/**
 * 构建最终相册列表
 * memory.ts 为唯一权威来源：只显示 memory.ts 中定义的相册
 * 图片来源支持：本地目录扫描 + URL + 混合模式
 */
export function buildAlbums(albumList: AlbumConfig[]): Array<{
  id: string;
  title: string;
  desc: string;
  cover: string;
  count: number;
  encrypted: boolean;
  password: string;
  images: string[];
}> {
  // 仅以 memory.ts 配置为准，不再自动发现未配置的目录
  return albumList.map(album => {
    // 根据配置解析图片列表
    const resolvedImages = resolveAlbumImages(album);

    // 确定封面：优先使用配置的 cover，否则使用第一张图片
    let cover = album.cover;
    if (!cover && resolvedImages.length > 0) {
      cover = resolvedImages[0];
    }

    // 确定数量：配置的 count 优先，否则使用实际图片数
    const count = album.count > 0 ? album.count : resolvedImages.length;

    return {
      id: album.id,
      title: album.title,
      desc: album.desc,
      cover,
      count,
      encrypted: album.encrypted,
      password: album.password,
      images: resolvedImages,
    };
  });
}

/**
 * 扫描指定目录下的所有图片文件
 * 用于轩窗(首页)轮播图等场景
 * @param dirPath 相对于 public/ 的路径，如 'home/blog'
 * @returns 图片URL数组（以 / 开头的web路径）
 */
export function scanDirectoryImages(dirPath: string): string[] {
  return scanLocalDirectory('/' + dirPath);
}
