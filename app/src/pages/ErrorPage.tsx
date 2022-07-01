import { Container } from "react-bootstrap";

function ErrorPage({message="Page Not Found"}: {message?: string}) {
    return (
        <Container className="page-container">
            <h1>404</h1>
            <h2>{message}</h2>
        </Container>
    );
}

export default ErrorPage;