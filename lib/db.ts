import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Database initialization
async function initializeDatabase() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      setting_name TEXT NOT NULL,
      setting_value TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  return db;
}

// Singleton database instance
let database = null;

export async function getDatabase() {
  if (!database) {
    database = await initializeDatabase();
  }
  return database;
}

// User operations
export async function createUser(username, password) {
  const db = await getDatabase();
  const result = await db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password]
  );
  return result.lastID;
}

export async function getUserByUsername(username) {
  const db = await getDatabase();
  return await db.get(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
}

export async function getUserById(id) {
  const db = await getDatabase();
  return await db.get(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
}

// Settings operations
export async function getUserSetting(userId, settingName) {
  const db = await getDatabase();
  return await db.get(
    'SELECT * FROM user_settings WHERE user_id = ? AND setting_name = ?',
    [userId, settingName]
  );
}

export async function setUserSetting(userId, settingName, settingValue) {
  const db = await getDatabase();
  
  // Check if setting already exists
  const existing = await getUserSetting(userId, settingName);
  
  if (existing) {
    // Update existing setting
    await db.run(
      'UPDATE user_settings SET setting_value = ? WHERE user_id = ? AND setting_name = ?',
      [settingValue, userId, settingName]
    );
  } else {
    // Insert new setting
    await db.run(
      'INSERT INTO user_settings (user_id, setting_name, setting_value) VALUES (?, ?, ?)',
      [userId, settingName, settingValue]
    );
  }
}
