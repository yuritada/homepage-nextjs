import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { DocContent, DocEntry, DocType } from '@/lib/doc'

const DOC_DIR = path.join(process.cwd(), 'content/documents')
const EN_DIR = path.join(DOC_DIR, 'en')

export type { DocEntry, DocContent } from '@/lib/doc'
export { formatDocDate } from '@/lib/doc'

type ParsedDoc = {
  date: string
  type: DocType
  file: string
  relatedPost?: string
  content: DocContent
}

function parseDoc(filepath: string): ParsedDoc | null {
  if (!fs.existsSync(filepath)) return null

  const { data, content } = matter(fs.readFileSync(filepath, 'utf-8'))
  return {
    date: data.date ?? '',
    type: (data.type as DocType) ?? 'slides',
    file: data.file ?? '',
    relatedPost: data.relatedPost || undefined,
    content: {
      title: data.title ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      event: data.event ?? undefined,
      content,
    },
  }
}

/**
 * Load one document entry in both languages.
 *
 * Japanese is the source of truth, exactly as it is for the blog: it supplies the
 * slug, date, type and file path, and stands in for any entry not yet translated.
 */
function buildDoc(slug: string): DocEntry | null {
  const jp = parseDoc(path.join(DOC_DIR, `${slug}.md`))
  if (!jp) return null

  const en = parseDoc(path.join(EN_DIR, `${slug}.md`))

  return {
    slug,
    date: jp.date,
    type: jp.type,
    file: jp.file,
    relatedPost: jp.relatedPost,
    jp: jp.content,
    en: en?.content ?? jp.content,
  }
}

export function getAllDocs(): DocEntry[] {
  if (!fs.existsSync(DOC_DIR)) return []

  return fs
    .readdirSync(DOC_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => buildDoc(filename.replace(/\.md$/, '')))
    .filter((doc): doc is DocEntry => doc !== null)
    // Newest first. Month-only dates sort correctly as plain strings, which
    // `YYYY-MM` and `YYYY-MM-DD` both are.
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getDocBySlug(slug: string): DocEntry | null {
  return buildDoc(slug)
}

/** The newest documents, for the home page teaser. */
export function getFeaturedDocs(limit: number): DocEntry[] {
  return getAllDocs().slice(0, limit)
}
