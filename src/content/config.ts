import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    tags: z.array(z.string()),
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

export const collections = { posts, diary };
