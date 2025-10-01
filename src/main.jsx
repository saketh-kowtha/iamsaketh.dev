import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { inject } from '@vercel/analytics'
import { useMode } from './hooks/useMode'
import { useTheme } from './hooks/useTheme'

inject()

function ThemeInitializer() {
  const { mode } = useMode()
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    document.documentElement.setAttribute('data-theme', theme)
  }, [mode, theme])

  return null
}

function Root() {
  return (
    <StrictMode>
      <ThemeInitializer />
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
