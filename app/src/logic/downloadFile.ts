/**
 * Creates and downloads a file with the given parameters.
 */
function downloadFile(filename: string, content: string) {
    const file: Blob = new Blob([content], {type: "text/plain"});
    const element = document.createElement("a");
    
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
}

export default downloadFile;