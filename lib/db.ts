import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_DIR = path.join(process.cwd(), 'db')
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR)
const DB_FILE = path.join(DB_DIR, 'database.db')
const db = new Database(DB_FILE)

db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run()

export default db
