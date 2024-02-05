// implement auth routes
import { ROUTES } from 'configs/routes';
import { loginController, signupController } from 'controllers/auth';
import { Router } from 'express';
import { handleError } from 'middlewares/handleError';

const authRouter = Router();

authRouter.post(ROUTES.auth.signUp, handleError(signupController));
authRouter.post(ROUTES.auth.logIn, handleError(loginController));

export default authRouter;
