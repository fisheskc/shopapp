import { JwtPayload } from '@kcshopapp/common';
declare global {
    namespace express {
        interface Request {
            currentUser?: JwtPayload;
        }
    }
}
