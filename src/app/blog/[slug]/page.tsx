import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'
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
      <main className="relative z-10 min-h-screen pt-28 pb-20">
        <article className="w-4/5 max-w-3xl mx-auto px-5">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary transition-colors mb-10"
          >
            ← ブログ一覧に戻る
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-snug mb-4">
              {post.title}
            </h1>
            <time className="text-muted text-sm">{formatDate(post.date)}</time>
          </header>

          {/* Divider */}
          <div className="section-divider mb-10" />

          {/* Markdown content */}
          <div className="prose-blog">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-light transition-colors"
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
