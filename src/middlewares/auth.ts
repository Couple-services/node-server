import { STATUS_CODE } from 'core/statusCode';
import { STATUS_REASON } from 'core/statusReason';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError, VerifyErrors } from 'jsonwebtoken';
import { JWT_SECRET } from 'utils/consts';

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
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let token = req.headers.authorization;
    if (!token) {
        return res
            .status(STATUS_CODE.FORBIDDEN)
            .json({ message: `${STATUS_REASON.FORBIDDEN}! No token provided` });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return catchErrors(err, res);
        }
        if (!decoded) {
            return res
                .status(STATUS_CODE.FORBIDDEN)
                .json({ message: STATUS_REASON.FORBIDDEN });
        }
        req['userId'] = (decoded as JwtPayload)?.userId;
        next();
    });
};
