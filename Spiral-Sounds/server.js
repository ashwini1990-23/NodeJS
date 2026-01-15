import express from "express";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";

const PORT = 8000;

const app = express();

// Parsing incoming JSON and putting results in req.body
app.use(express.json());

app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(`Failed to start server:`, err);
  });
