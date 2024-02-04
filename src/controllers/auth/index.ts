// auth controller

import { Request, Response } from 'express';
import { signUpService } from 'services/auth';
import { UserSignupData } from 'utils/types';

// signup

export const signupController = async (req: Request, res: Response) => {
    const userData: UserSignupData = req.body;
    const result = await signUpService(userData);
    return res.status(result.code).json(result);
};
