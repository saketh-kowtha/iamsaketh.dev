import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { useEffect } from 'react'
import { useAchievements } from './hooks/useAchievements'
import { useReveal } from './hooks/useReveal'

function Layout() {
  const { unlock, KEYS } = useAchievements()
  useReveal()
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
    const seen = new Set()
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          seen.add(id)
          if (seen.size >= sections.length) {
            unlock(KEYS.ALL_SECTIONS)
          }
        }
      }
    }
    const debounced = () => {
      clearTimeout(window.__scrollTimer)
      window.__scrollTimer = setTimeout(onScroll, 100)
    }
    window.addEventListener('scroll', debounced, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', debounced)
  }, [unlock, KEYS.ALL_SECTIONS])
  return (
    <div className="min-h-screen w-screen bg-abyss vignette-overlay grain-overlay">
      <Navigation />
      <main className="relative overflow-x-hidden w-screen">
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
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-10 text-auric font-gothic flex h-full w-full items-center justify-center">Igniting bonfire...</div>}>
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
