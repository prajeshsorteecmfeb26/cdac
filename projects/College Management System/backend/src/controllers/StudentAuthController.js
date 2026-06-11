import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createOrUpdateStudentAuth,
  getStudentAuthByStudentId,
  getStudentByPhone,
} from "../models/StudentAuthModel.js";

export const loginStudent = async (request, response) => {
  try {
    const { phone, password } = request.body;
    const students = await getStudentByPhone(phone);

    if (students.length === 0) {
      return response.status(400).json({ message: "Invalid Credentials" });
    }

    const student = students[0];
    const authRows = await getStudentAuthByStudentId(student.id);
    if (authRows.length === 0) {
      return response.status(400).json({ message: "Student account not activated" });
    }

    const auth = authRows[0];
    if (!bcrypt.compareSync(password, auth.password_hash)) {
      return response.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ studentId: student.id, role: "student" }, "hello123");
    return response.status(200).json({ message: "Login Successful", token, role: "student" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

// Admin can activate/reset a student's password (simple starter flow).
export const activateStudent = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const { studentId } = request.body;
    if (!studentId) {
      return response.status(400).json({ message: "studentId is required" });
    }

    // Common student password policy across all accounts.
    const passwordHash = bcrypt.hashSync("student123", 10);
    const result = await createOrUpdateStudentAuth(studentId, passwordHash);
    return response.status(201).json({
      message: "Student activated with common password",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

