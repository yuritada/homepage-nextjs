'use client'

import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const t = {
  jp: {
    eyebrow: 'Academic Work',
    heading: 'Research',
    dateBadge: '2025年〜2026年3月',
    statusBadge: '学会発表済み',
    featuredTitle1: '3D空間のMCP自然言語制御における',
    featuredTitle2: '幾何学的ハルシネーションの解決',
    cards: [
      {
        icon: 'fas fa-exclamation-triangle',
        label: 'PROBLEM',
        body: 'LLMは言語データに偏りすぎており、3D空間という非言語領域への進出が遅れている。形状の崩れや矛盾（幾何学的ハルシネーション）が大きな壁。',
      },
      {
        icon: 'fas fa-cogs',
        label: 'APPROACH',
        body: 'MCP（Model Context Protocol）を用いてLLMと3Dソフト（Blender等）を接続。自然言語インターフェースを通じた3D空間の直感的制御を実現する。',
      },
      {
        icon: 'fas fa-globe',
        label: 'VISION',
        body: 'プログラミングもモデリングも不要。言葉で語りかけるだけで誰もが3D空間を創造できる—「創造の民主化」を技術で実現する。',
        accent: true,
      },
    ],
    pastLabel: '過去の研究',
    pastAward: '学科賞受賞',
    pastDate: '2024年',
    pastTitle: '旅に特化した統合バックエンドの提案',
    pastDesc: '旅行という複雑なユースケースに最適化した新規SNSのあり方・構造・デプロイ手法を研究。バックエンド設計の観点から新しいアーキテクチャを提案し、学科賞を受賞。',
    pastTags: ['バックエンド設計', 'SNSアーキテクチャ', 'API設計'],
  },
  en: {
    eyebrow: 'Academic Work',
    heading: 'Research',
    dateBadge: '2025 – Mar 2026',
    statusBadge: 'Presented at Conference',
    featuredTitle1: 'Resolving Geometric Hallucination in',
    featuredTitle2: 'MCP-Based Natural Language Control of 3D Space',
    cards: [
      {
        icon: 'fas fa-exclamation-triangle',
        label: 'PROBLEM',
        body: 'LLMs are heavily biased toward language data, lagging in non-linguistic domains like 3D space. Geometric hallucination — distorted or contradictory 3D shapes — is the core challenge.',
      },
      {
        icon: 'fas fa-cogs',
        label: 'APPROACH',
        body: 'Connecting LLMs to 3D software (Blender, etc.) via MCP (Model Context Protocol) to enable intuitive natural language control of 3D environments.',
      },
      {
        icon: 'fas fa-globe',
        label: 'VISION',
        body: 'No programming, no modeling required. Just speak, and 3D worlds come to life — democratizing creation through technology.',
        accent: true,
      },
    ],
    pastLabel: 'Past Research',
    pastAward: 'Departmental Award',
    pastDate: '2024',
    pastTitle: 'A Proposal for a Travel-Specialized Integrated Backend',
    pastDesc: 'Researched the ideal structure, architecture, and deployment of a new SNS optimized for the complex use case of travel. Proposed a novel backend architecture that earned the departmental award.',
    pastTags: ['Backend Architecture', 'SNS Design', 'API Design'],
  },
}

export default function ResearchSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="research">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            {c.heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        {/* Featured Research */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-12 border border-primary/20 shadow-xl shadow-primary/10"
          whileHover={{ scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
          <div className="relative p-6 sm:p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold tracking-widest rounded-full uppercase">{c.dateBadge}</span>
              <span className="px-3 py-1 bg-accent/15 text-accent text-xs font-bold tracking-widest rounded-full uppercase">{c.statusBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">{c.featuredTitle1}</h3>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-6 md:mb-8 leading-tight">{c.featuredTitle2}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.cards.map((card, i) => (
                <div key={i} className="glassmorphism rounded-xl p-5">
                  <div className={`text-lg mb-2 ${card.accent ? 'text-accent' : 'text-primary'}`}>
                    <i className={card.icon}></i>
                  </div>
                  <h4 className="font-bold text-xs text-foreground mb-2 tracking-wider uppercase">{card.label}</h4>
                  <p className="text-muted text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Past Research */}
        <motion.div
          className="glassmorphism rounded-2xl p-5 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs text-muted tracking-widest uppercase font-medium">{c.pastLabel}</span>
            <span className="px-2 py-0.5 bg-accent/15 text-accent text-xs font-bold rounded-full">{c.pastAward}</span>
            <span className="text-xs text-muted">{c.pastDate}</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-3">{c.pastTitle}</h4>
          <p className="text-muted text-sm leading-relaxed mb-4">{c.pastDesc}</p>
          <div className="flex flex-wrap gap-2">
            {c.pastTags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs text-muted border border-border rounded-full">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
