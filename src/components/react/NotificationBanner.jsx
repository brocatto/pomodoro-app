import { useState, useEffect } from 'react'
import { useLanguage } from './contexts/LanguageContext'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

function NotificationBanner({ permission, onRequestPermission, getDaysSinceLastUse }) {
  const { t } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showWelcomeBack, setShowWelcomeBack] = useState(false)
  const [daysSinceLastUse, setDaysSinceLastUse] = useState(0)

  // Load dismissed state from localStorage on mount
  useEffect(() => {
    if (isBrowser) {
      setDismissed(localStorage.getItem('notificationBannerDismissed') === 'true')
    }
  }, [])

  useEffect(() => {
    // Check if user has been away
    const days = getDaysSinceLastUse()
    setDaysSinceLastUse(days)

    if (days >= 3) {
      setShowWelcomeBack(true)
      // Auto-hide after 8 seconds
      setTimeout(() => setShowWelcomeBack(false), 8000)
    }

    // Show permission banner if not granted and not dismissed
    if (permission === 'default' && !dismissed) {
      setShowBanner(true)
    }
  }, [permission, dismissed, getDaysSinceLastUse])

  const handleActivate = async () => {
    const granted = await onRequestPermission()
    if (granted) {
      setShowBanner(false)
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    setDismissed(true)
    if (isBrowser) {
      localStorage.setItem('notificationBannerDismissed', 'true')
    }
  }

  if (showWelcomeBack) {
    return (
      <div className="notification-banner welcome-back">
        <div className="banner-content">
          <span className="banner-icon">👋</span>
          <div className="banner-text">
            <strong>{t('notifications.welcomeBack.title')}</strong>
            <p>{t('notifications.welcomeBack.message', { days: daysSinceLastUse })}</p>
          </div>
          <button
            className="banner-close"
            onClick={() => setShowWelcomeBack(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    )
  }

  if (!showBanner) return null

  return (
    <div className="notification-banner">
      <div className="banner-content">
        <span className="banner-icon">🔔</span>
        <div className="banner-text">
          <strong>{t('notifications.banner.title')}</strong>
          <p>{t('notifications.banner.description')}</p>
        </div>
        <div className="banner-actions">
          <button onClick={handleActivate} className="banner-btn primary">
            {t('notifications.banner.activate')}
          </button>
          <button onClick={handleDismiss} className="banner-btn secondary">
            {t('notifications.banner.notNow')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationBanner
