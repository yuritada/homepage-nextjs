'use client'

import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { docTypeConfig, docUI, formatDocDate, type DocEntry } from '@/lib/doc'

/** The home page teaser for /documents. Mirrors BlogSection, one section below it. */
export default function DocsSection({ docs }: { docs: DocEntry[] }) {
  const { lang } = useLanguage()
  const t = docUI[lang]

  if (docs.length === 0) return null

  return (
    <Section id="docs">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <h2 className="text-center mb-14 md:mb-20 text-3xl md:text-4xl font-bold relative">
          Documents
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {docs.map((doc, index) => {
            const c = doc[lang]
            const cfg = docTypeConfig[doc.type]
            return (
              <motion.div
                key={doc.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/documents/${doc.slug}`} className="block h-full">
                  <motion.div
                    className="glassmorphism p-6 rounded-xl h-full flex flex-col"
                    whileHover={{ y: -6, boxShadow: '0 0 20px rgba(0, 216, 255, 0.3)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* First page of the PDF — a document reads as a page, not as prose */}
                    {doc.thumbnail && (
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-border mb-4">
                        <Image
                          src={doc.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* Type badge and event */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                        <i className={cfg.icon}></i>
                        {cfg.label[lang]}
                      </span>
                      {c.event && <span className="text-xs text-muted truncate">{c.event}</span>}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-foreground leading-snug flex-1">
                      {c.title}
                    </h3>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-muted text-xs">{formatDocDate(doc.date, lang)}</span>
                      <span className="text-primary text-xs font-medium">{t.open}</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* All documents link */}
        <div className="text-center mt-12">
          <Link
            href="/documents"
            className="inline-block border border-primary/50 text-primary py-2.5 px-8 rounded-full text-sm font-semibold transition-all hover:bg-primary/10 hover:border-primary tracking-wide"
          >
            {t.allDocs}
          </Link>
        </div>
      </div>
    </Section>
  )
}
