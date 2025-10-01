import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
]

export function useKonami(callback) {
  const [keys, setKeys] = useState([])

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.code].slice(-KONAMI_CODE.length)

        // Check if the sequence matches
        const matches = KONAMI_CODE.every((key, index) => key === newKeys[index])

        if (matches) {
          callback()
          return [] // Reset
        }

        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callback])
}
