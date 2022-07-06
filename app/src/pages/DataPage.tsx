import { useState, useEffect } from "react";
import { Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import decode from "../logic/decode";
import ErrorPage from "./ErrorPage";
import { CodeArea, CodeBlock } from "../components";
import { useDataType } from "../hooks";
import "./DataPage.css";

function DataPage() {
    const fileName: string = window.location.pathname.split("/")[2];
    const [valid, setValid] = useState<boolean>(true);
    const [content, setContent] = useState<any[]>([]);
    const [language, setLanguage] = useState<{name: string, extension: string}>({name: "", extension: "txt"});
    const { types, selectType, codeValue, name } = useDataType(content, fileName);

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

    useEffect(() => {
        selectType(language.extension);
    }, [content, selectType, language]);

    if (valid) return (
        <Container className="page-container">
            <Row className="data-title-container">
                <p className="data-title">{fileName}</p>
            </Row>
            <Row className="justify-content-md-center">
                <InputGroup className="data-menu">
                    <InputGroup.Text className="data-menu-title">Select data type:</InputGroup.Text>
                    <Form.Select
                        className="data-menu-control"
                        onChange={(event: any) => {
                            const lang = event.target.value.split(",");
                            setLanguage({
                                name: lang[0],
                                extension: lang[1]
                            });
                        }}
                    >
                        {
                            types.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={[
                                            item.language.name,
                                            item.language.extension
                                        ]}
                                    >
                                        {item.name}
                                    </option>
                                );
                            })
                        }
                    </Form.Select>
                </InputGroup>
            </Row>
            <Row className="justify-content-md-center">
                <CodeBlock
                    className="data-code-display"
                    content={codeValue}
                    name={name}
                    language={language}
                />
            </Row>
        </Container>
    );
    else return (
        <ErrorPage message={`File "${fileName}" does not exists!`} />
    );
}

export default DataPage;