import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, PostContent } from '@/lib/post'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const EN_DIR = path.join(BLOG_DIR, 'en')

export type { BlogPost, PostContent } from '@/lib/post'
export { formatDate } from '@/lib/post'

type ParsedPost = {
  date: string
  slides?: string
  content: PostContent
}

function parsePost(filepath: string): ParsedPost | null {
  if (!fs.existsSync(filepath)) return null

  const { data, content } = matter(fs.readFileSync(filepath, 'utf-8'))
  return {
    date: data.date ?? '',
    slides: data.slides ?? undefined,
    content: {
      title: data.title ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      slidesTitle: data.slidesTitle ?? undefined,
      content,
    },
  }
}

/**
 * Load one post in both languages.
 *
 * Japanese is the source of truth: it supplies the slug, date and slide deck, and
 * stands in for any post whose English translation has not been written yet.
 */
function buildPost(slug: string): BlogPost | null {
  const jp = parsePost(path.join(BLOG_DIR, `${slug}.md`))
  if (!jp) return null

  const en = parsePost(path.join(EN_DIR, `${slug}.md`))

  return {
    slug,
    date: jp.date,
    slides: jp.slides,
    jp: jp.content,
    en: en?.content ?? jp.content,
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => buildPost(filename.replace(/\.md$/, '')))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  return buildPost(slug)
}
