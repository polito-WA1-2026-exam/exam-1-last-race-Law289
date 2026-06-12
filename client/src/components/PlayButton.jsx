
import './styles/PlayButton.css'

function PlayButton({ setPlaying }) {
  const handleClick = () => {
    setPlaying(prev => !prev)
  }

  return (
    <button className="PlayButton" onClick={handleClick}>
      Play!
    </button>
  )
}

export default PlayButton