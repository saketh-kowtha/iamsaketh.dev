import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useMode } from './hooks/useMode'
import { useAchievements } from './hooks/useAchievements'
import { useReveal } from './hooks/useReveal'
import { useKonami } from './hooks/useKonami'
import './index.css'

const IntroScreen = lazy(() => import('./components/IntroScreen.jsx'))
const Navigation = lazy(() => import('./components/Navigation.jsx'))
const HeroSection = lazy(() => import('./components/HeroSection.jsx'))
const AboutSection = lazy(() => import('./components/AboutSection.jsx'))
const SkillsSection = lazy(() => import('./components/SkillsSection.jsx'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection.jsx'))
const ExperienceTimeline = lazy(() => import('./components/ExperienceTimeline.jsx'))
const ContactSection = lazy(() => import('./components/ContactSection.jsx'))
const SearchModal = lazy(() => import('./components/SearchModal.jsx'))
const AchievementToast = lazy(() => import('./components/AchievementToast.jsx'))
const YouDied = lazy(() => import('./components/YouDied.jsx'))
const ParticleSystem = lazy(() => import('./components/ParticleSystem.jsx'))

function LoadingFallback() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-base">
      <p className="text-accent font-gothic text-xl animate-pulse">
        Loading...
      </p>
    </div>
  )
}

function Layout() {
  const { mode } = useMode()
  const { unlock, KEYS } = useAchievements()
  useReveal()
  const [konamiActive, setKonamiActive] = useState(false)

  // Konami code easter egg
  useKonami(() => {
    unlock(KEYS.KONAMI_CODE)
    window.dispatchEvent(new CustomEvent('achievement-unlock', { detail: { key: KEYS.KONAMI_CODE } }))
    setKonamiActive(true)

    // Visual effect - particles go crazy
    const particleContainer = document.querySelector('.particle-system')
    if (particleContainer) {
      particleContainer.classList.add('konami-active')
    }

    // Screen flash effect
    document.body.style.animation = 'flash 0.5s ease-out'

    setTimeout(() => {
      setKonamiActive(false)
      document.body.style.animation = ''
      if (particleContainer) {
        particleContainer.classList.remove('konami-active')
      }
    }, 5000)
  })

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')).map(
      (s) => s.id
    )
    const seen = new Set()

    const onScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        for (const id of sections) {
          const el = document.getElementById(id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (
            rect.top < window.innerHeight * 0.7 &&
            rect.bottom > window.innerHeight * 0.3
          ) {
            seen.add(id)
            if (seen.size >= sections.length && !KEYS.ALL_SECTIONS) {
              unlock(KEYS.ALL_SECTIONS)
              window.dispatchEvent(new CustomEvent('achievement-unlock', { detail: { key: KEYS.ALL_SECTIONS } }))
            }
          }
        }
      })
    }

    let ticking = false
    const debounced = () => {
      if (!ticking) {
        ticking = true
        setTimeout(() => {
          onScroll()
          ticking = false
        }, 150)
      }
    }

    window.addEventListener('scroll', debounced, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', debounced)
  }, [unlock, KEYS])

  return (
    <div className="min-h-screen w-screen bg-base vignette-overlay grain-overlay">
      <a href="#hero" className="skip-to-content">
        Skip to main content
      </a>
      {mode === 'game' && <ParticleSystem />}
      {konamiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-accent font-gothic text-4xl animate-fadeIn bg-base/90 px-8 py-4 rounded-lg border-2 border-accent shadow-lg">
            🎮 Achievement Unlocked: Code Master
          </div>
        </div>
      )}
      <Navigation />
      <main id="main-content" className="relative overflow-x-hidden w-screen" role="main">
        <div data-reveal>
          <HeroSection />
        </div>
        <div data-reveal>
          <AboutSection />
        </div>
        <div data-reveal>
          <SkillsSection />
        </div>
        <div data-reveal>
          <ProjectsSection />
        </div>
        <div data-reveal>
          <ExperienceTimeline />
        </div>
        <div data-reveal>
          <ContactSection />
        </div>
      </main>
      <SearchModal />
      <AchievementToast />
    </div>
  )
}

function App() {
  // Console easter egg
  useEffect(() => {
    console.log(
      '%c🎮 Achievement Unlocked: Inspector Mode',
      'font-size: 20px; color: #00ff00; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,255,0,0.3);'
    )
    console.log(
      '%cHey there, fellow developer! 👋',
      'font-size: 16px; color: #00aaff; font-weight: bold;'
    )
    console.log(
      '%cLike what you see? Let\'s build something together.',
      'font-size: 14px; color: #888;'
    )
    console.log(
      '%csaketh@iamsaketh.dev',
      'font-size: 14px; color: #00aaff; font-weight: bold;'
    )
    console.log(
      '%c\n' +
      '    _____ _____ _____ _____ _____ _____ \n' +
      '   |   __|  _  |  |  |   __|_   _|  |  |\n' +
      '   |__   |     |    -|   __| | | |     |\n' +
      '   |_____|__|__|__|__|_____| |_| |__|__|\n' +
      '   \n' +
      '   Full-Stack Developer | System Architect\n',
      'font-family: monospace; color: #ff6b35; font-size: 12px;'
    )
    console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #ffaa00;')
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/home" element={<Layout />} />
          <Route path="*" element={<YouDied />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
