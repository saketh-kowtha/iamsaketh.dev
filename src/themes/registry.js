// Theme registry and dynamic loaders
export const THEMES = ['grace', 'stargazer', 'bonfire', 'idol']

// Map all theme contents and css for bundling
const contentModules = import.meta.glob('./*/content.json', { eager: true })
const cssModules = import.meta.glob('./*/theme.css')

export function getThemeContent(theme) {
  const key = `./${theme}/content.json`
  const mod = contentModules[key]
  return (mod && (mod.default || mod)) || null
}

export async function loadThemeCss(theme) {
  const key = `./${theme}/theme.css`
  const loader = cssModules[key]
  if (loader) {
    await loader() // side-effect import applies CSS
  }
}

