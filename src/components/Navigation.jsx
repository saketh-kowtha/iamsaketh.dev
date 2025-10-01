import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent, getNavigationItems } from '../utils/content'
import ModeToggle from './ModeToggle'
import ThemeSelector from './ThemeSelector'
import SoundToggle from './SoundToggle'

export default function Navigation() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const navItems = getNavigationItems(content)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className={`fixed top-0 inset-x-0 z-20 glass ornate-border transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className={`flex flex-nowrap items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Brand - flex-shrink-0 prevents shrinking */}
          <Link
            to="/home"
            className="font-gothic text-accent text-lg font-semibold hover:text-accent-2 transition-colors flex-shrink-0"
          >
            {content.navigation.brand}
          </Link>

          {/* Desktop Navigation - hidden on smaller screens */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted hover:text-accent transition-all duration-200 relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-muted hover:text-accent transition-colors p-2 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Controls - flex-shrink-0 prevents shrinking */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {mode === 'game' && (
              <>
                <SoundToggle />
                <ThemeSelector isMobile={false} />
              </>
            )}
            <ModeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-ornate py-4 space-y-4 animate-fadeIn">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block text-base font-medium text-muted hover:text-accent transition-colors px-2 py-3 border-b border-ornate/30"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mode Toggle */}
            <div className="px-2 pt-2 border-t border-ornate">
              <ModeToggle />
            </div>

            {/* Sound Toggle & Theme Selector - Mobile */}
            {mode === 'game' && (
              <>
                <div className="px-2 pt-2 border-t border-ornate">
                  <div className="flex justify-center">
                    <SoundToggle />
                  </div>
                </div>
                <div className="px-2 pt-2 border-t border-ornate">
                  <ThemeSelector isMobile={true} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
