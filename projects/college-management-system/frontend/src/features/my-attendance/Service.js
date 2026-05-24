import axios from "axios";
import { getApiConfig } from "../../utils/APIUtil";

export function fetchMyAttendance(from, to) {
  return axios.get(
    `http://localhost:9000/attendance/me?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    getApiConfig(),
  );
}

