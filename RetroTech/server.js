import http from "node:http";
import path from "node:path";
import { serveStatic } from "./utils/serveStatic.js";
import fs from "node:fs/promises";

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const pathToResource = path.join(__dirname, "public", "index.html");

  //serveStatic(__dirname);

  // const content = fs.readFileSync(pathToResource, "utf8");
  const content = await fs.readFile(pathToResource, "utf8");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(content);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT} `));
