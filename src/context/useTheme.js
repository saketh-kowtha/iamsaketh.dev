import { useContext } from 'react'
import ThemeContext from './_ThemeContext.js'

export function useTheme() {
  return useContext(ThemeContext)
}

