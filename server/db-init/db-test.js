import sqlite from 'sqlite3'
import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const stationTest1 = new Station({id: undefined, name: "Porta Nuova"});
const stationTest2 = new Station({id: undefined, name: "Porta Dora"});
const stationTest3 = new Station({id: undefined, name: "Porta Susa"});

console.log();
console.log("-------- Database test start ------");
console.log();

await db.addStation(stationTest1)
await db.addStation(stationTest2)
await db.addStation(stationTest3)

const stations = await db.getAllStations();

console.log("Reading from all stations:");
stations.forEach(station => {
    station.print();
})

console.log("");
console.log("Specific required station 1, 2, 3");

const gotStation1 = await db.getStation(1);
const gotStation2 = await db.getStation(2);
const gotStation3 = await db.getStation(3);

gotStation1.print();
gotStation2.print();
gotStation3.print();

const testLine = new Line({
    id: undefined,
    name: "Linea 1",
    color: "red"
});

const additionalStation = new Station({id: undefined, name: "Moncalieri"});

testLine.addStation(gotStation1)
testLine.addStation(gotStation2)
testLine.addStation(gotStation3)
testLine.addStation(additionalStation)

await db.addLine(testLine);

const readLine = await db.getLine(1);

console.log("");
console.log("Reading line 1:");

testLine.print();

console.log("");
console.log("All connected stations:");

const connections = await db.getAllConnections();
connections.forEach(connection => {
    connection.print();
})

console.log()
console.log("------- End of database test -------");
console.log();