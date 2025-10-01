import { useLanguage } from '../hooks/useLanguage'
import { t } from '../utils/i18n'
import { useTheme } from '../context/useTheme.js'

export default function HeroSection() {
  const { lang } = useLanguage()
  const { content } = useTheme()
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-abyss">
      <div className="absolute inset-0 pointer-events-none bg-vignette" />
      <div className="w-full px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-7xl font-gothic text-auric distressed-text tracking-wide title-glow">{t(content, lang, 'hero.tagline') || content?.hero?.tagline}</h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">{t(content, lang, 'about.description') || content?.about?.description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="#projects" className="btn-ember">{content?.labels?.cta?.primary || 'Enter Boss Battles'}</a>
          <a href="#contact" className="btn-ghost">{content?.labels?.cta?.secondary || 'Summon Saketh'}</a>
        </div>
      </div>
    </section>
  )
}

