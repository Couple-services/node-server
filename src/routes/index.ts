import { ROUTES } from 'configs/routes';
import { Router } from 'express';
import authRouter from './auth/index';

const router = Router();

router.use(ROUTES.auth.index, authRouter);

export default router;
