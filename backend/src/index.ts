import server from "./server";
import { dbConfig } from "./config"

const port = process.argv.length > 2 ? process.argv[2] : 4000;
console.log(`server running on port ${port}`);
server(Number(port), dbConfig);
