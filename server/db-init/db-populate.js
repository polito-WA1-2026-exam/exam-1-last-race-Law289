import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import * as db from '../db-interface.js'
import {Station, Line} from '../Entities.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db.addStation(new Station({id: undefined, name: "Porta Nuova"}))