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

const tables = ['stations', 'lines', 'line_stations', 'connections', 'games', 'users'];

function resetDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('PRAGMA foreign_keys = OFF');

      tables.forEach(table => {
        db.run(`DROP TABLE IF EXISTS ${table}`, err => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          console.log(`Table ${table} deleted`);
        })
      })

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
