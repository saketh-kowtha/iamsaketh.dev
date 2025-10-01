export default function Modal({ open, onClose, children, title }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface ornate-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
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
