import express from "express";
import dotenv from "dotenv";

import { dbConnect } from "./config/dbConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// without installing nodemon "dev":"node --watch server.js"
