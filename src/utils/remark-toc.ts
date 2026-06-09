/**
 * remark-toc: 支持 [TOC] 语法在文章内容中自动生成目录
 *
 * 将 markdown 中的 [TOC] 标记替换为当前文章的目录列表
 * 这是文章内部的目录，与右侧边栏的 TOC 是相互独立的
 *
 * 用法: 在 markdown 中任意位置写入 [TOC] 即可
 *
 * 关键：slug 生成逻辑必须与 Astro 的 github-slugger 一致，
 * 这样 [TOC] 生成的锚点链接才能与最终渲染的标题 id 匹配
 */

function extractText(node: any): string {
  if (node.type === 'text') return node.value || '';
  if (node.type === 'html') return node.value || '';
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

// 与 github-slugger 兼容的 slug 生成
// github-slugger 内部维护一个 occurrences 映射来处理重复
class Slugger {
  private occurrences: Record<string, number> = {};

  slug(text: string): string {
    // 与 github-slugger 相同的逻辑
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/<[!/a-z].*?>/gi, '')      // 移除 HTML 标签
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^`{|}~]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!slug) slug = 'heading';

    if (this.occurrences[slug] !== undefined) {
      this.occurrences[slug]++;
      slug = slug + '-' + this.occurrences[slug];
    } else {
      this.occurrences[slug] = 0;
    }

    return slug;
  }
}

// 构建 TOC 的 HTML
function buildTocHtml(headings: Array<{ id: string; text: string; depth: number }>): string {
  if (headings.length === 0) return '';

  let html = '<div class="article-toc-inline">\n';
  html += '<div class="article-toc-inline-title">目录</div>\n';
  html += '<ul class="article-toc-inline-list">\n';

  for (const h of headings) {
    const indent = (h.depth - 1) * 2.0;
    html += `<li class="article-toc-inline-item article-toc-inline-h${h.depth}" style="padding-left: ${indent}em;">`;
    html += `<a href="#${h.id}" class="article-toc-inline-link">`;
    html += `<span class="article-toc-inline-dot">·</span>`;
    html += `<span class="article-toc-inline-text">${h.text}</span>`;
    html += `</a></li>\n`;
  }

  html += '</ul>\n</div>';
  return html;
}

export default function remarkToc() {
  return (tree: any) => {
    const slugger = new Slugger();

    // 第一遍：收集所有标题，用 github-slugger 兼容方式生成 id
    const headings: Array<{ id: string; text: string; depth: number }> = [];

    function collectHeadings(node: any) {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'heading' && child.depth >= 1 && child.depth <= 4) {
          const text = extractText(child).trim();
          if (!text) continue;

          const id = slugger.slug(text);
          headings.push({ id, text, depth: child.depth });
        }
        collectHeadings(child);
      }
    }

    collectHeadings(tree);

    if (headings.length === 0) return;

    // 第二遍：查找 [TOC] 标记并替换
    function findAndReplaceToc(node: any) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'paragraph') {
          const text = extractText(child).trim();
          if (text === '[TOC]' || text === '[toc]' || text === '[Toc]') {
            const tocHtml = buildTocHtml(headings);
            node.children[i] = {
              type: 'html',
              value: tocHtml,
            };
            return;
          }
        }

        findAndReplaceToc(child);
      }
    }

    findAndReplaceToc(tree);
  };
}
