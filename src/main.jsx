import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './AppWrapper.jsx'
import { LanguageProvider } from './contexts/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import { registerServiceWorker } from './registerSW'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AppWrapper />
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
)

// Register service worker for PWA
registerServiceWorker()
