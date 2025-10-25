import { useLanguage } from './contexts/LanguageContext'
import './LanguageToggle.css'

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      title={language === 'en-US' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
    >
      <span className={`flag ${language === 'en-US' ? 'active' : ''}`}>
        🇺🇸
      </span>
      <span className={`flag ${language === 'pt-BR' ? 'active' : ''}`}>
        🇧🇷
      </span>
    </button>
  )
}

export default LanguageToggle
