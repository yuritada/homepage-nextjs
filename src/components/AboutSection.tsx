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
              データサイエンスを学ぶ大学生です。私の技術への情熱は、幼少期からの「物作りと工夫」への探求心に根差しています。
            </p>
            <p className="text-muted text-lg leading-relaxed">
              中学生時代には学校のPCでプログラミングの面白さに触れ、大学で初めて自分のPCを手にしたことで、それまで抑えられていた知識欲が爆発しました。
            </p>
            <p className="text-muted text-lg leading-relaxed">
              現在は、フロントエンドからバックエンド、データ分析、クラウドインフラまで、分野を問わず幅広く学習を続けています。「技術を通じて人々の生活をより良くする」というビジョンのもと、常に新しい知識と技術を追求しています。
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
