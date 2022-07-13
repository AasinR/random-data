import { useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { DataDisplay, PageTitle } from "../../components";
import { randPassword } from "../../logic";
import "./Random.css";

interface inputType {
    count: number,
    minLength: number,
    maxLength: number
}

function PasswordPage() {
    const [inputValue, setInputValue] = useState<inputType>({ count: 10, minLength: 8, maxLength: 16 });
    const [data, setData] = useState<string[]>([]);
    const maxCount: number = 1000;
    const maxLength: number = 128;

    const handleMin = (event: any) => {
        let min = parseInt(event.target.value, 10);
        if (min < 1) min = 1;
        else if (min > inputValue.maxLength) min = inputValue.maxLength;
        setInputValue({
            count: inputValue.count,
            minLength: min,
            maxLength: inputValue.maxLength
        });
    }

    const handleMax = (event: any) => {
        let max = parseInt(event.target.value, 10);
        if (max < inputValue.minLength) max = inputValue.minLength;
        else if (max > maxLength) max = maxLength;
        setInputValue({
            count: inputValue.count,
            minLength: inputValue.minLength,
            maxLength: max
        });
    }

    const handleCount = (event: any) => {
        let count = parseInt(event.target.value, 10);
        if (count < 1) count = 1;
        else if (count > maxCount) count = maxCount;
        setInputValue({
            count: count,
            minLength: inputValue.minLength,
            maxLength: inputValue.maxLength
        });
    }

    const handleGenerate = () => {
        const result: string[] = []
        for (let i = 0; i < inputValue.count; i++) {
            result.push(randPassword(inputValue.minLength, inputValue.maxLength));
        }
        setData(result);
    }
    
    return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <PageTitle
                    className=""
                    title="Password Generator"
                />
            </Row>
            <Row className="justify-content-md-center">
                <Form className="random-menu">
                    <Row className="password-length">
                        <InputGroup className="password-length-min">
                            <InputGroup.Text className="password-menu-label">Min Length: </InputGroup.Text>
                            <Form.Control
                                className="random-number-input"
                                type="number"
                                min={1}
                                max={inputValue.maxLength}
                                value={inputValue.minLength}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        minLength: event.target.value,
                                        maxLength: inputValue.maxLength
                                    });
                                }}
                                onBlur={handleMin}
                            />
                        </InputGroup>
                        <InputGroup className="password-length-max">
                            <InputGroup.Text className="password-menu-label">Max Length: </InputGroup.Text>
                            <Form.Control
                                className="random-number-input"
                                type="number"
                                min={inputValue.minLength}
                                max={maxLength}
                                value={inputValue.maxLength}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        minLength: inputValue.minLength,
                                        maxLength: event.target.value
                                    });
                                }}
                                onBlur={handleMax}
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup className="">
                            <InputGroup.Text className="password-menu-label">Data count: </InputGroup.Text>
                            <Form.Control
                                className="random-number-input"
                                type="number"
                                min={1}
                                max={maxCount}
                                value={inputValue.count}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: event.target.value,
                                        minLength: inputValue.minLength,
                                        maxLength: inputValue.maxLength
                                    });
                                }}
                                onBlur={handleCount}
                            />
                        </InputGroup>
                    </Row>
                    <Button
                        className="password-menu-submit"
                        variant="outline-dark"
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                </Form>
            </Row>
            <Row className="justify-content-md-center">
                <DataDisplay
                    className="random-data-display"
                    data={data}
                    fileName="password"
                />
            </Row>
        </Container>
    );
}

export default PasswordPage;