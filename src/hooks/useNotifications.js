import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pomodoroApp'

export function useNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  )
  const [isEnabled, setIsEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data.notificationsEnabled ?? true
    }
    return true
  })

  const isSupported = typeof Notification !== 'undefined'

  // Update last used timestamp
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : {}

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      lastUsed: Date.now()
    }))
  }, [])

  const requestPermission = async () => {
    if (!isSupported) {
      console.warn('Notifications not supported')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  const sendNotification = (title, body, options = {}) => {
    if (!isSupported || permission !== 'granted' || !isEnabled) {
      return
    }

    try {
      const notification = new Notification(title, {
        body,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        ...options
      })

      // Auto-close after 5 seconds
      setTimeout(() => notification.close(), 5000)

      return notification
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }

  const toggleNotifications = () => {
    const newState = !isEnabled
    setIsEnabled(newState)

    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : {}

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      notificationsEnabled: newState
    }))
  }

  const getDaysSinceLastUse = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return 0

    const data = JSON.parse(stored)
    if (!data.lastUsed) return 0

    const daysDiff = Math.floor((Date.now() - data.lastUsed) / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  return {
    permission,
    isSupported,
    isEnabled,
    requestPermission,
    sendNotification,
    toggleNotifications,
    getDaysSinceLastUse
  }
}
