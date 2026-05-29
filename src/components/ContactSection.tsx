'use client'

import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'

const t = {
  jp: {
    heading: 'Contact',
    body: 'プロジェクトのご相談、技術に関するご質問、または単に挨拶だけでも、お気軽にご連絡ください。以下のフォームよりお待ちしております。',
    btnLabel: 'お問い合わせフォームへ',
    snsLabel: 'または、以下のSNSでもお気軽にご連絡ください。',
  },
  en: {
    heading: 'Contact',
    body: "Feel free to reach out for project discussions, technical questions, or just to say hello. I'd love to hear from you.",
    btnLabel: 'Open Contact Form',
    snsLabel: 'Or find me on social media:',
  },
}

export default function ContactSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="contact">
      <div className="w-4/5 max-w-4xl mx-auto px-5 text-center">
        <h2 className="text-center mb-16 text-4xl font-bold relative">
          {c.heading}
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
        </h2>

        <div className="glassmorphism p-10 rounded-2xl max-w-2xl mx-auto">
          <p className="text-muted text-lg leading-relaxed mb-8">{c.body}</p>
          <a
            href="https://forms.gle/avJvHqEizJGWRnjF9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-background py-4 px-8 rounded-full cursor-pointer text-base font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30 tracking-wide"
          >
            <i className="fas fa-paper-plane mr-2"></i> {c.btnLabel}
          </a>
        </div>

        <div className="mt-16">
          <p className="text-muted mb-6 text-sm">{c.snsLabel}</p>
          <div className="flex justify-center items-center gap-10">
            <a href="mailto:yuri.tada28@gmail.com" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/yuritada" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://x.com/jkotqmrr5" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
