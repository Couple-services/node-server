import { User } from 'models/user.model';
import { Request, Response } from 'express';
import { STATUS_CODE } from 'core/statusCode';
import logger from 'logger';
import { findUserBy } from './functions';
import { NotFoundError } from 'core/errors';

export const getAllUsersService = async (req: Request, res: Response) => {
    try {
        const users = await User.find().exec();
        return res.status(STATUS_CODE.OK).json(users);
    } catch (err) {
        logger.error('Error in getAllUsersService', err);
        throw err;
    }
};

export const getUserByIdService = async (req: Request, res: Response) => {
    try {
        const user = await findUserBy({ _id: req.params.id });
        if (!user) {
            throw new NotFoundError('User Not found!');
        }
        return res.status(STATUS_CODE.OK).json(user);
    } catch (err) {
        logger.error('Error in getUserById', err);
        throw err;
    }
};
