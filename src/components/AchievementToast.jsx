import { useEffect, useState } from 'react'
import { useAchievements } from '../hooks/useAchievements'

const ACHIEVEMENT_METADATA = {
  ach_all_sections: {
    title: 'Explorer',
    description: 'Visited all sections',
    icon: '🗺️'
  },
  ach_konami_code: {
    title: 'Code Master',
    description: 'Entered the Konami Code',
    icon: '🎮'
  },
  ach_theme_hunter: {
    title: 'Theme Hunter',
    description: 'Tried all game themes',
    icon: '🎨'
  },
  ach_mode_switcher: {
    title: 'Mode Switcher',
    description: 'Toggled between modes',
    icon: '🔄'
  },
  ach_thorough: {
    title: 'Thorough',
    description: 'Opened 3+ project modals',
    icon: '🔍'
  },
  ach_persistent: {
    title: 'Persistent Visitor',
    description: 'Visited the site 3+ times',
    icon: '⭐'
  }
}

export default function AchievementToast() {
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const { unlock, isUnlocked, KEYS } = useAchievements()

  // Track visit count (disabled - too annoying)
  // useEffect(() => {
  //   const visits = parseInt(localStorage.getItem('visit-count') || '0')
  //   const newVisits = visits + 1
  //   localStorage.setItem('visit-count', newVisits.toString())

  //   if (newVisits >= 3 && !isUnlocked(KEYS.PERSISTENT)) {
  //     setTimeout(() => {
  //       unlock(KEYS.PERSISTENT)
  //       addToQueue(KEYS.PERSISTENT)
  //     }, 2000)
  //   }
  // }, [])

  // Listen for achievement unlocks
  useEffect(() => {
    const handleAchievement = (e) => {
      addToQueue(e.detail.key)
    }

    window.addEventListener('achievement-unlock', handleAchievement)
    return () => window.removeEventListener('achievement-unlock', handleAchievement)
  }, [])

  const addToQueue = (key) => {
    setQueue((prev) => [...prev, key])
  }

  // Process queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue
      setCurrent(next)
      setQueue(rest)

      setTimeout(() => {
        setCurrent(null)
      }, 3000)
    }
  }, [current, queue])

  if (!current) return null

  const achievement = ACHIEVEMENT_METADATA[current]
  if (!achievement) return null

  return (
    <div className="fixed top-20 right-6 z-50 animate-slideInRight">
      <div className="bg-surface/95 backdrop-blur-sm border-2 border-accent text-primary px-6 py-4 rounded-lg shadow-2xl min-w-[280px]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{achievement.icon}</span>
          <div>
            <div className="font-gothic text-accent font-bold text-sm mb-1">
              Achievement Unlocked!
            </div>
            <div className="font-bold text-base">{achievement.title}</div>
            <div className="text-sm text-muted">{achievement.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
