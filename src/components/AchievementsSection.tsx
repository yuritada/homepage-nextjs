// src/components/AchievementsSection.tsx (新規作成)

const achievements = [
  {
    icon: 'fas fa-trophy',
    title: '学内研究コンペ 学科賞受賞',
    description: '（ここにコンペの簡単な説明や受賞内容を記載）',
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
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 bg-gray-50">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl relative">
          Achievements
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg flex items-start"
            >
              <i className={`${item.icon} text-3xl text-[#6c63ff] w-12 text-center`}></i>
              <div className="ml-4">
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
