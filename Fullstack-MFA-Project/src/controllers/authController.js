import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

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
  console.log(`The authenticated user is:`, req.user);
  res.status(200).json({
    message: "User Logged in succesfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User Authenticated succesfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "Unauthorized user or User already had logged out" });
  }
  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User not logged in" });
    res.status(200).json({ message: "Logout successful" });
  });
};

export const setup2FA = async (req, res) => {
  try {
    console.log(`the req.user is: `, req.user);
    const user = req.user;

    var secret = speakeasy.generateSecret();
    console.log(`The secret object is: `, secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: `www.ashwini.com`,
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);

    res.status(200).json({ secret: secret.base32, qrCode: qrImageUrl });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2fa", message: error });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" },
    );
    res.status(200).json({ message: "2FA successful", token: jwtToken });
  } else {
    res.status(400).json({ message: "Invalid 2FA token" });
  }
};

export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    user.save();
    res.status(200).json({ message: "2FA successful" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting 2FA", mesage: error });
  }
};
