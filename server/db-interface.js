import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url';
import {Station, Line, Connection} from './Entities.js'

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

//#region STATIONS

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
                return reject(err);
            }
            resolve(new Station({id: row.id, name: row.name}));
        })
    })
}

function addStation(station) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT OR REPLACE INTO stations(name) VALUES(?)';
        db.run(sql, [station.name], (err) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            station.id = this.lastID;
            resolve(this.lastID);
        })
    })
}

//#endregion
//#region LINES

function getAllLines() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM lines';
        db.all(sql, async (err, rows) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const lines = await Promise.all(rows.map(async row => {
                const stops = await getLineStops(row.id);
                return new Line({
                    id: row.id,
                    name: row.name,
                    color: row.color,
                    stations: stops
                });
            }));
            resolve(lines);
        })
    })
}

function getLine(lineID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM lineStations WHERE lineID = ?';
        db.get(sql, [lineID], async (err, row) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            const stops = await getLineStops(lineID);
            resolve(new Line({
                id: lineID,
                name: row.name,
                color: row.color,
                stations: stops
            }));
        })
    })
}

function addLine(line) {
    return new Promise((resolve, reject) => {
        const lineSQL = 'INSERT OR REPLACE INTO lines(name, color) VALUES(?, ?)';
        const stopsSQL = 'INSERT OR REPLACE INTO line_stations(lineID, stationID, stopOrder) VALUES(?, ?, ?)';
        const connectionSQL = 'INSERT OR REPLACE INTO connections(stationA_ID, stationB_ID, lineID) VALUES(?, ?, ?)';
        db.run(lineSQL, [line.name, line.color], (err) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            if (!line.stations || line.stations.length === 0)
                resolve(this.lastID);

            line.id = this.lastID;
            const stopPromises = line.stations.map((station, i) => {
                return new Promise((resolveStop, rejectStop) => {
                    db.run(stopsSQL, [line.id, station.id, i], err => {
                        if (err) {
                            console.error(err);
                            return rejectStop(err);
                        }
                        resolveStop();
                    })
                })
            })
            const connectionPromises = line.stations.slice(0, line.stations.length-1).map((station, i) => {
                return new Promise((resolveConnection, rejectConnection) => {
                    const nextStation = line.stations[i+1];
                    db.run(connectionSQL, [station.id, nextStation.id, line.id], err => {
                        if (err) {
                            console.error(err);
                            return rejectConnection(err);
                        }
                        resolveConnection();
                    })
                })
            })

            Promise.all(stopPromises)
                .then(() => Promise.all(connectionPromises))
                    .then(() => resolve(this.lastID))
                    .catch(err => reject(err))
            ;
        });
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

//#endregion

//#region CONNECTIONS

function getAllConnections() {
    const sql = 'SELECT * FROM connections';
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

//#endregion
//#region USERS

//#endregion
//#region GAMES

//#endregion

export {
    addStation, 
    addLine,
    getStation, 
    getLine, 
    getAllLines, 
    getAllStations,
    getLineStops
}