import validator from "validator";
import bcrypt from "bcryptjs";
import { getDBConnection } from "../db/db.js";

export async function registerUser(req, res) {
  console.log("req.body: ", req.body);

  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();
  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid Email format." });
  }

  try {
    const db = await getDBConnection();
    const existing = await db.get(
      `select id from users where username=? or email=?`,
      [username, email],
    );

    if (existing) {
      return res
        .status(400)
        .json({ error: "Email or username already in use." });
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const result = await db.run(
      `insert into users(name,username,email,password) values(?,?,?,?)`,
      [name, username, email, hashedPassowrd],
    );
    console.log(result);
    req.session.userId = result.lastID;

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.log("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
}
