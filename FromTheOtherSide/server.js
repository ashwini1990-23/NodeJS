import http from "node:http";
import { getData } from "./utils/getData.js";

import { serveStatic } from "./utils/serveStatic.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

console.log(await getData());

const server = http.createServer(async (req, res) => {
  await serveStatic(__dirname, res, req);
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
