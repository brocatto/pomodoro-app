import { useState } from 'react'
import Landing from './Landing'
import App from './App'
import Dashboard from './Dashboard'
import Protocol from './Protocol'

function AppWrapper() {
  const [showApp, setShowApp] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showProtocol, setShowProtocol] = useState(false)

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />
  }

  if (showProtocol) {
    return (
      <Protocol
        onBack={() => setShowProtocol(false)}
        onEnterApp={() => {
          setShowProtocol(false)
          setShowApp(true)
        }}
      />
    )
  }

  if (showApp) {
    return <App onShowDashboard={() => setShowDashboard(true)} />
  }

  return (
    <Landing
      onEnterApp={() => setShowApp(true)}
      onShowProtocol={() => setShowProtocol(true)}
    />
  )
}

export default AppWrapper
