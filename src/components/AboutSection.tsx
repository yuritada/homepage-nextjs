import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl relative">
          About Me
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="about-image">
            <Image
              src="/profile.jpg"
              alt="多田有里のプロフィール写真"
              width={400}
              height={400}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              データサイエンス学部に所属する大学生です。データの分析から活用まで、技術の力で社会課題を解決することに情熱を持っています。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              エンジニアを目指して日々学習に取り組んでおり、フロントエンドからバックエンド、データ分析まで幅広いスキルセットの習得に励んでいます。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              「技術を通じて人々の生活をより良くする」というビジョンのもと、常に新しい知識と技術を追求しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}