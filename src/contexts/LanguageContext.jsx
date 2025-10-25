import { createContext, useContext, useState } from 'react'
import { translations } from '../locales/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en-US')

  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== 'string') {
      return value || key
    }

    // Replace {{variable}} with params
    return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return params[variable] !== undefined ? params[variable] : match
    })
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en-US' ? 'pt-BR' : 'en-US')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
