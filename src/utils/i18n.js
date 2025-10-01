export function t(content, lang, path) {
  const parts = path.split('.')
  // Support both multilingual shape {en:{...}} and flat shape {...}
  let root = (content && (content[lang] || content.en)) || content || {}
  let node = root
  for (const p of parts) node = node?.[p]
  return node ?? ''
}

