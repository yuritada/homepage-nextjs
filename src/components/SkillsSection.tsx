'use client'

import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type SkillCategory = { title: string; color: string; skills: { icon: string; name: string }[] }

const skillCategoriesBase: SkillCategory[] = [
  {
    title: 'Frontend',
    color: 'primary',
    skills: [
      { icon: 'fab fa-react',      name: 'React' },
      { icon: 'fab fa-n',          name: 'Next.js' },
      { icon: 'fab fa-vuejs',      name: 'Vue.js' },
      { icon: 'fab fa-t',          name: 'TypeScript' },
      { icon: 'fab fa-html5',      name: 'HTML5' },
      { icon: 'fab fa-css3-alt',   name: 'CSS3' },
      { icon: 'fab fa-js-square',  name: 'JavaScript' },
    ],
  },
  {
    title: 'Backend',
    color: 'primary',
    skills: [
      { icon: 'fab fa-python',   name: 'Python' },
      { icon: 'fab fa-node-js',  name: 'Node.js' },
      { icon: 'fas fa-rocket',   name: 'FastAPI' },
      { icon: 'fas fa-database', name: 'SQL / Postgres' },
      { icon: 'fab fa-php',      name: 'PHP' },
    ],
  },
  {
    title: 'AI / Data Science',
    color: 'accent',
    skills: [
      { icon: 'fas fa-brain',           name: 'Machine Learning' },
      { icon: 'fas fa-project-diagram', name: 'LLM / RAG' },
      { icon: 'fas fa-plug',            name: 'MCP' },
      { icon: 'fas fa-chart-bar',       name: 'LightGBM' },
      { icon: 'fas fa-cogs',            name: 'scikit-learn' },
      { icon: 'fas fa-table',           name: 'Pandas' },
      { icon: 'fas fa-flask',           name: 'MLflow' },
      { icon: 'fas fa-sliders-h',       name: 'Optuna' },
    ],
  },
  {
    title: 'Cloud & Infra',
    color: 'primary',
    skills: [
      { icon: 'fab fa-aws',       name: 'AWS' },
      { icon: 'fas fa-cloud',     name: 'Amplify' },
      { icon: 'fas fa-microchip', name: 'Lambda' },
      { icon: 'fab fa-docker',    name: 'Docker' },
      { icon: 'fas fa-cubes',     name: 'Compose' },
      { icon: 'fas fa-v',         name: 'Vercel' },
      { icon: 'fas fa-r',         name: 'Render' },
    ],
  },
  {
    title: 'Hardware & Tools',
    color: 'accent',
    skills: [
      { icon: 'fab fa-linux',     name: 'Linux / ROCm' },
      { icon: 'fas fa-microchip', name: 'RTX 4090' },
      { icon: 'fas fa-cube',      name: 'Blender' },
      { icon: 'fas fa-gamepad',   name: 'Unreal Engine' },
      { icon: 'fab fa-git-alt',   name: 'Git' },
      { icon: 'fab fa-github',    name: 'GitHub' },
    ],
  },
  {
    title: 'Learning',
    color: 'primary',
    skills: [
      { icon: 'fab fa-java',   name: 'Java' },
      { icon: 'fas fa-code',   name: 'C++ / C#' },
      { icon: 'fab fa-golang', name: 'Go' },
    ],
  },
]

const headings = {
  jp: { eyebrow: 'Arsenal', heading: 'Skills' },
  en: { eyebrow: 'Arsenal', heading: 'Skills' },
}

const skillVariant = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function SkillsSection() {
  const { lang } = useLanguage()
  const { eyebrow, heading } = headings[lang]

  return (
    <Section id="skills">
      <div className="w-full max-w-6xl mx-auto px-5 md:w-4/5">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            {heading}
            <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>

        <div className="space-y-10 md:space-y-14">
          {skillCategoriesBase.map((category, index) => (
            <div key={index}>
              <h3 className={`text-xl font-bold mb-6 text-center md:text-left tracking-wider ${category.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-5 md:gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="flex flex-col items-center text-center w-[4.5rem] md:w-20"
                    variants={skillVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: skillIndex * 0.07, duration: 0.4 }}
                    whileHover={{ scale: 1.15, y: -6, color: category.color === 'accent' ? '#ffd700' : '#00d8ff' }}
                  >
                    <i className={`${skill.icon} text-3xl md:text-4xl mb-2`}></i>
                    <span className="text-xs text-muted">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
