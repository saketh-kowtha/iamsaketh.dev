import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useSound } from '../hooks/useSound'

const THEMES = [
  { id: 'bonfire', label: 'Bonfire', icon: '🔥' },
  { id: 'grace', label: 'Grace', icon: '✨' },
  { id: 'idol', label: 'Idol', icon: '🗡️' },
  { id: 'stargazer', label: 'Stargazer', icon: '⭐' }
]

export default function ThemeSelector({ isMobile = false }) {
  const { theme, setTheme } = useTheme()
  const { playSound } = useSound()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeSelect = (themeId) => {
    playSound('click', 0.2)
    setTheme(themeId)
    setIsOpen(false)
  }

  // Mobile: Vertical list layout
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Theme</h3>
        {THEMES.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => handleThemeSelect(id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
              theme === id ? 'bg-accent/20 border-2 border-accent' : 'bg-glass-bg border border-ornate'
            }`}
            aria-label={`Switch to ${label} theme`}
          >
            <span className="text-lg">{icon}</span>
            <span className="flex-1 text-left">{label}</span>
            {theme === id && <span className="text-accent">✓</span>}
          </button>
        ))}
      </div>
    )
  }

  // Desktop: Dropdown menu
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap bg-glass-bg border border-ornate hover:border-accent min-w-[140px]"
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <span>{currentTheme.icon}</span>
        <span className="flex-1 text-left">{currentTheme.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-ornate rounded-lg shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {THEMES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleThemeSelect(id)}
              className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-medium transition-colors ${
                theme === id
                  ? 'bg-accent/20 text-accent'
                  : 'text-primary hover:bg-glass-bg'
              }`}
              aria-label={`Switch to ${label} theme`}
            >
              <span className="text-base">{icon}</span>
              <span className="flex-1 text-left">{label}</span>
              {theme === id && <span className="text-accent">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
