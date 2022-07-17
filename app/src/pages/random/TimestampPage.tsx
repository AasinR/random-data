import { useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { DataDisplay, PageTitle } from "../../components";
import { formatDate, random, time } from "../../logic";
import "./Random.css";

interface inputType {
    count: number,
    dateStart: string,
    dateEnd: string,
    timeStart: string,
    timeEnd: string
}

function TimestampPage() {
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<inputType>({
        count: 10,
        dateStart: formatDate(new Date(new Date().getTime() - 126227704000), "yyyy-mm-dd"),
        dateEnd: formatDate(new Date(), "yyyy-mm-dd"),
        timeStart: "00:00:00",
        timeEnd: "23:59:59"
    });
    const maxCount: number = 1000;

    const handleFromDate = (event: any) => {
        const start: number = new Date(event.target.value).getTime();
        const end: number = new Date(inputValue.dateEnd).getTime();
        let result: string = event.target.value;
        if (start > end) {
            result = inputValue.dateEnd;
        }
        setInputValue({
            count: inputValue.count,
            dateStart: result,
            dateEnd: inputValue.dateEnd,
            timeStart: inputValue.timeStart,
            timeEnd: inputValue.timeEnd
        });
    }

    const handleToDate = (event: any) => {
        const start: number = new Date(inputValue.dateStart).getTime();
        const end: number = new Date(event.target.value).getTime();
        let result: string = event.target.value;
        if (start > end) {
            result = inputValue.dateStart;
        }
        setInputValue({
            count: inputValue.count,
            dateStart: inputValue.dateStart,
            dateEnd: result,
            timeStart: inputValue.timeStart,
            timeEnd: inputValue.timeEnd
        });
    }

    const handleFromTime = (event: any) => {
        let result: string = event.target.value;
        const start: number = time.toNumber(result);
        const end: number = time.toNumber(inputValue.timeEnd);
        if (start > end) {
            result = inputValue.timeEnd;
        }
        setInputValue({
            count: inputValue.count,
            dateStart: inputValue.dateStart,
            dateEnd: inputValue.dateEnd,
            timeStart: result,
            timeEnd: inputValue.timeEnd
        });
    }

    const handleToTime = (event: any) => {
        let result: string = event.target.value;
        const start: number = time.toNumber(inputValue.timeStart);
        const end: number = time.toNumber(result);
        if (start > end) {
            result = inputValue.timeStart;
        }
        setInputValue({
            count: inputValue.count,
            dateStart: inputValue.dateStart,
            dateEnd: inputValue.dateEnd,
            timeStart: inputValue.timeStart,
            timeEnd: result
        });
    }

    const handleCount = (event: any) => {
        let count = parseInt(event.target.value, 10);
        if (count < 1) count = 1;
        else if (count > maxCount) count = maxCount;
        setInputValue({
            count: count,
            dateStart: inputValue.dateStart,
            dateEnd: inputValue.dateEnd,
            timeStart: inputValue.timeStart,
            timeEnd: inputValue.timeEnd
        });
    }

    const handleGenerate = () => {
        const dateStart: Date = new Date(inputValue.dateStart);
        const dateEnd: Date = new Date(inputValue.dateEnd);
        const timeStart: number = time.toNumber(inputValue.timeStart);
        const timeEnd: number = time.toNumber(inputValue.timeEnd);
        const result: string[] = [];
        for (let i = 0; i < inputValue.count; i++) {
            const randDate: Date = random.date(dateStart, dateEnd);
            const randTime: number = random.randInt(timeStart, timeEnd);
            result.push(`${formatDate(randDate, "yyyy-mm-dd")} ${time.toString(randTime)}`);
        }
        setData(result);
    }

    return (
        <Container className="page-container">
            <Row className="justify-content-md-center">
                <PageTitle
                    title="Timestamp generator"
                />
            </Row>
            <Row className="justify-content-md-center">
                <div className="random-menu">
                    <Row className="time-interval">
                        <InputGroup className="time-interval-from">
                            <InputGroup.Text className="time-menu-label">From:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="date"
                                max={inputValue.dateEnd}
                                value={inputValue.dateStart}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        dateStart: event.target.value,
                                        dateEnd: inputValue.dateEnd,
                                        timeStart: inputValue.timeStart,
                                        timeEnd: inputValue.timeEnd
                                    });
                                }}
                                onBlur={handleFromDate}
                            />
                        </InputGroup>
                        <InputGroup className="time-interval-to">
                            <InputGroup.Text className="time-menu-label">To:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="date"
                                min={inputValue.dateStart}
                                value={inputValue.dateEnd}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        dateStart: inputValue.dateStart,
                                        dateEnd: event.target.value,
                                        timeStart: inputValue.timeStart,
                                        timeEnd: inputValue.timeEnd
                                    });
                                }}
                                onBlur={handleToDate}
                            />
                        </InputGroup>
                    </Row>
                    <Row className="time-interval">
                        <InputGroup className="time-interval-from">
                            <InputGroup.Text className="time-menu-label">From:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="time"
                                max={inputValue.timeEnd}
                                step={1}
                                value={inputValue.timeStart}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        dateStart: inputValue.dateStart,
                                        dateEnd: inputValue.dateEnd,
                                        timeStart: event.target.value,
                                        timeEnd: inputValue.timeEnd
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
                                min={inputValue.timeStart}
                                step={1}
                                value={inputValue.timeEnd}
                                onChange={(event: any) => {
                                    setInputValue({
                                        count: inputValue.count,
                                        dateStart: inputValue.dateStart,
                                        dateEnd: inputValue.dateEnd,
                                        timeStart: inputValue.timeStart,
                                        timeEnd: event.target.value
                                    });
                                }}
                                onBlur={handleToTime}
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text className="time-menu-label">Format:</InputGroup.Text>
                            <Form.Control
                                className="random-input"
                                type="text"
                                value="yyyy-mm-dd hh:mm:ss"
                                onChange={() => { }}
                            />
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
                                        dateStart: inputValue.dateStart,
                                        dateEnd: inputValue.dateEnd,
                                        timeStart: inputValue.timeStart,
                                        timeEnd: inputValue.timeEnd
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
                    fileName="timestamp"
                />
            </Row>
        </Container>
    );
}

export default TimestampPage;