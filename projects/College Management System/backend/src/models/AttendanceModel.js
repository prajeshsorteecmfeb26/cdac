import { pool } from "../config/DbConfig.js";

export const upsertAttendance = async (studentId, date, status, markedByAdminId) => {
  const [result] = await pool.query(
    `INSERT INTO attendance(student_id, date, status, marked_by_admin_id)
     VALUES(?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by_admin_id = VALUES(marked_by_admin_id)`,
    [studentId, date, status, markedByAdminId ?? null],
  );
  return result;
};

export const getAttendanceByDate = async (date) => {
  const [rows] = await pool.query(
    `SELECT a.id, a.student_id AS studentId, s.name, s.phone, s.city, s.marks, a.date, a.status
     FROM attendance a
     JOIN student s ON s.id = a.student_id
     WHERE a.date = ?
     ORDER BY s.id ASC`,
    [date],
  );
  return rows;
};

export const getStudentAttendanceRange = async (studentId, fromDate, toDate) => {
  const [rows] = await pool.query(
    `SELECT id, student_id AS studentId, date, status
     FROM attendance
     WHERE student_id = ? AND date BETWEEN ? AND ?
     ORDER BY date DESC`,
    [studentId, fromDate, toDate],
  );
  return rows;
};

