/**
 * Returns a random number between the given values.
 */
function randInt(minValue: number, maxValue: number) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

/**
 * Returns one or the given amount of random values from an array.
 */
function choice(array: any[], number: number = 1) {
    const length: number = array.length;
    if (number === 1) {
        return array[Math.floor(Math.random() * length)];
    }
    let result: any[] = [];
    for (let i = 0; i < number; i++) {
        result.push(array[Math.floor(Math.random() * length)]);
    }
    return result;
}

/**
 * Creates a random string with the given length.
 */
function string(minLength: number, maxLength: number) {
    const characters: string = "0123456789~!@#$%^&*()_+}{[]|abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length: number = randInt(minLength, maxLength);

    return choice(characters.split(""), length).join("");
}

/**
 * Returns a random date between the given dates.
 */
function date(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const random = {
    randInt,
    choice,
    string,
    date
};
export default random;