import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'
import ParticleSystem from './ParticleSystem'

export default function IntroScreen() {
  const navigate = useNavigate()
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)

  useEffect(() => {
    const onAny = () => {
      navigate('/home')
    }
    window.addEventListener('keydown', onAny)
    window.addEventListener('click', onAny)
    return () => {
      window.removeEventListener('keydown', onAny)
      window.removeEventListener('click', onAny)
    }
  }, [navigate])

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base text-primary overflow-hidden vignette-overlay grain-overlay">
      {mode === 'game' && <ParticleSystem />}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-gothic text-accent distressed-text title-glow mb-4">
          {content.hero.title}
        </h1>
        <p className="mt-4 text-xl uppercase tracking-widest text-muted">
          {content.hero.subtitle}
        </p>
        <p className="mt-12 text-accent-2 animate-pulse font-medium">
          Press any key to begin
        </p>
      </div>
    </div>
  )
}
