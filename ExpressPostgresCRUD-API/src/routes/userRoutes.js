import express from "express";

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/inputValidator.js";

export const userRouter = express.Router();

userRouter.get("/user", getAllUsers);
userRouter.post("/user", validateUser, createUser);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", validateUser, updateUser);
userRouter.delete("/user/:id", deleteUser);
