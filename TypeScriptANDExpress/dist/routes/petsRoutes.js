"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRouter = void 0;
const express_1 = __importDefault(require("express"));
const petsControllers_1 = require("../controllers/petsControllers");
const petsMiddleware_1 = require("../middleware/petsMiddleware");
exports.petRouter = express_1.default.Router();
exports.petRouter.get("/", petsControllers_1.getPets);
exports.petRouter.get("/:id", petsMiddleware_1.pleaseAuth, petsMiddleware_1.validateNumericId, petsControllers_1.getPetById);
