import bcrypt from "bcrypt";
import { pool } from "../config/DbConfig.js";

const ADMINS = [
  { name: "Pushkar", phone: "707070", password: "admin123" },
  { name: "Prajesh", phone: "808080", password: "admin123" },
  { name: "Prajakta", phone: "909090", password: "admin123" },
];

async function main() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query("DELETE FROM admin");

    for (const admin of ADMINS) {
      const passwordHash = bcrypt.hashSync(admin.password, 10);
      await connection.query(
        "INSERT INTO admin(name, phone, password) VALUES(?, ?, ?)",
        [admin.name, admin.phone, passwordHash]
      );
    }

    await connection.commit();
    console.log("Admin table reset successfully with 3 allowed admins.");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Failed to reset admins:", error.message);
  process.exit(1);
});
