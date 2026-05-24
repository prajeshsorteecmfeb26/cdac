import { pool } from "../config/DbConfig.js";

export const getStudentByPhone = async (phone) => {
  const [rows] = await pool.query("SELECT * FROM student WHERE phone = ?", [phone]);
  return rows;
};

export const getStudentAuthByStudentId = async (studentId) => {
  const [rows] = await pool.query("SELECT * FROM student_auth WHERE student_id = ?", [studentId]);
  return rows;
};

export const createOrUpdateStudentAuth = async (studentId, passwordHash) => {
  const [result] = await pool.query(
    `INSERT INTO student_auth(student_id, password_hash)
     VALUES(?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [studentId, passwordHash],
  );
  return result;
};

