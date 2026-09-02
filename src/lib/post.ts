import type { Lang } from '@/contexts/LanguageContext'

/**
 * Shared blog types and helpers.
 *
 * Kept separate from `blog.ts` because that module touches `fs` and can only run
 * on the server. Everything here is safe to import from client components.
 */

/** A PDF attached to a post, e.g. a paper or a conference poster. */
export type PostDoc = {
  href: string
  title: string
}

/** The parts of a post that differ between languages. */
export type PostContent = {
  title: string
  summary: string
  tags: string[]
  slidesTitle?: string
  /** Supporting PDFs shown after the article body. */
  docs?: PostDoc[]
  /** Display name of the series, e.g. "MIRAIS 設計・実装記録". */
  seriesTitle?: string
  /** This post's place in the series, e.g. "第 1 回 企画編". */
  seriesLabel?: string
  content: string
}

export type BlogPost = {
  slug: string
  date: string
  slides?: string
  /** Language-neutral id shared by every post in the same series. */
  series?: string
  /** Position within the series, counting from 1. */
  seriesOrder?: number
  jp: PostContent
  en: PostContent
}

/**
 * Format a post date.
 *
 * Uses the UTC getters on purpose: dates are authored as bare `YYYY-MM-DD`, which
 * `Date` parses as UTC midnight. Reading them back with local getters would shift
 * the day for viewers west of UTC, and would also make the server and the client
 * disagree — a hydration mismatch, now that this runs on both sides.
 */
export function formatDate(dateStr: string, lang: Lang = 'jp'): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr

  if (lang === 'en') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
}

/**
 * Drop the "<series> #N｜" prefix a post title carries for standalone contexts.
 *
 * A title has to stand on its own when shared or shown in search results, so it
 * repeats the series name — which is redundant wherever the series label is
 * already displayed beside it.
 */
export function withoutSeriesPrefix(title: string): string {
  const [, ...rest] = title.split('｜')
  return rest.length > 0 ? rest.join('｜') : title
}

/** Static UI strings for the blog pages. */
export const blogUI = {
  jp: {
    lead: '技術的な学び、イベント感想、日々の気づきなど。',
    backHome: '← ホームに戻る',
    backToList: '← ブログ一覧に戻る',
    empty: '記事はまだありません。',
    read: '読む →',
    allPosts: 'すべての記事を見る',
    slidesHeading: 'スライド資料',
    docsHeading: '関連資料',
    slidesFallback: 'お使いのブラウザではPDFを表示できません。下のリンクからご覧ください。',
    tapToOpen: 'タップしてPDFを開く',
    openInNewTab: '別タブで開く ↗',
    seriesHeading: 'このシリーズの記事',
    seriesPosition: (n: number, total: number) => `全 ${total} 回中の第 ${n} 回`,
    seriesPrev: '← 前の回',
    seriesNext: '次の回 →',
  },
  en: {
    lead: 'Technical notes, event write-ups, and whatever I have been thinking about.',
    backHome: '← Back to home',
    backToList: '← Back to all posts',
    empty: 'No posts yet.',
    read: 'Read →',
    allPosts: 'View all posts',
    slidesHeading: 'Slides',
    docsHeading: 'Documents',
    slidesFallback: 'Your browser cannot display PDFs. Please use the link below.',
    tapToOpen: 'Tap to open the PDF',
    openInNewTab: 'Open in a new tab ↗',
    seriesHeading: 'Posts in this series',
    seriesPosition: (n: number, total: number) => `Part ${n} of ${total}`,
    seriesPrev: '← Previous part',
    seriesNext: 'Next part →',
  },
} as const
