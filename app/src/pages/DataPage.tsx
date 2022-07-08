import { useState, useEffect } from "react";
import { Container, Form, InputGroup, Row } from "react-bootstrap";
import { ErrorPage } from "../pages";
import { CodeBlock } from "../components";
import { useDataType, useFetchData } from "../hooks";
import "./DataPage.css";

type formvalue = {
    language: {
        name: string,
        extension: string
    },
    format: boolean
};

function DataPage() {
    const fileName: string = window.location.pathname.split("/")[2];
    const { dataContent, validData } = useFetchData(fileName);
    const [formValue, setFormValue] = useState<formvalue>({ language: { name: "text", extension: "txt" }, format: false });
    const { types, selectType, codeValue, name } = useDataType(dataContent, fileName);

    useEffect(() => {
        selectType(formValue.language.extension, formValue.format);
    }, [dataContent, selectType, formValue]);

    if (validData) return (
        <Container className="page-container">
            <Row className="data-title-container">
                <p className="data-title">{fileName}</p>
            </Row>
            <Row className="justify-content-md-center">
                <Form className="data-menu">
                    <InputGroup>
                        <InputGroup.Text className="data-menu-title">Select data type:</InputGroup.Text>
                        <Form.Select
                            className="data-menu-control"
                            onChange={(event: any) => {
                                const lang = event.target.value.split(",");
                                setFormValue({
                                    language: {
                                        name: lang[0],
                                        extension: lang[1]
                                    },
                                    format: formValue.format
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
                    <InputGroup>
                        <InputGroup.Text className="data-menu-title">Select format:</InputGroup.Text>
                        <Form.Select
                            className="data-menu-control"
                            onChange={(event: any) => {
                                setFormValue({
                                    language: formValue.language,
                                    format: !!event.target.value
                                });
                            }}
                        >
                            <option value="">New Line</option>
                            <option value="true">Single Line</option>
                        </Form.Select>
                    </InputGroup>
                </Form>
            </Row>
            <Row className="justify-content-md-center">
                <CodeBlock
                    className="data-code-display"
                    content={codeValue}
                    name={name}
                    language={formValue.language}
                />
            </Row>
        </Container>
    );
    else return (
        <ErrorPage message={`File "${fileName}" does not exists!`} />
    );
}

export default DataPage;