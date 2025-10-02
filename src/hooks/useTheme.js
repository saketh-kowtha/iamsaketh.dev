import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'bonfire',
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.setAttribute('data-theme', theme)
      }
    }),
    {
      name: 'portfolio-theme'
    }
  )
)

// Initialize theme on load
if (typeof window !== 'undefined') {
  const state = useThemeStore.getState();
  document.documentElement.setAttribute('data-theme', state.theme);
}

export function useTheme() {
  return useThemeStore()
}
