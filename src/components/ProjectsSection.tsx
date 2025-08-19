import Image from 'next/image'

const projects = [
  {
    title: 'データ可視化ダッシュボード',
    description: 'COVID-19のデータを分析し、インタラクティブなダッシュボードを作成したプロジェクト',
    tags: ['Python', 'Pandas', 'Plotly', 'Dash'],
    image: '/project1.svg',
    codeLink: '#',
    demoLink: '#'
  },
  {
    title: '学習管理アプリ',
    description: '大学生向けの学習管理アプリケーション。タスク管理と学習進捗の可視化が可能',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/project2.svg',
    codeLink: '#',
    demoLink: '#'
  }
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <h2 className="text-center mb-16 text-4xl relative">
          Projects
          <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#6c63ff]"></span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt="プロジェクト画像"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-gray-100 px-3 py-1 rounded-full text-xs mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#6c63ff] no-underline text-sm transition-colors hover:text-[#5a52e0]"
                  >
                    <i className="fab fa-github mr-1"></i> Code
                  </a>
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#6c63ff] no-underline text-sm transition-colors hover:text-[#5a52e0]"
                  >
                    <i className="fas fa-external-link-alt mr-1"></i> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}