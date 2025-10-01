function Bar({ value }) {
  return (
    <div className="h-2 w-full bg-abyss/60 rounded">
      <div className="h-full bg-ember rounded" style={{ width: `${value}%` }} />
    </div>
  )
}

function SkillCard({ name, lore, value }) {
  return (
    <div className="p-4 card-gothic">
      <div className="flex items-center justify-between">
        <p className="text-gray-200 font-medium">{name}</p>
        <span className="badge">{value}%</span>
      </div>
      <div className="mt-2 health-bar"><div className="health-fill" style={{ width: `${value}%` }} /></div>
      <p className="mt-2 text-xs text-gray-400 opacity-90">{lore}</p>
    </div>
  )
}

import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../context/useTheme.js'

export default function SkillsSection() {
  const { lang } = useLanguage()
  const { content } = useTheme()
  const skills = (content[lang] || content).skills
  const toCards = (list) => list.map((name) => ({ name, lore: `${name} — ${(content?.labels?.skillsLore || 'tempered by trials')}`, value: 80 }))
  return (
    <section id="skills" className="py-20 bg-abyss">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-baseline gap-3">
          <h3 className="font-gothic text-3xl text-auric distressed-text">{content?.labels?.nav?.skills || 'Skills'}</h3>
          <p className="text-sm text-gray-500">{content?.labels?.skillsSub || 'Skills'}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {toCards(skills.frontend).map((s) => <SkillCard key={`f-${s.name}`} {...s} />)}
          {toCards(skills.backend).map((s) => <SkillCard key={`b-${s.name}`} {...s} />)}
          {toCards(skills.devops).map((s) => <SkillCard key={`d-${s.name}`} {...s} />)}
        </div>
      </div>
    </section>
  )
}

