'use client'

import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Starfield from '@/components/Starfield'

const content = [
  {
    title: '多田有里',
    hiragana: 'ただゆうり',
    subtitle: 'データサイエンスを学ぶ学生。Web開発から機械学習まで、テクノロジーの世界を探求しています。',
  },
  {
    title: 'Yuri Tada',
    subtitle: 'A Data Science student exploring the universe of technology, from web development to machine learning.',
  },
]

export default function Header() {
  const [languageIndex, setLanguageIndex] = useState(0)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTitleDone, setIsTitleDone] = useState(false)
  const [isKanjiConverted, setIsKanjiConverted] = useState(false)

  // Ref to hold timeout IDs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const titleTypingSpeed = 120
    const subtitleTypingSpeed = 50 // Faster as requested
    const pauseBeforeDelete = 10000 // 10 seconds
    const pauseBeforeKanjiConvert = 200
    const pauseBeforeDeletionSwitch = 200 // Brief pause before instant delete

    const handleTyping = () => {
      const currentContent = content[languageIndex]
      const isJapanese = 'hiragana' in currentContent

      if (isDeleting) {
        // --- DELETING LOGIC (INSTANT) ---
        timeoutRef.current = setTimeout(() => {
          setTitle('')
          setSubtitle('')
          setIsTitleDone(false)
          setIsKanjiConverted(false)
          // Move to the next language and start typing again
          setLanguageIndex((prev) => (prev + 1) % content.length)
          setIsDeleting(false)
        }, pauseBeforeDeletionSwitch)
        return
      }

      // --- TYPING LOGIC ---
      if (!isTitleDone) {
        // Typing title
        if (isJapanese && !isKanjiConverted) {
          // 1. Type Hiragana
          if (title.length < currentContent.hiragana.length) {
            setTitle(currentContent.hiragana.substring(0, title.length + 1))
          } else {
            // 2. Pause and convert to Kanji
            timeoutRef.current = setTimeout(() => {
              setTitle(currentContent.title) // Replace with Kanji
              setIsKanjiConverted(true)
            }, pauseBeforeKanjiConvert)
          }
        } else {
          // Type English title or already-converted Kanji title
          if (title.length < currentContent.title.length) {
            setTitle(currentContent.title.substring(0, title.length + 1))
          } else {
            setIsTitleDone(true)
          }
        }
      } else {
        // Typing subtitle
        if (subtitle.length < currentContent.subtitle.length) {
          setSubtitle(currentContent.subtitle.substring(0, subtitle.length + 1))
        } else {
          // Finished typing subtitle, wait then start deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseBeforeDelete)
        }
      }
    }

    // Set timeout for the next action
    if (!isDeleting) {
        const speed = isTitleDone ? subtitleTypingSpeed : titleTypingSpeed
        timeoutRef.current = setTimeout(handleTyping, speed)
    } else {
        handleTyping() // Handle deletion logic immediately
    }


    // Cleanup function to clear timeouts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [title, subtitle, isDeleting, isTitleDone, languageIndex, isKanjiConverted])

  return (
    <header id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Starfield />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tighter h-24">
          {title}
          {!isDeleting && <span className="animate-blink">|</span>}
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-8 max-w-2xl h-20">
          {subtitle}
          {isTitleDone && !isDeleting && <span className="animate-blink">|</span>}
        </p>
        <a
          href="#contact"
          className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold transition-transform hover:scale-105 hover:bg-primary-light shadow-lg"
        >
          Contact Me
        </a>
      </div>
      <Navigation />
    </header>
  )
}