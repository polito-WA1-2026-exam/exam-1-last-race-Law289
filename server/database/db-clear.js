import sqlite from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

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

function resetDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('PRAGMA foreign_keys = OFF');

      db.run('DELETE FROM users', (err) => {
        if (err) return reject(err);
        console.log('Users table cleared');
      });

      db.run('DELETE FROM app_structure', (err) => {
        if (err) return reject(err);
        console.log('app_structure table cleared');
      });

      db.run('DELETE FROM sqlite_sequence WHERE name="users"', (err) => {
        if (err) return reject(err);
        console.log('User IDs reset');
      });

      db.run('DELETE FROM sqlite_sequence WHERE name="app_structure"', (err) => {
        if (err) return reject(err);
        console.log('ID app_structure reset');
      });

      db.run('DROP TABLE IF EXISTS users', (err) => {
        if (err) return reject(err);
        console.log('Users table deleted');
      });

      db.run('DROP TABLE IF EXISTS app_structure', (err) => {
        if (err) return reject(err);
        console.log('App-structure table deleted');
      });
      
      db.run('DROP TABLE IF EXISTS sqlite_sequence', (err) => {
        if (err) return reject(err);
        console.log('Sqlite table deleted');
      });

      db.run('PRAGMA foreign_keys = ON');

      console.log('Database completely reset.');
      resolve();
    });
  });
}

resetDatabase()
  .then(() => {
    db.close((err) => {
      if (err) console.error('Error closing database:', err);
      else console.log('Database connection ended');
    });
  })
  .catch(err => {
    console.error('Reset error:', err);
    db.close();
  });
