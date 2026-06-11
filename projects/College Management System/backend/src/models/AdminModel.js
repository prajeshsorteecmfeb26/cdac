import { pool } from "../config/DbConfig.js";

export const getAdminByPhone = async (phone) => {
    const [result] = await pool.query(
        "SELECT * FROM admin WHERE phone = ?",
        [phone]
    );
    return result;
};

export const createAdmin = async (name, phone, encryptedPassword) => {
    const [result] = await pool.query(
        "INSERT INTO admin(name, phone, password) VALUES(?, ?, ?)",
        [name, phone, encryptedPassword]
    );
    return result;
};

export const getAllStudentCredentials = async () => {
    const [rows] = await pool.query(
        `SELECT
            s.id AS studentId,
            s.name AS username,
            s.phone,
            sa.password_hash AS passwordHash,
            sa.updated_at AS passwordUpdatedAt
         FROM student s
         LEFT JOIN student_auth sa ON sa.student_id = s.id
         ORDER BY s.id ASC`
    );
    return rows;
};

export const updateStudentPasswordHash = async (studentId, passwordHash) => {
    const [result] = await pool.query(
        `INSERT INTO student_auth(student_id, password_hash)
         VALUES(?, ?)
         ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
        [studentId, passwordHash]
    );
    return result;
};
