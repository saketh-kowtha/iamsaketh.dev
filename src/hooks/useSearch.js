import { useMemo } from 'react'
import Fuse from 'fuse.js'

export function useSearch(data) {
  const fuse = useMemo(() => new Fuse(data, { keys: ['title', 'name', 'description'], threshold: 0.35 }), [data])
  const search = (q) => (q ? fuse.search(q).map(r => r.item) : [])
  return search
}

