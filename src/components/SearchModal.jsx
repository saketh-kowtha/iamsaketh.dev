import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)

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

  const searchData = useMemo(() => {
    const items = [
      {
        type: 'section',
        title: content.navigation.hero,
        href: '#hero'
      },
      {
        type: 'section',
        title: content.navigation.about,
        href: '#about'
      },
      {
        type: 'section',
        title: content.navigation.skills,
        href: '#skills'
      },
      {
        type: 'section',
        title: content.navigation.projects,
        href: '#projects'
      },
      {
        type: 'section',
        title: content.navigation.experience,
        href: '#experience'
      },
      {
        type: 'section',
        title: content.navigation.contact,
        href: '#contact'
      }
    ]

    // Add projects
    content.projects.items.forEach((project) => {
      items.push({
        type: 'project',
        title: project.name,
        href: '#projects'
      })
    })

    // Add skills
    Object.values(content.skills.categories).forEach((category) => {
      category.items.forEach((skill) => {
        items.push({
          type: 'skill',
          title: skill,
          href: '#skills'
        })
      })
    })

    // Add experience
    content.experience.items.forEach((item) => {
      items.push({
        type: 'experience',
        title: `${item.role} • ${item.company}`,
        href: '#experience'
      })
    })

    return items
  }, [content])

  useEffect(() => {
    const fuse = new Fuse(searchData, {
      keys: ['title', 'type'],
      threshold: 0.35
    })
    setResults(query ? fuse.search(query).map((r) => r.item) : [])
  }, [query, searchData])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-surface ornate-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-ornate">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search (Press / to open, ESC to close)"
            className="w-full bg-transparent outline-none text-primary placeholder-muted"
          />
        </div>
        <ul className="divide-y divide-glass-border max-h-80 overflow-auto">
          {results.map((r, idx) => (
            <li key={`${r.href}-${idx}`} className="hover:bg-base transition-colors">
              <a
                href={r.href}
                onClick={() => setOpen(false)}
                className="block p-4 text-primary hover:text-accent"
              >
                {r.title}{' '}
                <span className="text-muted text-xs uppercase">[{r.type}]</span>
              </a>
            </li>
          ))}
          {results.length === 0 && query && (
            <li className="p-4 text-muted text-center">No matches found.</li>
          )}
          {!query && (
            <li className="p-4 text-muted text-center text-sm">
              Start typing to search...
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
