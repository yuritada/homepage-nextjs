import Section from '@/components/Section'

export default function ContactSection() {
  return (
    <Section id="contact">
      <div className="w-4/5 max-w-4xl mx-auto px-5 text-center">
        <h2 className="text-center mb-16 text-4xl font-bold relative">
          Get In Touch
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        
        <div className="glassmorphism p-10 rounded-xl max-w-2xl mx-auto">
          <p className="text-muted text-lg leading-relaxed mb-8">
            プロジェクトのご相談、技術に関するご質問、または単に挨拶だけでも、お気軽にご連絡ください。以下のフォームよりお待ちしております。
          </p>
          <a
            href="https://forms.gle/avJvHqEizJGWRnjF9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white py-4 px-8 rounded-full cursor-pointer text-lg font-semibold transition-transform hover:scale-105 hover:bg-primary-light shadow-lg shadow-primary/30"
          >
            <i className="fas fa-paper-plane mr-2"></i> お問い合わせフォームへ
          </a>
        </div>

        <div className="mt-16">
          <p className="text-muted mb-6">または、以下のSNSでもお気軽にご連絡ください。</p>
          <div className="flex justify-center items-center gap-10">
            <a href="mailto:yuri.tada28@gmail.com" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/yuritada" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://x.com/jkotqmrr5" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary text-4xl">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}