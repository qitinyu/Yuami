/**
 * remark-toc: 支持 [TOC] 语法在文章内容中自动生成目录
 *
 * 将 markdown 中的 [TOC] 标记替换为当前文章的目录列表
 * 这是文章内部的目录，与右侧边栏的 TOC 是相互独立的
 *
 * 用法: 在 markdown 中任意位置写入 [TOC] 即可
 */

function extractText(node: any): string {
  if (node.type === 'text') return node.value || '';
  if (node.type === 'html') return node.value || '';
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

// 生成唯一的锚点ID
function generateSlug(text: string, usedIds: Set<string>): string {
  const slug = text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  let finalId = slug || 'toc-heading';
  let counter = 1;
  while (usedIds.has(finalId)) {
    finalId = slug + '-' + counter;
    counter++;
  }
  usedIds.add(finalId);
  return finalId;
}

// 收集所有标题
function collectHeadings(tree: any, usedIds: Set<string>): Array<{ id: string; text: string; depth: number }> {
  const headings: Array<{ id: string; text: string; depth: number }> = [];

  function walk(node: any) {
    if (!node.children) return;
    for (const child of node.children) {
      if (child.type === 'heading' && child.depth >= 1 && child.depth <= 4) {
        const text = extractText(child).trim();
        if (!text) continue;
        // 跳过装饰性标题
        if (child.depth === 3 || child.depth === 2) {
          const htmlChild = child.children?.find((c: any) =>
            c.type === 'html' || (c.type === 'element' && c.tagName === 'span')
          );
          // Simple check - if it's a colored red span, skip
        }
        const id = generateSlug(text, usedIds);
        headings.push({ id, text, depth: child.depth });
      }
      walk(child);
    }
  }

  walk(tree);
  return headings;
}

// 构建TOC的HTML
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
    // 第一遍：收集所有标题（给标题分配ID）
    const usedIds = new Set<string>();
    const headings = collectHeadings(tree, usedIds);

    // 给标题节点添加ID
    function assignIds(node: any) {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'heading' && child.depth >= 1 && child.depth <= 4) {
          const text = extractText(child).trim();
          if (!text) continue;
          const slug = generateSlug(text, usedIds);
          // 添加 id 到 heading
          if (!child.data) child.data = {};
          if (!child.data.hProperties) child.data.hProperties = {};
          child.data.hProperties.id = slug;
        }
        assignIds(child);
      }
    }

    assignIds(tree);

    if (headings.length === 0) return;

    // 第二遍：查找 [TOC] 标记并替换
    function findAndReplaceToc(node: any) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        // 检查段落中的 [TOC]
        if (child.type === 'paragraph') {
          const text = extractText(child).trim();
          if (text === '[TOC]' || text === '[toc]' || text === '[Toc]') {
            // 替换为HTML节点
            const tocHtml = buildTocHtml(headings);
            node.children[i] = {
              type: 'html',
              value: tocHtml,
            };
            return;
          }
        }

        // 递归查找
        findAndReplaceToc(child);
      }
    }

    findAndReplaceToc(tree);
  };
}
