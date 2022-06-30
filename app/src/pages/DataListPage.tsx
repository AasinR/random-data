import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import axios from 'axios';
import DataCard from "../components/data_card/DataCard";
import SearchBar from "../components/searchbar/SearchBar";
import "./DataListPage.css";

function DataListPage() {
    const [dataFiles, setDataFiles] = useState<any[]>([]);

    useEffect(() => {
        axios.get("https://api.github.com/repos/AasinR/random-data/contents/data")
            .then(res => {
                setDataFiles(res.data);
            });
    }, []);

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center searchbar">
                <SearchBar placeholder="Search..." data={dataFiles} />
            </Row>
            <Row className="data-list">
                {dataFiles.map((data, index) => {
                    const fileName: string = data.name.split(".")[0];

                    return (
                        <DataCard key={index} name={fileName} href={"/data/" + fileName} />
                    );
                })}
            </Row>
        </Container>
    );
}

export default DataListPage;