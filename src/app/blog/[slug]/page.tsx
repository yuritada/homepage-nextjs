import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'
import BlogMarkdown from '@/components/BlogMarkdown'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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
  return {
    title: `${post.title} | Blog | 多田有里`,
    description: post.summary,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navigation />
      <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
        <article className="w-full max-w-3xl mx-auto px-5 md:w-4/5">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors mb-8 md:mb-10"
          >
            ← ブログ一覧に戻る
          </Link>

          {/* Article header */}
          <header className="mb-8 md:mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug mb-4">
              {post.title}
            </h1>
            <time className="text-muted text-sm">{formatDate(post.date)}</time>
          </header>

          {/* Divider */}
          <div className="section-divider mb-8 md:mb-10" />

          {/* Markdown content */}
          <BlogMarkdown content={post.content} />

          {/* Slides (PDF) */}
          {post.slides && (
            <section className="mt-12 md:mt-14">
              <h2 className="text-lg md:text-2xl font-bold text-primary-light border-b border-primary/20 pb-2 mb-5 md:mb-6">
                スライド資料
              </h2>
              {/* Inline viewer: desktop only — mobile browsers do not render embedded PDFs */}
              <div className="hidden md:block glassmorphism rounded-xl overflow-hidden">
                <object
                  data={post.slides}
                  type="application/pdf"
                  className="w-full h-[560px] bg-black/40"
                  aria-label={post.slidesTitle ?? `${post.title} のスライド資料`}
                >
                  <div className="p-6 text-muted text-sm">
                    お使いのブラウザではPDFを表示できません。下のリンクからご覧ください。
                  </div>
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
                    {post.slidesTitle ?? 'スライド資料'}
                  </span>
                  <span className="block text-muted text-xs mt-0.5">タップしてPDFを開く</span>
                </span>
              </a>
              <div className="mt-4 hidden md:flex flex-wrap items-center gap-4">
                <a
                  href={post.slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-white transition-colors"
                >
                  別タブで開く ↗
                </a>
                <a
                  href={post.slides}
                  download
                  className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors"
                >
                  PDFをダウンロード ↓
                </a>
              </div>
              {post.slidesTitle && (
                <p className="mt-3 hidden md:block text-muted text-xs">{post.slidesTitle}</p>
              )}
            </section>
          )}

          {/* Footer nav */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-white transition-colors"
            >
              ← ブログ一覧に戻る
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
