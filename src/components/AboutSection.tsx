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
          <div className="relative w-full aspect-square rounded-lg shadow-lg">
            <Image
              src="/profile.jpg"
              alt="多田有里のプロフィール写真"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              データサイエンスを学ぶ大学生です。私の技術への情熱は、幼少期からの「物作りと工夫」への探求心に根差しています。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              中学生時代には学校のPCでプログラミングの面白さに触れ、大学で初めて自分のPCを手にしたことで、それまで抑えられていた知識欲が爆発しました。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              現在は、フロントエンドからバックエンド、データ分析、クラウドインフラまで、分野を問わず幅広く学習を続けています。「技術を通じて人々の生活をより良くする」というビジョンのもと、常に新しい知識と技術を追求しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}