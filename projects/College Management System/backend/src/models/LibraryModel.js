import { pool } from "../config/DbConfig.js";

export const getAllBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM library_book ORDER BY id DESC");
  return rows;
};

export const createBook = async (title, author, isbn, copiesTotal) => {
  const total = Number(copiesTotal ?? 1) || 1;
  const [result] = await pool.query(
    "INSERT INTO library_book(title, author, isbn, copies_total, copies_available) VALUES(?, ?, ?, ?, ?)",
    [title, author ?? null, isbn ?? null, total, total],
  );
  return result;
};

export const updateBook = async (id, title, author, isbn, copiesTotal, copiesAvailable) => {
  const [result] = await pool.query(
    `UPDATE library_book 
     SET title = ?, author = ?, isbn = ?, copies_total = ?, copies_available = ?
     WHERE id = ?`,
    [title, author ?? null, isbn ?? null, copiesTotal, copiesAvailable, id],
  );
  return result;
};

export const issueBook = async (bookId, studentId, issuedByAdminId, issueDate, dueDate) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [[book]] = await conn.query("SELECT * FROM library_book WHERE id = ? FOR UPDATE", [bookId]);
    if (!book) {
      throw new Error("BOOK_NOT_FOUND");
    }
    if (book.copies_available <= 0) {
      throw new Error("NO_COPIES");
    }

    const [issueResult] = await conn.query(
      `INSERT INTO library_issue(book_id, student_id, issued_by_admin_id, issue_date, due_date, status)
       VALUES(?, ?, ?, ?, ?, 'ISSUED')`,
      [bookId, studentId, issuedByAdminId ?? null, issueDate, dueDate ?? null],
    );
    await conn.query("UPDATE library_book SET copies_available = copies_available - 1 WHERE id = ?", [bookId]);
    await conn.commit();
    return issueResult;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};

export const returnBook = async (issueId, returnDate) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [[issue]] = await conn.query("SELECT * FROM library_issue WHERE id = ? FOR UPDATE", [issueId]);
    if (!issue) {
      throw new Error("ISSUE_NOT_FOUND");
    }
    if (issue.status === "RETURNED") {
      throw new Error("ALREADY_RETURNED");
    }

    await conn.query(
      "UPDATE library_issue SET status = 'RETURNED', return_date = ? WHERE id = ?",
      [returnDate, issueId],
    );
    await conn.query("UPDATE library_book SET copies_available = copies_available + 1 WHERE id = ?", [issue.book_id]);
    await conn.commit();
    return { bookId: issue.book_id };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};

export const listIssues = async () => {
  const [rows] = await pool.query(
    `SELECT li.id, li.book_id AS bookId, lb.title, lb.author, li.student_id AS studentId, s.name AS studentName,
            li.issue_date AS issueDate, li.due_date AS dueDate, li.return_date AS returnDate, li.status
     FROM library_issue li
     JOIN library_book lb ON lb.id = li.book_id
     JOIN student s ON s.id = li.student_id
     ORDER BY li.id DESC`,
  );
  return rows;
};

export const listIssuesByStudent = async (studentId) => {
  const [rows] = await pool.query(
    `SELECT li.id, li.book_id AS bookId, lb.title, lb.author,
            li.issue_date AS issueDate, li.due_date AS dueDate, li.return_date AS returnDate, li.status
     FROM library_issue li
     JOIN library_book lb ON lb.id = li.book_id
     WHERE li.student_id = ?
     ORDER BY li.id DESC`,
    [studentId],
  );
  return rows;
};

