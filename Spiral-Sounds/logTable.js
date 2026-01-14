import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function logTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  try {
    const products = await db.all(`Select * from products`);
    console.table(products);
  } catch (err) {
    console.log(`Error logging table`, err);
  } finally {
    await db.close();
  }
}

logTable();
