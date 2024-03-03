import { ROUTES } from 'configs/routes';
import { getAllUsersController } from 'controllers/user.controller';
import { Router } from 'express';
import { verifyToken } from 'middlewares';
import { handleError } from 'middlewares/functions';
import {
    getCurrentUserController,
    getUserByIdController,
} from './../controllers/user.controller';

const userRouter = Router();

userRouter.get(
    ROUTES.users.me,
    verifyToken,
    handleError(getCurrentUserController),
);
userRouter.get(
    ROUTES.users.getAll,
    verifyToken,
    handleError(getAllUsersController),
);
userRouter.get(
    ROUTES.users.getUser,
    verifyToken,
    handleError(getUserByIdController),
);
export default userRouter;
