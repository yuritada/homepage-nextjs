'use client'

import Image from 'next/image'
import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type TimelineItem = {
  date: string
  title: string
  description: string
  type: 'award' | 'event' | 'career' | 'conference'
}

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  codeLink: string
}

const t: {
  jp: { eyebrow: string; heading: string; featuredHeading: string; timeline: TimelineItem[]; projects: Project[] }
  en: { eyebrow: string; heading: string; featuredHeading: string; timeline: TimelineItem[]; projects: Project[] }
} = {
  jp: {
    eyebrow: 'Projects & Achievements',
    heading: 'Works',
    featuredHeading: 'Featured Projects',
    timeline: [
      {
        date: '2024.06',
        title: 'Progateハッカソン — 企業賞受賞',
        description: '「画像からキーワードをあてる逆アキネーター」を開発。逆転の発想が評価され、企業賞を受賞。',
        type: 'award',
      },
      {
        date: '2024.07',
        title: 'Progate LT会 — 登壇',
        description: '自らの開発アプローチと学習経験を発表。アウトプットを通じて自分の現在地を客観視し、エンジニアネットワークを構築。',
        type: 'event',
      },
      {
        date: '2024.12',
        title: '学内研究コンペ — 学科賞受賞',
        description: '「旅に特化した統合バックエンドの提案」が評価され学科賞を受賞。バックエンド設計の論理性と実装可能性が高く評価された。',
        type: 'award',
      },
      {
        date: '2025.06',
        title: '技育キャンプハッカソン — 参加',
        description: '「勝手に方言変換SNS」を開発。投稿が自動で別方言に翻訳されるユーモアとLLM活用を組み合わせたプロダクト。',
        type: 'event',
      },
      {
        date: '2025.11',
        title: '技育展 — 参加',
        description: '国内最大規模の学生エンジニアの祭典に参加。研究・開発成果を広く発表し、各界エンジニアとの交流を深めた。',
        type: 'event',
      },
      {
        date: '2025.12',
        title: '学内ハッカソン — 優勝',
        description: '「開発環境そのものへのアプローチ」という独自の視点と圧倒的な技術力で他チームを圧倒。一般的なSNS系アプリとは一線を画すプロダクトが評価され優勝。',
        type: 'award',
      },
      {
        date: '2026.02',
        title: 'R&Dインターン開始（週3日）',
        description: 'ATS（採用管理システム）のR&D部門にジョイン。ビジネス価値を損なわず技術レベルを高める実装に挑戦中。',
        type: 'career',
      },
      {
        date: '2026.03',
        title: 'DEIM — 参加',
        description: '日本データベース学会のフォーラム（DEIM）に参加。研究成果を学術的な文脈で発表・議論。',
        type: 'conference',
      },
    ],
    projects: [
      {
        title: '野球投球のファウル確率予測',
        description: '打席・選手情報からその投球でファウルになる確率を予測する機械学習アプリ。LightGBMで精度を追求。',
        tags: ['React', 'FastAPI', 'Python', 'LightGBM', 'scikit-learn'],
        image: '/project1.png',
        codeLink: 'https://github.com/yuritada/GW_2_app_flask',
      },
      {
        title: '勝手に方言変換SNS',
        description: '投稿した発言が自動で別方言に翻訳されてしまう面白SNS。技育キャンプハッカソンで開発。',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Render', 'Vercel'],
        image: '/project2.png',
        codeLink: 'https://github.com/yuritada/dialect-sns',
      },
    ],
  },
  en: {
    eyebrow: 'Projects & Achievements',
    heading: 'Works',
    featuredHeading: 'Featured Projects',
    timeline: [
      {
        date: '2024.06',
        title: 'Progate Hackathon — Corporate Award',
        description: 'Built "Reverse Akinator from Images" — guessing keywords from images. The reverse-thinking concept won a corporate prize.',
        type: 'award',
      },
      {
        date: '2024.07',
        title: 'Progate LT Talk — Presentation',
        description: 'Presented development approach and learnings. Gained outside perspective on my progress and expanded my engineer network.',
        type: 'event',
      },
      {
        date: '2024.12',
        title: 'Internal Research Competition — Departmental Award',
        description: 'Proposed a travel-specialized integrated backend architecture. The logical rigor and implementation feasibility earned the departmental award.',
        type: 'award',
      },
      {
        date: '2025.06',
        title: 'Giken Camp Hackathon — Participated',
        description: 'Built "Unwanted Dialect Converter SNS" — posts auto-translate into another dialect. Blended humor with LLM application.',
        type: 'event',
      },
      {
        date: '2025.11',
        title: 'Giken-ten — Participated',
        description: "Participated in one of Japan's largest student engineer exhibitions. Presented research and networked with engineers across fields.",
        type: 'event',
      },
      {
        date: '2025.12',
        title: 'Internal Hackathon — 1st Place',
        description: '"An approach to the development environment itself" — a unique perspective backed by technical excellence, standing apart from the typical SNS-type entries.',
        type: 'award',
      },
      {
        date: '2026.02',
        title: 'R&D Internship Start (3 days/week)',
        description: 'Joined an ATS (Applicant Tracking System) R&D team. Pursuing implementation that elevates technical quality without sacrificing business value.',
        type: 'career',
      },
      {
        date: '2026.03',
        title: 'DEIM — Participated',
        description: 'Presented research at the Forum on Data Engineering and Information Management. Discussed findings in an academic context.',
        type: 'conference',
      },
    ],
    projects: [
      {
        title: 'Baseball Pitch Foul Probability Prediction',
        description: 'A ML app predicting foul probability from at-bat and player data. Built with LightGBM for precision.',
        tags: ['React', 'FastAPI', 'Python', 'LightGBM', 'scikit-learn'],
        image: '/project1.png',
        codeLink: 'https://github.com/yuritada/GW_2_app_flask',
      },
      {
        title: 'Auto Dialect Converter SNS',
        description: 'A fun SNS where every post gets auto-translated into another Japanese dialect. Built at Giken Camp Hackathon.',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Render', 'Vercel'],
        image: '/project2.png',
        codeLink: 'https://github.com/yuritada/dialect-sns',
      },
    ],
  },
}

const typeConfig = {
  award:      { color: 'text-accent',    bg: 'bg-accent/15',    border: 'border-accent/40',    label: { jp: '受賞',   en: 'Award' } },
  event:      { color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/30',   label: { jp: 'イベント', en: 'Event' } },
  career:     { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', label: { jp: 'キャリア', en: 'Career' } },
  conference: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', label: { jp: '学会', en: 'Conf.' } },
}

export default function WorksSection() {
  const { lang } = useLanguage()
  const c = t[lang]

  return (
    <Section id="works">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            {c.heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"></div>
          {c.timeline.map((item, i) => {
            const cfg = typeConfig[item.type]
            return (
              <motion.div
                key={i}
                className="relative pl-12 md:pl-16 pb-8 md:pb-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 ${cfg.border} ${cfg.bg} -translate-x-1/2`}></div>
                <div className="glassmorphism rounded-xl p-4 md:p-5 hover:border-primary/25 transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-muted font-mono">{item.date}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label[lang]}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Project Cards */}
        <div className="section-divider mb-12 md:mb-16"></div>
        <h3 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-10 text-foreground">
          {c.featuredHeading.split(' ')[0]}{' '}
          <span className="text-gradient">{c.featuredHeading.split(' ').slice(1).join(' ')}</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {c.projects.map((project, i) => (
            <motion.div
              key={i}
              className="glassmorphism rounded-2xl overflow-hidden group"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="h-44 sm:h-52 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"></div>
              </div>
              <div className="p-5 md:p-6">
                <h4 className="mb-3 text-lg md:text-xl font-bold text-foreground">{project.title}</h4>
                <p className="text-muted mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold text-sm hover:text-primary-light transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
