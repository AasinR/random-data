function useDateFormat() {
    const separator: string[] = ["/", "-", ".", ",", ""];

    const format: string[] = [
        "yyyy-mm-dd",
        "yy-mm-dd",
        "mm-dd-yyyy",
        "mm-dd-yy",
        "dd-mm-yyyy",
        "dd-mm-yy",
        "m-d-yyyy",
        "m-d-yy",
        "d-m-yyyy",
        "d-m-yy",
    ];

    const dateFormats: { title: string, value: string }[] = [];
    for (let i = 0; i < format.length; i++) {
        for (let j = 0; j < separator.length; j++) {
            const data: string[] = format[i].split("-");
            dateFormats.push({
                title: data.join(separator[j]),
                value: `${format[i]}|${separator[j]}`
            });
        }
    }

    return dateFormats;
}

export default useDateFormat;