/**
 * 日期格式化工具函数
 * 解决 YAML frontmatter 中日期被解析为 Date 对象后，
 * z.coerce.string() 转换为英文格式的问题（如 "Sat Mar 21 2026 08:00:00 GMT+0800"）
 */

/**
 * 格式化日期字符串为中文格式: YYYY年MM月DD日
 * 支持多种输入格式：
 * - ISO格式: "2026-05-26T18:13:00Z"
 * - Date对象字符串: "Sat Mar 21 2026 08:00:00 GMT+0800"
 * - 简单日期: "2026-05-23"
 * - Date对象
 */
export function formatDate(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';

  // 如果是 Date 对象，直接使用
  if (dateStr instanceof Date) {
    if (isNaN(dateStr.getTime())) return '';
    const y = dateStr.getFullYear();
    const m = String(dateStr.getMonth() + 1).padStart(2, '0');
    const d = String(dateStr.getDate()).padStart(2, '0');
    return `${y}年${m}月${d}日`;
  }

  const str = String(dateStr).trim();
  if (!str) return '';

  // 优先尝试匹配 YYYY-MM-DD 或 YYYY/MM/DD 格式（从字符串中提取）
  const isoMatch = str.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (isoMatch) {
    const y = isoMatch[1];
    const m = isoMatch[2].padStart(2, '0');
    const d = isoMatch[3].padStart(2, '0');
    return `${y}年${m}月${d}日`;
  }

  // 尝试解析为 Date 对象（处理英文月份名等格式）
  const date = new Date(str);
  if (!isNaN(date.getTime())) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}年${m}月${d}日`;
  }

  // 无法解析，返回原始字符串的前10个字符
  return str.substring(0, 10);
}

/**
 * 格式化日期为简短格式: YYYY-MM-DD
 * 用于卡片列表等需要紧凑显示的场景
 */
export function formatDateShort(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';

  if (dateStr instanceof Date) {
    if (isNaN(dateStr.getTime())) return '';
    const y = dateStr.getFullYear();
    const m = String(dateStr.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const str = String(dateStr).trim();
  if (!str) return '';

  // 优先匹配 YYYY-MM-DD 格式
  const isoMatch = str.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (isoMatch) {
    const y = isoMatch[1];
    const m = isoMatch[2].padStart(2, '0');
    const d = isoMatch[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // 尝试解析为 Date 对象
  const date = new Date(str);
  if (!isNaN(date.getTime())) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return str.substring(0, 10);
}
