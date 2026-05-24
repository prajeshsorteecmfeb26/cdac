import { pool } from '../config/DbConfig.js';

export const getAllStudents = async () => {
    const [rows] = await pool.query("SELECT * FROM student");
    return rows;
};

export const getStudentById = async (id) => {
    const [data] = await pool.query(`SELECT * FROM student WHERE id = ?`, [id]);
    return data;
};

export const createStudent = async (name, phone, city, marks) => {
    const [result] = await pool.query(
        "INSERT INTO student(name, phone, city, marks) VALUES(?, ?, ?, ?)",
        [name, phone, city, marks]
    );
    return result;
};

export const deleteStudentById = async (id) => {
    const [result] = await pool.query("DELETE FROM student WHERE id = ?", [id]);
    return result;
};

export const updateStudentById = async (id, name, phone, city, marks) => {
    const [result] = await pool.query(
        "UPDATE student SET name = ?, phone = ?, city = ?, marks = ? WHERE id = ?", 
        [name, phone, city, marks, id]
    );
    return result;
};
