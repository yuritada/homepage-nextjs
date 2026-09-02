import Link from 'next/link'
import type { Lang } from '@/contexts/LanguageContext'
import { blogUI, withoutSeriesPrefix, type BlogPost } from '@/lib/post'

/**
 * Table of contents for a multi-part series, shown on every instalment.
 *
 * A long series is only readable if each part says where it sits in the whole, so
 * this renders the full running order plus previous/next links rather than a
 * bare pair of arrows.
 */
export default function SeriesNav({
  posts,
  currentSlug,
  lang,
}: {
  posts: BlogPost[]
  currentSlug: string
  lang: Lang
}) {
  const t = blogUI[lang]

  const index = posts.findIndex((p) => p.slug === currentSlug)
  if (index === -1 || posts.length < 2) return null

  const current = posts[index]
  const prev = posts[index - 1]
  const next = posts[index + 1]

  return (
    <nav
      aria-label={t.seriesHeading}
      className="glassmorphism rounded-xl p-5 md:p-6 my-10 md:my-12"
    >
      <p className="text-primary-light text-sm font-semibold mb-1">
        {current[lang].seriesTitle ?? t.seriesHeading}
      </p>
      <p className="text-muted text-xs mb-4">
        {t.seriesPosition(index + 1, posts.length)}
      </p>

      <ol className="space-y-2 mb-5">
        {posts.map((post, i) => {
          const c = post[lang]
          const isCurrent = post.slug === currentSlug
          const label = c.seriesLabel ?? `${i + 1}`
          const title = withoutSeriesPrefix(c.title)

          return (
            <li key={post.slug} className="text-sm leading-snug">
              {isCurrent ? (
                <span className="text-foreground font-semibold">
                  <span className="text-primary-light">{label}</span>
                  {' — '}
                  {title}
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-muted hover:text-primary-light transition-colors"
                >
                  <span className="text-primary-light/80">{label}</span>
                  {' — '}
                  {title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="text-primary-light text-sm font-medium hover:text-primary transition-colors"
          >
            {t.seriesPrev}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="text-primary-light text-sm font-medium hover:text-primary transition-colors ml-auto"
          >
            {t.seriesNext}
          </Link>
        )}
      </div>
    </nav>
  )
}
