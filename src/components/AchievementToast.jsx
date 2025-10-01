import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function AchievementToast() {
  const [msg, setMsg] = useState(null)
  const { content } = useTheme()

  useEffect(() => {
    const visited = localStorage.getItem('visited')
    if (!visited) {
      setTimeout(() => setMsg(content?.labels?.achievements?.firstVisit || 'Achievement Unlocked: First Visit'), 800)
      localStorage.setItem('visited', 'true')
    }
  }, [])

  if (!msg) return null
  return (
    <div className="fixed bottom-6 right-6 z-30 bg-onyx border border-auric text-gray-100 px-4 py-3 rounded shadow-ember">
      {msg}
    </div>
  )
}

