import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './AppWrapper.jsx'
import { LanguageProvider } from './contexts/LanguageContext'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AppWrapper />
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
)
