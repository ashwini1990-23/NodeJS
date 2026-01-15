import { getDBConnection } from "../db/db.js";
export async function getGenres(req, res) {
  try {
    const db = await getDBConnection();
    const genresRow = await db.all(`select distinct genre from products`);
    const genres = genresRow.map((row) => row.genre);
    res.json(genres);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: err.message });
  }
  console.log("Genres");
}

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection();
    let query = `select * from products`;
    const params = [];

    const { genre, search } = req.query;
    if (genre) {
      query += ` where genre=?`;
      params.push(genre);
    }
    if (search) {
      query += ` where title like ? or artist like ? or genre like ?`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    const products = await db.all(query, params);

    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: err.message });
  }
}
