import { useMode } from '../hooks/useMode'
import { useSound } from '../hooks/useSound'

export default function ModeToggle() {
  const { mode, toggleMode } = useMode()
  const { playSound } = useSound()

  const handleToggle = () => {
    playSound('click', 0.3)
    toggleMode()
  }

  return (
    <button
      onClick={handleToggle}
      className="relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
      style={{
        background: mode === 'game'
          ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))'
          : 'var(--glass-bg)',
        color: mode === 'game' ? 'var(--color-text-dark)' : 'var(--color-text)',
        border: mode === 'normal' ? '1px solid var(--border-ornate)' : 'none',
        boxShadow: mode === 'game' ? '0 0 20px var(--glow-accent)' : 'none'
      }}
      aria-label={`Switch to ${mode === 'normal' ? 'game' : 'normal'} mode`}
    >
      {mode === 'normal' ? '🎮 Game Mode' : '💼 Normal Mode'}
    </button>
  )
}
