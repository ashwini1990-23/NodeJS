"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pets_1 = require("./data/pets");
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    const { species } = req.query;
    let filteredPets = pets_1.pets;
    if (species) {
        filteredPets = filteredPets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
    }
    res.json(filteredPets);
});
app.get("/:id", (req, res) => {
    let { id } = req.params;
    const pet = pets_1.pets.find((pet) => pet.id.toString() === id);
    if (pet) {
        res.json(pet);
    }
    else {
        res.status(404).json({ message: "No pet with that ID" });
    }
});
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
