import { blogUI } from '@/lib/post'
import type { Lang } from '@/contexts/LanguageContext'

/**
 * One attached PDF: an inline viewer on desktop, a tap-through card on phones.
 *
 * Shared by the single slide deck a post may carry (`slides`) and by the list of
 * supporting documents (`docs`), so both render identically.
 */
export default function PdfAttachment({
  href,
  title,
  lang,
  caption,
  showTitle = false,
}: {
  href: string
  title: string
  lang: Lang
  /** Shown under the desktop viewer. Omitted when the title already says it all. */
  caption?: string
  /** Desktop-only label above the viewer; the phone card already shows the title. */
  showTitle?: boolean
}) {
  const t = blogUI[lang]

  return (
    <div className="mb-8 last:mb-0">
      {showTitle && (
        <h3 className="hidden md:flex items-baseline gap-2 text-foreground text-sm font-semibold mb-3">
          <i className="fas fa-file-pdf text-primary not-italic"></i>
          {title}
        </h3>
      )}
      {/* Inline viewer: desktop only — mobile browsers do not render embedded PDFs */}
      <div className="hidden md:block glassmorphism rounded-xl overflow-hidden">
        <object
          data={href}
          type="application/pdf"
          className="w-full h-[560px] bg-black/40"
          aria-label={title}
        >
          <div className="p-6 text-muted text-sm">{t.slidesFallback}</div>
        </object>
      </div>

      {/* Tap-through card: phones and tablets */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden flex items-center gap-4 glassmorphism rounded-xl p-4 active:border-primary/40 transition-colors"
      >
        <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xl">
          <i className="fas fa-file-pdf"></i>
        </span>
        <span className="min-w-0">
          <span className="block text-foreground text-sm font-semibold truncate">{title}</span>
          <span className="block text-muted text-xs mt-0.5">{t.tapToOpen}</span>
        </span>
      </a>

      <div className="mt-4 hidden md:flex flex-wrap items-center gap-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:text-primary transition-colors"
        >
          {t.openInNewTab}
        </a>
        <a
          href={href}
          download
          className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary-light transition-colors"
        >
          {t.downloadPdf}
        </a>
      </div>
      {caption && <p className="mt-3 hidden md:block text-muted text-xs">{caption}</p>}
    </div>
  )
}
