/**
 * remark-callout: 支持 GitHub/Obsidian 风格的 >[!type] 提示块语法
 *
 * 将以下 markdown 语法:
 *   >[!note]
 *   >内容
 *
 * 转换为带有 callout 类名的 blockquote，左侧彩色边框 + 图标标题行
 */

const CALLOUT_TYPES: Record<string, { icon: string; label: string }> = {
  note:     { icon: 'ℹ️',  label: 'NOTE' },
  abstract: { icon: '📋',  label: 'ABSTRACT' },
  summary:  { icon: '📋',  label: 'SUMMARY' },
  tldr:     { icon: '📋',  label: 'TLDR' },
  info:     { icon: 'ℹ️',  label: 'INFO' },
  todo:     { icon: '✔️',  label: 'TODO' },
  tip:      { icon: '💡',  label: 'TIP' },
  hint:     { icon: '💡',  label: 'HINT' },
  important:{ icon: '🔥',  label: 'IMPORTANT' },
  success:  { icon: '✔️',  label: 'SUCCESS' },
  check:    { icon: '✔️',  label: 'CHECK' },
  done:     { icon: '✔️',  label: 'DONE' },
  question: { icon: '❓',  label: 'QUESTION' },
  help:     { icon: '❓',  label: 'HELP' },
  faq:      { icon: '❓',  label: 'FAQ' },
  warning:  { icon: '⚠️',  label: 'WARNING' },
  caution:  { icon: '⚠️',  label: 'CAUTION' },
  attention:{ icon: '⚠️',  label: 'ATTENTION' },
  failure:  { icon: '❌',  label: 'FAILURE' },
  fail:     { icon: '❌',  label: 'FAIL' },
  missing:  { icon: '❌',  label: 'MISSING' },
  danger:   { icon: '⚡',  label: 'DANGER' },
  error:    { icon: '⚡',  label: 'ERROR' },
  bug:      { icon: '🐛',  label: 'BUG' },
  example:  { icon: '📝',  label: 'EXAMPLE' },
  quote:    { icon: '💬',  label: 'QUOTE' },
  cite:     { icon: '💬',  label: 'CITE' },
};

function getCalloutInfo(str: string): { icon: string; label: string } | null {
  const lower = str.toLowerCase().trim();
  return CALLOUT_TYPES[lower] || null;
}

// 简单的树遍历
function visitBlockquotes(tree: any, callback: (node: any, index: number | undefined, parent: any) => void) {
  if (!tree.children) return;
  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i];
    if (child.type === 'blockquote') {
      callback(child, i, tree);
    }
    if (child.children) {
      visitBlockquotes(child, callback);
    }
  }
}

// 提取节点的纯文本内容
function extractText(node: any): string {
  if (node.type === 'text') return node.value || '';
  if (node.type === 'html') return node.value || '';
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

export default function remarkCallout() {
  return (tree: any) => {
    visitBlockquotes(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;

      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;

      const firstText = extractText(firstChild).trim();

      // 匹配 [!type] 开头，可选后面跟自定义标题
      const calloutMatch = firstText.match(/^\[!(\w+)\]\s*(.*)/s);
      if (!calloutMatch) return;

      const typeInfo = getCalloutInfo(calloutMatch[1]);
      if (!typeInfo) return;

      // 标题行始终显示类型名（如 NOTE、TIP），不做自定义覆盖
      const displayTitle = typeInfo.label;
      const calloutType = calloutMatch[1].toLowerCase();

      // 处理第一段：去掉 [!type] 标记，保留后续文字
      const afterType = firstText.replace(/^\[!\w+\]\s*/, '').trim();

      // 重新组装 blockquote 子节点
      const newChildren: any[] = [];

      // 添加标题行：图标 + 粗体标题文字
      const headerPara = {
        type: 'paragraph',
        data: {
          hProperties: {
            className: ['callout-title'],
          },
        },
        children: [
          {
            type: 'html',
            value: `<span class="callout-icon">${typeInfo.icon}</span>`,
          },
          {
            type: 'strong',
            data: {
              hProperties: {
                className: ['callout-title-text'],
              },
            },
            children: [{ type: 'text', value: displayTitle }],
          },
        ],
      };
      newChildren.push(headerPara);

      // 如果 [!type] 后有内容，作为正文第一段
      if (afterType) {
        newChildren.push({
          type: 'paragraph',
          children: [{ type: 'text', value: afterType }],
        });
      }

      // 添加后续段落
      for (let i = 1; i < node.children.length; i++) {
        newChildren.push(node.children[i]);
      }

      // 替换 blockquote 的子节点并添加 callout 类名
      node.children = newChildren;
      node.data = {
        ...node.data,
        hProperties: {
          className: [`callout`, `callout-${calloutType}`],
        },
      };
    });
  };
}
