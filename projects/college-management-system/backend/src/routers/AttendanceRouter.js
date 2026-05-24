import { Router } from "express";
import { listByDate, markAttendance, myAttendance } from "../controllers/AttendanceController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const attendanceRouter = Router();

attendanceRouter.get("/", verifyToken, listByDate); // admin: ?date=YYYY-MM-DD
attendanceRouter.post("/mark", verifyToken, markAttendance); // admin
attendanceRouter.get("/me", verifyToken, myAttendance); // student: ?from=YYYY-MM-DD&to=YYYY-MM-DD

export default attendanceRouter;

