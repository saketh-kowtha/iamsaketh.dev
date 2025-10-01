import { useState } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function HeroSection() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const [clickCount, setClickCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [altName, setAltName] = useState(null)

  const handleTripleClick = () => {
    setClickCount((prev) => prev + 1)

    setTimeout(() => setClickCount(0), 500) // Reset after 500ms

    if (clickCount >= 2) {
      // Triple click detected
      triggerSurprise()
      setClickCount(0)
    }
  }

  const triggerSurprise = () => {
    setShowConfetti(true)

    // Change name based on theme
    const names = {
      bonfire: 'Ashen One',
      grace: 'Tarnished',
      idol: 'Sekiro',
      stargazer: 'Puppet'
    }

    if (mode === 'game' && names[theme]) {
      setAltName(names[theme])
    }

    setTimeout(() => {
      setShowConfetti(false)
      setAltName(null)
    }, 3000)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      <div className="absolute inset-0 pointer-events-none vignette-overlay" />

      {/* Animated background gradient - reduced opacity for better text contrast */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/2 via-transparent to-transparent animate-pulse-slow" />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 text-center z-10">
        <h1
          className="text-4xl md:text-6xl font-gothic text-accent distressed-text tracking-wide title-glow mb-4 animate-fadeInUp hero-text-shadow cursor-pointer select-none transition-transform hover:scale-105"
          style={{animationDelay: '0.1s', animationFillMode: 'backwards'}}
          onClick={handleTripleClick}
        >
          {altName || content.hero.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-heading text-primary mb-6 animate-fadeInUp hero-text-shadow" style={{animationDelay: '0.3s', animationFillMode: 'backwards'}}>
          {content.hero.subtitle}
        </h2>
        <p className="text-base md:text-lg text-muted font-medium mb-8 animate-fadeInUp hero-text-shadow" style={{animationDelay: '0.5s', animationFillMode: 'backwards'}}>
          {content.hero.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp" style={{animationDelay: '0.9s', animationFillMode: 'backwards'}}>
          <a href="#projects" className="btn-primary group">
            <span className="inline-block group-hover:scale-110 transition-transform">{content.projects.cta.primary}</span>
          </a>
          <a href="#contact" className="btn-secondary group">
            <span className="inline-block group-hover:scale-110 transition-transform">{content.projects.cta.secondary}</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator - mouse icon with text */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <a
          href="#about"
          className="animate-bounce-slow flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          style={{animationDelay: '1.2s', animationFillMode: 'backwards'}}
          aria-label="Scroll down"
        >
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-accent rounded-full animate-scroll-indicator" />
          </div>
          <span className="text-xs text-muted/70 font-medium whitespace-nowrap">Scroll to explore</span>
        </a>
      </div>
    </section>
  )
}
