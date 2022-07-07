import { useState } from "react";

function useDataType(content: any[], fileName: string) {
    const [codeValue, setCodeValue] = useState<string>("");
    const [name, setName] = useState<string>(fileName);
    const types: { name: string, language: { name: string, extension: string } }[] = [
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
        setName(name.charAt(0).toUpperCase() + name.slice(1));
        let result: string = `public class ${name} {\n    String[] data = {`;
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
        let result: string;
        if (singleLine) {
            result = `const data = ["${content.join('", "')}"];`;
        }
        else {
            result = `const data = [\n    "${content.join('",\n    "')}"\n];`;
        }
        setCodeValue(result);
        setName(fileName);
    }

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
            default:
                toText(singleLine);
        }
    }

    return { types, selectType, codeValue, name };
}

export default useDataType;