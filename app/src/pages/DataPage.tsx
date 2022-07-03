import { useState, useEffect } from "react";
import { Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import decode from "../logic/decode";
import ErrorPage from "./ErrorPage";
import { CodeBlock } from "../components";
import "./DataPage.css";

function DataPage() {
    const [valid, setValid] = useState<boolean>(true);
    const [content, setContent] = useState<any[]>([]);

    const fileName: string = window.location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`https://api.github.com/repos/AasinR/random-data/contents/data/${fileName}.json`)
            .then(res => {
                setContent(decode(res.data.content));

                console.log(res.data);
            })
            .catch(error => {
                setValid(false);
            });
    }, [fileName]);

    if (valid) return (
        <Container className="page-container">
            <Row>
                <p>{fileName}</p>
                <div>
                    <CodeBlock
                        content={ content.join("\n") }
                        name={fileName}
                        extension="json"
                        rows={5}
                        disabled
                    />
                </div>
            </Row>
            <Row className="justify-content-md-center">
                <Form.Control className="content-display"
                    as="textarea" 
                    rows={10}
                    value={ content.join("\n") }
                    disabled
                />
            </Row>
        </Container>
    );
    else return (
        <ErrorPage message={`File "${fileName}" does not exists!`} />
    );
}

export default DataPage;