'use client'

import { useState } from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { icon: 'fab fa-react', name: 'React' },
      { icon: 'fab fa-js', name: 'Next.js' }, // 変更
      { icon: 'fab fa-html5', name: 'HTML5' },
      { icon: 'fab fa-css3-alt', name: 'CSS3' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { icon: 'fab fa-python', name: 'Python' },
      { icon: 'fab fa-node-js', name: 'Node.js' },
      { icon: 'fas fa-server', name: 'FastAPI' }, // 追加
      { icon: 'fas fa-database', name: 'SQL (Postgres)' }, // 変更
    ]
  },
  {
    title: 'Data Science / ML', // 変更
    skills: [
      { icon: 'fas fa-brain', name: 'Machine Learning' },
      { icon: 'fas fa-chart-bar', name: 'LightGBM' }, // 変更
      { icon: 'fas fa-cogs', name: 'scikit-learn' }, // 変更
      { icon: 'fas fa-table', name: 'Pandas' },
    ]
  },
  {
    title: 'Cloud & Deployment', // 新規
    skills: [
      { icon: 'fab fa-aws', name: 'AWS' },
      { icon: 'fas fa-cloud', name: 'Amplify' }, // AWS Amplify
      { icon: 'fas fa-lambda', name: 'Lambda' }, // AWS Lambda
      { icon: 'fas fa-server', name: 'Docker' }, // Docker
    ]
  },
  {
    title: 'Tools',
    skills: [
      { icon: 'fab fa-git-alt', name: 'Git' },
      { icon: 'fab fa-github', name: 'GitHub' },
      { icon: 'fas fa-cube', name: 'Blender' }, // 追加
      { icon: 'fas fa-gamepad', name: 'Unreal Engine' }, // 追加
    ]
  },
  {
    title: 'Learning', // 新規
    skills: [
      { icon: 'fab fa-java', name: 'JAVA' },
      { icon: 'fas fa-code', name: 'C++ / C#' }, // 変更
      { icon: 'fab fa-linux', name: 'Linux (Ubuntu)' }, // 追加
      { icon: 'fab fa-google', name: 'Go' }, // 追加
    ]
  }
]

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl relative">
          Skills
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg"
            >
              <h3 className="mb-5 text-xl text-[#6c63ff] text-center font-semibold">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className={`flex flex-col items-center text-center transition-transform ${
                      hoveredSkill === `${index}-${skillIndex}` ? '-translate-y-2' : ''
                    }`}
                    onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <i className={`${skill.icon} text-4xl mb-2 text-[#6c63ff]`}></i>
                    <span className="text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}