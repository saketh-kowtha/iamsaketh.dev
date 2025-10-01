import { useLanguage } from '../hooks/useLanguage'
import { t } from '../utils/i18n'
import { useTheme } from '../context/useTheme.js'

export default function AboutSection() {
  const { lang } = useLanguage()
  const { content } = useTheme()
  return (
    <section id="about" className="relative py-20 bg-onyx text-center">
      <div className="w-full px-6 md:px-12">
        <h3 className="font-gothic text-4xl text-auric distressed-text">{t(content, lang, 'hero.title') || content?.hero?.title}</h3>
        <p className="mt-4 text-gray-300 leading-relaxed max-w-3xl mx-auto">{t(content, lang, 'about.description') || content?.about?.description}</p>
        <p className="mt-2 text-gray-500 italic">“{t(content, lang, 'about.quote') || content?.about?.quote}”</p>
      </div>
    </section>
  )
}

