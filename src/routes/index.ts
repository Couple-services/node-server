import { ROUTES } from 'configs/routes';
import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

const router = Router();

router.use(ROUTES.auth.index, authRouter);
router.use(ROUTES.users.index, userRouter);

export default router;
