import { useMemo, useState, useEffect } from 'react'

export function useLanguage() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const nav = navigator.language?.slice(0, 2)
    if (['en', 'es', 'ja', 'hi'].includes(nav)) setLang(nav)
  }, [])
  const change = (l) => setLang(l)
  return useMemo(() => ({ lang, change }), [lang])
}

