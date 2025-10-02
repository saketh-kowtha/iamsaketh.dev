import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { inject } from '@vercel/analytics'

inject()

// Service worker is automatically registered by vite-plugin-pwa

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
