import fs from "node:fs/promises";
import path from "node:path";
import { getData } from "./getData.js";

export async function addNewSighting(newSighting) {
  try {
    const sightings = await getData();
    sightings.push(newSighting);

    const pathToFile = path.join("data", "data.json");

    await fs.writeFile(pathToFile, JSON.stringify(sightings, null, 2), "utf8");
  } catch (err) {
    throw new Error(err);
  }
}
