import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function HeroSection() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-base">
      <div className="absolute inset-0 pointer-events-none vignette-overlay" />
      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 text-center z-10">
        <h1 className="text-6xl md:text-8xl font-gothic text-accent distressed-text tracking-wide title-glow mb-4">
          {content.hero.title}
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading text-primary mb-6">
          {content.hero.subtitle}
        </h2>
        <p className="text-xl md:text-2xl text-muted font-medium mb-8">
          {content.hero.tagline}
        </p>
        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-10">
          {content.about.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="btn-primary">
            {content.projects.cta.primary}
          </a>
          <a href="#contact" className="btn-secondary">
            {content.projects.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  )
}
