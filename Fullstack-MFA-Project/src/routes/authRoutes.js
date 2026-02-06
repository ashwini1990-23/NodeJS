import express from "express";
import passport from "passport";

import {
  register,
  login,
  authStatus,
  logout,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";

export const authRouter = express.Router();

// Registration route
authRouter.post("/register", register);
// Login route
authRouter.post("/login", passport.authenticate("local"), login);
// Auth Status route
authRouter.get("/status", authStatus);
// Logout route
authRouter.post("/logout", logout);

// 2FA setup
authRouter.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  setup2FA,
);
// Verify route
authRouter.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  verify2FA,
);
// Reset 2fa route
authRouter.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  reset2FA,
);
