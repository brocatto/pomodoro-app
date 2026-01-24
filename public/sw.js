// Service Worker for GettingShitDone Pomodoro Timer
const CACHE_NAME = 'gettingshitdone-v2'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/favicon.svg'
]

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.log('Cache failed:', error)
      })
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  // Take control of all pages immediately
  return self.clients.claim()
})

// Helper to identify static assets (cache-first strategy)
function isStaticAsset(url) {
  return url.match(/\.(mp3|wav|ogg|png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/) ||
         url.includes('/music/')
}

// Fetch event - hybrid strategy
// Static assets (images, fonts, music): cache-first
// HTML/JS/CSS: network-first (ensures code updates are received)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Static assets: cache-first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // HTML/JS/CSS: network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request))
  )
})

// Background sync for timer (experimental)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-timer') {
    event.waitUntil(
      // Sync timer state if needed
      Promise.resolve()
    )
  }
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  // Handle timer updates
  if (event.data && event.data.type === 'TIMER_UPDATE') {
    // Store timer state for persistence
    const timerState = event.data.state
    // Could sync with IndexedDB here
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If a window is already open, focus it
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === '/' && 'focus' in client) {
            return client.focus()
          }
        }
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow('/')
        }
      })
  )
})
