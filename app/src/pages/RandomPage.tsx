import { Container, Row } from "react-bootstrap";
import { DataCard, SearchBar } from "../components";
import "./RandomPage.css";

function RandomPage() {
    const dataList: { title: string, link: string }[] = [
        {
            title: "Password",
            link: "/random/password"
        },
        {
            title: "Date",
            link: "/random/date"
        }
    ];

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center searchbar">
                <SearchBar placeholder="Search..." searchList={dataList} />
            </Row>
            <Row className="random-list">
                {dataList.map((item: { title: string, link: string }, index: number) => {
                    return (
                        <DataCard key={index} name={item.title} href={item.link} />
                    );
                })}
            </Row>
        </Container>
    );
}

export default RandomPage;