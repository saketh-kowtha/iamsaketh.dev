import { useEffect, useState } from 'react'

const KEYS = {
  ALL_SECTIONS: 'ach_all_sections',
  KONAMI: 'ach_konami',
  KONAMI_CODE: 'ach_konami_code',
  THEME_HUNTER: 'ach_theme_hunter',
  MODE_SWITCHER: 'ach_mode_switcher',
  THOROUGH: 'ach_thorough',
  CURIOUS: 'ach_curious',
  PERSISTENT: 'ach_persistent'
}

export function useAchievements() {
  const [unlocked, setUnlocked] = useState(() => new Set())

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('achievements') || '[]')
    setUnlocked(new Set(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(Array.from(unlocked)))
  }, [unlocked])

  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let pos = 0
    const onKey = (e) => {
      if (e.key === seq[pos]) {
        pos++
        if (pos === seq.length) {
          setUnlocked(prev => new Set(prev).add(KEYS.KONAMI))
          pos = 0
          document.documentElement.classList.toggle('konami')
        }
      } else {
        pos = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const unlock = (key) => setUnlocked(prev => new Set(prev).add(key))
  const isUnlocked = (key) => unlocked.has(key)
  return { unlock, isUnlocked, KEYS }
}

