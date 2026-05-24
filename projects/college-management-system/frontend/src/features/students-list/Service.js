// this file will contain the functions which are calling the api
// this service is for students list so this will contain the function to call get all students api

import axios from "axios";
import { getToken } from "../login/TokenService";
import { getApiConfig } from "../../utils/APIUtil";

export function fetchAllStudents() {
    return axios.get("http://localhost:9000/students",
        getApiConfig()
    );
}

export function deleteStudentById(id) {
    return axios.delete(`http://localhost:9000/students/${id}`, 
        getApiConfig()
    );
}