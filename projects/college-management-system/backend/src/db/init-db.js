import path from "node:path";
import { fileURLToPath } from "node:url";
import { runSqlFile } from "./runSqlFile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionOptions = {
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "Pass@123mnbvcxz",
  port: Number(process.env.DB_PORT ?? "3306"),
  database: process.env.DB_NAME ?? "dummy_db",
};

async function main() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const seedPath = path.join(__dirname, "seed.sql");

  console.log("Running schema:", schemaPath);
  await runSqlFile({ filePath: schemaPath, connectionOptions });

  console.log("Running seed:", seedPath);
  await runSqlFile({ filePath: seedPath, connectionOptions });

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

