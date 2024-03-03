import { Request, Response } from 'express';
import {
    getAllUsersService,
    getCurrentUserService,
    getUserByIdService,
} from 'services/user.service';

export const getAllUsersController = async (req: Request, res: Response) => {
    return await getAllUsersService(req, res);
};
export const getUserByIdController = async (req: Request, res: Response) => {
    return await getUserByIdService(req, res);
};

export const getCurrentUserController = async (req: Request, res: Response) => {
    return await getCurrentUserService(req, res);
};
