import { getAttendanceByDate, getStudentAttendanceRange, upsertAttendance } from "../models/AttendanceModel.js";

export const markAttendance = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }

    const { studentId, date, status } = request.body;
    if (!studentId || !date || !status) {
      return response.status(400).json({ message: "studentId, date and status are required" });
    }

    if (!["P", "A"].includes(status)) {
      return response.status(400).json({ message: "status must be 'P' or 'A'" });
    }

    const result = await upsertAttendance(studentId, date, status, request.user.adminId);
    return response.status(200).json({ message: "Attendance saved", affectedRows: result.affectedRows });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const listByDate = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }

    const { date } = request.query;
    if (!date) {
      return response.status(400).json({ message: "date query param is required" });
    }

    const rows = await getAttendanceByDate(date);
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const myAttendance = async (request, response) => {
  try {
    if (request.user?.role !== "student") {
      return response.status(403).json({ message: "Forbidden" });
    }

    const { from, to } = request.query;
    if (!from || !to) {
      return response.status(400).json({ message: "from and to query params are required" });
    }

    const rows = await getStudentAttendanceRange(request.user.studentId, from, to);
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

