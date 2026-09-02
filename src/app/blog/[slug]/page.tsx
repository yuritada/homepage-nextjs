import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getSeriesPosts } from '@/lib/blog'
import { formatDate, blogUI, type BlogPost, type PostContent } from '@/lib/post'
import type { Lang } from '@/contexts/LanguageContext'
import BlogMarkdown from '@/components/BlogMarkdown'
import LangSwitch from '@/components/LangSwitch'
import SeriesNav from '@/components/SeriesNav'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  // Metadata is emitted at build time, before the reader picks a language, so it
  // follows the document language declared in the root layout (`<html lang="ja">`).
  return {
    title: `${post.jp.title} | Blog | 多田有里`,
    description: post.jp.summary,
  }
}

/** The whole article in one language. Rendered twice on the server, see LangSwitch. */
function Article({
  post,
  c,
  lang,
  series,
}: {
  post: BlogPost
  c: PostContent
  lang: Lang
  series: BlogPost[]
}) {
  const t = blogUI[lang]

  return (
    <>
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors mb-8 md:mb-10"
      >
        {t.backToList}
      </Link>

      {/* Article header */}
      <header className="mb-8 md:mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug mb-4">
          {c.title}
        </h1>
        <time className="text-muted text-sm">{formatDate(post.date, lang)}</time>
      </header>

      {/* Divider */}
      <div className="section-divider mb-8 md:mb-10" />

      {/* Series table of contents — omitted for standalone posts */}
      <SeriesNav posts={series} currentSlug={post.slug} lang={lang} />

      {/* Markdown content */}
      <BlogMarkdown content={c.content} />

      {/* Slides (PDF) */}
      {post.slides && (
        <section className="mt-12 md:mt-14">
          <h2 className="text-lg md:text-2xl font-bold text-primary-light border-b border-primary/20 pb-2 mb-5 md:mb-6">
            {t.slidesHeading}
          </h2>
          {/* Inline viewer: desktop only — mobile browsers do not render embedded PDFs */}
          <div className="hidden md:block glassmorphism rounded-xl overflow-hidden">
            <object
              data={post.slides}
              type="application/pdf"
              className="w-full h-[560px] bg-black/40"
              aria-label={c.slidesTitle ?? `${c.title} — ${t.slidesHeading}`}
            >
              <div className="p-6 text-muted text-sm">{t.slidesFallback}</div>
            </object>
          </div>

          {/* Tap-through card: phones and tablets */}
          <a
            href={post.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-4 glassmorphism rounded-xl p-4 active:border-primary/40 transition-colors"
          >
            <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xl">
              <i className="fas fa-file-pdf"></i>
            </span>
            <span className="min-w-0">
              <span className="block text-foreground text-sm font-semibold truncate">
                {c.slidesTitle ?? t.slidesHeading}
              </span>
              <span className="block text-muted text-xs mt-0.5">{t.tapToOpen}</span>
            </span>
          </a>
          <div className="mt-4 hidden md:flex flex-wrap items-center gap-4">
            <a
              href={post.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-primary transition-colors"
            >
              {t.openInNewTab}
            </a>
            <a
              href={post.slides}
              download
              className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors"
            >
              {t.downloadPdf}
            </a>
          </div>
          {c.slidesTitle && (
            <p className="mt-3 hidden md:block text-muted text-xs">{c.slidesTitle}</p>
          )}
        </section>
      )}

      {/* Last, so the link to the next part is the final thing on the page */}
      <SeriesNav posts={series} currentSlug={post.slug} lang={lang} />

      {/* Footer nav */}
      <div className="mt-12 md:mt-16 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-primary transition-colors"
        >
          {t.backToList}
        </Link>
      </div>
    </>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const series = post.series ? getSeriesPosts(post.series) : []

  return (
    <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <article className="w-full max-w-3xl mx-auto px-5 md:w-4/5">
        <LangSwitch
          jp={<Article post={post} c={post.jp} lang="jp" series={series} />}
          en={<Article post={post} c={post.en} lang="en" series={series} />}
        />
      </article>
    </main>
  )
}
