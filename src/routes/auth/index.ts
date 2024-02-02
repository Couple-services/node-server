// implement auth routes
import { ROUTES } from 'configs/routes';
import { AuthController } from 'controllers/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.get(ROUTES.auth.logIn, AuthController.login);
authRouter.post(ROUTES.auth.signUp, AuthController.signup);

export default authRouter;
