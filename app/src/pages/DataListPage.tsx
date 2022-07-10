import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { DataCard, SearchBar } from "../components";
import { useFetchDataList } from "../hooks";
import "./DataListPage.css";

function DataListPage() {
    const [searchList, setSearchList] = useState<{ title: string, link: string }[]>([]);
    const { dataList } = useFetchDataList();

    useEffect(() => {
        const result: { title: string, link: string }[] = [];
        dataList.forEach((item: { title: string, fileName: string }) => {
            result.push({
                title: item.title,
                link: `/data/${item.fileName.split(".")[0]}`
            });
        });
        setSearchList(result);
    }, [dataList]);

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center searchbar">
                <SearchBar placeholder="Search..." searchList={searchList} />
            </Row>
            <Row className="data-list">
                {dataList.map((item: { title: string, fileName: string }, index: number) => {
                    return (
                        <DataCard key={index} name={item.title} href={`/data/${item.fileName.split(".")[0]}`} />
                    );
                })}
            </Row>
        </Container>
    );
}

export default DataListPage;