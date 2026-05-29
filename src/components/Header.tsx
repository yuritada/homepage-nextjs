'use client'

import { useState, useEffect, useRef, Fragment } from 'react'
import Navigation from '@/components/Navigation'
import Starfield from '@/components/Starfield'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  jp: {
    hiragana: 'ただゆうり',
    title: '多田有里',
    subtitle: '目指せ、最強のAI人材。\n3D × LLM × 構造化思考で\n誰も見たことない解を出し続ける。',
    badge: 'AI研究者 × フルスタックエンジニア',
    cta1: '研究を見る',
    cta2: 'お問い合わせ',
  },
  en: {
    title: 'Yuri Tada',
    subtitle: "On a mission: the strongest AI engineer.\nLLM × 3D Space × Structural Thinking —\nbuilding what others haven't imagined yet.",
    badge: 'AI Researcher × Full-Stack Engineer',
    cta1: 'View Research',
    cta2: 'Contact Me',
  },
}

export default function Header() {
  const { lang } = useLanguage()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [isTitleDone, setIsTitleDone] = useState(false)
  const [isSubtitleDone, setIsSubtitleDone] = useState(false)
  const [isKanjiConverted, setIsKanjiConverted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset animation when language switches
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setTitle('')
    setSubtitle('')
    setIsTitleDone(false)
    setIsSubtitleDone(false)
    setIsKanjiConverted(false)
  }, [lang])

  useEffect(() => {
    const titleSpeed = 120
    const subtitleSpeed = 45
    const c = content[lang]
    const isJP = lang === 'jp'

    if (isTitleDone && isSubtitleDone) return

    const tick = () => {
      if (!isTitleDone) {
        if (isJP && !isKanjiConverted) {
          const hiragana = (c as typeof content.jp).hiragana
          if (title.length < hiragana.length) {
            setTitle(hiragana.substring(0, title.length + 1))
          } else {
            timeoutRef.current = setTimeout(() => {
              setTitle(c.title)
              setIsKanjiConverted(true)
            }, 200)
          }
        } else {
          if (title.length < c.title.length) {
            setTitle(c.title.substring(0, title.length + 1))
          } else {
            setIsTitleDone(true)
          }
        }
      } else {
        if (subtitle.length < c.subtitle.length) {
          setSubtitle(c.subtitle.substring(0, subtitle.length + 1))
        } else {
          setIsSubtitleDone(true)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isTitleDone ? subtitleSpeed : titleSpeed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [title, subtitle, isTitleDone, isSubtitleDone, isKanjiConverted, lang])

  const c = content[lang]

  return (
    <header id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Starfield />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,216,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,216,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-primary/40 text-primary text-sm font-medium tracking-widest animate-pulse-glow">
          {c.badge}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter h-24 text-gradient">
          {title}
          {!isTitleDone && <span className="animate-blink text-primary">|</span>}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted mb-10 max-w-2xl h-32 leading-relaxed">
          {subtitle.split('\n').map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < subtitle.split('\n').length - 1 && <br />}
            </Fragment>
          ))}
          {isTitleDone && !isSubtitleDone && (
            <span className="animate-blink text-primary">|</span>
          )}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#research"
            className="bg-primary text-background py-3 px-8 rounded-full text-base font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30 tracking-wide"
          >
            {c.cta1}
          </a>
          <a
            href="#contact"
            className="border border-primary/50 text-primary py-3 px-8 rounded-full text-base font-semibold transition-all hover:bg-primary/10 hover:border-primary tracking-wide"
          >
            {c.cta2}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs tracking-widest">
        <span>SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"></div>
      </div>

      <Navigation />
    </header>
  )
}
