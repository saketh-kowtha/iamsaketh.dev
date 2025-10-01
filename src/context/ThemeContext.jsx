import { useEffect, useMemo, useState } from 'react'
import { THEMES, getThemeContent, loadThemeCss } from '../themes/registry'
import ThemeContext from './_ThemeContext.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('mode') || 'bonfire')
  const [content, setContent] = useState(() => getThemeContent(theme) || {})

  useEffect(() => {
    // Load CSS for theme and apply classes
    loadThemeCss(theme)
    const root = document.documentElement
    const body = document.body
    THEMES.forEach(m => { root.classList.remove(m); body.classList.remove(m) })
    root.classList.add(theme)
    body.classList.add(theme)
    localStorage.setItem('mode', theme)

    // Load theme-specific content only (no global data file)
    const themeContent = getThemeContent(theme) || {}
    setContent(themeContent)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme, content }), [theme, content])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// useTheme moved to separate hook to satisfy fast refresh

