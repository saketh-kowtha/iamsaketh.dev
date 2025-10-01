import { useEffect, useState } from 'react'

export default function AchievementToast() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const visited = localStorage.getItem('portfolio-visited')
    if (!visited) {
      setTimeout(() => {
        setMsg('Achievement Unlocked: First Visit')
      }, 1000)
      localStorage.setItem('portfolio-visited', 'true')

      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }, [])

  if (!msg) return null

  return (
    <div className="fixed bottom-6 right-6 z-30 bg-surface border border-accent text-primary px-6 py-4 rounded-lg shadow-2xl animate-pulse">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏆</span>
        <span className="font-medium">{msg}</span>
      </div>
    </div>
  )
}
