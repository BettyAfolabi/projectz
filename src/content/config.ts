import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    featured:    z.boolean().default(false),
    tags:        z.array(z.string()).default([]),
    year:        z.number().optional(),
    role:        z.string().optional(),          
    status:      z.string().optional(),          
    liveUrl:     z.string().url().optional(),
    repoUrl:     z.string().url().optional(),
    coverImage:  z.string().optional(),
    videoSrc:    z.string().optional(),

    
    stack:       z.array(z.string()).optional(), 
    highlights:  z.array(z.string()).optional(), 
    metrics:     z.array(z.object({
      label: z.string(),   
      value: z.string(),   
      unit:  z.string().optional(), 
    })).optional(),
    caseStudy: z.object({
      problem:  z.string(),
      decision: z.string(),
      outcome:  z.string(),
    }).optional(),
  }),
});

export const collections = { projects };