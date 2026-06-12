import { useState, useEffect } from 'react'

import PlayButton from './components/PlayButton'
import RankingButton from './components/RankingButton'
import LastGamesButton from './components/LastGamesButton'
import Map from './components/Map'
import TextArea from './components/TextArea'
import ButtonComposition from './components/ButtonComposition'
import ConnectionsPanel from './components/Connections'

import './App.css'

const instructionText = "esempio di istruzioni, placeholder"

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
        const items = data.map((c, i) => `${c.stationA.name} - ${c.stationB.name}`)
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
      <Map/>
      {!playing && (
        <div className='setup-phase-ui'>
          <TextArea text={instructionText}/>
          <ButtonComposition>
            <LastGamesButton/>
            <RankingButton/>
            <PlayButton setPlaying={setPlaying} />
          </ButtonComposition>
        </div>
      )}

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
