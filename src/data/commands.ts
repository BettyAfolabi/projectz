// src/data/commands.ts
import type { CollectionEntry } from 'astro:content';
import type { MediumPost } from '../lib/medium';

export type CommandCategory = 'navigation' | 'project' | 'blog' | 'action';

export type Command = {
  id: string;
  label: string;
  href: string;
  category: CommandCategory;
  description?: string;
};

// Static nav sections — scroll anchors + real pages
const NAV_COMMANDS: Command[] = [
  { id: 'nav-work',       label: 'Work',       href: '/#work',        category: 'navigation', description: 'Selected projects' },
  { id: 'nav-experience', label: 'Experience', href: '/#experience',  category: 'navigation', description: 'Where I\'ve shipped' },
  { id: 'nav-stack',      label: 'Stack',      href: '/#stack',       category: 'navigation', description: 'Tools & technologies' },
  { id: 'nav-contact',    label: 'Contact',    href: '/#contact',     category: 'navigation', description: 'Get in touch' },
  { id: 'nav-blog',       label: 'Blog',       href: '/blog',         category: 'navigation', description: 'Writing on the web' },
  // { id: 'nav-projects',   label: 'All Projects', href: '/projects',   category: 'navigation', description: 'Full project list' },
];

// Quick actions — no navigation, side effects handled in the palette
const ACTION_COMMANDS: Command[] = [
  { id: 'action-cv',    label: 'Download CV',  href: '/elizabeth-afolabi-cv.pdf', category: 'action', description: 'Open PDF in new tab' },
  { id: 'action-email', label: 'Copy email',   href: 'copy:betty4web@gmail.com', category: 'action', description: 'elizabetafolabi@gmail.com' },
  { id: 'action-github',label: 'GitHub',       href: 'https://github.com/BettyAfolabi',  category: 'action', description: 'github.com/BettyAfolabi' },
  { id: 'action-linkedin', label: 'LinkedIn',  href: 'https://www.linkedin.com/in/elizabethafolabib/', category: 'action', description: 'linkedin.com/in/elizabethafolabib' },
];

export function buildCommands(
  projects: CollectionEntry<'projects'>[],
  posts: MediumPost[],
): Command[] {
  const projectCommands: Command[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    label: p.data.title,
    href: `/projects/${p.slug}`,
    category: 'project',
    description: p.data.description,
  }));

  const blogCommands: Command[] = posts.map((post, i) => ({
    id: `blog-${i}`,
    label: post.title,
    href: post.link,
    category: 'blog',
    description: post.description?.slice(0, 80),
  }));

  return [
    ...NAV_COMMANDS,
    ...projectCommands,
    ...blogCommands,
    ...ACTION_COMMANDS,
  ];
}