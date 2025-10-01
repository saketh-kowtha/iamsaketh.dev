import { useEffect, useRef, useState } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function ExperienceTimeline() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const experience = content.experience
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]))
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [experience.items.length])

  // Determine icon based on theme
  const getTimelineIcon = () => {
    if (mode === 'normal') return '💼'
    if (theme === 'bonfire') return '🔥'
    if (theme === 'grace') return '✨'
    if (theme === 'idol') return '⚔️'
    if (theme === 'stargazer') return '⚙️'
    return '💼'
  }

  const isPresentJob = (period) => {
    return period.toLowerCase().includes('present')
  }

  return (
    <section id="experience" className="py-24 bg-base">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {experience.title}
          </h2>
          <p className="text-base text-muted">{experience.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline spine - dashed style */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"
               style={{ backgroundImage: 'linear-gradient(to bottom, currentColor 50%, transparent 50%)', backgroundSize: '1px 12px' }} />

          <ol className="space-y-16">
            {experience.items.map((item, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.has(index)
              const isPresent = isPresentJob(item.period)

              return (
                <li
                  key={`${item.company}-${item.role}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`relative flex ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline node with icon and pulse animation for current job */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-8 z-10">
                    <div className={`relative w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border-2 border-accent flex items-center justify-center shadow-lg transition-all duration-500 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    } ${isPresent ? 'animate-pulse-slow' : ''}`}>
                      <span className="text-xl">{getTimelineIcon()}</span>
                      {isPresent && (
                        <span className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-75" />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                      isLeft ? 'md:pr-16' : 'md:pl-16'
                    } transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : `opacity-0 ${isLeft ? 'md:-translate-x-8' : 'md:translate-x-8'} translate-y-8`
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`card p-6 relative overflow-hidden ${
                      mode === 'game' ? 'glass' : ''
                    } hover:scale-105 transition-transform duration-300 group`}>
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent" />

                      {/* Present badge */}
                      {isPresent && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-accent/20 border border-accent rounded-full text-xs text-accent font-bold animate-pulse-slow">
                          Present
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-base text-accent font-semibold mb-2">
                        {item.company}
                      </p>
                      <p className="text-sm text-muted/80 mb-4 font-medium">{item.period}</p>

                      <ul className="space-y-3">
                        {item.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted flex items-start group/item"
                          >
                            <span className="mr-2 text-accent mt-0.5 group-hover/item:scale-125 transition-transform">→</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack tags if available */}
                      {item.tech && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-ornate/30">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
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
