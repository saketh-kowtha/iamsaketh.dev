import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    elements.forEach((el) => el.classList.add('opacity-0', 'translate-y-8'))

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8')
          entry.target.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-1000', 'ease-out')
          io.unobserve(entry.target)
        }
      }
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.15
    })

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

