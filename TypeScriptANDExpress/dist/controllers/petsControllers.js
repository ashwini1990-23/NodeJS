"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetById = exports.getPets = void 0;
const pets_1 = require("../data/pets");
const getPets = (req, res) => {
    const { species, adopted, minAge, maxAge } = req.query;
    let filteredPets = pets_1.pets;
    if (species) {
        filteredPets = filteredPets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
    }
    if (adopted) {
        filteredPets = filteredPets.filter((pet) => pet.adopted === JSON.parse(adopted));
    }
    if (minAge) {
        filteredPets = filteredPets.filter((pet) => pet.age >= JSON.parse(minAge));
    }
    if (maxAge) {
        filteredPets = filteredPets.filter((pet) => pet.age <= JSON.parse(maxAge));
    }
    res.json(filteredPets);
};
exports.getPets = getPets;
const getPetById = (req, res) => {
    let { id } = req.params;
    const pet = pets_1.pets.find((pet) => pet.id.toString() === id);
    if (pet) {
        res.json(pet);
    }
    else {
        res.status(404).json({ message: "No pet with that ID" });
    }
};
exports.getPetById = getPetById;
