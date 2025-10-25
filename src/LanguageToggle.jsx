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
        {String.fromCodePoint(0x1F1FA, 0x1F1F8)}
      </span>
      <span className={`flag ${language === 'pt-BR' ? 'active' : ''}`}>
        {String.fromCodePoint(0x1F1E7, 0x1F1F7)}
      </span>
    </button>
  )
}

export default LanguageToggle
