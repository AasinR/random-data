/**
 * Convert given string to the selected format.
 * @param src String in kebab case.
 */
function formatName(src: string, format: "title" | "pascal" | "camel" | "snake" | "kebab") {
    const words: string[] = src.split("-");
    let result: string = "";
    
    switch (format) {
        case "title":
            toTitle();
            break;
        case "pascal":
            toPascal();
            break;
        case "camel":
            toCamel();
            break;
        case "snake":
            toSnake();
            break;
        case "kebab":
            toKebab();
    }

    // capitalie first letter of every word with a space between
    function toTitle() {
        words.forEach((item: string, index: number) => {
            words[index] = item.charAt(0).toUpperCase() + item.slice(1);
        });
        result = words.join(" ");
    }

    // capitalie first letter of every word
    function toPascal() {
        words.forEach((item: string, index: number) => {
            words[index] = item.charAt(0).toUpperCase() + item.slice(1);
        });
        result = words.join("");
    }

    // capitalie first letter of every word except the first 
    function toCamel() {
        words.forEach((item: string, index: number) => {
            if (index === 0) return;
            words[index] = item.charAt(0).toUpperCase() + item.slice(1);
        });
        result = words.join("");
    }

    // divide words with _ character
    function toSnake() {
        result = words.join("_");
    }

    // divide words with - character
    function toKebab() {
        result = words.join("-");
    }

    return result;
}

export default formatName;