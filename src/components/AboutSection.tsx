'use client'

import Image from 'next/image'
import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'

const t = {
  jp: {
    heading: 'About',
    p1: '武蔵野大学データサイエンス学部に在籍。幼少期から「なぜ？どうして？」と物事の本質を追い求める探究心が強く、それが論理的思考力とAI研究の原点です。',
    p2: '大学入学と同時に初めて自分のPCを手にし、プログラミング・機械学習・クラウドインフラからハードウェア（RTX 4090 / ROCm環境）まで貪欲に学習。ハッカソン優勝・R&Dインターン・技育展参加など、学外でも実績を積み上げています。',
    tags: ['データサイエンス', 'LLM / MCP', '3D研究', 'フルスタック', 'ハッカソン優勝'],
    stats: [
      { value: '2+',     label: '年間のコーディング' },
      { value: '5+',     label: 'ハッカソン参加数' },
      { value: '1st',    label: '優勝経験' },
      { value: '3D×LLM', label: '研究テーマ' },
    ],
  },
  en: {
    heading: 'About',
    p1: "A Data Science student at Musashino University. Since childhood, a strong curiosity for \"why?\" and \"how?\" has driven me to explore the root of everything — forming the foundation of my logical thinking and AI research.",
    p2: 'Upon entering university with my first PC, curiosity exploded. From programming and machine learning to hardware (RTX 4090 / ROCm), I pursue every layer of tech. Highlights include winning a hackathon, joining an R&D internship, and presenting at Giken-ten.',
    tags: ['Data Science', 'LLM / MCP', '3D Research', 'Full-Stack', 'Hackathon Winner'],
    stats: [
      { value: '2+',     label: 'Years Coding' },
      { value: '5+',     label: 'Hackathons' },
      { value: '1st',    label: 'Place Won' },
      { value: '3D×LLM', label: 'Research Focus' },
    ],
  },
}

export default function AboutSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="about">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl font-bold relative">
          {c.heading}
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16">
          <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border border-primary/20 shadow-xl shadow-primary/10 group animate-pulse-glow">
            <Image
              src="/profile.jpg"
              alt="Yuri Tada"
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <p className="text-muted text-lg leading-relaxed">{c.p1}</p>
            <p className="text-muted text-lg leading-relaxed">{c.p2}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {c.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-semibold tracking-wider border border-primary/30 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.stats.map((s) => (
            <div key={s.label} className="glassmorphism rounded-xl p-5 text-center hover:border-primary/30 transition-all">
              <div className="text-3xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-xs text-muted tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
