import express from "express";
import {
  currentUser,
  handleForgotPassword,
  handleResetPassword,
  handleVerifyOtp,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/current", validateToken, currentUser);

userRouter.post("/forgot-password", handleForgotPassword);

userRouter.post("/verify-otp", handleVerifyOtp);

userRouter.post("/reset-password", handleResetPassword);
