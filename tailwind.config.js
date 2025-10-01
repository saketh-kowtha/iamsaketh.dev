/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#0a0a0a',
        onyx: '#1a1a1a',
        ember: '#fbbf24',
        auric: '#d4af37',
        blood: '#7f1d1d',
      },
      boxShadow: {
        glow: '0 0 20px rgba(212,175,55,0.25)',
        ember: '0 0 12px rgba(251,191,36,0.35)',
      },
      fontFamily: {
        gothic: ['Cinzel', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        parchment: "url('/src/assets/images/parchment-texture.png')",
        gothic: "url('/src/assets/images/gothic-pattern.png')",
        grain: "url('/src/assets/images/grain.png')",
        vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)',
      },
      transitionTimingFunction: {
        bonfire: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

