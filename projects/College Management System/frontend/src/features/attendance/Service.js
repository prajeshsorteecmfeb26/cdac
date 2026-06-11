import axios from "axios";
import { getApiConfig } from "../../utils/APIUtil";

export function fetchAttendanceByDate(date) {
  return axios.get(`http://localhost:9000/attendance?date=${encodeURIComponent(date)}`, getApiConfig());
}

export function markAttendance({ studentId, date, status }) {
  return axios.post(
    "http://localhost:9000/attendance/mark",
    { studentId, date, status },
    getApiConfig(),
  );
}

