import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { getStudentById } from "./Service";
import { updateStudent } from "../student-registration/Service";

export function UpdateStudent() {

    const { id } = useParams();  // hook to read all the url parameters {id:6}

    const [formData, setFormData] = useState({ name: '', phone: '', city: '', marks: '' });

    const getStudentData = async ()=>{
        try {
            const response = await getStudentById(id);
            const studentData = response.data; // { name:'', phone: '',}
            setFormData({name: studentData.name, phone: studentData.phone, city: studentData.city, marks: studentData.marks});
        } catch (error) {
            toast.error("Error in fetching data!");
        }
    }

    useEffect(()=>{
        getStudentData();
    },[]);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);

            await updateStudent(id, formData);
            toast.success('Student Data Updated');
            navigate("/students-list");
        } catch (error) {
            console.log(error);
            toast.error('Error inpdation');
        }

    }


    return (
        <Container className="mt-4">
            <Alert variant="success">Update the student</Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData.name} name="name" placeholder="Enter Name" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control type="text" value={formData.phone} name="phone" placeholder="Enter Phone" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={formData.city} placeholder="Enter City" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control type="text" name="marks" value={formData.marks} placeholder="Enter Marks" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    )
}