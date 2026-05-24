import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerStudent } from "./Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function StudentRegistration() {

    const [formData, setFormData] = useState({ name: '', phone: '', city: '', marks: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);
            await registerStudent(formData);
            toast.success('Student got registered');
            navigate("/students-list");
        } catch (error) {
            console.log(error);
            toast.error('Error in registration');
        }

    }


    return (
        <Container className="mt-4">
            <Alert variant="success">Register the student</Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Enter Phone" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" placeholder="Enter City" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control type="text" name="marks" placeholder="Enter Marks" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Container>
    )
}