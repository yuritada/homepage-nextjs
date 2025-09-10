'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // ハンバーガーが開いているかを確認
  const [isScrolled, setIsScrolled] = useState(false) // スクロールされたかを確認(100px以上)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        const navHeight = 80
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })

        setIsMenuOpen(false)
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 shadow-lg py-3'
          : 'bg-white/95 shadow-md py-5'
      }`}
    >
      <div className="flex justify-between items-center px-[5%]">
        <Link href="/" className="text-3xl font-bold text-[#6c63ff]">
          YT
        </Link>

        <ul
          className={`nav-links list-none ${
            isMenuOpen
              ? 'flex flex-col fixed right-0 top-[8vh] h-[92vh] w-1/2 bg-white/95 justify-around items-center shadow-lg'
              : 'hidden md:flex md:space-x-8'
          }`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
        >
          <div
            className={`w-6 h-0.5 bg-gray-800 m-1 transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-gray-800 m-1 transition-opacity ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-gray-800 m-1 transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></div>
        </button>
      </div>
    </nav>
  )
}