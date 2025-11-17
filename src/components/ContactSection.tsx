export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl relative">
          Contact Me
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <i className="fas fa-envelope text-2xl mr-4 text-[#6c63ff]"></i>
              <p>yuri.tada28@gmail.com</p>
            </div>
            <div className="flex items-center">
              <i className="fab fa-github text-2xl mr-4 text-[#6c63ff]"></i>
              <p>
                <a 
                  href="https://github.com/yuritada" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline transition-colors hover:text-[#6c63ff]"
                >
                  yuritada
                </a>
              </p>
            </div>
            <div className="flex items-center">
              <i className="fab fa-twitter text-2xl mr-4 text-[#6c63ff]"></i>
              <p>
                <a 
                  href="https://x.com/jkotqmrr5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline transition-colors hover:text-[#6c63ff]"
                >
                  @jkotqmrr5.co.jp
                </a>
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <p className="mb-4 text-gray-600">
              お問い合わせは、こちらのフォームからお願いいたします。
            </p>
            <a
              href="https://forms.gle/avJvHqEizJGWRnjF9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#6c63ff] text-white py-3 px-6 border-none rounded cursor-pointer text-base font-medium transition-colors hover:bg-[#5a52e0]"
            >
              お問い合わせフォームへ
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}