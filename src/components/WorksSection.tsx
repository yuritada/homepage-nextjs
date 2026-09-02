'use client'

import { useState } from 'react'
import Image from 'next/image'
import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type TimelineItem = {
  date: string
  title: string
  description: string
  type: 'award' | 'talk' | 'event' | 'career' | 'conference'
  /** Shown in the "Highlights" view. Everything else only appears under "All". */
  highlight?: boolean
  link?: string
}

type ProjectLink = {
  label: string
  href: string
  icon: string
  /** Internal routes and same-origin assets stay in the tab. */
  external?: boolean
}

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  /** When present, the card plays this loop instead of showing the still. */
  video?: string
  /** Rendered full-width, ahead of the grid. */
  featured?: boolean
  links: ProjectLink[]
}

const t: {
  jp: { eyebrow: string; heading: string; featuredHeading: string; filterHighlights: string; filterAll: string; timeline: TimelineItem[]; projects: Project[] }
  en: { eyebrow: string; heading: string; featuredHeading: string; filterHighlights: string; filterAll: string; timeline: TimelineItem[]; projects: Project[] }
} = {
  jp: {
    eyebrow: 'Projects & Achievements',
    heading: 'Works',
    featuredHeading: 'Featured Projects',
    filterHighlights: 'ハイライト',
    filterAll: 'すべて',
    timeline: [
      {
        date: '2024.06',
        title: 'Progateハッカソン powered by AWS — 企業賞受賞',
        description: '「画像からキーワードをあてる逆アキネーター」を開発。逆転の発想が評価され、企業賞を受賞。',
        type: 'award',
        highlight: true,
        link: 'https://progate.connpass.com/event/317774/',
      },
      {
        date: '2024.07',
        title: 'Progate ユーザーLT会 — 登壇',
        description: '自らの開発アプローチと学習経験を発表。アウトプットを通じて自分の現在地を客観視し、エンジニアネットワークを構築。',
        type: 'talk',
        highlight: true,
        link: 'https://progate.connpass.com/event/323408/',
      },
      {
        date: '2024.12',
        title: '学内研究コンペ — 学科賞受賞',
        description: '「旅に特化した統合バックエンドの提案」が評価され学科賞を受賞。バックエンド設計の論理性と実装可能性が高く評価された。',
        type: 'award',
        highlight: true,
      },
      {
        date: '2025.03',
        title: '技育祭2025【春】— 参加',
        description: '学生エンジニア向けの大規模カンファレンスに参加。第一線のエンジニアの講演から、技術選定とキャリアの考え方を持ち帰った。',
        type: 'event',
      },
      {
        date: '2025.04',
        title: 'サポーターズミートアップ＠東京 — 参加',
        description: '初めてエンジニアの集まるイベントに参加。この時の出会いが、後のLT会への積極的な参加につながった。',
        type: 'event',
      },
      {
        date: '2025.05',
        title: 'エンジニアサマーインターンEXPO（5/16）— 参加',
        description: '28卒エンジニア向けの合同説明会に参加。各社の技術スタックと開発体制を横並びで比較し、インターン選びの軸を固めた。',
        type: 'event',
      },
      {
        date: '2025.05',
        title: 'Progate BAR「実務経験どうはじめる？」— 参加',
        description: '学生限定の知見シェア＆交流会。実務経験をどう積み始めるかというテーマで、先を行く学生・社会人と議論した。',
        type: 'event',
        link: 'https://progate.connpass.com/event/351626/',
      },
      {
        date: '2025.06',
        title: 'ソニー × サイバーエージェント × NTTデータ 合同セミナー — 参加',
        description: '28卒エンジニア志望者限定のサマーインターンスペシャルセミナー。3社の開発文化と求める技術像の違いを直接聞いた。',
        type: 'event',
      },
      {
        date: '2025.06',
        title: 'エンジニアサマーインターンEXPO（6/7）— 参加',
        description: '合同説明会の第2回に参加。前回で固めた軸をもとに、応募先を絞り込むための具体的な質問を持ち込んだ。',
        type: 'event',
      },
      {
        date: '2025.06',
        title: '技育CAMP2025 ハッカソン Vol.4 — 参加',
        description: '「勝手に方言変換SNS」を開発。投稿が自動で別方言に翻訳されるユーモアとLLM活用を組み合わせたプロダクト。',
        type: 'event',
      },
      {
        date: '2025.06',
        title: 'Progate BAR「アプリのアイデアを語ろう」LT会 — 参加',
        description: '学生エンジニア限定のLT会＆交流会。アイデアの出し方と、それをプロダクトに落とすまでの距離感について話し合った。',
        type: 'event',
        link: 'https://progate.connpass.com/event/349431/',
      },
      {
        date: '2025.07',
        title: 'Progate BAR「好きな技術やツールの話をしよう」LT会 — 参加',
        description: '各自の推し技術を持ち寄るLT会。自分が触っていない領域の熱量に触れ、技術の選び方そのものを学び直す機会になった。',
        type: 'event',
        link: 'https://progate.connpass.com/event/354940/',
      },
      {
        date: '2025.08',
        title: 'Progate BAR「生成AI時代、どう使いこなす？！」— 参加',
        description: '生成AIの使いこなしをテーマにした知見シェア会。ツールとしてのAIと、開発体験を壊さない使い方について議論した。',
        type: 'event',
        link: 'https://progate.connpass.com/event/357455/',
      },
      {
        date: '2025.11',
        title: '技育展2025 オンライン予選大会 — 参加',
        description: '国内最大規模の学生エンジニアの祭典に参加。研究・開発成果を広く発表し、各界エンジニアとの交流を深めた。',
        type: 'event',
        highlight: true,
      },
      {
        date: '2025.11',
        title: 'Progate BAR「AI×成長！」LT会 — 参加',
        description: '学生エンジニア限定のLT会＆交流会。AIを前提とした学習の進め方と、そこで何が自分の実力として残るのかを話した。',
        type: 'event',
        link: 'https://progate.connpass.com/event/373651/',
      },
      {
        date: '2025.12',
        title: '学内ハッカソン — 最優秀賞',
        description: '「開発環境そのものへのアプローチ」という独自の視点と圧倒的な技術力で他チームを圧倒。一般的なSNS系アプリとは一線を画すプロダクトが評価され、最優秀賞を受賞。',
        type: 'award',
        highlight: true,
      },
      {
        date: '2026.02',
        title: 'R&Dインターン開始（週3日）',
        description: 'ATS（採用管理システム）のR&D部門にジョイン。ビジネス価値を損なわず技術レベルを高める実装に挑戦中。',
        type: 'career',
        highlight: true,
      },
      {
        date: '2026.03',
        title: 'DEIM — 参加',
        description: '日本データベース学会のフォーラム（DEIM）に参加。研究成果を学術的な文脈で発表・議論。',
        type: 'conference',
        highlight: true,
      },
      {
        date: '2026.06',
        title: 'DeNA × AI Talks #8 — 参加',
        description: '事業に活かす画像認識AIの開発舞台裏をテーマにした勉強会。研究の精度と、事業として成立させる要件のずれ方を学んだ。',
        type: 'event',
        link: 'https://dena.connpass.com/event/393626/',
      },
      {
        date: '2026.07',
        title: '学内ハッカソン — 優秀賞',
        description: '学部の年次発表会を運営ごと作り直したポータルシステム「MIRAIS」を3名チームで開発し、優秀賞を受賞。代表として全体設計とバックエンドを担当した。',
        type: 'award',
        highlight: true,
      },
      {
        date: '2026.07',
        title: '学内LT会 — 登壇',
        description: '後輩に向けて、ハッカソンで実際に何が起きるのかと、アイディアをどう考えて形にしていくのかを話した。',
        type: 'talk',
        highlight: true,
      },
      {
        date: '2026.08',
        title: 'プロダクトマネジメントわいわい会 — 参加',
        description: '虎ノ門開催のPdM向けコミュニティイベント。エンジニアの外側から、何を作るかを決める仕事の考え方を聞きに行った。',
        type: 'event',
        link: 'https://pdm.connpass.com/event/398917/',
      },
      {
        date: '2026.08',
        title: 'MEET STAGE in Tokyo vol.1 — LT登壇',
        description: '記念すべき第1回のLT交流会で登壇。Claude Maxで自律AI組織を作った顛末と、そこから辿り着いた「ループエンジニアリング」を発表した。',
        type: 'talk',
        highlight: true,
        link: 'https://localstage.connpass.com/event/399338/',
      },
    ],
    projects: [
      {
        title: 'MIRAIS — 未来創造発表会 統合ポータル',
        description:
          '学部の年次成果発表会を、準備から表彰までひとつの導線に統合したポータルシステム。3名チームの代表として全体設計とバックエンドを担当しました。20テーブルのデータモデル、LLMによる企業と研究テーマのセマンティックマッチング、歩き回れる3Dバーチャル展示会場、表彰選定アルゴリズムまでを、外部の商用サービスに依存しない前提で実装しています。',
        tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'React Three Fiber', 'LLM / 埋め込み', 'Docker'],
        image: '/photos/project4-mirais/mirais-portal.jpg',
        featured: true,
        links: [
          { label: '設計ノートを読む', href: '/blog/2026-07-14-mirais', icon: 'fas fa-book-open' },
          { label: '発表スライド', href: '/slides/mirais.pdf', icon: 'fas fa-file-pdf', external: true },
        ],
      },
      {
        title: 'Blender VFX — 実写合成',
        description:
          'Blenderを用いて、VFXの合成技術を自分の手で全て実践してみました。実写映像のカメラトラッキングから、CGオブジェクトの配置、実写に合わせたライティングと影の作り込み、レンダリング、そして最終合成までを一人で通しています。',
        tags: ['Blender', 'VFX / 合成', 'カメラトラッキング', '3DCG', 'レンダリング'],
        image: '/photos/project3-vfx/poster.jpg',
        video: '/photos/project3-vfx/vfx-compositing.mp4',
        links: [],
      },
      {
        title: '野球投球のファウル確率予測',
        description: '打席・選手情報からその投球でファウルになる確率を予測する機械学習アプリ。LightGBMで精度を追求。',
        tags: ['React', 'FastAPI', 'Python', 'LightGBM', 'scikit-learn'],
        image: '/project1.png',
        links: [{ label: 'View Code', href: 'https://github.com/yuritada/GW_2_app_flask', icon: 'fab fa-github', external: true }],
      },
      {
        title: '勝手に方言変換SNS',
        description: '投稿した発言が自動で別方言に翻訳されてしまう面白SNS。技育キャンプハッカソンで開発。',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Render', 'Vercel'],
        image: '/project2.png',
        links: [{ label: 'View Code', href: 'https://github.com/yuritada/dialect-sns', icon: 'fab fa-github', external: true }],
      },
    ],
  },
  en: {
    eyebrow: 'Projects & Achievements',
    heading: 'Works',
    featuredHeading: 'Featured Projects',
    filterHighlights: 'Highlights',
    filterAll: 'All',
    timeline: [
      {
        date: '2024.06',
        title: 'Progate Hackathon powered by AWS — Corporate Award',
        description: 'Built "Reverse Akinator from Images" — guessing keywords from images. The reverse-thinking concept won a corporate prize.',
        type: 'award',
        highlight: true,
        link: 'https://progate.connpass.com/event/317774/',
      },
      {
        date: '2024.07',
        title: 'Progate User LT Meetup — Speaker',
        description: 'Presented development approach and learnings. Gained outside perspective on my progress and expanded my engineer network.',
        type: 'talk',
        highlight: true,
        link: 'https://progate.connpass.com/event/323408/',
      },
      {
        date: '2024.12',
        title: 'Internal Research Competition — Departmental Award',
        description: 'Proposed a travel-specialized integrated backend architecture. The logical rigor and implementation feasibility earned the departmental award.',
        type: 'award',
        highlight: true,
      },
      {
        date: '2025.03',
        title: 'Giken-sai 2025 Spring — Attended',
        description: 'A large conference for student engineers. Took away how frontline engineers reason about tech choices and careers.',
        type: 'event',
      },
      {
        date: '2025.04',
        title: 'Supporterz Meetup @ Tokyo — Attended',
        description: 'My first event among engineers. The connections made here led to actively joining lightning talk sessions later on.',
        type: 'event',
      },
      {
        date: '2025.05',
        title: 'Engineer Summer Internship EXPO (May 16) — Attended',
        description: 'A joint briefing for 2028 graduates. Compared stacks and engineering cultures side by side to decide what to apply for.',
        type: 'event',
      },
      {
        date: '2025.05',
        title: 'Progate BAR "How Do You Start Real-World Experience?" — Attended',
        description: 'A students-only knowledge-sharing session on how to break into real project work, with peers a few steps ahead.',
        type: 'event',
        link: 'https://progate.connpass.com/event/351626/',
      },
      {
        date: '2025.06',
        title: 'Sony × CyberAgent × NTT Data Joint Seminar — Attended',
        description: 'A summer internship seminar for aspiring engineers. Heard first-hand how three companies differ in engineering culture and expectations.',
        type: 'event',
      },
      {
        date: '2025.06',
        title: 'Engineer Summer Internship EXPO (Jun 7) — Attended',
        description: 'The second joint briefing. Came in with concrete questions to narrow down where to apply.',
        type: 'event',
      },
      {
        date: '2025.06',
        title: 'Giken Camp 2025 Hackathon Vol.4 — Participated',
        description: 'Built "Unwanted Dialect Converter SNS" — posts auto-translate into another dialect. Blended humor with LLM application.',
        type: 'event',
      },
      {
        date: '2025.06',
        title: 'Progate BAR "Let\'s Talk App Ideas" LT Meetup — Attended',
        description: 'A students-only LT night on where ideas come from, and how far it really is from an idea to a shipped product.',
        type: 'event',
        link: 'https://progate.connpass.com/event/349431/',
      },
      {
        date: '2025.07',
        title: 'Progate BAR "Talk About the Tech You Love" LT Meetup — Attended',
        description: 'An LT night where everyone brought their favorite tool. Being exposed to unfamiliar domains reshaped how I pick technology.',
        type: 'event',
        link: 'https://progate.connpass.com/event/354940/',
      },
      {
        date: '2025.08',
        title: 'Progate BAR "How Do We Use Generative AI?" — Attended',
        description: 'A knowledge-sharing session on generative AI: where it works as a tool, and how to use it without wrecking the development experience.',
        type: 'event',
        link: 'https://progate.connpass.com/event/357455/',
      },
      {
        date: '2025.11',
        title: 'Giken-ten 2025 Online Qualifier — Participated',
        description: "Participated in one of Japan's largest student engineer exhibitions. Presented research and networked with engineers across fields.",
        type: 'event',
        highlight: true,
      },
      {
        date: '2025.11',
        title: 'Progate BAR "AI × Growth" LT Meetup — Attended',
        description: 'An LT night on learning in an AI-first world — and on what actually remains as your own ability afterwards.',
        type: 'event',
        link: 'https://progate.connpass.com/event/373651/',
      },
      {
        date: '2025.12',
        title: 'Internal Hackathon — Grand Prize',
        description: '"An approach to the development environment itself" — a unique perspective backed by technical excellence, standing apart from the typical SNS-type entries. Took the grand prize.',
        type: 'award',
        highlight: true,
      },
      {
        date: '2026.02',
        title: 'R&D Internship Start (3 days/week)',
        description: 'Joined an ATS (Applicant Tracking System) R&D team. Pursuing implementation that elevates technical quality without sacrificing business value.',
        type: 'career',
        highlight: true,
      },
      {
        date: '2026.03',
        title: 'DEIM — Participated',
        description: 'Presented research at the Forum on Data Engineering and Information Management. Discussed findings in an academic context.',
        type: 'conference',
        highlight: true,
      },
      {
        date: '2026.06',
        title: 'DeNA × AI Talks #8 — Attended',
        description: 'A session on shipping image-recognition AI as a business. Learned where research accuracy and product requirements come apart.',
        type: 'event',
        link: 'https://dena.connpass.com/event/393626/',
      },
      {
        date: '2026.07',
        title: 'Internal Hackathon — Excellence Award',
        description: 'Built MIRAIS — a portal that rebuilds the running of our faculty\'s annual showcase — with a team of three, and won the excellence award. I led the team and owned the overall design and backend.',
        type: 'award',
        highlight: true,
      },
      {
        date: '2026.07',
        title: 'Internal LT Meetup — Speaker',
        description: 'Talked to the students a year below me about what a hackathon actually feels like from the inside, and how I go from an idea to something that ships.',
        type: 'talk',
        highlight: true,
      },
      {
        date: '2026.08',
        title: 'Product Management Meetup — Attended',
        description: 'A PdM community event in Toranomon. Went to hear how the decision of *what* to build is made, from outside the engineering seat.',
        type: 'event',
        link: 'https://pdm.connpass.com/event/398917/',
      },
      {
        date: '2026.08',
        title: 'MEET STAGE in Tokyo vol.1 — Speaker',
        description: 'Spoke at the very first edition of this LT meetup: what happened when I built an autonomous AI organization on Claude Max, and the "loop engineering" idea I landed on.',
        type: 'talk',
        highlight: true,
        link: 'https://localstage.connpass.com/event/399338/',
      },
    ],
    projects: [
      {
        title: 'MIRAIS — Integrated Portal for the Annual Showcase',
        description:
          'A portal that merges our faculty\'s annual research showcase — preparation, exhibition, voting, and awards — into a single flow. As team lead of three, I owned the overall design and the backend: a 20-table data model, LLM semantic matching between companies and research themes, a walkable 3D virtual venue, and the award selection algorithm, all built without depending on commercial external services.',
        tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'React Three Fiber', 'LLM / Embeddings', 'Docker'],
        image: '/photos/project4-mirais/mirais-portal.jpg',
        featured: true,
        links: [
          { label: 'Read the Design Notes', href: '/blog/2026-07-14-mirais', icon: 'fas fa-book-open' },
          { label: 'Slides', href: '/slides/mirais.pdf', icon: 'fas fa-file-pdf', external: true },
        ],
      },
      {
        title: 'Blender VFX — Live-Action Compositing',
        description:
          'I worked through every stage of VFX compositing by hand in Blender: camera tracking the live-action plate, placing CG objects into it, matching lighting and shadows to the footage, rendering, and the final composite.',
        tags: ['Blender', 'VFX / Compositing', 'Camera Tracking', '3DCG', 'Rendering'],
        image: '/photos/project3-vfx/poster.jpg',
        video: '/photos/project3-vfx/vfx-compositing.mp4',
        links: [],
      },
      {
        title: 'Baseball Pitch Foul Probability Prediction',
        description: 'A ML app predicting foul probability from at-bat and player data. Built with LightGBM for precision.',
        tags: ['React', 'FastAPI', 'Python', 'LightGBM', 'scikit-learn'],
        image: '/project1.png',
        links: [{ label: 'View Code', href: 'https://github.com/yuritada/GW_2_app_flask', icon: 'fab fa-github', external: true }],
      },
      {
        title: 'Auto Dialect Converter SNS',
        description: 'A fun SNS where every post gets auto-translated into another Japanese dialect. Built at Giken Camp Hackathon.',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Render', 'Vercel'],
        image: '/project2.png',
        links: [{ label: 'View Code', href: 'https://github.com/yuritada/dialect-sns', icon: 'fab fa-github', external: true }],
      },
    ],
  },
}

const typeConfig = {
  award:      { color: 'text-accent',    bg: 'bg-accent/15',    border: 'border-accent/40',    label: { jp: '受賞',   en: 'Award' } },
  talk:       { color: 'text-pink-400',  bg: 'bg-pink-400/10',  border: 'border-pink-400/40',  label: { jp: '登壇',   en: 'Talk' } },
  event:      { color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/30',   label: { jp: 'イベント', en: 'Event' } },
  career:     { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', label: { jp: 'キャリア', en: 'Career' } },
  conference: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', label: { jp: '学会', en: 'Conf.' } },
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    )
  }
  return (
    <Image
      src={project.image}
      alt={project.title}
      width={1200}
      height={600}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  )
}

function ProjectCard({ project, mediaHeight }: { project: Project; mediaHeight: string }) {
  return (
    <motion.div
      className="glassmorphism rounded-2xl overflow-hidden group h-full flex flex-col"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className={`${mediaHeight} overflow-hidden relative`}>
        <ProjectMedia project={project} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent pointer-events-none"></div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h4 className="mb-3 text-lg md:text-xl font-bold text-foreground">{project.title}</h4>
        <p className="text-muted mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
              {tag}
            </span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-primary font-semibold text-sm hover:text-primary-light transition-colors flex items-center gap-2"
              >
                <i className={link.icon}></i> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function WorksSection() {
  const { lang } = useLanguage()
  const c = t[lang]
  const [showAll, setShowAll] = useState(false)

  const highlights = c.timeline.filter((item) => item.highlight)
  const visibleTimeline = showAll ? c.timeline : highlights

  const featured = c.projects.filter((p) => p.featured)
  const rest = c.projects.filter((p) => !p.featured)

  return (
    <Section id="works" viewportAmount="some">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            {c.heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        {/* Highlights / All switch */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="inline-flex p-1 rounded-full border border-border bg-surface/60 backdrop-blur-sm">
            {([
              { key: false, label: c.filterHighlights, count: highlights.length },
              { key: true,  label: c.filterAll,        count: c.timeline.length },
            ] as const).map((tab) => (
              <button
                key={String(tab.key)}
                type="button"
                onClick={() => setShowAll(tab.key)}
                aria-pressed={showAll === tab.key}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
                  showAll === tab.key
                    ? 'bg-primary text-background shadow-lg shadow-primary/25'
                    : 'text-muted hover:text-primary'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-70 font-mono">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"></div>
          {visibleTimeline.map((item, i) => {
            const cfg = typeConfig[item.type]
            return (
              <motion.div
                key={`${item.date}-${item.title}`}
                className="relative pl-12 md:pl-16 pb-8 md:pb-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: Math.min(i, 8) * 0.05, duration: 0.4 }}
              >
                <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 ${cfg.border} ${cfg.bg} -translate-x-1/2`}></div>
                <div className="glassmorphism rounded-xl p-4 md:p-5 hover:border-primary/25 transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-muted font-mono">{item.date}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label[lang]}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-1">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-baseline gap-1.5"
                      >
                        {item.title}
                        <i className="fas fa-external-link-alt text-[0.65em] opacity-60"></i>
                      </a>
                    ) : (
                      item.title
                    )}
                  </h4>
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

        {featured.map((project) => (
          <div key={project.title} className="mb-8 md:mb-10">
            <ProjectCard project={project} mediaHeight="h-52 sm:h-72 md:h-96" />
          </div>
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} mediaHeight="h-44 sm:h-52" />
          ))}
        </div>
      </div>
    </Section>
  )
}
