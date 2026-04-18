// src/lib/medium.ts

import { XMLParser } from 'fast-xml-parser';

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
};

export async function getMediumPosts(count = 5): Promise<MediumPost[]> {
  const feed = `https://medium.com/feed/@devduchess`;

  const res = await fetch(feed, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/rss+xml',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Medium feed: ${res.status}`);
  }

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const json = parser.parse(xml);

  const items = json?.rss?.channel?.item;

  if (!items) {
    throw new Error('No posts found');
  }

  const list = Array.isArray(items) ? items : [items];

  return list.slice(0, count).map((item: any) => {
    const content = item['content:encoded'] || item.description || '';

    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);

    return {
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      thumbnail: imgMatch?.[1] ?? '',
      description: content.replace(/<[^>]*>/g, '').slice(0, 160),
    };
  });
}