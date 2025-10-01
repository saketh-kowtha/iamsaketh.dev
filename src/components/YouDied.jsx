import { useTheme } from '../context/ThemeContext.jsx'

export default function YouDied() {
  const { content } = useTheme()
  return (
    <div className="min-h-screen flex items-center justify-center bg-abyss vignette-overlay">
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-gothic text-red-700 tracking-widest">{content?.labels?.youDied?.title || 'YOU DIED'}</div>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="/home" className="px-4 py-2 bg-onyx border border-red-900 text-gray-200 rounded">{content?.labels?.youDied?.home || 'Return to Bonfire'}</a>
          <button onClick={() => history.back()} className="px-4 py-2 bg-onyx border border-red-900 text-gray-200 rounded">{content?.labels?.youDied?.back || 'Try Again'}</button>
        </div>
      </div>
    </div>
  )
}
