// auth controller

import { CreatedResponse, SuccessResponse } from 'core/responses';
import { Request, Response } from 'express';
import { loginService, signUpService } from 'services/auth';
import { UserLoginData, UserSignupData } from 'utils/types';

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

// Path: src/controllers/auth/login.ts

export const loginController = async (req: Request, res: Response) => {
    const userData: UserLoginData = req.body;
    const result = await loginService(userData);
    return new SuccessResponse(
        result.statusCode,
        result.message,
        result.metadata,
    ).send(res);
};
