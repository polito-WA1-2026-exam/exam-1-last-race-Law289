import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { param, body, validationResult } from 'express-validator';
import cors from 'cors'

import { gameTargetPair } from './game.js';
import * as db from './db-interface.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const log = morgan('dev');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')))
app.use(log);
app.use(cors({origin: "http://localhost:5173"}));

//#region API

app.get('/game/setup', async (req, res) => {
  try {
    const randomPair = await gameTargetPair();
    res.json(randomPair);
  }
  catch (err) {
    res.status(500).json({error: err.message});
  }
})

app.get('/game/planning', async (req, res) => {
  try {
    const randomPair = await gameTargetPair();
    const connections = await db.getAllConnections();
    res.json({
      "randomPair": randomPair,
      "connections": connections
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

//#endregion

const port = 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});