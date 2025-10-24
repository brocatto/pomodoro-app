import { useState } from 'react'
import Landing from './Landing'
import App from './App'

function AppWrapper() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <App />
  }

  return <Landing onEnterApp={() => setShowApp(true)} />
}

export default AppWrapper
