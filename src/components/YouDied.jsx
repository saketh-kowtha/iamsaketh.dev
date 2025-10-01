export default function YouDied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base vignette-overlay grain-overlay">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-gothic text-danger tracking-widest mb-8 distressed-text">
          YOU DIED
        </h1>
        <div className="flex gap-4 justify-center">
          <a
            href="/home"
            className="btn-primary px-6 py-3"
          >
            Return to Safety
          </a>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary px-6 py-3"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
