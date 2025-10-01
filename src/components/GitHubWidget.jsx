import { useState, useEffect } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'

export default function GitHubWidget({ username = 'saketh' }) {
  const { mode } = useMode()
  const { theme } = useTheme()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Check cache first (24 hour cache)
        const cached = localStorage.getItem('github_stats')
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp
          const twentyFourHours = 24 * 60 * 60 * 1000

          if (age < twentyFourHours) {
            setStats(data)
            setLoading(false)
            return
          }
        }

        // Fetch fresh data
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        const statsData = {
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          avatar: data.avatar_url,
          bio: data.bio,
          url: data.html_url
        }

        // Cache the data
        localStorage.setItem('github_stats', JSON.stringify({
          data: statsData,
          timestamp: Date.now()
        }))

        setStats(statsData)
        setLoading(false)
      } catch (err) {
        console.error('GitHub fetch error:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username])

  if (loading) {
    return (
      <div className={`card p-4 ${mode === 'game' ? 'glass' : ''} animate-pulse`}>
        <div className="h-6 bg-accent/20 rounded mb-3 w-32" />
        <div className="h-4 bg-accent/10 rounded w-full mb-2" />
        <div className="h-4 bg-accent/10 rounded w-3/4" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className={`card p-4 ${mode === 'game' ? 'glass' : ''} text-center`}>
        <p className="text-muted text-sm mb-2">Unable to load GitHub stats</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          View on GitHub →
        </a>
      </div>
    )
  }

  return (
    <div className={`card p-4 ${mode === 'game' ? 'glass' : ''} hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-accent/10 to-transparent" />

      <div className="flex items-start gap-3 mb-3">
        <img
          src={stats.avatar}
          alt={`${username} avatar`}
          className="w-12 h-12 rounded-full border-2 border-accent/30 group-hover:border-accent transition-colors"
        />
        <div>
          <h3 className="font-bold text-primary group-hover:text-accent transition-colors text-sm">
            GitHub Activity
          </h3>
          <p className="text-xs text-muted">@{username}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-base/50 rounded border border-ornate/20">
          <div className="text-accent font-bold text-lg">{stats.repos}</div>
          <div className="text-xs text-muted">Repos</div>
        </div>
        <div className="text-center p-2 bg-base/50 rounded border border-ornate/20">
          <div className="text-accent font-bold text-lg">{stats.followers}</div>
          <div className="text-xs text-muted">Followers</div>
        </div>
        <div className="text-center p-2 bg-base/50 rounded border border-ornate/20">
          <div className="text-accent font-bold text-lg">{stats.following}</div>
          <div className="text-xs text-muted">Following</div>
        </div>
      </div>

      <a
        href={stats.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        View Profile →
      </a>
    </div>
  )
}
