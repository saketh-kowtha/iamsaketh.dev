import { useTheme } from '../hooks/useTheme'

const THEMES = [
  { id: 'bonfire', label: 'Bonfire', icon: '🔥' },
  { id: 'grace', label: 'Grace', icon: '✨' },
  { id: 'idol', label: 'Idol', icon: '🗡️' },
  { id: 'stargazer', label: 'Stargazer', icon: '⭐' }
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {THEMES.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            theme === id
              ? 'scale-105'
              : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            background: theme === id
              ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))'
              : 'var(--glass-bg)',
            color: theme === id ? 'var(--color-text-dark)' : 'var(--color-text)',
            border: theme !== id ? '1px solid var(--glass-border)' : 'none',
            boxShadow: theme === id ? '0 0 16px var(--glow-accent)' : 'none'
          }}
          aria-label={`Switch to ${label} theme`}
        >
          <span className="mr-1">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
