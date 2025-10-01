import { useTheme } from '../context/useTheme.js'

export default function Modal({ open, onClose, children, title }) {
  const { content } = useTheme()
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 pt-20">
      <div className="w-full max-w-3xl bg-onyx ornate-border">
        <div className="flex items-center justify-between border-b border-auric/30 px-4 py-3">
          <h4 className="font-gothic text-auric text-xl">{title}</h4>
          <button aria-label={content?.labels?.project?.close || 'Close'} onClick={onClose} className="text-gray-300 hover:text-auric">✕</button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-auto">{children}</div>
      </div>
    </div>
  )
}

