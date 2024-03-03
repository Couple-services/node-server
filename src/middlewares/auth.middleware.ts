import { STATUS_CODE } from 'core/statusCode';
import { STATUS_REASON } from 'core/statusReason';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError, VerifyErrors } from 'jsonwebtoken';
import logger from 'logger';
import { User } from 'models/user.model';
import { JWT_SECRET } from 'utils/consts';

export const checkDuplicateUsernameOrEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res
            .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
            .json({ message: 'Failed! Username or Email is required!' });
    }
    const userByName = await User.findOne({ name }).exec();
    if (userByName) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({ message: 'Failed! Username is already in use!' });
    }
    const userByEmail = await User.findOne({ email }).exec();
    if (userByEmail) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({ message: 'Failed! Email is already in use!' });
    }
    next();
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // get bearer token from header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res
            .status(STATUS_CODE.FORBIDDEN)
            .json({ message: `${STATUS_REASON.FORBIDDEN}! No token provided` });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error('Error in verifyToken', err);
            return catchErrors(err, res);
        }

        if (!decoded) {
            return res
                .status(STATUS_CODE.FORBIDDEN)
                .json({ message: STATUS_REASON.FORBIDDEN });
        }

        req['headers']['userId'] = (decoded as JwtPayload)?.userId;

        next();
    });
};

const catchErrors = (err: VerifyErrors, res: Response) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(STATUS_CODE.UNAUTHORIZED)
            .json({ message: `${STATUS_REASON.UNAUTHORIZED}: Token expired` });
    }

    return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ message: STATUS_REASON.UNAUTHORIZED });
};
