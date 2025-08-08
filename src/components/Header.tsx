'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
        
        setIsMenuOpen(false)
      }
    }
  }

  return (
    <header>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 shadow-lg py-3' 
          : 'bg-white/95 shadow-md py-5'
      }`}>
        <div className="flex justify-between items-center px-[5%]">
          <div className="text-3xl font-bold text-[#6c63ff]">
            YT
          </div>
          
          <ul className={`nav-links list-none ${
            isMenuOpen 
              ? 'flex flex-col fixed right-0 top-[8vh] h-[92vh] w-1/2 bg-white/95 justify-around items-center shadow-lg'
              : 'hidden md:flex md:space-x-8'
          }`}>
            <li>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, '#about')}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => handleNavClick(e, '#skills')}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, '#projects')}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#education" 
                onClick={(e) => handleNavClick(e, '#education')}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                Education
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="text-gray-800 no-underline font-medium transition-colors hover:text-[#6c63ff]"
              >
                Contact
              </a>
            </li>
          </ul>
          
          <button 
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-gray-800 m-1 transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 m-1 transition-opacity ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 m-1 transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></div>
          </button>
        </div>
      </nav>
      
      <div className="hero h-screen flex flex-col justify-center items-center text-center text-white px-5 relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <Image
          src="/hero-bg.png"
          alt="Hero background"
          fill
          style={{ objectFit: 'cover' }}
          className="-z-10"
          priority
        />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl mb-5 tracking-wide">多田 有里</h1>
          <h2 className="text-3xl md:text-4xl mb-8 font-light">Data Science × Engineering</h2>
          <p className="text-xl max-w-2xl mb-10">データの力とエンジニアリングで未来を創る</p>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-block bg-[#6c63ff] text-white py-3 px-8 rounded-full no-underline font-medium transition-all hover:bg-[#5a52e0] hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  )
}