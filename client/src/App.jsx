import { useState } from 'react'

import PlayButton from './components/PlayButton'
import RankingButton from './components/RankingButton'
import LastGamesButton from './components/LastGamesButton'
import Map from './components/Map'
import TextArea from './components/TextArea'
import ButtonComposition from './components/ButtonComposition'

import './App.css'

const instructionText = "esempio di istruzioni, placeholder"

function App() {
  
  return (
    <>
    <header>
      <p>logo</p>
      <p>userIcon</p>
    </header>
    
    <main>
      <Map/>
      <div className='static'>
        <TextArea text={instructionText}/>
        <ButtonComposition>
          <PlayButton/>
          <LastGamesButton/>
          <RankingButton/>
          <PlayButton/>
        </ButtonComposition>
      </div>
    </main>

    <footer>

    </footer>
    </>
  )
}

export default App
