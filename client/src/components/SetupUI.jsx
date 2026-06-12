
import './styles/SetupUI.css'

import Map from './Map'
import TextArea from './TextArea'
import ButtonComposition from './ButtonComposition'
import LastGamesButton from './LastGamesButton'
import RankingButton from './RankingButton'
import PlayButton from './PlayButton'

const instructionText = "esempio di istruzioni, placeholder"

function SetupUI({setPlaying}) {
    return (
      <>
        <Map playing={false}/>
        <div className='setup-phase-ui'>
          <TextArea text={instructionText}/>
          <ButtonComposition>
            <LastGamesButton/>
            <RankingButton/>
            <PlayButton setPlaying={setPlaying} />
          </ButtonComposition>
        </div>
      </>
    )
}

export default SetupUI