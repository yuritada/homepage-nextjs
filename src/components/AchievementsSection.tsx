'use client'

import Section from '@/components/Section'
import { motion } from 'framer-motion'

const achievements = [
  {
    icon: 'fas fa-trophy',
    title: '学内研究コンペ 学科賞受賞',
    description: '「旅に特化した統合バックエンドの提案」をテーマに、新規SNSのあり方と構造・デプロイ手法を研究。その成果が評価され、学科賞を受賞しました。',
  },
  {
    icon: 'fas fa-users',
    title: 'ハッカソン 企業賞受賞',
    description: '「画像からキーワードをあてる逆アキネーター」を開発し、企業賞を受賞しました。（他、出場経験2回）',
  },
  {
    icon: 'fab fa-kaggle',
    title: 'Kaggle 出場',
    description: 'LightGBMモデルのアルゴリズム理解と機械学習全体のスキル向上に繋がりました。(順位: 1000位/2000)',
  },
  {
    icon: 'fas fa-certificate',
    title: '基本情報技術者 (勉強中)',
    description: '基礎知識の体系的な習得のため、資格取得に向けて学習中です。(達成率80%)',
  },
  {
    icon: 'fas fa-comments',
    title: 'エンジニア交流イベント',
    description: 'progateBarなどの交流イベントに毎月参加し、最新の知見やネットワーキングを広げています。',
  },
  {
    icon: 'fas fa-crown',
    title: '学内ハッカソン 優勝',
    description: '「開発環境そのものへのアプローチ」という独自の視点と圧倒的な技術力で他チームと差別化。一般的なSNS系アプリとは一線を画し、エンジニアの課題に正面から向き合ったプロダクトが評価され優勝しました。',
  }
]

export default function AchievementsSection() {
  return (
    <Section id="achievements">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <h2 className="text-center mb-14 md:mb-20 text-3xl md:text-4xl font-bold relative">
          Achievements
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="glassmorphism p-8 rounded-xl flex flex-col items-center text-center relative overflow-hidden"
              whileHover={{ y: -8, boxShadow: '0 0 20px rgba(108, 99, 255, 0.5)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <i className={`${item.icon} text-4xl md:text-5xl text-primary mb-4 md:mb-5`}></i>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}