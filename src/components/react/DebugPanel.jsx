import { useState } from 'react'

function DebugPanel({ onClose, onDataChange }) {
  const [activeTab, setActiveTab] = useState('scenarios')

  // Generate sample data scenarios
  const generateScenario = (scenario) => {
    const sessions = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (scenario) {
      case 'empty':
        // No sessions
        break

      case 'beginner':
        // 3 sessions today
        for (let i = 0; i < 3; i++) {
          sessions.push({
            date: today.toISOString().split('T')[0],
            timestamp: today.getTime() + i * 1000 * 60 * 30,
            type: 'work',
            duration: 25
          })
        }
        break

      case 'active':
        // 5 sessions today, some yesterday
        for (let i = 0; i < 5; i++) {
          sessions.push({
            date: today.toISOString().split('T')[0],
            timestamp: today.getTime() + i * 1000 * 60 * 30,
            type: 'work',
            duration: 25
          })
        }
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        for (let i = 0; i < 3; i++) {
          sessions.push({
            date: yesterday.toISOString().split('T')[0],
            timestamp: yesterday.getTime() + i * 1000 * 60 * 30,
            type: 'work',
            duration: 25
          })
        }
        break

      case 'week_streak':
        // 7 day streak with varying sessions
        for (let day = 0; day < 7; day++) {
          const date = new Date(today)
          date.setDate(date.getDate() - day)
          const dateStr = date.toISOString().split('T')[0]
          const sessionCount = Math.floor(Math.random() * 5) + 2 // 2-6 sessions per day

          for (let i = 0; i < sessionCount; i++) {
            sessions.push({
              date: dateStr,
              timestamp: date.getTime() + i * 1000 * 60 * 30,
              type: 'work',
              duration: 25
            })
          }
        }
        break

      case 'month_consistent':
        // 30 days with sessions
        for (let day = 0; day < 30; day++) {
          const date = new Date(today)
          date.setDate(date.getDate() - day)
          const dateStr = date.toISOString().split('T')[0]
          const sessionCount = Math.floor(Math.random() * 6) + 1 // 1-6 sessions per day

          for (let i = 0; i < sessionCount; i++) {
            sessions.push({
              date: dateStr,
              timestamp: date.getTime() + i * 1000 * 60 * 30,
              type: 'work',
              duration: 25
            })
          }
        }
        break

      case 'broken_streak':
        // Recent activity but broken streak (missed yesterday)
        for (let i = 0; i < 4; i++) {
          sessions.push({
            date: today.toISOString().split('T')[0],
            timestamp: today.getTime() + i * 1000 * 60 * 30,
            type: 'work',
            duration: 25
          })
        }
        // Session 3 days ago
        const threeDaysAgo = new Date(today)
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
        for (let i = 0; i < 2; i++) {
          sessions.push({
            date: threeDaysAgo.toISOString().split('T')[0],
            timestamp: threeDaysAgo.getTime() + i * 1000 * 60 * 30,
            type: 'work',
            duration: 25
          })
        }
        break

      case 'power_user':
        // 60 days of consistent high activity
        for (let day = 0; day < 60; day++) {
          const date = new Date(today)
          date.setDate(date.getDate() - day)
          const dateStr = date.toISOString().split('T')[0]
          const sessionCount = Math.floor(Math.random() * 8) + 4 // 4-11 sessions per day

          for (let i = 0; i < sessionCount; i++) {
            sessions.push({
              date: dateStr,
              timestamp: date.getTime() + i * 1000 * 60 * 30,
              type: 'work',
              duration: 25
            })
          }
        }
        break

      default:
        break
    }

    return sessions
  }

  const applyScenario = (scenario) => {
    const sessions = generateScenario(scenario)
    localStorage.setItem('pomodoro_progress', JSON.stringify({ sessions }))
    onDataChange?.()
  }

  const clearData = () => {
    if (confirm('Are you sure you want to clear all progress data?')) {
      localStorage.removeItem('pomodoro_progress')
      onDataChange?.()
    }
  }

  const addCustomSession = () => {
    const days = parseInt(prompt('How many days ago? (0 = today)', '0'))
    const count = parseInt(prompt('How many sessions?', '1'))

    if (isNaN(days) || isNaN(count)) return

    const stored = localStorage.getItem('pomodoro_progress')
    const data = stored ? JSON.parse(stored) : { sessions: [] }

    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - days)
    const dateStr = date.toISOString().split('T')[0]

    for (let i = 0; i < count; i++) {
      data.sessions.push({
        date: dateStr,
        timestamp: date.getTime() + i * 1000 * 60 * 30,
        type: 'work',
        duration: 25
      })
    }

    localStorage.setItem('pomodoro_progress', JSON.stringify(data))
    onDataChange?.()
  }

  const scenarios = [
    { id: 'empty', name: 'Empty State', description: 'No sessions' },
    { id: 'beginner', name: 'First Day', description: '3 sessions today' },
    { id: 'active', name: 'Active User', description: '5 today, 3 yesterday' },
    { id: 'week_streak', name: '7 Day Streak', description: 'Consistent week' },
    { id: 'broken_streak', name: 'Broken Streak', description: 'Active but missed yesterday' },
    { id: 'month_consistent', name: 'Month Consistent', description: '30 days of activity' },
    { id: 'power_user', name: 'Power User', description: '60 days, high volume' },
  ]

  return (
    <div className="debug-panel-overlay">
      <div className="debug-panel">
        <div className="debug-header">
          <h2>Debug Panel</h2>
          <button className="debug-close" onClick={onClose}>×</button>
        </div>

        <div className="debug-tabs">
          <button
            className={`debug-tab ${activeTab === 'scenarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            Scenarios
          </button>
          <button
            className={`debug-tab ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom
          </button>
        </div>

        <div className="debug-content">
          {activeTab === 'scenarios' && (
            <div className="scenarios-grid">
              {scenarios.map(scenario => (
                <button
                  key={scenario.id}
                  className="scenario-btn"
                  onClick={() => applyScenario(scenario.id)}
                >
                  <div className="scenario-name">{scenario.name}</div>
                  <div className="scenario-description">{scenario.description}</div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="custom-actions">
              <button className="action-btn" onClick={addCustomSession}>
                Add Custom Session
              </button>
              <button className="action-btn danger" onClick={clearData}>
                Clear All Data
              </button>
            </div>
          )}
        </div>

        <div className="debug-footer">
          <p>Changes apply immediately. Refresh to see updates.</p>
        </div>
      </div>
    </div>
  )
}

export default DebugPanel
