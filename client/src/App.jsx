import { useState } from 'react'

import PlayButton from './components/PlayButton'
import Map from './components/Map'

import './App.css'

function App() {
  
  return (
    <>
    <header>
      <p>logo</p>
      <p>userIcon</p>
    </header>
    
    <div className="wrapper">
      <Map/>
      <main>
        <PlayButton handleStartPlay={console.log("Play button pressed!")} />
      </main>
    </div>

    <footer>

    </footer>
    </>
  )
}

export default App
