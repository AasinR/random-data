import { useEffect, useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { downloadFile } from "../../logic";
import { useCopyClipboard } from "../../hooks";
import "./CodePanel.css";

type codePanel = {
    className?: string,
    content: string,
    name: string,
    extension: string,
    rows?: number,
    disabled?: boolean
}

function CodePanel({ className, content, name, extension, rows, disabled }: codePanel) {
    const [value, setValue] = useState<string>("");
    const {handleCopy, handleCopyToggle, clicked} = useCopyClipboard(value);

    useEffect(() => {
        setValue(content);
    }, [content]);

    // change textarea value on change
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
                    <OverlayTrigger
                        placement="top"
                        onToggle={handleCopyToggle}
                        delay={{show:200, hide:0}}
                        overlay={
                            <Tooltip>
                                {clicked ? "Copied!" : "Copy to clipboard"}
                            </Tooltip>
                        }
                    >
                        <Button
                            className="code-button"
                            variant="outline-dark"
                            onClick={handleCopy}
                        >
                            <FontAwesomeIcon icon={faCopy} />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        delay={{show:200, hide:0}}
                        overlay={
                            <Tooltip>Download</Tooltip>
                        }
                    >
                        <Button
                            className="code-button"
                            variant="outline-dark"
                            onClick={() => {
                                downloadFile(`${name}.${extension}`, value);
                            }}
                        >
                            <FontAwesomeIcon icon={faFileDownload} />
                        </Button>
                    </OverlayTrigger>
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

export default CodePanel;