import { useState, useMemo } from 'react'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'
import { useSound } from '../hooks/useSound'
import Modal from './Modal'

function DifficultyBadge({ level }) {
  const colorMap = {
    Legendary: 'border-accent text-accent',
    Demigod: 'border-accent text-accent',
    Inner: 'border-accent text-accent',
    King: 'border-accent text-accent',
    Complex: 'border-accent text-accent',
    Epic: 'border-accent-2 text-accent-2',
    Rare: 'border-muted text-muted'
  }
  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 border rounded ${
        colorMap[level] || 'border-muted text-muted'
      }`}
    >
      {level}
    </span>
  )
}

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const { playSound } = useSound()

  const completion = useMemo(() => {
    const pct = project.progress ?? 95
    return Math.min(100, Math.max(0, pct))
  }, [project.progress])

  const handleOpenModal = () => {
    playSound('modal', 0.2)
    setOpen(true)
  }

  const handleCloseModal = () => {
    playSound('click', 0.2)
    setOpen(false)
  }

  return (
    <article className="group card ornate-border transition-all duration-300 hover:scale-[1.02]" onMouseEnter={() => playSound('hover', 0.1)}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-xl text-primary font-bold group-hover:text-accent transition-colors">{project.name}</h3>
          <DifficultyBadge level={project.difficulty} />
        </div>

        {project.boss && (
          <p className="text-sm text-accent font-medium mb-2">
            Boss: {project.boss}
          </p>
        )}

        <p className="text-sm text-muted mb-4">{project.description}</p>

        <div className="health-bar mb-4">
          <div
            className="health-fill"
            style={{ width: `${completion}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleOpenModal}
            className="btn-secondary text-sm px-4 py-2 transform active:scale-95"
          >
            View Details
          </button>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-4 py-2 transform active:scale-95"
              onClick={() => playSound('click', 0.2)}
            >
              Open Project
            </a>
          )}
        </div>
      </div>

      <Modal open={open} onClose={handleCloseModal} title={project.name}>
        <div className="space-y-4">
          <p className="text-primary">{project.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge level={project.difficulty} />
            {project.boss && (
              <span className="px-2 py-0.5 text-xs border border-muted rounded text-muted">
                Boss: {project.boss}
              </span>
            )}
          </div>

          <div className="health-bar">
            <div className="health-fill" style={{ width: `${completion}%` }} />
          </div>

          {project.tech?.length > 0 && (
            <div>
              <div className="text-sm text-muted mb-2">Technologies Used</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => playSound('click', 0.2)}
              >
                Open Project
              </a>
            )}
            <button onClick={handleCloseModal} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </article>
  )
}
