import express from "express";
import type { Router } from "express";
import { getPetById, getPets } from "../controllers/petsControllers";
import { validateNumericId, pleaseAuth } from "../middleware/petsMiddleware";

export const petRouter: Router = express.Router();

petRouter.get("/", getPets);

petRouter.get("/:id", pleaseAuth, validateNumericId, getPetById);
