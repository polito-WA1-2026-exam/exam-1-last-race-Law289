import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const stations = await db.getAllStations();
const lines = await db.getAllLines();
const connections = await db.getAllConnections();

console.log()
console.log("------ Showing DB contents -------")
console.log()
console.log("All stations:")
stations.forEach(station => {
    station.print();
});

console.log()
console.log("All lines:")
lines.forEach(line => {
    line.print();
})

console.log()
console.log("All connections:")
connections.forEach(connection => {
    connection.print();
})