import { useEffect } from 'react'

export default function Modal({ open, onClose, children, title }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div
        className="w-full max-w-3xl bg-surface ornate-border shadow-2xl my-8 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <div className="flex items-center justify-between border-b border-ornate px-6 py-4">
          <h3 className="font-gothic text-accent text-2xl">{title}</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-muted hover:text-accent transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-auto">{children}</div>
      </div>
    </div>
  )
}
