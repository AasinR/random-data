import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { CodeBlock } from "..";
import { useDataType } from "../../hooks";
import "./DataDisplay.css";

interface formvalue {
    language: {
        name: string,
        extension: string
    },
    format: boolean
};

interface dataDisplay {
    className?: string,
    data: string[],
    fileName: string
};

function DataDisplay({ className, data, fileName }: dataDisplay) {
    const [formValue, setFormValue] = useState<formvalue>({ language: { name: "text", extension: "txt" }, format: false });
    const { types, selectType, codeValue, name } = useDataType(data, fileName);

    useEffect(() => {
        selectType(formValue.language.extension, formValue.format);
    }, [selectType, formValue]);

    return (
        <div className={`data-display ${className}`}>
            <Form className="data-menu">
                <InputGroup>
                    <InputGroup.Text className="data-menu-title">Select data type:</InputGroup.Text>
                    <Form.Select
                        className="data-menu-control"
                        onChange={(event: any) => {
                            const lang = event.target.value.split(",");
                            setFormValue({
                                language: {
                                    name: lang[0],
                                    extension: lang[1]
                                },
                                format: formValue.format
                            });
                        }}
                    >
                        {
                            types.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={[
                                            item.language.name,
                                            item.language.extension
                                        ]}
                                    >
                                        {item.name}
                                    </option>
                                );
                            })
                        }
                    </Form.Select>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text className="data-menu-title">Select format:</InputGroup.Text>
                    <Form.Select
                        className="data-menu-control"
                        onChange={(event: any) => {
                            setFormValue({
                                language: formValue.language,
                                format: !!event.target.value
                            });
                        }}
                    >
                        <option value="">New Line</option>
                        <option value="true">Single Line</option>
                    </Form.Select>
                </InputGroup>
            </Form>
            <CodeBlock
                className="data-code-display"
                content={codeValue}
                name={name}
                language={formValue.language}
            />
        </div>
    );
}

export default DataDisplay;