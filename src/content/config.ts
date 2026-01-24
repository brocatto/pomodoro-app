import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('GettingShitDone Team'),
    heroImage: z.string().optional(),
    keywords: z.array(z.string()),
    lang: z.enum(['en', 'pt']),
    relatedSlug: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

export const collections = { blog: blogCollection };
