import { useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { DataDisplay, PageTitle } from "../../components";
import { random, time } from "../../logic";
import "./Random.css";

interface inputType {
    count: number,
    format: string,
    start: string,
    end: string
}

function TimePage() {
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<inputType>({
        count: 10,
        format: "hh:mm:ss",
        start: "00:00:00",
        end: "23:59:59"
    });
    const maxCount: number = 1000;

    const handleFromTime = (event: any) => {
        let result: string = event.target.value;
        const start: number = (parseInt(result.split(":")[0], 10) * 3600) + (parseInt(result.split(":")[1], 10) * 60) + parseInt(result.split(":")[2], 10);
        const end: number = (parseInt(inputValue.end.split(":")[0], 10) * 3600) + (parseInt(inputValue.end.split(":")[1], 10) * 60) + parseInt(inputValue.end.split(":")[2], 10);
        if (start > end) {
            result = inputValue.end;
        }
        setInputValue({
            count: inputValue.count,
            format: inputValue.format,
            start: result,
            end: inputValue.end
        });
    }

    const handleToTime = (event: any) => {
        let result: string = event.target.value;
        const start: number = (parseInt(inputValue.start.split(":")[0], 10) * 3600) + (parseInt(inputValue.start.split(":")[1], 10) * 60) + parseInt(inputValue.start.split(":")[2], 10);
        const end: number = (parseInt(result.split(":")[0], 10) * 3600) + (parseInt(result.split(":")[1], 10) * 60) + parseInt(result.split(":")[2], 10);
        if (start > end) {
            result = inputValue.end;
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
        const start: number = time.toNumber(inputValue.start);
        const end: number = time.toNumber(inputValue.end);
        const result: string[] = [];
        for (let i = 0; i < inputValue.count; i++) {
            const randTime: number = random.randInt(start, end);
            result.push(time.toString(randTime, inputValue.format));
        }
        setData(result);
    }

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <PageTitle
                    title="Time generator"
                />
            </Row>
            <Row className="justify-content-md-center">
                <div className="random-menu">
                    <Row className="time-interval">
                        <InputGroup className="time-interval-from">
                            <InputGroup.Text className="time-menu-label">From:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="time"
                                max={inputValue.end}
                                step={1}
                                value={inputValue.start}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        format: inputValue.format,
                                        start: event.target.value,
                                        end: inputValue.end
                                    });
                                }}
                                onBlur={handleFromTime}
                            />
                        </InputGroup>
                        <InputGroup className="time-interval-to">
                            <InputGroup.Text className="time-menu-label">To:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="time"
                                min={inputValue.start}
                                step={1}
                                value={inputValue.end}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        format: inputValue.format,
                                        start: inputValue.start,
                                        end: event.target.value
                                    });
                                }}
                                onBlur={handleToTime}
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text className="time-menu-label">Time format:</InputGroup.Text>
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
                                <option value="hh:mm:ss">hh:mm:ss</option>
                                <option value="hh:mm">hh:mm</option>
                                <option value="mm:ss">mm:ss</option>
                            </Form.Select>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text className="time-menu-label">Data count:</InputGroup.Text>
                            <Form.Control
                                className="random-number-input random-input"
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
                        className="time-menu-submit random-input"
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
                    fileName="time"
                />
            </Row>
        </Container>
    );
}

export default TimePage;