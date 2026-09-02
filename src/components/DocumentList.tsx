'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { docTypeConfig, docUI, formatDocDate, type DocEntry } from '@/lib/doc'

export default function DocumentList({ docs }: { docs: DocEntry[] }) {
  const { lang } = useLanguage()
  const t = docUI[lang]

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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{t.heading}</h1>
        <p className="text-muted text-sm md:text-base">{t.lead}</p>
      </div>

      {/* Document list */}
      <div className="w-full max-w-4xl mx-auto px-5 md:w-4/5 space-y-3 md:space-y-6">
        {docs.length === 0 ? (
          <p className="text-muted">{t.empty}</p>
        ) : (
          docs.map((doc) => {
            const c = doc[lang]
            const cfg = docTypeConfig[doc.type]
            return (
              <Link key={doc.slug} href={`/documents/${doc.slug}`} className="block group">
                <div className="glassmorphism rounded-xl p-4 md:p-6 transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                      <i className={cfg.icon}></i>
                      {cfg.label[lang]}
                    </span>
                    <span className="text-xs text-muted font-mono">{formatDocDate(doc.date, lang)}</span>
                    {c.event && <span className="text-xs text-muted truncate">{c.event}</span>}
                  </div>

                  <h2 className="text-base md:text-xl font-semibold text-foreground leading-snug mb-1.5 md:mb-2 line-clamp-2 md:line-clamp-none group-hover:text-primary transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-muted text-[0.8125rem] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                    {c.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Tags — clipped to a single row on phones so they don't stack */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 max-h-6 md:max-h-none overflow-hidden">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary-light font-medium whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary-light text-sm font-medium whitespace-nowrap group-hover:text-primary transition-colors">
                      {t.open}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      <p className="w-full max-w-4xl mx-auto px-5 md:w-4/5 mt-8 text-muted text-xs">{t.count(docs.length)}</p>
    </>
  )
}
