import { Container, Row } from "react-bootstrap";
import { DataCard, SearchBar } from "../components";
import { useFetchDataList } from "../hooks";
import "./DataListPage.css";

function DataListPage() {
    const { dataList } = useFetchDataList();

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center searchbar">
                <SearchBar placeholder="Search..." data={dataList} />
            </Row>
            <Row className="data-list">
                {dataList.map((data, index) => {
                    return (
                        <DataCard key={index} name={data.title} href={"/data/" + data.fileName.split(".")[0]} />
                    );
                })}
            </Row>
        </Container>
    );
}

export default DataListPage;