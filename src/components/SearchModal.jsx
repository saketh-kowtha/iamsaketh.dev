import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../context/useTheme.js'

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const onSlash = (e) => {
      if (e.key === '/') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onSlash)
    return () => window.removeEventListener('keydown', onSlash)
  }, [])

  const { lang } = useLanguage()
  const { content } = useTheme()
  const data = useMemo(() => {
    const c = content[lang] || content
    return [
      { type: 'section', title: c?.labels?.nav?.hero || 'Hero', href: '#hero' },
      { type: 'section', title: c?.labels?.nav?.about || 'About', href: '#about' },
      { type: 'section', title: c?.labels?.nav?.skills || 'Skills', href: '#skills' },
      { type: 'section', title: c?.labels?.nav?.projects || 'Projects', href: '#projects' },
      { type: 'section', title: c?.labels?.nav?.experience || 'Experience', href: '#experience' },
      { type: 'section', title: c?.labels?.nav?.contact || 'Contact', href: '#contact' },
      ...c.projects.map(p => ({ type: 'project', title: p.name, href: '#projects' })),
      ...c.skills.frontend.map(s => ({ type: 'skill', title: s, href: '#skills' })),
      ...c.skills.backend.map(s => ({ type: 'skill', title: s, href: '#skills' })),
      ...c.skills.devops.map(s => ({ type: 'skill', title: s, href: '#skills' })),
      ...c.experience.map(e => ({ type: 'experience', title: `${e.role} • ${e.company}`, href: '#experience' })),
    ]
  }, [lang, content])

  useEffect(() => {
    const fuse = new Fuse(data, { keys: ['title', 'type'], threshold: 0.35 })
    setResults(query ? fuse.search(query).map(r => r.item) : [])
  }, [query, data])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center pt-24">
      <div className="w-full max-w-2xl bg-onyx ornate-border">
        <div className="p-3 border-b border-auric/30">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={(content?.labels?.search?.placeholder) || 'Archive Search...'}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
          />
        </div>
        <ul className="divide-y divide-gray-800 max-h-80 overflow-auto">
          {results.map((r) => (
            <li key={r.href} className="p-3 hover:bg-abyss">
              <a href={r.href} onClick={() => setOpen(false)} className="text-gray-200">{r.title} <span className="text-gray-500 text-xs">[{r.type}]</span></a>
            </li>
          ))}
          {results.length === 0 && (
            <li className="p-3 text-gray-500">{(content?.labels?.search?.noResults) || 'No matches found.'}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

