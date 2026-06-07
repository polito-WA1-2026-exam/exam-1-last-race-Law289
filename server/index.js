import express from 'express';
import morgan from 'morgan';
import { param, body, validationResult } from 'express-validator';
import cors from 'cors'

import { gameTargetPair } from './routes/game';

const app = express();
const log = morgan('dev');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(cors({origin: "http://localhost:5173"}));

//#region APIs

app.get('/game/setup', (req, res) => {
  try {
    const randomPair = await pairToConnect();
    res.json(randomPair);
  }
  catch (err) {
    res.status(500).json({error: err.message});
  }
})

//#endregion

const port = 3001;
// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});