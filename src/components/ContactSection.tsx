'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('メッセージを受け付けました。ありがとうございます！')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-15 text-4xl relative">
          Contact Me
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-[#6c63ff]"></span>
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
          
          <form className="lg:col-span-2" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-1 font-medium">名前</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded font-inherit text-base transition-all focus:outline-none focus:border-[#6c63ff] focus:shadow-[0_0_0_2px_rgba(108,99,255,0.1)]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-1 font-medium">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded font-inherit text-base transition-all focus:outline-none focus:border-[#6c63ff] focus:shadow-[0_0_0_2px_rgba(108,99,255,0.1)]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-1 font-medium">メッセージ</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded font-inherit text-base transition-all focus:outline-none focus:border-[#6c63ff] focus:shadow-[0_0_0_2px_rgba(108,99,255,0.1)] resize-vertical"
              />
            </div>
            <button
              type="submit"
              className="bg-[#6c63ff] text-white py-3 px-6 border-none rounded cursor-pointer text-base font-medium transition-colors hover:bg-[#5a52e0]"
            >
              送信する
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}