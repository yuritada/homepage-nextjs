'use client'

import { createContext, useContext, useState } from 'react'

export type Lang = 'jp' | 'en'

interface LanguageContextType {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'jp',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('jp')
  const toggle = () => setLang((l) => (l === 'jp' ? 'en' : 'jp'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
