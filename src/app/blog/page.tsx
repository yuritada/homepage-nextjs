import { getAllPosts } from '@/lib/blog'
import BlogList from '@/components/BlogList'
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
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  )
}
