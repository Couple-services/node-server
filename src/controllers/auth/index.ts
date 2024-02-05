// auth controller

import { CreatedResponse } from 'core/responses';
import { Request, Response } from 'express';
import { signUpService } from 'services/auth';
import { UserSignupData } from 'utils/types';

// signup

export const signupController = async (req: Request, res: Response) => {
    const userData: UserSignupData = req.body;
    const result = await signUpService(userData);
    return new CreatedResponse(
        result.statusCode,
        result.message,
        result.metadata,
    ).send(res);
};
