import { useState, useMemo } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const projects = content.projects
  const [activeFilter, setActiveFilter] = useState('All')

  // Determine project category based on tech stack
  const getProjectCategory = (tech) => {
    const techStr = tech.join(' ').toLowerCase()

    const hasFrontend = /react|vue|angular|html|css|tailwind|framer/i.test(techStr)
    const hasBackend = /node|python|fastapi|express|mongodb|postgresql|graphql|rest/i.test(techStr)
    const hasDevOps = /kubernetes|docker|ci\/cd|jenkins|github actions|aws|linux|terraform/i.test(techStr)

    if (hasFrontend && hasBackend) return 'Full-Stack'
    if (hasDevOps) return 'DevOps'
    if (hasBackend) return 'Backend'
    if (hasFrontend) return 'Frontend'
    return 'Full-Stack' // default
  }

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set(['All'])
    projects.items.forEach((project) => {
      cats.add(getProjectCategory(project.tech))
    })
    return Array.from(cats)
  }, [projects.items])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects.items
    return projects.items.filter((project) => getProjectCategory(project.tech) === activeFilter)
  }, [projects.items, activeFilter])

  const showFilters = projects.items.length >= 5

  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {projects.title}
          </h2>
          <p className="text-base text-muted">{projects.subtitle}</p>
        </div>

        {/* Filter buttons - only show if 5+ projects */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-accent text-base shadow-lg scale-105'
                    : 'bg-base/50 text-muted hover:bg-accent/20 hover:text-accent border border-ornate'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Projects grid with fade animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
