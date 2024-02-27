import { Request, Response } from 'express';
import { signupService, singinService } from 'services/auth.service';

export const signupController = async (req: Request, res: Response) => {
    return await signupService(req, res);
};

export const singinController = async (req: Request, res: Response) => {
    return await singinService(req, res);
};
