import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createStaionsTable_SQL = `CREATE TABLE IF NOT EXISTS stations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
)`

const createLinesTable_SQL = `CREATE TABLE IF NOT EXISTS lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
)`

const createLineStationsTable_SQL = `CREATE TABLE IF NOT EXISTS line_stations (
  lineID INTEGER NOT NULL, 
  stationID INTEGER NOT NULL,
  stopOrder INTEGER NOT NULL,
  PRIMARY KEY (lineID, stopOrder)
  UNIQUE (lineID, stationID)
  FOREIGN KEY (lineID) REFERENCES lines(id)
  FOREIGN KEY (stationID) REFERENCES stations(id)
)`  

const createConnectionsTable_SQL = `CREATE TABLE IF NOT EXISTS connections (
  stationA_ID INTEGER NOT NULL,
  stationB_ID INTEGER NOT NULL,
  lineID INTEGER NOT NULL,
  PRIMARY KEY (stationA_ID, stationB_ID, lineID),
  FOREIGN KEY (stationA_ID) REFERENCES stations(id),
  FOREIGN KEY (stationB_ID) REFERENCES stations(id),
  FOREIGN KEY (lineID) REFERENCES lines(id)
)`

const createEventsTable_SQL = `CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  coinsDelta INTEGER NOT NULL
)`

const createUsersTable_SQL = `CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  passwordHash INTEGER NOT NULL,
  createdAt TEXT NOT NULL DEFAULT(datetime('now'))
)`

const createGamesTable_SQL = `CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userID INTEGER NOT NULL,
  startStationID INTEGER NOT NULL,
  endStationID INTEGER NOT NULL,
  isValid BOOL NOT NULL DEFAULT true,
  route_JSON TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  startTime TEXT NOT NULL DEFAULT(datetime('now')),
  endTime TEXT NOT NULL
)`

const tables = ['stations', 'lines', 'lineStations', 'connections', 'games', 'users'];
const querys = [
  createStaionsTable_SQL, 
  createLinesTable_SQL, 
  createLineStationsTable_SQL, 
  createConnectionsTable_SQL, 
  createGamesTable_SQL, 
  createUsersTable_SQL
];

const db = new sqlite.Database(
    path.join(__dirname, "..", "database.db"), 
    err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("Database linked");
    }
});

let i = 0;
tables.forEach((table) => {
  db.run(querys[i], (err) => {
    if (err)
      console.error(err);
    else
      console.log(`${table} table created successfully`);
  });
  i++;
});

db.close((err) => {
  if (err) console.error('Error closing database:', err);
  else console.log('Database initialized successfully');
});