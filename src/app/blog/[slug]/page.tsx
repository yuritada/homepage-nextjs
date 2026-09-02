import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getSeriesPosts } from '@/lib/blog'
import { formatDate, blogUI, type BlogPost, type PostContent } from '@/lib/post'
import type { Lang } from '@/contexts/LanguageContext'
import BlogMarkdown from '@/components/BlogMarkdown'
import PdfAttachment from '@/components/PdfAttachment'
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
          <PdfAttachment
            href={post.slides}
            title={c.slidesTitle ?? `${c.title} — ${t.slidesHeading}`}
            lang={lang}
            caption={c.slidesTitle}
          />
        </section>
      )}

      {/* Supporting documents (paper, poster, ...) */}
      {c.docs && c.docs.length > 0 && (
        <section className="mt-12 md:mt-14">
          <h2 className="text-lg md:text-2xl font-bold text-primary-light border-b border-primary/20 pb-2 mb-5 md:mb-6">
            {t.docsHeading}
          </h2>
          {c.docs.map((doc) => (
            <PdfAttachment key={doc.href} href={doc.href} title={doc.title} lang={lang} showTitle />
          ))}
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
