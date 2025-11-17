'use client'

import Section from '@/components/Section'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { icon: 'fab fa-react', name: 'React' },
      { icon: 'fab fa-n', name: 'Next.js' },
      { icon: 'fab fa-vuejs', name: 'Vue.js' },
      { icon: 'fab fa-t', name: 'TypeScript' },
      { icon: 'fab fa-html5', name: 'HTML5' },
      { icon: 'fab fa-css3-alt', name: 'CSS3' },
      { icon: 'fab fa-js-square', name: 'JavaScript' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { icon: 'fab fa-python', name: 'Python' },
      { icon: 'fab fa-node-js', name: 'Node.js' },
      { icon: 'fas fa-rocket', name: 'FastAPI' },
      { icon: 'fas fa-database', name: 'SQL (Postgres)' },
    ]
  },
  {
    title: 'Data Science / ML',
    skills: [
      { icon: 'fas fa-brain', name: 'Machine Learning' },
      { icon: 'fas fa-chart-bar', name: 'LightGBM' },
      { icon: 'fas fa-cogs', name: 'scikit-learn' },
      { icon: 'fas fa-table', name: 'Pandas' },
    ]
  },
  {
    title: 'Cloud & Deployment',
    skills: [
      { icon: 'fab fa-aws', name: 'AWS' },
      { icon: 'fas fa-cloud', name: 'Amplify' },
      { icon: 'fas fa-microchip', name: 'Lambda' },
      { icon: 'fas fa-file-code', name: 'Makefile' }, 
      { icon: 'fab fa-docker', name: 'Docker' },
      { icon: 'fas fa-cubes', name: 'Compose' },
      { icon: 'fas fa-r', name: 'Render' },
      { icon: 'fas fa-v', name: 'Vercel' },
    ]
  },
  {
    title: 'Tools',
    skills: [
      { icon: 'fab fa-git-alt', name: 'Git' },
      { icon: 'fab fa-github', name: 'GitHub' },
      { icon: 'fas fa-cube', name: 'Blender' },
      { icon: 'fas fa-gamepad', name: 'Unreal Engine' },
    ]
  },
  {
    title: 'Learning',
    skills: [
      { icon: 'fab fa-java', name: 'JAVA' },
      { icon: 'fas fa-code', name: 'C++ / C#' },
      { icon: 'fab fa-ubuntu', name: 'Linux (Ubuntu)' },
      { icon: 'fab fa-golang', name: 'Go' },
    ]
  }
]

const skillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function SkillsSection() {
  return (
    <Section id="skills">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-20 text-4xl font-bold relative">
          Skills
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[70px] h-1 bg-primary"></span>
        </h2>
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold text-primary mb-6 text-center md:text-left">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="flex flex-col items-center text-center w-24"
                    variants={skillVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: skillIndex * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -5, color: '#8c84ff' }}
                  >
                    <i className={`${skill.icon} text-5xl mb-3`}></i>
                    <span className="text-sm text-muted">{skill.name}</span>
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
