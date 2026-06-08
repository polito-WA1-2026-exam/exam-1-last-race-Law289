
/*
Ran by command line with 'npm run db-populate' or 'npm run db-fill' to fill the 
database with initial static data, like the network
*/

import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const line1 = new Line({
    id: undefined,
    name: "Interline East",
    stations: [
        new Station({id: undefined, name: "Easter Field"}),
        new Station({id: undefined, name: "White Palace"}),
        new Station({id: undefined, name: "Rue of Will"}),
        new Station({id: undefined, name: "Davin Station"}),
        new Station({id: undefined, name: "Great City"})
    ],
    color: "Purple"
})

const line2 = new Line({
    id: undefined,
    name: "Central Line South",
    stations: [
        new Station({id: undefined, name: "Garren Station"}),
        new Station({id: undefined, name: "Lord's Terrain"}),
        new Station({id: undefined, name: "Canyon Boulevard"}),
        new Station({id: undefined, name: "Point Square"}),
        new Station({id: undefined, name: "Rue of Will"}),
        new Station({id: undefined, name: "Rose Church"})
    ],
    color: "Yellow"
})

const line3 = new Line({
    id: undefined,
    name: "South Line",
    stations: [
        new Station({id: undefined, name: "Easter Field"}),
        new Station({id: undefined, name: "White Palace"}),
        new Station({id: undefined, name: "Deep Docks"}),
        new Station({id: undefined, name: "Lord's Terrain"}),
        new Station({id: undefined, name: "Waterfalls"})
    ],
    color: "Green"
})

const line4 = new Line({
    id: undefined,
    name: "Top-Down Line",
    stations: [
        new Station({id: undefined, name: "City Walls"}),
        new Station({id: undefined, name: "September Street"}),
        new Station({id: undefined, name: "Point Square"}),
        new Station({id: undefined, name: "Deep Docks"}),
        new Station({id: undefined, name: "Summer Bay"})
    ],
    color: "Red"
})

const line5 = new Line({
    id: undefined,
    name: "Central Line North",
    stations: [
        new Station({id: undefined, name: "Upper Plaza"}),
        new Station({id: undefined, name: "Canyon Boulevard"}),
        new Station({id: undefined, name: "Point Square"}),
        new Station({id: undefined, name: "Obelisk"}),
        new Station({id: undefined, name: "Davin Station"}),
        new Station({id: undefined, name: "Davin Farm"})
    ],
    color: "Orange"
})

const network = [
    line1,
    line2,
    line3,
    line4,
    line5
]

network.forEach(line => {
    line.print()
    console.log()
})

await Promise.all(
    network.map(line => db.addLine(line))
)

console.log('\n');
console.log("Database filled with static data")
console.log()