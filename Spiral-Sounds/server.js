import express from "express";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import session from "express-session";

const PORT = 8000;

const app = express();

const secret = process.env.SPIRAL_SESSION_SECRET || "jellyfish-baskingshark";

// Parsing incoming JSON and putting results in req.body
app.use(express.json());

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, sameSite: "lax" },
  }),
);

app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(`Failed to start server:`, err);
  });
