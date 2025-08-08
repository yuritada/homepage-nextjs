const educationItems = [
  {
    title: '武蔵野大学 データサイエンス学部',
    date: '2024 - 現在',
    description: 'データ分析とAIの理論と実践について学んでいます。統計学、機械学習、データビジュアライゼーションを中心に研究しています。'
  },
  {
    title: 'エンジニアリング自己学習',
    date: '2024 - 現在',
    description: '生成AIを活用して、フルスタックエンジニアリングのスキルを習得しています。'
  }
]

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-15 text-4xl relative">
          Education
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute w-0.5 bg-gray-300 top-0 bottom-0 left-8"></div>
          {educationItems.map((item, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute w-4 h-4 left-6 bg-[#6c63ff] rounded-full z-10"></div>
              <div className="ml-16 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="mb-1 text-xl font-semibold">{item.title}</h3>
                <p className="text-[#6c63ff] text-sm mb-2">{item.date}</p>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}