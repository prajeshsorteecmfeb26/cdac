import axios from "axios";

export function loginAdmin(credentials) {
    return axios.post("http://localhost:9000/admins/login", credentials);
}

export function loginStudent(credentials) {
    return axios.post("http://localhost:9000/student-auth/login", credentials);
}