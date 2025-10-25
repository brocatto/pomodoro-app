import { useEffect } from 'react'

export const useMediaSession = ({
  title,
  artist,
  album,
  artwork,
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onSkipForward,
  onSkipBackward
}) => {
  useEffect(() => {
    // Check if Media Session API is supported
    if (!('mediaSession' in navigator)) {
      console.log('Media Session API not supported')
      return
    }

    // Set metadata
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title || 'Focus Session',
      artist: artist || 'GettingShitDone',
      album: album || 'Pomodoro Timer',
      artwork: artwork || [
        { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
        { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
      ]
    })

    // Set playback state
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'

    // Set action handlers
    if (onPlay) {
      navigator.mediaSession.setActionHandler('play', () => {
        console.log('Media Session: Play')
        onPlay()
      })
    }

    if (onPause) {
      navigator.mediaSession.setActionHandler('pause', () => {
        console.log('Media Session: Pause')
        onPause()
      })
    }

    if (onStop) {
      navigator.mediaSession.setActionHandler('stop', () => {
        console.log('Media Session: Stop')
        onStop()
      })
    }

    if (onSkipForward) {
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        console.log('Media Session: Next')
        onSkipForward()
      })
    }

    if (onSkipBackward) {
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        console.log('Media Session: Previous')
        onSkipBackward()
      })
    }

    // Seek controls (optional, for fine-grained control)
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      console.log('Media Session: Seek to', details.seekTime)
      // Could implement seek if needed
    })

    // Cleanup
    return () => {
      // Clear metadata when component unmounts
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = null
        navigator.mediaSession.setActionHandler('play', null)
        navigator.mediaSession.setActionHandler('pause', null)
        navigator.mediaSession.setActionHandler('stop', null)
        navigator.mediaSession.setActionHandler('nexttrack', null)
        navigator.mediaSession.setActionHandler('previoustrack', null)
        navigator.mediaSession.setActionHandler('seekto', null)
      }
    }
  }, [title, artist, album, artwork, isPlaying, onPlay, onPause, onStop, onSkipForward, onSkipBackward])

  // Method to update position (call this when timer updates)
  const updatePositionState = (duration, position) => {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
      try {
        navigator.mediaSession.setPositionState({
          duration: duration, // Total duration in seconds
          playbackRate: 1.0,
          position: position // Current position in seconds
        })
      } catch (error) {
        console.log('Failed to update position state:', error)
      }
    }
  }

  return {
    isSupported: 'mediaSession' in navigator,
    updatePositionState
  }
}
