import axios from 'axios';
import { getApiConfig } from '../../utils/APIUtil';

export function registerStudent(studentData){
    return axios.post("http://localhost:9000/students", studentData, getApiConfig());
}

export function updateStudent(id, studentData){
    return axios.put(`http://localhost:9000/students/${id}`, studentData, getApiConfig());
}