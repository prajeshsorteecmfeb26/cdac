import { pool } from "../config/DbConfig.js";

export const createRequest = async (bookId, studentId, requestDate) => {
  const [result] = await pool.query(
    "INSERT INTO library_request(book_id, student_id, request_date, status) VALUES(?, ?, ?, 'PENDING')",
    [bookId, studentId, requestDate],
  );
  return result;
};

export const listRequests = async () => {
  const [rows] = await pool.query(
    `SELECT lr.id, lr.book_id AS bookId, lb.title, lb.author,
            lr.student_id AS studentId, s.name AS studentName,
            lr.request_date AS requestDate, lr.status, lr.notes
     FROM library_request lr
     JOIN library_book lb ON lb.id = lr.book_id
     JOIN student s ON s.id = lr.student_id
     WHERE lr.id = (
       SELECT lr2.id
       FROM library_request lr2
       WHERE lr2.student_id = lr.student_id AND lr2.book_id = lr.book_id
       ORDER BY lr2.created_at DESC, lr2.id DESC
       LIMIT 1
     )
     ORDER BY lr.created_at DESC, lr.id DESC`,
  );
  return rows;
};

export const listMyRequests = async (studentId) => {
  const [rows] = await pool.query(
    `SELECT lr.id, lr.book_id AS bookId, lb.title, lb.author,
            lr.request_date AS requestDate, lr.status, lr.notes
     FROM library_request lr
     JOIN library_book lb ON lb.id = lr.book_id
     WHERE lr.student_id = ?
       AND lr.id = (
         SELECT lr2.id
         FROM library_request lr2
         WHERE lr2.student_id = ? AND lr2.book_id = lr.book_id
         ORDER BY lr2.created_at DESC, lr2.id DESC
         LIMIT 1
       )
     ORDER BY lr.created_at DESC, lr.id DESC`,
    [studentId, studentId],
  );
  return rows;
};

export const updateRequestStatus = async (id, status, notes) => {
  const [result] = await pool.query(
    "UPDATE library_request SET status = ?, notes = ? WHERE id = ?",
    [status, notes ?? null, id],
  );
  return result;
};

