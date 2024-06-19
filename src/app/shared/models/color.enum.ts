import { ArgumentException } from "../exceptions/argument.exception";
import { randInt } from "../utils";

// src/app/shared/models/colors.enum.ts
export enum Color {
    Blue = 'blue',
    Yellow = 'yellow',
    Brown = 'brown',
    Red = 'red',
    Orange = 'orange',
    Gray = 'gray',
    White = 'white'
}

export function colorClass(c: Color): string {
    switch (c) {
        case Color.Blue:
            return 'bg-blue-500'
        case Color.Yellow:
            return 'bg-yellow-500'
        case Color.Brown:
            return 'bg-amber-800'
        case Color.Red:
            return 'bg-red-500'
        case Color.Orange:
            return 'bg-orange-500'
        case Color.Gray:
            return 'bg-stone-400'
        default:
            return 'bg-white'
    }
}

export function randomDistinctColors(n: number): Color[] {
    if (!Number.isInteger) throw new ArgumentException(`${n} is not an integer`)
    if (n < 0) throw new ArgumentException(`Argument must be a positive integer`)
    let colors: Color[] = Object.values(Color)
    if (n > colors.length) throw new ArgumentException(`${n} is larger then the amount of different colors`)
    // console.log(colors)
    colors.sort((_a, _b) => randInt(1, 0) - 0.5)
    // console.log(colors)
    return colors.slice(0, n)
}
