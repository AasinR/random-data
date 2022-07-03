import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import "./CodeBlock.css";
import { useEffect, useState } from "react";

type codeBlock = {
    className?: string,
    content: string,
    name: string,
    extension: string,
    rows?: number,
    disabled?: boolean
}

function CodeBlock({ className, content, name, extension, rows, disabled }: codeBlock) {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(content);
    }, [content]);

    const handleChange = (event: any) => {
        setValue(event.target.value);
    }
    
    return (
        <div className={`code-block ${className ? className : ""}`}>
            <div className="code-header">
                <p className="code-title">
                    File name: {`${name}.${extension}`}
                </p>
                <div className="code-button-container">
                    <Button className="code-button" variant="outline-dark">
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    <Button className="code-button" variant="outline-dark">
                        <FontAwesomeIcon icon={faFileDownload} />
                    </Button>
                </div>
            </div>
            <Form.Control className="code-area"
                as="textarea"
                rows={rows}
                value={value}
                disabled={disabled}
                onChange={handleChange}
            />
        </div>
    );
}

export default CodeBlock;