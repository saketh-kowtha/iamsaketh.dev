import { useState, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import LazyImage from './LazyImage'
import Modal from './Modal'

function DifficultyBadge({ level }) {
  const map = {
    Legendary: 'border-auric text-auric',
    Epic: 'border-ember text-ember',
    Rare: 'border-gray-400 text-gray-300',
  }
  return (
    <span className={`inline-block text-xs px-2 py-0.5 border rounded ${map[level] || 'border-gray-500 text-gray-300'}`}>{level}</span>
  )
}

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)
  const completion = useMemo(() => {
    const pct = project.progress ?? 85
    return Math.min(100, Math.max(0, pct))
  }, [project.progress])
  const { content } = useTheme()

  return (
    <article className="group bg-abyss ornate-border hover:shadow-glow transition">
      <div className="p-4 flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="text-lg text-gray-200 font-semibold">{project.name}</h4>
            <DifficultyBadge level={project.difficulty} />
          </div>
          <p className="text-sm text-gray-400 mt-1">{project.description}</p>
          <div className="mt-3 h-2 bg-onyx rounded">
            <div className="h-full bg-red-700 rounded transition-all" style={{ width: `${completion}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-400">
            {project.tech?.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-onyx rounded border border-gray-700">{t}</span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setOpen(true)} className="px-3 py-1 text-sm bg-onyx border border-auric text-gray-200 rounded gold-glow">{content?.labels?.project?.viewDetails || 'View Details'}</button>
            {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="px-3 py-1 text-sm bg-onyx border border-gray-600 text-gray-200 rounded">{content?.labels?.project?.open || 'Open'}</a>}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={project.name}>
        <div className="space-y-4">
          <p className="text-gray-300">{project.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 text-xs border border-auric rounded text-auric">{project.difficulty}</span>
            {project.boss && <span className="px-2 py-0.5 text-xs border border-gray-600 rounded text-gray-300">Boss: {project.boss}</span>}
          </div>

          <div className="health-bar"><div className="health-fill" style={{ width: `${completion}%` }} /></div>

          {project.tech?.length ? (
            <div>
              <div className="text-sm text-gray-400 mb-1">{content?.labels?.project?.droppedLoot || 'Dropped Loot'}</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs bg-onyx rounded border border-gray-700">{t}</span>
                ))}
              </div>
            </div>
          ) : null}

          {project.stats && (
            <div className="grid grid-cols-2 gap-3">
              {project.stats.lines && (
                <div className="p-3 bg-abyss border border-gray-800 rounded">
                  <div className="text-gray-400 text-xs">{content?.labels?.project?.lines || 'Lines of code'}</div>
                  <div className="text-gray-200 font-semibold">{project.stats.lines}</div>
                </div>
              )}
              {project.stats.stars && (
                <div className="p-3 bg-abyss border border-gray-800 rounded">
                  <div className="text-gray-400 text-xs">{content?.labels?.project?.stars || 'GitHub stars'}</div>
                  <div className="text-gray-200 font-semibold">{project.stats.stars}</div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="btn-ember">{content?.labels?.project?.open || 'Open'}</a>}
            <button onClick={() => setOpen(false)} className="btn-ghost">{content?.labels?.project?.close || 'Close'}</button>
          </div>
        </div>
      </Modal>
    </article>
  )
}

