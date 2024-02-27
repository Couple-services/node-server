// implement auth routes
import { ROUTES } from 'configs/routes';
import {
    singinController,
    signupController,
} from 'controllers/auth.controller';
import { Router } from 'express';
import { checkDuplicateUsernameOrEmail } from 'middlewares';
import { handleError } from 'middlewares/functions';

const authRouter = Router();

authRouter.post(
    ROUTES.auth.signup,
    checkDuplicateUsernameOrEmail,
    handleError(signupController),
);
authRouter.post(ROUTES.auth.signin, handleError(singinController));

export default authRouter;
