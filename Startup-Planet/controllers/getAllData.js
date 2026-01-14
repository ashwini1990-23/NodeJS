import { startups } from "../data/data.js";

export const getAllData = (req, res) => {
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
};
