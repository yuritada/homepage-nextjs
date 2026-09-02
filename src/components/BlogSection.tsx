'use client'

import Link from 'next/link'
import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatDate, blogUI, type BlogPost } from '@/lib/post'

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLanguage()
  const t = blogUI[lang]

  if (posts.length === 0) return null

  return (
    <Section id="blog">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <h2 className="text-center mb-14 md:mb-20 text-3xl md:text-4xl font-bold relative">
          Blog
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => {
            const c = post[lang]
            return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <motion.div
                  className="glassmorphism p-6 rounded-xl h-full flex flex-col"
                  whileHover={{ y: -6, boxShadow: '0 0 20px rgba(0, 216, 255, 0.3)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                    {c.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {c.summary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-muted text-xs">{formatDate(post.date, lang)}</span>
                    <span className="text-primary text-xs font-medium">{t.read}</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
            )
          })}
        </div>

        {/* All posts link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block border border-primary/50 text-primary py-2.5 px-8 rounded-full text-sm font-semibold transition-all hover:bg-primary/10 hover:border-primary tracking-wide"
          >
            {t.allPosts}
          </Link>
        </div>
      </div>
    </Section>
  )
}
