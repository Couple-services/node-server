import bcrypt from 'bcrypt';
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from 'core/errors';
import { STATUS_CODE } from 'core/statusCode';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from 'logger';
import { User } from 'models/user.model';
import { JWT_EXPIRATION, JWT_SECRET, SALT_ROUNDS } from 'utils/consts';

export const signupService = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new BadRequestError(
                'Username, Email or Password is required!',
            );
        }
        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, SALT_ROUNDS),
        });

        const newUser = await user.save();
        if (!newUser) {
            throw new InternalServerError(
                'User was not registered successfully!',
            );
        }

        return res
            .status(STATUS_CODE.OK)
            .json({ message: 'User was registered successfully!' });
    } catch (error) {
        logger.error('Error in signupService', error);
        throw error;
    }
};

export const singinService = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Email or Password is required!');
    }
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new NotFoundError('Email not registered!');
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        throw new UnauthorizedError('Invalid Password!');
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
        allowInsecureKeySizes: true,
    });
    return res.status(STATUS_CODE.OK).json({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
    });
};
