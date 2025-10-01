import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ParticleSystem from './ParticleSystem'
import { useTheme } from '../context/useTheme.js'

export default function IntroScreen() {
  const navigate = useNavigate()
  const { content } = useTheme()

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
    <div className="min-h-screen relative flex items-center justify-center bg-abyss text-gray-200 overflow-hidden">
      <ParticleSystem id="bonfire-canvas" />
      <div className="fog-layer" />
      <div className="vignette-overlay" />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-gothic text-auric distressed-text">{content?.hero?.title || 'Saketh'}</h1>
        <p className="mt-2 text-sm uppercase tracking-widest text-gray-400">{content?.hero?.subtitle || 'Full-Stack Architect'}</p>
        <p className="mt-10 text-ember animate-pulse">{content?.labels?.intro?.pressAny || 'Press any key to begin'}</p>
      </div>
    </div>
  )
}

