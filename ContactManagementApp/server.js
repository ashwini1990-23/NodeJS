import express from "express";
import dotenv from "dotenv";

import { contactRouter } from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/contacts", contactRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
