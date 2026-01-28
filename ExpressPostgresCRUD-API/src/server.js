import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";

import { userRouter } from "./routes/userRoutes.js";
import { errorHandling } from "./middlewares/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRouter);

// Error Handling Middleware
app.use(errorHandling);

// Create table before starting server
createUserTable();

// Testing Postgres Connection
app.get("/", async (req, res) => {
  const result = await pool.query("select current_database()");
  res.send(`The databse name is : ${result.rows[0].current_database}`);
});

// Server Running
app.listen(port, () => console.log(`Server running on port: ${port}`));
