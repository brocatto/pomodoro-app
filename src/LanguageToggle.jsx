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
      <span className={`lang ${language === 'en-US' ? 'active' : ''}`}>
        EN
      </span>
      <span className="separator">/</span>
      <span className={`lang ${language === 'pt-BR' ? 'active' : ''}`}>
        PT
      </span>
    </button>
  )
}

export default LanguageToggle
