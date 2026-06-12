
import { useState, useEffect } from 'react'

import SetupUI from './components/SetupUI'
import ConnectionsPanel from './components/Connections'

import './App.css'

function App() {
  
  const [playing, setPlaying] = useState(false);
  const [connections, setConnections] = useState([])
  const [loadingConnections, setLoadingConnections] = useState(false)
  const [connError, setConnError] = useState(null)

  useEffect(() => {
    if (!playing) return;
    setLoadingConnections(true)
    setConnError(null)
    fetch('http://localhost:3001/connections')
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok')
        return r.json()
      })
      .then(data => {
        const items = data.map(c => ({
          top: c.stationA.name,
          bottom: c.stationB.name,
          lineColor: c.line?.color || '#000',
        }))
        setConnections(items)
      })
      .catch(err => setConnError(err.message))
      .finally(() => setLoadingConnections(false))
  }, [playing])

  return (
    <>
    <header>
      <p>logo</p>
      <p>userIcon</p>
    </header>
    
    <main>
      { !playing && 
        <SetupUI setPlaying={setPlaying}/> }
        
      <ConnectionsPanel 
        showConnection={playing} 
        connError={connError} 
        loadingConnections={loadingConnections} 
        connections={connections}
      />
    </main>

    <footer>

    </footer>
    </>
  )
}

export default App
