import { useState } from "react";

function useDataType(content: any[], fileName: string) {
    const [codeValue, setCodeValue] = useState<string>("");
    const [name, setName] = useState<string>(fileName);
    const types: { name: string, language: {name: string, extension: string} }[] = [
        {
            name: "Plain Text",
            language: {
                name: "",
                extension: "txt"
            }
        },
        {
            name: "JSON",
            language: {
                name: "json",
                extension: "json"
            }
        },
        {
            name: "Java",
            language: {
                name: "java",
                extension: "java"
            }
        },
        {
            name: "JavaScript",
            language: {
                name: "javascript",
                extension: "js"
            }
        }
    ];

    // convert array to plain text
    function toText() {
        const result: string = content.join("\n");
        setCodeValue(result);
        setName(fileName);
    }

    // convert array to JSON array
    function toJSON() {
        let result: string = "[\n    ";
        content.forEach((item: string, index: number) => {
            if (index === content.length - 1) {
                result = result + `"${item}"\n]`;
            }
            else {
                result = result + `"${item}",\n    `;
            }
        });
        setCodeValue(result);
        setName(fileName);
    }

    // convert array to Java array
    function toJava() {
        setName(name.charAt(0).toUpperCase() + name.slice(1));
        let result: string = `public class ${name} {\n    String[] data = {\n        `;
        
        content.forEach((item: string, index: number) => {
            if (index === content.length - 1) {
                result = result + `"${item}"\n    };\n}`;
            }
            else {
                result = result + `"${item}",\n        `;
            }
        });
        setCodeValue(result);
    }

    // convert array to JavaScript array
    function toJavaScript() {
        let result: string = "const data = [\n    ";
        content.forEach((item: string, index: number) => {
            if (index === content.length - 1) {
                result = result + `"${item}"\n];`;
            }
            else {
                result = result + `"${item}",\n    `;
            }
        });
        setCodeValue(result);
        setName(fileName);
    }

    // select extension type
    const selectType = (type: string) => {
        switch (type) {
            case "txt":
                toText();
                break;
            case "json":
                toJSON();
                break;
            case "java":
                toJava();
                break;
            case "js":
                toJavaScript();
                break;
            default:
                toText();
        }
    }

    return { types, selectType, codeValue, name };
}

export default useDataType;