import { Router, Request, Response, NextFunction } from 'express'
import { authService } from './auth.service';
import { currentUser } from '@kcshopapp/common';

const router = Router();

router.post('/signup', async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const jwt = await authService.signup({ email, password }, next);

    req.session = { jwt }
    // 201 for a created status, for a new user, status true
    res.status(201).send(true);
})

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => { 
    const { email, password } = req.body;
    const jwt = await authService.signin({ email, password }, next);

    req.session = { jwt }
    res.status(201).send(true);
})

router.get('/current-user', currentUser(process.env.JWT_KEY!), async (req: Request, res: Response, next: NextFunction) => { 
    res.status(200).send(req.currentUser)
})

export { router as authRouters }