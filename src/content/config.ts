import { defineCollection, z } from 'astro:content';

// 日期预处理：将 Date 对象转换为 YYYY-MM-DD 字符串
// 解决 YAML frontmatter 中 2026-03-21 被 YAML 解析器转为 Date 对象后，
// z.coerce.string() 调用 String() 转换为英文格式的问题
// 如 "Sat Mar 21 2026 08:00:00 GMT+0800 (China Standard Time)"
const dateString = z.preprocess(
  (val) => {
    if (val instanceof Date) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    if (typeof val === 'string') {
      // 如果是 ISO 格式带时间（如 "2026-05-26T18:13:00Z"），只保留日期部分
      const match = val.match(/^(\d{4}-\d{2}-\d{2})/);
      if (match) return match[1];
    }
    return val;
  },
  z.string()
);

const pots = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: dateString,
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    licenseName: z.string().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    pubDate: dateString.optional(),
    encrypted: z.coerce.boolean().optional().default(false),
    password: z.string().optional(),
    pinned: z.coerce.boolean().optional().default(false),
    // 兼容旧字段
    date: dateString.optional(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    category: z.string().optional(),
    sourceLink: z.string().optional(),
    draft: z.coerce.boolean().optional().default(false),
  }),
});

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: dateString,
    tags: z.array(z.string()),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { pots, diary };
