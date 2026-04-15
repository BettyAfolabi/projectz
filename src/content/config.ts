import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    featured:    z.boolean().default(false),
    tags:        z.array(z.string()).default([]),
    year:        z.number().optional(),
    role:        z.string().optional(),          // e.g. "Frontend Engineer"
    status:      z.string().optional(),          // e.g. "Shipped" | "In Progress" | "Archived"
    liveUrl:     z.string().url().optional(),
    repoUrl:     z.string().url().optional(),
    coverImage:  z.string().optional(),
    videoSrc:    z.string().optional(),

    // Engineering metadata
    stack:       z.array(z.string()).optional(), // tech used specifically on this project
    highlights:  z.array(z.string()).optional(), // 3-5 bullet engineering wins, e.g. "Reduced bundle size by 40%"
    metrics:     z.array(z.object({
      label: z.string(),   // e.g. "Lighthouse Score"
      value: z.string(),   // e.g. "98"
      unit:  z.string().optional(), // e.g. "/ 100"
    })).optional(),
  }),
});

export const collections = { projects };