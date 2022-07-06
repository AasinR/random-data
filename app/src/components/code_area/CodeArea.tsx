import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "./CodeArea.css"

type codeArea = {
    className?: string,
    code: string,
    language: string,
    width?: string,
    height?: string
}

function CodeArea({className, code, language, width, height} : codeArea) {
    
    useEffect(() => {
        Prism.highlightAll();
    }, [code]);
    
    return (
        <div
            className={`code-area ${className}`}
            style={{
                width: width,
                height: height
            }}
        >
            <pre className="code-highlight" aria-hidden>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}

export default CodeArea;