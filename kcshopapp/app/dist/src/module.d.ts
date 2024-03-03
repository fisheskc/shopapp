import { Application } from 'express';
export declare class AppModule {
    app: Application;
    constructor(app: Application);
    start(): Promise<void>;
}
