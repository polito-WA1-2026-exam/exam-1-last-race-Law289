import React from 'react'
import './styles/Connections.css'

function ConnectionsPanel({showConnection, loadingConnections, connError, connections}) {
    return (
        <>
            {showConnection && (
            <div className="game-ui">
                {loadingConnections && <p>Loading connections...</p>}
                {connError && <p className="error">{connError}</p>}
                {!loadingConnections && !connError && (
                    <Connections columns={5} items={connections} />
                )}
            </div>
        )}
        </>
    )
}

function Connections({ columns = 3, items, children }) {
  const elements = items
    ? items.map((it, i) => (
        <div className="connection-item" key={i}>{it}</div>
      ))
    : React.Children.map(children, (child, i) => (
        <div className="connection-item" key={i}>{child}</div>
      ))

  return (
    <div
      className="connections-grid"
      style={{ gridTemplateColumns: `repeat(${Math.max(1, columns)}, 1fr)` }}
    >
      {elements}
    </div>
  )
}

export default ConnectionsPanel
