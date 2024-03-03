import { AppModule } from './module'
import express from 'express'
// import { Request } from 'express';
import { JwtPayload } from '@kcshopapp/common';

declare global {
    namespace express {
        interface Request {
            currentUser?: JwtPayload
        }
    }
}

const bootstrap = () => {
    const app  = new AppModule(express())

    app.start()
}

bootstrap()
