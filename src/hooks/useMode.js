import { create } from "zustand";
import { persist } from "zustand/middleware";

const useModeStore = create(
  persist(
    (set, get) => ({
      mode: "normal",
      setMode: (mode) => {
        set({ mode });
        document.documentElement.setAttribute("data-mode", mode);
      },
      toggleMode: () => {
        set((state) => {
          const newMode = state.mode === "normal" ? "game" : "normal";
          document.documentElement.setAttribute("data-mode", newMode);
          return { mode: newMode };
        });
      },
      initializeFromURL: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const modeParam = urlParams.get("mode");

        if (modeParam === "game" || modeParam === "normal") {
          set({ mode: modeParam });
          document.documentElement.setAttribute("data-mode", modeParam);

          // Remove the mode parameter
          urlParams.delete("mode");

          // Construct new URL without the mode param
          const newUrl = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;
          // Update URL without reload
          window.history.replaceState({}, "", newUrl);
        }
      },
    }),
    {
      name: "portfolio-mode",
    }
  )
);

// Initialize from URL on load
if (typeof window !== "undefined") {
  useModeStore.getState().initializeFromURL();
}

export function useMode() {
  return useModeStore();
}
