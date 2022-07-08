import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

/**
 * Fetch content from given file.
 */
function useFetchData(fileName: string) {
    const [dataContent, setDataContent] = useState<string[]>([]);
    const [validData, setValidData] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`https://api.github.com/repos/AasinR/random-data/contents/data/${fileName}.json`)
            .then((response: any) => {
                setDataContent(decode(response.data.content));

                console.log(response.data);
            })
            .catch((error: any) => {
                setValidData(false);
            });
    }, [fileName]);

    // decode base64 data to ascii, returns json
    function decode(encData: string) {
        const buffer: Buffer = Buffer.from(encData, "base64");
        const data: string = buffer.toString("ascii");

        return JSON.parse(data);
    }

    return { dataContent, validData };
}

export default useFetchData;