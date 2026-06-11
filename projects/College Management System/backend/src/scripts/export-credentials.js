import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../config/DbConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEEDED_STUDENT_HASH = "$2b$10$RRbATAzJ/l1rb6gLiM2qeORXh8wpkI7NLYh6qezl8y0A7jglJQd8m";

async function main() {
  const [students] = await pool.query(
    `SELECT
      s.id,
      s.name,
      s.phone AS username,
      sa.password_hash AS passwordHash
     FROM student s
     LEFT JOIN student_auth sa ON sa.student_id = s.id
     ORDER BY s.id ASC`
  );

  const [admins] = await pool.query(
    `SELECT
      a.id,
      a.name,
      a.phone AS username,
      a.password AS passwordHash
     FROM admin a
     ORDER BY a.id ASC`
  );

  const output = {
    generatedAt: new Date().toISOString(),
    note:
      "Plain passwords are not stored in DB; passwordHash is exported. studentPasswordHint is set only for known seeded hash.",
    students: students.map((student) => ({
      ...student,
      studentPasswordHint:
        student.passwordHash === SEEDED_STUDENT_HASH ? "student123" : null,
    })),
    admins,
  };

  const outputPath = path.resolve(__dirname, "../../credentials-export.json");
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), "utf8");

  console.log(`Credential export saved to: ${outputPath}`);
  await pool.end();
}

main().catch(async (error) => {
  console.error("Failed to export credentials:", error.message);
  try {
    await pool.end();
  } catch {}
  process.exit(1);
});
