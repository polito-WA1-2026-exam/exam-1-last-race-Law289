
import './styles/Map.css'

function Map({playing}) {
    return (
        <>
          { !playing && <img className="gameMap"
            src="/imgs/NetworkMapFull.png" 
            alt="network map not found"/>
          }

          { playing && <img className="gameMap"
            src="/imgs/NetworkMapStationsOnly.png"
            alt="stations map not found"/>
          }
        </>
    )
}

export default Map