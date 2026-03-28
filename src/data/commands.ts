import type { CollectionEntry } from 'astro:content';

export type Command = {
  id: string;
  label: string;
  href: string;
};

export function buildCommands(
  projects: CollectionEntry<'projects'>[]
): Command[] {
  return projects.map((project) => ({
    id: project.slug,
    label: project.data.title,
    href: `/projects/${project.slug}`,
  }));
}
