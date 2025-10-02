import { useState, useEffect } from 'react'

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('PWA installed')
    }

    setInstallPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Remember dismissal for 7 days
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  // Don't show if already installed or recently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) {
        setShowPrompt(false)
      }
    }
  }, [])

  if (!showPrompt || !installPrompt) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 animate-slideUp">
      <div className="card p-4 glass border-2 border-accent/30 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">📱</div>
          <div className="flex-1">
            <h3 className="text-primary font-bold mb-1">Install App</h3>
            <p className="text-sm text-muted mb-3">
              Install this portfolio as an app for quick access and offline viewing
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="btn-primary text-sm px-4 py-2"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-sm px-4 py-2 text-muted hover:text-primary transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-muted hover:text-primary transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
