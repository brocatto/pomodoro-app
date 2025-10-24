import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [selectedSound, setSelectedSound] = useState('chime')
  const [showSoundSettings, setShowSoundSettings] = useState(false)
  const intervalRef = useRef(null)

  const WORK_TIME = 25
  const BREAK_TIME = 5

  // Sound Library
  const sounds = {
    chime: {
      name: 'Soft Chime',
      description: 'Gentle bell-like sound',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const notes = [
          { freq: 880, time: 0, duration: 1.5, gain: 0.15 },      // A5
          { freq: 1174.66, time: 0.3, duration: 1.5, gain: 0.12 }, // D6
          { freq: 1318.51, time: 0.6, duration: 2, gain: 0.1 },    // E6
        ]

        notes.forEach(note => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = note.freq
          oscillator.type = 'sine'

          gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time)
          gainNode.gain.linearRampToValueAtTime(note.gain, audioContext.currentTime + note.time + 0.05)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration)

          oscillator.start(audioContext.currentTime + note.time)
          oscillator.stop(audioContext.currentTime + note.time + note.duration)
        })
      }
    },
    piano: {
      name: 'Piano Chord',
      description: 'Warm piano-like chord',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        // C major chord
        const notes = [
          { freq: 261.63, gain: 0.12 }, // C4
          { freq: 329.63, gain: 0.10 }, // E4
          { freq: 392.00, gain: 0.08 }, // G4
          { freq: 523.25, gain: 0.06 }, // C5
        ]

        notes.forEach(note => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = note.freq
          oscillator.type = 'triangle'

          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(note.gain, audioContext.currentTime + 0.1)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 2)
        })
      }
    },
    melody: {
      name: 'Success Melody',
      description: 'Uplifting completion tune',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const notes = [
          { freq: 523.25, time: 0, duration: 0.2 },    // C5
          { freq: 659.25, time: 0.2, duration: 0.2 },  // E5
          { freq: 783.99, time: 0.4, duration: 0.2 },  // G5
          { freq: 1046.50, time: 0.6, duration: 0.5 }, // C6
        ]

        notes.forEach(note => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = note.freq
          oscillator.type = 'sine'

          gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time)
          gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + note.time + 0.02)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration)

          oscillator.start(audioContext.currentTime + note.time)
          oscillator.stop(audioContext.currentTime + note.time + note.duration)
        })
      }
    },
    bell: {
      name: 'Gentle Bell',
      description: 'Single soft bell tone',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // Create a bell-like sound using multiple frequencies
        const fundamentals = [800, 1200, 1600]

        fundamentals.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'sine'

          const gain = 0.1 / (i + 1)
          gainNode.gain.setValueAtTime(gain, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 2)
        })
      }
    },
    harp: {
      name: 'Harp Glissando',
      description: 'Cascading harp-like notes',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const notes = [
          { freq: 293.66, time: 0 },    // D4
          { freq: 329.63, time: 0.08 }, // E4
          { freq: 392.00, time: 0.16 }, // G4
          { freq: 493.88, time: 0.24 }, // B4
          { freq: 587.33, time: 0.32 }, // D5
          { freq: 783.99, time: 0.40 }, // G5
        ]

        notes.forEach(note => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = note.freq
          oscillator.type = 'sine'

          gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time)
          gainNode.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + note.time + 0.02)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + 0.8)

          oscillator.start(audioContext.currentTime + note.time)
          oscillator.stop(audioContext.currentTime + note.time + 0.8)
        })
      }
    },
    zen: {
      name: 'Zen Bowl',
      description: 'Meditation singing bowl',
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // Singing bowl harmonics
        const frequencies = [432, 864, 1296, 1728]

        frequencies.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'sine'

          const gain = 0.08 / (i + 1)
          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(gain, audioContext.currentTime + 0.3)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 3)
        })
      }
    }
  }

  // Click sounds
  const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const playPauseSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 500
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  }

  const playCompletionSound = () => {
    if (sounds[selectedSound]) {
      sounds[selectedSound].play()
    }
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            playCompletionSound()

            setIsBreak(!isBreak)
            setMinutes(isBreak ? WORK_TIME : BREAK_TIME)
            setSeconds(0)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, minutes, seconds, isBreak])

  const toggleTimer = () => {
    if (!isActive) {
      playClickSound()
    } else {
      playPauseSound()
    }
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setMinutes(WORK_TIME)
    setSeconds(0)
  }

  const testSound = (soundKey) => {
    if (sounds[soundKey]) {
      sounds[soundKey].play()
    }
  }

  const quickTest = () => {
    setIsActive(false)
    setMinutes(0)
    setSeconds(5)
  }

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progress = isBreak
    ? ((BREAK_TIME * 60 - (minutes * 60 + seconds)) / (BREAK_TIME * 60)) * 100
    : ((WORK_TIME * 60 - (minutes * 60 + seconds)) / (WORK_TIME * 60)) * 100

  // Task management
  const addTask = (e) => {
    e.preventDefault()
    if (newTaskText.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        pomodoros: 0,
        estimatedPomodoros: 1
      }])
      setNewTaskText('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const incrementPomodoro = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
    ))
  }

  return (
    <div className="app">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="container">
        <div className="glass-card">
          <div className="mode-indicator">
            {isBreak ? 'BREAK TIME' : 'FOCUS TIME'}
          </div>

          <div className="timer-section">
            <div className="progress-ring">
              <svg width="320" height="320">
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="3"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 150}`}
                  strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 160 160)"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="timer-display">
                {formatTime(minutes, seconds)}
              </div>
            </div>
          </div>

          <div className="controls">
            <button
              className="control-btn"
              onClick={toggleTimer}
            >
              {isActive ? 'PAUSE' : 'START'}
            </button>
            <button
              className="control-btn secondary"
              onClick={resetTimer}
            >
              RESET
            </button>
          </div>

          <div className="test-controls">
            <button
              className="test-btn"
              onClick={() => setShowSoundSettings(!showSoundSettings)}
            >
              🔊 Sound Settings
            </button>
            <button
              className="test-btn"
              onClick={quickTest}
              title="Set timer to 5 seconds for testing"
            >
              ⚡ Quick Test (5s)
            </button>
          </div>

          {showSoundSettings && (
            <div className="sound-settings">
              <div className="sound-settings-header">
                <h4>Completion Sound</h4>
                <p>Choose your perfect ending</p>
              </div>

              <div className="sound-options">
                {Object.entries(sounds).map(([key, sound]) => (
                  <div key={key} className="sound-option">
                    <div className="sound-info">
                      <label className="sound-radio">
                        <input
                          type="radio"
                          name="sound"
                          value={key}
                          checked={selectedSound === key}
                          onChange={(e) => setSelectedSound(e.target.value)}
                        />
                        <span className="sound-name">{sound.name}</span>
                      </label>
                      <span className="sound-description">{sound.description}</span>
                    </div>
                    <button
                      className="sound-test-btn"
                      onClick={() => testSound(key)}
                      title="Test this sound"
                    >
                      ▶
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="stats">
            <div className="stat-item">
              <div className="stat-label">WORK</div>
              <div className="stat-value">{WORK_TIME}m</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-label">BREAK</div>
              <div className="stat-value">{BREAK_TIME}m</div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="tasks-card glass-card">
          <div className="tasks-header">
            <h3>Tasks</h3>
            <span className="tasks-count">{tasks.filter(t => !t.completed).length} active</span>
          </div>

          <form onSubmit={addTask} className="task-input-form">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What are you working on?"
              className="task-input"
            />
            <button type="submit" className="add-task-btn">+</button>
          </form>

          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <button
                    className="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed && '✓'}
                  </button>
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <div className="task-pomodoros">
                      <button
                        className="pomodoro-btn"
                        onClick={() => incrementPomodoro(task.id)}
                        title="Add pomodoro"
                      >
                        🍅
                      </button>
                      <span className="pomodoro-count">
                        {task.pomodoros}/{task.estimatedPomodoros}
                      </span>
                    </div>
                  </div>
                  <button
                    className="delete-task-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
