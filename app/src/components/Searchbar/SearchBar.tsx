import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css"

function SearchBar({ placeholder, data }: { placeholder: string, data: any[] }) {
    const [searchRes, setSearchRes] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    // handle search filtering on value change
    const handleSearch = (event: any) => {
        const searchWord: string = event.target.value;
        setSearchValue(searchWord);
        const result: any[] = data.filter((value) => {
            return value.name.split(".")[0].toLowerCase().includes(searchWord.toLowerCase())
        });
        if (searchWord) {
            setSearchRes(result);
        }
    }

    const handleClear = () => {
        setSearchValue("");
    }

    return (
        <div className="search-bar">
            <InputGroup>
                <Form.Control type="text" placeholder={placeholder} value={searchValue} onChange={handleSearch} />
                <InputGroup.Text className="search-icon" onClick={handleClear}>
                    <FontAwesomeIcon icon={searchValue.length === 0 ? faSearch : faTimes} />
                </InputGroup.Text>
                <Collapse in={searchValue.length !== 0}>
                    <Container className="search-container">
                        {searchRes.slice(0, 5).map((data, index) => {
                            const name = data.name.split(".")[0];

                            return (
                                <Row className="search-link" key={index} as={Link} to={"/data/" + name}>
                                    {name}
                                </Row>
                            );
                        })}
                    </Container>
                </Collapse>
            </InputGroup>
        </div>
    );
}

export default SearchBar;