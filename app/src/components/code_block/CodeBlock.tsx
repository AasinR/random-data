import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { CodeArea } from "..";
import { downloadFile } from "../../logic";
import { useCopyClipboard } from "../../hooks";
import "./CodeBlock.css";

type codeBlock = {
    className?: string,
    content: string,
    name: string,
    language: {
        name: string,
        extension: string
    }
}

function CodeBlock({ className, content, name, language }: codeBlock) {
    const { handleCopy, handleCopyToggle, clicked } = useCopyClipboard(content);

    return (
        <div className={`code-block ${className}`}>
            <div className="code-header">
                <p className="code-title">
                    File name: {`${name}.${language.extension}`}
                </p>
                <div className="code-button-container">
                    <OverlayTrigger
                        placement="top"
                        onToggle={handleCopyToggle}
                        delay={{ show: 200, hide: 0 }}
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
                        delay={{ show: 200, hide: 0 }}
                        overlay={
                            <Tooltip>Download</Tooltip>
                        }
                    >
                        <Button
                            className="code-button"
                            variant="outline-dark"
                            onClick={() => {
                                downloadFile(`${name}.${language.extension}`, content);
                            }}
                        >
                            <FontAwesomeIcon icon={faFileDownload} />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <CodeArea
                className="code-display"
                code={content}
                language={language.name}
                width="100%"
                height="20rem"
            />
        </div>
    );
}

export default CodeBlock;