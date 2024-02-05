import bcrypt from 'bcrypt';
import { BadRequestError, ConflictError, UnauthorizedError } from 'core/errors';
import { STATUS_CODE } from 'core/statusCode';
import logger from 'logger';
import UserSchema from 'models/auth/user';
import { findUserByEmail } from 'services/functions';
import { SALT_ROUNDS } from 'utils/consts';
import {
    RequestResult,
    User,
    UserLoginData,
    UserSignupData,
} from 'utils/types';

export const signUpService = async (
    data: UserSignupData,
): Promise<RequestResult<User>> => {
    try {
        const { name, email, password } = data;
        // check if user exists

        const userExists = await UserSchema.findOne({ email }).lean();
        if (userExists) {
            throw new ConflictError('User already exists');
        }
        // create user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new UserSchema({ email, password: hashedPassword, name });
        await user.save();

        return {
            statusCode: STATUS_CODE.CREATED,
            message: 'User created',
            metadata: {
                ...user,
                id: String(user._id),
            },
        };
    } catch (error) {
        logger.error(
            'Error in src/services/auth/index.ts: login function',
            error,
        );
        throw error;
    }
};

export const loginService = async (
    data: UserLoginData,
): Promise<
    RequestResult<{
        refreshToken: string;
        accessToken: string;
    }>
> => {
    try {
        const { email, password, refreshToken } = data;
        // check email in db
        const user = await findUserByEmail(email);
        if (!user) {
            throw new BadRequestError('User not registered');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new UnauthorizedError('Wrong password');
        }
    } catch (error) {
        logger.error(
            'Error in src/services/auth/index.ts: login function',
            error,
        );
        throw error;
    }
};
