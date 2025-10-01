import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useModeStore = create(
  persist(
    (set) => ({
      mode: 'normal',
      setMode: (mode) => {
        set({ mode })
        document.documentElement.setAttribute('data-mode', mode)
      },
      toggleMode: () => {
        set((state) => {
          const newMode = state.mode === 'normal' ? 'game' : 'normal'
          document.documentElement.setAttribute('data-mode', newMode)
          return { mode: newMode }
        })
      }
    }),
    {
      name: 'portfolio-mode'
    }
  )
)

export function useMode() {
  return useModeStore()
}
