/**
 * remark-callout: 支持 GitHub/Obsidian 风格的 >[!type] 提示块语法
 *
 * 将以下 markdown 语法:
 *   >[!note]
 *   >内容
 *
 * 转换为带有 callout 类名的 blockquote，左侧彩色边框 + SVG图标标题行
 *
 * 图标采用 Lucide 风格 SVG，stroke-based，24x24 viewBox
 */

// --- Lucide 风格 SVG 图标（stroke-based, 24x24） ---
const ICONS: Record<string, string> = {
  // pencil — note 类
  pencil: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
  // clipboard-list — abstract/summary/tldr 类
  'clipboard-list': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
  // info — info 类
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  // check-circle — todo/success/check/done 类
  'check-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  // lightbulb — tip/hint 类
  lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  // flame — important 类
  flame: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  // help-circle — question/help/faq 类
  'help-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  // alert-triangle — warning/caution/attention 类
  'alert-triangle': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  // x-circle — failure/fail/missing 类
  'x-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  // zap — danger/error 类
  zap: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  // bug — bug 类
  bug: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',
  // list — example 类
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
  // quote — quote/cite 类
  quote: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
};

const CALLOUT_TYPES: Record<string, { icon: string; label: string }> = {
  note:     { icon: ICONS.pencil,          label: 'NOTE' },
  abstract: { icon: ICONS['clipboard-list'], label: 'ABSTRACT' },
  summary:  { icon: ICONS['clipboard-list'], label: 'SUMMARY' },
  tldr:     { icon: ICONS['clipboard-list'], label: 'TLDR' },
  info:     { icon: ICONS.info,            label: 'INFO' },
  todo:     { icon: ICONS['check-circle'], label: 'TODO' },
  tip:      { icon: ICONS.lightbulb,       label: 'TIP' },
  hint:     { icon: ICONS.lightbulb,       label: 'HINT' },
  important:{ icon: ICONS.flame,           label: 'IMPORTANT' },
  success:  { icon: ICONS['check-circle'], label: 'SUCCESS' },
  check:    { icon: ICONS['check-circle'], label: 'CHECK' },
  done:     { icon: ICONS['check-circle'], label: 'DONE' },
  question: { icon: ICONS['help-circle'],  label: 'QUESTION' },
  help:     { icon: ICONS['help-circle'],  label: 'HELP' },
  faq:      { icon: ICONS['help-circle'],  label: 'FAQ' },
  warning:  { icon: ICONS['alert-triangle'], label: 'WARNING' },
  caution:  { icon: ICONS['alert-triangle'], label: 'CAUTION' },
  attention:{ icon: ICONS['alert-triangle'], label: 'ATTENTION' },
  failure:  { icon: ICONS['x-circle'],     label: 'FAILURE' },
  fail:     { icon: ICONS['x-circle'],     label: 'FAIL' },
  missing:  { icon: ICONS['x-circle'],     label: 'MISSING' },
  danger:   { icon: ICONS.zap,             label: 'DANGER' },
  error:    { icon: ICONS.zap,             label: 'ERROR' },
  bug:      { icon: ICONS.bug,             label: 'BUG' },
  example:  { icon: ICONS.list,            label: 'EXAMPLE' },
  quote:    { icon: ICONS.quote,           label: 'QUOTE' },
  cite:     { icon: ICONS.quote,           label: 'CITE' },
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
