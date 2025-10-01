import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useMode } from '../hooks/useMode'
import { useTheme } from '../hooks/useTheme'
import { getContent } from '../utils/content'

export default function ContactSection() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const { mode } = useMode()
  const { theme } = useTheme()
  const content = getContent(mode, theme)
  const contactContent = content.contact

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setStatus('sending')
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC
        }
      )
      setStatus('sent')
      formRef.current?.reset()
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="w-full max-w-2xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {contactContent.title}
          </h2>
          <p className="text-base text-muted">{contactContent.subtitle}</p>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-5 p-8 card ornate-border"
        >
          <div>
            <input
              name="from_name"
              className="w-full bg-base text-primary border border-ornate rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              placeholder={contactContent.form.name}
              required
            />
          </div>

          <div>
            <input
              name="reply_to"
              type="email"
              className="w-full bg-base text-primary border border-ornate rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              placeholder={contactContent.form.email}
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              rows="5"
              className="w-full bg-base text-primary border border-ornate rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder={contactContent.form.message}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : contactContent.form.send}
          </button>

          {status === 'sent' && (
            <p className="text-center text-accent font-medium animate-pulse">
              {contactContent.form.sent}
            </p>
          )}

          {status === 'error' && (
            <p className="text-center text-danger font-medium">
              {contactContent.form.error}
            </p>
          )}
        </form>

        <div className="mt-12 flex justify-center gap-6">
          <a
            href={`mailto:${contactContent.email}`}
            className="text-muted hover:text-accent transition-colors"
            aria-label="Email"
          >
            📧 Email
          </a>
          <a
            href={contactContent.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            💻 GitHub
          </a>
          <a
            href={contactContent.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            💼 LinkedIn
          </a>
          <a
            href={contactContent.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            🐦 Twitter
          </a>
        </div>
      </div>
    </section>
  )
}
