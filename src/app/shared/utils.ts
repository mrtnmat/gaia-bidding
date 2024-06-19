import { ArgumentException } from "./exceptions/argument.exception"

export function randInt(max: number, min = 0): number {
    if (!Number.isInteger(max)) throw new ArgumentException(`${max} is not an integer`)
    if (!Number.isInteger(min)) throw new ArgumentException(`${min} is not an integer`)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomMapKey<K, V>(map: Map<K, V>) {
    // Convert Map keys to an array
    let keysArray = Array.from(map.keys());

    // Generate a random index
    let randomIndex = randInt(0, keysArray.length - 1);

    // Return the random key
    return {
        key: keysArray[randomIndex],
        value: map.get(keysArray[randomIndex]),
    }
}
