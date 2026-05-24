import { defineCollection, z } from 'astro:content';

const pots = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.coerce.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    licenseName: z.string().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    pubDate: z.coerce.string(),
    encrypted: z.boolean().optional().default(false),
    password: z.string().optional(),
    // 兼容旧字段
    date: z.coerce.string().optional(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    tags: z.array(z.string()),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { pots, diary };
