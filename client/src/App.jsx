
import { useState, useEffect } from 'react'

import SetupUI from './components/SetupUI'
import PlanningUI from './components/PlanningUI'

import './App.css'

function App() {
  
  const [playing, setPlaying] = useState(false);
  const [connections, setConnections] = useState([])
  const [loadingConnections, setLoadingConnections] = useState(false)
  const [connError, setConnError] = useState(null)
  const [targetPair, setTargetPair] = useState([])

  useEffect(() => {
    if (!playing) return;
    setLoadingConnections(true)
    setConnError(null)
    fetch('http://localhost:3001/game/planning')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setTargetPair(data.randomPair)
        const items = data.connections.map(connection => ({
          top: connection.stationA.name,
          bottom: connection.stationB.name,
          lineColor: connection.line?.color || '#000',
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
        
      { playing && (
        <PlanningUI 
          showConnection={playing} 
          connError={connError} 
          loadingConnections={loadingConnections} 
          connections={connections}
          targetPair={targetPair}
        />
      )}
    </main>

    <footer>

    </footer>
    </>
  )
}

export default App
