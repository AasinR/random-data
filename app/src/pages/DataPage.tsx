import { Container, Row } from "react-bootstrap";
import { ErrorPage } from "../pages";
import { DataDisplay } from "../components";
import { useFetchData } from "../hooks";
import { formatName } from "../logic";
import "./DataPage.css";

function DataPage() {
    const fileName: string = window.location.pathname.split("/")[2];
    const { dataContent, validData } = useFetchData(fileName);

    if (validData) return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <div className="data-title-container">
                    <hr className="data-title-line"/>
                    <h1 className="data-title">{formatName(fileName, "title")}</h1>
                    <hr className="data-title-line"/>
                </div>
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