import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog | 多田有里',
  description: '技術的な学びやイベントの感想など、日々の発信をまとめています。',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main className="relative z-10 min-h-screen pt-28 pb-16">
        {/* Page header */}
        <div className="w-4/5 max-w-4xl mx-auto px-5 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors mb-8"
          >
            ← ホームに戻る
          </Link>
          <h1 className="text-5xl font-bold mb-4 text-gradient">Blog</h1>
          <p className="text-muted">技術的な学び、イベント感想、日々の気づきなど。</p>
        </div>

        {/* Post list */}
        <div className="w-4/5 max-w-4xl mx-auto px-5 space-y-6">
          {posts.length === 0 ? (
            <p className="text-muted">記事はまだありません。</p>
          ) : (
            posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <div className="glassmorphism rounded-xl p-6 transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-4">{post.summary}</p>

                  <div className="flex items-center justify-between">
                    <time className="text-muted text-xs">{formatDate(post.date)}</time>
                    <span className="text-primary-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      読む →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
