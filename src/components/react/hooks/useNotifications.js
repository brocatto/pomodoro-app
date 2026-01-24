import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pomodoroApp'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

export function useNotifications() {
  const [permission, setPermission] = useState('denied')
  const [isEnabled, setIsEnabled] = useState(true)

  const isSupported = isBrowser && typeof Notification !== 'undefined'

  // Initialize from localStorage on mount (client-side only)
  useEffect(() => {
    if (!isBrowser) return

    // Set initial permission
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission)
    }

    // Load enabled state from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setIsEnabled(data.notificationsEnabled ?? true)
      } catch (e) {
        console.error('Error loading notification settings:', e)
      }
    }

    // Update last used timestamp
    const storedData = stored ? JSON.parse(stored) : {}
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...storedData,
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
    if (!isBrowser) return

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
    if (!isBrowser) return 0

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return 0

    try {
      const data = JSON.parse(stored)
      if (!data.lastUsed) return 0

      const daysDiff = Math.floor((Date.now() - data.lastUsed) / (1000 * 60 * 60 * 24))
      return daysDiff
    } catch (e) {
      return 0
    }
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
