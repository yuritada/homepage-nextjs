'use client'

import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'

const t = {
  jp: {
    eyebrow: 'Background',
    heading: '学歴・経歴',
    items: [
      {
        title: '武蔵野大学 データサイエンス学部',
        date: '2024 – 2028（予定）',
        description: '統計学・機械学習・データビジュアライゼーションを中心に学習。AIシステム開発と3D空間研究を専攻。',
      },
      {
        title: 'R&Dインターン — 採用管理システム開発',
        date: '2026 – 現在（週3日）',
        description: 'ATS（採用管理システム）のR&Dに参加。ビジネス価値を保ちながら技術レベルを引き上げる実装に挑戦。ユーザー課題を想像しながら、複雑さを抑えた高度な処理設計を追求している。',
      },
      {
        title: 'NAISインターン',
        date: '2025年8月',
        description: '短期インターンシップにて、実務でのデータサイエンス・エンジニアリングを経験。実際のプロジェクトを通じた知識の実践と、チーム開発プロセスを学んだ。',
      },
      {
        title: 'エンジニアリング自己学習',
        date: '2024 – 現在',
        description: 'ハッカソン・Kaggleコンペ・Progate Barへの参加など、継続的な実践を通じてフルスタックエンジニアとしてのスキルを磨いている。',
      },
    ],
  },
  en: {
    eyebrow: 'Background',
    heading: 'Education',
    items: [
      {
        title: 'Musashino University — Faculty of Data Science',
        date: '2024 – 2028 (expected)',
        description: 'Studying statistics, machine learning, and data visualization. Specializing in AI systems development and 3D space research.',
      },
      {
        title: 'R&D Internship — ATS Development',
        date: '2026 – Present (3 days/week)',
        description: 'Building features for an Applicant Tracking System. Pursuing the balance of raising technical quality without lowering business value, informed by imagining real user pain points.',
      },
      {
        title: 'NAIS Internship',
        date: 'August 2025',
        description: 'Gained hands-on data science and engineering experience in a real project environment. Learned collaborative development workflows and applied academic knowledge in practice.',
      },
      {
        title: 'Self-Directed Engineering Learning',
        date: '2024 – Present',
        description: 'Continuously building full-stack skills through hackathons, Kaggle competitions, and monthly Progate Bar networking events.',
      },
    ],
  },
}

export default function EducationSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="education">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            {c.heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        {/* Timeline: single column on phones, alternating from md up */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute w-px bg-gradient-to-b from-primary/50 via-border to-transparent top-0 bottom-0 left-2 md:left-1/2 md:-translate-x-1/2"></div>
          {c.items.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-start w-full mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full pl-10 md:pl-0 md:w-1/2">
                <div className={`p-5 md:p-6 rounded-xl glassmorphism hover:border-primary/25 transition-all ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <h3 className="mb-1 text-base font-bold text-primary">{item.title}</h3>
                  <p className="text-muted text-xs mb-3 font-mono">{item.date}</p>
                  <p className="text-muted leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
              <div className="absolute left-2 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full z-10 border-2 border-background shadow-lg shadow-primary/50 mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
