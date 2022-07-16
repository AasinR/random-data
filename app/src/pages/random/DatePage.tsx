import { useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { DataDisplay, PageTitle } from "../../components";
import { useDateFormat } from "../../hooks";
import { formatDate, random } from "../../logic";
import "./Random.css";

interface inputType {
    count: number,
    format: string,
    start: string,
    end: string
}

function DatePage() {
    const date: Date = new Date();
    const formatTypes = useDateFormat();
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<inputType>({
        count: 10,
        format: formatTypes[0].value,
        start: `${date.getFullYear() - 4}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, "0")}`,
        end: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    });
    const maxCount: number = 1000;

    const handleFromDate = (event: any) => {
        const input: number = new Date(event.target.value).getTime();
        const maxDate: number = new Date(inputValue.end).getTime();
        let result: string = event.target.value;
        if (input > maxDate) {
            result = inputValue.end;
        }
        setInputValue({
            count: inputValue.count,
            format: inputValue.format,
            start: result,
            end: inputValue.end
        });
    }

    const handleToDate = (event: any) => {
        const input: number = new Date(event.target.value).getTime();
        const minDate: number = new Date(inputValue.start).getTime();
        let result: string = event.target.value;
        if (input < minDate) {
            result = inputValue.start;
        }
        setInputValue({
            count: inputValue.count,
            format: inputValue.format,
            start: inputValue.start,
            end: result
        });
    }

    const handleCount = (event: any) => {
        let count = parseInt(event.target.value, 10);
        if (count < 1) count = 1;
        else if (count > maxCount) count = maxCount;
        setInputValue({
            count: count,
            format: inputValue.format,
            start: inputValue.start,
            end: inputValue.end
        });
    }

    const handleGenerate = () => {
        const result: string[] = []
        const format: string[] = inputValue.format.split("|");
        for (let i = 0; i < inputValue.count; i++) {
            const randDate: Date = random.date(new Date(inputValue.start), new Date(inputValue.end));
            result.push(formatDate(randDate, format[0], format[1]));
        }
        setData(result);
    }

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <PageTitle
                    title="Date generator"
                />
            </Row>
            <Row className="justify-content-md-center">
                <div className="random-menu">
                    <Row className="date-interval">
                        <InputGroup className="date-interval-from">
                            <InputGroup.Text className="date-menu-label">From:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="date"
                                max={inputValue.end}
                                value={inputValue.start}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        format: inputValue.format,
                                        start: event.target.value,
                                        end: inputValue.end
                                    });
                                }}
                                onBlur={handleFromDate}
                            />
                        </InputGroup>
                        <InputGroup className="date-interval-to">
                            <InputGroup.Text className="date-menu-label">To:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="date"
                                min={inputValue.start}
                                value={inputValue.end}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        format: inputValue.format,
                                        start: inputValue.start,
                                        end: event.target.value
                                    });
                                }}
                                onBlur={handleToDate}
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text className="date-menu-label">Date format:</InputGroup.Text>
                            <Form.Select
                                className="random-input"
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        format: event.target.value,
                                        start: inputValue.start,
                                        end: inputValue.end
                                    });
                                }}
                            >
                                {
                                    formatTypes.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>
                                                {item.title}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text className="date-menu-label">Data count:</InputGroup.Text>
                            <Form.Control
                                className="random-number-input"
                                type="number"
                                min={1}
                                max={maxCount}
                                value={inputValue.count}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: event.target.value,
                                        format: inputValue.format,
                                        start: inputValue.start,
                                        end: inputValue.end
                                    });
                                }}
                                onBlur={handleCount}
                            />
                        </InputGroup>
                    </Row>
                    <Button
                        className="date-menu-submit random-input"
                        variant="outline-dark"
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                </div>
            </Row>
            <Row className="justify-content-md-center">
                <DataDisplay
                    data={data}
                    fileName="date"
                />
            </Row>
        </Container>
    );
}

export default DatePage;