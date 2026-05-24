import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getRole, removeToken } from "../features/login/TokenService";
import { useNavigate } from "react-router-dom";

export function NavigationBar() {

    const navigate = useNavigate();
    const role = getRole();

    const logout = ()=>{
        removeToken();
        navigate("/");
    }

    return (
        <Navbar expand="lg" className="shadow-sm mb-4" style={{ backgroundColor: 'var(--accent)' }} variant="dark">
            <Container>
                <Navbar.Brand href="#home" style={{ fontWeight: 'bold', color: 'white' }}>College Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/students-list">
                            <Nav.Link>Students List</Nav.Link>
                        </LinkContainer>

                        {role !== "student" ? (
                            <>
                                <LinkContainer to="/register-student">
                                    <Nav.Link>Register Student</Nav.Link>
                                </LinkContainer>
                            </>
                        ) : null}

                        <LinkContainer to="/library">
                            <Nav.Link>Library</Nav.Link>
                        </LinkContainer>

                        {role !== "student" ? (
                            <LinkContainer to="/attendance">
                                <Nav.Link>Attendance</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/my-attendance">
                                <Nav.Link>My Attendance</Nav.Link>
                            </LinkContainer>
                        )}

                        {role === "student" ? (
                            <LinkContainer to="/my-library">
                                <Nav.Link>My Library</Nav.Link>
                            </LinkContainer>
                        ) : null}


                        
                    </Nav>
                    <Button variant="success" size="sm" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}