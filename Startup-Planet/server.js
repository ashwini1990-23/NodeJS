import express from "express";
import { startups } from "./data/data.js";
import { apiRouter } from "./routes/apiRoutes.js";
import cors from "cors";

const PORT = 8000;

const app = express();

app.use(cors());

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found. Please check the API documentation.",
  });
});

app.listen(PORT, () => console.log(`Connection successful on port: ${PORT}`));
