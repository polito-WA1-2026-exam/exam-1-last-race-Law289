
import './styles/PlanningUI.css'

import ConnectionsPanel from './Connections'
import Map from './Map'

function PlanningUI({ showConnection, connError, loadingConnections, connections, targetPair }) {
    return (
    <>
      <p className="gameTarget">{targetPair?.stationA?.name ?? ''} - {targetPair?.stationB?.name ?? ''}</p>
      <Map playing={true}/>
      <ConnectionsPanel 
        showConnection={showConnection} 
        connError={connError} 
        loadingConnections={loadingConnections} 
        connections={connections}
      />
    </>)
}

export default PlanningUI