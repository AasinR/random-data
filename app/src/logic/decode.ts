import { Buffer } from "buffer";

// decode base64 data to ascii, returns json
function decode(encData: string) {
    const buffer: Buffer = Buffer.from(encData, "base64");
    const data: string = buffer.toString("ascii");

    return JSON.parse(data);
}

export default decode;