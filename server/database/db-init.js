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
  if (err) console.error('Error creating users table:', err);
  else console.log('Users table created');
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
  if (err) console.error('Error creating app_structure table:', err);
  else console.log('app_structure table created');
});

db.run(`INSERT OR IGNORE INTO users (username, password_hash, email) VALUES 
  ('admin', '$2b$10$examplehash', 'admin@test.com')`, 
  (err) => {
    if (err) console.error('Error inserting admin user:', err);
    else console.log('Admin user inserted');
  });

db.close((err) => {
  if (err) console.error('Error closing database:', err);
  else console.log('Database initialized successfully');
});