
import React from 'react'
import './styles/ButtonComposition.css'

function ButtonComposition({ children }) {
    const buttons = React.Children.toArray(children).slice(0, 4)

    return (
        <div className="ButtonComposition">
            {buttons.map((button, index) => (
                <div key={index} className="ButtonComposition__item">
                    {button}
                </div>
            ))}
        </div>
    )
}

export default ButtonComposition
