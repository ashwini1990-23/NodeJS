import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

import { petRouter } from "./routes/petsRoutes";

const PORT = 8000;

const app: Express = express();

app.use(cors());

app.use("/pets", petRouter);

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, (): void => console.log(`Listening on port: ${PORT}`));
