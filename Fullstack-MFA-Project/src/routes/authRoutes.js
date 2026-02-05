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

// Registaration route
authRouter.post("/register", register);
// Login route
authRouter.post("/login", passport.authenticate("local"), login);
// Auth Status route
authRouter.get("/status", authStatus);
// Logout route
authRouter.post("/logout", logout);

// 2FA setup
authRouter.post("/2fa/setup", setup2FA);
// Verify route
authRouter.post("/2fa/verify", verify2FA);
// Reset 2fa route
authRouter.post("/2fa/reset", reset2FA);
