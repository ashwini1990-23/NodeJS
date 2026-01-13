import express from "express";
import { startups } from "./data/data.js";

const PORT = 8000;

const app = express();
app.get("/api", (req, res) => {
  let filterddata = startups;
  const { industry, country, continent, is_seeking_funding, has_mvp } =
    req.query;
  if (industry) {
    filterddata = filterddata.filter(
      (startup) => startup.industry.toLowerCase() === industry.toLowerCase()
    );
  }
  if (country) {
    filterddata = filterddata.filter(
      (startup) => startup.country.toLowerCase() === country.toLowerCase()
    );
  }
  if (continent) {
    filterddata = filterddata.filter(
      (startup) => startup.continent.toLowerCase() === continent.toLowerCase()
    );
  }
  if (is_seeking_funding) {
    filterddata = filterddata.filter(
      (startup) =>
        startup.is_seeking_funding ===
        JSON.parse(is_seeking_funding.toLowerCase())
    );
  }
  if (has_mvp) {
    filterddata = filterddata.filter(
      (startup) => startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
    );
  }

  res.json(filterddata);
});

app.get("/api/:field/:term", (req, res) => {
  const { field, term } = req.params;

  const allowedFields = ["country", "continent", "industry"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({
      message:
        "Search field not allowed. Please use only 'country', 'continent', 'industry'",
    });
  }

  const filteredData = startups.filter(
    (startup) => startup[field].toLowerCase() === term.toLowerCase()
  );
  res.json(filteredData);
});

app.listen(PORT, () => console.log(`Connection successful on port: ${PORT}`));
