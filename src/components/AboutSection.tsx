import Image from 'next/image'
import Section from '@/components/Section'

export default function AboutSection() {
  return (
    <Section id="about">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl font-bold relative">
          About Me
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="relative w-full aspect-square rounded-full shadow-2xl shadow-primary/20 overflow-hidden group">
            <Image
              src="/profile.jpg"
              alt="Yuri Tada Profile Picture"
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted text-lg leading-relaxed">
              武蔵野大学データサイエンス学部で学ぶ大学生です。幼少期から「なぜ？どうして？」と物事の本質を追い求める探究心が強く、自然や社会の構造を観察・分析する癖が、論理的思考力と技術への情熱の原点となっています。
            </p>
            <p className="text-muted text-lg leading-relaxed">
              大学入学と同時に初めて自分のPCを手にしたことで知識欲が爆発。ハッカソン優勝やR&Dインターン、技育展への参加など学外でも積極的に活動を続けています。開発環境にもこだわりを持ち、RTX 4090とROCm環境を使い分けるデュアルブート環境を自ら構築しました。
            </p>
            <p className="text-muted text-lg leading-relaxed">
              現在はMCP（Model Context Protocol）を用いた3D空間の自然言語制御を研究テーマとし、「幾何学的ハルシネーションの解決」を通じて、誰もがLLMに語りかけるだけで3D空間を創造できる世界—創造の民主化—を目指しています。論理的構造化力を武器に、全領域で話が通じる「オールラウンダーなエンジニア」を理想としています。
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
