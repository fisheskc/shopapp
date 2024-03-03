import { CustomError } from "./custom-error";
export declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    constructor();
    serialiseErrors(): {
        message: string;
    }[];
}
