import bcrypt from "bcrypt";
import { pool } from "../config/DbConfig.js";

async function main() {
  const passwordHash = bcrypt.hashSync("student123", 10);
  const [students] = await pool.query("SELECT id FROM student");

  for (const student of students) {
    await pool.query(
      `INSERT INTO student_auth(student_id, password_hash)
       VALUES(?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [student.id, passwordHash]
    );
  }

  console.log(`Reset common password for ${students.length} students.`);
  await pool.end();
}

main().catch(async (error) => {
  console.error("Failed to reset student passwords:", error.message);
  try {
    await pool.end();
  } catch {}
  process.exit(1);
});
