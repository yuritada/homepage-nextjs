'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  
  { href: '#education', label: 'Education' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        const navHeight = 70
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
        setIsMenuOpen(false)
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="flex justify-between items-center px-[5%] max-w-7xl mx-auto">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-3xl font-bold text-primary transition-colors hover:text-primary-light cursor-pointer"
        >
          YT
        </a>

        <ul
          className={`nav-links list-none ${
            isMenuOpen
              ? 'flex flex-col fixed right-0 top-0 h-full w-3/4 bg-surface/95 backdrop-blur-lg justify-center items-center shadow-2xl'
              : 'hidden md:flex md:space-x-8'
          }`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href} className={isMenuOpen ? 'my-4' : ''}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-foreground no-underline font-medium text-lg relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden cursor-pointer z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <div className={`w-6 h-0.5 bg-foreground m-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-foreground m-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-foreground m-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>
    </nav>
  )
}
