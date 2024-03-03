import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor(){
        super('Error connecting to the database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serialiseErrors() {
        return [{ message: 'Error connecting to the database' }]
    }
}