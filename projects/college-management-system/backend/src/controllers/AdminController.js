import {
    getAdminByPhone,
    createAdmin,
    getAllStudentCredentials,
    updateStudentPasswordHash,
} from '../models/AdminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (request, response) => {
    try {
        const { phone, password } = request.body;        
        const result = await getAdminByPhone(phone);        

        if (result.length === 0) {
            response.status(400).json({ message: 'Invalid Credentials' });
        }
        else {
            if (bcrypt.compareSync(password, result[0].password)) {
                const token = jwt.sign({ adminId: result[0].id, role: "admin" }, "hello123");
                response.status(200).json({ message: 'Login Successful', token, role: "admin" });
            }
            else{
               response.status(400).json({ message: 'Invalid Credentials' }); 
            }
        }

    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const register = async (request, response) => {
    try {
        const { name, phone, password } = request.body;        
        const encryptedPassword = bcrypt.hashSync(password, 10);        
        const result = await createAdmin(name, phone, encryptedPassword);
        response.status(201).json({ insertedId: result.insertId });
    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const listStudentCredentials = async (request, response) => {
    try {
        if (request.user?.role !== "admin") {
            return response.status(403).json({ message: "Forbidden" });
        }

        const rows = await getAllStudentCredentials();
        return response.status(200).json(rows);
    } catch (error) {
        return response.status(500).json({ message: "Something went wrong" });
    }
};

export const updateStudentPassword = async (request, response) => {
    try {
        if (request.user?.role !== "admin") {
            return response.status(403).json({ message: "Forbidden" });
        }

        const studentId = Number(request.params.studentId);
        if (!studentId || Number.isNaN(studentId)) {
            return response.status(400).json({ message: "Valid studentId is required" });
        }

        // Common student password policy across all accounts.
        const passwordHash = bcrypt.hashSync("student123", 10);
        const result = await updateStudentPasswordHash(studentId, passwordHash);
        return response.status(200).json({
            message: "Student password reset to common password",
            affectedRows: result.affectedRows,
        });
    } catch (error) {
        return response.status(500).json({ message: "Something went wrong" });
    }
};