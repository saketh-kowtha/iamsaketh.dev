import { useLanguage } from '../hooks/useLanguage'
import ProjectCard from './ProjectCard'
import { useTheme } from '../context/useTheme.js'

export default function ProjectsSection() {
  const { lang } = useLanguage()
  const { content } = useTheme()
  const themeRoot = content[lang] || content
  const projects = themeRoot.projects || []
  return (
    <section id="projects" className="py-20 bg-onyx">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-baseline gap-3">
          <h3 className="font-gothic text-3xl text-auric distressed-text">{content?.labels?.nav?.projects || 'Boss Battles'}</h3>
          <p className="text-sm text-gray-500">{content?.labels?.projectsSub || 'Projects faced and conquered'}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}

