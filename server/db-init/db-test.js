import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stationTest1 = new Station({id: undefined, name: "Porta Nuova"});
const stationTest2 = new Station({id: undefined, name: "Porta Dora"});
const stationTest3 = new Station({id: undefined, name: "Porta Susa"});

db.addStation(stationTest1)
db.addStation(stationTest2)
db.addStation(stationTest3)

const stations = db.getAllStations();

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

testLine.addStation(stationTest1)
testLine.addStation(stationTest2)
testLine.addStation(stationTest3)

db.addLine(testLine);

testLine.print();