/**
 * 构建时图片扫描工具
 * 自动扫描 public/huiyi/ 下的子目录，发现所有图片文件
 * 无需 index.json，支持任意文件名和格式
 */
import fs from 'node:fs';
import path from 'node:path';

// 支持的图片格式
const IMAGE_EXTENSIONS = new Set(['webp', 'jpg', 'jpeg', 'png', 'gif', 'avif', 'svg', 'bmp', 'ico']);

export interface AlbumImages {
  id: string;
  images: string[];
  cover: string;
  count: number;
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
            // 排除 index.json 和非图片文件
            if (f === 'index.json') return false;
            const ext = f.split('.').pop()?.toLowerCase() || '';
            return IMAGE_EXTENSIONS.has(ext);
          })
          .sort((a, b) => {
            // 自然排序：支持数字序号、日期等
            return a.localeCompare(b, undefined, { numeric: true });
          });

        if (files.length > 0) {
          const images = files.map(f => `/huiyi/${albumId}/${f}`);
          result.set(albumId, {
            id: albumId,
            images,
            cover: images[0],
            count: files.length,
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
 * 扫描指定目录下的所有图片文件
 * 用于轩窗(首页)轮播图等场景
 * @param dirPath 相对于 public/ 的路径，如 'home/blog'
 * @returns 图片URL数组（以 / 开头的web路径）
 */
export function scanDirectoryImages(dirPath: string): string[] {
  const fullDir = path.resolve('public', dirPath);

  if (!fs.existsSync(fullDir)) {
    console.log(`[image-scanner] public/${dirPath}/ 目录不存在，跳过图片扫描`);
    return [];
  }

  try {
    const files = fs.readdirSync(fullDir, { withFileTypes: true });
    const images: string[] = [];

    for (const entry of files) {
      if (entry.isDirectory()) continue;
      const ext = entry.name.split('.').pop()?.toLowerCase() || '';
      if (IMAGE_EXTENSIONS.has(ext)) {
        // 确保路径以 / 开头
        const webPath = `/${dirPath}/${entry.name}`.replace(/\/+/g, '/');
        images.push(webPath);
      }
    }

    images.sort((a, b) => {
      const nameA = a.split('/').pop() || '';
      const nameB = b.split('/').pop() || '';
      return nameA.localeCompare(nameB, undefined, { numeric: true });
    });

    console.log(`[image-scanner] 扫描 public/${dirPath}/，发现 ${images.length} 张图片`);
    return images;
  } catch (err) {
    console.warn(`[image-scanner] 扫描 public/${dirPath}/ 出错:`, err);
    return [];
  }
}
