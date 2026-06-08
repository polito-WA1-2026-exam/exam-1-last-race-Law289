
import './styles/PlayButton.css'

function playButton({handleStartPlay}) {
    return (
        <>
          <button className="PlayButton" onClick={handleStartPlay}>
            Play!
          </button>
        </>
    )
}

export default playButton