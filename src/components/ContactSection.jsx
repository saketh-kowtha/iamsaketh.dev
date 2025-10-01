import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useTheme } from '../context/useTheme.js'

export default function ContactSection() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const { content } = useTheme()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setStatus('sending')
      await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE, import.meta.env.VITE_EMAILJS_TEMPLATE, formRef.current, {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC,
      })
      setStatus('sent')
      formRef.current?.reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-onyx">
      <div className="w-full max-w-screen-md mx-auto px-6 md:px-12">
        <h3 className="font-gothic text-3xl text-auric">{content?.labels?.nav?.contact || 'Contact'}</h3>
        <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-4 bg-abyss p-6 ornate-border">
          <input name="from_name" className="w-full bg-onyx text-gray-200 border border-gray-700 rounded px-3 py-2" placeholder={(content?.labels?.contactForm?.name) || 'Your Name'} required />
          <input name="reply_to" type="email" className="w-full bg-onyx text-gray-200 border border-gray-700 rounded px-3 py-2" placeholder={(content?.labels?.contactForm?.email) || 'Your Email'} required />
          <textarea name="message" rows="4" className="w-full bg-onyx text-gray-200 border border-gray-700 rounded px-3 py-2" placeholder={(content?.labels?.contactForm?.message) || 'Message'} required />
          <button className="w-full bg-auric text-abyss font-semibold py-2 rounded hover:shadow-ember transition">{content?.labels?.contactForm?.send || 'Send'}</button>
          {status === 'sent' && <p className="text-ember">{content?.labels?.contactForm?.sent || 'Achievement Unlocked: Message Sent'}</p>}
          {status === 'error' && <p className="text-red-500">{content?.labels?.contactForm?.error || 'Spell failed to cast. Try again.'}</p>}
        </form>
      </div>
    </section>
  )
}

