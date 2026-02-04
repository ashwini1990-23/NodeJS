import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

export const userRouter = express.Router();

// Only Admin can access this router
userRouter.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin.." });
});

// Both Admin and Manager can access this router
userRouter.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome Manager.." });
  },
);

// All can access this router
userRouter.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome User.." });
  },
);
