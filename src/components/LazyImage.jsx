import { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, alt, className, placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PSc2MCUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nNjAlJyBmaWxsPSIjMWExYTFiIi8+PC9zdmc+' }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
      ) : (
        <img src={placeholder} alt="placeholder" className="opacity-50" />
      )}
    </div>
  )
}

