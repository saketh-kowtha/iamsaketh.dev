import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: false
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og-image.svg', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Saketh - Full-Stack Developer',
        short_name: 'Saketh',
        description: 'Full-Stack Developer & System Architect specializing in scalable web applications, cloud infrastructure, and modern development solutions.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/?source=pwa',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Portfolio',
            short_name: 'Portfolio',
            description: 'View my portfolio',
            url: '/home?source=pwa',
            icons: [{ src: 'favicon.svg', sizes: '96x96' }]
          },
          {
            name: 'Game Mode',
            short_name: 'Game Mode',
            description: 'Switch to game mode',
            url: '/home?mode=game&source=pwa',
            icons: [{ src: 'favicon.svg', sizes: '96x96' }]
          }
        ],
        categories: ['portfolio', 'developer', 'technology']
      }
    })
  ],
})
