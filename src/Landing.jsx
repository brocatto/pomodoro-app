import './Landing.css'
import { useLanguage } from './contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

function Landing({ onEnterApp }) {
  const { t } = useLanguage()

  return (
    <div className="landing">
      {/* Floating Header with Glassmorphism */}
      <header className="landing-header">
        <div className="header-content">
          <h1 className="logo">{t('landing.logo')}</h1>
          <div className="header-actions">
            <LanguageToggle />
            <button className="cta-btn" onClick={onEnterApp}>
              {t('landing.startNow')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            {t('landing.hero.title1')}<br />
            {t('landing.hero.title2')}
          </h2>
          <p className="hero-subtitle">
            {t('landing.hero.subtitle')}
          </p>
          <button className="hero-cta" onClick={onEnterApp}>
            {t('landing.hero.cta')}
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefit">
          <span className="benefit-icon">⏱️</span>
          <h3>{t('landing.benefits.focus.title')}</h3>
          <p>{t('landing.benefits.focus.description')}</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">🎵</span>
          <h3>{t('landing.benefits.sounds.title')}</h3>
          <p>{t('landing.benefits.sounds.description')}</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">✓</span>
          <h3>{t('landing.benefits.track.title')}</h3>
          <p>{t('landing.benefits.track.description')}</p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <h2>{t('landing.finalCta.title')}</h2>
        <button className="cta-large" onClick={onEnterApp}>
          {t('landing.finalCta.button')}
        </button>
        <p className="cta-note">{t('landing.finalCta.note')}</p>
      </section>
    </div>
  )
}

export default Landing
