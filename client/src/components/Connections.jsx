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
    ? items.map((item, i) => {
        const top = typeof item === 'string' ? item.split(' - ')[0] : item.top
        const bottom = typeof item === 'string' ? item.split(' - ')[1] : item.bottom
        const borderColor = typeof item === 'string' ? '#000' : item.lineColor || '#000'
        return (
          <button className="connection-item" key={i} style={{ borderColor }}>
            <span className="connection-item-top">{top}</span>
            <span className="connection-item-separator">-</span>
            <span className="connection-item-bottom">{bottom}</span>
          </button>
        )
      })
    : React.Children.map(children, (child, i) => (
        <button className="connection-item" key={i}>{child}</button>
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
