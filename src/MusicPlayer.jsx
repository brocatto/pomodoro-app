import { useState, useEffect, useRef } from 'react'

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)

  const tracks = [
    {
      name: 'Focus Glow',
      description: 'Lofi beats for deep concentration',
      artist: 'Lofi Collection',
      file: '/music/track1.mp3'
    },
    {
      name: 'Floating High',
      description: 'Ambient soundscape for productivity',
      artist: 'Meditation Series',
      file: '/music/track2.mp3'
    },
    {
      name: 'Alpha Waves - 11Hz',
      description: 'Binaural waves for relaxed focus',
      artist: 'Simply Meditation',
      file: '/music/track3.mp3'
    },
    {
      name: 'Beta Waves - Focus',
      description: 'Binaural waves for improved concentration',
      artist: 'Simply Meditation',
      file: '/music/track4.mp3'
    },
    {
      name: '33Hz Binaural Beat',
      description: 'Deep frequency tone for enhanced focus',
      artist: 'Binaural Collection',
      file: '/music/track5.mp3'
    }
  ]

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => nextTrack()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(err => {
        console.error('Error playing audio:', err)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrackIndex])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
  }

  const selectTrack = (index) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audio.currentTime = percentage * duration
  }

  return (
    <div className="music-player glass-card">
      <audio
        ref={audioRef}
        src={currentTrack.file}
        preload="metadata"
      />

      <div className="player-header">
        <h3>Focus Music</h3>
        <span className="player-subtitle">Lofi & ambient beats for concentration</span>
      </div>

      <div className="track-info">
        <div className="track-name">{currentTrack.name}</div>
        <div className="track-description">{currentTrack.description}</div>
        <div className="track-artist">{currentTrack.artist}</div>
      </div>

      <div className="progress-bar-container" onClick={handleProgressClick}>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>
        <div className="progress-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="player-btn" onClick={prevTrack}>
          ⏮
        </button>
        <button className="player-btn play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="player-btn" onClick={nextTrack}>
          ⏭
        </button>
      </div>

      <div className="volume-control">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
        <span className="volume-value">{Math.round(volume * 100)}%</span>
      </div>

      <div className="playlist">
        <div className="playlist-header">Playlist</div>
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => selectTrack(index)}
          >
            <div className="playlist-item-number">{index + 1}</div>
            <div className="playlist-item-info">
              <div className="playlist-item-name">{track.name}</div>
              <div className="playlist-item-meta">{track.artist}</div>
            </div>
            {index === currentTrackIndex && isPlaying && (
              <div className="playing-indicator">♪</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicPlayer
