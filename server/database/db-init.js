import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite.Database(
    path.join(__dirname, "database.db"), 
    err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("Database linked");
    }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Errore crea users:', err);
  else console.log('Tabella users creata');
});

db.run(`
  CREATE TABLE IF NOT EXISTS app_structure (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    component_name TEXT NOT NULL,
    component_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Errore crea app_structure:', err);
  else console.log('Tabella app_structure creata');
});

db.run(`INSERT OR IGNORE INTO users (username, password_hash, email) VALUES 
  ('admin', '$2b$10$examplehash', 'admin@test.com')`, 
  (err) => {
    if (err) console.error('Errore insert user:', err);
    else console.log('Utente admin inserito');
  });

db.close((err) => {
  if (err) console.error('Errore chiusura:', err);
  else console.log('Database inizializzato correttamente');
});