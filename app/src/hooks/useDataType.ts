import { useState } from "react";
import { formatName } from "../logic";

function useDataType(content: any[], fileName: string) {
    const [codeValue, setCodeValue] = useState<string>("");
    const [name, setName] = useState<string>(fileName);
    const types: { name: string, language: { name: string, extension: string } }[] = [
        {
            name: "Plain Text",
            language: {
                name: "text",
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
        },
        {
            name: "Python",
            language: {
                name: "python",
                extension: "py"
            }
        }
    ];

    // select extension type
    const selectType = (type: string, singleLine: boolean) => {
        switch (type) {
            case "txt":
                toText(singleLine);
                break;
            case "json":
                toJSON(singleLine);
                break;
            case "java":
                toJava(singleLine);
                break;
            case "js":
                toJavaScript(singleLine);
                break;
            case "py":
                toPython(singleLine);
                break;
            default:
                toText(singleLine);
        }
    }

    // convert array to plain text
    function toText(singleLine: boolean) {
        let result: string;
        if (singleLine) {
            result = content.join(", ");
        }
        else {
            result = content.join("\n");
        }
        setCodeValue(result);
        setName(fileName);
    }

    // convert array to JSON array
    function toJSON(singleLine: boolean) {
        let result: string;
        if (singleLine) {
            result = `["${content.join('", "')}"]`;
        }
        else {
            result = `[\n    "${content.join('",\n    "')}"\n]`;
        }
        setCodeValue(result);
        setName(fileName);
    }

    // convert array to Java array
    function toJava(singleLine: boolean) {
        setName(formatName(fileName, "pascal"));
        let result: string = `public class ${name} {\n    String[] ${formatName(fileName, "camel")} = {`;
        if (singleLine) {
            result = `${result}"${content.join('", "')}"};\n}`;
        }
        else {
            result = `${result}\n        "${content.join('",\n        "')}"\n    };\n}`;
        }
        setCodeValue(result);
    }

    // convert array to JavaScript array
    function toJavaScript(singleLine: boolean) {
        let result: string = `const ${formatName(fileName, "camel")} = [`;
        if (singleLine) {
            result = `${result}"${content.join('", "')}"];`;
        }
        else {
            result = `${result}\n    "${content.join('",\n    "')}"\n];`;
        }
        setCodeValue(result);
        setName(fileName);
    }

    // convert array to Python array
    function toPython(singleLine: boolean) {
        let result: string = `${formatName(fileName, "snake")} = [`;
        if (singleLine) {
            result = `${result}"${content.join('", "')}"]`;
        }
        else {
            result = `${result}\n    "${content.join('",\n    "')}"\n]`;
        }
        setCodeValue(result);
        setName(formatName(fileName, "snake"));
    }

    return { types, selectType, codeValue, name };
}

export default useDataType;