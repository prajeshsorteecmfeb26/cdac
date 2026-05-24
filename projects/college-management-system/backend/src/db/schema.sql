-- College Management System schema additions (Attendance + Library + Student Auth)
-- Run these in your MySQL database (dummy_db) once.

-- Base tables (admin, student) used across modules.
-- Some older versions of this project assumed these tables already existed,
-- but seed/login requires them, so we create them if missing.
CREATE TABLE IF NOT EXISTS admin (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_phone (phone)
);

CREATE TABLE IF NOT EXISTS student (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  city VARCHAR(120) NULL,
  marks INT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_student_phone (phone)
);

-- If you already have older versions of these tables, we reset them for a clean demo DB.
DROP TABLE IF EXISTS library_issue;
DROP TABLE IF EXISTS library_request;
DROP TABLE IF EXISTS library_book;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS student_auth;

CREATE TABLE IF NOT EXISTS student_auth (
  student_id INT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id),
  CONSTRAINT fk_student_auth_student
    FOREIGN KEY (student_id) REFERENCES student(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(1) NOT NULL, -- 'P' or 'A'
  marked_by_admin_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_attendance_student_date (student_id, date),
  CONSTRAINT fk_attendance_student
    FOREIGN KEY (student_id) REFERENCES student(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS library_book (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NULL,
  isbn VARCHAR(40) NULL,
  copies_total INT NOT NULL DEFAULT 1,
  copies_available INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS library_request (
  id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  student_id INT NOT NULL,
  request_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING | APPROVED | REJECTED
  notes VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_library_request_book
    FOREIGN KEY (book_id) REFERENCES library_book(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_library_request_student
    FOREIGN KEY (student_id) REFERENCES student(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS library_issue (
  id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  student_id INT NOT NULL,
  issued_by_admin_id INT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NULL,
  return_date DATE NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ISSUED', -- ISSUED | RETURNED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_library_issue_book
    FOREIGN KEY (book_id) REFERENCES library_book(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_library_issue_student
    FOREIGN KEY (student_id) REFERENCES student(id)
    ON DELETE CASCADE
);

