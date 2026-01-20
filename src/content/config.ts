import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    demoUrl: z.string().url().optional(),
    videoPreview: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
});

export const collections = {
  projects: projectCollection,
};
