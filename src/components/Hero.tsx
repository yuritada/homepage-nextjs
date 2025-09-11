'use client'

import Image from 'next/image'

export default function Hero() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      // リンク動作の変更、デフォルトのジャンプ動作をキャンセル(prevent)して、スムーズスクロールを実行
      e.preventDefault()
      // ターゲット要素の位置を取得して、ナビゲーションバーの高さ分を調整
      const targetElement = document.querySelector(href)
      if (targetElement) {
        // ナビゲーションバーの高さ
        const navHeight = 80
        // ターゲット要素の位置を計算
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight
        // スムーズスクロールを実行
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <div className="hero h-screen flex flex-col justify-center items-center text-center text-white px-5 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <Image
        src="/hero-bg.png"
        alt="Hero background"
        fill
        style={{ objectFit: 'cover' }}
        className="-z-10"
        priority
      />
      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl mb-5 tracking-wide">多田 有里</h1>
        <h2 className="text-3xl md:text-4xl mb-8 font-light">
          Data Science × Engineering
        </h2>
        <p className="text-xl max-w-2xl mb-10">
          データの力とエンジニアリングで未来を創る
        </p>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="inline-block bg-[#6c63ff] text-white py-3 px-8 rounded-full no-underline font-medium transition-all hover:bg-[#5a52e0] hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Contact Me
        </a>
      </div>
    </div>
  )
}