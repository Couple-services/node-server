// auth controller

import { Request, Response } from 'express';
import { authServices } from 'services/auth';
import { UserLoginData, UserSignupData } from 'types';

export const AuthController = {
  signup: (req: Request, res: Response) => {
    console.log('req.body', req.body);
    const userData: UserSignupData = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    return authServices.signUp(userData);
  },
  login: (req: Request, res: Response) => {
    res.send('Sign Up');
  },
};
