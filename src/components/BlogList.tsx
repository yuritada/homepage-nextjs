'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatDate, blogUI, withoutSeriesPrefix, type BlogPost } from '@/lib/post'

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLanguage()
  const t = blogUI[lang]

  return (
    <>
      {/* Page header */}
      <div className="w-full max-w-4xl mx-auto px-5 md:w-4/5 mb-10 md:mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors mb-8"
        >
          {t.backHome}
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Blog</h1>
        <p className="text-muted text-sm md:text-base">{t.lead}</p>
      </div>

      {/* Post list */}
      <div className="w-full max-w-4xl mx-auto px-5 md:w-4/5 space-y-3 md:space-y-6">
        {posts.length === 0 ? (
          <p className="text-muted">{t.empty}</p>
        ) : (
          posts.map((post) => {
            const c = post[lang]
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <div className="glassmorphism rounded-xl p-4 md:p-6 transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
                  {/* Tags — clipped to a single row on phones so 4-5 tags don't stack */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3 max-h-6 md:max-h-none overflow-hidden">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Series marker, so the parts of a long series read as one group */}
                  {c.seriesTitle && (
                    <p className="text-primary-light/80 text-xs mb-1">
                      {c.seriesTitle}
                      {c.seriesLabel && ` ／ ${c.seriesLabel}`}
                    </p>
                  )}

                  <h2 className="text-base md:text-xl font-semibold text-foreground leading-snug mb-1.5 md:mb-2 line-clamp-2 md:line-clamp-none group-hover:text-primary transition-colors">
                    {c.seriesTitle ? withoutSeriesPrefix(c.title) : c.title}
                  </h2>
                  <p className="text-muted text-[0.8125rem] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                    {c.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <time className="text-muted text-xs">{formatDate(post.date, lang)}</time>
                    {/* Always visible on touch devices, hover-revealed from md up */}
                    <span className="text-primary-light text-xs md:text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {t.read}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}
