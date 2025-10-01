import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function AboutSection() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)

  return (
    <section id="about" className="relative py-24 bg-surface text-center">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-gothic text-5xl text-accent distressed-text mb-6">
          {content.hero.title}
        </h2>
        <p className="text-lg text-primary leading-relaxed max-w-3xl mx-auto mb-6">
          {content.about.description}
        </p>
        <blockquote className="text-base text-muted italic border-l-4 border-accent pl-4 max-w-2xl mx-auto">
          "{content.about.quote}"
        </blockquote>
      </div>
    </section>
  )
}
