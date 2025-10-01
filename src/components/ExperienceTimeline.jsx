import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function ExperienceTimeline() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const experience = content.experience

  return (
    <section id="experience" className="py-24 bg-base">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {experience.title}
          </h2>
          <p className="text-base text-muted">{experience.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent opacity-30" />

          <ol className="space-y-12">
            {experience.items.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <li
                  key={`${item.company}-${item.role}`}
                  className={`relative flex ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline node */}
                  <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-accent border-4 border-base shadow-lg z-10" />

                  {/* Card */}
                  <div
                    className={`ml-8 md:ml-0 w-full md:w-5/12 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="card p-6">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {item.role}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-2">
                        {item.company}
                      </p>
                      <p className="text-sm text-muted mb-4">{item.period}</p>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted flex items-start"
                          >
                            <span className="mr-2 text-accent">→</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
