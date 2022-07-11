import { Container, Row } from "react-bootstrap";
import { ErrorPage } from "../pages";
import { DataDisplay, PageTitle } from "../components";
import { useFetchData } from "../hooks";
import { formatName } from "../logic";
import "./DataPage.css";

function DataPage() {
    const fileName: string = window.location.pathname.split("/")[2];
    const { dataContent, validData } = useFetchData(fileName);

    if (validData) return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <PageTitle
                    className="data-page-title"
                    title={formatName(fileName, "title")}
                />
            </Row>
            <Row className="justify-content-md-center">
                <DataDisplay
                    className="data-display-block"
                    data={dataContent}
                    fileName={fileName}
                />
            </Row>
        </Container>
    );
    else return (
        <ErrorPage message={`File "${fileName}" does not exists!`} />
    );
}

export default DataPage;