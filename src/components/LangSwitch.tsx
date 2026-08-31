'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Picks between two subtrees that were already rendered on the server.
 *
 * Article bodies go through `react-markdown`. Rendering them inside a client
 * component would pull that whole library into the browser bundle, so instead the
 * server renders both languages and this component only decides which one to show.
 */
export default function LangSwitch({
  jp,
  en,
}: {
  jp: React.ReactNode
  en: React.ReactNode
}) {
  const { lang } = useLanguage()
  return <>{lang === 'jp' ? jp : en}</>
}
