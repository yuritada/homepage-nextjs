import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllDocs, getDocBySlug } from '@/lib/documents'
import { getPostBySlug } from '@/lib/blog'
import { docTypeConfig, docUI, formatDocDate, type DocContent, type DocEntry } from '@/lib/doc'
import type { Lang } from '@/contexts/LanguageContext'
import BlogMarkdown from '@/components/BlogMarkdown'
import PdfAttachment from '@/components/PdfAttachment'
import LangSwitch from '@/components/LangSwitch'
import type { Metadata } from 'next'

/** The blog post that explains a document, resolved at build time. */
type RelatedPost = { slug: string; jpTitle: string; enTitle: string }

export async function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) return {}
  // Emitted at build time, before the reader picks a language, so it follows the
  // document language declared in the root layout (`<html lang="ja">`).
  return {
    title: `${doc.jp.title} | 資料集 | 多田有里`,
    description: doc.jp.summary,
  }
}

/** The whole entry in one language. Rendered twice on the server, see LangSwitch. */
function DocPage({
  doc,
  c,
  lang,
  related,
}: {
  doc: DocEntry
  c: DocContent
  lang: Lang
  related: RelatedPost | null
}) {
  const t = docUI[lang]
  const cfg = docTypeConfig[doc.type]

  return (
    <>
      {/* Back link */}
      <Link
        href="/documents"
        className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors mb-8 md:mb-10"
      >
        {t.backToList}
      </Link>

      {/* Header */}
      <header className="mb-8 md:mb-10">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
            <i className={cfg.icon}></i>
            {cfg.label[lang]}
          </span>
          <span className="text-sm text-muted font-mono">{formatDocDate(doc.date, lang)}</span>
          {c.event && <span className="text-sm text-muted">{c.event}</span>}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug mb-4">
          {c.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Divider */}
      <div className="section-divider mb-8 md:mb-10" />

      {/* Description */}
      <BlogMarkdown content={c.content} />

      {/* The document itself */}
      <div className="mt-10 md:mt-12">
        <PdfAttachment href={doc.file} title={c.title} lang={lang} />
      </div>

      {/* The post that explains this document, when one exists */}
      {related && (
        <section className="mt-12 md:mt-14">
          <h2 className="text-lg md:text-2xl font-bold text-primary-light border-b border-primary/20 pb-2 mb-5 md:mb-6">
            {t.relatedPost}
          </h2>
          <Link href={`/blog/${related.slug}`} className="block group">
            <div className="glassmorphism rounded-xl p-4 md:p-5 transition-all duration-200 group-hover:border-primary/40">
              <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                {lang === 'en' ? related.enTitle : related.jpTitle}
              </h3>
              <span className="text-primary-light text-sm font-medium">{t.readPost}</span>
            </div>
          </Link>
        </section>
      )}

      {/* Footer nav */}
      <div className="mt-12 md:mt-16 pt-8 border-t border-border">
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-primary transition-colors"
        >
          {t.backToList}
        </Link>
      </div>
    </>
  )
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const post = doc.relatedPost ? getPostBySlug(doc.relatedPost) : null
  const related: RelatedPost | null = post
    ? { slug: post.slug, jpTitle: post.jp.title, enTitle: post.en.title }
    : null

  return (
    <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-16 md:pb-20">
      <article className="w-full max-w-3xl mx-auto px-5 md:w-4/5">
        <LangSwitch
          jp={<DocPage doc={doc} c={doc.jp} lang="jp" related={related} />}
          en={<DocPage doc={doc} c={doc.en} lang="en" related={related} />}
        />
      </article>
    </main>
  )
}
