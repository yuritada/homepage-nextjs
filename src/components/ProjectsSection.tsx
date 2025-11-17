'use client'

import Image from 'next/image'
import Section from '@/components/Section'
import { motion } from 'framer-motion'

const projects = [
  {
    title: '野球投球のファウル確率予測',
    description: '打席情報や選手情報から、その投球でファウルになる確率を予測する機械学習アプリケーションです。',
    tags: ['React', 'FastAPI', 'Python', 'LightGBM', 'scikit-learn'],
    image: '/project1.png',
    codeLink: 'https://github.com/yuritada/GW_2_app_flask',
    demoLink: '#'
  },
  {
    title: '勝手に方言変換SNS',
    description: '投稿した発言が、すべて別の方言に自動で翻訳されてしまう、面白SNSです。ハッカソンで開発しました。',
    tags: ['Next.JS', 'FastAPI', 'PostgreSQL', 'Render', 'Vercel'],
    image: '/project2.png',
    codeLink: 'https://github.com/yuritada/dialect-sns',
    demoLink: '#'
  }
]

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-20 text-4xl font-bold relative">
          Projects
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glassmorphism rounded-xl overflow-hidden group"
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="h-56 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={`${project.title} image`}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-muted mb-5 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold transition-colors hover:text-primary-light flex items-center gap-2"
                  >
                    <i className="fab fa-github"></i> Code
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold transition-colors hover:text-primary-light flex items-center gap-2"
                  >
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
