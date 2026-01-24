import { useState, useEffect } from 'react'
import { useProgressStats } from './hooks/useProgressStats'
import { useLanguage } from './contexts/LanguageContext'
import Tooltip from './Tooltip'
import DebugPanel from './DebugPanel'

function Dashboard({ onBack }) {
  const {
    stats,
    getLastNDaysSessions,
    getHeatmapData,
    getAveragePerDay,
    getWeeklyTrend,
    getTotalHours,
    getBestDay
  } = useProgressStats()
  const { t } = useLanguage()
  const [showDebug, setShowDebug] = useState(false)

  const last7Days = getLastNDaysSessions(7)
  const heatmapData = getHeatmapData(56) // 8 weeks
  const averagePerDay = getAveragePerDay()
  const weeklyTrend = getWeeklyTrend()
  const totalHours = getTotalHours()
  const bestDay = getBestDay()

  // Listen for 'd' key press to open debug panel
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd' && !showDebug) {
        setShowDebug(true)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [showDebug])

  const handleDataChange = () => {
    window.location.reload()
  }

  // Format hours and minutes from total minutes
  const formatTotalTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  // Get day of week label
  const getDayLabel = (dateStr) => {
    const date = new Date(dateStr)
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    return days[date.getDay()]
  }

  // Check if date is today
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0]
    return dateStr === today
  }

  // Get intensity level for heatmap
  const getIntensity = (count) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 4) return 2
    if (count <= 6) return 3
    return 4
  }

  // Calculate max for chart scaling
  const maxCount = Math.max(...last7Days.map(d => d.count), 1)
  const maxWeekly = Math.max(...weeklyTrend.map(w => w.total), 1)

  // Calculate progress percentage for total hours (goal: 100 hours)
  const hoursGoal = 100
  const hoursProgress = Math.min((totalHours / hoursGoal) * 100, 100)

  return (
    <div className="dashboard">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <button className="back-btn" onClick={onBack}>
            ← {t('dashboard.back') || 'Back'}
          </button>
          <h1 className="dashboard-title">{t('dashboard.title') || 'Your Progress Story'}</h1>
          <div className="back-btn-spacer"></div>
        </div>

        {stats.totalPomodoros === 0 ? (
          /* Empty State */
          <div className="empty-state-full">
            <div className="empty-icon">📊</div>
            <h2>{t('dashboard.emptyState.title') || 'Your journey begins here'}</h2>
            <p>{t('dashboard.emptyState.description') || 'Complete your first session to start tracking your progress and building your focus story.'}</p>
          </div>
        ) : (
          <>
            {/* Hero Stats - The Big Numbers */}
            <div className="hero-stats">
              <Tooltip content={t('dashboard.tooltips.totalSessions') || 'Total completed focus sessions'}>
                <div className="hero-stat primary">
                  <div className="hero-number">{stats.totalPomodoros}</div>
                  <div className="hero-label">{t('dashboard.totalSessions') || 'Sessions Completed'}</div>
                  <div className="hero-subtitle">
                    {t('dashboard.hero.subtitle') || 'Your commitment to focus'}
                  </div>
                </div>
              </Tooltip>

              <div className="hero-secondary">
                <Tooltip content={t('dashboard.tooltips.currentStreak') || 'Consecutive days with activity'}>
                  <div className="hero-stat">
                    <div className="streak-indicator">
                      {stats.currentStreak > 0 ? '🔥' : '💤'}
                    </div>
                    <div className="hero-number small">{stats.currentStreak}</div>
                    <div className="hero-label">{t('dashboard.currentStreak') || 'Day Streak'}</div>
                  </div>
                </Tooltip>

                <Tooltip content={t('dashboard.tooltips.totalTime') || 'Total focused time'}>
                  <div className="hero-stat">
                    <div className="progress-ring-container">
                      <svg className="progress-ring" width="80" height="80">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.5)"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - hoursProgress / 100)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <div className="progress-center">
                        <div className="progress-hours">{totalHours}h</div>
                      </div>
                    </div>
                    <div className="hero-label">{t('dashboard.totalTime') || 'Total Hours'}</div>
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* Activity Heatmap - Consistency Story */}
            <div className="section-card">
              <div className="section-header">
                <h3>{t('dashboard.consistency.title') || 'Consistency Map'}</h3>
                <p className="section-subtitle">
                  {t('dashboard.consistency.subtitle') || 'Your 8-week activity pattern'}
                </p>
              </div>
              <div className="heatmap-container">
                <div className="heatmap-days">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>
                <div className="heatmap-grid">
                  {heatmapData.map((day, index) => (
                    <Tooltip
                      key={index}
                      content={`${day.date}: ${day.count} ${day.count === 1 ? 'session' : 'sessions'}`}
                    >
                      <div
                        className={`heatmap-cell intensity-${getIntensity(day.count)} ${isToday(day.date) ? 'today' : ''}`}
                        data-count={day.count}
                      ></div>
                    </Tooltip>
                  ))}
                </div>
                <div className="heatmap-legend">
                  <span>{t('dashboard.consistency.less') || 'Less'}</span>
                  <div className="legend-cells">
                    <div className="heatmap-cell intensity-0"></div>
                    <div className="heatmap-cell intensity-1"></div>
                    <div className="heatmap-cell intensity-2"></div>
                    <div className="heatmap-cell intensity-3"></div>
                    <div className="heatmap-cell intensity-4"></div>
                  </div>
                  <span>{t('dashboard.consistency.more') || 'More'}</span>
                </div>
              </div>
            </div>

            {/* Weekly Trend - Progress Story */}
            <div className="section-card">
              <div className="section-header">
                <h3>{t('dashboard.trend.title') || 'Weekly Momentum'}</h3>
                <p className="section-subtitle">
                  {t('dashboard.trend.subtitle') || 'How your focus is evolving'}
                </p>
              </div>
              <div className="weekly-trend">
                {weeklyTrend.map((week, index) => (
                  <div key={index} className="trend-week">
                    <div className="trend-bar-container">
                      <div
                        className="trend-bar"
                        style={{
                          height: `${week.total > 0 ? (week.total / maxWeekly) * 100 : 3}%`
                        }}
                      >
                        {week.total > 0 && (
                          <span className="trend-value">{week.total}</span>
                        )}
                      </div>
                    </div>
                    <div className="trend-label">{week.weekLabel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights - The Story in Numbers */}
            <div className="insights-grid">
              <Tooltip content={t('dashboard.tooltips.avgPerDay') || 'Average sessions per active day'}>
                <div className="insight-card">
                  <div className="insight-icon">📈</div>
                  <div className="insight-number">{averagePerDay}</div>
                  <div className="insight-label">{t('dashboard.avgPerDay') || 'Avg / Day'}</div>
                </div>
              </Tooltip>

              <div className="insight-card">
                <div className="insight-icon">🏆</div>
                <div className="insight-number">{stats.bestStreak}</div>
                <div className="insight-label">{t('dashboard.bestStreak') || 'Best Streak'}</div>
              </div>

              {bestDay && (
                <div className="insight-card">
                  <div className="insight-icon">⭐</div>
                  <div className="insight-number">{bestDay.count}</div>
                  <div className="insight-label">{t('dashboard.bestDay') || 'Best Day'}</div>
                  <div className="insight-meta">{bestDay.date}</div>
                </div>
              )}
            </div>

            {/* Motivational Message */}
            <div className="motivation-card">
              {stats.currentStreak > 0 ? (
                <p>
                  {stats.currentStreak >= 7
                    ? `🔥 ${stats.currentStreak} ${t('dashboard.days')} ${t('dashboard.motivation.great') || 'of consistency. You\'re unstoppable.'}`
                    : stats.currentStreak >= 3
                    ? `✨ ${stats.currentStreak} ${t('dashboard.days')} ${t('dashboard.motivation.good') || 'strong. Keep the momentum.'}`
                    : `💪 ${stats.currentStreak} ${t('dashboard.days')} ${t('dashboard.motivation.start') || 'streak. You\'re building discipline.'}`
                  }
                </p>
              ) : (
                <p>{t('dashboard.motivation.comeback') || 'Ready to start a new streak?'}</p>
              )}
            </div>
          </>
        )}

        {/* Debug Panel */}
        {showDebug && (
          <DebugPanel
            onClose={() => setShowDebug(false)}
            onDataChange={handleDataChange}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
