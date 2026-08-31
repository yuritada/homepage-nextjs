import type { Lang } from '@/contexts/LanguageContext'

/**
 * Shared blog types and helpers.
 *
 * Kept separate from `blog.ts` because that module touches `fs` and can only run
 * on the server. Everything here is safe to import from client components.
 */

/** The parts of a post that differ between languages. */
export type PostContent = {
  title: string
  summary: string
  tags: string[]
  slidesTitle?: string
  content: string
}

export type BlogPost = {
  slug: string
  date: string
  slides?: string
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
    slidesFallback: 'お使いのブラウザではPDFを表示できません。下のリンクからご覧ください。',
    tapToOpen: 'タップしてPDFを開く',
    openInNewTab: '別タブで開く ↗',
    downloadPdf: 'PDFをダウンロード ↓',
  },
  en: {
    lead: 'Technical notes, event write-ups, and whatever I have been thinking about.',
    backHome: '← Back to home',
    backToList: '← Back to all posts',
    empty: 'No posts yet.',
    read: 'Read →',
    allPosts: 'View all posts',
    slidesHeading: 'Slides',
    slidesFallback: 'Your browser cannot display PDFs. Please use the link below.',
    tapToOpen: 'Tap to open the PDF',
    openInNewTab: 'Open in a new tab ↗',
    downloadPdf: 'Download PDF ↓',
  },
} as const
