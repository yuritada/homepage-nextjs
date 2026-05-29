'use client'

import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const t = {
  jp: {
    eyebrow: 'My Mindset',
    heading: 'Philosophy',
    quote: '「混沌とした世界を、技術という補助線で構造化し、誰もがアクセス可能にすること。」',
    pillars: [
      {
        number: '01',
        icon: 'fas fa-question-circle',
        title: '「なぜ？どうして？」の探究',
        body: '表面的な「何か」ではなく、根本にある「なぜ」を突き詰める。この問いが、AI研究・システム設計・問題解決すべての原点。思考に時間をかけるのは弱さではなく、欠陥を先回りして潰すための投資だと考えている。',
        accent: 'primary',
      },
      {
        number: '02',
        icon: 'fas fa-layer-group',
        title: '全レイヤーを制覇する',
        body: 'フロントエンド・バックエンド・インフラ・機械学習・ハードウェア。全てのレイヤーを理解してこそ、真の設計ができる。核心は「LLMを組み込んだシステム設計」—その一点で誰にも負けないオールラウンダーを目指している。',
        accent: 'accent',
      },
      {
        number: '03',
        icon: 'fas fa-unlock-alt',
        title: '創造を民主化する',
        body: '技術の恩恵は、専門知識を持つ一部の人だけのものではない。LLM × 3D空間の研究を通じて、言葉で語りかけるだけで誰もがクリエイターになれる世界を作る。それが、このエンジニア人生を貫く軸。',
        accent: 'primary',
      },
    ],
  },
  en: {
    eyebrow: 'My Mindset',
    heading: 'Philosophy',
    quote: '"Structure the chaos of the world with technology as the guide — and make it accessible to everyone."',
    pillars: [
      {
        number: '01',
        icon: 'fas fa-question-circle',
        title: 'The "Why?" Drive',
        body: "Instead of accepting surface-level answers, I dig for the root \"why.\" This question drives everything: AI research, system design, and problem solving. Taking time to think isn't weakness — it's an investment in catching flaws before they happen.",
        accent: 'primary',
      },
      {
        number: '02',
        icon: 'fas fa-layer-group',
        title: 'Master Every Layer',
        body: 'Frontend, backend, infrastructure, machine learning, hardware. True system design requires understanding every layer. My core strength: "system design with integrated LLM" — being an all-rounder with a razor-sharp focus.',
        accent: 'accent',
      },
      {
        number: '03',
        icon: 'fas fa-unlock-alt',
        title: 'Democratize Creation',
        body: "Technology shouldn't belong only to those with specialized knowledge. Through LLM × 3D research, I'm building a world where anyone can become a creator by simply speaking their vision. This is the axis of my engineering life.",
        accent: 'primary',
      },
    ],
  },
}

export default function PhilosophySection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="philosophy">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{c.eyebrow}</p>
          <h2 className="text-4xl font-bold relative inline-block">
            {c.heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="relative glassmorphism rounded-2xl p-8 overflow-hidden group"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`absolute -top-4 -right-2 text-8xl font-black opacity-5 select-none ${pillar.accent === 'accent' ? 'text-accent' : 'text-primary'}`}>
                {pillar.number}
              </div>
              <div className={`text-4xl mb-5 ${pillar.accent === 'accent' ? 'text-accent' : 'text-primary'}`}>
                <i className={pillar.icon}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground leading-snug">{pillar.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{pillar.body}</p>
              <div className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ${pillar.accent === 'accent' ? 'bg-gradient-to-r from-transparent via-accent to-transparent' : 'bg-gradient-to-r from-transparent via-primary to-transparent'}`}></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-gradient leading-snug">{c.quote}</p>
        </motion.div>
      </div>
    </Section>
  )
}
