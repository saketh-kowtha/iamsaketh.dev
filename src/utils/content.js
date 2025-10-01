import contentData from '../data/content.json'

export function getContent(mode, theme) {
  if (mode === 'normal') {
    return contentData.modes.normal
  }

  if (mode === 'game' && theme) {
    return contentData.modes.game[theme] || contentData.modes.game.bonfire
  }

  return contentData.modes.normal
}

export function getNavigationItems(content) {
  return [
    { href: '#hero', label: content.navigation.hero },
    { href: '#about', label: content.navigation.about },
    { href: '#skills', label: content.navigation.skills },
    { href: '#projects', label: content.navigation.projects },
    { href: '#experience', label: content.navigation.experience },
    { href: '#contact', label: content.navigation.contact }
  ]
}
