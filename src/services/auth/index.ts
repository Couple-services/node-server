import logger from 'logger';
import { RequestResult, UserLoginData, UserSignupData } from 'utils/types';
import UserSchema from 'models/auth/user';
import { HTTP_STATUS, SALT_ROUNDS } from 'utils/consts';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createKeyToken } from './keyToken';
import { createTokenPair } from 'utils/auth';

export const signUpService = async (
    data: UserSignupData,
): Promise<RequestResult> => {
    try {
        const { name, email, password } = data;
        // check if user exists
        const userExists = await UserSchema.findOne({ email }).lean();
        if (userExists) {
            return {
                code: HTTP_STATUS.CONFLICT,
                message: 'User already exists',
            };
        }
        // create user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new UserSchema({ email, password: hashedPassword, name });
        await user.save();

        // create public key and private key
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');
        const keys = await createKeyToken({
            userId: String(user._id),
            publicKey,
            privateKey,
        });
        if (!keys) {
            return {
                code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: 'Error while creating key token',
            };
        }

        const { accessToken, refreshToken } = createTokenPair({
            publicKey,
            privateKey,
            payload: {
                id: String(user._id),
                email,
                name,
            },
        });

        return {
            code: HTTP_STATUS.CREATED,
            message: 'User created',
            metadata: {
                accessToken,
                refreshToken,
            },
        };
    } catch (error) {
        logger.error(
            'Error in src/services/auth/index.ts: login function',
            error,
        );
        return {
            code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Error while creating user',
        };
    }
};
