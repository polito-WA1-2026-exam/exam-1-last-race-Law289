
import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const line1 = new Line({
    id: undefined,
    name: "Linea 1",
    stations: [
        new Station({id: undefined, name: "Porta Nuova"}),
        new Station({id: undefined, name: "Porta Susa"}),
        new Station({id: undefined, name: "Porta Dora"})
    ],
    color: "Red"
})

const line2 = new Line({

})

const network = [
    line1
]

network.forEach(line => await db.addLine(line));