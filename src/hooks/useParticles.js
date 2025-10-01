import { useEffect, useRef } from 'react'

export function useParticles(canvasId = 'bonfire-canvas', maxParticles = 50) {
  const reqRef = useRef(null)

  useEffect(() => {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const particles = new Array(Math.min(maxParticles, 50)).fill(0).map(() => ({
      x: width / 2 + (Math.random() - 0.5) * 80,
      y: height * 0.65 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.6 - 0.2,
      life: Math.random() * 80 + 40,
      size: Math.random() * 2 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life -= 1
        if (p.life <= 0 || p.y < height * 0.3) {
          p.x = width / 2 + (Math.random() - 0.5) * 80
          p.y = height * 0.65 + Math.random() * 20
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = -Math.random() * 0.6 - 0.2
          p.life = Math.random() * 80 + 40
          p.size = Math.random() * 2 + 1
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6)
        gradient.addColorStop(0, 'rgba(251,191,36,0.9)')
        gradient.addColorStop(1, 'rgba(212,175,55,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2)
        ctx.fill()
      }
      reqRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(reqRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [canvasId, maxParticles])
}

