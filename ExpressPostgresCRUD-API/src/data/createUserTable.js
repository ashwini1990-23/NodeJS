import pool from "../db/db.js";

export async function createUserTable() {
  const queryText = `
  CREATE TABLE IF NOT EXISTS users(
id serial primary key,
name varchar(100) not null,
email varchar(100) UNIQUE not null,
created_at TIMESTAMP DEFAULT NOW()
)
 
  `;
  try {
    pool.query(queryText);
    console.log(`User table created if not exists`);
  } catch (err) {
    console.log(`Error creating users table: `, err);
  }
}
