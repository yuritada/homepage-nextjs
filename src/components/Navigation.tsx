'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const navLinks = {
  jp: [
    { href: '#about',      label: 'About' },
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#research',   label: 'Research' },
    { href: '#works',      label: 'Works' },
    { href: '#skills',     label: 'Skills' },
    { href: '#contact',    label: 'Contact' },
  ],
  en: [
    { href: '#about',      label: 'About' },
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#research',   label: 'Research' },
    { href: '#works',      label: 'Works' },
    { href: '#skills',     label: 'Skills' },
    { href: '#contact',    label: 'Contact' },
  ],
}

export default function Navigation() {
  const { lang, toggle } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 70
        window.scrollTo({ top: offset, behavior: 'smooth' })
        setIsMenuOpen(false)
      }
    }
  }

  const links = navLinks[lang]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/85 backdrop-blur-md shadow-lg shadow-primary/5 py-3 border-b border-border'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="flex justify-between items-center px-[5%] max-w-7xl mx-auto">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl font-bold text-gradient cursor-pointer tracking-tighter"
        >
          YT.
        </a>

        <ul
          className={`nav-links list-none ${
            isMenuOpen
              ? 'flex flex-col fixed right-0 top-0 h-full w-3/4 bg-surface/95 backdrop-blur-lg justify-center items-center shadow-2xl border-l border-border'
              : 'hidden md:flex md:space-x-8'
          }`}
        >
          {links.map(({ href, label }) => (
            <li key={href} className={isMenuOpen ? 'my-4' : ''}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-muted no-underline font-medium text-sm tracking-widest uppercase relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary transition-colors"
              >
                {label}
              </a>
            </li>
          ))}

          {/* Language toggle — inline in mobile menu */}
          {isMenuOpen && (
            <li className="mt-8">
              <LangToggleButton lang={lang} toggle={toggle} />
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {/* Language toggle — desktop */}
          <div className="hidden md:block">
            <LangToggleButton lang={lang} toggle={toggle} />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden cursor-pointer z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className={`w-6 h-px bg-foreground m-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-px bg-foreground m-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-px bg-foreground m-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>
    </nav>
  )
}

function LangToggleButton({ lang, toggle }: { lang: 'jp' | 'en'; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-0 rounded-full border border-primary/40 overflow-hidden text-xs font-bold tracking-wider transition-all hover:border-primary"
      aria-label="Toggle language"
    >
      <span
        className={`px-3 py-1.5 transition-all ${
          lang === 'jp' ? 'bg-primary text-background' : 'text-muted hover:text-foreground'
        }`}
      >
        JP
      </span>
      <span
        className={`px-3 py-1.5 transition-all ${
          lang === 'en' ? 'bg-primary text-background' : 'text-muted hover:text-foreground'
        }`}
      >
        EN
      </span>
    </button>
  )
}
