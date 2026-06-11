import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRole } from "../login/TokenService";

export function Home(){
    const navigate = useNavigate();
    const role = getRole();
    const isStudent = role === "student";

    const currentHour = new Date().getHours();
    const greeting =
      currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening";

    return (
        <Container className="mt-4">
            <Alert variant="primary" className="shadow-sm">
                {isStudent ? `${greeting}, Student` : "Welcome to College Management System"}
            </Alert>
            <p className="mb-4">
                {isStudent ? "Choose your module to continue." : "Choose a module to continue."}
            </p>

            <Row className="g-3">
                {!isStudent ? (
                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>Student Management</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    Register students, update details, and manage student records.
                                </Card.Text>
                                <div className="d-flex gap-2">
                                    <Button variant="primary" onClick={() => navigate("/students-list")}>Open</Button>
                                    <Button variant="outline-primary" onClick={() => navigate("/register-student")}>Register</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ) : null}

                <Col md={6} lg={4}>
                    <Card className="shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{isStudent ? "My Attendance" : "Attendance"}</Card.Title>
                            <Card.Text className="flex-grow-1">
                                {isStudent
                                    ? "View your attendance history."
                                    : "Mark daily attendance and view attendance history."}
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => navigate(isStudent ? "/my-attendance" : "/attendance")}
                            >
                                Open
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4}>
                    <Card className="shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{isStudent ? "My Library" : "Library"}</Card.Title>
                            <Card.Text className="flex-grow-1">
                                {isStudent
                                    ? "View your library requests and issued books."
                                    : "Manage books and track book issues/returns."}
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => navigate(isStudent ? "/my-library" : "/library")}
                            >
                                Open
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}