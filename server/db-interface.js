import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url';
import {Station, Line, Connection} from './Entities'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite.Database(
    path.join(__dirname, 'database.db'), 
    err => {
    if (err)
        console.error(err);
    else 
        console.log("Database linked");
});

function getAllStations() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM stations';
        db.all(sql, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                const stations = rows.map(row => new Station(row));
                resolve(stations);
            }
        })
    })
}

function getStation(stationID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM stations WHERE id = ?';
        db.get(sql, [stationID], (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row);
            }
        })
    })
}

function getAllLines() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM lines';
        db.all(sql, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                const stops = await getLineStops(row => row.id);
                const lines = rows.map(row => new Line(...row, stops));
                resolve(lines);
            }
        })
    })
}

function getLineStops(lineID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM lineStations WHERE lineID = ? ORDER BY stopOrder'
        db.all(sql, [lineID], (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                const stops = rows.map(row => row.stationID);
                resolve(stops);
            }
        })
    })
}