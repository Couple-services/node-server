import { ForbiddenError, UnauthorizedError } from 'core/errors';
import { Request, Response } from 'express';
import { findUserBy, findUserByEmail } from 'services/functions';

export const refreshTokenService = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies.jwt) {
        throw new UnauthorizedError('No token provided');
    }
    const refreshToken = cookies.jwt;

    const foundUser = await findUserBy({ refreshToken });

    if (!foundUser) {
        throw new ForbiddenError();
    }

    // evaluate jwt
};
