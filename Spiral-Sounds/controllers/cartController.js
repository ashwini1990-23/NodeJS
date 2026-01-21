import { getDBConnection } from "../db/db.js";

export async function addToCart(req, res) {
  const db = await getDBConnection();

  const productId = parseInt(req.body.productId, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const userId = req.session.userId;

  const existing = await db.get(
    `select * from cart_items where user_id=? and product_id=?`,
    [userId, productId],
  );
  if (existing) {
    await db.run(`update cart_items set quantity=quantity+1 where id=?`, [
      existing.id,
    ]);
  } else {
    await db.run(
      `insert into cart_items(user_id, product_id, quantity) values(?,?,1)`,
      [userId, productId],
    );
  }
  res.json({ message: "Added to cart" });
}

export async function getCartCount(req, res) {
  const db = await getDBConnection();

  const userId = req.session.userId;

  const result = await db.get(
    `select sum(quantity) as totalItems from cart_items where user_id=?`,
    [userId],
  );
  res.json({ totalItems: result.totalItems || 0 });
}

export async function getAll(req, res) {
  const db = await getDBConnection();

  const items = await db.all(
    `select ci.id as cartItemId, ci.quantity, p.title, p.artist, p.price from cart_items ci join products p on p.id=ci.product_id where ci.user_id=?`,
    [req.session.userId],
  );
  res.json({ items: items });
}

export async function deleteItem(req, res) {
  const db = await getDBConnection();

  const itemId = parseInt(req.params.itemId, 10);
  if (isNaN(itemId)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  const item = await db.get(
    `select quantity from cart_items where id=? and user_id=?`,
    [itemId, req.session.userId],
  );

  if (!item) {
    return res.status(400).json({ error: "Item not found" });
  }
  await db.run(`delete from cart_items where id=? and user_id=?`, [
    itemId,
    req.session.userId,
  ]);

  res.status(204).send();
}

export async function deleteAll(req, res) {
  const db = await getDBConnection();
  await db.run(`delete from cart_items where user_id=?`, [req.session.userId]);
  res.status(204).send();
}
