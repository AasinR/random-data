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

const random = { randInt, choice };
export default random;