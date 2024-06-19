export class ArgumentException extends Error {
    constructor(message: string) {
        super(message); // Call the base class constructor
        this.name = 'ArgumentException'; // Set the error name
        Object.setPrototypeOf(this, ArgumentException.prototype); // Fix the prototype chain
    }
}