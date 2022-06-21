import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";


function NavBar() {
    
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-nav-bar" />
                <Navbar.Collapse id="basic-nav-bar">
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" as={Link} to="data">Data</Nav.Link>
                        <Nav.Link className="nav-link" as={Link} to="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;