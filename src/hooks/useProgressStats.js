import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pomodoro_progress'

export const useProgressStats = () => {
  const [stats, setStats] = useState({
    sessions: [], // Array of { date: 'YYYY-MM-DD', timestamp: number, type: 'work' | 'break', duration: number }
    totalPomodoros: 0,
    totalMinutes: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastSessionDate: null,
  })

  // Load stats from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setStats(calculateStats(data.sessions || []))
      } catch (e) {
        console.error('Error loading stats:', e)
      }
    }
  }, [])

  // Calculate all stats from sessions
  const calculateStats = (sessions) => {
    if (sessions.length === 0) {
      return {
        sessions: [],
        totalPomodoros: 0,
        totalMinutes: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastSessionDate: null,
      }
    }

    const workSessions = sessions.filter(s => s.type === 'work')
    const totalPomodoros = workSessions.length
    const totalMinutes = workSessions.reduce((sum, s) => sum + s.duration, 0)

    // Get unique dates sorted
    const uniqueDates = [...new Set(sessions.map(s => s.date))].sort()
    const lastSessionDate = uniqueDates[uniqueDates.length - 1]

    // Calculate streaks
    const { currentStreak, bestStreak } = calculateStreaks(uniqueDates)

    return {
      sessions,
      totalPomodoros,
      totalMinutes,
      currentStreak,
      bestStreak,
      lastSessionDate,
    }
  }

  // Calculate current and best streaks
  const calculateStreaks = (sortedDates) => {
    if (sortedDates.length === 0) return { currentStreak: 0, bestStreak: 0 }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    let currentStreak = 0
    let bestStreak = 0
    let tempStreak = 1

    // Check if there's activity today or yesterday to start counting
    const lastDate = sortedDates[sortedDates.length - 1]
    if (lastDate !== todayStr && lastDate !== yesterdayStr) {
      currentStreak = 0
    } else {
      // Count backwards from last date
      for (let i = sortedDates.length - 1; i > 0; i--) {
        const current = new Date(sortedDates[i])
        const previous = new Date(sortedDates[i - 1])
        const diffDays = Math.floor((current - previous) / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          tempStreak++
        } else {
          break
        }
      }
      currentStreak = tempStreak
    }

    // Calculate best streak
    tempStreak = 1
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i])
      const previous = new Date(sortedDates[i - 1])
      const diffDays = Math.floor((current - previous) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        tempStreak++
        bestStreak = Math.max(bestStreak, tempStreak)
      } else {
        tempStreak = 1
      }
    }
    bestStreak = Math.max(bestStreak, currentStreak, 1)

    return { currentStreak, bestStreak }
  }

  // Add a new session
  const addSession = (type, duration) => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]

    const newSession = {
      date: dateStr,
      timestamp: now.getTime(),
      type, // 'work' or 'break'
      duration, // in minutes
    }

    const updatedSessions = [...stats.sessions, newSession]
    const updatedStats = calculateStats(updatedSessions)

    setStats(updatedStats)

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions: updatedSessions }))

    return updatedStats
  }

  // Get sessions for last N days
  const getLastNDaysSessions = (days) => {
    const result = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const daySessions = stats.sessions.filter(s => s.date === dateStr && s.type === 'work')
      result.push({
        date: dateStr,
        count: daySessions.length,
        minutes: daySessions.reduce((sum, s) => sum + s.duration, 0),
      })
    }

    return result
  }

  // Get heatmap data for last N days
  const getHeatmapData = (days) => {
    const result = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const daySessions = stats.sessions.filter(s => s.date === dateStr && s.type === 'work')
      result.push({
        date: dateStr,
        count: daySessions.length,
        day: date.getDay(), // 0 = Sunday
        weekNumber: Math.floor(i / 7),
      })
    }

    return result
  }

  // Get average pomodoros per day (last 30 days)
  const getAveragePerDay = () => {
    const last30Days = getLastNDaysSessions(30)
    const daysWithActivity = last30Days.filter(d => d.count > 0).length
    if (daysWithActivity === 0) return 0

    const totalPomodoros = last30Days.reduce((sum, d) => sum + d.count, 0)
    return (totalPomodoros / daysWithActivity).toFixed(1)
  }

  // Get weekly trend (last 4 weeks)
  const getWeeklyTrend = () => {
    const weeks = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let week = 0; week < 4; week++) {
      let weekTotal = 0
      for (let day = 0; day < 7; day++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (week * 7 + day))
        const dateStr = date.toISOString().split('T')[0]
        const daySessions = stats.sessions.filter(s => s.date === dateStr && s.type === 'work')
        weekTotal += daySessions.length
      }
      weeks.unshift({
        weekLabel: week === 0 ? 'This week' : `${week + 1}w ago`,
        total: weekTotal
      })
    }

    return weeks
  }

  // Get total hours (formatted)
  const getTotalHours = () => {
    const hours = Math.floor(stats.totalMinutes / 60)
    return hours
  }

  // Get best day info
  const getBestDay = () => {
    if (stats.sessions.length === 0) return null

    const dayTotals = {}
    stats.sessions.filter(s => s.type === 'work').forEach(session => {
      if (!dayTotals[session.date]) {
        dayTotals[session.date] = 0
      }
      dayTotals[session.date]++
    })

    let bestDate = null
    let bestCount = 0
    Object.entries(dayTotals).forEach(([date, count]) => {
      if (count > bestCount) {
        bestCount = count
        bestDate = date
      }
    })

    return { date: bestDate, count: bestCount }
  }

  return {
    stats,
    addSession,
    getLastNDaysSessions,
    getHeatmapData,
    getAveragePerDay,
    getWeeklyTrend,
    getTotalHours,
    getBestDay,
  }
}
