-- Dummy data for College Management System
-- Database: dummy_db (see src/config/DbConfig.js)
--
-- Order:
-- 1) Run your existing tables (admin, student) creation (already present in your project/db)
-- 2) Run: src/db/schema.sql
-- 3) Run: src/db/seed.sql (this file)

START TRANSACTION;

-- -------------------------
-- Admins (Login)
-- -------------------------
-- 3 allowed admins for demo. Password for all: admin123
-- bcrypt hash generated via Node + bcrypt:
-- $2b$10$Zuf8wZ2dxKItJK0anL.en.WQTMZrqwGUPEOggdcleKCHpb6MUidnS
DELETE FROM admin;
ALTER TABLE admin AUTO_INCREMENT = 1;

INSERT INTO admin (name, phone, password) VALUES
('Pushkar',  '707070', '$2b$10$Zuf8wZ2dxKItJK0anL.en.WQTMZrqwGUPEOggdcleKCHpb6MUidnS'),
('Prajesh',  '808080', '$2b$10$Zuf8wZ2dxKItJK0anL.en.WQTMZrqwGUPEOggdcleKCHpb6MUidnS'),
('Prajakta', '909090', '$2b$10$Zuf8wZ2dxKItJK0anL.en.WQTMZrqwGUPEOggdcleKCHpb6MUidnS')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  password = VALUES(password);

-- -------------------------
-- Students (Student Management)
-- -------------------------
-- Keep demo DB clean: ensure we have exactly 25 students after seeding.
DELETE FROM student;
ALTER TABLE student AUTO_INCREMENT = 1;

INSERT INTO student (name, phone, city, marks) VALUES
('Aarav Sharma', '9000000001', 'Pune', 85),
('Diya Patel',   '9000000002', 'Mumbai', 91),
('Kabir Singh',  '9000000003', 'Nagpur', 76),
('Ananya Iyer',  '9000000004', 'Nashik', 88),
('Rohan Das',    '9000000005', 'Delhi', 69),
('Isha Nair',    '9000000006', 'Kochi', 72),
('Vivek Rao',    '9000000007', 'Bengaluru', 84),
('Sneha Gupta',  '9000000008', 'Indore', 90),
('Arjun Mehta',  '9000000009', 'Ahmedabad', 77),
('Priya Joshi',  '9000000010', 'Surat', 81),
('Neha Kulkarni','9000000011', 'Pune', 88),
('Aditya Verma', '9000000012', 'Lucknow', 74),
('Meera Menon',  '9000000013', 'Chennai', 92),
('Sahil Khan',   '9000000014', 'Hyderabad', 68),
('Riya Singh',   '9000000015', 'Jaipur', 83),
('Kunal Sharma', '9000000016', 'Bhopal', 79),
('Tanvi Patil',  '9000000017', 'Mumbai', 86),
('Nikhil Das',   '9000000018', 'Kolkata', 71),
('Aditi Iyer',   '9000000019', 'Chennai', 89),
('Rahul Jain',   '9000000020', 'Delhi', 75),
('Pooja Rao',    '9000000021', 'Bengaluru', 93),
('Mohit Gupta',  '9000000022', 'Indore', 67),
('Sanya Mehta',  '9000000023', 'Ahmedabad', 82),
('Dev Patel',    '9000000024', 'Surat', 78),
('Ankit Joshi',  '9000000025', 'Nashik', 80);

-- -------------------------
-- Student logins (Student Auth)
-- Password for activated students: student123
-- bcrypt hash generated via Node + bcrypt:
-- $2b$10$RRbATAzJ/l1rb6gLiM2qeORXh8wpkI7NLYh6qezl8y0A7jglJQd8m
-- -------------------------
INSERT INTO student_auth (student_id, password_hash)
SELECT s.id, '$2b$10$RRbATAzJ/l1rb6gLiM2qeORXh8wpkI7NLYh6qezl8y0A7jglJQd8m'
FROM student s
-- Activate ALL students with the same password for demo.
WHERE s.phone LIKE '90000000%'
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- -------------------------
-- Attendance (dummy dates)
-- status: 'P' = Present, 'A' = Absent
-- -------------------------
INSERT INTO attendance (student_id, date, status, marked_by_admin_id)
SELECT s.id, '2026-05-01', 'P', NULL FROM student s WHERE s.phone IN ('9000000001','9000000002','9000000003')
ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by_admin_id = VALUES(marked_by_admin_id);

INSERT INTO attendance (student_id, date, status, marked_by_admin_id)
SELECT s.id, '2026-05-02', 'A', NULL FROM student s WHERE s.phone IN ('9000000003')
ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by_admin_id = VALUES(marked_by_admin_id);

INSERT INTO attendance (student_id, date, status, marked_by_admin_id)
SELECT s.id, '2026-05-02', 'P', NULL FROM student s WHERE s.phone IN ('9000000001','9000000002','9000000004','9000000005')
ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by_admin_id = VALUES(marked_by_admin_id);

-- -------------------------
-- Library: Books
-- -------------------------
INSERT INTO library_book (title, author, isbn, copies_total, copies_available) VALUES
('Clean Code', 'Robert C. Martin', '9780132350884', 3, 3),
('Introduction to Algorithms', 'Cormen et al.', '9780262033848', 2, 2),
('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 1, 1),
('Database System Concepts', 'Silberschatz', '9780073523323', 2, 2),
('Operating System Concepts', 'Silberschatz', '9781118063330', 2, 2),
('Computer Networks', 'Andrew S. Tanenbaum', '9780132126953', 2, 2),
('Artificial Intelligence: A Modern Approach', 'Russell & Norvig', '9780134610993', 1, 1),
('Head First Java', 'Kathy Sierra', '9780596009205', 3, 3),
('Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509', 2, 2),
('Java: The Complete Reference', 'Herbert Schildt', '9781260440232', 2, 2),
('Learning SQL', 'Alan Beaulieu', '9780596520830', 2, 2),
('You Don’t Know JS Yet', 'Kyle Simpson', '9781091210098', 2, 2),
('Design Patterns', 'Gamma et al.', '9780201633610', 1, 1),
('Refactoring', 'Martin Fowler', '9780134757599', 1, 1)
ON DUPLICATE KEY UPDATE
  author = VALUES(author),
  isbn = VALUES(isbn),
  copies_total = VALUES(copies_total),
  copies_available = VALUES(copies_available);

-- Library: Issues (mix of issued and returned)
-- Note: issued_by_admin_id left NULL in seed data.
INSERT INTO library_issue (book_id, student_id, issued_by_admin_id, issue_date, due_date, return_date, status)
SELECT b.id, s.id, NULL, '2026-05-03', '2026-05-17', NULL, 'ISSUED'
FROM library_book b
JOIN student s ON s.phone = '9000000001'
WHERE b.title = 'Clean Code';

INSERT INTO library_issue (book_id, student_id, issued_by_admin_id, issue_date, due_date, return_date, status)
SELECT b.id, s.id, NULL, '2026-05-01', '2026-05-15', '2026-05-06', 'RETURNED'
FROM library_book b
JOIN student s ON s.phone = '9000000002'
WHERE b.title = 'The Pragmatic Programmer';

-- Adjust copies_available for the above issue rows (simple recompute)
UPDATE library_book lb
SET lb.copies_available = lb.copies_total - (
  SELECT COUNT(*) FROM library_issue li
  WHERE li.book_id = lb.id AND li.status = 'ISSUED'
);

-- -------------------------
-- Library Requests (student -> admin)
-- -------------------------
INSERT INTO library_request (book_id, student_id, request_date, status, notes)
SELECT b.id, s.id, '2026-05-05', 'PENDING', 'Need for assignment'
FROM library_book b
JOIN student s ON s.phone = '9000000003'
WHERE b.title = 'Introduction to Algorithms';

COMMIT;

