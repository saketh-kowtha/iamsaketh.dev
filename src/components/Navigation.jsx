import { Link } from 'react-router-dom'
import { THEMES } from '../themes/registry'
import { useTheme } from '../context/useTheme.js'

export default function Navigation() {
  const { theme, setTheme, content } = useTheme()
  return (
    <nav className="fixed top-0 inset-x-0 z-20 glass ornate-border">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/home" className="font-gothic text-auric text-lg">{content?.labels?.brand || 'Portfolio'}</Link>
          <div className="flex items-center gap-2">
            <a href="#hero" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.hero || 'Hero'}</a>
            <a href="#about" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.about || 'About'}</a>
            <a href="#skills" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.skills || 'Skills'}</a>
            <a href="#projects" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.projects || 'Projects'}</a>
            <a href="#experience" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.experience || 'Experience'}</a>
            <a href="#contact" className="px-3 py-2 text-gray-300 hover:text-auric">{content?.labels?.nav?.contact || 'Contact'}</a>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="ml-2 px-2 py-1 bg-onyx border border-auric text-gray-200 rounded text-xs" aria-label="Select theme">
              {THEMES.map(t => <option key={t} value={t}>{t === 'idol' ? "Sculptor's Idol" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

