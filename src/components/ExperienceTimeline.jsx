import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../context/useTheme.js'

export default function ExperienceTimeline() {
  const { lang } = useLanguage()
  const { content } = useTheme()
  const timeline = (content[lang] || content).experience
  return (
    <section id="experience" className="py-20 bg-abyss">
      <div className="w-full px-6 md:px-12">
        <h3 className="font-gothic text-3xl text-auric text-center">The Journey</h3>
        <div className="mt-12 relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 timeline-line" />
          <ol className="space-y-10">
            {timeline.map((t, i) => {
              const left = i % 2 === 0
              return (
                <li key={t.company} className={`relative md:flex ${left ? 'md:justify-start' : 'md:justify-end'}`}>
                  {/* Center node on the spine */}
                  <span className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-onyx border border-auric shadow-ember" />
                  {/* Connector arm from spine to card */}
                  {left ? (
                    <span className="hidden md:block absolute top-1/2 -translate-y-1/2 right-1/2 w-14 h-[2px] bg-auric/30" />
                  ) : (
                    <span className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 w-14 h-[2px] bg-auric/30" />
                  )}
                  <div className={`${left ? 'md:pr-16' : 'md:pl-16'} w-full md:w-auto`}>
                    <div className="relative inline-block max-w-xl p-5 card-gothic text-left">
                      <h4 className="text-lg text-gray-200">{t.role} • {t.company}</h4>
                      <p className="text-gray-400">Age of {t.company}</p>
                      <ul className="list-disc pl-5 text-gray-300">
                        {t.achievements.map((a) => <li key={a}>Souls Collected: {a}</li>)}
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

