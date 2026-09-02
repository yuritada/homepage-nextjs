'use client'

import Image from 'next/image'
import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'

/** One figure: an icon, the number, an optional counter word, and its caption. */
type Figure = {
  icon: string
  value: string
  /** Counter word set only in Japanese, where a bare numeral reads unfinished. */
  unit?: string
  label: string
}

/**
 * A stat can carry a second figure of its own (talks within events, awards
 * within hackathons). Both halves get the same type size — the breakdown is
 * the point, not a footnote to the headline number.
 */
type Stat = Figure & { sub?: Figure }

type Content = {
  heading: string
  p1: string
  p2: string
  tags: string[]
  stats: Stat[]
}

const t: { jp: Content; en: Content } = {
  jp: {
    heading: 'About',
    p1: '武蔵野大学データサイエンス学部に在籍。幼少期から「なぜ？どうして？」と物事の本質を追い求める探究心が強く、それが論理的思考力とAI研究の原点です。',
    p2: '大学入学と同時に初めて自分のPCを手にし、プログラミング・機械学習・クラウドインフラからハードウェアまで、誰に言われるでもなく勝手に学び続けています。ハッカソン受賞・R&Dインターン・技育展参加など、学外でも実績を積み上げています。',
    tags: ['データサイエンス', 'LLM / MCP', '3D研究', 'フルスタック', 'ハッカソン優勝'],
    stats: [
      { icon: 'fas fa-code',        value: '3年+',    label: 'エンジニア歴' },
      { icon: 'fas fa-users',       value: '14', unit: '回', label: 'イベント参加',
        sub: { icon: 'fas fa-microphone',  value: '4', unit: '回', label: '登壇' } },
      { icon: 'fas fa-laptop-code', value: '7',  unit: '回', label: 'ハッカソン',
        sub: { icon: 'fas fa-trophy',      value: '3', unit: '回', label: '受賞' } },
      { icon: 'fas fa-brain',       value: 'AI全領域', label: '研究テーマ' },
    ],
  },
  en: {
    heading: 'About',
    p1: "A Data Science student at Musashino University. Since childhood, a strong curiosity for \"why?\" and \"how?\" has driven me to explore the root of everything — forming the foundation of my logical thinking and AI research.",
    p2: 'Upon entering university with my first PC, curiosity exploded. From programming and machine learning to cloud infrastructure and hardware, I just keep learning on my own — nobody has to tell me to. Highlights include hackathon awards, an R&D internship, and presenting at Giken-ten.',
    tags: ['Data Science', 'LLM / MCP', '3D Research', 'Full-Stack', 'Hackathon Winner'],
    stats: [
      { icon: 'fas fa-code',        value: '3+',   label: 'Years as Engineer' },
      { icon: 'fas fa-users',       value: '14',   label: 'Events',
        sub: { icon: 'fas fa-microphone', value: '4', label: 'Talks' } },
      { icon: 'fas fa-laptop-code', value: '7',    label: 'Hackathons',
        sub: { icon: 'fas fa-trophy',     value: '3', label: 'Awards' } },
      { icon: 'fas fa-brain',       value: 'All of AI', label: 'Research Focus' },
    ],
  },
}

function StatFigure({ f, accent = false }: { f: Figure; accent?: boolean }) {
  return (
    <>
      <div className="flex items-baseline justify-center gap-1.5 mb-1">
        <i className={`${f.icon} text-sm md:text-base ${accent ? 'text-accent/70' : 'text-primary/70'}`} aria-hidden="true"></i>
        <span className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${accent ? 'text-accent' : 'text-gradient'}`}>
          {f.value}
        </span>
        {f.unit && (
          <span className={`text-xs md:text-sm font-semibold ${accent ? 'text-accent/70' : 'text-muted'}`}>{f.unit}</span>
        )}
      </div>
      <div className={`text-[0.65rem] sm:text-xs tracking-wider uppercase ${accent ? 'text-accent/80' : 'text-muted'}`}>
        {f.label}
      </div>
    </>
  )
}

export default function AboutSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="about">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <h2 className="text-center mb-12 md:mb-16 text-3xl md:text-4xl font-bold relative">
          {c.heading}
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-2xl overflow-hidden border border-primary/20 shadow-xl shadow-primary/10 group animate-pulse-glow">
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
            <p className="text-muted text-base md:text-lg leading-relaxed">{c.p1}</p>
            <p className="text-muted text-base md:text-lg leading-relaxed">{c.p2}</p>
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
            <div key={s.label} className="glassmorphism rounded-xl p-4 md:p-5 text-center hover:border-primary/30 transition-all flex flex-col justify-center">
              {s.sub ? (
                /* Side by side only from xl, where each half is wide enough for
                   the longest label ('Hackathons'); below that the two figures
                   stack so neither can ever overflow its column. */
                <div className="flex flex-col xl:flex-row items-stretch justify-center gap-2 xl:gap-3">
                  <div className="flex-1"><StatFigure f={s} /></div>
                  <div className="h-px w-full xl:h-auto xl:w-px bg-border"></div>
                  <div className="flex-1"><StatFigure f={s.sub} accent /></div>
                </div>
              ) : (
                <StatFigure f={s} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
