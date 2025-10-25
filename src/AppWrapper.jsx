import { useState } from 'react'
import Landing from './Landing'
import App from './App'
import Dashboard from './Dashboard'

function AppWrapper() {
  const [showApp, setShowApp] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />
  }

  if (showApp) {
    return <App onShowDashboard={() => setShowDashboard(true)} />
  }

  return <Landing onEnterApp={() => setShowApp(true)} />
}

export default AppWrapper
