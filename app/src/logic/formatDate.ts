/**
 * Returns date as string in the given format.
 */
function formatDate(date: Date, format: string, separator: string) {
    const array: string[] = format.split("-");
    let dates: string[] = [];

    function select(_format: string) {
        let dateString: string = "";

        switch (_format) {
            case "yyyy":
                dateString = date.getFullYear().toString();
                break;
            case "yy":
                dateString = date.getFullYear().toString().substring(2, 4);
                break;
            case "mm":
                dateString = (date.getMonth() + 1).toString().padStart(2, "0");
                break;
            case "m":
                dateString = (date.getMonth() + 1).toString();
                break;
            case "dd":
                dateString = date.getDate().toString().padStart(2, "0");
                break;
            case "d":
                dateString = date.getDate().toString();
        }

        return dateString;
    }

    array.forEach((item: string) => {
        dates.push(select(item))
    });

    return dates.join(separator);
}

export default formatDate;