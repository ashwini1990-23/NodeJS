import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function createTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  /* await db.exec(`
  create table if not exists products(
  id integer primary key autoincrement,
  title TEXT NOT NULL,  
            artist TEXT NOT NULL, 
            price REAL NOT NULL,
            image TEXT NOT NULL, 
            year INTEGER,
            genre TEXT,
            stock INTEGER
  )
  `);
  */
  await db.exec(`
  create table if not exists users(
  id integer primary key autoincrement,
  name text,
  email text unique not null,
  username text unique not null,
  password text not null,
  created_at datetime default current_timestamp
  )
  `);

  await db.close();
  console.log(`Table created`);
}

createTable();
