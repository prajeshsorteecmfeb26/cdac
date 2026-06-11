import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Table } from "react-bootstrap";
import { deleteStudentById, fetchAllStudents } from "./Service";
import './students-list.css';
import { useNavigate } from "react-router-dom";
import { getRole } from "../login/TokenService";

export function StudentsList() {

    const [studentsList, setStudentsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(0);

    const navigate = useNavigate(); // it will return a function, using which we can send a user on a new url
    const isStudent = getRole() === "student";

    const getStudents = async () => {
        try {
            const response = await fetchAllStudents();
            setStudentsList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const closeDeleteConfirmModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        getStudents();
    }, []);

    const deleteStudent = async () => {
        try {
            await deleteStudentById(selectedStudentId);
            closeDeleteConfirmModal();
            getStudents();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="mt-4">
            <Alert variant="success">List of Students</Alert>
            {
                studentsList.length === 0 ? <h4>No Student found !</h4> : <Table className="mt-2">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Marks</th>
                            {isStudent ? null : <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentsList.map((student) => {
                                return (
                                    <tr>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.city}</td>
                                        <td>{student.marks}</td>
                                        {isStudent ? null : (
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="row-button"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setSelectedStudentId(student.id);
                                                    }}
                                                >Delete</Button>
                                                <Button variant="primary" size="sm" onClick={()=>{
                                                    navigate(`/edit-student/${student.id}`);
                                                }}>Edit</Button>
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }

            <Modal show={showModal} onHide={closeDeleteConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to delete data for id: {selectedStudentId} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={deleteStudent}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={closeDeleteConfirmModal}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}