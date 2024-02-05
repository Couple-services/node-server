import { UnauthorizedError } from 'core/errors';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenService } from 'services/auth/refreshTokenServices';

export const refreshTokenController = async (req: Request, res: Response) => {
    const result = await refreshTokenService(req, res);
    return res.status(result.statusCode).json(result);
};
