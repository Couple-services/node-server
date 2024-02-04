// implement auth routes
import { ROUTES } from 'configs/routes';
import { signupController } from 'controllers/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(ROUTES.auth.signUp, signupController);
authRouter.post(ROUTES.auth.logIn, (req, res) => {
    console.log('login', req.body);
    res.send('login');
});

export default authRouter;
