/**
 * Convert hh:mm:ss time string to seconds.
 */
function toNumber(time: string) {
    const times: string[] = time.split(":");
    const hours: number = parseInt(times[0], 10) * 3600;
    const minutes: number = parseInt(times[1], 10) * 60;
    const seconds: number = parseInt(times[2], 10);
    return hours + minutes + seconds;
}

/**
 * Convert number to time string, in the given format.
 */
function toString(time: number, format: string = "hh:mm:ss") {
    time = time % 86400;
    const hour: number = Math.floor(time / 3600);
    const minute: number = Math.floor(time / 60) - (hour * 60);
    const second: number = time % 60;
    const formats: string[] = format.split(":");

    function select(_format: string) {
        switch (_format) {
            case "hh":
                return hour.toString().padStart(2, "0");
            case "h":
                return hour.toString();
            case "mm":
                return minute.toString().padStart(2, "0");
            case "m":
                return minute.toString();
            case "ss":
                return second.toString().padStart(2, "0");
            case "s":
                return second.toString();
            default:
                return "";
        }
    }

    const timeString: string[] = [];
    for (let i = 0; i < formats.length; i++) {
        timeString.push(select(formats[i]));
    }

    return timeString.join(":");
}

const time = {
    toNumber,
    toString
};
export default time;