import { useState, useEffect, useRef, useCallback } from 'react'
import { useMode } from './useMode'

export function useSound() {
  const { mode } = useMode()
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('sound-enabled')
    return saved === 'true'
  })
  const audioContextRef = useRef(null)
  const audioBuffersRef = useRef({})

  useEffect(() => {
    localStorage.setItem('sound-enabled', soundEnabled.toString())
  }, [soundEnabled])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev)
  }, [])

  const playSound = useCallback((soundName, volume = 0.3) => {
    if (!soundEnabled || mode !== 'game') return

    try {
      // For now, use simple beep/click sounds via Web Audio API
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Different frequencies for different sound types
      const frequencies = {
        hover: 800,
        click: 1200,
        modal: 600,
        achievement: 1000
      }

      oscillator.frequency.value = frequencies[soundName] || 800
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.1)
    } catch (err) {
      console.error('Sound playback error:', err)
    }
  }, [soundEnabled, mode])

  return {
    soundEnabled,
    toggleSound,
    playSound,
    isSoundAvailable: mode === 'game'
  }
}
