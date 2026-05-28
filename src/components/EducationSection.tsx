import Section from '@/components/Section'

const educationItems = [
  {
    title: '武蔵野大学 データサイエンス学部',
    date: '2024 - 2028 (予定)',
    description: 'データ分析とAIの理論・実践を幅広く学習。統計学・機械学習・データビジュアライゼーションを中心に、ハッカソンやKaggleコンペへの参加を通じて実践的なスキルを磨いています。'
  },
  {
    title: 'R&Dインターン（採用管理システム開発）',
    date: '2025 - 現在（週3日）',
    description: 'ATS（採用管理システム）のR&D部門にて、ビジネス価値を損なわず技術レベルを引き上げることを追求。ユーザーの課題を想像しながら、実装の複雑さを抑えつつ高度な処理を実現するバランスに挑んでいます。'
  },
  {
    title: '研究テーマ①',
    date: '2024',
    description: '「旅に特化した統合バックエンドの提案」として、新規SNSのあり方・構造・デプロイ手法を研究。学内研究コンペで学科賞を受賞しました。'
  },
  {
    title: '研究テーマ②',
    date: '2025 - 現在',
    description: 'MCP（Model Context Protocol）を用いた3D空間の自然言語制御を研究。「幾何学的ハルシネーションの解決」を通じてLLMと3D空間を繋ぎ、専門知識がなくても誰もがクリエイティブに3D空間へアクセスできる「創造の民主化」を目指しています。'
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
