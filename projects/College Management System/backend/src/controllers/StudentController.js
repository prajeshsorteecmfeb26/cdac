import { getAllStudents, getStudentById, createStudent, deleteStudentById, updateStudentById } from '../models/StudentModel.js';
import bcrypt from "bcrypt";
import { createOrUpdateStudentAuth } from "../models/StudentAuthModel.js";

export const getAll = async (request, response) => {
    try {
        const rows = await getAllStudents();
        response.status(200).json(rows);
    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await getStudentById(id);
        if (data.length === 0) {
            return response.status(404).json({ message: 'Student not found with given id' });
        }
        return response.status(200).json(data[0]);

    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const save = async (request, response)=>{
    try {
        const { name, phone, city, marks } = request.body;
        const result = await createStudent(name, phone, city, marks);
        // Every student can log in with phone + common password.
        const passwordHash = bcrypt.hashSync("student123", 10);
        await createOrUpdateStudentAuth(result.insertId, passwordHash);
        response.status(201).json({insertedId: result.insertId});
    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteById = async (request, response) => {
    try {
       const id = request.params.id;
       const result = await deleteStudentById(id);
       response.status(200).json({message:'Student data deleted'});
    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}

export const updateById = async (request, response) => {
    try {
       const id = request.params.id;  
       const {name, phone, city, marks} = request.body;   
       const result = await updateStudentById(id, name, phone, city, marks);
       response.status(200).json({message:'Student Data Updated'});
    } catch (error) {
        response.status(500).json({ message: "Something went wrong" });
    }
}