import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

function SkillCard({ name, categoryTitle, value = 85 }) {
  return (
    <div className="p-5 card-gothic">
      <div className="flex items-center justify-between mb-3">
        <p className="text-primary font-semibold">{name}</p>
        <span className="badge">{value}%</span>
      </div>
      <div className="health-bar">
        <div className="health-fill" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted opacity-90">{categoryTitle}</p>
    </div>
  )
}

export default function SkillsSection() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const skills = content.skills

  return (
    <section id="skills" className="py-24 bg-base">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {skills.title}
          </h2>
          <p className="text-base text-muted">{skills.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Frontend Skills */}
          {skills.categories.frontend.items.map((skill) => (
            <SkillCard
              key={`frontend-${skill}`}
              name={skill}
              categoryTitle={skills.categories.frontend.title}
              value={Math.floor(Math.random() * 15) + 80}
            />
          ))}

          {/* Backend Skills */}
          {skills.categories.backend.items.map((skill) => (
            <SkillCard
              key={`backend-${skill}`}
              name={skill}
              categoryTitle={skills.categories.backend.title}
              value={Math.floor(Math.random() * 15) + 80}
            />
          ))}

          {/* DevOps Skills */}
          {skills.categories.devops.items.map((skill) => (
            <SkillCard
              key={`devops-${skill}`}
              name={skill}
              categoryTitle={skills.categories.devops.title}
              value={Math.floor(Math.random() * 15) + 75}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
