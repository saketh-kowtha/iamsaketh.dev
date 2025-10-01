import { Link } from 'react-router-dom'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent, getNavigationItems } from '../utils/content'
import ModeToggle from './ModeToggle'
import ThemeSelector from './ThemeSelector'

export default function Navigation() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const navItems = getNavigationItems(content)

  return (
    <nav className="fixed top-0 inset-x-0 z-20 glass ornate-border">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/home"
            className="font-gothic text-accent text-lg font-semibold hover:text-accent-2 transition-colors"
          >
            {content.navigation.brand}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {mode === 'game' && <ThemeSelector />}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
