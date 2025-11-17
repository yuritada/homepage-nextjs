import Section from '@/components/Section'

const educationItems = [
  {
    title: '武蔵野大学 データサイエンス学部',
    date: '2024 - 2028 (予定)',
    description: 'データ分析とAIの理論と実践について学んでいます。統計学、機械学習、データビジュアライゼーションを中心に研究しています。'
  },
  {
    title: 'エンジニアリング自己学習',
    date: '2024 - 現在',
    description: '生成AIを活用して、フルスタックエンジニアリングのスキルを習得しています。'
  },
  {
    title: '研究テーマ',
    date: '2024',
    description: '新規SNSのあり方と、その構造とデプロイ方法について研究しました。'
  },
  {
    title: '研究テーマ',
    date: '2025 - 現在',
    description: '3D空間のMCP自然言語制御における、生成物の評価方法とその学習方法について研究しています。'
  }
]

export default function EducationSection() {
  return (
    <Section id="education">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-20 text-4xl font-bold relative">
          Education
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute w-0.5 bg-border top-0 bottom-0 left-1/2 -translate-x-1/2"></div>
          {educationItems.map((item, index) => (
            <div key={index} className={`flex items-center w-full mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-1/2">
                <div className={`p-6 rounded-xl glassmorphism ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                  <h3 className="mb-2 text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="text-muted text-sm mb-3">{item.date}</p>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full z-10 border-4 border-surface"></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
