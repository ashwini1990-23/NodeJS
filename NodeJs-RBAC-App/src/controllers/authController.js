import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

import { User } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      res.status(400).json({ message: "All fields are mandatory" });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: `User registred with username: ${username}` });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "All fields are mandatory" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: `Invalid credentials` });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
