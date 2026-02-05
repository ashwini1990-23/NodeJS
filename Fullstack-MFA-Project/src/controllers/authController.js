import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "All fields are mandatory" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log(`New User: ${newUser}`);
    res.status(201).json({ mesage: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};

export const login = async (req, res) => {
  console.log(`the authenticated user is:`, req.user);
  res.status(200).json({
    message: "User Logged in succesfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async (req, res) => {
  res.status(200).json("Auth Status");
};

export const logout = async (req, res) => {
  res.status(200).json("Logout");
};

export const setup2FA = async (req, res) => {
  res.status(200).json("2FA setup");
};

export const verify2FA = async (req, res) => {
  res.status(200).json("Verify 2FA");
};

export const reset2FA = async (req, res) => {
  res.status.json("Reset 2FA");
};
