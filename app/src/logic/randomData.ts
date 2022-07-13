import random from "./random";

/**
 * Creates a random string with the given length.
 */
function randPassword(minLength: number, maxLength: number) {
    const characters: string = "0123456789~!@#$%^&*()_+}{[]|abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length: number = random.randInt(minLength, maxLength);

    return random.choice(characters.split(""), length).join("");
}

const randomData = { randPassword };
export default randomData;
export { randPassword };