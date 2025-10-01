import { useSound } from '../hooks/useSound'

export default function SoundToggle() {
  const { soundEnabled, toggleSound, isSoundAvailable } = useSound()

  if (!isSoundAvailable) return null

  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded-lg bg-base/50 border border-ornate hover:bg-accent/20 hover:border-accent transition-all duration-200 group relative"
      aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      <span className="text-xl transition-transform group-hover:scale-110">
        {soundEnabled ? '🔊' : '🔇'}
      </span>

      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-surface text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-ornate z-10">
        {soundEnabled ? 'Mute' : 'Unmute'}
      </span>

      {/* Pulse indicator when sounds are on */}
      {soundEnabled && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping" />
      )}
    </button>
  )
}
