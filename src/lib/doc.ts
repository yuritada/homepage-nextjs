import type { Lang } from '@/contexts/LanguageContext'

/**
 * Shared types and helpers for the document archive (/documents).
 *
 * Kept separate from `documents.ts` because that module touches `fs` and can only
 * run on the server. Everything here is safe to import from client components.
 */

/** What kind of document this is. Drives the badge shown on the card. */
export type DocType = 'paper' | 'poster' | 'slides'

/** The parts of a document entry that differ between languages. */
export type DocContent = {
  title: string
  summary: string
  tags: string[]
  /** Where it was presented, e.g. "DEIM2026 インタラクティブセッション". */
  event?: string
  /** Free-form description shown on the detail page. */
  content: string
}

export type DocEntry = {
  slug: string
  /** `YYYY-MM` or `YYYY-MM-DD`. Month precision is enough for most talks. */
  date: string
  type: DocType
  /** Public path of the PDF, e.g. "/slides/deim2026-paper.pdf". */
  file: string
  /** Slug of the blog post that explains this document, when one exists. */
  relatedPost?: string
  /** First page of the PDF, rendered by scripts/gen-doc-thumbs.sh. */
  thumbnail?: string
  jp: DocContent
  en: DocContent
}

/**
 * Format a document date.
 *
 * Accepts month-only dates, which `Date` cannot be trusted to parse consistently,
 * so the parts are read off the string rather than off a `Date`.
 */
export function formatDocDate(dateStr: string, lang: Lang = 'jp'): string {
  const [year, month] = dateStr.split('-')
  if (!year || !month) return dateStr

  const monthNum = Number(month)
  if (lang === 'en') {
    const names = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ]
    return `${names[monthNum - 1] ?? month} ${year}`
  }
  return `${year}年${monthNum}月`
}

/** Badge label and colours per document type. */
export const docTypeConfig: Record<DocType, { icon: string; color: string; bg: string; label: Record<Lang, string> }> = {
  paper:  { icon: 'fas fa-file-lines',  color: 'text-primary', bg: 'bg-primary/15', label: { jp: '論文',     en: 'Paper'  } },
  poster: { icon: 'fas fa-image',       color: 'text-accent',  bg: 'bg-accent/15',  label: { jp: 'ポスター', en: 'Poster' } },
  slides: { icon: 'fas fa-file-powerpoint', color: 'text-primary-light', bg: 'bg-primary/10', label: { jp: 'スライド', en: 'Slides' } },
}

/** Static UI strings for the document pages. */
export const docUI = {
  jp: {
    heading: '資料集',
    lead: '発表スライド・論文・ポスターなど、これまでに作った資料をまとめています。',
    backHome: '← ホームに戻る',
    backToList: '← 資料一覧に戻る',
    empty: '資料はまだありません。',
    open: '開く →',
    relatedPost: '関連する記事',
    readPost: '解説記事を読む →',
    allDocs: 'すべての資料を見る',
    count: (n: number) => `全 ${n} 件`,
  },
  en: {
    heading: 'Documents',
    lead: 'Slides, papers, and posters — the material behind the talks and the research.',
    backHome: '← Back to home',
    backToList: '← Back to all documents',
    empty: 'No documents yet.',
    open: 'Open →',
    relatedPost: 'Related post',
    readPost: 'Read the write-up →',
    allDocs: 'View all documents',
    count: (n: number) => `${n} document${n === 1 ? '' : 's'}`,
  },
} as const
