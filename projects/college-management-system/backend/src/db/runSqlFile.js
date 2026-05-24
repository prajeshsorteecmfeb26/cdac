import fs from "node:fs/promises";
import mysql2 from "mysql2/promise";

export async function runSqlFile({ filePath, connectionOptions }) {
  const sql = await fs.readFile(filePath, "utf-8");
  const connection = await mysql2.createConnection({
    ...connectionOptions,
    multipleStatements: true,
  });

  try {
    await connection.query(sql);
  } finally {
    await connection.end();
  }
}

